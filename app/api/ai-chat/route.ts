import { NextRequest, NextResponse } from "next/server";
import { chatWithAI } from "@/lib/services/openai";
import { MenuItem, Recommendation } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, menuItems, recentRecommendations, conversationHistory } =
      body;

    // Validate required data
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
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

    // Chat with AI
    const response = await chatWithAI(message, {
      menuItems: menuItems as MenuItem[] | undefined,
      recentRecommendations: recentRecommendations as
        | Recommendation[]
        | undefined,
      conversationHistory: conversationHistory || [],
    });

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json(
      {
        error: "Failed to get AI response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
