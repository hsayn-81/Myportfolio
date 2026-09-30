import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  category: string;
  skills: {
    name: string;
    proficiency?: number;
  }[];
  order: number;
}

const SkillSchema: Schema<ISkill> = new Schema(
  {
    category: { type: String, required: true },
    skills: [
      {
        name: { type: String, required: true },
        proficiency: { type: Number, min: 1, max: 100 },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models.Skill) {
  delete mongoose.models.Skill;
}

const Skill: Model<ISkill> = mongoose.model<ISkill>("Skill", SkillSchema);
export default Skill;