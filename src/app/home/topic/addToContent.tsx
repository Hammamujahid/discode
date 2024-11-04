import React, { useState, useEffect } from 'react';
import { getAllTopic } from '@/utils/topic/getAllTopic';
import { Topic } from '@/utils/types';

interface AddTopicToContentProps {
  onSelectTopic: (topic: Topic) => void;
  selectedTopics: string[]; // Tambahkan prop untuk topik yang sudah dipilih
}

const AddTopicToContent: React.FC<AddTopicToContentProps> = ({ onSelectTopic, selectedTopics }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsList = await getAllTopic();
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
