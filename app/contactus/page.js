"use client";
import React, { useEffect, useState } from "react";
import Map from "../../public/Map.png";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    insuranceType: "",
  });

  const [showToast, setShowToast] = useState(false);

  const showSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showSuccessToast();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      insuranceType: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [translations, setTranslations] = useState({});
  const { language } = useLanguage();
  // ✅ Centralized text dictionary
  const texts = {
    toastSuccess: "Message sent successfully!",
    toastNote: "We'll get back to you within 24 hours.",
    bannerTag: "Contact Support",
    bannerTitle: "Get in Touch",
    bannerDesc:
      "We're here to help you find the perfect insurance solution. Contact our experts today for personalized assistance.",
    contactInfoTitle: "Contact Information",
    contactInfoDesc:
      "Get in touch with our insurance experts. We're available 24/7 to assist you with all your insurance needs.",
    emailSupportTitle: "Email Support",
    emailSupportDesc: "Send us an email",
    email1: "support@costaricainsurance.com",
    email2: "claims@costaricainsurance.com",
    formTitle: "Send us a Message",
    formDesc:
      "Fill out the form below and our team will get back to you within 24 hours.",
    firstNameLabel: "First Name *",
    firstNamePlaceholder: "John",
    lastNameLabel: "Last Name *",
    lastNamePlaceholder: "Doe",
    emailLabel: "Email Address *",
    emailPlaceholder: "john.doe@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    insuranceTypeLabel: "Insurance Type",
    insuranceTypePlaceholder: "Select insurance type",
    insuranceTypeAuto: "Auto Insurance",
    insuranceTypeHome: "Home Insurance",
    insuranceTypeLife: "Life Insurance",
    insuranceTypeHealth: "Health Insurance",
    insuranceTypeBusiness: "Business Insurance",
    insuranceTypeTravel: "Travel Insurance",
    subjectLabel: "Subject *",
    subjectPlaceholder: "How can we help you?",
    messageLabel: "Message *",
    messagePlaceholder: "Please describe your inquiry in detail...",
    privacyTitle: "Your privacy is protected",
    privacyDesc:
      "We use industry-standard encryption to protect your personal information and will never share your data with third parties.",
    submitBtn: "Send Message",
  };

  // ✅ Translate helper
  async function translateText(text, targetLang) {
    if (!text || targetLang === "en") return text;
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json();
      return data.translatedText || text;
    } catch (err) {
      console.error("Translation error:", err);
      return text;
    }
  }

  // ✅ Translate all texts dynamically when language changes
  useEffect(() => {
    async function doTranslate() {
      if (language === "en") {
        setTranslations(texts);
        return;
      }
      const translated = {};
      for (let [key, value] of Object.entries(texts)) {
        translated[key] = await translateText(value, language);
      }
      setTranslations(translated);
    }
    doTranslate();
  }, [language]);

  return (
    <div
      style={{ backgroundImage: `url(${Map.src})` }}
      className="min-h-screen  bg-gradient-to-b  bg-contain bg-no-repeat from-background to-muted/30  dark:from-gray-900 dark:to-gray-800 "
    >
      <div className="absolute inset-0 bg-[#fff8ea] animate-pulse  top-[60%] left-[20%] rounded-2xl h-[20px] w-[20px]"></div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right dark:bg-green-700 dark:text-white">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-medium">
                {translations.toastSuccess || "Message sent successfully!"}
              </p>
              <p className="text-sm opacity-90">
                {translations.toastNote ||
                  "We will get back to you within 24 hours."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r h-[300px]  bg-center from-primary to-accent py-16 dark:from-white/5 dark:to-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground dark:text-white">
            <span className="inline-flex items-center gap-1 bg-white text-[#171717] border border-white/30 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {translations.bannerTag || texts.bannerTag}
            </span>
            <h1 className="text-2xl md:text-3xl font-[Marcellus] font-bold mb-6 dark:text-white">
              {translations.bannerTitle || texts.bannerTitle}
            </h1>
            <p className="text-[14px] md:text-[14px] max-w-3xl mx-auto opacity-90 dark:text-gray-300">
              {translations.bannerDesc || texts.bannerDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="  sm:px-6 lg:px-8   px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold  font-[Marcellus] mb-6 dark:text-white">
                {translations.contactInfoTitle || texts.contactInfoTitle}
              </h2>
              <p className="text-muted-foreground mb-8 dark:text-gray-300">
                {translations.contactInfoDesc || texts.contactInfoDesc}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* <div className="bg-white border border-slate-200 rounded-2xl border-l-4 border-l-[#f59f0a] hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 bg-[#fef6ea] rounded-lg">
                      <svg
                        className="h-6 w-6 text-[#f59f0a] text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Phone Support
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Call us directly
                      </p>
                      <p className="font-medium text-[#f59f0a] text-primary">
                        +1 (555) 123-4567
                      </p>
                      <p className="font-medium text-[#f59f0a] text-primary">
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="bg-white border dark:bg-white/10 dark:border-gray-800 border-slate-200 rounded-2xl border-l-4 border-l-[#f59f0a] hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 bg-[#fef6ea] pn:max-ss:hidden rounded-lg ">
                      <svg
                        className="h-6 w-6 text-[#f59f0a] text-accent dark:text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 dark:text-white">
                        {translations.emailSupportTitle ||
                          texts.emailSupportTitle}
                      </h3>
                      <p className="text-muted-foreground mb-2  dark:text-gray-300">
                        {translations.emailSupportDesc ||
                          texts.emailSupportDesc}
                      </p>
                      <p className="font-medium text-[#f59f0a] pn:max-ss:text-[13px]  text-primary  dark:text-yellow-400">
                        {translations.email1 || texts.email1}
                      </p>
                      <p className="font-medium text-[#f59f0a]  pn:max-ss:text-[13px] text-primary dark:text-yellow-400">
                        {translations.email2 || texts.email2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white border border-slate-200 rounded-2xl border-l-4 border-l-green-400 hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3  rounded-lg">
                      <svg
                        className="h-6 w-6 text-green-400 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Office Location
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Visit our main office
                      </p>
                      <p className="font-medium">
                        123 Insurance Ave, Suite 400
                      </p>
                      <p className="font-medium">San José, Costa Rica 10101</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-2xl">
                      <svg
                        className="h-6 w-6 text-[#f59f0a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Business Hours
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        We're here when you need us
                      </p>
                      <p className="font-medium">
                        Mon - Fri: 8:00 AM - 6:00 PM
                      </p>
                      <p className="font-medium">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="font-medium">Sunday: Emergency only</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 ">
            <div className="bg-white border dark:bg-white/10 border-slate-200 dark:border-gray-700 rounded-3xl">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold  font-[Marcellus] mb-4 dark:text-white">
                    {translations.formTitle || texts.formTitle}
                  </h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    {translations.formDesc || texts.formDesc}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        {translations.firstNameLabel || texts.firstNameLabel}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full h-12 px-3 py-2 bg-background   dark:text-white border dark:border-gray-600 dark:bg-white/20 border-slate-200 rounded-2xl border-input  focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        {translations.lastNameLabel || texts.lastNameLabel}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full h-12 px-3 py-2 bg-background border border-input dark:bg-white/20 dark:border-gray-600 dark:text-white border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block dark:text-gray-200 text-sm font-medium mb-2">
                        {translations.emailLabel || texts.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="w-full h-12 px-3 py-2 dark:bg-white/20 dark:border-gray-600 dark:text-white bg-background border border-input border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block  dark:text-gray-200 text-sm font-medium mb-2">
                        {translations.phoneLabel || texts.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full h-12 px-3 py-2 dark:bg-white/20 dark:border-gray-600 dark:text-white bg-background border border-input border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block dark:text-gray-200 text-sm font-medium mb-2">
                        {translations.insuranceTypeLabel ||
                          texts.insuranceTypeLabel}
                      </label>
                      <select
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleInputChange}
                        className="w-full h-12 px-3 dark:bg-white/20 dark:border-gray-600 dark:text-white py-2 bg-background border border-input border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        <option value="">
                          {translations.insuranceTypePlaceholder ||
                            texts.insuranceTypePlaceholder}
                        </option>
                        <option value="auto">
                          {translations.insuranceTypeAuto ||
                            texts.insuranceTypeAuto}
                        </option>
                        <option value="home">
                          {translations.insuranceTypeHome ||
                            texts.insuranceTypeHome}
                        </option>
                        <option value="life">
                          {translations.insuranceTypeLife ||
                            texts.insuranceTypeLife}
                        </option>
                        <option value="health">
                          {translations.insuranceTypeHealth ||
                            texts.insuranceTypeHealth}
                        </option>
                        <option value="business">
                          {translations.insuranceTypeBusiness ||
                            texts.insuranceTypeBusiness}
                        </option>
                        <option value="travel">
                          {translations.insuranceTypeTravel ||
                            texts.insuranceTypeTravel}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block dark:text-gray-200 text-sm font-medium mb-2">
                        {translations.subjectLabel || texts.subjectLabel}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        className="w-full h-12 px-3 py-2 dark:bg-white/20 dark:border-gray-600 dark:text-white bg-background border border-input border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block dark:text-gray-200 text-sm font-medium mb-2">
                      {translations.messageLabel || texts.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your inquiry in detail..."
                      className="w-full min-h-[120px] dark:bg-white/20 dark:border-gray-600 dark:text-white px-3 py-2 bg-background border border-input border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <svg
                      className="h-5 w-5 text-[#f59f0a] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-1 dark:text-white">
                        {translations.privacyTitle || texts.privacyTitle}
                      </p>
                      <p className="dark:text-white">
                        {translations.privacyDesc || texts.privacyDesc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 text-lg bg-[#f59f0a] text-white font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground border-slate-200 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    {translations.submitBtn}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Support Options
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-[Marcellus] mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the communication method that works best for you. We're
              committed to providing excellent customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card border border-slate-200 rounded-3xl hover:shadow-3xl transition-all duration-300 hover:border-orange-200">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-[#f59f0a] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold  font-[Marcellus] mb-2">
                Live Chat
              </h3>
              <p className="text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <span className="inline-flex items-center text-green-800 bg-green-100 gap-1 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                <svg
                  className="h-3 w-3 text-green-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Available Now
              </span>
            </div>

            <div className="text-center p-8 bg-card border border-slate-200 rounded-3xl hover:shadow-3xl transition-all duration-300 hover:border-orange-200">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <svg
                  className="h-8 w-8  text-[#f59f0a] text-accent mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Branch Visit</h3>
              <p className="text-muted-foreground mb-4">
                Meet with our agents in person
              </p>
              <span className="inline-flex items-center gap-1 bg-background border border-border text-foreground px-3 py-1 rounded-full text-sm font-medium">
                Schedule Appointment
              </span>
            </div>

            <div className="text-center p-8 bg-card border border-slate-200 rounded-3xl hover:shadow-3xl transition-all duration-300 hover:border-orange-200">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-[#f59f0a] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">
                Message us on WhatsApp for quick support
              </p>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                +506 8888-9999
              </span>
            </div>
          </div>
        </div> */}

        {/* FAQ Section */}
        {/* <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold  font-[Marcellus] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our insurance
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold text-lg mb-3">
                How quickly do you respond to inquiries?
              </h3>
              <p className="text-muted-foreground">
                We typically respond to all inquiries within 2-4 hours during
                business hours and within 24 hours on weekends.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold text-lg mb-3">
                What documents do I need for a quote?
              </h3>
              <p className="text-muted-foreground">
                The required documents vary by insurance type. Our team will
                guide you through the specific requirements when you contact us.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold text-lg mb-3">
                Do you offer coverage throughout Costa Rica?
              </h3>
              <p className="text-muted-foreground">
                Yes, we provide comprehensive insurance coverage throughout all
                provinces of Costa Rica with local agents in major cities.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold text-lg mb-3">
                Can I file claims online?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! We offer a streamlined online claims process
                available 24/7 through our customer portal and mobile app.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
