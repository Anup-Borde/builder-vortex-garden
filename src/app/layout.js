import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "UWLO Portal - Sign In",
  description: "Underwriting portal for smart lending decisions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Comprehensive fix for FullStory and Next.js conflicts
              (function() {
                if (typeof window === 'undefined') return;

                // Store original fetch before any third-party scripts can override it
                const originalFetch = window.fetch;
                let isOriginalFetch = true;

                // Enhanced fetch wrapper to handle all navigation and RSC payload requests
                function safeFetch(...args) {
                  try {
                    let url = '';

                    // Extract URL from various argument types
                    if (typeof args[0] === 'string') {
                      url = args[0];
                    } else if (args[0] instanceof Request) {
                      url = args[0].url;
                    } else if (args[0] instanceof URL) {
                      url = args[0].href;
                    } else if (args[0] && typeof args[0].toString === 'function') {
                      url = args[0].toString();
                    }

                    // Ensure Next.js navigation and RSC requests work properly
                    if (url && (
                      url.includes('/_next/') ||
                      url.includes('__nextjs') ||
                      url.includes('localhost') ||
                      url.includes('signin') ||
                      url.match(/\\.(js|css|json)$/) ||
                      url.includes('static') ||
                      url.includes('chunks')
                    )) {
                      // Use original fetch for Next.js requests
                      return originalFetch.apply(this, args);
                    }

                    // For other requests, still use original fetch but with error handling
                    return originalFetch.apply(this, args).catch(err => {
                      console.warn('Fetch failed, retrying with original fetch:', err);
                      return originalFetch.apply(this, args);
                    });

                  } catch (error) {
                    console.warn('Fetch wrapper error, using original fetch:', error);
                    return originalFetch.apply(this, args);
                  }
                }

                // Override window.fetch immediately
                window.fetch = safeFetch;

                // Periodically check if fetch has been overridden and restore our version
                const checkAndRestoreFetch = () => {
                  if (window.fetch !== safeFetch) {
                    console.log('Restoring safe fetch implementation');
                    window.fetch = safeFetch;
                  }
                };

                // Check every 100ms for the first 5 seconds, then every second
                let checkCount = 0;
                const initialInterval = setInterval(() => {
                  checkAndRestoreFetch();
                  checkCount++;
                  if (checkCount >= 50) { // 5 seconds
                    clearInterval(initialInterval);
                    // Continue checking less frequently
                    setInterval(checkAndRestoreFetch, 1000);
                  }
                }, 100);

                // Also check when the DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', checkAndRestoreFetch);
                } else {
                  checkAndRestoreFetch();
                }

              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
