import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from 'motion/react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared "Velorah" motion vocabulary — one idea everywhere: FADE + RISE.
// No slides, no bounces; cinematic = calm. Built on the already-installed
// `motion` (Framer Motion v12). Every helper honors prefers-reduced-motion by
// collapsing the rise to a plain opacity fade (the hard requirement from the
// motion plan).
// ─────────────────────────────────────────────────────────────────────────────

// ease-out-expo — the Velorah signature curve (long, weightless tail).
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Full rise (transform + opacity only → GPU friendly, no layout thrash).
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

// Reduced-motion fallback: fade only, no movement.
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Container that releases its children 80ms apart.
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Pick the right child variant based on the user's motion preference.
export function useRevealVariants(): Variants {
  const reduce = useReducedMotion();
  return reduce ? fadeVariants : riseVariants;
}

// ── <Reveal> — single block fades-and-rises once it scrolls into view ────────
type RevealProps = HTMLMotionProps<'div'> & { amount?: number };

export function Reveal({ amount = 0.3, children, ...rest }: RevealProps) {
  const variants = useRevealVariants();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ── <Stagger> + <StaggerItem> — children reveal in sequence on scroll ────────
type StaggerProps = HTMLMotionProps<'div'> & { amount?: number; staggerChildren?: number };

export function Stagger({ amount = 0.25, staggerChildren = 0.09, children, ...rest }: StaggerProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren: 0.05 } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={container}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<'div'>) {
  const variants = useRevealVariants();
  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
