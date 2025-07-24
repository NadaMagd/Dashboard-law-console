import React, { useEffect, useState } from "react";
import { AllClients, deleteClient } from "../Service/Client/UserService";
import { TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "./../Components/Pagetions";
import CustomModal from './../Components/Model';

export default function Clients() {
  const [Clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const allClients = await AllClients();
      setClients(allClients);
    };
    fetchData();
  }, []);

  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = Clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(Clients.length / itemsPerPage);

  const handleReject = async () => {
    if (!message.trim()) return alert("من فضلك اكتب سبب الرفض");

    await deleteClient(selectedClientId, message);
    setClients((prev) =>
      prev.filter((client) => client.id !== selectedClientId)
    );
    setSelectedClientId(null);
    setMessage("");
    document.getElementById("reject_modal").close();
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>

      {/* Modal رفض */}
 <CustomModal
  isOpen={!!selectedClientId}
  onClose={() => {
    setSelectedClientId(null); 
    setMessage("");
  }}
  title="Client block"
>
  <input
    type="text"
    placeholder="YourMessage"
    className="input input-bordered w-full mb-4 text-black"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

  <div className="flex justify-center gap-4 mt-4">
    <button
      onClick={handleReject}
      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
    >
      Confirmation refuse
    </button>

    <button
      onClick={() => {
        setSelectedClientId(null); 
        setMessage("");
      }}
      className="border border-gray-500 text-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2"
    >
      Cancel
    </button>
  </div>
</CustomModal>




      {/* Modal صورة */}
     <CustomModal
           isOpen={!!selectedImage}
           onClose={() => setSelectedImage("")}
           title="صورة المستند"
         >
           <img
             src={selectedImage}
             alt="المستند"
             className="w-full h-auto rounded-lg mb-4"
           />
         
           <div className="flex justify-center">
             <button
               onClick={() => setSelectedImage("")}
               className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
             >
               إغلاق
             </button>
           </div>
         </CustomModal>
    

      {/* جدول العملاء */}
      <table className="table w-full text-center rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md">
        <thead className="goldTxt bgSecondary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client, index) => (
            <tr key={client.id} className="hover:bg-[#1c202e]">
              <td>{indexOfFirstClient + index + 1}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <div className="flex justify-center">
                  <img
                    src={client.imageUrl}
                    alt="صورة العميل"
                    className="w-12 h-12 rounded-lg object-cover cursor-pointer border hover:scale-110 transition-transform"
                    onClick={() => {
                      setSelectedImage(client.imageUrl);
                      document.getElementById("image_modal").showModal();
                    }}
                  />
                </div>
              </td>

              <td className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedClientId(client.id);
                    document.getElementById("reject_modal").showModal();
                  }}
                  type="button"
                  className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <TrashIcon className="w-5 h-5" />
                  refuse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
