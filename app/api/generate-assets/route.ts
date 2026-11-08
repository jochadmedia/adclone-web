import { NextResponse } from "next/server"
import openai from "@/lib/openai"

export const POST = async (request: Request) => {
  try {
    const { analysis, productInfo } = await request.json()

    if (!analysis) {
      return NextResponse.json(
        { error: "Analysis data is required" },
        { status: 400 }
      )
    }

    // Generate tailored hooks and copy using LLM
    const hookVariants = await generateHookVariants(analysis, productInfo)

    // Generate B-roll clip descriptions and prompts
    const brollPrompts = generateBrollPrompts(analysis)

    // In a full implementation, these would be sent to video generation APIs
    // (Runway, Google Veo, Luma Dream Machine) to synthesize actual video clips

    const clips = [
      {
        id: "clip-1",
        type: "Hook Rewrite",
        description: hookVariants.hookVariant1,
        status: "generated",
      },
      {
        id: "clip-2",
        type: "B-Roll Clip 1",
        description: brollPrompts.cut2,
        status: "pending-generation",
      },
      {
        id: "clip-3",
        type: "B-Roll Clip 2",
        description: brollPrompts.cut4,
        status: "pending-generation",
      },
      {
        id: "clip-4",
        type: "CTA Overlay",
        description: hookVariants.ctaVariant,
        status: "generated",
      },
    ]

    return NextResponse.json({ clips })
  } catch (error) {
    console.error("Asset generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate assets" },
      { status: 500 }
    )
  }
}

// Generate hook variants tailored to the product
async function generateHookVariants(
  analysis: any,
  productInfo: any
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a direct-response marketing copywriter specialized in e-commerce and Shopify ads. 
        Generate hook variants that capture attention in the first 3 seconds. 
        The original hook was: "${analysis.hook}"
        
        Rewrite for: ${productInfo.productName} targeting ${productInfo.targetAudience}
        Brand voice: ${productInfo.brandVoice}
        
        Return 3 hook variants, each 1-2 sentences, focusing on the core benefit and curiosity gap.
        Format: JSON with fields: hookVariant1, hookVariant2, hookVariant3, ctaVariant`,
      },
      { role: "user", content: "Generate hook variants" },
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content
    ? JSON.parse(response.choices[0].message.content)
    : {
        hookVariant1: "Original hook variant placeholder",
        hookVariant2: "Original hook variant placeholder",
        hookVariant3: "Original hook variant placeholder",
        ctaVariant: "Original CTA placeholder",
      }
}

// Generate B-roll prompt descriptions for key cuts
function generateBrollPrompts(analysis: any) {
  return {
    cut2: `AI-generated B-roll description for cut 2: ${analysis.pacingTimeline
      .split("Cut 2")[1]?.split(",")[0] || "problem identification scene"}
      product in use, lifestyle context, high-quality footage`,
    cut4: `AI-generated B-roll description for cut 4: ${analysis.pacingTimeline
      .split("Cut 4")[1]?.split(",")[0] || "social proof scene"}
      testimonial format, user-generated style, authentic lighting`,
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
}