import { doc, Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

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

export interface SidebarProps {
    children: ReactNode;
  }

  export interface Topic {
    id: string;
    name: string;
  }


  export interface UserProfile {
    username?: string;
    bio?: string;
    photo_profile?: string;
  }