import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
export const getClientsCount = async () => {
  const snapshot = await getDocs(collection(db, "clients"));
  return snapshot.size;
};
