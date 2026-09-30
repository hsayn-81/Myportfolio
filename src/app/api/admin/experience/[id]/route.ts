import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const body = await req.json();
    await dbConnect();

    const item = await Experience.findByIdAndUpdate(params.id, body, { new: true });
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("PUT Experience Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    await dbConnect();

    const item = await Experience.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error: any) {
    console.error("DELETE Experience Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}