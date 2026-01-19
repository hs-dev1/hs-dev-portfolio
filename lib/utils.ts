import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Lerp (Linear Interpolation)
export function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

// Map range
export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Clamp value
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// Get distance between two points
export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Check if mobile
export function isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

// Check if touch device
export function isTouchDevice(): boolean {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Smooth scroll to element
export function smoothScrollTo(elementId: string, offset: number = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}
