import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/admin';
import { formatDate } from '../../lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

export function UserApprovalTable() {
  // const { pendingUsers, approveUser, rejectUser } = useAdminStore();

  const [pendingUsers, setPendingUsers] = useState([]);

  const approveUser = async (userId) => {
    try {
      const res = await axios.post("http://localhost:9000/api/users/approve-user", {
        userId: userId
      })

      const data = res?.data;

      if (data?.success) {
        const filteredArray = pendingUsers.filter((user) => user._id !== userId);
        setPendingUsers(filteredArray);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const rejectUser = async (userId) => {
    try {
      const res = await axios.post("http://localhost:9000/api/users/reject-user", {
        userId: userId
      })

      const data = res?.data;

      if (data?.success) {
        const filteredArray = pendingUsers.filter((user) => user._id !== userId);
        setPendingUsers(filteredArray);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleApprove = (userId: string) => {
    if (confirm('Are you sure you want to approve this user?')) {
      approveUser(userId)
    }
  };

  const handleReject = (userId: string) => {
    if (confirm('Are you sure you want to reject this user?')) {
      rejectUser(userId);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/users/get-pending-users");
      const data = res?.data;

      if (data?.success) {
        setPendingUsers(data?.users)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Pending User Approvals
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 w-full">
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {formatDate(user.createdAt)} */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pendingUsers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No pending users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}