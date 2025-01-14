import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-default-100 text-default-foreground min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-default-700 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-default-muted leading-relaxed max-w-3xl mx-auto">
            Have any questions or feedback? We'd love to hear from you. Reach
            out to us using the form below, and we’ll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="backdrop-blur-md bg-opacity-10 bg-default-400 p-10 rounded-3xl shadow-xl mx-auto max-w-4xl">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-default-accent"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 block w-full p-3 rounded-xl bg-default-input border border-default-border text-default-foreground focus:border-default-accent focus:ring-default-accent transition duration-300 ease-in-out"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-default-accent"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 block w-full p-3 rounded-xl bg-default-input border border-default-border text-default-foreground focus:border-default-accent focus:ring-default-accent transition duration-300 ease-in-out"
                placeholder="Enter your email"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-default-accent"
              >
                Message
              </label>
              <textarea
                id="message"
                className="mt-2 h-[150px] block w-full p-3 rounded-xl bg-default-input border border-default-border text-default-foreground focus:border-default-accent focus:ring-default-accent transition duration-300 ease-in-out"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-gradient-to-r from-default-100 to-default-200 text-default-800 font-bold py-3 px-8 rounded-full shadow-lg hover:from-default-primary hover:to-default-secondary transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-default-accent mb-4">
            Or Reach Us At
          </h2>
          <p className="text-lg text-default-muted">
            Email: <a href="mailto:anamulhaque9901@gmail.com" className="text-default-accent hover:underline">anamulhaque9901@gmail.com</a>
          </p>
          <p className="text-lg text-default-muted">
            Phone: <a href="tel:+123456789" className="text-default-accent hover:underline">+8801864668089</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
