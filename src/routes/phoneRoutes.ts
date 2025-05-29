import express, {Router} from 'express';
const router = express.Router();


import { insertPhoneRecord, getPhoneRecordById } from  "../controllers/phoneController";

 router.post("/phones", insertPhoneRecord); 
router.get("/phones/:id", getPhoneRecordById); 

export default router;
