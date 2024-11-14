// /firebase/auth.js
import { collection, doc, getDoc, query, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore';
import { auth, storage } from './firebaseConfig';
import { db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Sign up function
export const signup = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const usersRef = doc(db, "users", userCredential.user.uid)
      await setDoc(usersRef, {
        uid: userCredential.user.uid,
          username: username,
          email: email,
          profilePic: "",
          bio: "No bio yet.",
          following: [],
          followers: [],
          createdAt: Timestamp.now()
      })
      
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
};

// Login function
export const signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout function
export const signout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Function to upload the profile image
export const uploadprofilePic = async (selectedImage, userId) => {
  try {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(storageRef, selectedImage);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    console.log("Error uploading image:", error);
    throw error;
  }
};

// Function to update user profile information in Firestore
export const updateUserProfile = async (bio, imageUrl, userRef, setProfileUserData) => {
  try {
    await updateDoc(userRef, { bio, profilePic: imageUrl });
    setProfileUserData((prev) => ({
      ...prev,
      bio,
      profilePic: imageUrl,
    }));
  } catch (error) {
    console.log("Error updating profile:", error);
    throw error;
  }
};