import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../App";
import axios from "axios";
import Inbox from "./Inbox";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showInbox, setShowInbox] = useState(window.innerWidth > 640);

  const token = localStorage.getItem("unikart-auth");
  const location = useLocation();
  const navigate = useNavigate();
  const { buyerId, sellerId } = location.state;

  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  async function getMessages() {
    const response = await axios.get(
      `${base_url}/user/messages/${buyerId}_${sellerId}`,
      config
    );
    if (response.status === 200) {
      setMessages(response.data);
    } else {
      console.log("Error occurred while fetching messages");
    }
  }

  useEffect(() => {
    getMessages();
    socketRef.current = io(import.meta.env.VITE_BASE_URL);
    socketRef.current.emit("join-room", { buyerId, sellerId });
    socketRef.current.on("receive-message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [buyerId, sellerId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);
  

  useEffect(() => {
    const handleResize = () => {
      setShowInbox(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = () => {
    if (!message) {console.log("no message") ; return;}
    socketRef.current.emit("send-message", {
      senderId: buyerId,
      receiverId: sellerId,
      content: message,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: buyerId, receiverId: sellerId, content: message },
    ]);

    setMessage("");
  };

  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      {/* Inbox Panel (Hidden on Small Screens when Chat is Open) */}
      {showInbox && (
        <div className="w-1/3 bg-[#FAFAFA] h-screen overflow-y-auto sm:block hidden">
          <Inbox />
        </div>
      )}

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-[#FFFFFF] h-screen">
        {/* Chat Header */}
        <div className="bg-[#FAFAFA] text-[#393E46] p-3 text-lg font-light shadow-sm sticky top-0 z-10 flex justify-between items-center">
          {!showInbox && (
            <button
              onClick={() => navigate("/inbox")}
              className="text-sm text-[#000] hover:text-[#7F8487]"
            >
              ← Back to Inbox
            </button>
          )}
          <span>Chat</span>
        </div>

        {/* Messages Section */}
        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide pt-10 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === buyerId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow-sm max-w-xs md:max-w-md ${
                  msg.senderId === buyerId
                    ? "bg-[#000000] text-white"
                    : "bg-[#7F8487] text-white"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Ensure this is at the bottom */}
        </div>

        {/* Message Input Section */}
        <div className="flex items-center p-3 border-t border-[#EEEEEE] bg-[#FFFFFF] sticky bottom-0 z-10 mt-20">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 text-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F8487]"
          />
          <button
            onClick={handleSubmit}
            className="ml-3 bg-[#000000] text-white px-4 py-2 text-[20px] rounded-lg hover:bg-[#7F8487] focus:outline-none focus:ring-2 focus:ring-[#7F8487]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
