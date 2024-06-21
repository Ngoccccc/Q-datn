// ProfileDialog.js

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

const ProfileDialog = ({ setOpen }) => {
  const { authUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email);
      setAvatar(authUser.avatar);
      setUsername(authUser.username);
    }
  }, [authUser]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = () => {
    // Thực hiện lưu thông tin sau khi chỉnh sửa
    // Ví dụ: có thể gọi API để lưu dữ liệu, bao gồm cả avatarFile, email, username, password
    console.log("Saved:", {
      email,
      avatarFile,
      username,
      currentPassword,
      newPassword,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Trang cá nhân</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 ml-auto hover:cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          {/* <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button> */}
        </div>
        <div className="flex items-center mb-4">
          <div className="relative">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-16 h-16 opacity-0 cursor-pointer"
                onChange={handleAvatarChange}
              />
            )}
          </div>
          <div>
            <p className="font-bold">{username}</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Hủy" : "Sửa"}
        </button>
        {isEditing && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu hiện tại:
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu mới:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Lưu
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDialog;
