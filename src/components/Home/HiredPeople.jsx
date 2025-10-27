import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchHiredPeople } from "../../redux/slice/hiredSlice";
import { FiArrowRight } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const HiredPeople = () => {
  const dispatch = useDispatch();
  const { hiredPeople, loading, error } = useSelector((state) => state.hiredPeople);

  useEffect(() => {
    dispatch(fetchHiredPeople());
  }, [dispatch]);

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25,0.1,0.25,1] } } };
  const hoverCard = { scale: 1.03, y: -10, transition: { duration: 0.3, ease: "easeOut" } };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true, margin:"-50px" }} className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full mb-4">Success Stories</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Professionals Hired at <span className="text-indigo-600">Top Companies</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">See how our platform helped candidates land their dream roles at world-class organizations</p>
        </motion.div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && Array.isArray(hiredPeople) && hiredPeople.length > 0 && (
          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-100px" }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {hiredPeople.map((person, index) => (
              <motion.div key={index} variants={item} whileHover={hoverCard} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col group">
                <div className="relative h-56 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
  <img
    src={person.image_url} 
    alt={person.name}
    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
  />
  <div className="absolute bottom-4 left-4 z-20">
    <span className="text-white font-medium drop-shadow-md">{person.company_name}</span>
  </div>
</div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.role}</p>
                  <div className="mb-6 relative mt-3">
                    <FaQuoteLeft className="absolute -top-2 left-0 text-gray-300 text-xl" />
                    <p className="text-gray-700 pl-6 relative italic">{person.testimonial || person.story}</p>
                  </div>
                  <div className="mt-auto text-sm text-gray-500">Joined {person.joined || "recently"}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HiredPeople;
