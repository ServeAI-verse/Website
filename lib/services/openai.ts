import OpenAI from "openai";
import { MenuItem, Recommendation, RevenueData, WasteData } from "@/types";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini-2025-08-07";

export interface MenuAnalysisInput {
  menuItems: MenuItem[];
  revenueData?: RevenueData[];
  wasteData?: WasteData[];
  restaurantContext?: {
    name?: string;
    type?: string;
    location?: string;
    targetAudience?: string;
  };
}

export interface AIInsight {
  title: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  priority: "high" | "medium" | "low";
}

/**
 * Generate AI-powered recommendations for menu optimization
 */
export async function generateRecommendations(
  input: MenuAnalysisInput
): Promise<Recommendation[]> {
  const { menuItems, revenueData, wasteData, restaurantContext } = input;

  // Prepare the analysis context
  const menuSummary = menuItems.map((item) => ({
    name: item.name,
    category: item.category,
    cost: item.cost,
    price: item.price,
    margin: item.margin,
    salesCount: item.salesCount,
    revenue: item.revenue,
    wastePercentage: item.wastePercentage,
  }));

  const systemPrompt = `You are an expert restaurant consultant and data analyst specializing in menu optimization and profitability analysis. 
Your role is to analyze restaurant menu data and provide actionable, specific recommendations that will increase profitability and efficiency.

Focus on:
- Items with high waste percentages that are losing money
- High-margin items that could be promoted more
- Pricing opportunities where items are underpriced
- Bundle opportunities to increase average order value
- Seasonal and market trends

Be specific, data-driven, and actionable in your recommendations.`;

  const userPrompt = `Analyze this restaurant menu data and provide 5-8 specific, actionable recommendations:

${
  restaurantContext
    ? `Restaurant Context:
- Name: ${restaurantContext.name || "N/A"}
- Type: ${restaurantContext.type || "N/A"}
- Location: ${restaurantContext.location || "N/A"}
- Target Audience: ${restaurantContext.targetAudience || "N/A"}
`
    : ""
}

Menu Items:
${JSON.stringify(menuSummary, null, 2)}

${wasteData ? `\nTop Waste Items:\n${JSON.stringify(wasteData, null, 2)}` : ""}

Please provide recommendations in the following JSON format (return ONLY valid JSON, no markdown or extra text):
{
  "recommendations": [
    {
      "type": "remove" | "promote" | "price-adjust" | "bundle",
      "priority": "high" | "medium" | "low",
      "title": "Short, actionable title",
      "description": "Detailed explanation with specific data points and reasoning",
      "itemName": "Menu item name if applicable",
      "currentMetrics": {
        "revenue": number,
        "margin": number,
        "salesCount": number
      },
      "expectedImpact": {
        "revenueChange": estimated_revenue_impact_in_dollars,
        "profitChange": estimated_profit_impact_in_dollars
      },
      "confidence": confidence_percentage_0_to_100
    }
  ]
}

Prioritize recommendations that will have the biggest positive impact on profitability.`;

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    const recommendations: Recommendation[] = parsed.recommendations.map(
      (rec: any, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        type: rec.type,
        priority: rec.priority,
        title: rec.title,
        description: rec.description,
        itemName: rec.itemName,
        currentMetrics: rec.currentMetrics || {},
        expectedImpact: rec.expectedImpact,
        confidence: rec.confidence,
      })
    );

    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate AI recommendations");
  }
}

/**
 * Generate insights for the dashboard
 */
