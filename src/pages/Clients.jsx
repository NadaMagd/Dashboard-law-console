import React, { useEffect, useState } from "react";
import { AllClients, deleteClient } from "../Service/Client/UserService";
import {
  TrashIcon,
  EyeIcon,
  UserIcon,
  EnvelopeIcon,
  PhotoIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../components/Pagetions";
import CustomModal from "../components/Model";

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
    if (!message.trim()) return alert("Please write a reason for blocking");

    await deleteClient(selectedClientId, message);
    setClients((prev) =>
      prev.filter((client) => client.id !== selectedClientId)
    );
    setSelectedClientId(null);
    setMessage("");
  };

  return (
    <div className="space-y-6 p-6 fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Clients Management
        </h1>
        <p className="text-slate-400 text-lg">
          Manage and monitor client accounts in the system
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {Clients.length}
          </h3>
          <p className="text-slate-400">Total Clients</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PhotoIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {Clients.filter((client) => client.imageUrl).length}
          </h3>
          <p className="text-slate-400">With Profile Images</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {Clients.filter((client) => client.name).length}
          </h3>
          <p className="text-slate-400">Named Clients</p>
        </div>
      </div>

      {/* Block Client Modal */}
      <CustomModal
        isOpen={!!selectedClientId}
        onClose={() => {
          setSelectedClientId(null);
          setMessage("");
        }}
        title="Block Client"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Please provide a reason for blocking this client:
          </p>
          <input
            type="text"
            placeholder="Reason for blocking"
            className="input focus-ring"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setSelectedClientId(null);
                setMessage("");
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button onClick={handleReject} className="btn btn-danger">
              Confirm Block
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Image Preview Modal */}
      <CustomModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage("")}
        title="Client Profile Image"
      >
        <div className="space-y-4">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Client Profile"
              className="w-full max-w-lg h-auto rounded-lg border border-slate-600 m-auto"
            />
            <button
              onClick={() => setSelectedImage("")}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
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

      {/* Clients Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Client Accounts</h3>
            <p className="card-subtitle">Manage client profiles and access</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
            <UsersIcon className="text-purple-400 text-xl" />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center gap-2">
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
                <th className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <PhotoIcon className="w-4 h-4" />
                    Profile Image
                  </div>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client, index) => (
                <tr
                  key={client.id}
                  className="hover:bg-slate-700/30 transition-colors duration-200"
                >
                  <td>
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-600 rounded-full text-white text-sm font-bold">
                      {indexOfFirstClient + index + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-white">
                        {client.name || "Unnamed Client"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300">{client.email}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedImage(client.imageUrl)}
                      className="group relative"
                    >
                      <img
                        src={client.imageUrl}
                        alt="Client Profile"
                        className="w-12 h-12 rounded-lg object-cover border-2 border-slate-600 group-hover:border-purple-400 transition-all duration-200 group-hover:scale-105 "
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <EyeIcon className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedClientId(client.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Block
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
