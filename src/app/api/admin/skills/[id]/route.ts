import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const body = await req.json();
    await dbConnect();

    const skillCategory = await Skill.findByIdAndUpdate(params.id, body, { new: true });
    if (!skillCategory) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, skillCategory });
  } catch (error: any) {
    console.error("PUT Skill Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    await dbConnect();

    const skillCategory = await Skill.findByIdAndDelete(params.id);
    if (!skillCategory) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Skill Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}