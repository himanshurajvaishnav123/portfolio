import React from 'react';
import { FaEnvelope, FaLinkedin, FaInstagram, FaPaperPlane, FaMagic } from 'react-icons/fa';

const ContactSection = ({ 
    formRef, 
    formData, 
    handleChange, 
    handleSendEmail, 
    statusMessage, 
    isSending 
}) => {
    return (
        <section
            id="contact"
            className="relative py-28 px-6 overflow-hidden bg-slate-950 text-slate-100"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                        <FaMagic className="w-3 h-3" /> Get In Touch
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                        Let's Work Together
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
                        Have a project in mind or want to connect? Drop a message below or reach out via socials.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form Card */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative group hover:border-cyan-500/30 transition-all duration-500">
                        {statusMessage?.text && (
                            <div className={`text-xs font-mono p-4 rounded-xl mb-6 border transition-all duration-300 ${
                                statusMessage.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                            }`}>
                                {statusMessage.text}
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleSendEmail} className="space-y-5">
                            <div>
                                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="from_name"
                                    placeholder="Your Name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-cyan-400 text-slate-100 text-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] placeholder:text-slate-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="reply_to"
                                    placeholder="enter your Email"
                                    value={formData.reply_to}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-cyan-400 text-slate-100 text-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] placeholder:text-slate-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-cyan-400 text-slate-100 text-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] resize-none placeholder:text-slate-600"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                            >
                                <FaPaperPlane className="w-4 h-4" />
                                {isSending ? 'Transmitting...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Socials & Info Side */}
                    <div className="flex flex-col justify-between h-full space-y-8 md:pt-4">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-100">
                                Contact Information
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                I'm always open to discussing web development, AI integration, full-stack projects, or freelance opportunities. Feel free to reach out directly through any platform below.
                            </p>

                            {/* Email Pill */}
                            <div className="space-y-4 pt-2">
                                <a 
                                    href="mailto:himanshurajvaishnav@gmail.com" 
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 group"
                                >
                                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                                        <FaEnvelope className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-mono">EMAIL</div>
                                        <div className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                                            himanshurajvaishnav@gmail.com
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                                Connect Socially
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/in/himanshu-raj-vaishnav-a09962363"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://www.instagram.com/himanshu_raj_vaishnav"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;