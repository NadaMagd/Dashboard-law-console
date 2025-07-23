import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getClientsCount = async () => {
  const snapshot = await getDocs(collection(db, "clients"));
  return snapshot.size;
};

//****************************** get all client data and numbers ************************************/
// export async function AllClients() {
//   try {
//     const clients = await getDocs(collection(db, "clients"));
//     let clientsData = [];
//     clients.forEach((doc) => {
//       clientsData.push({ id: doc.id, ...doc.data() });
//     });

//     return  clientsData
//   } catch (e) {
//     console.log(e);
//     return  [] ;
//   }
// }

export const AllClients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    const clients = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(clients);
    return clients;
  } catch (error) {
    console.error("error fetch lawers: ", error);
  }
};
//=================delete===========================================
export async function deleteClient(id, message) {
  try {
    const deletedClient = doc(db, "clients", id);
    await updateDoc(deletedClient, {
      isDelete: true,
      messageToClient: message,
    });
  } catch (e) {
    console.log(e);
  }
}
