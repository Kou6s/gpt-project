import { useState } from 'react';
import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();  
  const [currentText , setCurrentText] = useState("");

  const handleSubmit =  (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
   
    if (!text) return;
    //  console.log(text);
    localStorage.setItem("prevTextValue", text);
    navigate("/dashboard/chats/45678");
    // try {
    //   // await fetch("http://localhost:3000/a  pi/chats", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   },
    //   //   body: JSON.stringify({ text }),
    //   // });


    //   // Optionally reset the textarea after sending

    // } catch (error) {
    //   console.error("Error sending chat:", error);
    // }finally{
    //         e.target.reset();
    // }
  };

  return (
    <div className="dashboardpage">
      <div className="texts">
        <div className="logo">
          <img src="/kat.png" alt="KAT Logo" />
          <h1>KAT AI</h1>
        </div>

        <div className="options">
          <div className="option"onClick={()=>navigate('/dashboard/chats/56789')} >
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
          <textarea name="text" placeholder="Ask me anything..." value={currentText} onChange={(e)=>{
            setCurrentText(e.target.value);
          }} ></textarea>
          <button type="submit">
            <img src="/arrow.png" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;

