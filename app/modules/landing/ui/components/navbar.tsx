'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <nav
            className={`fixed top-6 left-6 right-6 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white backdrop-blur-2xl border border-gray-200 shadow-lg rounded-3xl'
                : 'bg-white/98 backdrop-blur-xl border border-gray-200/50 rounded-3xl'
                }`}
        >
            <div className="px-6">
                <div className="flex items-center justify-between h-12">
                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <img
                            src="/Asset-4.svg"
                            alt="Intelligence Africa"
                            className="h-6 w-auto md:hidden"
                        />
                        <img
                            src="/Asset-3.svg"
                            alt="Intelligence Africa"
                            className="h-6 w-auto hidden md:block"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-background border-b border-border"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-border space-y-2">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="w-full px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all">
                                            Get Started
                                        </button>
                                    </SignUpButton>
                                </SignedOut>
                                <SignedIn>
                                    <div className="w-full flex justify-center">
                                        <UserButton />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
