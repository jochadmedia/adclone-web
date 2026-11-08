import * as React from "react"
import { MotionText, MotionImage, Video } from "remotion"
import { useComposers } from "@remotion/assets"
import { interpolate } from "remotion"

// Type for the composition props
interface AdCloneProps {
  productName: string
  hook: string
  offer: string
  brollClips: string[]
  cta: string
}

// Main Ad Cloning Composition
export const AdCloneComposition: React.FC<AdCloneProps> = ({
  productName,
  hook,
  offer,
  brollClips,
  cta,
}) => {
  const totalDuration = 50 // 50 seconds total
  const fps = 30

  return (
    <>
      {/* Background video canvas */}
      <Video
        source={undefined}
        width={1080}
        height={1920}
        fit="cover"
        color="black"
      />

      {/* Kinetic Typography - The Hook (0-3 seconds) */}
      <MotionText
        x={500}
        y={960}
        fontSize={48}
        fontFamily="Inter, sans-serif"
        color="white"
        lineHeight={1.2}
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        key="hook"
      >
        {hook}
      </MotionText>

      {/* Product Name / Brand */}
      <MotionText
        x={50}
        y={180}
        fontSize={36}
        fontFamily="Inter, sans-serif"
        color="white"
        weight={600}
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        key="brand"
      >
        {productName}
      </MotionText>

      {/* Offer / Value Prop */}
      <MotionText
        x={50}
        y={240}
        fontSize={28}
        fontFamily="Inter, sans-serif"
        color="#ffd700"
        weight={500}
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        key="offer"
      >
        {offer}
      </MotionText>

      {/* B-Roll Clips at specific timestamps */}
      {brollClips.map((clip, index) => {
        const timestamp = (index + 2) * 10 // Every 10 seconds
        return (
          <MotionImage
            key={`broll-${index}`}
            x={0}
            y={0}
            width={1080}
            height={1920}
            style={{
              objectFit: "cover",
              position: "absolute",
              opacity: 0.8,
            }}
            start={timestamp}
            duration={8}
          >
            {/* Placeholder - would load actual generated clip */}
            <svg
              width={1080}
              height={1920}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect width={1080} height={1920} rx={10} fill="#000" />
              <text
                x={540}
                y={960}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize={36}
                fill="#666"
              >
                B-Roll Clip {index + 1}
              </text>
            </svg>
          </MotionImage>
        )
      })}

      {/* CTA at the end */}
      <MotionText
        x={500}
        y={1600}
        fontSize={36}
        fontFamily="Inter, sans-serif"
        color="white"
        weight={600}
        textAnchor="middle"
        lineHeight={1.4}
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        key="cta"
        start={40}
      >
        {cta}
      </MotionText>

      {/* Captions / Subtitles - bottom bar */}
      <MotionImage
        width={1080}
        height={100}
        y={1820}
        fit="cover"
        color="black"
        opacity={0.6}
        key="caption-bar"
      >
        <span
          style={{
            position: "absolute",
            left: 20,
            top: 30,
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 24,
            padding: "10px",
          }}
        >
          Captions would appear here dynamically
        </span>
      </MotionImage>
    </>
  )
}

// Export for Remotion rendering
export default AdCloneComposition

// Render configuration
export const renderAdVariant = async ({
  productName,
  hook,
  offer,
  brollClips,
  cta,
}: AdCloneProps) => {
  const composition = (
    <AdCloneComposition
      productName={productName}
      hook={hook}
      offer={offer}
      brollClips={brollClips}
      cta={cta}
    />
  )

  // Render using Remotion's local renderer
  // In production, this would use the Remotion Cloud or headless Chrome
  const blob = await new Promise<Blob>((resolve, reject) => {
    // This is a simplified rendering - full Remotion rendering requires
    // @remotion/renderer or remotion cloud
    const canvas = document.createElement("canvas")
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext("2d")!

    // Draw background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 1080, 1920)

    // Draw text elements
    ctx.fillStyle = "white"
    ctx.font = "bold 48px Inter, sans-serif"
    ctx.fillText(hook, 500, 960)

    ctx.fillStyle = "#ffd700"
    ctx.font = "36px Inter, sans-serif"
    ctx.fillText(offer, 50, 240)

    ctx.fillStyle = "white"
    ctx.font = "36px Inter, sans-serif"
    ctx.textAlign = "middle"
    ctx.fillText(cta, 540, 1600)

    ctx.fillStyle = "white"
    ctx.font = "24px Inter, sans-serif"
    ctx.fillText(`Product: ${productName}`, 50, 1840)

    canvas.toBlob(resolve, "image/png")
  })

  return blob
}