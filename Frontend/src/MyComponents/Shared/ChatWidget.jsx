import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there, How can I help you?" },
  ]);

  // scroll to newest message
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);


  // Function to handle sending message and taking response from AI API
  const handleSend = async (e) => {
    e.preventDefault();

    if (text.trim()) {
      const userMessage = text;
      setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
      setText("");

      // Maintain chat history
      const history = [...messages,
      { from: "user", text: userMessage }
      ].map((msg) => `${msg.from === "bot" ? "careerly" : "user"}: ${msg.text}`)
        .join("\n");

      try {
        // Calling Api
        setLoading(true);

        const res = await axios.post(
          "http://localhost:3000/ai/chat/get-review",
          { chat: history },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setLoading(false);

        // Storing ai response
        if (res.data.success) {
          const aiReply = res.data.review || "Hmm... I couldn't generate a response.";
          setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              from: "bot",
              text: "Sorry, there was an error processing your request.",
            },
          ]);
        }
      } catch (error) {
        setLoading(false);
        console.error("AI API error:", error);
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Oops! Something went wrong. Try again later.",
          },
        ]);
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-[#2d3748] hover:bg-[#6A38C2] text-white p-4 rounded-full shadow-lg focus:outline-none transition-all"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <IoMdChatbubbles className="w-7 h-7" />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed z-50 bottom-20 mb-4  right-6 w-[350px] max-w-[92vw] h-[470px] bg-gray-900 text-gray-100 rounded-3xl shadow-2xl flex flex-col border border-gray-700">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-800 bg-gray-800 rounded-t-3xl">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/robot-2.png"
              alt="careerly"
              className="w-9 h-9 rounded-full border-2 border-gray-900 mr-3"
            />
            <div>
              <div className="font-medium">careerly</div>
              <div className="text-gray-400 text-xs">
                We typically reply in a few minutes
              </div>
            </div>
            <button
              className="ml-auto text-gray-400 hover:text-red-400 text-xl"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Message Area */}
          <div
            className="flex-1 px-4 py-3 bg-gray-900 space-y-3 overflow-y-auto rounded-b-0 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.from === "bot" ? (
                  <>
                    <img
                      src="https://img.icons8.com/ios-filled/100/ffffff/robot-2.png"
                      alt="bot"
                      className="w-7 h-7 rounded-full"
                    />
                    <div className="bg-gray-800 text-sm px-4 py-2 ml-2 rounded-2xl rounded-bl-none shadow max-w-[70%]">
                      {msg.text}
                    </div>
                  </>
                ) : (
                  <div className="bg-[#6A38C2] text-white text-sm px-4 py-2 rounded-2xl rounded-br-none shadow max-w-[70%]">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start items-end gap-2">
                <img
                  src="https://img.icons8.com/ios-filled/100/ffffff/robot-2.png"
                  alt="bot"
                  className="w-7 h-7 rounded-full animate-pulse"
                />
                <div className="bg-gray-800 px-4 py-2 rounded-2xl text-gray-400 text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} /> {/* auto-scroll anchor */}
          </div>

          {/* Input Bar */}
          <form
            className="flex items-center p-3 border-t border-gray-800 bg-gray-800 rounded-b-3xl"
            onSubmit={handleSend}
          >
            <input
              className="flex-1 rounded-full px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 focus:ring-[#6A38C2] focus:ring-2 outline-none disabled:opacity-60"
              placeholder="Ask me anything..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className={`ml-2 ${loading
                ? "opacity-50 cursor-not-allowed"
                : "text-[#6A38C2] hover:text-[#8b5cf6]"
                } transition-all`}
              disabled={loading}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M2 21l21-9-21-9v7l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
