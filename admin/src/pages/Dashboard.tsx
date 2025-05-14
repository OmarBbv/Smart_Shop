import Card from "@/components/Card"
import type React from "react"

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Total Users", value: "1,284", change: "+12%", color: "bg-blue-500" },
    { title: "Total Products", value: "3,567", change: "+5%", color: "bg-green-500" },
    { title: "Categories", value: "42", change: "+2%", color: "bg-purple-500" },
    { title: "Revenue", value: "$12,345", change: "+8%", color: "bg-yellow-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="p-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">{stat.title}</h2>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                    <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">User {item} performed an action</p>
                    <p className="text-xs text-gray-500">{item} hour(s) ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Popular Products</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Product {item}</p>
                    <p className="text-xs text-gray-500">{100 - item * 10} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
