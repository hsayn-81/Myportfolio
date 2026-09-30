import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await dbConnect();
    const profile = await Profile.findOne().lean();
    return NextResponse.json(profile || {});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, body, {
        new: true,
        runValidators: true,
      });
    } else {
      profile = await Profile.create(body);
    }

    // تنظيف الـ Cache فوراً للـ Home Page
    revalidatePath("/");

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}