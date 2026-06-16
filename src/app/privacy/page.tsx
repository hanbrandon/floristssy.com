import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Privacy Policy | Florist SSY - Atlanta Wedding Florist",
  description: "Read the privacy policy of Florist SSY. Learn how we collect, use, and protect your information for wedding and event floral designs in Georgia and beyond.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Florist SSY - Atlanta Wedding Florist",
    description: "Read the privacy policy of Florist SSY. Learn how we collect, use, and protect your information.",
    url: "https://floristssy.com/privacy",
    siteName: "Florist SSY",
    locale: "en_US",
    type: "website",
  },
};

const PrivacyPage: React.FC = () => {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'floristssy@gmail.com';
  const contactPhone = '(917) 992-8888';

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36 bg-background min-h-screen">
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
          <div className="flex flex-col space-y-8">
            <div className="border-b border-outline-variant/20 pb-8">
              <span className="font-label-caps text-label-caps text-tertiary tracking-widest uppercase block mb-3">
                Legal
              </span>
              <h1 className="font-headline-lg text-headline-lg text-primary leading-tight">
                Privacy Policy
              </h1>
              <p className="font-body-md text-on-surface-variant/70 text-[14px] mt-3">
                Last Updated: June 15, 2026
              </p>
            </div>

            <div className="flex flex-col space-y-8 font-body-md text-on-surface-variant text-[15px] leading-relaxed">
              <p>
                At <strong>Florist SSY</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website, use our services, or contact us.
              </p>

              <div className="space-y-3">
                <h2 className="font-headline-md text-headline-md text-primary text-[22px]">
                  1. Information We Collect
                </h2>
                <p>
                  We collect personal information that you voluntarily provide to us when you fill out our contact or wedding inquiry forms, or communicate with us directly. This information may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-on-surface-variant/90">
                  <li><strong>Contact Details:</strong> Your name, email address, and phone number.</li>
                  <li><strong>Event Details:</strong> Your wedding or event date, venue location, estimated floral budget, design preferences, and any additional details you share to help us create a customized proposal.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="font-headline-md text-headline-md text-primary text-[22px]">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to provide high-quality floral services and communicate with you. Specifically, we use it to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-on-surface-variant/90">
                  <li>Respond to your inquiries, schedule consultations, and prepare tailored floral design proposals.</li>
                  <li>Perform and manage our contract with you, including delivering and installing floral arrangements for your event.</li>
                  <li>Send updates, details about your booking, or answer any questions you may have.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="font-headline-md text-headline-md text-primary text-[22px]">
                  3. Sharing and Disclosure
                </h2>
                <p>
                  We value your trust and do not sell, rent, or trade your personal information. We only share information with third parties (such as venue coordinators, event planners, or installation assistants) if it is strictly necessary to execute our floral services for your event, and only with your prior knowledge or consent. We may also disclose information if required to comply with legal obligations.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-headline-md text-headline-md text-primary text-[22px]">
                  4. Data Security & Retention
                </h2>
                <p>
                  We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. We retain your information only as long as necessary to fulfill the purposes outlined in this policy, complete our services for your event, and meet legal requirements.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-headline-md text-headline-md text-primary text-[22px]">
                  5. Your Rights
                </h2>
                <p>
                  Depending on your location, you may have the right to request access to the personal information we hold about you, correct inaccuracies, or request that we delete your data. To exercise any of these rights, please contact us using the information below.
                </p>
              </div>

              <div className="border-t border-outline-variant/20 pt-8 mt-6 space-y-4">
                <h2 className="font-headline-md text-headline-md text-primary text-[22px]">
                  6. Contact Us
                </h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please feel free to reach out to us:
                </p>
                <address className="not-italic bg-surface-container/50 border border-outline-variant/10 rounded px-6 py-5 space-y-2 max-w-md mt-4">
                  <p className="font-semibold text-primary font-body-lg">Florist SSY</p>
                  <p>Email: <a href={`mailto:${contactEmail}`} className="text-primary hover:underline transition-all">{contactEmail}</a></p>
                  <p>Phone: <a href={`tel:${contactPhone.replace(/\D/g, '')}`} className="text-primary hover:underline transition-all">{contactPhone}</a></p>
                  <p>Location: North and South Georgia &bull; Destination Events</p>
                </address>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
