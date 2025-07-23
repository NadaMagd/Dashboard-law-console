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
export async function getInformationPendingLawyers() {
  let pendingLawyersList = [];

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
    });

    return pendingLawyersList;

  } catch (e) {
    console.error(e);
    return [];
  }
}
//==========================blockPending================
export async function rejectLawyer(id) {
  try {
     const pendingLawyer= doc(collection(db,"lawyers",id));
     await updateDoc(pendingLawyer,{
       isApproved: false,
        messageToLawyer: message,
     })
     console.log("توب التوب");
     
    }catch(e){
        console.log(e);
        
      }
}
//==============================getAcceptedLawyers==================
export async function getAcceptedLawyers() {
  let acceptedLawyers=[];
  try{
     const snapshot = await getDocs(collection(db, "lawyers"));

    snapshot.forEach((doc) => {
      const data = doc.data(); 

      if (data.isApproved === true) {
        acceptedLawyers.push({
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

    return acceptedLawyers;

  }catch(e){
    console.log("Error",e);
    
  }
  
}
//=================delete===========================================
export async function deleteLawyer(id) {
  try {
    await deleteDoc(doc(db, "lawyers", id));
    console.log(" deleted successfully");
  } catch (error) {
    console.error("Error deleting :", error);
  }
}