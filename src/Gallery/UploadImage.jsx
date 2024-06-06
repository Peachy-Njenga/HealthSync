import { Upload } from "lucide-react";
import React from "react";

const UploadImage = ({
  handleImageChange,
  handleTextChange,
  uploadImage,
  selectedImage,
  isLoading,
  handleCancel
}) => {
  return (
    <form action="">
      {/* <h4>Upload Image</h4> */}
      <div className="input-container">
        <div>
          <label htmlFor="image">
            <div className="image-input">
              {selectedImage ? (
                // Show image preview if selected
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  style={{ width: "100%", height: "100%", zIndex: "90" }}
                />
              ) : (
                // Show upload icon and text if no image selected
                <>
                  Upload
                  <Upload size={30} />
                </>
              )}
            </div>
          </label>
          <input
            id="image"
            name="image"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
          />
        </div>
        <div className="text-div text-black">
          <textarea
            className="text-input text-black"
            placeholder="A little Recap ..."
            onChange={handleTextChange}
            name="text"
            id="text"
          ></textarea>
        </div>
      </div>
      {isLoading && (
        <div className="text-center">
          <p>Just A Minute ...</p>
        </div>
      )}
      <div className="flex justify-end mt-1 space-x-2">
        <button
          className="p-1 bg-blue-400 rounded-full w-[30%]"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="p-1 bg-blue-400 rounded-full w-[30%]"
          onClick={uploadImage}
        >
          Upload
        </button>
      </div>
      <div></div>
    </form>
  );
};

export default UploadImage;
