import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Software Developer at Google",
    text: "This platform helped me land my dream job in just two weeks! The interview preparation resources were incredibly helpful.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Priya Verma",
    role: "Product Manager at Amazon",
    text: "The job matching algorithm is spot-on. I received offers from 3 companies that perfectly matched my skillset.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    name: "Rahul Mehta",
    role: "Data Analyst at Microsoft",
    text: "I loved the one-click apply feature. Saved me hours compared to other job portals. Got 5 interview calls in one week!",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 5,
  },
  {
    name: "Neha Patel",
    role: "UX Designer at Adobe",
    text: "The resume builder helped me showcase my portfolio beautifully. Recruiters complimented my profile presentation.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Job Seekers Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who accelerated their careers with our platform
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map(({ name, role, text, img, rating }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <img
                  src={img}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100 shadow-sm mr-5"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="relative text-gray-700 text-md flex-grow mb-6">
                <FaQuoteLeft className="absolute top-0 left-0 text-indigo-100 text-3xl -translate-x-1 -translate-y-2" />
                <p className="pl-8">{text}</p>
              </blockquote>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Verified User • {rating}/5 Rating
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300">
            Read More Success Stories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;