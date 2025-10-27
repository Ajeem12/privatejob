import React from 'react'

const CareerTips = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Career Advice</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "How to Write a Winning Resume",
              desc: "Learn how to make your resume stand out to recruiters.",
              img: "https://source.unsplash.com/400x300/?resume"
            },
            {
              title: "Top Interview Questions Answered",
              desc: "Ace your next interview with these expert tips.",
              img: "https://source.unsplash.com/400x300/?interview"
            },
            {
              title: "Remote Work: The New Normal",
              desc: "Find out how to thrive in a remote-first job market.",
              img: "https://source.unsplash.com/400x300/?remote,work"
            }
          ].map(({ title, desc, img }) => (
            <div key={title} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img src={img} alt={title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareerTips