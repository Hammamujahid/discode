// pages/index.tsx
import { useImageHandlers } from "@/utils/cloudinary/imageHandler";
import { getAllContent } from "@/utils/content/getAllContent";
import { ContentWithUsername } from "@/utils/types";
import React, { useState, useEffect } from "react";

const Content: React.FC = () => {
  const [contents, setContents] = useState<ContentWithUsername[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { selectedImage, openImage, closeModal } = useImageHandlers();

  useEffect(() => {
    const loadContents = async () => {
      try {
        const contentList = await getAllContent();
        setContents(contentList);
      } catch (err) {
        setError("Failed to fetch content. Please try again later.");
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    loadContents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-black w-full px-28">
      <div className="rounded-t-xl bg-gray-600 pt-4">
        <div className="h-10"></div>
        {contents.length > 0 ? (
          contents.map((content) => (
            <div
              key={content.id}
              className="content-item border-b border-1 border-black bg-gray-600 p-4"
            >
              <h3>{content.username}</h3>
              <p>{content.text}</p>
              <p>{new Date(content.createdAt.toDate()).toLocaleString()}</p>
              <div className="flex">
                {content.imageUrls?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Content image ${index + 1}`}
                    className="size-36 cursor-pointer"
                    onClick={() => openImage(url)}
                  />
                ))}
              </div>
              <div>
                {content.topics?.map((topic, index) => (
                  <span key={index}>{topic.name}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No content available.</div>
        )}

        {selectedImage && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center"
            onClick={closeModal}
          >
            <img
              src={selectedImage}
              alt="Selected content"
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
