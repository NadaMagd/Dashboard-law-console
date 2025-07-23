import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

//=====================GetAll lawyers num=================================

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
  const docRef = doc(db, "lawyers", lawyerId);//solve
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
export async function getInformationLawyers() {
  let pendingLawyersList = [];
  let ApproveLawyersList=[];

  try {
    const snapshot = await getDocs(collection(db, "lawyers"));

    snapshot.forEach((doc) => {
      const data = doc.data(); 

      if (data.isApproved === false) {
        pendingLawyersList.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          idImageUrl: data.idImageUrl,
          barAssociationImageUrl: data.barAssociationImageUrl,
          specializations: data.specializations,
          ...data, 
        });
      }
      else{
         ApproveLawyersList.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          idImageUrl: data.idImageUrl,
          barAssociationImageUrl: data.barAssociationImageUrl,
          specializations: data.specializations,
          ...data, 
        });
      }
    });

    return { pending:pendingLawyersList, approve:ApproveLawyersList};

  } catch (e) {
    console.error(e);
    return [];
  }
}
//==========================blockPending================
export async function rejectLawyer(id, message) {
  try {
    const pendingLawyer = doc(db, "lawyers", id);
    await updateDoc(pendingLawyer, {
      isApproved: false,
      messageToLawyer: message,
    });
    console.log("تم الرفض مع رسالة");
  } catch (e) {
    console.log(e);
  }
}

//=================delete===========================================
export async function deleteLawyer(id,message) {


try {
    const deletedLawyer = doc(db, "lawyers", id);
    await updateDoc(deletedLawyer, {
      isDelete:true,
      isApproved: false,
      messageToLawyer: message,
    });

  } catch (e) {
    console.log(e);
  }



}

