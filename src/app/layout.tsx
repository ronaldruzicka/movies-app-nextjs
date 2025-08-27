import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getAccountDetails } from '@/lib/auth/get-account-details';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Your favorite movies app',
  description:
    "A personal movie companion: discover and explore films, build watchlists, track what you've seen, rate favorites, and get tailored recommendations powered by your tastes.",
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const account = await getAccountDetails();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background h-dvh antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Header avatar={account?.avatar?.tmdb?.avatar_path} username={account?.username} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
