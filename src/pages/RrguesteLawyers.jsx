import React, { useEffect, useState } from "react";
import {
  ApproveLawyers,
  getInformationLawyers,
  rejectLawyer,
} from "../Service/Lawers/Lawyers";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
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
    document.getElementById("reject_modal").close();
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
      <h2 className="goldTxt text-2xl font-bold mb-4">Lawyers' requests</h2>

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
          placeholder="your Message"
          className="input w-full mb-4 "
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
              setSelectedLawyerId(null);
              setMessage("");
            }}
            className="border border-gray-500 text-gray-300 hover:text-white hover:bg-gray-500 font-medium rounded-lg text-sm px-4"
          >
            Cancel
          </button>
        </div>
      </CustomModal>

      {/* Modal صورة */}
      <CustomModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage("")}
        title="Image"
      >
        <img
          src={selectedImage}
          alt="IMG"
          className="w-full h-auto rounded-lg mb-4"
        />

        <div className="flex justify-center">
          <button
            onClick={() => setSelectedImage("")}
            className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Close
          </button>
        </div>
      </CustomModal>

      <table className="table w-full text-center rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md p-6 ">
        <thead className="goldTxt bgSecondary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>National ID</th>
            <th>Lawyer's card</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request, index) => (
            <tr key={request.id} className="hover:bg-[#1c202e]">
              <td className="goldTxt">{indexOfFirstRequest + index + 1}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.specializations || "—"}</td>
              <td>
                <img
                  src={request.idImageUrl}
                  alt="بطاقة"
                  className="w-12 h-12 rounded-lg object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(request.idImageUrl);
                    document.getElementById("image_modal").showModal();
                  }}
                />
              </td>
              <td>
                <img
                  src={request.barAssociationImageUrl}
                  alt="كارنيه"
                  className="w-12 h-12 rounded-lg object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(request.barAssociationImageUrl);
                    document.getElementById("image_modal").showModal();
                  }}
                />
              </td>
              <td className="flex flex-col items-center gap-2">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setSelectedLawyerId(request.id);
                      document.getElementById("reject_modal").showModal();
                    }}
                    type="button"
                    className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                    refuse
                  </button>
                  <button
                    onClick={() => handleApprove(request.id)}
                    type="button"
                    className="flex items-center gap-2 text-green-600 hover:text-white border border-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
                  >
                    <CheckCircleIcon className="w-6 h-6" />
                    accept
                  </button>
                </div>
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
