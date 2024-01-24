import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from '@/i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  const locale = matchLocale(locales, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const queryParams = request.nextUrl.searchParams;
  const utm_medium = queryParams.get('utm_medium');
  const utm_source = queryParams.get('utm_source') || 'direct';
  const utm_campaign = queryParams.get('utm_campaign');
  const utm_content = queryParams.get('utm_content');

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    const response = NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
    if (utm_medium) {
      response.cookies.set('utm_medium', utm_medium);
    }

    if (utm_source) {
      response.cookies.set('utm_source', utm_source);
    }

    if (utm_campaign) {
      response.cookies.set('utm_campaign', utm_campaign);
    }
    if (utm_content) {
      response.cookies.set('utm_content', utm_content);
    }
    return response;
  } else {
    const response = NextResponse.next();
    if (utm_medium) {
      response.cookies.set('utm_medium', utm_medium);
    }
    if (utm_source) {
      response.cookies.set('utm_source', utm_source);
    }

    if (utm_campaign) {
      response.cookies.set('utm_campaign', utm_campaign);
    }
    if (utm_content) {
      response.cookies.set('utm_content', utm_content);
    }
    return response;
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|admin|images|icons|uploads|favicon.ico).*)',
  ],
};
