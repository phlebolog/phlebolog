import Script from 'next/script';

import { Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/dictionary';
import dynamic from 'next/dynamic';

import { MainWrapper } from '@/components';
import { HeroSection, AdvantagesSection, BannerSection } from '@/sections';
import Consultation from '@/sections/Consultation/Consultation';

const AboutSection = dynamic(
  () => import('@/sections').then(mod => mod.AboutSection),
  {
    ssr: false,
  },
);

const FAQ = dynamic(() => import('@/sections').then(mod => mod.FAQSection), {
  ssr: false,
});
// const Consultation = dynamic(
//   () => import('@/sections').then(mod => mod.ConsultationSection),
//   {
//     ssr: false,
//   },
// );
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
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_OLD}`}
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_OLD}');`}
      </Script>

      <HeroSection
        staticData={{
          hero: page.home.hero,
          iconBtnData: page.home.iconBtnData,
          form: page.home.consultation.form,
        }}
        lang={lang}
      />
      <AboutSection
        lang={lang}
        staticData={{
          about: page.home.about,
          iconData: page.home.iconBtnData,
          fallback: page.home.about.fallback,
        }}
      />
      <AdvantagesSection
        staticData={{
          advantages: page.home.advantages,
          iconBtnData: page.home.iconBtnData,
          form: page.home.consultation.form,
        }}
        className="-mt-[30px] md:-mt-[52px] xl:-mt-[70px]"
      />
      <Treatments lang={lang} staticData={page.home.treatments} />
      <BannerSection
        staticData={{
          banner: page.home.banner,
          iconBtnData: page.home.iconBtnData,
          form: page.home.consultation.form,
        }}
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
