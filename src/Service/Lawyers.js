import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";



//=====================GetAll lawyers=================================
export async function getLawyersNumbers() {
const snapshot=await getDocs(collection(db,"lawyers"));
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

  console.log("إجمالي المحامين:", snapshot.size);
  console.log("عدد المقبولين:", accepted);
  console.log("عدد المنتظرين:", pending);

}
//=======================ApproveLawyers=======================================
export async function ApproveLawyers(lawyerId) {
    const docRef=doc(collection(db,"lawyers",lawyerId));
    try{
        await updateDoc(docRef,{
            isApproved:true,
        });
        console.log("sucsess");
        
    }catch(error){
        console.log("error",error);
        

    }
}
//====================