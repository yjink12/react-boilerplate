import { motion, Variants } from 'framer-motion';

const WaveAnimation = () => {
  //   const text = '으후루꾸꾸루후으후루꾸꾸루후으후루꾸꾸루후으후루꾸꾸루후으';
  const text = 'Test Animation with Framer-motion';

  const containerVariant: Variants = {
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
    hidden: {
      opacity: 0,
    },
  };

  const letterVariant: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 400,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 400,
      },
    },
  };

  return (
    <motion.h1
      whileInView="visible"
      initial="hidden"
      variants={containerVariant}
      className="text-4xl font-extrabold text-black"
    >
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default WaveAnimation;
