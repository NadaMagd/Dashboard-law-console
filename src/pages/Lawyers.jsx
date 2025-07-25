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
  const itemsPerPage = 5;

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
    document.getElementById("reject_modal").close();
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4 goldTxt"> Lawyers</h2>

      {/* Modal رفض */}
      <CustomModal
        isOpen={!!selectedLawyerId}
        onClose={() => {
          setSelectedLawyerId(null);
          setMessage("");
        }}
        title="Refuse Lawyer "
      >
        <input
          type="text"
          placeholder=" Reason of rejected"
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
              setSelectedLawyerId(null);
              setMessage("");
            }}
            className="border border-gray-500 text-gray-300 hover:text-white hover:bg-gray-500 font-medium rounded-lg text-sm px-4 "
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
            className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Close
          </button>
        </div>
      </CustomModal>

      {/* جدول */}
      <table className="table w-full text-center  rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md">
        <thead className="goldTxt bgSecondary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>National ID</th>
            <th>Lawyer's Card</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((post, index) => (
            <tr key={post.id} className="hover:bg-[#1c202e]">
              <td className="goldTxt">{indexOfFirst + index + 1}</td>
              <td>{post.name}</td>
              <td>{post.email}</td>
              <td>{post.specializations || "—"}</td>
              <td>
                <img
                  src={post.idImageUrl}
                  alt="بطاقة"
                  className="w-12 h-12 rounded-lg object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(post.idImageUrl);
                    document.getElementById("image_modal").showModal();
                  }}
                />
              </td>
              <td>
                <img
                  src={post.barAssociationImageUrl}
                  alt="كارنيه"
                  className="w-12 h-12 rounded-lg object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(post.barAssociationImageUrl);
                    document.getElementById("image_modal").showModal();
                  }}
                />
              </td>
              <td className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedLawyerId(post.id);
                    document.getElementById("reject_modal").showModal();
                  }}
                  type="button"
                  className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <TrashIcon className="w-5 h-5" />
                  Refuse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
