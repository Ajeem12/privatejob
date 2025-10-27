import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/LinkedIn_2021.svg/250px-LinkedIn_2021.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
];

const LogoMarquee = () => {
  const repeatedLogos = [...logos, ...logos]; // 👈 Duplicate to remove gap

  return (
    <div className="py-12 z-20 bg-gray-50 border-y border-gray-200">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
        Trusted by Top Companies
      </h2>

      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex gap-20 items-center px-4 py-4">
          {repeatedLogos.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1, rotate: 1, opacity: 1 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0.9 }}
              className="transition-transform duration-300"
            >
              <img
                src={logo}
                alt={`Company logo ${index}`}
                className="h-14 md:h-16 w-auto object-contain mx-2"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default LogoMarquee;
