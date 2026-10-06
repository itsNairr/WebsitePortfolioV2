"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import GalaxyBackground from "../components/GalaxyBackground";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass = "liquid-field text-[20px] p-3 rounded-2xl";

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        { name, email, message },
        process.env.NEXT_PUBLIC_USER_ID!
      );
      setName("");
      setEmail("");
      setMessage("");
      setStatus("sent");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return (
    <>
      <GalaxyBackground subtle />
      <main className="relative z-10 min-h-screen max-h-full pt-[120px] pb-[100px] w-full flex flex-row flex-wrap items-center justify-evenly">
        <section className="xl:text-[60px] mx-5 text-[35px] xs:text-[25px] xl:text-left text-center font-bold xl:w-[50vw] mb-10">
          Thank you for stopping by. I would love to get in touch with you.
        </section>
        <section>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col xl:w-[35vw] w-[75vw] gap-5 dark:text-white text-black"
          >
            <input
              className={fieldClass}
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={fieldClass}
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className={`${fieldClass} h-[200px] resize-none`}
              name="message"
              placeholder="Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="text-[20px] font-bold disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
            <div aria-live="polite" className="text-[20px] font-bold text-center">
              {status === "sent" && <span className="text-green-500">Sent Successfully!</span>}
              {status === "error" && (
                <span className="text-red-500">Something went wrong. Try again later.</span>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default page;
