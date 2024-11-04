import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase/config';

interface TopicOption {
  id: string;
  name: string;
}

interface AddTopicToContentProps {
  onSelectTopic: (topic: TopicOption) => void;
  selectedTopics: string[]; // Tambahkan prop untuk topik yang sudah dipilih
}

const AddTopicToContent: React.FC<AddTopicToContentProps> = ({ onSelectTopic, selectedTopics }) => {
  const [topics, setTopics] = useState<TopicOption[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsCollection = collection(db, 'topic');
      const topicsSnapshot = await getDocs(topicsCollection);
      const topicsList = topicsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name, // Pastikan field 'name' ada di dokumen topic
      }));
      setTopics(topicsList);
    };

    fetchTopics();
  }, []);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = topics.find(topic => topic.id === e.target.value);
    if (selectedTopic) {
      onSelectTopic(selectedTopic);
    }
  };

  return (
    <div>
      <select onChange={handleTopicChange} className="border p-2 rounded mb-2">
        <option value="">Select a topic</option>
        {topics
          .filter(topic => !selectedTopics.includes(topic.id)) // Filter topik yang sudah dipilih
          .map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default AddTopicToContent;
