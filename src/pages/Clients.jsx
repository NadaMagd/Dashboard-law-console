import React, { useEffect, useState } from 'react';
import { AllClients, deleteClient } from '../Service/Client/UserService';



export default function Clients() {
  const [Clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const allClients = await AllClients();
      setClients(allClients);
    };
    fetchData();
  }, []);




  const handleReject = async () => {
    if (!message.trim()) return alert('من فضلك اكتب سبب الرفض');

    await deleteClient(selectedClientId, message);
    setClients((prev) => prev.filter((client) => client.id !== selectedClientId));
    setSelectedClientId(null);
    setMessage('');
    document.getElementById('reject_modal').close();
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4"> Client</h2>

      {/* Modal رفض */}
      <dialog id="reject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-red-600">رفض المحامي</h3>
          <input
            type="text"
            placeholder="سبب الحذف"
            className="input input-bordered w-full mb-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="modal-action flex justify-end gap-2">
            <button
              className="btn btn-error text-white"
              onClick={handleReject}
            >
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
      <table className="table w-full text-center border border-gray-200">
        <thead className="bg-fran text-white">
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>الإيميل</th>
            <th>الصوره</th>
          </tr>
        </thead>
        <tbody>
          {Clients.map((client, index) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="text-black">{index + 1}</td>
              <td className="text-black">{client.name}</td>
              <td className="text-black">{client.email}</td>

              {/* صورة البطاقة */}
              <td>
                <img
                  src={client.imageUrl}
                  alt="بطاقة"
                  className="w-12 h-12 rounded-full object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(client.idImageUrl);
                    document.getElementById('image_modal').showModal();
                  }}
                />
              </td>

            
              {/* الإجراءات */}
              <td className="flex flex-col items-center gap-2">
               
                <button
                  className="btn btn-error btn-sm text-white"
                  onClick={() => {
                    setSelectedClientId(client.id);
                    document.getElementById('reject_modal').showModal();
                  }}
                >
                  رفض
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
