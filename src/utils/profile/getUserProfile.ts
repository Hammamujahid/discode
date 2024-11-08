import { auth, db } from '@/utils/firebase/config';
import { UserProfile } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, 'user', user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      console.log('No such document!');
      return null;
    }
  } else {
    console.log('No user is signed in.');
    return null;
  }
};
