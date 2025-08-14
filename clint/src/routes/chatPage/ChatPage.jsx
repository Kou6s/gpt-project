import { useEffect, useRef } from "react";
import "./ChatPage.css";
import NewPrompt from "../../components/newPrompt/newPrompt"; // ✅ Correct path

const ChatPage = () => {
    const endRef = useRef(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <div className="chatpage">
            <div className="wrapper">
                <div className="chat">
                    {/* <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message from ai</div>
                    <div className="message user">Test message from user</div> */}

                    {/* ✅ Input form at bottom */}
                    <NewPrompt />
                    <div ref={endRef} />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
