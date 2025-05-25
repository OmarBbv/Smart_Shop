import { UserType } from "@/types/usserTypes"

interface Props {
    allUser: UserType[]
}

export function UserTable({ allUser }: Props) {
    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {allUser &&
                        allUser.map((usr) => {
                            return <tr key={usr.id} className="bg-white">
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{usr.name}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{usr.email}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{usr.role == 1 && 'İstifadəçi'}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Active</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
