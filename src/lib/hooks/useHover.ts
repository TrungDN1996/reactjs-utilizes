import { useState, useRef, useEffect, MutableRefObject } from 'react';

/**
 * useHover is used to detect hover over an element can be useful for tooltips, animations
 * or any UI feedback based on hover state.
 *
 * @returns {[ref, boolean]} Ref for an element, boolean value to track if hovered.
 *
 * @example
 * const [hoverRef, isHovered] = useHover()
 * return <div ref={hoverRef} style={{ backgroundColor: isHovered ? 'blue' : 'gray' }}>
 *         Hover over me!
 *     </div>
 */
export function useHover<T extends HTMLElement>(): [MutableRefObject<T | null>, boolean] {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleMouseOver = () => setHovered(true);
        const handleMouseOut = () => setHovered(false);

        const node = ref.current;
        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);
        }

        return () => {
            if (node) {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            }
        };
    }, []);

    return [ref, hovered];
}
