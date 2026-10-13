import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Button from './Button';
import { submitEnquiry } from '../services/enquiryService';

const SERVICES = [
  'Web Development',
  'E-commerce Solutions',
  'AI Automation & Agents',
  'SEO & Growth Marketing',
  'Google Ads & Performance',
  'Maintenance & Operations',
  'Other'
];

const BUDGETS = [
  '₹1L - ₹3L',
  '₹3L - ₹7L',
  '₹7L - ₹15L',
  '₹15L+',
  'Flexible / To Discuss'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Web Development',
    budget: '₹3L - ₹7L',
    message: '',
    website_hp: '' // Honeypot field for bot detection
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid work email address.';
    }

    if (formData.phone.trim() && !/^[+0-9\s\-()]{7,25}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. +91 98765 43210).';
    }

    if (!formData.service) {
      errs.service = 'Please choose a primary service of interest.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters describing your project goals.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitEnquiry(formData);
      if (response.success) {
        setSubmitSuccess(true);
        // Only reset form data on verified success
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: 'Web Development',
          budget: '₹3L - ₹7L',
          message: '',
          website_hp: ''
        });
        setErrors({});
      } else {
        setServerError(response.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch (err) {
      setServerError(err.message || 'Network connection failed. Your entered information is preserved below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-premium">
      {/* Success Notification */}
      {submitSuccess ? (
        <div className="text-center py-10 px-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-brand-black mb-2">Enquiry Received</h3>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed mb-6">
            Thank you! Your project request has been securely stored in our lead pipeline. Our senior technical director will review your requirements and reach out within 24 hours.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitSuccess(false)}
          >
            Submit Another Project Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-red bg-brand-redLight px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Discovery Desk</span>
            </div>
            <h3 className="text-2xl font-black text-brand-black">Tell us about your project</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Share your business objectives, timeline, and current hurdles. We usually respond in under 4 hours on business days.
            </p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Submission Error</p>
                <p className="text-xs text-red-700 mt-0.5">{serverError}</p>
                <p className="text-xs text-neutral-600 mt-1">Don't worry—your entered inputs below have been saved.</p>
              </div>
            </div>
          )}

          {/* Honeypot hidden input for anti-bot filtering */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website_hp">Leave this empty</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Full Name <span className="text-brand-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Aarav Sharma"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors.name
                    ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200'
                    : 'border-brand-border bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10'
                }`}
                disabled={isSubmitting}
                required
              />
              {errors.name && <p className="text-xs text-red-600 mt-1 font-medium">{errors.name}</p>}
            </div>

            {/* Work Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Work Email <span className="text-brand-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="aarav@company.in"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors.email
                    ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200'
                    : 'border-brand-border bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10'
                }`}
                disabled={isSubmitting}
                required
              />
              {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Company / Organization <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Apex Retail Tech"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 focus:outline-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Phone / WhatsApp <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors.phone
                    ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200'
                    : 'border-brand-border bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10'
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Service of Interest <span className="text-brand-red">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 focus:outline-none"
                disabled={isSubmitting}
                required
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-xs text-red-600 mt-1 font-medium">{errors.service}</p>}
            </div>

            {/* Budget Range (INR) */}
            <div>
              <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Approximate Budget (INR) <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 focus:outline-none"
                disabled={isSubmitting}
              >
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message / Project Description */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              Project Description &amp; Scope <span className="text-brand-red">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about what you want to build, current challenges, target audience, and preferred timelines..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                errors.message
                  ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200'
                  : 'border-brand-border bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/10'
              }`}
              disabled={isSubmitting}
              required
            />
            {errors.message && <p className="text-xs text-red-600 mt-1 font-medium">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500">
              🔒 All details treated with strict non-disclosure. No spam guarantee.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              icon={Send}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Submit Project Inquiry
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
