import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const FooterSection = () => {
    const scrollToTop = () => {
        document.getElementById("home")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <footer className="relative bg-slate-950 border-t border-slate-900 py-10 px-6 text-slate-400">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Copyright Text */}
                <div className="text-xs font-mono text-slate-500 text-center md:text-left">
                    © {new Date().getFullYear()} Himanshu Raj Vaishnav. All rights reserved.
                </div>

                {/* Back To Top Button */}
                <button
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] group hover:-translate-y-0.5"
                >
                    <span>Back To Top</span>
                    <FaArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </div>
        </footer>
    );
};

export default FooterSection;