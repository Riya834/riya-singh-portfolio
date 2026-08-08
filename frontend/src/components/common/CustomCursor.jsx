import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setHoverText(target.getAttribute('data-cursor') || '');
      } else {
        const interactive = e.target.closest('a, button, input, textarea, [role="button"]');
        if (interactive) {
          setIsHovered(true);
          setHoverText('');
        } else {
          setIsHovered(false);
          setHoverText('');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible || window.innerWidth <= 1024) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-brand-electric flex items-center justify-center text-xs font-mono font-medium text-white transition-all duration-75"
        animate={{
          x: position.x - (isHovered ? (hoverText ? 48 : 24) : 16),
          y: position.y - (isHovered ? (hoverText ? 48 : 24) : 16),
          width: isHovered ? (hoverText ? 96 : 48) : 32,
          height: isHovered ? (hoverText ? 96 : 48) : 32,
          backgroundColor: isHovered ? 'rgba(0, 82, 255, 0.25)' : 'rgba(0, 82, 255, 0.05)',
          borderColor: isHovered ? '#0052FF' : 'rgba(0, 82, 255, 0.4)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.3 }}
      >
        {hoverText && (
          <span className="text-[10px] tracking-wider uppercase font-bold text-white text-center px-2">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-brand-electric"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 400 }}
      />
    </>
  );
};

export default CustomCursor;
