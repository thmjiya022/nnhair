import AdminNavbar from "../../components/navbar/admin-navbar";

const Reports = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-light mb-6">Reports</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded p-6">
                        <p className="text-gray-400">Monthly Revenue</p>
                        <p className="text-2xl mt-2">R45,000</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded p-6">
                        <p className="text-gray-400">Orders This Month</p>
                        <p className="text-2xl mt-2">120</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
