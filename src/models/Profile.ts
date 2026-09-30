import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfile extends Document {
  fullName: string;
  title: string;
  tagline: string;
  about: string;
  avatarUrl: string;
  heroBgUrl: string; // <--- زدنا صورة خلفية الهيرو
  resumeUrl: string;
  email: string;
  phone?: string;
  location: string;
  status: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    about: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    heroBgUrl: { type: String, default: "" }, // <---
    resumeUrl: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, required: true },
    status: { type: String, default: "Available for work" },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
export default Profile;