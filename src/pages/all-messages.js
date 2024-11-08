import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const result = await fetch("/api/get-messages");
      const data = await result.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRefresh = () => {
    fetchMessages();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[250px] flex-1 min-h-screen bg-gray-100 p-8 w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-teal-800 mb-4 text-center">
            All Messages
          </h1>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="py-3 px-5 text-md mb-5 font-medium text-center text-white rounded-lg bg-teal-700 sm:w-fit shadow-md shadow-cyan-300 hover:bg-teal-800 hover:shadow-cyan-500 focus:ring-2 focus:outline-none focus:ring-teal-300 duration-200"
          >
            {loading ? "Refreshing..." : "Refresh Messages"}
          </button>
        </div>
        {loading ? (
          <p className="text-xl m-4 text-teal-600 font-semibold">
            Loading messages...
          </p>
        ) : (
          <ul className="flex flex-col gap-5 items-center max-w-[350px] mx-auto">
            {messages.map((message, index) => (
              <li
                key={index}
                className="text-md font-normal text-gray-900 leading-relaxed p-4 border-gray-300 bg-white rounded-e-xl rounded-es-xl shadow-md shadow-teal-600"
              >
                {message}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
