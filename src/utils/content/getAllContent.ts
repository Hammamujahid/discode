// utils/fetchContents.ts
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import { Content, ContentWithUsername } from "../types";

export const getAllContent = async (): Promise<ContentWithUsername[]> => {
  const contentCollection = collection(db, "content");
  const contentSnapshot = await getDocs(contentCollection);
  const contentList = await Promise.all(
    contentSnapshot.docs.map(async (doc) => {
      const data = doc.data() as Content;
      const userDoc = await getDoc(data.userId);
      const username = userDoc.exists() ? userDoc.data().username : "Unknown User";
      return {
        ...data,
        id: doc.id,
        username,
      };
    })
  );
  return contentList;
};
