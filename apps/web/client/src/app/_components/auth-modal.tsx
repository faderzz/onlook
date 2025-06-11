import { transKeys } from '@/i18n/keys';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@onlook/ui/alert-dialog';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../auth/auth-context';
import { GithubLoginButton, GoogleLoginButton } from './login-button';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthModal() {
    const { setIsAuthModalOpen, isAuthModalOpen } = useAuthContext();
    const t = useTranslations();
    
    // Animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        },
        exit: { 
            opacity: 0, 
            scale: 0.95,
            transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
        }
    };
    
    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.4, 
                delay: 0.1,
                staggerChildren: 0.1,
                delayChildren: 0.1 
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 }
        }
    };
    
    return (
        <AlertDialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <AlertDialogContent 
                className="!max-w-sm bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden p-0"
                asChild
            >
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl" />
                    </div>
                    
                    <motion.div 
                        className="relative z-10 p-6"
                        variants={contentVariants}
                    >
                        <AlertDialogHeader>
                            <motion.div variants={itemVariants}>
                                <div className="flex justify-center mb-2">
                                    <Icons.Sparkles className="w-6 h-6 text-blue-400" />
                                </div>
                                <AlertDialogTitle className="text-center text-2xl font-semibold tracking-tight">
                                    {t(transKeys.welcome.login.loginToEdit)}
                                </AlertDialogTitle>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <AlertDialogDescription className="text-center text-foreground-secondary/80 mt-2">
                                    {t(transKeys.welcome.login.shareProjects)}
                                </AlertDialogDescription>
                            </motion.div>
                        </AlertDialogHeader>
                        
                        <motion.div variants={itemVariants} className="space-y-3 flex flex-col my-6">
                            <GithubLoginButton />
                            <GoogleLoginButton />
                        </motion.div>
                        
                        <AlertDialogFooter className="flex !justify-center w-full mt-4">
                            <motion.div variants={itemVariants}>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="hover:bg-white/5 text-foreground-secondary hover:text-foreground-primary transition-colors"
                                >
                                    {t(transKeys.projects.actions.close)}
                                </Button>
                            </motion.div>
                        </AlertDialogFooter>
                    </motion.div>
                </motion.div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
