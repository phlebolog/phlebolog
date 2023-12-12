import Script from 'next/script';

import { Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/dictionary';
import dynamic from 'next/dynamic';

import { MainWrapper } from '@/components';
import { HeroSection, AdvantagesSection, BannerSection } from '@/sections';

const AboutSection = dynamic(
  () => import('@/sections').then(mod => mod.AboutSection),
  {
    ssr: false,
  },
);

const FAQ = dynamic(() => import('@/sections').then(mod => mod.FAQSection), {
  ssr: false,
});
const Consultation = dynamic(
  () => import('@/sections').then(mod => mod.ConsultationSection),
  {
    ssr: false,
  },
);
const Results = dynamic(
  () => import('@/sections').then(mod => mod.ResultsSection),
  {
    ssr: false,
  },
);
const Contacts = dynamic(
  () => import('@/sections').then(mod => mod.ContactsSection),
  {
    ssr: false,
  },
);
const Feedback = dynamic(
  () => import('@/sections').then(mod => mod.FeedbackSection),
  {
    ssr: false,
  },
);
const Treatments = dynamic(
  () => import('@/sections').then(mod => mod.TreatmentsSection),
  {
    ssr: false,
  },
);

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, socials } = await getDictionary(lang);

  return (
    <MainWrapper>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
      </Script>

      <Script id="fb-pixel">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1064048701288094');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        `
        {
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1064048701288094&ev=PageView&noscript=1"
          />
        }
        `
      </noscript>

      <HeroSection staticData={page.home.hero} lang={lang} />
      <AboutSection
        lang={lang}
        staticData={{
          about: page.home.about,
          iconData: page.home.iconBtnData,
          fallback: page.home.about.fallback,
        }}
      />
      <AdvantagesSection
        staticData={page.home.advantages}
        className="-mt-[30px] md:-mt-[52px] xl:-mt-[70px]"
      />
      <Treatments lang={lang} staticData={page.home.treatments} />
      <BannerSection
        staticData={page.home.banner}
        lang={lang}
        className="-mt-[30px] md:-mt-[52px] xl:-mt-[70px]"
      />
      <Results
        staticData={page.home.patient_results}
        iconData={page.home.iconBtnData}
        lang={lang}
      />
      <Feedback
        staticData={{
          feedback: page.home.feedback,
          iconBtnData: page.home.iconBtnData,
        }}
        lang={lang}
      />
      <FAQ staticData={{ faq: page.home.faq, socials }} />
      <Consultation
        staticData={page.home.consultation}
        className="-mt-[30px] md:-mt-[52px] xl:-mt-[70px]"
      />
      <Contacts
        staticData={{
          pageData: {
            contacts: page.home.contacts,
            iconBtnData: page.home.iconBtnData,
          },
          socialData: socials,
        }}
      />
    </MainWrapper>
  );
}
