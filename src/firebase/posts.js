import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { deleteObject, ref } from "firebase/storage";

export const deletePost = async (post) => {
    const postRef = doc(db, "posts", post.id);
    try {
      await deleteDoc(postRef);
      if (post.image && post.imagePath) {
        const imageRef = ref(storage, post.imagePath);
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.log("Error deleting post:", error);
      throw error
    }
  };

  export const clickLike = async (post, userId, hasliked) => {
    const postRef = doc(db, "posts", post.id);
    if (!hasliked) {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      });
    }
  }
