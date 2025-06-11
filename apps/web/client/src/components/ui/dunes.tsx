import Image from 'next/image';
import { cn } from '@onlook/ui/utils';

export function Dunes({ className }: { className?: string }) {
    return (
        <div className={cn("hidden w-full lg:block md:block m-6", className)}>
            <Image
                className="w-full h-full object-cover rounded-xl hidden dark:flex"
                src={'/assets/dunes-login-dark.png'}
                alt="Onlook dunes dark"
                width={1000}
                height={1000}
            />
            <Image
                className="w-full h-full object-cover rounded-xl flex dark:hidden"
                src={'/assets/dunes-login-light.png'}
                alt="Onlook dunes light"
                width={1000}
                height={1000}
            />
        </div>
    );
}
