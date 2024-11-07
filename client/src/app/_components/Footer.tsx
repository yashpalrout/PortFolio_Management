// src/app/_components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4">mInvest</h2>
                        <p className="text-neutral-400">
                            Your trusted partner in mutual fund investments. We help you grow
                            your wealth with simplicity and security.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-neutral-400 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-neutral-400 hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-neutral-400 hover:text-white">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-neutral-400 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook className="text-neutral-400 hover:text-white" size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className="text-neutral-400 hover:text-white" size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="text-neutral-400 hover:text-white" size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="text-neutral-400 hover:text-white" size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-neutral-700 mt-8 pt-6 text-center text-neutral-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} mInvest. All rights reserved.</p>
                    <p>
                        <Link href="/privacy-policy" className="hover:text-white">
                            Privacy Policy
                        </Link>{" "}
                        |{" "}
                        <Link href="/terms-of-service" className="hover:text-white">
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
