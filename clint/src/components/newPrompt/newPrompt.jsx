import React, { useState, useEffect, useRef } from "react";
import { IKImage } from "imagekitio-react";
import Upload from "../upload/upload";
import "./newPrompt.css";
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [messages, setMessages] = useState([]); // { id, type: 'user'|'ai', text, img }
  const [img, setImg] = useState({ isLoading: false, error: "", dbData: {} });
  const [previewURL, setPreviewURL] = useState(null);
  const [fileForOCR, setFileForOCR] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Remove image
  const handleRemoveImage = () => {
    setImg({ isLoading: false, error: "", dbData: {} });
    setPreviewURL(null);
    setFileForOCR(null);
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  // Send text to Gemini AI
  const sendToAI = async (text) => {
    try {
      const result = await model.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ text }],
      });
      return result.candidates?.[0]?.content.parts[0]?.text || "No response from AI";
    } catch (err) {
      console.error("Error generating content:", err);
      return "Error generating response";
    }
  };

  // Convert image to base64 and extract text/description
  const extractTextFromImage = async (file) => {
    if (!file) return "";
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
    });

    try {
      const contents = [
        { inlineData: { mimeType: file.type, data: base64 } },
        { text: "Describe this image in one sentence or extract text from it" },
      ];
      const result = await model.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });
      return result.candidates?.[0]?.content.parts[0]?.text || "";
    } catch (err) {
      console.error("Error parsing image:", err);
      return "";
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;
    
    const textInput = e.target.text.value.trim();
    let finalText = textInput;

    setIsSending(true);

    try {
      // First handle image extraction if exists
      let extractedText = "";
      if (fileForOCR) {
        extractedText = await extractTextFromImage(fileForOCR);
        finalText = textInput ? `${textInput}\n${extractedText}` : extractedText;
      }

      if (!finalText) return;

   
      // Create temporary user message (without waiting for image processing)
      const userMessage = {
        id: Date.now(),
        type: "user",
        text: textInput, // Only the original text input
        img: previewURL || img.dbData?.filePath || null
      };

      setMessages(prev => [...prev, userMessage]);

      // Get AI response with the full context (text + extracted image text)
      const aiText = await sendToAI(finalText);
      
      // Add AI response
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== userMessage.id), // Remove temp message
        {
          ...userMessage,
          text: finalText // Update with full text including image description
        },
        {
          id: Date.now() + 1,
          type: "ai",
          text: aiText,
          img: null
        }
      ]);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Add error message if needed
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "ai",
        text: "Sorry, something went wrong. Please try again.",
        img: null
      }]);
    } finally {
      // Reset input and image
      setImg({ isLoading: false, error: "", dbData: {} });
      setPreviewURL(null);
      setFileForOCR(null);
      e.target.reset();
      setIsSending(false);
    }
  };

  return (
    <div className="newprompt">
      {/* Messages container */}
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            {/* Render image only for user messages */}
            {msg.type === "user" && msg.img && (
              msg.img.startsWith("http") ? (
                <img src={msg.img} alt="Uploaded" className="image-preview" />
              ) : (
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={msg.img}
                  transformation={[{ width: 150, height: 150, crop: "maintain_ratio" }]}
                  className="image-preview"
                />
              )
            )}
            <div className="message-content">
              {msg.text && <Markdown>{msg.text}</Markdown>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Inline image preview before sending */}
      {(previewURL || img.dbData?.filePath) && (
        <div className="image-preview-container">
          {previewURL && (
            <div className="preview-wrapper">
              <img src={previewURL} alt="Preview" className="image-preview" />
              {!img.dbData?.filePath && (
                <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>×</button>
              )}
            </div>
          )}
          {img.dbData?.filePath && (
            <div className="preview-wrapper">
              <IKImage
                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                path={img.dbData.filePath}
                transformation={[{ width: 150, height: 150, crop: "maintain_ratio" }]}
                className="image-preview"
              />
              <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>×</button>
            </div>
          )}
        </div>
      )}

      {/* Input form */}
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} setPreview={setPreviewURL} setFileForOCR={setFileForOCR} />
        <input
          type="text"
          name="text"
          placeholder={img.isLoading ? "Uploading..." : "Ask anything..."}
          autoComplete="off"
          disabled={img.isLoading || isSending}
          ref={inputRef}
        />
        <button type="submit" disabled={img.isLoading || isSending}>
          <img src="/arrow.png" alt="Send" />
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;