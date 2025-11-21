import { Schema, model, models } from "mongoose";

export interface SnapshotDoc {
  tithi: string;
  nakshatra: string;
  paksha: string;
  rahuKaal: string;
  updatedAt: string;
}

const SnapshotSchema = new Schema<SnapshotDoc>(
  {
    tithi: String,
    nakshatra: String,
    paksha: String,
    rahuKaal: String,
    updatedAt: String,
  },
  { timestamps: false }
);

export default models.Snapshot || model<SnapshotDoc>("Snapshot", SnapshotSchema);
