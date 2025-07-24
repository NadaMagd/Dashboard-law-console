import React, { useEffect, useState } from "react";
import { deleteLawyer, getInformationLawyers } from "../Service/Lawers/Lawyers";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Lawyers() {
  const [requests, setRequests] = useState([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

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
      <dialog id="reject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-red-600">
            {" "}
            lawyer refused{" "}
          </h3>
          <input
            type="text"
            placeholder="Reason for rejection"
            className="input input-bordered w-full mb-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="modal-action flex justify-end gap-2">
            <button
              onClick={handleReject}
              className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <TrashIcon className="w-5 h-5" />
              Confirm rejection{" "}
            </button>
            <form method="dialog">
              <button className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                Cancel
              </button>
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
              <button className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                Cancel
              </button>{" "}
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
          {requests.map((post, index) => (
            <tr key={post.id} className="hover:bg-[#1c202e]">
              <td className="goldTxt">{index + 1}</td>
              <td>{post.name}</td>
              <td>{post.email}</td>
              <td>{post.specializations || "—"}</td>

              {/* صورة البطاقة */}
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

              {/*  صورة الكارنيه */}
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

              {/* الإجراءات */}
              <td className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedLawyerId(post.id);
                    document.getElementById("reject_modal").showModal();
                  }}
                  type="button"
                  className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <TrashIcon className="w-5 h-5" />
                  refuse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
