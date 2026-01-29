import AdminNavbar from "../../components/navbar/admin-navbar";

const Orders = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-light mb-6">Orders</h1>
                <div className="bg-neutral-900 border border-neutral-800 rounded p-6 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-800">
                                <th className="py-2 px-4">Order ID</th>
                                <th className="py-2 px-4">Customer</th>
                                <th className="py-2 px-4">Total</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-800">
                                <td className="py-2 px-4">1001</td>
                                <td className="py-2 px-4">Nontando</td>
                                <td className="py-2 px-4">R1200</td>
                                <td className="py-2 px-4">Processing</td>
                                <td className="py-2 px-4">29 Jan 2026</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
