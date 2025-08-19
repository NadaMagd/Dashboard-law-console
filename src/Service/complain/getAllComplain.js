
import { collection,  getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default async function getAllComplains() {
try{
     const querySnapshot = await getDocs(collection(db, "contact"));
     const complains = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
     return complains;

}catch (error) {
  console.error("Error fetching complains:", error);
  throw error;
}

}