import { motion } from "framer-motion";

const ShreeJobLoader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-6 overflow-hidden">
      {/* Title Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h1 className="text-6xl font-extrabold text-blue-700 font-[Poppins] tracking-tight">
          Private Job Search
        </h1>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Connecting talent with opportunity
        </p>
      </motion.div>

      {/* Simple Progress Bar */}
      <div className="relative w-80 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full shadow-md"
        />
      </div>

      {/* Animated Bouncing Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex space-x-3"
      >
        {[0, 1, 2, 3, 4].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.2, 1],
              backgroundColor: ["#1D4ED8", "#0284C7", "#1D4ED8"],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-4 h-4 rounded-full bg-blue-700 shadow-md"
          />
        ))}
      </motion.div>

      {/* Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center"
      >
        <p className="text-gray-600 text-base mb-1">
          Loading your perfect matches...
        </p>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-blue-700 font-semibold"
        >
          Powered by Private Job Search
        </motion.p>
      </motion.div>

      {/* Rotating Decorative SVG */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-32 h-32 opacity-10 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ShreeJobLoader;
