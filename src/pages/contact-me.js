import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function ContactMe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetch("/api/send-storage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message, subject }),
      });

      const data = await result.json();

      if (data.success) {
        setResponseMsg("Message sent successfully!");
        setEmail(""); // Clear form fields on success
        setMessage("");
        setSubject("");
      } else {
        setResponseMsg("Failed to send message. Try again.");
      }
    } catch (error) {
      setResponseMsg("Error sending message.");
      console.error("Error occurred during sending message: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[250px] p-8 w-full">
        <h1 className="mt-2 mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contact Me
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto flex flex-col gap-5"
        >
          <div>
            <label
              for="email"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@email.com"
              aria-placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              for="subject"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Subject:
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Let me know how I can help you"
              aria-placeholder="Let me know how I can help you"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              for="message"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Message:
            </label>
            <textarea
              id="message"
              placeholder="Leave a message..."
              aria-placeholder="type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-cyan-700 sm:w-fit shadow-md shadow-sky-300 hover:bg-cyan-800 hover:shadow-sky-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 duration-200"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {responseMsg && (
          <p className="text-center text-lg m-3">{responseMsg}</p>
        )}
      </main>
    </div>
  );
}
