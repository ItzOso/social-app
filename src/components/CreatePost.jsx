import React, { useContext, useRef, useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import IconButton from "./IconButton";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../context/authContext";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function CreatePost() {
  const { currentUser } = useContext(AuthContext);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
    if (error) setError("");
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage("");
    setPreviewImage("");
  };

  const handleCreatePost = async () => {
    setLoading(true);
    if (image || caption) {
      const postsRef = doc(collection(db, "posts"));
      let imageUrl;
      let storageRef;
      if (image) {
        try {
          storageRef = ref(
            storage,
            `postImage/${currentUser.user.uid}/${Date.now()}`
          );
          await uploadBytes(storageRef, image);
          imageUrl = await getDownloadURL(storageRef);
        } catch (error) {
          console.log("Error saving post image:", error);
        }
      }
      try {
        await setDoc(postsRef, {
          uid: currentUser.user.uid,
          username: currentUser.userData.username,
          profilePic: currentUser.userData.profilePic,
          caption: caption || "",
          image: imageUrl || "",
          imagePath: storageRef ? storageRef.fullPath : "",
          likes: [],
          comments: [],
          createdAt: Timestamp.now(),
        });
      } catch (error) {
        console.log("Error creating post:", error);
      }

      setError("");
    } else {
      setError("Cant create an empty post! Add a caption or image.");
    }
    setLoading(false);
    setCaption("");
    setImage("");
    setPreviewImage("");
  };

  return (
    <div className="rounded-md bg-secondary p-6 space-y-6">
      <input
        placeholder="Share something..."
        className="w-full p-4 rounded-md"
        type="text"
        value={caption}
        maxLength={1000}
        onChange={(e) => {
          setCaption(e.target.value);
          if (error) setError("");
        }}
      />
      {error && <p className="text-red-600">{error}</p>}
      {previewImage && (
        <div className="relative w-[300px]">
          <img src={previewImage} className="w-full" alt="" />
          <IoClose
            className="bg-red-600 text-white p-1 w-[30px] h-[30px] rounded-full hover:brightness-95 absolute
            top-2
            right-2"
            onClick={handleRemoveImage}
          />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <input
            className="hidden"
            accept="image/*"
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleSelectImage(e)}
            id="create-post-image"
          />
          <IconButton
            icon={FaImage}
            text="Image"
            onClick={() => fileInputRef.current.click()}
          />
          {/* <IconButton icon={FaVideo} text="Video" /> */}
        </div>
        <button
          onClick={handleCreatePost}
          className="bg-primary rounded-md text-xl px-8 py-2 text-white hover:brightness-95"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
