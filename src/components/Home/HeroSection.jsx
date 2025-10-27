import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import JobSearchBar from '../../components/SearchBar'; // Make sure the path is correct


const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });



  return (
    <div
      ref={ref}
      className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 overflow-hidden"
    >
      {/* Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-300"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
              opacity: [0, 0.2, 0],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Find Your <span className="text-blue-600">Perfect</span> Career Match
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Join over 5 million professionals and access thousands of jobs from top companies worldwide.
              </p>
            </motion.div>

            {/* Job Search Bar */}
            <JobSearchBar />

            {/* Trust Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <span className="text-sm text-gray-500">Trusted by:</span>
              {['Google', 'Microsoft', 'Amazon', 'Apple'].map((company) => (
                <motion.div
                  key={company}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200 text-sm font-medium"
                >
                  {company}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <img
                src="https://jobstack-shreethemes.vercel.app/assets/woman_working_2-CtRt_vob.svg"
                alt="Career illustration"
                className="w-full h-auto max-w-xl mx-auto"
              />
              {/* Floating Stats */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -left-10 top-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 000 2h1v2.382a1 1 0 01-.553.894L3 9.618V17a1 1 0 001 1h12a1 1 0 001-1V9.618l-3.447-2.342A1 1 0 0113 6.382V4h1a1 1 0 100-2H6z" /></svg>
                  </div>
                  <div>
                    <div className="text-blue-600 font-bold">10K+</div>
                    <div className="text-xs text-gray-500">Jobs Posted</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
                className="absolute -right-10 bottom-1/4 bg-indigo-100 p-4 rounded-xl shadow-lg border border-indigo-100"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-200 p-2 rounded-lg mr-3">
                    <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.363 2.308 10.637 2.308 10.951 2.927L13.132 7.08l4.732.689c.728.106 1.02 1 .492 1.512l-3.423 3.333.808 4.705c.124.723-.635 1.27-1.27.93L10 16.347l-4.221 2.222c-.635.34-1.393-.207-1.27-.93l.808-4.705-3.423-3.333c-.528-.512-.236-1.406.492-1.512l4.732-.689L9.049 2.927z" /></svg>
                  </div>
                  <div>
                    <div className="text-indigo-600 font-bold">50+</div>
                    <div className="text-xs text-gray-500">Countries</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
