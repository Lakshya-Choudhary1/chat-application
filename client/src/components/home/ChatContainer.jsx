import React, { useEffect, useRef } from "react";
import { useMessageStore } from "../../store/useMessageStore.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import userAvatar from "../../assets/user.png";
import { X } from "lucide-react";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import SendMessage from "./SendMessage.jsx";

const ChatContainer = () => {
  const {
    selectedUser,
    setSelectedUser,
    messages,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useMessageStore();

  const { authUser } = useAuthStore();

  const bottomRef = useRef(null);

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setSelectedUser(null);
    }
  };

  // ✅ REAL-TIME FIXED EFFECT
  useEffect(() => {
    if (!selectedUser) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    window.addEventListener("keydown", handleEscKey);

    return () => {
      unsubscribeToMessages();
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedUser]);

  // ✅ AUTO SCROLL FIXED
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="w-full h-full flex flex-col bg-slate-900">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-3 border-b border-slate-700 shrink-0">
        <div className="flex gap-3 items-center">
          <div className="relative">
            <img
              className="size-9 rounded-full object-cover"
              src={selectedUser.profilePic || userAvatar}
            />
            <span className="absolute size-3 bottom-0 right-0 rounded-full border-2 border-black bg-green-400"></span>
          </div>

          <div>
            <h1 className="text-slate-100 text-sm font-medium">
              {selectedUser.fullName}
            </h1>
            <p className="text-green-400/70 text-xs">Online</p>
          </div>
        </div>

        <X
          className="text-slate-300 cursor-pointer"
          onClick={() => setSelectedUser(null)}
        />
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        ) : (
          <div className="mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderId === authUser._id
                    ? "justify-end"   // ✅ YOUR messages
                    : "justify-start" // ✅ OTHER user
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="shared"
                      className="rounded-lg mb-2 max-h-48 object-cover"
                    />
                  )}

                  {msg.text && <p>{msg.text}</p>}

                  <p
                    className={`text-xs mt-1 ${
                      msg.senderId === authUser._id
                        ? "text-white/70 text-right"
                        : "text-slate-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="shrink-0">
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatContainer;