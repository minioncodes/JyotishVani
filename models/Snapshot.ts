import { Schema, model, models } from "mongoose";

export interface SnapshotDoc {
  tithi: string;
  nakshatra: string;
  paksha: string;
  rahuKaal: string;
  updatedAt: string;
  nextRefreshISO: string | null;
}

const SnapshotSchema = new Schema<SnapshotDoc>(
  {
    tithi: String,
    nakshatra: String,
    paksha: String,
    rahuKaal: String,
    updatedAt: String,
    nextRefreshISO: String,
  },
  { timestamps: false }
);

export default models.Snapshot || model<SnapshotDoc>("Snapshot", SnapshotSchema);
