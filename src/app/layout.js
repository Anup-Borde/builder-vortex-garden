import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lead Beacon - Sign In",
  description: "Lead tracking and management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Prevent FullStory from interfering with Next.js HMR in development
                if (typeof window !== 'undefined') {
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    // Get the URL from the first argument regardless of type
                    let url = '';
                    try {
                      if (typeof args[0] === 'string') {
                        url = args[0];
                      } else if (args[0] instanceof Request) {
                        url = args[0].url;
                      } else if (args[0] instanceof URL) {
                        url = args[0].href;
                      } else if (args[0] && typeof args[0].toString === 'function') {
                        url = args[0].toString();
                      }

                      // Allow Next.js internal requests to pass through without FullStory interference
                      if (url && (url.includes('/_next/') || url.includes('__nextjs') || url.includes('localhost'))) {
                        return originalFetch.apply(this, args);
                      }
                    } catch (e) {
                      // If there's any error getting the URL, just pass through to original fetch
                      return originalFetch.apply(this, args);
                    }

                    return originalFetch.apply(this, args);
                  };
                }
              `,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
