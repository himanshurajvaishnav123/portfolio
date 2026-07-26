import myPhoto from "../assets/mypic.jpeg";
import React, { useState, useRef } from 'react'; // Added useRef here
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // Added emailjs import as wellx
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import ContactSection from "../component/ContectSection";
import FooterSection from "../component/FooterSection";

function PortfolioHome() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const formRef = useRef();
    const [formData, setFormData] = useState({ from_name: '', reply_to: '', message: '' });
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        setStatusMessage({ text: '', type: '' });

        // Reading keys safely from the .env file
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // Check if env variables are loaded correctly
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setStatusMessage({
                text: '❌ Configuration Error: Environment variables are missing.',
                type: 'error'
            });
            setIsSending(false);
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                setStatusMessage({
                    text: '⚡ Message transmitted successfully! I will reach out soon.',
                    type: 'success'
                });
                setFormData({ from_name: '', reply_to: '', message: '' }); // Clear Form fields
            })
            .catch((error) => {
                setStatusMessage({
                    text: '❌ Connection failed. Please try again or email directly.',
                    type: 'error'
                });
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                setIsSending(false);
            });
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white">

            {/* NAVBAR WITH GLASSMORPHISM & LIGHTING ACCENTS */}
<header className="fixed top-0 left-0 w-full z-50">
    <nav className="h-[70px] bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 md:px-12 relative z-50">

        {/* Logo */}
        <a href="#home" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform duration-300">
            Portfolio<span className="text-cyan-400">.</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wider uppercase text-slate-300">
            {["home", "about", "projects", "services", "contact"].map((item) => (
                <li key={item}>
                    <a 
                        href={`#${item}`} 
                        className="relative py-2 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                        {/* Hover Underline Glow */}
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:w-full transition-all duration-300" />
                    </a>
                </li>
            ))}
        </ul>

        {/* Mobile Button */}
        <button
            aria-label="Toggle Menu"
            className="md:hidden text-2xl text-cyan-400 focus:outline-none p-2 rounded-lg bg-slate-900 border border-slate-800 shadow-[0_0_15px_rgba(34,211,238,0.2)] active:scale-95 transition duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            {menuOpen ? "✕" : "☰"}
        </button>
    </nav>

    {/* Mobile Menu Overlay */}
    <div 
        className={`fixed top-[70px] left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center gap-6 text-base font-mono tracking-wider uppercase text-slate-200 md:hidden z-40 overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen
                ? "max-h-[400px] opacity-100 py-8 translate-y-0"
                : "max-h-0 opacity-0 py-0 -translate-y-8 pointer-events-none"
        }`}
    >
        {["home", "about", "projects", "services", "contact"].map((item) => (
            <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
        ))}
    </div>
