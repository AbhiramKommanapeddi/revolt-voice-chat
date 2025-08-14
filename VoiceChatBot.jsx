import React, { useState } from "react";

export default function VoiceChatBot() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);

  // Simple chatbot logic
  const getBotReply = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes("hello") || text.includes("hi")) return "Hello! How can I help you today?";
    if (text.includes("how are you")) return "I'm a bot, but I'm doing great! How about you?";
    if (text.includes("bye")) return "Goodbye! Have a nice day!";
    return "I see. Tell me more!";
  };

  const startRecording = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      // Show user message
      setMessages(prev => [...prev, { id: prev.length + 1, text: transcript, sender: "user" }]);

      // Generate bot reply
      const botReply = getBotReply(transcript);

      // Show bot message
      setMessages(prev => [...prev, { id: prev.length + 1, text: botReply, sender: "bot" }]);

      // Speak bot reply
      const utterance = new SpeechSynthesisUtterance(botReply);
      window.speechSynthesis.speak(utterance);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={startRecording} disabled={isRecording} style={{ marginRight: "10px" }}>
          {isRecording ? "Listening..." : "Start Talking"}
        </button>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", height: "300px", overflowY: "auto", backgroundColor: "#f9f9f9" }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                backgroundColor: msg.sender === "user" ? "#4caf50" : "#e0e0e0",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
