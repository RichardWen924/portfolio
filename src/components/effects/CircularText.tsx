import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';
import './CircularText.css';

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  },
});

export default function CircularText({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
}: {
  text: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers' | false;
  className?: string;
}) {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    switch (onHover) {
      case 'slowDown':
        controls.start({
          rotate: start + 360,
          scale: 1,
          transition: getTransition(spinDuration * 2, start),
        });
        break;
      case 'speedUp':
        controls.start({
          rotate: start + 360,
          scale: 1,
          transition: getTransition(spinDuration / 4, start),
        });
        break;
      case 'pause':
        controls.start({
          rotate: start,
          scale: 1,
          transition: {
            rotate: { type: 'spring', damping: 20, stiffness: 300 },
            scale: { type: 'spring', damping: 20, stiffness: 300 },
          },
        });
        break;
      case 'goBonkers':
        controls.start({
          rotate: start + 360,
          scale: 0.8,
          transition: getTransition(spinDuration / 20, start),
        });
        break;
    }
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const radius = 80;
        const transform = `rotateZ(${rotationDeg}deg) translateY(${-radius}px)`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
}
