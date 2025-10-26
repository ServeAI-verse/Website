import { NextRequest, NextResponse } from "next/server";
import { analyzePOSData } from "@/lib/services/openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, format } = body;

    // Validate required data
    if (!data || typeof data !== "string") {
      return NextResponse.json(
        { error: "POS data is required as a string" },
        { status: 400 }
      );
    }

    const validFormats = ["csv", "json", "text"];
    if (!format || !validFormats.includes(format)) {
      return NextResponse.json(
        { error: "Valid format is required (csv, json, or text)" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Analyze POS data using AI
    const result = await analyzePOSData(
      data,
      format as "csv" | "json" | "text"
    );

    return NextResponse.json({
      success: true,
      menuItems: result.menuItems,
      summary: result.summary,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error analyzing POS data:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze POS data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
