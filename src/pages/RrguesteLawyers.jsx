import React, { useEffect, useState } from "react";
import {
  ApproveLawyers,
  getInformationLawyers,
  rejectLawyer,
} from "../Service/Lawers/Lawyers";
import { TrashIcon, CheckCircleIcon, UserIcon, EnvelopeIcon, AcademicCapIcon, IdentificationIcon, DocumentIcon, EyeIcon } from "@heroicons/react/24/outline";
import Pagination from "../components/Pagetions";
import CustomModal from "../components/Model";

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
    if (!message.trim()) return alert("Please write a reason for rejection");

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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Lawyers' Requests
        </h1>
        <p className="text-slate-400 text-lg">
          Review and manage pending lawyer applications
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 mx-auto">
            <UserIcon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{requests.length}</h3>
          <p className="text-slate-400">Total Requests</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl mb-4 mx-auto">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{requests.filter(r => r.specializations).length}</h3>
          <p className="text-slate-400">With Specializations</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 mx-auto">
            <DocumentIcon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{requests.filter(r => r.idImageUrl && r.barAssociationImageUrl).length}</h3>
          <p className="text-slate-400">Complete Documents</p>
        </div>
      </div>

      {/* Modal رفض */}
      <CustomModal
        isOpen={!!selectedLawyerId}
        onClose={() => {
          setSelectedLawyerId(null);
          setMessage("");
        }}
        title="Reject Lawyer"
      >
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Please provide a reason for rejecting this lawyer's application.
          </p>
          <input
            type="text"
            placeholder="Reason for rejection"
            className="input focus-ring"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setSelectedLawyerId(null);
                setMessage("");
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              className="btn btn-danger"
            >
              <TrashIcon className="w-4 h-4" />
              Confirm Rejection
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Modal صورة */}
      <CustomModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage("")}
        title="Document Preview"
      >
        <div className="space-y-4">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Lawyer Document"
              className="w-full max-w-lg h-auto rounded-xl shadow-2xl border border-slate-600"
            />
            <button
              onClick={() => setSelectedImage("")}
              className="absolute top-3 right-3 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
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

      {/* جدول */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Pending Applications</h3>
            <p className="card-subtitle">Review and manage lawyer requests</p>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <UserIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{requests.length} requests</span>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">#</span>
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
                  <div className="flex items-center gap-2 justify-center">
                    <IdentificationIcon className="w-4 h-4" />
                    National ID
                  </div>
                </th>
                <th className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <DocumentIcon className="w-4 h-4" />
                    Lawyer's Card
                  </div>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request, index) => (
                <tr key={request.id} className="hover:bg-slate-800/50 transition-colors duration-200">
                  <td className="font-mono text-slate-300">{indexOfFirstRequest + index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="font-medium text-white">{request.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300">{request.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-slate-300">{request.specializations || "—"}</span>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center">
                      <div className="relative group cursor-pointer">
                        <img
                          src={request.idImageUrl}
                          alt="ID"
                          className="w-12 h-12 rounded-lg object-cover border border-slate-600 hover:border-blue-400 hover:scale-105 transition-all duration-200"
                          onClick={() => setSelectedImage(request.idImageUrl)}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <EyeIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center">
                      <div className="relative group cursor-pointer">
                        <img
                          src={request.barAssociationImageUrl}
                          alt="Card"
                          className="w-12 h-12 rounded-lg object-cover border border-slate-600 hover:border-blue-400 hover:scale-105 transition-all duration-200"
                          onClick={() => setSelectedImage(request.barAssociationImageUrl)}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <EyeIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedLawyerId(request.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <TrashIcon className="w-3 h-3" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="btn btn-success btn-sm"
                      >
                        <CheckCircleIcon className="w-3 h-3" />
                        Accept
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
