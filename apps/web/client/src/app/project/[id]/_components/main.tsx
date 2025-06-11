'use client';

import { ChatType } from '@/app/api/chat/route';
import { useChatContext } from '@/app/project/[id]/_hooks/use-chat';
import { useCreateManager } from '@/components/store/create';
import { useEditorEngine } from '@/components/store/editor';
import { useProjectManager } from '@/components/store/project';
import { useUserManager } from '@/components/store/user';
import { api } from '@/trpc/react';
import { Routes } from '@/utils/constants';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { TooltipProvider } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePanelMeasurements } from '../_hooks/use-panel-measure';
import { useTabActive } from '../_hooks/use-tab-active';
import { BottomBar } from './bottom-bar';
import { Canvas } from './canvas';
import { EditorBar } from './editor-bar';
import { LeftPanel } from './left-panel';
import { RightPanel } from './right-panel';
import { TopBar } from './top-bar';

export const Main = observer(({ projectId }: { projectId: string }) => {
    // State hooks first to maintain consistent order
    const [isWorkspaceReady, setIsWorkspaceReady] = useState(false);

    const editorEngine = useEditorEngine();
    const projectManager = useProjectManager();
    const createManager = useCreateManager();
    const userManager = useUserManager();
    const { sendMessages } = useChatContext();
    const { data: result, isLoading } = api.project.getFullProject.useQuery({ projectId });
    const leftPanelRef = useRef<HTMLDivElement | null>(null);
    const rightPanelRef = useRef<HTMLDivElement | null>(null);
    const { tabState } = useTabActive();

    const { toolbarLeft, toolbarRight, editorBarAvailableWidth } = usePanelMeasurements(
        leftPanelRef,
        rightPanelRef,
    );

    useEffect(() => {
        const initializeProject = async () => {
            if (!result) {
                return;
            }
            const { project, userCanvas, frames } = result;
            projectManager.project = project;

            if (project.sandbox?.id) {
                if (userManager.user?.id) {
                    if (!editorEngine.sandbox.session.session) {
                        await editorEngine.sandbox.session.start(
                            project.sandbox.id,
                            userManager.user.id,
                        );
                    }
                } else {
                    console.error('Initializing project: No user id');
                }
            } else {
                console.error('Initializing project: No sandbox id');
            }

            editorEngine.canvas.applyCanvas(userCanvas);
            editorEngine.frames.applyFrames(frames);
            await editorEngine.chat.conversation.fetchOrCreateConversation(project.id);
            resumeCreate();
        };

        initializeProject().catch((error) => {
            console.error('Error initializing project:', error);
        });
    }, [result, userManager.user?.id]);

    const resumeCreate = async () => {
        const creationData = createManager.pendingCreationData;
        if (!creationData) return;

        if (projectId !== creationData.project.id) return;

        const messages = await editorEngine.chat.getStreamMessages(
            creationData.prompt,
            creationData.images,
        );

        if (!messages) {
            console.error('Failed to get creation messages');
            return;
        }
        createManager.pendingCreationData = null;
        sendMessages(messages, ChatType.CREATE);
    };

    useEffect(() => {
        if (tabState === 'reactivated') {
            editorEngine.sandbox.session.reconnect();
        }
    }, [tabState]);

    // Simulate a small delay for smoother transitions
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWorkspaceReady(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    // Loading states with improved UI
    if (isLoading || !result || editorEngine.sandbox.session.isConnecting) {
        const loadingMessage = isLoading 
            ? "Loading project..." 
            : !result 
                ? "Project not found" 
                : "Connecting to sandbox...";
        
        const isError = !isLoading && !result;
        
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-background to-background/95 overflow-hidden">
                {/* Background gradient elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-30" />
                    <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl opacity-30" />
                </div>
                
                <motion.div 
                    className="flex flex-col items-center justify-center gap-6 p-8 max-w-md text-center z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {!isError ? (
                        <div className="relative">
                            <motion.div 
                                className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Icons.Shadow className="h-8 w-8 text-blue-400 animate-spin" />
                            </motion.div>
                            <motion.div 
                                className="absolute -inset-3 rounded-full border border-blue-500/20"
                                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                            <Icons.ExclamationTriangle className="h-8 w-8 text-red-400" />
                        </div>
                    )}
                    
                    <div className="space-y-3">
                        <h3 className="text-2xl font-semibold tracking-tight">{loadingMessage}</h3>
                        <p className="text-foreground-secondary/80 text-base max-w-xs mx-auto">
                            {!isError 
                                ? "We're preparing your workspace. This will just take a moment." 
                                : "We couldn't find the project you're looking for. It may have been deleted or you don't have access."}
                        </p>
                    </div>
                    
                    {isError && (
                        <Button 
                            asChild 
                            className="mt-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Link href={Routes.PROJECTS}>
                                <Icons.ArrowLeft className="mr-2 h-4 w-4" />
                                Go to projects
                            </Link>
                        </Button>
                    )}
                </motion.div>
            </div>
        );
    }
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                when: "beforeChildren",
                staggerChildren: 0.1,
                duration: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        }
    };
    
    return (
        <TooltipProvider>
            <motion.div 
                className="h-screen w-screen flex flex-row select-none relative overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate={isWorkspaceReady ? "visible" : "hidden"}
            >
                <Canvas />

                <motion.div 
                    className="absolute top-0 w-full z-50"
                    variants={itemVariants}
                >
                    <TopBar projectId={projectId} />
                </motion.div>

                {/* Left Panel */}
                <motion.div
                    ref={leftPanelRef}
                    className="absolute top-10 left-0 h-[calc(100%-40px)] z-40"
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <LeftPanel />
                </motion.div>

                {/* EditorBar anchored between panels */}
                <motion.div
                    className="absolute top-10 z-30"
                    style={{
                        left: toolbarLeft,
                        right: toolbarRight,
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        maxWidth: editorBarAvailableWidth,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                    variants={itemVariants}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <div style={{ pointerEvents: 'auto' }} className="backdrop-blur-sm">
                        <EditorBar availableWidth={editorBarAvailableWidth} />
                    </div>
                </motion.div>

                {/* Right Panel */}
                <motion.div
                    ref={rightPanelRef}
                    className="absolute top-10 right-0 h-[calc(100%-40px)] z-40"
                    variants={itemVariants}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <RightPanel />
                </motion.div>

                <motion.div 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <BottomBar />
                </motion.div>
            </motion.div>
        </TooltipProvider>
    );
});
