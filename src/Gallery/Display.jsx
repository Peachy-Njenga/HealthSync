import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Trash2, File, Star, Plus } from "lucide-react";
import { getDatabase, ref as dbRef, get, remove, set } from "firebase/database";

const Display = ({ images, handleDelete, handleFavorite }) => {
  const db = getDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isAddFile, setIsAddFile] = useState(false);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // Clear selected image on close
  };

  const handleDeleteClick = (e, imgUrl) => {
    e.stopPropagation();
    handleDelete(imgUrl);
    //  setText(e.target.value.toString().trim());
  };

  const handleFavoriteClick = (e, imgUrl) => {
    e.stopPropagation();
    handleFavorite(imgUrl);
  };

  const handleAddFile = (e, imgUrl) => {
    setIsAddFile(true);
  };

  return (
    <div className="bg-slate-300 bg-opacity-20 p-2 rounded-2xl grid grid-cols-4 w-4/6 h-screen scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-300 overflow-y-scroll">
      <Fade>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              color: "black",
              borderRadius: "20px",
              breakInside: "avoid",
              border: "1px solid #1a8efd",
              margin: "1rem",
            }}
            className="image-hover"
            onClick={() => handleImageClick(image, index)}
          >
            {/* <p>{image.size}</p> */}
            <img className="object-cover" src={image.imageUrl} />
            <div
              style={{
                backgroundColor: "rgb(128, 128, 128, 0.1)",
                width: "100%",
                position: "sticky",
                bottom: "0",
                display: "flex",
                justifyContent: "space-around",
                padding: "0.5rem",
                color: "#1a8efd",
              }}
            >
              <div
                onClick={(event) => handleDeleteClick(event, image.imageUrl)}
              >
                <Trash2 />
              </div>
              {/* <div>
                <Share2 />
              </div> */}
              <div
                onClick={(event) => {
                  handleFavoriteClick(event, image.imageUrl);
                }}
              >
                <Star />
              </div>
            </div>
          </div>
        ))}
      </Fade>

      {isModalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <img
              src={selectedImage?.imageUrl}
              alt={selectedImage?.text}
              style={{ width: "100%", height: "60%" }}
            />
            <div className="flex space-x-2 text-xl pt-4 font-bold">
              <p>{selectedImage.firstName}</p>
              <p>{selectedImage.lastName}</p>
            </div>
            <a className="" href={selectedImage.fileUrl}>
              <File />
            </a>
            <div className="flex space-x-2 font-bold" onClick={handleAddFile}>
              <p>Add File</p>
              <Plus />
            </div>
            {isAddFile && (
              <div>
                <input
                  className="bg-[#8080801a] rounded-xl p-2 w-full border border-solid border-[#1a8efd] text-black h-12 resize-none outline-none"
                  type="file"
                  onChange={handleAddFile}
                />
                <button className="p-1 mt-2 bg-blue-400 rounded-full w-[20%]">
                  Add
                </button>
              </div>
            )}
            {selectedImage?.text && (
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  height: "50px",
                  textAlign: "left",
                  borderRadius: "10px",
                }}
              >
                <p style={{ paddingLeft: "1rem" }}>{selectedImage.text}</p>
              </div>
            )}
            <button
              className="p-1 bg-blue-400 rounded-full w-[30%]"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
