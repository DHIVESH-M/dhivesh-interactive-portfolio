import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound, playJumpSound } from '../utils/audio';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    playJumpSound();

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#3b82f6', '#ffffff']
    });

    setSubmitted(true);

    // Also prepare mailto link trigger
    const mailtoUrl = `mailto:${personalInfo.contacts.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry for Dhivesh M'
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-[#07080b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>06 &bull; GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            LET'S BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">SOMETHING MEANINGFUL.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            "I'm always interested in exploring ideas, developing useful applications and collaborating on creative technology projects."
          </p>
        </div>

        {/* Contact Layout: Info Cards on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Channels & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Direct Contact Channels
            </h3>

            {/* Email Card */}
            <a
              href={`mailto:${personalInfo.contacts.email}`}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_4px_25px_rgba(0,240,255,0.15)] flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Email Address
                </div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {personalInfo.contacts.email}
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${personalInfo.contacts.phone}`}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_4px_25px_rgba(0,240,255,0.15)] flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Mobile Number
                </div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {personalInfo.contacts.phone}
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Location
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {personalInfo.contacts.location}
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href={personalInfo.contacts.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                className="flex-1 p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all group"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.contacts.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                className="flex-1 p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all group"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs font-mono text-slate-400 mb-8">
                Whether you have an idea for a project, a hackathon invitation, or an internship opportunity, feel free to reach out.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Thank You for Connecting!</h4>
                  <p className="text-sm text-slate-300 font-mono max-w-md mx-auto">
                    Your message is opening your default mail client to dispatch directly to <strong className="text-cyan-300">{personalInfo.contacts.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Collaboration / Internship Opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your idea or project..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={playHoverSound}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Dhivesh</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
