import { Request, Response } from 'express';
import csv from 'csv-parser';
import { Readable } from 'stream';
import { isValidPhoneNumber, isValidDateTime } from '../utils/validators';
import PhoneRecord from '../models/phoneRecord';
import { ResultSetHeader } from 'mysql2';

declare module 'express' {
  interface Request {
    file?: Express.Multer.File;
    userId?: string | number;
  }
}

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No CSV file uploaded.' });
    return;
  }

  if (req.file.mimetype !== 'text/csv') {
    res.status(400).json({ message: 'Only CSV files are allowed.' });
    return;
  }

  const errors: string[] = [];
  const validRecords: (string | number)[][] = [];

  try {
    const readableStream = Readable.from(req.file.buffer);

    await new Promise<void>((resolve, reject) => {
      readableStream
        .pipe(csv())
        .on('data', (data) => {
          const { phone_number, run_time } = data;

          if (!phone_number || !run_time) {
            errors.push(`Row missing 'phone_number' or 'run_time': ${JSON.stringify(data)}`);
            return;
          }

          if (!isValidPhoneNumber(phone_number)) {
            errors.push(`Invalid phone_number format: '${phone_number}' in row ${JSON.stringify(data)}`);
            return;
          }

          if (!isValidDateTime(run_time)) {
            errors.push(`Invalid run_time format: '${run_time}' in row ${JSON.stringify(data)}`);
            return;
          }

          validRecords.push([phone_number, run_time]);
        })
        .on('end', () => {
          console.log(`CSV parsing finished. Found ${validRecords.length} valid records.`);
          resolve();
        })
        .on('error', (err) => {
          console.error('CSV stream error:', err);
          reject(new Error('Error processing CSV file stream.'));
        });
    });

    if (errors.length > 0) {
      res.status(400).json({
        message: 'CSV file processed with validation errors. Valid records were still inserted.',
        totalRecordsAttempted: validRecords.length + errors.length,
        validRecordsCount: validRecords.length,
        errors: errors,
      });
      return; 
    }

    if (validRecords.length === 0) {
      res.status(400).json({ message: 'No valid records found in the CSV file after processing.' });
      return; 
    }

    const dbResult: ResultSetHeader = await PhoneRecord.bulkInsert(validRecords);

  
    res.status(200).json({
      message: `CSV file processed successfully. ${dbResult.affectedRows} records inserted into database.`,
      insertedIdsStart: dbResult.insertId,
      totalRecordsProcessed: validRecords.length,
      errorsCount: errors.length,
    });
    

  } catch (error: any) {
    console.error('CSV upload process failed:', error);
    res.status(500).json({ message: 'An unexpected error occurred during CSV file upload.', error: error.message });
    return; 
  }
};