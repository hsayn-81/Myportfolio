import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  bullets: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  galleryUrls?: string[];
  featured: boolean;
  order: number;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    bullets: { type: [String], default: [] },
    techStack: { type: [String], required: true },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    galleryUrls: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// مسح الـ Model القديم إذا كان مسجل بالذاكرة لتحديث الحقول
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const Project: Model<IProject> = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;