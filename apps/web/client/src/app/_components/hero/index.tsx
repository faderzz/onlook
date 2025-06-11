'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { vujahdayScript } from '../../fonts';
import { Create } from './create';
import { CreateError } from './create-error';
import { HighDemand } from './high-demand';
import { UnicornBackground } from './unicorn-background';
import { cn } from '@onlook/ui/utils';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';

export function Hero() {
    const [isMounted, setIsMounted] = useState(false);
    const [cardKey, setCardKey] = useState(0);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-12 py-16 text-lg text-center relative">
            {/* <UnicornBackground setIsMounted={setIsMounted} /> */}
            
            <motion.div 
                className="flex flex-col gap-6 items-center relative z-20 pt-4 pb-2 max-w-3xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                        <Icons.Sparkles className="w-4 h-4 mr-2" />
                        <span>Next-Gen Visual Editor</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight text-center !leading-[0.9] tracking-tight">
                        Make your<br />
                        <span className="font-light">designs </span>
                        <span className={`italic font-normal ${vujahdayScript.className} text-[4.75rem] md:text-[5.5rem] ml-1 leading-[1.0] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400`}>real</span>
                    </h1>
                </motion.div>
                
                <motion.p
                    variants={itemVariants}
                    className="text-xl text-foreground-secondary/90 max-w-2xl text-center mt-2 leading-relaxed"
                >
                    Onlook is a next-generation visual code editor that lets designers 
                    and product managers craft web experiences with AI — no coding required.
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex flex-row gap-3 mt-4">
                    <Button size="lg" className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white border-0 shadow-lg shadow-blue-900/20">
                        Get Started
                        <Icons.ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-6 border-white/10 bg-white/5 hover:bg-white/10">
                        <Icons.Play className="mr-2 h-4 w-4" />
                        Watch Demo
                    </Button>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                    <HighDemand isMounted={true} />
                </motion.div>
                <CreateError />
            </motion.div>
            
            <motion.div 
                className="sm:flex hidden flex-col gap-4 items-center relative z-20 w-full max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={itemVariants}
                    className="w-full shadow-2xl shadow-blue-500/5 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm"
                >
                    <Create cardKey={cardKey} />
                </motion.div>
                
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-6 text-sm text-foreground-secondary mt-4"
                >
                    <div className="flex items-center">
                        <Icons.Check className="w-4 h-4 mr-2 text-teal-400" />
                        No Credit Card Required
                    </div>
                    <div className="flex items-center">
                        <Icons.Check className="w-4 h-4 mr-2 text-teal-400" />
                        Get a Site in Seconds
                    </div>
                    <div className="flex items-center">
                        <Icons.Check className="w-4 h-4 mr-2 text-teal-400" />
                        AI-Powered Design
                    </div>
                </motion.div>
            </motion.div>
            
            <div className="sm:hidden text-balance flex flex-col gap-4 items-center relative z-20 px-10 py-8 bg-white/5 rounded-lg border border-white/10">
                <Icons.Laptop className="w-8 h-8 text-foreground-secondary mb-2" />
                Onlook isn't ready for Mobile – Please open on a larger screen
            </div>
        </div>
    );
}