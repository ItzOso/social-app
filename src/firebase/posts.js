import { arrayRemove, arrayUnion, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
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
    try {
      if (!hasliked) {
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
      }
    } catch (error) {
      console.log("Error clicking like:", error)
      throw error
    }
  }

  export const createComment = async (post, user, comment) => {
    console.log(user)
    try {
      const postRef = doc(db, "posts", post.id)
    const newComment = {
      uid: user.uid,
      profilePic: user.profilePic,
      username: user.username,
      comment: comment,
      createdAt: Timestamp.now(),
    }
    const updatedComments = [newComment, ...post.comments]
      await updateDoc(postRef, {
        comments: updatedComments
      })
    } catch (error) {
      console.log("Error creating comment:", error)
      throw error
    }
  }
