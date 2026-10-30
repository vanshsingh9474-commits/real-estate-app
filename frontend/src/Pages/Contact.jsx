import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 from-blue-50/50 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            GET IN TOUCH
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 mt-4 tracking-tight font-serif">
            We’d Love To Hear From You
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Have questions about a property or need help listing yours? Send us a message!
          </p>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Modern Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Thank you for reaching out. Our support team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none hover:border-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 hover:border-blue-300 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about Vasant Kunj Property"
                    className="w-full px-4 py-3.5 hover:border-blue-300 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3.5 hover:border-blue-300 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info Section */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-4 border-gray-100">
                Contact Information
              </h3>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</p>
                  <p className="font-bold text-gray-900 text-base mt-0.5">support@realestate.com</p>
                  <p className="text-xs text-gray-500 mt-0.5">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Us</p>
                  <p className="font-bold text-gray-900 text-base mt-0.5">+91 98765 43210</p>
                  <p className="text-xs text-gray-500 mt-0.5">Mon - Sat from 9am to 7pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Office Address</p>
                  <p className="font-bold text-gray-900 text-base mt-0.5">Vasant Kunj, New Delhi</p>
                  <p className="text-xs text-gray-500 mt-0.5">Delhi, 110070, India</p>
                </div>
              </div>
            </div>

            {/* Quick Hours Box */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-5 h-5 text-blue-200" />
                <h4 className="font-bold text-lg">Business Hours</h4>
              </div>
              <p className="text-sm text-blue-100">
                Monday - Saturday: 09:00 AM - 07:00 PM
              </p>
              <p className="text-sm text-blue-100 mt-1">
                Sunday: Closed
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}