export async function generateDashboardInsights(
  input: MenuAnalysisInput
): Promise<AIInsight[]> {
  const { menuItems, revenueData } = input;

  const systemPrompt = `You are an expert restaurant analyst providing quick, actionable insights for a dashboard.
Keep insights concise, specific, and immediately actionable.`;

  const userPrompt = `Analyze this restaurant data and provide 3-5 key insights:

Menu Items Summary:
- Total Items: ${menuItems.length}
- Average Margin: ${(
    menuItems.reduce((sum, item) => sum + item.margin, 0) / menuItems.length
  ).toFixed(1)}%
- Total Revenue: $${menuItems
    .reduce((sum, item) => sum + item.revenue, 0)
    .toFixed(2)}
- Average Waste: ${(
    menuItems.reduce((sum, item) => sum + item.wastePercentage, 0) /
    menuItems.length
  ).toFixed(1)}%

Top 3 Revenue Items:
${menuItems
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 3)
  .map(
    (item) =>
      `- ${item.name}: $${item.revenue.toFixed(2)} (${item.margin.toFixed(
        1
      )}% margin)`
  )
  .join("\n")}

Top 3 Margin Items:
${menuItems
  .sort((a, b) => b.margin - a.margin)
  .slice(0, 3)
  .map(
    (item) =>
      `- ${item.name}: ${item.margin.toFixed(
        1
      )}% margin ($${item.revenue.toFixed(2)} revenue)`
  )
  .join("\n")}

High Waste Items:
${menuItems
  .filter((item) => item.wastePercentage > 10)
  .map((item) => `- ${item.name}: ${item.wastePercentage.toFixed(1)}% waste`)
  .join("\n")}

Return ONLY valid JSON in this format:
{
  "insights": [
    {
      "title": "Short title",
      "description": "Brief, specific insight",
      "impact": "positive" | "negative" | "neutral",
      "priority": "high" | "medium" | "low"
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    return parsed.insights || [];
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error("Failed to generate dashboard insights");
  }
}

/**
 * Analyze uploaded POS data and extract menu items
 */
export async function analyzePOSData(
  rawData: string,
  format: "csv" | "json" | "text"
): Promise<{ menuItems: MenuItem[]; summary: string }> {
  const systemPrompt = `You are an expert at parsing and analyzing POS (Point of Sale) system data.
Extract menu items with their costs, prices, and sales information.
Be thorough and accurate in your extraction.`;

  const userPrompt = `Parse this ${format.toUpperCase()} POS data and extract menu items:

${rawData}

Return ONLY valid JSON in this exact format:
{
  "menuItems": [
    {
      "name": "Item name",
      "category": "Category (e.g., Burgers, Drinks, Appetizers)",
      "cost": cost_per_item_in_dollars,
      "price": selling_price_in_dollars,
      "salesCount": number_of_sales
    }
  ],
  "summary": "Brief summary of what was parsed (e.g., 'Parsed 25 menu items from January 2024 sales data')"
}

Calculate revenue as price * salesCount and margin as ((price - cost) / price) * 100.
If any fields are missing, make reasonable estimates based on similar items.`;

    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        // Note: gpt-4o-mini only supports default temperature of 1
      });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);

    // Transform to full MenuItem objects
    const menuItems: MenuItem[] = parsed.menuItems.map(
      (item: any, index: number) => ({
        id: `pos-${Date.now()}-${index}`,
        name: item.name,
        category: item.category,
        cost: item.cost,
        price: item.price,
        salesCount: item.salesCount,
        revenue: item.price * item.salesCount,
        margin: ((item.price - item.cost) / item.price) * 100,
        wastePercentage: Math.random() * 10, // Default estimate
      })
    );

    return {
      menuItems,
      summary: parsed.summary,
    };
  } catch (error) {
    console.error("Error analyzing POS data:", error);
    throw new Error("Failed to analyze POS data");
  }
}

/**
 * Chat with AI assistant about restaurant operations
 */
export async function chatWithAI(
  message: string,
  context: {
    menuItems?: MenuItem[];
    recentRecommendations?: Recommendation[];
    conversationHistory?: Array<{
      role: "user" | "assistant";
      content: string;
    }>;
  }
): Promise<string> {
  const {
    menuItems,
    recentRecommendations,
    conversationHistory = [],
  } = context;

  const systemPrompt = `You are an expert restaurant consultant AI assistant specializing in menu optimization, 
profitability analysis, and operational efficiency. You help restaurant owners make data-driven decisions.

You have access to their menu data and can provide specific, actionable advice about:
- Menu pricing and optimization
- Waste reduction strategies
- Marketing and promotion ideas
- Cost management
- Sales strategies
- Customer experience improvements

Be conversational, helpful, and specific. Reference their actual menu items and data when relevant.`;

  let contextInfo = "";
  if (menuItems && menuItems.length > 0) {
    contextInfo += `\n\nCurrent Menu (Top 5 by revenue):\n${menuItems
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map(
        (item) =>
          `- ${item.name}: $${item.price} (${
            item.salesCount
          } sales, ${item.margin.toFixed(1)}% margin)`
      )
      .join("\n")}`;
  }

  if (recentRecommendations && recentRecommendations.length > 0) {
    contextInfo += `\n\nRecent AI Recommendations:\n${recentRecommendations
      .slice(0, 3)
      .map((rec) => `- ${rec.title}`)
      .join("\n")}`;
  }

  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt + contextInfo },
      ...conversationHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages,
        max_tokens: 500,
        // Note: gpt-4o-mini uses default temperature
      });

    return (
      completion.choices[0].message.content ||
      "I apologize, but I was unable to generate a response."
    );
  } catch (error) {
    console.error("Error in AI chat:", error);
    throw new Error("Failed to get AI response");
  }
}
