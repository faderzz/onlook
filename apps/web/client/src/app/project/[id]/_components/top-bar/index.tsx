'use client';

import { Hotkey } from '@/components/hotkey';
import { useEditorEngine } from '@/components/store/editor';
import { CurrentUserAvatar } from '@/components/ui/avatar-dropdown';
import { useFeatureFlags } from '@/hooks/use-feature-flags';
import { Button } from '@onlook/ui/button';
import { HotkeyLabel } from '@onlook/ui/hotkey-label';
import { Icons } from '@onlook/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from '../../_hooks/use-chat';
import { Members } from '../members';
import { ModeToggle } from './mode-toggle';
import { ProjectBreadcrumb } from './project-breadcrumb';
import { PublishButton } from './publish';

export const TopBar = observer(({ projectId }: { projectId: string }) => {
    const editorEngine = useEditorEngine();
    const { isWaiting } = useChatContext();
    const { isEnabled } = useFeatureFlags();

    const UNDO_REDO_BUTTONS = [
        {
            click: () => editorEngine.action.undo(),
            isDisabled: !editorEngine.history.canUndo || isWaiting,
            hotkey: Hotkey.UNDO,
            icon: <Icons.Reset className="h-4 w-4 mr-1" />,
            label: 'Undo',
        },
        {
            click: () => editorEngine.action.redo(),
            isDisabled: !editorEngine.history.canRedo || isWaiting,
            hotkey: Hotkey.REDO,
            icon: <Icons.Reset className="h-4 w-4 mr-1 scale-x-[-1]" />,
            label: 'Redo',
        },
    ];

    return (
        <motion.div 
            className="bg-background-primary/30 backdrop-blur-xl flex flex-row h-10 justify-center items-center border-b border-white/5 px-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex flex-row flex-grow basis-0 space-x-2 justify-start items-center">
                <ProjectBreadcrumb />
            </div>
            
            <AnimatePresence>
                <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <ModeToggle />
                </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-grow basis-0 justify-end items-center gap-2 mr-1">
                {isEnabled('NEXT_PUBLIC_FEATURE_COLLABORATION') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                    >
                        <Members projectId={projectId} />
                    </motion.div>
                )}
                
                <motion.div
                    className="space-x-1 hidden lg:flex items-center"
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    {UNDO_REDO_BUTTONS.map(({ click, hotkey, icon, isDisabled, label }, index) => (
                        <motion.div 
                            key={hotkey.description}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (index * 0.05) }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "h-8 px-2 rounded-md transition-all",
                                            isDisabled ? "opacity-50" : "hover:bg-white/5 hover:text-foreground-primary"
                                        )}
                                        onClick={click}
                                        disabled={isDisabled}
                                    >
                                        <span className="flex items-center gap-1">
                                            {icon}
                                            <span className="text-xs font-medium">{label}</span>
                                        </span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-background-secondary/80 backdrop-blur-lg border-white/10">
                                    <HotkeyLabel hotkey={hotkey} />
                                </TooltipContent>
                            </Tooltip>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <PublishButton />
                    <CurrentUserAvatar className="size-8 cursor-pointer hover:opacity-80 transition-opacity" />
                </motion.div>
            </div>
        </motion.div>
    );
});
