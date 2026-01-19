'use client';

import { useState, useEffect, useCallback } from 'react';
import { isMobile, isTouchDevice } from '@/lib/utils';

interface CursorPosition {
    x: number;
    y: number;
}

interface CursorState {
    position: CursorPosition;
    isHovering: boolean;
    isClicking: boolean;
    variant: 'default' | 'hover' | 'click';
}

export function useCursor() {
    const [cursorState, setCursorState] = useState<CursorState>({
        position: { x: 0, y: 0 },
        isHovering: false,
        isClicking: false,
        variant: 'default',
    });

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Disable custom cursor on mobile/touch devices
        if (isMobile() || isTouchDevice()) {
            setIsDisabled(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setCursorState((prev) => ({
                ...prev,
                position: { x: e.clientX, y: e.clientY },
            }));
        };

        const handleMouseDown = () => {
            setCursorState((prev) => ({
                ...prev,
                isClicking: true,
                variant: 'click',
            }));
        };

        const handleMouseUp = () => {
            setCursorState((prev) => ({
                ...prev,
                isClicking: false,
                variant: prev.isHovering ? 'hover' : 'default',
            }));
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const setHovering = useCallback((hovering: boolean) => {
        setCursorState((prev) => ({
            ...prev,
            isHovering: hovering,
            variant: hovering ? 'hover' : 'default',
        }));
    }, []);

    return {
        ...cursorState,
        setHovering,
        isDisabled,
    };
}
