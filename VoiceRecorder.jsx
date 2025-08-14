import React, { useState } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recognition, setRecognition] = useState(null);

  // Expanded bot logic with FAQs
  const getBotReply = (userText) => {
    const text = userText.toLowerCase();

    // Greetings
    if (text.includes("hello") || text.includes("hi")) 
        return "Hello! How can I help you today?";
    if (text.includes("good morning")) 
        return "Good morning! Hope you have a great day!";
    if (text.includes("good night")) 
        return "Good night! Sleep well!";

    // Well-being
    if (text.includes("how are you")) 
        return "I'm a bot, but I'm doing great! How about you?";

    // Farewell
    if (text.includes("bye") || text.includes("goodbye")) 
        return "Goodbye! Have a nice day!";
    if (text.includes("see you")) 
        return "See you soon!";

    // Programming/Tech FAQs
    if (text.includes("java")) 
        return "Java is a versatile, high-level programming language used for applications, websites, and Android development.";
    if (text.includes("encapsulation")) 
        return "Encapsulation in Java is hiding class data and using getters and setters for access. It protects data and improves maintainability.";
    if (text.includes("inheritance")) 
        return "Inheritance in Java allows a class to acquire properties and methods from another class, promoting code reuse.";
    if (text.includes("polymorphism")) 
        return "Polymorphism allows objects to take multiple forms; methods can behave differently based on the object.";
    if (text.includes("abstraction")) 
        return "Abstraction in Java hides complex implementation details and shows only the necessary functionality.";
    if (text.includes("python")) 
        return "Python is a high-level, easy-to-learn programming language used in web development, data science, AI, and automation.";
    if (text.includes("javascript") || text.includes("js")) 
        return "JavaScript is used to make web pages interactive and dynamic.";
    if (text.includes("react") || text.includes("reactjs")) 
        return "ReactJS is a JavaScript library for building fast and reusable UI components.";
    if (text.includes("html")) 
        return "HTML is the markup language for creating web page structure.";
    if (text.includes("css")) 
        return "CSS is used to style HTML elements and design web pages.";

    // Website/Service
    if (text.includes("flipkart")) 
        return "Flipkart is a major Indian e-commerce platform where you can buy electronics, clothing, and more.";
    if (text.includes("amazon")) 
        return "Amazon is a global e-commerce platform that sells a wide range of products online.";
    if (text.includes("features of this website") || text.includes("show me the features")) 
        return "This website lets you talk using your microphone, see your speech in a chat box, receive confirmation, and hear bot replies.";

    // General knowledge
    if (text.includes("capital of india")) 
        return "The capital of India is New Delhi.";
    if (text.includes("population of india")) 
        return "India's population is over 1.4 billion as of 2025.";
    if (text.includes("world population")) 
        return "The world population is over 8 billion people in 2025.";
    if (text.includes("current time")) 
        return `The current time is ${new Date().toLocaleTimeString()}.`;
    if (text.includes("today's date") || text.includes("date today")) 
        return `Today's date is ${new Date().toLocaleDateString()}.`;
    if (text.includes("weather")) 
        return "You can check your local weather using a weather app or website.";

    // Health & lifestyle
    if (text.includes("healthy food")) 
        return "Eating fruits, vegetables, whole grains, and drinking plenty of water is good for health.";
    if (text.includes("exercise")) 
        return "Regular exercise like walking, jogging, or yoga helps maintain fitness.";
    if (text.includes("mental health")) 
        return "Mental health is important. Practice mindfulness, meditation, and take breaks when needed.";

    // Fun/entertainment
    if (text.includes("joke") || text.includes("funny")) 
        return "Why did the computer go to the doctor? Because it caught a virus!";
    if (text.includes("game")) 
        return "Chess, football, and video games are popular forms of entertainment.";
    if (text.includes("movie")) 
        return "You can watch movies on Netflix, Amazon Prime, or Disney+.";

    // Default fallback
    return "I'm not sure about that. Can you please provide more details?";
  };

  const startRecording = () => {
    const recog = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.start();
    setIsRecording(true);
    setRecognition(recog);

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setMessages(prev => [...prev, { id: prev.length + 1, text: transcript, sender: "user" }]);
      setMessages(prev => [...prev, { id: prev.length + 1, text: "Audio received successfully!", sender: "bot" }]);

      const botReply = getBotReply(transcript);
      setMessages(prev => [...prev, { id: prev.length + 1, text: botReply, sender: "bot" }]);

      const utterance = new SpeechSynthesisUtterance(botReply);
      window.speechSynthesis.speak(utterance);
    };

    recog.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsRecording(false);
    };

    recog.onend = () => setIsRecording(false);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={startRecording} disabled={isRecording} style={{ marginRight: "10px" }}>
          {isRecording ? "Listening..." : "Start Talking"}
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop
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
