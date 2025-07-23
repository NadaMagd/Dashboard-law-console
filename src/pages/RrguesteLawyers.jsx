import React, { useEffect, useState } from "react";
import {
  ApproveLawyers,
  getInformationLawyers,
  rejectLawyer,
} from "../Service/Lawers/Lawyers";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function RequestLawyers() {
  const [requests, setRequests] = useState([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

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

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="goldTxt text-2xl font-bold mb-4">Lawyers' requests</h2>

      {/* Modal رفض */}
      <dialog id="reject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-red-600">رفض المحامي</h3>
          <input
            type="text"
            placeholder="سبب الرفض"
            className="input input-bordered w-full mb-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="modal-action flex justify-end gap-2">
            <button className="btn btn-error text-white" onClick={handleReject}>
              تأكيد الرفض
            </button>
            <form method="dialog">
              <button className="btn">إلغاء</button>
            </form>
          </div>
        </div>
      </dialog>

      {/*  Modal صورة */}
      <dialog id="image_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <img
            src={selectedImage}
            alt="المستند"
            className="w-full h-auto rounded-lg"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">إغلاق</button>
            </form>
          </div>
        </div>
      </dialog>

      {/*  جدول */}
      <table className="table w-full text-center rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md">
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
          {requests.map((request, index) => (
            <tr key={request.id} className="hover:bg-[#1c202e]">
              <td className="goldTxt">{index + 1}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.specializations || "—"}</td>

              {/* صورة البطاقة */}
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

              {/*  صورة الكارنيه */}
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

              {/* الإجراءات */}
              <td className="flex flex-col items-center gap-2">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setSelectedLawyerId(request.id);
                      document.getElementById("reject_modal").showModal();
                    }}
                    type="button"
                    className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                    refuse
                  </button>
                  <button
                    onClick={() => handleApprove(request.id)}
                    type="button"
                    className="flex items-center gap-2 text-green-600 hover:text-white border border-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
                  >
                    <CheckCircleIcon className="w-6 h-6 " />
                    accept
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
