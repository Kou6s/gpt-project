import { Link } from 'react-router-dom'
import './Homepage.css'
import { TypeAnimation } from 'react-type-animation'
import React, { useState } from 'react';

const HomePage = () => 
{



  const [typingStatus, setTypingStatus] = useState("human1");  
  return (
    <div className="homepage">
{/* <Link to= "/dashboard"> Dashboard </Link > */}
<img src="/orbital.png" alt="" className='orbital' />

<div className="left">
  
  <h1>KAT GPT</h1>
 
  <h2>AI-powered creativity that turns ideas into reality </h2>
  <h3>KAT GPT — Koushik’s Automation Technology
AI for every ambition — from healthcare and coding to business, education, creativity, and science. Achieve more, faster, smarter — without limits.

</h3>
   {/* <img src="/kat.png" alt="" /> */}
<Link to="/dashboard">
  Let's Start
</Link>



</div>
<div className="right">
  

<div className="imgContainer">
<div className="bgContainer">
  <div className="bg">  

  </div>
</div>

  
<img src="/bot1.png" alt="" className='bot' />

{

<div className="chat">
  <img
    src={
      typingStatus === "human1"
        ? "/human1.jpeg"
        : typingStatus === "human2"
        ? "/human2.jpeg"
        : "/kat.png"
    }
    alt=""
  />
  <span>
    <TypeAnimation
      sequence={[
        'Human: What can you do, AI ?',
        2000, () => setTypingStatus("bot"),
        'KAT: I can build smart websites .',
        2000, () => setTypingStatus("human2"),
        'Human: What else can you do ?',
        2000, () => setTypingStatus("bot2"),
        'KAT: I can create mobile apps .',
        2000, () => setTypingStatus("human1"),
      ]}
      wrapper="span"
      repeat={Infinity}
      cursor={true}
      omitDeletionAnimation={true}
    />
  </span>
</div>


}

</div>
</div>
<div className="terms">

  <img src="/kat.png" alt="" />
  <div className="links">

    <Link to="/">
    Terms of Service
    </Link>

    <Link to="/">
    Privacy Policy
    </Link>
  </div>
</div>
  
    </div>
  );
}
 export default HomePage;