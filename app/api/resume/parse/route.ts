import { NextRequest, NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth";
import { parseResumeFile } from "@/lib/resume-parser";
import { getErrorMessage } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const user = await requireApiUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in to upload a resume.",
        },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please attach a resume file.",
        },
        { status: 400 }
      );
    }

    let formData: FormData;

    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data.",
        },
        { status: 400 }
      );
    }

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please attach a resume file.",
        },
        { status: 400 }
      );
    }

    const text = await parseResumeFile(file);

    return NextResponse.json({
      success: true,
      message: "Resume parsed successfully.",
      data: {
        text,
        fileName: file.name,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error("Resume parse API error:", error);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }
}
