import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';

const ScrollAnimation = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      id="scroll-indicator"
      className={`fixed top-0 left-0 right-0 h-[10px] bg-blue-300 origin-left`}
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
};
export default ScrollAnimation;
