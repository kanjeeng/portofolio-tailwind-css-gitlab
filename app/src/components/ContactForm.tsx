"use client";

import { useState } from "react";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/backend/api/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          message,
        }),
      });

      const { msg, success } = await res.json();
      setError(msg);
      setSuccess(success);

      if (success) {
        setFullname("");
        setEmail("");
        setMessage("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="fullname" className="font-semibold text-sm text-dark mb-1 block">
            Full Name
          </label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            required
            placeholder="John Doe"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="font-semibold text-sm text-dark mb-1 block">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            required
            placeholder="john@example.com"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="message" className="font-semibold text-sm text-dark mb-1 block">
            Your Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="h-32 w-full"
            id="message"
            required
            placeholder="Tell me about your project, role, or question..."
          ></textarea>
        </div>

        <button
          className="bg-primary rounded-lg p-3.5 text-white font-bold transition-all duration-300
          hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {error && error.length > 0 && (
        <div className="flex flex-col mt-4">
          {error.map((e, i) => (
            <div
              key={i}
              className={`${
                success ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"
              } px-4 py-3 rounded-lg text-sm font-medium mb-2`}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
