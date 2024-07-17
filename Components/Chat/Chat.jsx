import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("getMessageHistory");

    socket.on("messageHistory", (history) => {
      setMessages(history);
    });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: newMessage });
    setNewMessage("");
  };

  return (
    <div style={{ color: "white" }}>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.vMessage}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
