

const uploadImage = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  return data.secure_url;
};

export default uploadImage;
