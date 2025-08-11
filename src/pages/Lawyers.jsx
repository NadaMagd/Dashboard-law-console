import React, { useEffect, useState } from "react";
import { deleteLawyer, getInformationLawyers } from "../Service/Lawers/Lawyers";
import {
  TrashIcon,
  EyeIcon,
  UserIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  IdentificationIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../components/Pagetions";
import CustomModal from "../components/Model";

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
    if (!message.trim()) return alert("Please write a reason for rejection");

    await deleteLawyer(selectedLawyerId, message);
    setRequests((prev) => prev.filter((post) => post.id !== selectedLawyerId));
    setSelectedLawyerId(null);
    setMessage("");
  };

  return (
    <div className="space-y-8 p-6 fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
          Lawyers Management
        </h1>
        <p className="text-slate-400 text-lg">
          Manage and monitor approved lawyers in the system
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {requests.length}
          </h3>
          <p className="text-slate-400">Total Lawyers</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {requests.filter((lawyer) => lawyer.specializations).length}
          </h3>
          <p className="text-slate-400">With Specializations</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <DocumentIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {requests.filter((lawyer) => lawyer.barAssociationImageUrl).length}
          </h3>
          <p className="text-slate-400">Verified Documents</p>
        </div>
      </div>

      {/* Rejection Modal */}
      <CustomModal
        isOpen={!!selectedLawyerId}
        onClose={() => {
          setSelectedLawyerId(null);
          setMessage("");
        }}
        title="Reject Lawyer"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Please provide a reason for rejecting this lawyer:
          </p>
          <input
            type="text"
            placeholder="Reason for rejection"
            className="input focus-ring"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setSelectedLawyerId(null);
                setMessage("");
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button onClick={handleReject} className="btn btn-danger">
              Confirm Rejection
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Image Preview Modal */}
      <CustomModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage("")}
        title="Document Preview"
      >
        <div className="space-y-4">
          <img
            src={selectedImage}
            alt="Document"
            className="w-full max-w-lg h-auto rounded-lg border border-slate-600"
          />
          <div className="flex justify-center">
            <button
              onClick={() => setSelectedImage("")}
              className="btn btn-outline"
            >
              Close
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Lawyers Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Approved Lawyers</h3>
            <p className="card-subtitle">
              Manage lawyer accounts and documents
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
            <UserIcon className="text-green-400 text-xl" />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
                      #
                    </span>
                    ID
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Name
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    <EnvelopeIcon className="w-4 h-4" />
                    Email
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    <AcademicCapIcon className="w-4 h-4" />
                    Specialization
                  </div>
                </th>
                <th className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <IdentificationIcon className="w-4 h-4" />
                    National ID
                  </div>
                </th>
                <th className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <DocumentIcon className="w-4 h-4" />
                    Lawyer's Card
                  </div>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((post, index) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-700/30 transition-colors duration-200"
                >
                  <td className="text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-600 rounded-full text-white text-sm font-bold">
                      {indexOfFirst + index + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">{post.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300">{post.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300">
                        {post.specializations || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedImage(post.idImageUrl)}
                      className="group relative"
                    >
                      <img
                        src={post.idImageUrl}
                        alt="National ID"
                        className="w-12 h-12 rounded-lg object-cover border-2 border-slate-600 group-hover:border-green-400 transition-all duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <EyeIcon className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        setSelectedImage(post.barAssociationImageUrl)
                      }
                      className="group relative"
                    >
                      <img
                        src={post.barAssociationImageUrl}
                        alt="Lawyer's Card"
                        className="w-12 h-12 rounded-lg object-cover border-2 border-slate-600 group-hover:border-green-400 transition-all duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <EyeIcon className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedLawyerId(post.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
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
    </div>
  );
}
