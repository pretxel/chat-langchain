"use client";
import React, { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Header from "../components/Header";

function HumanResponse({ message }: { message: string }) {
  return (
    <li className="flex justify-start">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span className="block">{message}</span>
      </div>
    </li>
  );
}

function AIResponse({ message }: { message: string }) {
  return (
    <li className="flex justify-end">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
        <span className="block">{message}</span>
      </div>
    </li>
  );
}

export default function Chat() {
  const { isLoading, messages, input, handleInputChange, handleSubmit } =
    useChat();
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="mx-auto w-full h-full flex flex-col stretch">
      <Header />
      <ul className="space-y-2 h-max py-20 overflow-auto" ref={scrollRef}>
        {messages.length > 0
          ? messages.map((m) => (
              <>
                {m.role === "user" ? (
                  <HumanResponse message={m.content} />
                ) : (
                  <AIResponse message={m.content} />
                )}
              </>
            ))
          : null}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full w-max-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
