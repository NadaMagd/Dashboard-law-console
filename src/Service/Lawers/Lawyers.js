import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

//=====================GetAll lawyers=================================

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";


export async function getLawyersNumbers() {
  try {
    const snapshot = await getDocs(collection(db, "lawyers"));
    let accepted = 0;
    let pending = 0;


    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.isApprove === true) {
        accepted++;
      } else {
        pending++;
      }
    });

    return {
      total: snapshot.size,
      accepted,
      pending,
    };
  } catch (error) {
    console.error("حدث خطأ أثناء جلب أرقام المحامين:", error);
    return {
      total: 0,
      accepted: 0,
      pending: 0,
    };
  }

}

//=======================ApproveLawyers=======================================
export async function ApproveLawyers(lawyerId) {
  const docRef = doc(collection(db, "lawyers", lawyerId));
  try {
    await updateDoc(docRef, {
      isApproved: true,
    });
    console.log("success");
  } catch (error) {
    console.log("error", error);
  }
}
//====================getInformationToPendingLawyers============
