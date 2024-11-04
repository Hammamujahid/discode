// utils/imageHandlers.ts
import { useState } from "react";

export const useImageHandlers = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (url: string) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return { selectedImage, openImage, closeModal };
};
