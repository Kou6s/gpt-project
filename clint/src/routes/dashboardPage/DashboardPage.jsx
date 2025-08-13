import './DashboardPage.css';

const DashboardPage = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    try {
      await fetch("http://localhost:3000/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      // Optionally reset the textarea after sending
      e.target.reset();
    } catch (error) {
      console.error("Error sending chat:", error);
    }
  };

  return (
    <div className="dashboardpage">
      <div className="texts">
        <div className="logo">
          <img src="/kat.png" alt="KAT Logo" />
          <h1>KAT AI</h1>
        </div>

        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Chat Icon" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Image Analysis Icon" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="Code Help Icon" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>

      {/* Chat input bar */}
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <textarea name="text" placeholder="Ask me anything..."></textarea>
          <button type="submit">
            <img src="/arrow.png" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;

