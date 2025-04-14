// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import { Analytics } from "@vercel/analytics/react"
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <body>
                
                <Main />
                <NextScript />
                <Analytics />
            </body>
        </Html>
    );
}
