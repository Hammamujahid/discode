import React, { useState } from "react";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/utils/firebase/config";
import axios from "axios";
import AddTopicToContent from "../topic/addToContent";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Topic {
  topicId: ReturnType<typeof doc>;
  name: string;
  createdAt: Timestamp;
}

const UploadContent: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showAddTopic, setShowAddTopic] = useState(false);

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
      const selectedFiles = Array.from(e.target.files);
      const totalImages = images.length + selectedFiles.length;
      if (totalImages <= 5) {
        setImages([...images, ...selectedFiles]);
      } else {
        alert("You can only upload up to 5 images.");
      }
    }
  };

  const handleTopicSelect = (topic: { id: string; name: string }) => {
    if (topics.length < 5) {
      setTopics([...topics, { topicId: doc(db, "topic", topic.id), name: topic.name, createdAt: Timestamp.now() }]);
      setShowAddTopic(false); // Hide dropdown after topic selection
    } else {
      alert("You can only select up to 5 topics.");
    }
  };

  const resetFields = () => {
    setText("");
    setImages([]);
    setTopics([]);
    setShowAddTopic(false);
  };

  const handleUpload = async () => {
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME!);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          return response.data.secure_url;
        })
      );

      const content = {
        text,
        createdAt: Timestamp.now(),
        imageUrls,
        userId: doc(db, "user", user.uid),
        topics: topics.map((topic) => ({
          topicId: topic.topicId,
          name: topic.name,
          createdAt: topic.createdAt,
        })),
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="px-6 pt-6 pb-4 rounded-lg bg-white max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Upload Content</h2>
        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full p-2 border rounded mb-4"
          placeholder="Write something..."
        ></textarea>
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          className="mb-4"
        />
        <div className="mb-4">
          {images.map((image, index) => (
            <div key={index} className="text-sm text-gray-700">
              {image.name}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Topics:</h3>
          {topics.map((topic, index) => (
            <div key={index} className="text-sm text-gray-700">
              Topic {index + 1}: {topic.name}
            </div>
          ))}
          {topics.length < 5 && (
            <>
              {showAddTopic ? (
                <AddTopicToContent onSelectTopic={handleTopicSelect} selectedTopics={topics.map((t) => t.topicId.id)} />
              ) : (
                <button onClick={() => setShowAddTopic(true)} className="bg-green-600 p-2 rounded text-white mt-2">
                  + Add Topic
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-600 text-white p-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white p-2 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
