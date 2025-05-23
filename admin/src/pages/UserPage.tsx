import { UserTable } from "@/components/user/UserTable";

export default function UserPage() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Team Members</h1>
      <UserTable />
    </div>
  )
}