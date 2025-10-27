import React, { useState, useEffect } from "react";
import { FaUser, FaSearch, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Create Your Profile",
    desc: "Sign up and showcase your experience, skills, and preferences to stand out to employers.",
    icon: FaUser,
    bgColor: "bg-blue-500",
    iconColor: "text-white",
    borderColor: "border-blue-100",
    stepNumber: "01"
  },
  {
    title: "Discover Opportunities",
    desc: "Browse thousands of curated job listings from trusted companies that match your skills.",
    icon: FaSearch,
    bgColor: "bg-emerald-500",
    iconColor: "text-white",
    borderColor: "border-emerald-100",
    stepNumber: "02"
  },
  {
    title: "Apply & Get Hired",
    desc: "Easily apply with one click and get matched with the perfect opportunities for your career.",
    icon: FaCheckCircle,
    bgColor: "bg-purple-500",
    iconColor: "text-white",
    borderColor: "border-purple-100",
    stepNumber: "03"
  }
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your dream job in three simple steps. Our platform makes job hunting efficient and effective.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full z-0"></div>
          
          {steps.map(({ title, desc, icon: Icon, bgColor, iconColor, borderColor, stepNumber }, index) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="relative z-10"
              onHoverStart={() => setActiveStep(index)}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-transparent hover:border-t-4 hover:border-gray-200 h-full flex flex-col items-center text-center transition-all duration-300"
                style={{ borderTopColor: activeStep === index ? bgColor.replace("bg-", "") : "transparent" }}
              >
                <div className="flex items-center justify-between w-full mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${bgColor} shadow-lg`}>
                    <Icon className={`${iconColor} text-2xl`} />
                  </div>
                  <span className="text-5xl font-bold text-gray-100">{stepNumber}</span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{desc}</p>
                
              
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress indicators for mobile */}
        <div className="flex justify-center mt-12 md:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full mx-1 ${activeStep === index ? 'bg-blue-500' : 'bg-gray-300'}`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;