import mongoose from "mongoose";
import { Schema, Document ,Types} from "mongoose";
export interface IPost extends Document {
    adminId: Types.ObjectId;
    title: string;
    description: string;
    likes: Types.ObjectId;
    comments: [{ content: string, userId: string }],
    image: string
}

const BlogSchema = new Schema<IPost>(
    {
        adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        likes: [{ type: String }],
        comments: [
            {
                content: { type: String, required: true },
                adminId: { type: String, required: true }
            }
        ],
        image: { type: String }
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IPost>("Blog", BlogSchema);