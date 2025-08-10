import React, { useEffect, useState } from "react";
import { AllClients, deleteClient } from "../Service/Client/UserService";
import { TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "./../Components/Pagetions";
import CustomModal from "./../Components/Model";

export default function Clients() {
  const [Clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl goldTxt font-bold mb-4">Clients</h2>

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
          placeholder="Reason of rejected"
          className="input input-bordered w-full mb-4 "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleReject}
            className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Confirmation refuse
          </button>

          <button
            onClick={() => {
              setSelectedClientId(null);
              setMessage("");
            }}
            className="border border-gray-500 text-gray-300 hover:text-white hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </CustomModal>

      {/* Modal صورة */}
      <CustomModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage("")}
        title="Client Image"
      >
        <div className="relative">
          <img
            src={selectedImage}
            alt="صورة العميل"
            className="w-full max-w-lg h-auto rounded-lg shadow-lg"
          />
          
          {/* زر الإغلاق في الزاوية */}
          <button
            onClick={() => setSelectedImage("")}
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setSelectedImage("")}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </CustomModal>

      {/* جدول العملاء */}
      <div className="bg-gray-900/95 rounded-xl overflow-hidden shadow-xl border border-gray-700/30">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c9b38c]/20 flex items-center justify-center text-xs">#</span>
                    ID
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    
                    Name
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    
                    Email
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    
                    Image
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {currentClients.map((client, index) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-gray-800/30 transition-colors duration-200"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full  text-white text-xs font-bold">
                        {indexOfFirstClient + index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-gray-200 font-medium text-sm">
                        {client.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <span className="text-gray-300 text-sm">
                        {client.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <img
                        src={client.imageUrl}
                        alt="صورة العميل"
                        className="w-10 h-10 rounded-lg object-cover cursor-pointer border border-gray-600 hover:border-[#c9b38c] hover:scale-105 transition-all duration-200"
                        onClick={() => {
                          setSelectedImage(client.imageUrl);
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedClientId(client.id);
                        }}
                        type="button"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-md hover:text-white hover:bg-red-500 hover:border-red-400 transition-colors duration-200"
                      >
                        <TrashIcon className="w-3 h-3" />
                        Refuse
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        rowsPerPage={itemsPerPage}
        onRowsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1); // Reset to first page when changing items per page
        }}
      />
    </div>
  );
}
