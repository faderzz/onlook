'use client';

import { AuthModal } from './_components/auth-modal';
import { Hero } from './_components/hero';
import { ContributorSection } from './_components/landing-page/contributor-section';
import { Footer } from './_components/landing-page/page-footer';
import { TopBar } from './_components/top-bar';
import { cn } from '@onlook/ui/utils';
import { motion } from 'framer-motion';


export default function Main() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden bg-gradient-to-b from-background to-background/95">
            {/* Gradient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl opacity-20" />
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Header with glass effect */}
            <div className="fixed top-0 left-0 w-full h-16 bg-background/70 backdrop-blur-md z-50 border-b border-white/5 shadow-sm">
                <div className="container mx-auto h-full">
                    <TopBar />
                </div>
            </div>
            
            {/* Hero section with enhanced animations */}
            <motion.div 
                className="w-screen min-h-screen flex items-center justify-center pt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Hero />
            </motion.div>

            {/* Additional sections */}
            <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <ContributorSection />
            </motion.div>
            
            {/* Footer with improved styling */}
            <div className="w-full border-t border-white/5 bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto">
                    <Footer />
                </div>
            </div>
            
            <AuthModal />
        </div>
    );
}
