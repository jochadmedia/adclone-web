"use client"

import { useState } from "react"

export default function HomePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>("1")
  const [referenceUrl, setReferenceUrl] = useState("")
  const [analysis, setAnalysis] = useState(null)
  const [productInfo, setProductInfo] = useState({})
  const [generatedClips, setGeneratedClips] = useState([])

  const steps = {
    1: "Input Reference",
    2: "AI Analysis",
    3: "Asset Generation",
    4: "Render Preview",
    5: "Complete",
  }

  const nextStep = (s: number) => setStep(String(s))
  const prevStep = () => {
    if (step > 1) setStep(String(Number(step) - 1))
  }

  const handleAnalyze = async () => {
    setStep("2")
    // Call AI analysis endpoint
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: referenceUrl }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setAnalysis(data.analysis)
      setProductInfo(data.productInfo || {})
      nextStep(3)
    } catch (err) {
      console.error(err)
      alert("Analysis failed: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  const handleGenerate = async () => {
    setStep("3")
    // Call asset generation endpoint
    try {
      const response = await fetch("/api/generate-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, productInfo }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setGeneratedClips(data.clips || [])
      nextStep(4)
    } catch (err) {
      console.error(err)
      alert("Asset generation failed: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  const handleRender = async () => {
    setStep("4")
    try {
      const response = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, productInfo, clips: generatedClips }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      alert("Video rendered successfully! " + data.videoUrl)
      nextStep(5)
    } catch (err) {
      console.error(err)
      alert("Rendering failed: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 max-w-5xl mx-auto">
      <header className="mb-8 border-b border-border bg-card/80 backdrop-blur-md pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          AI Ad Cloning Engine
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Programmatically reverse-engineer and remix winning Shopify video ads
        </p>
      </header>

      {step === "1" && (
        <section className="prose max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">Step 1: Input Reference Ad</h2>
          <p className="text-muted-foreground mb-6">
            Paste a URL to a winning TikTok, Instagram, or YouTube Shorts ad that you want to clone. The AI will analyze the script, pacing, and visual style.
          </p>

          <div className="border rounded-lg p-6 bg-card/50">
            <label className="block text-sm font-medium mb-3">
              Reference Video URL
            </label>
            <input
              type="url"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@brand/video/123456789"
              className="mt-2 block w-full rounded-lg border border-input bg-background p-3 focus:ring-2 focus:ring-primary-500 focus-visible outline-none"
              required
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="mt-6 w-full rounded-lg bg-primary-600 px-6 py-3 text-lg font-medium text-white hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
          >
            Analyze Ad Script & Style
          </button>
        </section>
      )}

      {step === "2" && (
        <section className="prose max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            Step 2: AI Analysis Results
          </h2>

          {analysis && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">🪝 The Hook (First 3 Seconds)</h3>
                <p className="text-lg leading-relaxed">{analysis.hook}</p>
              </div>

              <div>
                <h3 className="font-medium mb-3">⏱️ Pacing Timeline</h3>
                <p className="text-sm text-muted-foreground">{analysis.pacingTimeline}</p>
              </div>

              <div>
                <h3 className="font-medium mb-3">🎯 Core Offer & Value Prop</h3>
                <p className="text-lg leading-relaxed">{analysis.coreOffer}</p>
              </div>

              <div>
                <h3 className="font-medium mb-3">📦 Visual Style Summary</h3>
                <p className="text-muted-foreground">{analysis.visualStyle}</p>
              </div>

              <button
                onClick={() => prevStep()}
                className="mt-4 rounded-lg bg-secondary-100 px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 transition-colors"
              >
                ← Back to Input
              </button>

              <button
                onClick={handleGenerate}
                className="mt-4 w-full rounded-lg bg-primary-600 px-6 py-3 text-lg font-medium text-white hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
              >
                Generate Asset Variants →
              </button>
            </div>
          )}

          {(!analysis || step !== "2") && (
            <p className="text-muted-foreground">Enter a reference URL above and click "Analyze Ad Script & Style"</p>
          )}
        </section>
      )}

      {step === "3" && (
        <section className="prose max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            Step 3: Asset Generation & Swapping
          </h2>

          <p className="text-muted-foreground mb-6">
            The AI will generate tailored hooks, calls-to-action, and B-roll clips optimized for your product.
          </p>

          {generatedClips.length > 0 && (
            <div className="space-y-4">
              {generatedClips.map((clip, i) => (
                <div key={i} className="rounded-lg bg-card p-4 border">
                  <h3 className="font-medium mb-2">Clip {i + 1}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{clip.type}</p>
                  <p className="text-xs text-muted-foreground">{clip.description}</p>
                  {clip.videoUrl && (
                    <video
                      width="100%"
                      height="200"
                      controls
                      className="rounded-md"
                    >
                      <source src={clip.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-muted-foreground mb-6">
            Review the generated assets. You can adjust the product info or regenerate specific clips.
          </p>

          <button
            onClick={() => prevStep()}
            className="mt-4 rounded-lg bg-secondary-100 px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 transition-colors"
          >
            ← Back to Analysis
          </button>

          <button
            onClick={handleRender}
            className="mt-4 w-full rounded-lg bg-primary-600 px-6 py-3 text-lg font-medium text-white hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
          >
            Render Final Ad Variant →
          </button>
        </section>
      )}

      {step === "4" && (
        <section className="prose max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            Step 4: Render Preview
          </h2>

          <p className="text-muted-foreground mb-6">
            Your cloned ad variant is being rendered. This may take a few moments.
          </p>

          {/* Rendering status will be shown here */}

          <button
            onClick={() => prevStep()}
            className="mt-4 rounded-lg bg-secondary-100 px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 transition-colors"
          >
            ← Back to Asset Generation
          </button>
        </section>
      )}

      {step === "5" && (
        <section className="prose max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            Step 5: Complete ✓
          </h2>

          <p className="text-muted-foreground mb-6">
            Your high-converting ad variant has been generated successfully!
          </p>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-medium mb-4">Generated Ad Variant</h3>
            <p className="text-lg leading-relaxed">
              Your cloned ad is ready for launch. The video has been optimized with:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-2 h-5 w-5 text-primary-600 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  />
                </svg>
                AI-rewritten hook optimized for conversion
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-2 h-5 w-5 text-primary-600 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  />
                </svg>
                AI-generated B-roll clips at key timestamps
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-2 h-5 w-5 text-primary-600 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  />
                </svg>
                Dynamic kinetic typography and captions
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t">
              <a
                href="/"
                className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
              >
                Start a New Clone
              </a>
              <a
                href="https://www.tiktok.com/business/ads-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-secondary-100 px-5 py-2 text-sm text-secondary-800 hover:bg-secondary-200 transition-colors"
              >
                Launch to TikTok Ads Manager
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}