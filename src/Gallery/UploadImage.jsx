import { Upload } from "lucide-react";
import React from "react";

const UploadImage = ({
  handleImageChange,
  handleTextChange,
  handleFileChange,
  handleFirstNameChange,
  handleLastNameChange,
  uploadImage,
  selectedImage,
  isLoading,
  handleCancel,
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
        <div className="pb-4">
          <label htmlFor="Name">FirstName :</label>
          <input
            className="bg-[#8080801a] rounded-xl p-2 w-full border border-solid border-[#1a8efd] text-black h-3/4 resize-none outline-none"
            type="text"
            id="Name"
            name="Name"
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="pb-4">
          <label htmlFor="Name">LastName :</label>
          <input
            className="bg-[#8080801a] rounded-xl p-2 w-full border border-solid border-[#1a8efd] text-black h-3/4 resize-none outline-none"
            type="text"
            id="Name"
            name="Name"
            onChange={handleLastNameChange}
          />
        </div>

        <div className="pb-4">
          <input
            className="bg-[#8080801a] rounded-xl p-2 w-full border border-solid border-[#1a8efd] text-black h-3/4 resize-none outline-none"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-div text-black">
          <textarea
            className=" bg-[#8080801a] rounded-xl p-2 w-full border border-solid border-[#1a8efd] text-black h-3/4 resize-none outline-none"
            placeholder="Add a Note ..."
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
    </form>
  );
};

export default UploadImage;
