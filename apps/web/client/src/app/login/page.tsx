'use client';

import { Dunes } from '@/components/ui/dunes';
import { transKeys } from '@/i18n/keys';
import { Routes } from '@/utils/constants';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { GithubLoginButton, GoogleLoginButton } from '../_components/login-button';
import { useAuthContext } from '../auth/auth-context';
import { motion } from 'framer-motion';
import { cn } from '@onlook/ui/utils';

export default function LoginPage() {
    const isDev = process.env.NODE_ENV === 'development';
    const t = useTranslations();
    const { handleDevLogin } = useAuthContext();
    
    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-background to-background/95">
            {/* Background gradient elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl opacity-30" />
            </div>
            
            {/* Login form */}
            <motion.div 
                className="flex flex-col justify-between w-full h-full max-w-xl p-8 md:p-16 space-y-8 overflow-auto z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <Link href={Routes.HOME} className="hover:opacity-80 transition-opacity group">
                        <Icons.OnlookTextLogo viewBox="0 0 139 17" className="group-hover:scale-105 transition-transform" />
                    </Link>
                </motion.div>
                
                <div className="space-y-8">
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                            <Icons.Sparkles className="w-4 h-4 mr-2" />
                            <span>Beta</span>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                            {t(transKeys.welcome.title)}
                        </h1>
                        <p className="text-foreground-secondary/90 text-lg leading-relaxed">
                            {t(transKeys.welcome.description)}
                        </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <GithubLoginButton className="w-full" />
                            <GoogleLoginButton className="w-full" />
                        </div>
                        
                        {isDev && (
                            <Button 
                                variant="outline" 
                                className="w-full text-active text-small bg-white/5 border-white/10 hover:bg-white/10" 
                                onClick={handleDevLogin}
                            >
                                <Icons.GitHubLogo className="w-4 h-4 mr-2" />
                                DEV MODE: Sign in as demo user
                            </Button>
                        )}
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <p className="text-sm text-foreground-secondary/80">
                            {t(transKeys.welcome.terms.agreement)}{' '}
                            <button
                                onClick={() => window.open('https://onlook.com/privacy-policy', '_blank')}
                                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                            >
                                {t(transKeys.welcome.terms.privacy)}
                            </button>{' '}
                            {t(transKeys.welcome.terms.and)}{' '}
                            <button
                                onClick={() => window.open('https://onlook.com/terms-of-service', '_blank')}
                                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                            >
                                {t(transKeys.welcome.terms.tos)}
                            </button>
                        </p>
                    </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="flex flex-row space-x-1 text-xs text-foreground-secondary/60">
                    <p>{t(transKeys.welcome.version, { version: '1.0.0' })}</p>
                </motion.div>
            </motion.div>
            
            {/* Right side illustration */}
            <div className="hidden md:block relative w-full z-0">
                <Dunes className="animate-fade-in" />
            </div>
        </div>
    );
}
