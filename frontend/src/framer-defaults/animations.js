/**
 * Animation Configurations
 *
 * This module contains default animation configurations for the application using Framer Motion.
 * It includes scaleAnimation and fadeAnimation for scaling and fading elements respectively.
 *
 * @example
 * import { scaleAnimation, fadeAnimation } from './animations';
 *
 * // Use in a Framer Motion component
 * <motion.div {...scaleAnimation}>Content</motion.div>
 * <motion.div {...fadeAnimation}>Content</motion.div>
 */

/**
 * @description
 * Animation configuration for scaling elements with opacity transition.
 *
 * @property {Object} initial - Initial state of the animation.
 * @property {Object} initial.opacity - Initial opacity value.
 * @property {Object} initial.scale - Initial scale value.
 * @property {Object} animate - Animation state.
 * @property {Object} animate.opacity - Final opacity value.
 * @property {Object} animate.scale - Final scale value.
 * @property {Object} exit - Exit state of the animation.
 * @property {Object} exit.opacity - Exit opacity value.
 * @property {Object} exit.scale - Exit scale value.
 * @property {Object} transition - Transition configuration.
 * @property {number} transition.duration - Duration of the transition in seconds.
 */
export const scaleAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.2 },
};

/**
 * @description
 * Animation configuration for fading elements.
 *
 * @property {Object} initial - Initial state of the animation.
 * @property {Object} initial.opacity - Initial opacity value.
 * @property {Object} animate - Animation state.
 * @property {Object} animate.opacity - Final opacity value.
 * @property {Object} exit - Exit state of the animation.
 * @property {Object} exit.opacity - Exit opacity value.
 * @property {Object} transition - Transition configuration.
 * @property {number} transition.duration - Duration of the transition in seconds.
 */
export const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};
