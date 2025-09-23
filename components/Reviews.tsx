"use client";

import { FiStar } from "react-icons/fi";

const reviews = [
  { name: "Anjali S.", role: "Entrepreneur", avatar: "https://randomuser.me/api/portraits/women/68.jpg", rating: 5, text: "Her reading gave me so much clarity about my career path. The guidance was accurate and compassionate." },
  { name: "Rahul M.", role: "Designer", avatar: "https://randomuser.me/api/portraits/men/45.jpg", rating: 5, text: "I felt instantly understood. The birth chart session helped me realign my goals with confidence." },
  { name: "Sonia K.", role: "Student", avatar: "https://randomuser.me/api/portraits/women/22.jpg", rating: 4, text: "Gentle, insightful, and very supportive. I now approach challenges with a calmer mind." },
  { name: "Vikram P.", role: "Consultant", avatar: "https://randomuser.me/api/portraits/men/30.jpg", rating: 5, text: "The relationship reading was spot on! Helped me understand dynamics better and build healthier bonds." },
  { name: "Meera T.", role: "Product Manager", avatar: "https://randomuser.me/api/portraits/women/12.jpg", rating: 5, text: "Clear, actionable insights. I made a big decision with confidence after the session." },
  { name: "Arjun R.", role: "Engineer", avatar: "https://randomuser.me/api/portraits/men/66.jpg", rating: 4, text: "Calm energy and practical guidance. Felt grounded and focused afterward." },
  { name: "Priya D.", role: "Artist", avatar: "https://randomuser.me/api/portraits/women/56.jpg", rating: 5, text: "Beautifully intuitive reading that resonated deeply. Highly recommend." },
  { name: "Karan S.", role: "Marketer", avatar: "https://randomuser.me/api/portraits/men/28.jpg", rating: 5, text: "Straightforward, kind, and precise. The timing predictions matched perfectly." },
  { name: "Neha G.", role: "Writer", avatar: "https://randomuser.me/api/portraits/women/31.jpg", rating: 5, text: "Felt seen and supported. The guidance helped me unblock creative flow." },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-lg backdrop-blur max-w-[360px] mx-3">
      <div className="flex mb-3 text-yellow-400">
        {Array.from({ length: r.rating }).map((_, idx) => (
          <FiStar key={idx} />
        ))}
      </div>
      <p className="text-gray-700 text-sm mb-4">{r.text}</p>
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-center bg-cover"
          style={{ backgroundImage: `url(${r.avatar})` }}
        />
        <div>
          <h4 className="font-semibold text-gray-900">{r.name}</h4>
          <span className="text-xs text-gray-500">{r.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto  px-6 text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Client{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-rose-400 bg-clip-text text-transparent">
            Reviews
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-base text-gray-600 md:text-lg mt-3">
          Honest words from people I’ve guided through life’s crossroads.
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="marquee">
          <div className="flex">
            {reviews.map((r, i) => (
              <Card r={r} key={`a-${i}`} />
            ))}
            {reviews.map((r, i) => (
              <Card r={r} key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
