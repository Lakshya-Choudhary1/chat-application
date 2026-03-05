import { motion } from "framer-motion";

const AnimatedGradientBorder = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`
        p-0.5
        ${className}
      `}
      style={{
        background:
          "conic-gradient(from var(--angle), #64748b80 80%, #6366f1 86%, #a5b4fc 90%, #6366f1 94%, #64748b80)",
      }}
      animate={{ "--angle": ["0deg", "360deg"] }}
      transition={{ duration: 6, ease: "circInOut", repeat: Infinity }}
    >
      <div className="rounded-2xl w-full h-full bg-slate-900">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedGradientBorder;
