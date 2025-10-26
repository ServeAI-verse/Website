import { NextRequest, NextResponse } from "next/server";
import { generateRecommendations } from "@/lib/services/openai";
import { MenuItem, RevenueData, WasteData } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { menuItems, revenueData, wasteData, restaurantContext } = body;

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

    // Generate recommendations using AI
    const recommendations = await generateRecommendations({
      menuItems: menuItems as MenuItem[],
      revenueData: revenueData as RevenueData[] | undefined,
      wasteData: wasteData as WasteData[] | undefined,
      restaurantContext,
    });

    return NextResponse.json({
      success: true,
      recommendations,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      {
        error: "Failed to generate recommendations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
