/**
 * @namespace AnimationPresets
 */

/**
 * @memberof AnimationPresets
 * Animation configuration for scaling elements with opacity transition using Framer Motion.
 *
 * This configuration defines how elements should scale and transition opacity when used with Framer Motion.
 *
 * @example
 * import { motion } from 'framer-motion';
 * import { scaleAnimation } from './animations';
 *
 * // Use in a Framer Motion component
 * <motion.div initial={scaleAnimation.initial} animate={scaleAnimation.animate} exit={scaleAnimation.exit} transition={scaleAnimation.transition}>
 *   Content
 * </motion.div>
 */
export const scaleAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.2 },
};

/**
 * @memberof AnimationPresets
 * Animation configuration for fading elements using Framer Motion.
 *
 * This configuration defines how elements should fade in and out when used with Framer Motion.
 *
 * @example
 * import { motion } from 'framer-motion';
 * import { fadeAnimation } from './animations';
 *
 * // Use in a Framer Motion component
 * <motion.div initial={fadeAnimation.initial} animate={fadeAnimation.animate} exit={fadeAnimation.exit} transition={fadeAnimation.transition}>
 *   Content
 * </motion.div>
 */
export const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};
