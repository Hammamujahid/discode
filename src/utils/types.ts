import { doc, Timestamp } from "firebase/firestore";

export interface Content {
  id: string;
  text: string;
  createdAt: Timestamp;
  imageUrls: string[];
  userId: ReturnType<typeof doc>;
  topics: {
    topicId: ReturnType<typeof doc>;
    name: string;
    createdAt: Timestamp;
  }[];
}

export interface ContentWithUsername extends Omit<Content, 'userId'> {
  username: string;
}
