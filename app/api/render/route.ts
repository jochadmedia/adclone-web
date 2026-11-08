import { NextResponse } from "next/server"
import { renderToString } from "react-dom/server"
import AdCloneComposition from "@/remotion/AdCloneComposition"

// Mock video generation - in production, this would use
// Remotion's cloud rendering or headless Chrome GPU rendering
const generateVideoPlaceholder = async ({
  productName,
  hook,
  offer,
  brollClips,
  cta,
}: {
  productName: string
  hook: string
  offer: string
  brollClips: string[]
  cta: string
}) => {
  // Generate a placeholder MP4 response
  // In a full implementation, this would:
  // 1. Use Remotion's <Renderer> component with GPU acceleration
  // 2. Or use Remotion Cloud API
  // 3. Or FFmpeg to compose the final video

  return new Promise<{ videoUrl: string; duration: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        videoUrl: `/generated-ads/ad-variant-${Date.now()}.mp4`,
        duration: 50,
      })
    }, 3000) // Simulate 3-second rendering time
  })
}

export const POST = async (request: Request) => {
  try {
    const { analysis, productInfo, clips } = await request.json()

    if (!analysis || !productInfo) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      )
    }

    // Extract composition props from analysis and product info
    const compositionProps = {
      productName: productInfo.productName || "Your Product",
      hook: analysis.hook || "AI-generated hook for your product",
      offer: analysis.coreOffer || "Special offer limited time",
      brollClips: clips
        .filter((c: any) => c.type && c.type.includes("B-Roll"))
        .map((c: any) => c.description || "AI-generated B-roll clip"),
      cta: analysis.pacingTimeline
        .split("Cut 5")[1]?.split(")")[0]?.trim() ||
        "Shop now and save big!",
    }

    // Render the video using Remotion
    const result = await generateVideoPlaceholder(compositionProps)

    return NextResponse.json({
      videoUrl: result.videoUrl,
      duration: result.duration,
      format: "mp4",
      specs: {
        width: 1080,
        height: 1920, // Vertical format for TikTok/IG
        fps: 30,
      },
    })
  } catch (error) {
    console.error("Render error:", error)
    return NextResponse.json(
      { error: "Failed to render video ad" },
      { status: 500 }
    )
  }
}