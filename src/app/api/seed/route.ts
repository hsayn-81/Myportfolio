import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await dbConnect();

    // 1. Create or Update Admin Account
    const adminEmail = "admin@portfolio.com";
    const rawPassword = "adminPassword123!"; // Bte2dar tghayyera ba3den men el dashboard
    const hashedPassword = await bcrypt.hash(rawPassword, 12);

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
      });
    }

    // 2. Create Default Profile if none exists
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create({
        fullName: "Your Name",
        title: "Full-Stack Software Engineer",
        tagline: "Building scalable web applications and distributed systems.",
        about: "Software developer focused on full-stack web development, system architecture, and API design.",
        avatarUrl: "",
        resumeUrl: "",
        email: "contact@example.com",
        phone: "+961 00 000 000",
        location: "Lebanon",
        status: "Available for opportunities",
        socialLinks: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          twitter: "",
          website: "",
        },
      });
    }

    return NextResponse.json({
      status: "success",
      message: "Database seeded successfully!",
      credentials: {
        email: adminEmail,
        password: rawPassword,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}