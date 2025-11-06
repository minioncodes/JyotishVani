import mongoose from 'mongoose'
import { Schema, Document, Types } from 'mongoose'


export interface ILead extends Document {
  name: string;
  email:string;
  phoneNumber: string;
  dateofbirth: string;
  time: string;
  service: string;
  concern: string;
  description: string;
  createdAt:string;
  birthplace:string;
}

export type Lead = ILead;


const LeadSchema = new Schema<ILead>(
    {
        name: { type: String, required: true },
        email:{type:String,required:true},
        phoneNumber: { type: String, required: true },
        dateofbirth: { type: String, required: true },
        time: { type: String, required: true },
        service: { type: String, required: true },
        concern: { type: String, required: true },
        description: { type: String, required: true },
        createdAt:{type:String},
        birthplace:{type:String,required:true},
    }
)
export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
