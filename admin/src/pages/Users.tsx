import Button from "@/components/Button"
import Card from "@/components/Card"
import Modal from "@/components/Modal"
import type React from "react"
import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
  avatar: string
}

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock data for users
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2023-05-15 10:30",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "active",
      lastLogin: "2023-05-14 15:45",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Viewer",
      status: "inactive",
      lastLogin: "2023-05-10 09:15",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Editor",
      status: "active",
      lastLogin: "2023-05-13 11:20",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Viewer",
      status: "active",
      lastLogin: "2023-05-12 14:10",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ]

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        <Button variant="primary">Add User</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Login
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar || "/placeholder.svg"} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="secondary" size="sm" onClick={() => handleViewUser(user)} className="mr-2">
                      View
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="User Details">
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={selectedUser.avatar || "/placeholder.svg"}
                alt={selectedUser.name}
                className="h-16 w-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                <p className="text-gray-500">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${selectedUser.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {selectedUser.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="font-medium">{selectedUser.lastLogin}</p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Permissions</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.role === "Admin"}
                    readOnly
                    className="h-4 w-4 text-purple-600 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">View Dashboard</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.role === "Admin" || selectedUser.role === "Editor"}
                    readOnly
                    className="h-4 w-4 text-purple-600 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Manage Products</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.role === "Admin"}
                    readOnly
                    className="h-4 w-4 text-purple-600 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Manage Users</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.role === "Admin" || selectedUser.role === "Editor"}
                    readOnly
                    className="h-4 w-4 text-purple-600 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Manage Categories</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Users
