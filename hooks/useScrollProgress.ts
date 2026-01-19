'use client';

import { useState, useEffect } from 'react';
import { debounce } from '@/lib/utils';

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const calculateScrollProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const totalScrollableHeight = documentHeight - windowHeight;
            const progress = (scrollTop / totalScrollableHeight) * 100;

            setScrollProgress(Math.min(100, Math.max(0, progress)));
        };

        const debouncedCalculate = debounce(calculateScrollProgress, 10);

        window.addEventListener('scroll', debouncedCalculate, { passive: true });
        calculateScrollProgress(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', debouncedCalculate);
        };
    }, []);

    return scrollProgress;
}
