import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const followUser = async (currentUserId, targetUserId) => {
  try {
    // Add the target user's UID to the current user's following list
    await updateDoc(doc(db, "users", currentUserId), {
      following: arrayUnion(targetUserId),
    });
    
    // Add the current user's UID to the target user's followers list
    await updateDoc(doc(db, "users", targetUserId), {
      followers: arrayUnion(currentUserId),
    });
  } catch (error) {
    console.error("Error following user: ", error);
  }
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  try {
    // Remove the target user's UID from the current user's following list
    await updateDoc(doc(db, "users", currentUserId), {
      following: arrayRemove(targetUserId),
    });
    
    // Remove the current user's UID from the target user's followers list
    await updateDoc(doc(db, "users", targetUserId), {
      followers: arrayRemove(currentUserId),
    });
  } catch (error) {
    console.error("Error unfollowing user: ", error);
  }
};

