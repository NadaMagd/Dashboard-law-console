import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function fetchConsultations() {
  let pendingStatus = 0;
  let acceptsStatus = 0;

  try {
    const querySnapshot = await getDocs(collection(db, "consultations"));

    querySnapshot.forEach((doc) => {
      let data = doc.data();

      if (data.status === "pending") {
        pendingStatus++;
      } else {
        acceptsStatus++;
      }
      // console.log(doc.data());
    });
    return { pendingStatus: pendingStatus, acceptsStatus: acceptsStatus };
  } catch (e) {
    console.error("Error getting consultations:", e);
    return { pendingStatus: 0, acceptsStatus: 0 };
  }
}
