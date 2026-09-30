import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Skill from "@/models/Skill";

export async function getProfile() {
  try {
    await dbConnect();
    const profile = await Profile.findOne().lean();
    if (!profile) return null;
    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getExperience() {
  try {
    await dbConnect();
    const experience = await Experience.find().sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(experience));
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

export async function getSkills() {
  try {
    await dbConnect();
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(skills));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}