import React from 'react';
import { FaUsers, FaChartLine, FaHandshake, FaLightbulb, FaHeart, FaBuilding, FaSmile, FaUserTie } from 'react-icons/fa';

const AboutPage = () => {
  const stats = [
    { value: "500+", label: "Companies Partnered", icon: <FaBuilding className="text-blue-500 text-3xl" /> },
    { value: "95%", label: "Satisfaction Rate", icon: <FaSmile className="text-blue-500 text-3xl" /> },
    { value: "50+", label: "Industry Experts", icon: <FaUserTie className="text-blue-500 text-3xl" /> }
  ];

  const features = [
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: "Talent First Approach",
      description: "We prioritize candidates' career growth and job satisfaction above all."
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: "Data-Driven Matching",
      description: "Advanced algorithms match candidates with ideal job opportunities."
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-500" />,
      title: "Employer Partnerships",
      description: "Strong relationships with top companies across industries."
    },
    {
      icon: <FaLightbulb className="text-4xl text-blue-500" />,
      title: "Innovative Solutions",
      description: "Continually evolving platform with cutting-edge features."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Talent with Opportunity</h1>
          <p className="text-xl md:text-2xl mb-8">
            Private Job Search is revolutionizing recruitment through technology and human expertise.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Discover How
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                Founded in 2015, Private Job Search began as a small startup with a big vision - to transform how India recruits.
                What started as a passion project between three college friends has now grown into one of the most trusted
                recruitment platforms in the country.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we serve thousands of job seekers and hundreds of employers across multiple industries,
                with special focus on technology, finance, and healthcare sectors.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden h-96 shadow-md border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Private Job Search team working together"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 rounded-lg p-8 mb-20 grid grid-cols-2 md:grid-cols-3 gap-8 border border-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 hover:bg-white rounded-lg transition duration-300 border border-gray-200 bg-white">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* What Makes Us Different */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-blue-500 font-semibold tracking-wider">OUR DIFFERENCE</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Why Candidates & Companies Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-200 flex flex-col items-center text-center h-full">
                <div className="mb-6 p-4 bg-blue-50 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team CTA */}
        <section className="relative bg-blue-600 rounded-lg p-12 text-center text-white overflow-hidden mb-20">
          <div className="relative max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8">
              We're always looking for passionate individuals to join our growing team and help shape the future of recruitment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
                View Open Positions
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition">
                Learn About Culture
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="text-center mb-12">
            <span className="text-blue-500 font-semibold tracking-wider">SUCCESS STORIES</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What People Say About Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Software Engineer",
                quote: "Private Job Search helped me find my dream job in just 2 weeks! Their personalized approach made all the difference.",
                img: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Priya Patel",
                role: "HR Manager",
                quote: "The quality of candidates we've found through Private Job Search is exceptional. It's transformed our hiring process.",
                img: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Amit Singh",
                role: "Product Manager",
                quote: "From start to finish, the Private Job Search team was professional, responsive, and truly understood our needs.",
                img: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-200">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-500"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;