import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-default-100 text-default-800 min-h-screen">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-default-800 to-default-500 mb-4">
            About Our Cook-Up
          </h1>
          <p className="text-lg md:text-xl text-default-600 leading-relaxed max-w-3xl mx-auto">
            Connect, share, and grow in a vibrant digital space where friendships
            flourish, ideas thrive, and your voice matters.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-default-200 p-10 rounded-3xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-default-700 mb-6">Our Vision</h2>
          <p className="text-lg text-default-700 leading-relaxed">
            Our vision is to create a dynamic platform that empowers users to
            connect, collaborate, and share their stories. We aim to build a
            space where innovation meets community, fostering meaningful
            interactions and creativity.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-default-200 p-10 rounded-3xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-default-700 mb-6">Our Mission</h2>
          <p className="text-lg text-default-700 leading-relaxed">
            To revolutionize social networking by offering an engaging,
            user-friendly platform that prioritizes privacy, creativity, and
            seamless interaction. We are dedicated to building a community that
            connects people across the globe in meaningful ways.
          </p>
        </div>

        {/* Why Us Section */}
        <div className="bg-default-200 p-10 rounded-3xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-default-700 mb-6">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg text-default-700 leading-relaxed space-y-4">
            <li>Intuitive design for a seamless user experience.</li>
            <li>Customizable profiles to showcase your personality.</li>
            <li>Robust tools for sharing and discovering content.</li>
            <li>Strong emphasis on community engagement and support.</li>
            <li>Commitment to data privacy and security.</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="bg-default-200 p-10 rounded-3xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-default-700 mb-6">Meet the Team</h2>
          <p className="text-lg text-default-700 leading-relaxed">
            Our team is a passionate group of developers, designers, and visionaries
            committed to creating a social platform that inspires connection and
            innovation. Together, we strive to bring you a modern social
            networking experience.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-default-400 to-default-700 mb-6">
            Join Us Today!
          </h2>
          <p className="text-lg text-default-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            Be a part of our growing community. Share your stories, connect with
            others, and make your mark in the digital world.
          </p>
          {/* <a
            href="/register"
            className="inline-block bg-gradient-to-r from-default-500 to-default-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-default-600 hover:to-default-500 transition duration-300 transform hover:scale-105"
          >
            Get Started
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;