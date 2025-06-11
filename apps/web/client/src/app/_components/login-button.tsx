import { transKeys } from '@/i18n/keys';
import { SignInMethod } from '@onlook/models/auth';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import { cn } from '@onlook/ui/utils';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../auth/auth-context';
import { motion } from 'framer-motion';

export const GithubLoginButton = ({
    className,
}: {
    className?: string;
}) => {
    const t = useTranslations();
    const { lastSignInMethod, handleLogin, isPending } = useAuthContext();
    const isLastSignInMethod = lastSignInMethod === SignInMethod.GITHUB;

    return (
        <motion.div 
            className={cn('flex flex-col items-center w-full', className)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
        >
            <Button
                variant="outline"
                className={cn(
                    "w-full items-center justify-center text-active py-5",
                    isLastSignInMethod 
                        ? "bg-teal-500/20 border-teal-500/30 text-teal-400 hover:bg-teal-500/30 hover:border-teal-500/50" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                )}
                onClick={() => handleLogin(SignInMethod.GITHUB)}
                disabled={isPending}
            >
                {isPending ? (
                    <Icons.Shadow className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                    <Icons.GitHubLogo className="w-5 h-5 mr-3" />
                )}
                {t(transKeys.welcome.login.github)}
            </Button>
            {isLastSignInMethod && (
                <motion.p 
                    className="text-teal-400 text-xs font-medium mt-2 flex items-center"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icons.Check className="w-3 h-3 mr-1" />
                    {t(transKeys.welcome.login.lastUsed)}
                </motion.p>
            )}
        </motion.div>
    );
};

export const GoogleLoginButton = ({
    className,
}: {
    className?: string;
}) => {
    const t = useTranslations();
    const { lastSignInMethod, handleLogin, isPending } = useAuthContext();
    const isLastSignInMethod = lastSignInMethod === SignInMethod.GOOGLE;

    return (
        <motion.div 
            className={cn('flex flex-col items-center w-full', className)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
        >
            <Button
                variant="outline"
                className={cn(
                    "w-full items-center justify-center text-active py-5",
                    isLastSignInMethod 
                        ? "bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 hover:border-blue-500/50" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                )}
                onClick={() => handleLogin(SignInMethod.GOOGLE)}
                disabled={isPending}
            >
                {isPending ? (
                    <Icons.Shadow className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                )}
                {t(transKeys.welcome.login.google)}
            </Button>
            {isLastSignInMethod && (
                <motion.p 
                    className="text-blue-400 text-xs font-medium mt-2 flex items-center"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icons.Check className="w-3 h-3 mr-1" />
                    {t(transKeys.welcome.login.lastUsed)}
                </motion.p>
            )}
        </motion.div>
    );
};
