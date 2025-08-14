import './chatList.css';
import { Link } from 'react-router-dom';

const ChatList = () => {
    return (
        <div className="chatList">
            <span className="title">DASHBOARD</span>

            <Link to="/dashboard/chats/324343">Create a new chat</Link>
            <Link to="">Explore KAT AI</Link>
            <Link to="https://github.com/Kou6s/gpt-project">Contact</Link>

            <hr />
<span className='title'> RECENT CHARTS

</span>
            <div className="list">
                
                  <Link to="/">No chats </Link>
                
            </div>

            <div className="upgrade">
                <img src="/kat.png" alt="" />
                <div className="texts">
                    <span>Upgrade Pro Version</span>
                    <span>Unlimited access to all features</span>
                </div>
            </div>
        </div>
    );
}

export default ChatList;
