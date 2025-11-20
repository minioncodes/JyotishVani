import mongoose, { Schema, model, models } from "mongoose";

const snapshotSchema = new Schema({
  date: { type: String, required: true },
  tithi: String,
  paksha: String,
  nakshatra: String,
  rahuKaal: String,
  fetchedAtIST: String,
  lastRefreshISO: String
});

export default models.Snapshot || model("Snapshot", snapshotSchema);
