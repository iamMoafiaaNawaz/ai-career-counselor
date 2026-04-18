import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are an AI Career Counselor specialized in helping Pakistani students build careers in Artificial Intelligence, Machine Learning, Data Science, and Tech.

You help students with:
- Which skills to learn and in what order
- Career paths in AI/ML (ML Engineer, Data Scientist, AI Researcher, MLOps, etc.)
- How to build a strong portfolio
- Resume and interview tips for tech jobs
- Free resources and roadmaps
- Pakistani job market insights (local companies, remote work, freelancing)
- Higher studies guidance (MS, PhD, scholarships)

Rules:
- Be friendly, encouraging, and conversational
- Give specific, actionable advice
- Keep responses concise but helpful
- If asked something outside career counseling, politely redirect back to career topics
- Always motivate students — Pakistani students face real challenges, acknowledge that`;

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Assalam o Alaikum! I'm your AI Career Counselor.\n\nI'm here to help you navigate your tech career journey — whether you're just starting out or looking to level up in AI, ML, or Data Science.\n\nAsk me anything! For example:\n• How do I start learning AI?\n• What skills do I need for ML Engineer role?\n• How to build a strong portfolio?\n• Job market in Pakistan for AI?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages,
          ],
          max_tokens: 1024,
        }),
      });

      const data = await response.json();
      const botReply = data.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, kuch error aa gaya. Dobara try karo!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>🎓</div>
        <div>
          <h1 style={styles.headerTitle}>AI Career Counselor</h1>
          <p style={styles.headerSub}>Your personal guide to a tech career in Pakistan</p>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.role === "user" ? styles.userRow : styles.botRow}>
            <div style={msg.role === "user" ? styles.userBubble : styles.botBubble}>
              <p style={styles.bubbleText}>{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={styles.botRow}>
            <div style={styles.botBubble}>
              <p style={styles.bubbleText}>💭 Thinking...</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <textarea
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me about your AI/Tech career..."
          rows={1}
        />
        <button style={styles.sendBtn} onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f9fafb",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 24px",
    backgroundColor: "#1e293b",
    color: "white",
  },
  headerIcon: { fontSize: "36px" },
  headerTitle: { margin: 0, fontSize: "20px", fontWeight: "700" },
  headerSub: { margin: 0, fontSize: "13px", color: "#94a3b8" },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  userRow: { display: "flex", justifyContent: "flex-end" },
  botRow: { display: "flex", justifyContent: "flex-start" },
  userBubble: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 16px",
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "70%",
  },
  botBubble: {
    backgroundColor: "white",
    color: "#1e293b",
    padding: "12px 16px",
    borderRadius: "18px 18px 18px 4px",
    maxWidth: "70%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  bubbleText: { margin: 0, fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap" },
  inputRow: {
    display: "flex",
    gap: "10px",
    padding: "16px 20px",
    backgroundColor: "white",
    borderTop: "1px solid #e2e8f0",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    resize: "none",
    outline: "none",
    fontFamily: "'Segoe UI', sans-serif",
  },
  sendBtn: {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};