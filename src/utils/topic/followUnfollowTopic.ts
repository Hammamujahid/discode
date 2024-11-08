// utils/followFunctions.ts
import { db } from '@/utils/firebase/config';
import { User } from 'firebase/auth';
import { doc, addDoc, collection, deleteDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';

export const handleFollow = async (user: User | null, topicId: string, setFollowedTopics: React.Dispatch<React.SetStateAction<string[]>>, followedTopics: string[]) => {
  if (!user) {
    console.error("No user is logged in");
    return;
  }

  try {
    const followingTopic = {
      userId: doc(db, "user", user.uid),
      topicId: doc(db, "topic", topicId),
      createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, "following_topic"), followingTopic);
    setFollowedTopics([...followedTopics, topicId]);
  } catch (error) {
    console.error("Error following topic:", error);
  }
};

export const handleUnfollow = async (user: User | null, topicId: string, setFollowedTopics: React.Dispatch<React.SetStateAction<string[]>>, followedTopics: string[]) => {
  if (!user) {
    console.error("No user is logged in");
    return;
  }

  try {
    const q = query(collection(db, "following_topic"), 
                    where("userId", "==", doc(db, "user", user.uid)), 
                    where("topicId", "==", doc(db, "topic", topicId)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setFollowedTopics(followedTopics.filter(id => id !== topicId));
  } catch (error) {
    console.error("Error unfollowing topic:", error);
  }
};
