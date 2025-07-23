import React, { useEffect, useState } from 'react';
import {
  ApproveLawyers,
  getInformationLawyers,
  rejectLawyer,
} from '../Service/Lawers/Lawyers';

export default function RequestLawyers() {
  const [requests, setRequests] = useState([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const allRequests = await getInformationLawyers();
      setRequests(allRequests.pending);
    };
    fetchData();
  }, []);

const handleApprove = async (id) => {
  await ApproveLawyers(id);
  setRequests((prev) => prev.filter((post) => post.id !== id));
};


  const handleReject = async () => {
    if (!message.trim()) return alert('من فضلك اكتب سبب الرفض');

    await rejectLawyer(selectedLawyerId, message);
    setRequests((prev) => prev.filter((post) => post.id !== selectedLawyerId));
    setSelectedLawyerId(null);
    setMessage('');
    document.getElementById('reject_modal').close();
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4">طلبات المحامين</h2>

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
            <th>البطاقة</th>
            <th>الكارنيه</th>
            <th>التخصص</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((post, index) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="text-black">{index + 1}</td>
              <td className="text-black">{post.name}</td>
              <td className="text-black">{post.email}</td>

              {/* صورة البطاقة */}
              <td>
                <img
                  src={post.idImageUrl}
                  alt="بطاقة"
                  className="w-12 h-12 rounded-full object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(post.idImageUrl);
                    document.getElementById('image_modal').showModal();
                  }}
                />
              </td>

              {/*  صورة الكارنيه */}
              <td>
                <img
                  src={post.barAssociationImageUrl}
                  alt="كارنيه"
                  className="w-12 h-12 rounded-full object-cover cursor-pointer border hover:scale-110 transition-transform"
                  onClick={() => {
                    setSelectedImage(post.barAssociationImageUrl);
                    document.getElementById('image_modal').showModal();
                  }}
                />
              </td>

              <td className="text-black">{post.specializations || '—'}</td>

              {/* الإجراءات */}
              <td className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleApprove(post.id)}
                  className="btn btn-success btn-sm"
                >
                  قبول
                </button>
                <button
                  className="btn btn-error btn-sm text-white"
                  onClick={() => {
                    setSelectedLawyerId(post.id);
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
