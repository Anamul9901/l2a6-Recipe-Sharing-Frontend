import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Have any questions or feedback? We'd love to hear from you. Reach
            out to us using the form below, and we’ll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="backdrop-blur-md bg-opacity-10 bg-white p-10 rounded-3xl shadow-xl mx-auto max-w-4xl">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-teal-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-teal-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out"
                placeholder="Enter your email"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-teal-400"
              >
                Message
              </label>
              <textarea
                id="message"
                className="mt-2 h-[150px] block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-teal-400 transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-teal-400 mb-4">
            Or Reach Us At
          </h2>
          <p className="text-lg text-gray-300">
            Email: <a href="mailto:contact@recipecommunity.com" className="text-teal-400 hover:underline">contact@recipecommunity.com</a>
          </p>
          <p className="text-lg text-gray-300">
            Phone: <a href="tel:+123456789" className="text-teal-400 hover:underline">+1 234 567 89</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
