import React, { useEffect, useState } from "react";
import { deleteLawyer, getInformationLawyers } from "../Service/Lawers/Lawyers";
import { TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "./../Components/Pagetions";
import CustomModal from "../Components/Model";

export default function Lawyers() {
  const [requests, setRequests] = useState([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = requests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const allRequests = await getInformationLawyers();
      setRequests(allRequests.approve);
    };
    fetchData();
  }, []);

  const handleReject = async () => {
    if (!message.trim()) return alert("من فضلك اكتب سبب الرفض");

    await deleteLawyer(selectedLawyerId, message);
    setRequests((prev) => prev.filter((post) => post.id !== selectedLawyerId));
    setSelectedLawyerId(null);
    setMessage("");
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl goldTxt font-bold mb-4">Lawyers</h2>

      {/* Modal رفض */}
      <CustomModal
        isOpen={!!selectedLawyerId}
        onClose={() => {
          setSelectedLawyerId(null);
          setMessage("");
        }}
        title="Refuse Lawyer"
      >
        <input
          type="text"
          placeholder="Reason of rejected"
          className="input input-bordered w-full mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleReject}
            className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Confirmation refuse
          </button>

          <button
            onClick={() => {
              setSelectedLawyerId(null);
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
        title="Lawyer Document"
      >
        <img
          src={selectedImage}
          alt="المستند"
          className="w-full max-w-lg h-auto rounded-lg mb-4"
        />
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedImage("")}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </CustomModal>

      {/* جدول المحامين بتصميم العملاء + النقط */}
      <div className="bg-gray-900/95 rounded-xl overflow-hidden shadow-xl border border-gray-700/30">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3  text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c9b38c]/20 flex items-center justify-center text-xs">#</span>
                    ID
                  </div>
                </th>
                <th className="px-4 py-3  text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c9b38c]"></span>
                    Name
                  </div>
                </th>
                <th className="px-4 py-3  text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c9b38c]"></span>
                    Email
                  </div>
                </th>
                <th className="px-4 py-3  text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c9b38c]"></span>
                    Specialization
                  </div>
                </th>
                <th className="px-4 py-3  text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c9b38c]"></span>
                    National ID
                  </div>
                </th>
                <th className="px-4 py-3  text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c9b38c]"></span>
                    Lawyer's Card
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c9b38c]"></span>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {currentData.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                  <td className="px-4 py-3 text-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6   text-white text-xs font-bold">
                        {indexOfFirst + index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span>{post.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <span>{post.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                      <span>{post.specializations || "—"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 flex justify-center items-center ">
                    <img
                      src={post.idImageUrl}
                      alt="بطاقة"
                      className="w-10 h-10 rounded-lg object-cover cursor-pointer border border-gray-600 hover:border-[#c9b38c] hover:scale-105 transition-all duration-200"
                      onClick={() => setSelectedImage(post.idImageUrl)}
                    />
                  </td>
                  <td className="px-4 py-3 ">
                    <img
                      src={post.barAssociationImageUrl}
                      alt="كارنيه"
                      className="w-10 h-10 rounded-lg object-cover cursor-pointer border border-gray-600 hover:border-[#c9b38c] hover:scale-105 transition-all duration-200 flex justify-center items-center"
                      onClick={() => setSelectedImage(post.barAssociationImageUrl)}
                    />
                  </td>
                  <td className="px-4 py-3 text-center ">
                    <button
                      onClick={() => setSelectedLawyerId(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-md hover:text-white hover:bg-red-500 hover:border-red-400 transition-colors duration-200"
                    >
                      <TrashIcon className="w-3 h-3" />
                      Refuse
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination مع تغيير عدد الصفوف */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        rowsPerPage={itemsPerPage}
        onRowsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
