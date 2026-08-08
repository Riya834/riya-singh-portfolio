import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { portfolioAPI } from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';

export const Contact = () => {
  const { profile } = usePortfolio();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const res = await portfolioAPI.submitContact(data);
      if (res.success) {
        setSuccessMessage(res.message || 'Thank you! Your message has been sent successfully.');
        reset();
      } else {
        setErrorMessage(res.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while sending your message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 bg-brand-bg border-t border-brand-border/60">
      {/* Blueprint Grid & Glow */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // GET IN TOUCH
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
            LET'S BUILD <br />
            <span className="text-brand-electric">SOMETHING GREAT.</span>
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Have an opportunity, project idea, or technical problem to solve? I'm always open to discussing web applications, full-stack engineering, or UI/UX designs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="glass-panel rounded-3xl p-6 border border-brand-border/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric shrink-0 shadow-electric">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand-electric uppercase tracking-widest block mb-1">
                  EMAIL ADDRESS
                </span>
                <a
                  href={`mailto:${profile?.email || 'riyarssingh22@gmail.com'}`}
                  className="font-display font-bold text-base text-white hover:text-brand-electric transition-colors"
                >
                  {profile?.email || 'riyarssingh22@gmail.com'}
                </a>
                <p className="text-xs text-brand-muted mt-1 font-mono">Response time within 24 hours.</p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-brand-border/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric shrink-0 shadow-electric">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand-electric uppercase tracking-widest block mb-1">
                  PHONE NUMBER
                </span>
                <a
                  href={`tel:${profile?.phone || '+918340154678'}`}
                  className="font-display font-bold text-base text-white hover:text-brand-electric transition-colors"
                >
                  {profile?.phone || '+91 8340154678'}
                </a>
                <p className="text-xs text-brand-muted mt-1 font-mono">Available for voice / WhatsApp.</p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-brand-border/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric shrink-0 shadow-electric">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand-electric uppercase tracking-widest block mb-1">
                  CURRENT LOCATION
                </span>
                <p className="font-display font-bold text-base text-white">
                  {profile?.location || 'Punjab / Jharkhand, India'}
                </p>
                <p className="text-xs text-brand-muted mt-1 font-mono">Open to remote & on-site positions.</p>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="glass-panel rounded-3xl p-6 border border-brand-border/80 space-y-3">
              <span className="font-mono text-xs text-brand-electric uppercase tracking-widest font-semibold block">
                Connect Across Platforms
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={profile?.socialLinks?.github || 'https://github.com/Riya834'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-brand-card border border-brand-border text-white text-xs font-mono font-medium flex items-center justify-center gap-2 hover:border-brand-electric hover:bg-brand-electric/10 transition-all"
                >
                  <Github className="w-4 h-4 text-brand-electric" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/riya-singh-5b71b7248/?skipRedirect=true'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-brand-card border border-brand-border text-white text-xs font-mono font-medium flex items-center justify-center gap-2 hover:border-brand-electric hover:bg-brand-electric/10 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-brand-electric" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-brand-border/80 shadow-2xl relative">
              
              <h3 className="font-display font-bold text-xl text-white mb-6">
                Send a Direct Message
              </h3>

              {/* Success Alert */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full bg-brand-card/90 border border-brand-border/80 focus:border-brand-electric rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                    {errors.name && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.name.message}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-2">Your Email *</label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@company.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      className="w-full bg-brand-card/90 border border-brand-border/80 focus:border-brand-electric rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                    {errors.email && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-2">Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack Developer Opportunity / Project Inquiry"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full bg-brand-card/90 border border-brand-border/80 focus:border-brand-electric rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                  {errors.subject && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.subject.message}</span>}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-2">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project, team, or inquiry..."
                    {...register('message', { required: 'Message body cannot be empty' })}
                    className="w-full bg-brand-card/90 border border-brand-border/80 focus:border-brand-electric rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                  {errors.message && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.message.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-brand-electric hover:bg-brand-electricHover disabled:opacity-50 text-white font-medium text-xs tracking-wider uppercase shadow-electric hover:shadow-electric-lg flex items-center justify-center gap-2 transition-all"
                >
                  {submitting ? (
                    <span className="font-mono text-xs">Sending Message...</span>
                  ) : (
                    <>
                      <span>Submit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
