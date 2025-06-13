import { motion } from "framer-motion";

function FloatingShape({ color, top, left, size, delay }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-0.2 blur-xl `}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        opacity: [0.2, 0.4, 0.2],
        rotate: [0, 360],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
      aria-hidden="true"
    />
  );
}

export default FloatingShape;
