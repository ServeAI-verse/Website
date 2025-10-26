import { NextRequest, NextResponse } from "next/server";
import { generateDashboardInsights } from "@/lib/services/openai";
import { MenuItem, RevenueData } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { menuItems, revenueData } = body;

    // Validate required data
    if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
      return NextResponse.json(
        { error: "Menu items are required" },
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

    // Generate insights using AI
    const insights = await generateDashboardInsights({
      menuItems: menuItems as MenuItem[],
      revenueData: revenueData as RevenueData[] | undefined,
    });

    return NextResponse.json({
      success: true,
      insights,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating insights:", error);
    return NextResponse.json(
      {
        error: "Failed to generate insights",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
