import mongoose, { Schema, model, models } from "mongoose";

const predictionSchema = new Schema({
  type: String,
  prediction: String,
  challenge: String,
});

const horoscopeSchema = new Schema({
  sign: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  predictions: [predictionSchema],
});

export default models.Horoscope || model("Horoscope", horoscopeSchema);
