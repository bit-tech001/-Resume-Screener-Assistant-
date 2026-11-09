
import { NextRequest, NextResponse } from "next/server";
import {
  getAnalysisById,
} from "@/services/analysis.service";
import { deleteAnalysis } from "@/services/history.services";
import { requireApiUser } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireApiUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in to continue.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    const analysis = await getAnalysisById(id);

    if (!analysis) {
      return NextResponse.json(
        {
          success: false,
          message: "Analysis not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Analysis loaded successfully.",
        data: analysis,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analysis GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireApiUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in to continue.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await getAnalysisById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Analysis not found.",
        },
        { status: 404 }
      );
    }

    await deleteAnalysis(id);

    return NextResponse.json(
      {
        success: true,
        message: "Analysis deleted successfully.",
        data: { id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analysis DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
