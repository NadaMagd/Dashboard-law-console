import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function TotalProfit() {
  try {
    const docRef = doc(db, "platform", "balance");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.log("error of getting total profit: " + e);
  }
}
