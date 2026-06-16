"use client";

import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [venue, setVenue] = useState('');
  const [budget, setBudget] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [message, setMessage] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Wedding Date 필드의 포커스 여부 관리 (라벨 겹침 방지 및 type="date" 동적 활성화 목적)
  const [isDateFocused, setIsDateFocused] = useState(false);

  // 전화번호 자동 포맷팅 헬퍼 함수
  const formatPhoneInput = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    const [, p1, p2, p3] = match;
    if (cleaned.length <= 3) return p1;
    if (cleaned.length <= 6) return `(${p1}) ${p2}`;
    return `(${p1}) ${p2}-${p3}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneInput(e.target.value));
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 모달이 열리면 body 스크롤 고정
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // 필수 필드 값 비어있는지 2차 검증
    if (
      !firstName.trim() || 
      !lastName.trim() || 
      !email.trim() || 
      !phone.trim() || 
      !weddingDate || 
      !venue.trim() || 
      !budget || 
      !guestCount
    ) {
      setErrorMsg('All fields marked with an asterisk (*) are required.');
      setIsLoading(false);
      return;
    }

    // 이메일 정규식 유효성 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    // 전화번호 최소 자리수(10자리) 유효성 검증
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          weddingDate,
          venue,
          budget,
          guestCount,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
      // 필드 클리어
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setWeddingDate('');
      setVenue('');
      setBudget('');
      setGuestCount('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-background text-primary w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded border border-outline-variant/20 flex flex-col z-10 transition-transform duration-300 scale-100 shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center z-20">
          <h2 id="modal-title" className="font-headline-md text-[20px] md:text-[24px] text-primary">
            Inquire for Bespoke Florals
          </h2>
          <button 
            onClick={onClose}
            className="text-primary/60 hover:text-primary transition-colors p-1.5 hover:bg-surface-container rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12 px-4 space-y-6">
              <div className="w-16 h-16 bg-secondary-container/45 rounded-full flex items-center justify-center mx-auto text-on-secondary-container">
                <span className="material-symbols-outlined text-[32px]">done</span>
              </div>
              <h3 className="font-headline-md text-[22px] text-primary">Thank You!</h3>
              <p className="font-body-md text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Your wedding floral inquiry has been sent successfully. Soyoun will review your details and get in touch with you shortly.
              </p>
              <button 
                onClick={() => { setSubmitted(false); onClose(); }}
                className="mt-6 bg-primary-container text-on-primary font-label-caps text-label-caps py-3.5 px-10 rounded hover:bg-primary transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-body-md">
              {errorMsg && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded text-[13px] border border-red-100 dark:border-red-900/30" role="alert">
                  {errorMsg}
                </div>
              )}

              {/* Name Fields (First Name & Last Name) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type="text"
                    id="first-name"
                    required
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="first-name" 
                    className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type="text"
                    id="last-name"
                    required
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="last-name" 
                    className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              {/* Email & Phone Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type="email"
                    id="modal-email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="modal-email" 
                    className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type="tel"
                    id="modal-phone"
                    required
                    placeholder="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="modal-phone" 
                    className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              {/* Wedding Date & Venue Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type={isDateFocused || weddingDate ? "date" : "text"}
                    id="wedding-date"
                    required
                    placeholder=" "
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={() => setIsDateFocused(false)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="wedding-date" 
                    className={`absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary ${
                      weddingDate || isDateFocused ? 'top-1 text-[9px] text-tertiary' : ''
                    }`}
                  >
                    Wedding Date <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type="text"
                    id="venue"
                    required
                    placeholder="Venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="venue" 
                    className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                  >
                    Venue <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              {/* Floral Budget & Expected Guest Count Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <select
                    id="budget"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23061b0e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 0 center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                  >
                    <option value="" disabled hidden></option>
                    <option value="Under $3,000">Under $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000 - $7,500">$5,000 - $7,500</option>
                    <option value="$7,500 - $10,000">$7,500 - $10,000</option>
                    <option value="$10,000 - $15,000">$10,000 - $15,000</option>
                    <option value="$15,000+">$15,000+</option>
                  </select>
                  <label 
                    htmlFor="budget" 
                    className={`absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary ${
                      budget ? 'top-1 text-[9px] text-tertiary' : ''
                    }`}
                  >
                    Floral Budget <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                  <input
                    type="number"
                    id="guest-count"
                    required
                    min="1"
                    placeholder="Anticipated Guest Count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    disabled={isLoading}
                    className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent"
                  />
                  <label 
                    htmlFor="guest-count" 
                    className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                  >
                    Anticipated Guest Count <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              {/* Message / Share Textarea Field */}
              <div className="relative bg-white rounded-t border-b border-outline-variant/50 focus-within:border-tertiary transition-colors pt-6 px-3">
                <textarea
                  id="modal-message"
                  rows={4}
                  placeholder="Anything you would like to share?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  className="peer w-full bg-transparent border-0 px-0 py-1.5 font-body-md text-primary focus:ring-0 focus-visible:outline-none placeholder-transparent resize-none"
                />
                <label 
                  htmlFor="modal-message" 
                  className="absolute left-3 top-6 font-label-caps text-[10px] tracking-widest text-primary/40 uppercase transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-tertiary"
                >
                  Anything you would like to share?
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-container text-on-primary font-label-caps text-label-caps py-4 px-8 rounded hover:bg-primary transition-colors mt-8 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container disabled:opacity-50"
              >
                {isLoading ? 'Sending Inquiry...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
