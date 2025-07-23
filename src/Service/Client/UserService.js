import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getClientsCount = async () => {
  const snapshot = await getDocs(collection(db, "clients"));
  return snapshot.size;
};

//****************************** get all client data and numbers ************************************/
export async function AllClients() {
  try {
    const clients = await getDocs(collection(db, "clients"));
    let clientsNumber = clients.size;
    let clientsData = [];

    clients.forEach((doc) => {
      clientsData.push({ id: doc.id, ...doc.data() });
    });

    return { clientsNumber: clientsNumber, clientsData: clientsData }; // problem
  } catch (e) {
    console.log(e);
    return { clientsNumber: 0, clientsData: [] };
  }
}
