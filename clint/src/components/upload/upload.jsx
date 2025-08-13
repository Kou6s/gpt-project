import React, { useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import imageCompression from "browser-image-compression";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  const response = await fetch("http://localhost:3000/api/upload");
  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Authentication failed: ${response.status} ${errBody}`);
  }
  const data = await response.json();
  return { signature: data.signature, expire: data.expire, token: data.token };
};

const Upload = ({ setImg, setPreview, setFileForOCR }) => {
  const [fileToUpload, setFileToUpload] = useState(null);
  const inputRef = useRef(null);

  const onError = (err) => {
    setImg(prev => ({ ...prev, isLoading: false, error: err.message }));
    setPreview(null);
    setFileToUpload(null);
    if (setFileForOCR) setFileForOCR(null);
  };

  const onSuccess = (res) => {
    setImg(prev => ({ ...prev, isLoading: false, dbData: res, error: "" }));
    setFileToUpload(null);
  };

  const onUploadStart = () => {
    setImg(prev => ({ ...prev, isLoading: true, error: "" }));
  };

  const handleFileSelection = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    e.target.value = null;

    if (!file.type.startsWith("image/")) {
      setImg(prev => ({ ...prev, error: "Only image files allowed", isLoading: false }));
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      setPreview(URL.createObjectURL(compressedFile));
      setFileToUpload(compressedFile);
      if (setFileForOCR) setFileForOCR(compressedFile);
    } catch (err) {
      setImg(prev => ({ ...prev, error: "Compression failed: " + err.message, isLoading: false }));
      setPreview(null);
      if (setFileForOCR) setFileForOCR(null);
    }
  };

  return (
    <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      {fileToUpload && (
        <IKUpload
          file={fileToUpload}
          fileName={fileToUpload.name}
          useUniqueFileName={true}
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={onUploadStart}
          style={{ display: "none" }}
        />
      )}

      <div className="attachment-btn" onClick={() => inputRef.current.click()}>
        <img src="/attachment.png" alt="Attach file" />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileSelection}
      />
    </IKContext>
  );
};

export default Upload;