</header>
            {/* HOME / HERO SECTION WITH DYNAMIC LIGHTING & BOUNCE EFFECT */}
            <section
                id="home"
                className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-[60px] bg-slate-950 text-slate-100 overflow-hidden"
            >
                {/* Background Lighting & Glow Effects */}
                <div className="absolute w-80 h-80 bg-cyan-500/30 blur-3xl rounded-full top-20 left-10 animate-lighting animate-pulse pointer-events-none shadow-[0_0_80px_rgba(34,211,238,0.5)]" />

                <div className="absolute w-80 h-80 bg-blue-500/30 blur-3xl rounded-full bottom-20 right-10 animate-lighting animate-pulse pointer-events-none shadow-[0_0_80px_rgba(59,130,246,0.5)]" style={{ animationDelay: '3s' }} />

                {/* Center Ambient Light Sphere */}
                <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none animate-lighting" />

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center animate-fadeIn">

                    {/* Animated Bouncing Heading with Neon Text Shadow */}
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-bounce drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                        Hi, I'm Himanshu Raj Vaishnav
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-8 text-center font-light drop-shadow-sm">
                        I build modern web applications, business management systems, and scalable backend solutions using React, Node.js and MongoDB.
                    </p>

                    {/* Scroll Button */}
                    <button
                        onClick={() => {
                            window.scrollBy({
                                top: 600,
                                behavior: "smooth",
                            });
                        }}
                        className="mt-14 flex flex-col items-center cursor-pointer group transition duration-300"
                    >
                        <span className="text-gray-400 text-sm mb-3 group-hover:text-cyan-400 transition duration-300 tracking-wider font-mono">
                            Explore More
                        </span>

                        {/* Glowing Scroller Frame */}
                        <div className="w-10 h-16 border-2 border-cyan-400 rounded-full flex justify-center items-start p-2 shadow-[0_0_25px_rgba(34,211,238,0.6)] group-hover:shadow-[0_0_40px_rgba(34,211,238,1)] transition duration-300 bg-cyan-950/20 backdrop-blur-sm">
                            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce mt-1 shadow-[0_0_12px_rgba(34,211,238,1)]" />
                        </div>
                    </button>

                </div>
            </section>
            {/* ABOUT SECTION WITH LIGHTING COORDINATION */}
            <section id="about" className="relative py-28 px-6 scroll-mt-16 md:scroll-mt-24 bg-slate-950 text-slate-100 overflow-hidden">

                {/* Coordinated Ambient Neon Lighting Background */}
                <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none animate-lighting" />
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none animate-lighting" style={{ animationDelay: '3s' }} />

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

                    {/* Profile Image Container with Glow Effect */}
                    <div className="flex justify-center relative group">
                        {/* Pulsing Light Aura around Image */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 blur-xl opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />

                        <img
                            src={myPhoto}
                            alt="Profile"
                            className="relative z-10 w-72 h-72 md:w-80 md:h-80 object-cover rounded-full border-2 border-cyan-400/80 shadow-[0_0_50px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Text & Information */}
                    <div className="text-center md:text-left flex-1">

                        {/* Title Badge */}
                        <small className="inline-block px-4 py-1.5 mb-5 text-xs font-mono font-semibold uppercase tracking-[2px] text-cyan-300 border border-cyan-400/40 rounded-full bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md">
                            Full Stack MERN Developer
                        </small>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 mb-6 tracking-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                            About Me
                        </h2>

                        <p className="text-slate-300 text-base md:text-lg leading-relaxed text-justify max-w-2xl font-light">
                            I'm Himanshu Raj Vaishnav, a Full Stack MERN Developer passionate about
                            building modern and scalable web applications.
                            <br /><br />
                            I recently completed my BCA and a MERN Stack Internship, where I worked
                            with React.js, Node.js, Express.js and MongoDB.
                            <br /><br />
                            I enjoy building business management systems, responsive dashboards,
                            REST APIs and authentication systems that solve real-world problems.
                            <br /><br />
                            I'm currently looking for freelance projects, remote opportunities and
                            collaborations where I can help businesses build reliable web solutions.
                        </p>

                        {/* Highlights Grid with Glassmorphic Lighting Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 mt-8 max-w-2xl text-slate-200">
                            {[
                                { icon: "🎓", label: "BCA Graduate" },
                                { icon: "💼", label: "MERN Internship" },
                                { icon: "🚀", label: "3+ Projects" },
                                { icon: "⚛", label: "MERN Stack" },
                                { icon: "🌍", label: "Open To Freelance" },
                                { icon: "📍", label: "India" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 hover:bg-slate-800/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-xs font-medium tracking-wide">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Skill Badges */}
                        <div className="flex flex-wrap gap-2.5 mt-8">
                            {[
                                "React",
                                "Node.js",
                                "Express",
                                "MongoDB",
                                "JavaScript",
                                "Tailwind CSS",
                                "Git",
                                "REST API",
                            ].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Call to Action Button */}
                        <button
                            className="mt-10 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] flex items-center gap-2 mx-auto md:mx-0"
                            onClick={() => {
                                document.getElementById("projects")?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            <span>Explore My Projects</span>
                            <span>→</span>
                        </button>

                    </div>

                </div>
            </section>



            {/* PROJECTS SECTION WITH LIGHTING COORDINATION */}
            <section id="projects" className="py-28 px-6 relative overflow-hidden bg-slate-950 text-slate-100">
                {/* Coordinated Background Lighting / Ambient Neon Glows */}
                <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none animate-lighting" />
                <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-indigo-500/15 blur-[150px] rounded-full pointer-events-none animate-lighting" style={{ animationDelay: '3s' }} />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Section Heading */}
                    <div className="text-center mb-16 space-y-3">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 tracking-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                            My Projects
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">

                        {/* Project Card 1 */}
                        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
                            {/* Internal Card Lighting Accent */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                                    Student Management with React.js and Tailwind CSS
                                </h3>

                                <p className="text-slate-300 text-sm leading-relaxed text-justify">
                                    A complete Student Management System developed using React.js and Tailwind CSS with admin and student login functionality,
                                    student record management,
                                    attendance tracking, marks management,
                                    class and roll number organization,
                                    filtering system, and responsive dashboard design.
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2.5 mt-8">
                                    {["React.js", "Tailwind CSS", "JavaScript", "React Router Dom", "Context API", "Local Storage"].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono px-3.5 py-1.5 rounded-full hover:bg-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/admin-login")}
                                className="relative z-10 mt-8 w-full md:w-auto self-start px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)]"
                            >
                                View Website →
                            </button>
                        </div>

                        {/* Project Card 2 */}
                        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
                            {/* Internal Card Lighting Accent */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                                    Student Management System using MERN Stack
                                </h3>

                                <p className="text-slate-300 text-sm leading-relaxed text-justify">
                                    A complete Full Stack Student Management System developed using
                                    MERN Stack with database integration, authentication system,
                                    admin and student login functionality, attendance management,
                                    filtering system, marks tracking, and percentage calculation.
                                    <br /><br />
                                    This dynamic web application allows students to register and log in
                                    after account creation. The system supports real-time data updates,
                                    where administrators can add, edit, or delete student records anytime,
                                    and all changes are instantly reflected on the student dashboard
                                    through database connectivity.
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2.5 mt-8">
                                    {["React.js", "Node.js", "Express.js", "MongoDB"].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono px-3.5 py-1.5 rounded-full hover:bg-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => window.open("https://student-management-taupe-rho.vercel.app/login", "_blank")}
                                className="relative z-10 mt-8 w-full md:w-auto self-start px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)]"
                            >
                                View Website →
                            </button>
                        </div>

                        {/* Project Card 3 */}
                        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group md:col-span-2 md:max-w-2xl md:mx-auto w-full relative overflow-hidden">
                            {/* Internal Card Lighting Accent */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                                    Movie Search Website
                                </h3>

                                <p className="text-slate-300 text-sm leading-relaxed text-justify">
                                    A movie search web application that fetches movie data using the OMDb API.
                                    Users can search for movies, view the top 10 search results, and access
                                    detailed movie information through a dedicated details page.
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2.5 mt-8">
                                    {["React.js", "API Integration", "OMDb API", "JavaScript"].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono px-3.5 py-1.5 rounded-full hover:bg-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => window.open("https://omdb-movies-ten.vercel.app", "_blank")}
                                className="relative z-10 mt-8 w-full md:w-auto self-start px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)]"
                            >
                                View Website →
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* SERVICES & PRICING SECTION */}
            <section
                id="services"
                className="py-28 px-6 bg-slate-950 text-slate-100 relative overflow-hidden"
            >
                {/* Ambient Glows */}
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 mb-16 tracking-tight">
                        Services & Pricing
                    </h2>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Service Card 1 */}
                        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 group text-left">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                                Frontend Web Development
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed text-justify">
                                I create modern, responsive, and user-friendly frontend websites
                                using React.js, JavaScript, Tailwind CSS, and modern UI practices.
                                If you need only frontend development, I can build websites according
                                to your requirements.
                            </p>
                        </div>

                        {/* Service Card 2 */}
                        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 group text-left">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                                Full Stack Development
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed text-justify">
                                Building complete web applications using frontend and backend
                                technologies including React.js, Node.js, Express.js, MongoDB,
                                authentication systems, APIs, dashboards, and database integration.
                            </p>
                        </div>

                        {/* Service Card 3 */}
                        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 group text-left">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                                Custom Management Systems
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed text-justify">
                                Developing management systems such as ERP and student management
                                systems with features like authentication, admin panels, student
                                registration, data management, attendance systems, and role-based access.
                            </p>
                        </div>
                    </div>

                    {/* Pricing Cards Row */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Pricing Card 1 */}
                        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-cyan-500/40 w-[320px] hover:scale-105 hover:border-cyan-400 transition-all duration-300 text-center relative group">
                            <span className="bg-cyan-500 text-slate-950 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
                                Pricing
                            </span>

                            <h3 className="text-2xl font-bold text-cyan-300 mt-6 mb-3">
                                Frontend Development
                            </h3>

                            <p className="text-slate-400 text-xs leading-relaxed min-h-[40px]">
                                Responsive websites using React.js, JavaScript and Tailwind CSS.
                            </p>

                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-bold">
                                    50% OFF
                                </span>

                                <p className="text-slate-500 line-through text-lg font-mono mt-3">
                                    ₹4999+
                                </p>

                                <p className="text-4xl font-extrabold text-cyan-400 tracking-tight">
                                    ₹2499+
                                </p>
                            </div>

                            <p className="text-slate-500 text-xs font-mono mt-2 uppercase tracking-wider">
                                Starting Price
                            </p>
                        </div>

                        {/* Pricing Card 2 */}
                        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-purple-500/40 w-[320px] hover:scale-105 hover:border-purple-400 transition-all duration-300 text-center relative group">
                            <span className="bg-purple-500 text-slate-950 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
                                Pricing
                            </span>

                            <h3 className="text-2xl font-bold text-purple-300 mt-6 mb-3">
                                Full Stack MERN
                            </h3>

                            <p className="text-slate-400 text-xs leading-relaxed min-h-[40px]">
                                Complete MERN applications with backend, database, APIs and authentication.
                            </p>

                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-bold">
                                    50% OFF
                                </span>

                                <p className="text-slate-500 line-through text-lg font-mono mt-3">
                                    ₹9999+
                                </p>

                                <p className="text-4xl font-extrabold text-purple-400 tracking-tight">
                                    ₹4999+
                                </p>
                            </div>

                            <p className="text-slate-500 text-xs font-mono mt-2 uppercase tracking-wider">
                                Starting Price
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ContactSection
                formRef={formRef}
                formData={formData}
                handleChange={handleChange}
                handleSendEmail={handleSendEmail}
                statusMessage={statusMessage}
                isSending={isSending} />
            <FooterSection />


        </div>
    );
}

export default PortfolioHome;