import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  company: string;
  role: string;
  location?: string;
  type: "work" | "education";
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  skills: string[];
  order: number;
}

const ExperienceSchema: Schema<IExperience> = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: "" },
    type: { type: String, enum: ["work", "education"], default: "work" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    current: { type: Boolean, default: false },
    description: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models.Experience) {
  delete mongoose.models.Experience;
}

const Experience: Model<IExperience> = mongoose.model<IExperience>("Experience", ExperienceSchema);
export default Experience;