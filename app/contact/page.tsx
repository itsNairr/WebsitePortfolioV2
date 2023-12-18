"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = {
      name: name,
      email: email,
      message: message,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        formValues,
        process.env.NEXT_PUBLIC_USER_ID!
      );
      setName("");
      setEmail("");
      setMessage("");
      document.getElementById("success")!.classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("success")!.classList.add("hidden");
      }, 5000);
    } catch (error) {
      document.getElementById("error")!.classList.remove("hidden");
      console.log(error);
    }

    // After the email is sent, re-enable the button after a delay
    setTimeout(() => {
      setIsSending(false);
    }, 5000); // 5 seconds delay
  };

  return (
    <>
      <main className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full flex flex-row flex-wrap items-center justify-evenly">
        <section
          data-aos="fade-in"
          className="xl:text-[60px] mx-5 text-[35px] xs:text-[25px] xl:text-left text-center font-bold xl:w-[50vw] mb-10"
        >
          Thank you for stopping by. I would love to get in touch with you.
        </section>
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSending(true);
              handleSubmit(e);
            }}
            className="flex flex-col xl:w-[35vw] w-[75vw] gap-5 dark:text-white text-black"
          >
            <input
              data-aos-duration="2000"
              data-aos="zoom-in"
              className="text-[20px] p-3 dark:bg-carddark bg-cardlight rounded-lg"
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              data-aos-duration="2000"
              data-aos="zoom-in"
              className="text-[20px] p-3 dark:bg-carddark bg-cardlight rounded-lg"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              data-aos-duration="2000"
              data-aos="zoom-in"
              className="text-[20px] p-3 h-[200px] dark:bg-carddark bg-cardlight rounded-lg"
              name="message"
              placeholder="Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" disabled={isSending}>
              <span
                data-aos="zoom-in"
                data-aos-duration="2000"
                className="text-[20px] font-bold"
              >
                Send
              </span>
            </button>
            <span
              id="success"
              className="hidden text-[20px] font-bold text-center text-green-500"
            >
              Sent Successfully!
            </span>
            <span
              id="error"
              className="hidden text-[20px] font-bold text-center text-red-500"
            >
              Something went wrong. Try again later.
            </span>
          </form>
        </section>
      </main>
      <div className="container">
        <div className="gradient"></div>
      </div>
    </>
  );
}

export default page;
