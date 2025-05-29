import { Request, Response, NextFunction } from 'express';
import PhoneRecord from '../models/phoneRecord'; 


export const insertPhoneRecord = async (
  req: Request,
  res: Response,
) => {
  const { phone_number, run_time } = req.body;

  if (!phone_number || !run_time) {
    return res.status(400).json({ message: "phone_number and run_time are required" });
  }

  try {
    const result = await PhoneRecord.insert(phone_number, run_time);
    res.status(201).json({ message: "Record inserted", id: result.insertId });
  } catch (error: any) { 
    console.error("Error inserting phone record:", error); 
    res.status(500).json({ message: "Failed to insert record", error: error.message });
  }
};

export const getPhoneRecordById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid record ID provided." });
  }

  try {
    const results = await PhoneRecord.findById(id);

    if (!results) { 
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(results); 
  } catch (error: any) { 
    console.error("Error fetching phone record by ID:", error);
    res.status(500).json({ message: "Failed to retrieve record", error: error.message });
  }
};


