import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function SelectRole() {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      if (selectedRole === 'Admin') {
        navigate('/signup');
      } else if (selectedRole === 'Viewer') {
        navigate('/signupuser');
      } else {
        alert(`You have selected the ${selectedRole} role.`);
      }
    } else {
      alert('Please select a role.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-3/4 bg-gray-300 p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-8">Please select your <span className="text-blue-500">Role</span></h1>
        <div className="flex gap-8 mb-8">
          <div
            className={`p-6 border rounded-lg cursor-pointer ${selectedRole === 'Admin' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => handleRoleSelect('Admin')}
          >
            <div className={`w-24 h-24 mb-4 rounded-lg ${selectedRole === 'Admin' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <p className={`text-center ${selectedRole === 'Admin' ? 'text-blue-500' : 'text-gray-500'}`}>Admin</p>
          </div>
          <div
            className={`p-6 border rounded-lg cursor-pointer ${selectedRole === 'Viewer' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => handleRoleSelect('Viewer')}
          >
            <div className={`w-24 h-24 mb-4 rounded-lg ${selectedRole === 'Viewer' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <p className={`text-center ${selectedRole === 'Viewer' ? 'text-blue-500' : 'text-gray-500'}`}>Viewer</p>
          </div>
        </div>
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SelectRole;
