import '@/styles/globals.css';
import '@onlook/ui/globals.css';

import { PostHogProvider } from '@/components/posthog-provider';
import { FeatureFlagsProvider } from '@/hooks/use-feature-flags';
import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from '@onlook/ui/sonner';
import { type Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from './_components/theme';
import { AuthProvider } from './auth/auth-context';
import { cn } from '@onlook/ui/utils';

export const metadata: Metadata = {
    title: 'Onlook – Cursor for Designers',
    description: 'The power of Cursor for your own website. Onlook lets you edit your React website and write your changes back to code in real-time. Iterate and experiment with AI.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
    openGraph: {
        url: 'https://onlook.com/',
        type: 'website',
        title: 'Onlook – Cursor for Designers',
        description: 'The power of Cursor for your own website. Onlook lets you edit your React website and write your changes back to code in real-time. Iterate and experiment with AI.',
        images: [
            {
                url: 'https://framerusercontent.com/images/ScnnNT7JpmUya7afqGAets8.png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@onlookdev',
        creator: '@onlookdev',
        title: 'Onlook – Cursor for Designers',
        description: 'The power of Cursor for your own website. Onlook lets you edit your React website and write your changes back to code in real-time. Iterate and experiment with AI.',
        images: [
            {
                url: 'https://framerusercontent.com/images/ScnnNT7JpmUya7afqGAets8.png',
            },
        ],
    },
};

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} className={cn(inter.variable, poppins.variable)} suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Onlook - Make your designs real" />
            </head>
            <body className="antialiased">
                <FeatureFlagsProvider>
                    <PostHogProvider>
                        <ThemeProvider
                            attribute="class"
                            forcedTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <TRPCReactProvider>
                                <AuthProvider>
                                    <NextIntlClientProvider>
                                        {children}
                                        <Toaster position="top-center" richColors closeButton />
                                    </NextIntlClientProvider>
                                </AuthProvider>
                            </TRPCReactProvider>
                        </ThemeProvider>
                    </PostHogProvider>
                </FeatureFlagsProvider>
            </body>
        </html>
    );
}
