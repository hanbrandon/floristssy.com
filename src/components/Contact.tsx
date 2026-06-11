"use client";

import React, { useState } from 'react';

const Contact: React.FC = () => {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'floristssy@gmail.com';
  const contactPhoneRaw = process.env.NEXT_PUBLIC_CONTACT_PHONE || '9179928888';

  const formatPhoneNumber = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const contactPhone = formatPhoneNumber(contactPhoneRaw);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="contact">
      <div className="bg-surface p-8 md:p-24 rounded border border-outline-variant/20 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter relative z-10">
          <div className="space-y-8 pr-0 md:pr-12">
            <h2 className="font-headline-lg md:text-headline-lg text-[28px] text-primary">Begin a Conversation</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We invite you to reach out for editorial inquiries, bespoke event design, or daily deliveries.
            </p>
            <address className="space-y-6 pt-8 not-italic">
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-2">Studio & Regions</h3>
                <p className="font-body-md text-on-surface-variant">
                  Buford • Atlanta • Destination
                </p>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-2">Contact</h3>
                <div className="flex flex-col space-y-1 font-body-md text-on-surface-variant">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-tertiary"
                  >
                    {contactEmail}
                  </a>
                  <a
                    href={`tel:${contactPhoneRaw}`}
                    className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-tertiary text-[14px]"
                  >
                    {contactPhone}
                  </a>
                </div>
              </div>
            </address>
          </div>
          <div>
            {submitted ? (
              <div
                className="p-8 bg-secondary-container text-on-secondary-container rounded"
                role="alert"
                aria-live="polite"
              >
                <h3 className="font-headline-md text-headline-md mb-4">Thank you!</h3>
                <p className="font-body-md">Your inquiry has been sent successfully. We will get back to you shortly.</p>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded text-[13px] border border-red-100 dark:border-red-900/30" role="alert">
                    {errorMsg}
                  </div>
                )}
                <div className="relative pt-6">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-primary transition-colors placeholder-transparent focus-visible:outline-none"
                    id="name"
                    placeholder="Name"
                    type="text"
                    required
                    aria-required="true"
                    autoComplete="name"
                    value={name}
                    disabled={isLoading}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    className="absolute left-0 top-7 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                    htmlFor="name"
                  >
                    Name
                  </label>
                </div>
                <div className="relative pt-6">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-primary transition-colors placeholder-transparent focus-visible:outline-none"
                    id="email"
                    placeholder="Email"
                    type="email"
                    required
                    aria-required="true"
                    autoComplete="email"
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    className="absolute left-0 top-7 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                    htmlFor="email"
                  >
                    Email
                  </label>
                </div>
                <div className="relative pt-6">
                  <textarea
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:ring-0 px-0 py-2 font-body-md text-primary transition-colors placeholder-transparent resize-none focus-visible:outline-none"
                    id="message"
                    placeholder="Message"
                    rows={4}
                    required
                    aria-required="true"
                    value={message}
                    disabled={isLoading}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <label
                    className="absolute left-0 top-7 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                    htmlFor="message"
                  >
                    Message
                  </label>
                </div>
                <button
                  className="w-full bg-primary-container text-on-primary font-label-caps text-label-caps py-4 px-8 rounded hover:bg-primary transition-colors mt-8 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container disabled:opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Inquire'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
