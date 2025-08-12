import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Retospect",
  description:
    "The page you're looking for doesn't exist. Return to your dashboard or explore our templates.",
};

export default async function NotFound() {
  return (
    <html lang="en" className="h-full font-sans" suppressHydrationWarning>
      <body className="h-full">
        <div className="flex h-screen flex-col">
          {/* Header only - no sidebar */}

          {/* Main 404 Content */}
          <main className="flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="flex h-full items-center justify-center px-8">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                {/* Left side - Text content */}
                <div className="flex flex-col justify-center text-white">
                  <h1 className="mb-4 text-6xl font-bold tracking-tight lg:text-8xl">
                    404
                  </h1>
                  <h2 className="mb-4 text-2xl font-semibold uppercase tracking-wider lg:text-3xl">
                    PAGE NOT FOUND
                  </h2>
                  <p className="mb-8 text-lg text-gray-300 lg:text-xl">
                    Oops! The page you&apos;re looking for doesn&apos;t exist.
                  </p>

                  {/* Go Home Button */}
                  <div>
                    <Link
                      href="/"
                      className="inline-flex items-center rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-white hover:text-slate-900"
                    >
                      Back To Home
                    </Link>
                  </div>
                </div>

                {/* Right side - 404 Image */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src="/404.svg"
                      alt="404 - Page Not Found"
                      width={500}
                      height={500}
                      className="h-auto w-full max-w-md"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
