import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30"
      >
        <FaArrowLeft className="text-gray-700" size={18} />
      </button>
      {title && <span className="text-gray-800 font-medium">{title}</span>}
    </div>
  );
};

export default BackHeader;
