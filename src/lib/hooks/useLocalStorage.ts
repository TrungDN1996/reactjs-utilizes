import { useState } from 'react';

/**
 * useLocalStorage helps in setting, getting, and updating values stored in the browser’s local storage, 
 * enabling persistent data storage.
 * @param key
 * @param initialValue
 * @returns {[value, () => void]} Stored value and function to change it.
 *
 * @example
 *     const [name, setName] = useLocalStorage('name', 'Guest');
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}
