import React, { useState, useRef } from 'react'; // Added useRef here
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // Added emailjs import as wellx

import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import myPhoto from "../assets/mypic.jpeg";

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

            {/* Navbar */}
            <nav className="fixed top-0 w-full h-[60px] bg-gray-800/90 backdrop-blur-md shadow-lg flex items-center justify-between px-6 z-50">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-cyan-400">
                    Portfolio
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-lg font-medium">
                    <li>
                        <a href="#home" className="hover:text-cyan-400 transition">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#about" className="hover:text-cyan-400 transition">
                            About
                        </a>
                    </li>


                    <li>
                        <a href="#projects" className="hover:text-cyan-400">
                            Projects
                        </a>
                    </li>

                    <li>
                        <a href="#services" className="hover:text-cyan-400 transition">
                            Services
                        </a>
                    </li>

                    <li>
                        <a href="#contact" className="hover:text-cyan-400 transition">
                            Contact
                        </a>
                    </li>


                </ul>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-3xl transition duration-300 hover:rotate-90"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed top-[60px] left-0 w-full bg-gray-800/95 backdrop-blur-md flex flex-col items-center gap-5 text-lg md:hidden z-40 overflow-hidden transition-all duration-500 ease-in-out
            ${menuOpen
                    ? "max-h-[350px] opacity-100 py-6 translate-y-0"
                    : "max-h-0 opacity-0 py-0 -translate-y-10"
                }`}
            >

                <a
                    href="#home"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-cyan-400 transition hover:scale-110"
                >
                    Home
                </a>

                <a
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-cyan-400 transition hover:scale-110"
                >
                    About
                </a>


                <a
                    href="#projects"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-cyan-400 transition hover:scale-110"
                >
                    Projects
                </a>

                <a
                    href="#services"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-cyan-400 transition hover:scale-110"
                >
                    Services
                </a>


                <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-cyan-400 transition hover:scale-110"
                >
                    Contact
                </a>

            </div>
            {/* HOME */}
            <section
                id="home"
                className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-[60px]"
            >

                <div className="absolute w-80 h-80 bg-cyan-500 opacity-20 blur-3xl rounded-full top-20 left-10 animate-pulse"></div>

                <div className="absolute w-80 h-80 bg-blue-500 opacity-20 blur-3xl rounded-full bottom-20 right-10 animate-pulse"></div>

                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-bounce">
                    Hi, I'm

                    Himanshu Raj Vaishnav
                </h1>

                <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-8 text-justify">
                    I build modern web applications,
                    business management systems,
                    and scalable backend solutions
                    using React, Node.js and MongoDB.
                </p>
                <button
                    onClick={() => {
                        window.scrollBy({
                            top: 600,
                            behavior: "smooth",
                        });
                    }}
                    className="mt-14 flex flex-col items-center cursor-pointer group"
                >

                    <span className="text-gray-400 text-sm mb-3 group-hover:text-cyan-400 transition duration-300">
                        Explore More
                    </span>

                    <div className="w-10 h-16 border-2 border-cyan-400 rounded-full flex justify-center items-start p-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.9)] transition duration-300">

                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce mt-1"></div>

                    </div>

                </button>
            </section>


          {/* ABOUT */}
<section id="about" className="relative py-28 px-6 scroll-mt-16 md:scroll-mt-24">

    <div className="absolute w-96 h-96 bg-cyan-500 opacity-10 blur-3xl rounded-full left-0"></div>

    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Image */}
        <div className="flex justify-center animate-slideLeft">
            <img
                src={myPhoto}
                alt="Profile"
                className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-full border-4 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.7)] hover:scale-105 duration-500"
            />
        </div>

        {/* Text */}
        <div className="text-center md:text-left animate-slideLeft delay-200">

            <small className="inline-block px-4 py-2 mb-4 text-sm font-semibold uppercase tracking-[2px] text-cyan-300 border border-cyan-400 rounded-full bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                Full Stack MERN Developer
            </small>

            <h2 className="text-5xl font-bold text-cyan-400 mb-6">
                About Me
            </h2>

            <p className="text-gray-300 text-lg leading-8 max-w-2xl text-justify">
                <p>I'm Himanshu Raj Vaishnav, a Full Stack MERN Developer passionate about building modern and scalable web applications.   </p>
                <p>I recently completed my BCA and a MERN Stack Internship, where I worked with React.js, Node.js, Express.js and MongoDB.</p>
             <p>I'm currently looking for freelance projects and remote opportunities to build reliable web solutions.</p>
                I'm currently looking for freelance projects, remote opportunities and collaborations where I can help businesses build reliable web solutions.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-2xl text-gray-300">

                <div className="flex items-center gap-2">
                    <span>🎓</span>
                    <span>BCA Graduate</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span>MERN Internship</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>🚀</span>
                    <span>3+ Projects</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>⚛</span>
                    <span>MERN Stack</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>Open To Freelance</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>India</span>
                </div>
 

            </div>

    
            <button
                className="mt-8 px-7 py-3 bg-cyan-500 rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                onClick={() => {
                    document.getElementById("projects").scrollIntoView({
                        behavior: "smooth",
                    });
                }}
            >
                Explore My Projects
            </button>

        </div>

    </div>
</section>
            {/* PROJECTS SECTION */}
            <section id="projects" className="py-28 px-6 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute w-96 h-96 bg-cyan-500 opacity-10 blur-3xl rounded-full right-0"></div>

                <h2 className="text-5xl font-bold text-cyan-400 text-center mb-16">
                    My Projects
                </h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                    {/* Project Card */}
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-500 border border-gray-700">

                        <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
                            Student Management  with React.js and Tailwind CSS
                        </h3>

                        <p className="text-gray-300 leading-7 text-justify">
                            A complete Student Management System developed using React.js and Tailwind CSS with admin and student login functionality,
                            student record management,
                            attendance tracking, marks management,
                            class and roll number organization,
                            filtering system, and responsive dashboard design.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                React.js
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                Tailwind CSS
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                JavaScript
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                React Router Dom
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                Context API
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full"> Local Storage </span>

                        </div>

                        <button onClick={() => navigate("/admin-login")}
                            className="mt-8 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition" > View Website </button>

                    </div>

                    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-500 border border-gray-700">

                        <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
                            Student Management System using MERN Stack
                        </h3>

                        <p className="text-gray-300 leading-7 text-justify">
                            A complete Full Stack Student Management System developed using
                            MERN Stack with database integration, authentication system,
                            admin and student login functionality, attendance management,
                            filtering system, marks tracking, and percentage calculation.

                            This dynamic web application allows students to register and log in
                            after account creation. The system supports real-time data updates,
                            where administrators can add, edit, or delete student records anytime,
                            and all changes are instantly reflected on the student dashboard
                            through database connectivity.

                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                React.js
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                Node.js
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                Express.js
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                MongoDB
                            </span>

                        </div>

                        <button onClick={() => window.open("https://student-management-taupe-rho.vercel.app/login", "_blank")}
                            className="mt-8 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition"> View Website </button>
                    </div>

                    {/* Movie Website Project */}
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-500 border border-gray-700">

                        <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
                            Movie Search Website
                        </h3>

                        <p className="text-gray-300 leading-7 text-justify">
                            A movie search web application that fetches movie data using the OMDb API.
                            Users can search for movies, view the top 10 search results, and access
                            detailed movie information through a dedicated details page.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                React.js
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                API Integration
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                OMDb API
                            </span>

                            <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                                JavaScript
                            </span>

                        </div>

                        <button className="mt-8 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition"
                            onClick={() => window.open("https://omdb-movies-ten.vercel.app", "_blank")} >
                            View Website
                        </button>

                    </div>
                </div>

            </section>

            {/* SERVICES */}
            <section
                id="services"
                className="py-28 px-6 text-center"
            >


                <h2 className="text-5xl font-bold text-cyan-400 mb-14">
                    Services
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 duration-300 border border-gray-700">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                            Frontend Web Development
                        </h3>

                        <p className="text-gray-300 text-justify">
                            I create modern, responsive, and user-friendly frontend websites
                            using React.js, JavaScript, Tailwind CSS, and modern UI practices.
                            If you need only frontend development, I can build websites according
                            to your requirements.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 duration-300 border border-gray-700">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                            Full Stack Development
                        </h3>

                        <p className="text-gray-300 text-justify">
                            Building complete web applications using frontend and backend
                            technologies including React.js, Node.js, Express.js, MongoDB,
                            authentication systems, APIs, dashboards, and database integration.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 duration-300 border border-gray-700">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                            Custom Management Systems
                        </h3>

                        <p className="text-gray-300 text-justify">
                            Developing management systems such as ERP and student management
                            systems with features like authentication, admin panels, student
                            registration, data management, attendance systems, and role-based access.
                        </p>
                    </div>
                    <div className="md:col-span-3 flex flex-wrap justify-center gap-8 mt-10">

                        <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-900/20 p-8 rounded-2xl shadow-2xl border border-cyan-500 w-[320px] hover:scale-105 duration-300 text-center">

                            <span className="bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                                Pricing
                            </span>

                            <h3 className="text-2xl font-bold text-cyan-300 mt-5 mb-4">
                                Frontend Development
                            </h3>

                            <p className="text-gray-300 leading-7">
                                Responsive websites using React.js, JavaScript and Tailwind CSS.
                            </p>

                            <div className="mt-6">

                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                                    50% OFF
                                </span>

                                <p className="text-gray-500 line-through text-xl mt-3">
                                    ₹4999+
                                </p>

                                <p className="text-4xl font-bold text-cyan-400">
                                    ₹2499+
                                </p>

                            </div>

                            <p className="text-gray-400 mt-2">
                                Starting Price
                            </p>

                        </div>


                        <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 p-8 rounded-2xl shadow-2xl border border-purple-500 w-[320px] hover:scale-105 duration-300 text-center">

                            <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                Pricing
                            </span>

                            <h3 className="text-2xl font-bold text-purple-300 mt-5 mb-4">
                                Full Stack MERN
                            </h3>

                            <p className="text-gray-300 leading-7">
                                Complete MERN applications with backend, database, APIs and authentication.
                            </p>

                            <div className="mt-6">

                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                                    50% OFF
                                </span>

                                <p className="text-gray-500 line-through text-xl mt-3">
                                    ₹9999+
                                </p>

                                <p className="text-4xl font-bold text-purple-400">
                                    ₹4999+
                                </p>

                            </div>

                            <p className="text-gray-400 mt-2">
                                Starting Price
                            </p>

                        </div>

                    </div>


                </div>


            </section>

            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="relative py-28 px-6 overflow-hidden"
            >

                {/* Glow Background */}
                <div className="absolute w-80 h-80 bg-cyan-500 opacity-10 blur-3xl rounded-full left-10"></div>

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-5xl font-bold text-cyan-400 text-center mb-16">
                        Contact Me
                    </h2>

                    <div className="grid md:grid-cols-2 gap-14 items-center">

                        {/* Contact Form */}
                        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                            {/* Dynamic Status Notifications */}
                            {statusMessage.text && (
                                <div className={`text-xs font-mono p-3 rounded-lg mb-4 text-center border ${statusMessage.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                    }`}>
                                    {statusMessage.text}
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSendEmail} className="space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        name="from_name"
                                        placeholder="Your Name"
                                        value={formData.from_name}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-cyan-400 text-slate-200 text-sm transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="reply_to"
                                        placeholder="Your Email"
                                        value={formData.reply_to}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-cyan-400 text-slate-200 text-sm transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                                        required
                                    />
                                </div>

                                <div>
                                    <textarea
                                        rows="5"
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-cyan-400 text-slate-200 text-sm transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono transition-all duration-300 hover:scale-[1.01] shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {isSending ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE'}
                                </button>
                            </form>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col items-center md:items-start gap-8">

                            <h3 className="text-3xl font-semibold">
                                Let's Connect
                            </h3>

                            <p className="text-gray-400 text-center md:text-left">
                                Feel free to connect through social media or send a message using the form.
                            </p>

                            <div className="flex gap-6 text-4xl">

                                <a
                                    href="https://www.instagram.com/himanshu_raj_vaishnav?igsh=eHpzemhocm81OHF0"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-pink-500 transition hover:scale-125"
                                >
                                    <FaInstagram />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/himanshu-raj-vaishnav-a09962363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-400 transition hover:scale-125"
                                >
                                    <FaLinkedin />
                                </a>

                                <a
                                    href="mailto:himanshurajvaishnav@gmail.com"
                                    className="hover:text-cyan-400 transition hover:scale-125"
                                >
                                    <FaEnvelope />
                                </a>

                            </div>

                        </div>

                    </div>
                    <div className="flex justify-center mt-10">

                        <button
                            className="px-7 py-3 bg-cyan-500 rounded-full   hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:shadow-[0_0_30px_rgba(34,211,238,1)] font-semibold"
                            onClick={() => {
                                document.getElementById("home")?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            ↑ Back To Top
                        </button>

                    </div>

                </div>

            </section>
        </div>
    );
}

export default PortfolioHome;