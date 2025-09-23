import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IAdmin extends Document{
    id: string,
    name: string;
    username:string;
    email: string;
    password: string;
    createdAt: Date;
}
const AdminSchema = new Schema<IAdmin>({
    id: { type: String, default: uuidv4 },
    username:{type:String},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true }
})
export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin",AdminSchema) 