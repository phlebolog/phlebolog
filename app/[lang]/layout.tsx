import '@/styles/global.css';
import { Analytics } from '@vercel/analytics/react';

import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/dictionary';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
// import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';
import { Suspense } from 'react';
import GoogleTag from '@/components/GoogleTag/GoogleTag';

import { Footer, Header } from '@/components';
import FacebookPixelScript from '@/components/FacebookPixelScript/FacebookPixelScript';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const { meta } = await getDictionary(lang);
  const { metadata, twitter, openGraph } = meta;

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(metadata.base),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL + '/uk',
      languages: {
        'uk-UA': '/uk',
        'en-US': '/en',
      },
    },
    keywords: metadata.keywords,
    twitter,
    openGraph,
  };
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { footer, page, socials, navigation } = await getDictionary(lang);
  const { iconBtnData } = page.home;

  return (
    <html lang={lang}>
      <FacebookPixelScript />
      <GoogleTag />
      <body
        className={`${inter.className} mt-[75px] bg-white-dark md:mt-[87px] xl:mt-[91px]`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Header lang={lang} />
        {children}
        <Footer
          staticData={{ footerData: footer, socials, iconBtnData, navigation }}
          lang={lang}
        />
        <div id="modal" />
        <Toaster />
        <Analytics />
        <Suspense fallback={null}>{/*<FacebookPixel />*/}</Suspense>
      </body>
    </html>
  );
}
