import '@/styles/global.css';

import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/dictionary';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { Footer, Header } from '@/components';

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
      <body className={`${inter.className} bg-white-dark`}>
        <Header lang={lang} />
        {children}
        <Footer
          staticData={{ footerData: footer, socials, iconBtnData, navigation }}
        />
        <div id="modal" />
        <Toaster />
      </body>
    </html>
  );
}
