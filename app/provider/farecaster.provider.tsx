"use client";
import { sdk } from '@farcaster/miniapp-sdk';
import { useEffect } from 'react';

import { ReactNode } from 'react';

function FarcasterProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        sdk.actions.ready();
    }, []);

    return <>{children}</>;
}

export default FarcasterProvider;