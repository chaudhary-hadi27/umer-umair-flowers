/**
 * RESPONSIVE HOOKS
 * Custom React hooks for device-specific optimizations
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect device type and screen size
 */
export const useResponsive = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        orientation: typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    });

    useEffect(() => {
        const updateDeviceInfo = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setDeviceInfo({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
                width,
                height,
                orientation: width > height ? 'landscape' : 'portrait'
            });
        };

        updateDeviceInfo();
        window.addEventListener('resize', updateDeviceInfo);
        window.addEventListener('orientationchange', updateDeviceInfo);

        return () => {
            window.removeEventListener('resize', updateDeviceInfo);
            window.removeEventListener('orientationchange', updateDeviceInfo);
        };
    }, []);

    return deviceInfo;
};

/**
 * Hook to detect if video should be played
 * Saves data on mobile and respects user preferences
 */
export const useVideoPlayback = () => {
    const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
    const { isMobile } = useResponsive();

    useEffect(() => {
        // Check for data saver mode
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        const saveData = connection?.saveData || false;

        // Don't play video on mobile or if data saver is on
        setShouldPlayVideo(!isMobile && !saveData);
    }, [isMobile]);

    return shouldPlayVideo;
};

/**
 * Hook for safe viewport height on mobile
 * Handles mobile browser chrome/address bar
 */
export const useViewportHeight = () => {
    const [vh, setVh] = useState(0);

    useEffect(() => {
        const updateVh = () => {
            // Use visualViewport if available (more accurate on mobile)
            const height = window.visualViewport?.height || window.innerHeight;
            setVh(height * 0.01);
            document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
        };

        updateVh();
        window.addEventListener('resize', updateVh);
        window.visualViewport?.addEventListener('resize', updateVh);

        return () => {
            window.removeEventListener('resize', updateVh);
            window.visualViewport?.removeEventListener('resize', updateVh);
        };
    }, []);

    return vh;
};

/**
 * Hook to detect touch device
 */
export const useTouchDevice = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                (navigator as any).msMaxTouchPoints > 0
            );
        };

        checkTouch();
    }, []);

    return isTouch;
};

/**
 * Hook for intersection observer (lazy loading, animations)
 */
export const useInView = (options?: IntersectionObserverInit) => {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                ...options
            }
        );

        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [ref, options]);

    return [setRef, isInView] as const;
};

/**
 * Hook to detect network status
 */
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const [connectionType, setConnectionType] = useState<string>('unknown');

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);

        const updateConnection = () => {
            const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
            setConnectionType(connection?.effectiveType || 'unknown');
        };

        updateConnection();

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        connection?.addEventListener('change', updateConnection);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            connection?.removeEventListener('change', updateConnection);
        };
    }, []);

    return { isOnline, connectionType };
};

/**
 * Hook for debouncing values (useful for search, resize events)
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Hook for optimized scroll handling
 */
export const useOptimizedScroll = (callback: () => void, delay: number = 100) => {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        let lastScrollTime = 0;

        const handleScroll = () => {
            const now = Date.now();

            if (now - lastScrollTime >= delay) {
                lastScrollTime = now;
                callback();
            } else {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastScrollTime = Date.now();
                    callback();
                }, delay);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [callback, delay]);
};

/**
 * Hook for localStorage with SSR safety
 */
export const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    const setValue = useCallback((value: T) => {
        try {
            setStoredValue(value);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key]);

    return [storedValue, setValue];
};

/**
 * Hook for prefetching images
 */
export const usePrefetchImages = (imageUrls: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const images: HTMLImageElement[] = [];

        const loadImages = async () => {
            const promises = imageUrls.map((url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = reject;
                    images.push(img);
                });
            });

            try {
                await Promise.all(promises);
                if (isMounted) setLoaded(true);
            } catch (error) {
                console.error('Image prefetch error:', error);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
            images.forEach(img => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, [imageUrls]);

    return loaded;
};