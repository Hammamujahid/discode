import { collection, getDocs } from 'firebase/firestore';
import { Topic } from '../types'
import { db } from '../firebase/config';

export const getAllTopic = async (): Promise<Topic[]> => {
    const topicsCollection = collection(db, "topic");
    const topicsSnapshot = await getDocs(topicsCollection);
    const topicsList = topicsSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name, // Pastikan field 'name' ada di dokumen topic
    }));
    return topicsList;
}
