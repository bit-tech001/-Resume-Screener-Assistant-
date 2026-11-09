import { NextRequest, NextResponse } from "next/server";
import { createAnalysis } from "@/services/analysis.service";
import { requireApiUser } from "@/lib/auth";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const user = await requireApiUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in to run an analysis.",
        },
        { status: 401 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request body.",
        },
        { status: 400 }
      );
    }

    const analysis = await createAnalysis(body);

    return NextResponse.json(
      {
        success: true,
        message: "Resume analysis completed successfully.",
        data: analysis,
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input.",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Analysis API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error
          ? error.message
          : "Internal server error.",
      },
      { status: 500 }
    );
  }
}