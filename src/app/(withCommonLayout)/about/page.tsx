import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500 mb-4">
            About Recipe Sharing Community
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Elevate your cooking experience in a futuristic space where culinary
            enthusiasts come together to share recipes, master techniques, and
            explore the art of cooking in an immersive, interactive environment.
          </p>
        </div>

        {/* Vision Section */}
        <div className="backdrop-blur-md bg-opacity-10 bg-white p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-teal-400 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Recipe Sharing Community brings cooking into the digital age. Our
            vision is to provide a seamless, futuristic platform for food lovers
            to discover new recipes, share culinary skills, and connect with
            like-minded individuals. From interactive cooking timers to
            ingredient checklists, we make cooking easier and more enjoyable.
          </p>
        </div>

        {/* Mission Section */}
        <div className="backdrop-blur-md bg-opacity-10 bg-white p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-teal-400 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our mission is to revolutionize the way people cook and share
            recipes by integrating advanced features like real-time updates,
            multi-user collaboration, and AI-powered recipe recommendations.
            We're here to make cooking not only more accessible but more fun and
            futuristic for everyone.
          </p>
        </div>

        {/* Why Us Section */}
        <div className="backdrop-blur-md bg-opacity-10 bg-white p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-teal-400 mb-6">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg text-gray-300 leading-relaxed space-y-4">
            <li>
              A futuristic, interactive platform for recipe discovery and
              sharing.
            </li>
            <li>Advanced tools like ingredient checklists and built-in timers.</li>
            <li>AI-based personalized recipe recommendations.</li>
            <li>
              Social features to follow your favorite chefs and cooking
              enthusiasts.
            </li>
            <li>Exclusive premium content for subscribed members.</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="backdrop-blur-md bg-opacity-10 bg-white p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-teal-400 mb-6">Meet the Team</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We are a team of foodies, tech enthusiasts, and innovators driven to
            blend culinary arts with futuristic technology. Our mission is to
            inspire creativity in the kitchen while offering users an intuitive,
            interactive experience.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 mb-6">
            Join Us Today!
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Step into the future of cooking. Share your favorite recipes,
            discover new ones, and connect with a global community of passionate
            cooks and food enthusiasts.
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-teal-400 transition duration-300 transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
