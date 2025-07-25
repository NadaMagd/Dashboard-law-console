import React from "react";

export default function CustomModal({ isOpen, onClose, title, children, width = "max-w-2xl" }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`modal-box w-full ${width} bg-[#1c202e] text-white`}>
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        <div>{children}</div>
       
      </div>
    </div>
  );
}
