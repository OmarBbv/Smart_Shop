export function UserTable() {
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
                    <tr className="bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">John Doe</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">john@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Developer</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Active</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Jane Smith</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">jane@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Designer</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Inactive</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Bob Johnson</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">bob@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Manager</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Active</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Alice Brown</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">alice@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Developer</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">On Leave</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Charlie Wilson</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">charlie@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">QA Engineer</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Active</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
