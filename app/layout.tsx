import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitor Rodrigues — Front-end, Sistemas & Automações",
  description:
    "Desenvolvedor front-end especializado em landing pages, sistemas web e automações com Python e IA. Do briefing ao deploy, entregando soluções que funcionam de verdade.",
  keywords: [
    "Desenvolvedor Front-end",
    "Landing Page",
    "Next.js",
    "React",
    "Python",
    "Automações",
    "Vitor Rodrigues",
    "IA Aplicada",
    "Sistemas Web",
  ],
  authors: [{ name: "Vitor Rodrigues", url: "https://github.com/vitorrodrigues-dev" }],
  creator: "Vitor Rodrigues",
  openGraph: {
    title: "Vitor Rodrigues — Front-end, Sistemas & Automações",
    description:
      "Desenvolvedor front-end especializado em landing pages, sistemas web e automações com Python e IA.",
    type: "website",
    locale: "pt_BR",
    siteName: "Vitor Rodrigues",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitor Rodrigues — Front-end, Sistemas & Automações",
    description:
      "Landing pages, sistemas web e automações com Python e IA. Do briefing ao deploy.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/faviconSVG.svg",  type: "image/svg+xml" },
      { url: "/images/favicon16.png",   sizes: "16x16",   type: "image/png" },
      { url: "/images/favicon32.png",   sizes: "32x32",   type: "image/png" },
      { url: "/images/favicon48.png",   sizes: "48x48",   type: "image/png" },
    ],
    shortcut:    { url: "/images/favicon32.png", type: "image/png" },
    apple:       { url: "/images/favicon180.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&p)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
