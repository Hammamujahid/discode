import React, { useState } from "react";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/utils/firebase/config";
import axios from "axios";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadContent: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const resetFields = () => {
    setText("");
    setImage(null);
  };

  const handleUpload = async () => {
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME!);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
      }

      const content = {
        text,
        createdAt: Timestamp.now(),
        imageUrl,
        userId: doc(db, "user", user.uid)
      };

      await addDoc(collection(db, "content"), content);
      resetFields();
      onClose();
    } catch (error) {
      console.error("Error uploading content:", error);
    }
  };

  const handleCancel = () => {
    resetFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="px-6 pt-6 rounded-lg bg-black">
      <textarea value={text} onChange={handleTextChange}></textarea>
      <input type="file" onChange={handleImageChange} />
      <div className="flex">
        <button className="bg-red-600" onClick={handleCancel}>
          Cancel
        </button>
        <button className="bg-blue-600" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadContent;
