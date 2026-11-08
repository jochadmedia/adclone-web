import Document, { Html, Head, Main, NextScript, NextHead } from "next/document"

// Remotion Document - required for document head
export default function RootDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Ad Cloning Engine</title>
      </Head>
      <body>
        <Main />
        <NextScript />
        <NextHead />
      </body>
    </Html>
  )
}