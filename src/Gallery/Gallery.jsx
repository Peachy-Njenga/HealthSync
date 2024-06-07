import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Display from "./Display";
import {
  getDatabase,
  ref as dbRef,
  set,
  get,
  onChildAdded,
  onValue,
  remove,
} from "firebase/database";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes,listAll } from "firebase/storage";
import { v4 } from "uuid";
import { Home, Star, Eye, FileX } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/LogoutButton";
import Profile from "../auth/Profile";
// import Header from "../Header";

const Gallery = () => {
  const [image, setImage] = React.useState();
  const [text, setText] = React.useState();
  const [file, setFile] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [fileUrl, setFileUrl] = useState();

  const db = getDatabase();

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    console.log(e);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    // console.log("joan");
    setFile(e.target.files);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value.toString().trim());
  };

  const handleFirstNameChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };
  const userId = user?.sub;

  const uploadImage = async (e) => {
    e.preventDefault();

    // Input validation (already present in your code)

    setIsLoading(true); // Set loading state immediately after clicking upload

    const myimage = image[0]; // Access the first file from the image state
    const myfile = file[0]; // Access the first file from the file state

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${userId}/${myimage.name + v4()}`); // Create image reference with UUID
      await uploadBytes(imageRef, myimage);

      const fileRef = ref(storage, `files/${userId}/${myfile.name + v4()}`); // Create file reference with UUID
      await uploadBytes(fileRef, myfile);

      // Get the download URL after successful upload
      const url = await getDownloadURL(imageRef);
      const fileurl = await getDownloadURL(fileRef);

      // Save image data to Firebase Realtime Database
      await set(
        dbRef(
          db,
          `images/${userId}/` + myimage.name.replace(/[.]?/gm, "") + v4()
        ),
        {
          imageUrl: url,
          text: text,
          fileUrl: fileurl,
          firstName: firstName,
          lastName: lastName,
        }
      );

      console.log("Image uploaded and saved successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false); // Clear loading state on error
    } finally {
      setImage(null);
      setSelectedImage(null);
      setText("");
      const textValue = document.getElementById("text");
      textValue.value = "";
      setIsLoading(false); // Clear loading state even on success
    }
  };

  const uploadfile = async (e) => {
    e.preventDefault();
    console.log("I am uploading file");

    if (file == null) {
      return alert("Kindly Input file");
    }

    const myfile1 = file[0]; // Access the first file from the image state

    try {
      // Upload the image to Firebase Storage
      const fileRef = ref(storage, `files/${userId}/${myfile1.name}`); // Create image reference with UUID

      await uploadBytes(fileRef, myfile1);

      // Get the download URL after successful upload
      const newfileurl = await getDownloadURL(fileRef);
      setFileUrl(newfileurl);

      console.log("File uploaded and saved successfully!");
      setIsLoading(false); // Clear loading state on success
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false); // Clear loading state on error
    } finally {
      setFile(null);
      const fileValue = document.getElementById("newfile");
      fileValue.value = "";
    }
  }

  const [files, setFiles] = useState([]);

  
  const getFiles = async () => {
     const storageRef = ref(storage, `files/${userId}/`);

    try {
      const res = await listAll(storageRef);
      const fileURLs = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setFiles(fileURLs);
    } catch (error) {
      console.error(error);
    }
    // Display files (implement your UI logic here)
  };


  const [images, setImages] = useState([]);

 const getImages = async () => {
   const firebaseRef = dbRef(db, `images/${userId}/`);

   try {
     const snapshot = await get(firebaseRef);
     if (snapshot.exists()) {
       const imageData = snapshot.val();
       const imagesList = Object.keys(imageData).map((key) => imageData[key]);
       setImages(imagesList);
     } else {
       console.log("No images available");
     }
   } catch (error) {
     console.error(error);
   }
 };

  useEffect(() => {
    // getImages();
    getFiles();
  }, [files]);

  const handleCancel = () => {
    setImage(null);
    setText("");
    setSelectedImage(null);
  };

  const handleDelete = async (imgUrl) => {
    const firebaseRef = dbRef(db, `images/${userId}/`); // Reference to the images node

    try {
      const snapshot = await get(firebaseRef); // Get all data from "images" node
      const data = snapshot.val(); // Get data as an object

      if (data) {
        // Iterate through each image data object
        for (const key in data) {
          if (data[key].imageUrl === imgUrl) {
            // Matching image URL found, delete the data
            await remove(dbRef(db, `images/${userId}/${key}`));
            //  await deleteDoc(doc(db, `images/${imgUrl}`))
            console.log("Image deleted successfully!");
            return; // Exit the function after successful deletion
          }
        }
        console.log("Image not found in database.");
      } else {
        console.log("No images found in database.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleFavorite = async (imgUrl) => {
    console.log("I am favoriting");
    console.log(imgUrl);
    const firebaseRef = dbRef(db, `images/${userId}/`); // Reference to the images node
    console.log(firebaseRef);

    try {
      const snapshot = await get(firebaseRef); // Get all data from "images" node
      const data = snapshot.val(); // Get data as an object

      if (data) {
        // Iterate through each image data object
        for (const key in data) {
          if (data[key].imageUrl === imgUrl) {
            // Matching image URL found, transfer data to the favorites node?
            // Transfer all information the name should be same as the one that was aved to the database
            await set(
              dbRef(db, `favorites/${userId}/` + key.replace(/[.]?/gm, "")),
              {
                imageUrl: data[key].imageUrl,
                text: data[key].text,
              }
            );

            console.log("Image added to favoriites successfully!");
            return; // Exit the function after successful deletion
          }
        }
      }
    } catch (error) {
      console.error("Error adding image to Favorites:", error);
    }
  };

  const getFavorites = () => {
    const firebaseRef = dbRef(db, `favorites/${userId}/`);
    onValue(
      firebaseRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const imageData = snapshot.val();
          // console.log(imageData);
          const imagesList = Object.keys(imageData).map(
            (key) => imageData[key]
          );
          // console.log(imagesList);
          setImages(imagesList);
        } else {
          console.log("No images available");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const favoriteClick = () => {
    getFavorites();
  };

  const getAllClick = () => {
    getImages();
  };

  return (
    <div className="h-screen overflow-y-hidden ">
      <h1 className="text-4xl font-bold text-center mt-2">MediCapture</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "black",
          justifyContent: "center",
          justifyContent: "space-evenly",
          fontSize: "",
          borderRadius: "20px",
          width: "15%",
          height: "5%",
          alignItems: "center",
          alignContent: "flex-end",
          float: "right",
          marginRight: "3rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
            fontSize: "1rem",
          }}
        >
          <Home onClick={getAllClick} size={32} />
          <p style={{ marginTop: "2xl" }}>Home</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Star
            style={{ textAlign: "center" }}
            onClick={favoriteClick}
            size={32}
          />
          <p>Favourite</p>
        </div>
        {/* <Eye size={32} /> */}
        {/* <div className="p-1 bg-blue-400 rounded-full w-[30%] text-center">
          <LogoutButton />
        </div> */}
      </div>

      <div className="flex gap-4 justify-around w-full ">
        <div>
          <div className="pl-20 text-2xl text-center"><Profile /></div>
          <UploadImage
            handleImageChange={handleImageChange}
            handleTextChange={handleTextChange}
            handleFileChange={handleFileChange}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            uploadImage={uploadImage}
            selectedImage={selectedImage}
            isLoading={isLoading}
            handleCancel={handleCancel}
          />
        </div>

        <Display
          images={images}
          handleDelete={handleDelete}
          handleFavorite={handleFavorite}
          getFavorites={getFavorites}
          getFiles={getFiles}
          uploadfile={uploadfile}
          handleFileChange={handleFileChange}
          files={files}
        />
      </div>
    </div>
  );
};
export default Gallery;
