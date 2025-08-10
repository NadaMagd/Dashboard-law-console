import React, { useEffect, useState } from "react";
import {
  ApproveLawyers,
  getInformationLawyers,
  rejectLawyer,
} from "../Service/Lawers/Lawyers";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Pagination from "./../Components/Pagetions";
import CustomModal from "../Components/Model";

export default function RequestLawyers() {
  const [requests, setRequests] = useState([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const allRequests = await getInformationLawyers();
      setRequests(allRequests.pending);
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    await ApproveLawyers(id);
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  const handleReject = async () => {
    if (!message.trim()) return alert("من فضلك اكتب سبب الرفض");

    await rejectLawyer(selectedLawyerId, message);
    setRequests((prev) =>
      prev.filter((request) => request.id !== selectedLawyerId)
    );
    setSelectedLawyerId(null);
    setMessage("");
  };

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl goldTxt font-bold mb-4">Lawyers' Requests</h2>

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
          placeholder="Reason of rejection"
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
        title="Lawyer Image"
      >
        <div className="relative">
          <img
            src={selectedImage}
            alt="Lawyer Document"
            className="w-full max-w-lg h-auto rounded-lg shadow-lg"
          />
          <button
            onClick={() => setSelectedImage("")}
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setSelectedImage("")}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </CustomModal>

      {/* جدول */}
      <div className="bg-gray-900/95 rounded-xl overflow-hidden shadow-xl border border-gray-700/30">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide"><div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c9b38c]/20 flex items-center justify-center text-xs">#</span>
                    ID
                  </div></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#c9b38c] uppercase tracking-wide">Specialization</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">National ID</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">Lawyer's Card</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {currentRequests.map((request, index) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-800/30 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{indexOfFirstRequest + index + 1}</td>
                  <td className="px-4 py-3">{request.name}</td>
                  <td className="px-4 py-3">{request.email}</td>
                  <td className="px-4 py-3">{request.specializations || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <img
                      src={request.idImageUrl}
                      alt="ID"
                      className="w-10 h-10 rounded-lg object-cover cursor-pointer border border-gray-600 hover:border-[#c9b38c] hover:scale-105 transition-all"
                      onClick={() => setSelectedImage(request.idImageUrl)}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <img
                      src={request.barAssociationImageUrl}
                      alt="Card"
                      className="w-10 h-10 rounded-lg object-cover cursor-pointer border border-gray-600 hover:border-[#c9b38c] hover:scale-105 transition-all"
                      onClick={() => setSelectedImage(request.barAssociationImageUrl)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedLawyerId(request.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-md hover:text-white hover:bg-red-500 hover:border-red-400 transition-colors"
                      >
                        <TrashIcon className="w-3 h-3" /> Refuse
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-md hover:text-white hover:bg-green-500 hover:border-green-400 transition-colors"
                      >
                        <CheckCircleIcon className="w-3 h-3" /> Accept
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
      />
    </div>
  );
}
