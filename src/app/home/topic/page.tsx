// TopicListWithFollow.tsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '@/utils/firebase/config';
import { getAllTopic } from '@/utils/topic/getAllTopic';
import { Topic } from '@/utils/types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { handleFollow, handleUnfollow } from '@/utils/topic/followUnfollowTopic';

const TopicListWithFollow: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getTopics = async () => {
      const topicsList = await getAllTopic();
      setTopics(topicsList);
    };

    const getFollowedTopics = async (userId: string) => {
      const q = query(collection(db, "following_topic"), where("userId", "==", doc(db, "user", userId)));
      const querySnapshot = await getDocs(q);
      const followed = querySnapshot.docs.map(doc => doc.data().topicId.id);
      setFollowedTopics(followed);
    };

    getTopics();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getFollowedTopics(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='bg-gray-400 h-96 mb-20 w-64 p-4 rounded-lg overflow-y-auto'>
      {topics.map(topic => (
        <div key={topic.id} className="topic-item flex justify-between items-center mb-2">
          <span>{topic.name}</span>
          {followedTopics.includes(topic.id) ? (
            <button
              onClick={() => handleUnfollow(user, topic.id, setFollowedTopics, followedTopics)}
              className="p-2 rounded bg-red-600 text-white"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => handleFollow(user, topic.id, setFollowedTopics, followedTopics)}
              className="p-2 rounded bg-blue-600 text-white"
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicListWithFollow;
