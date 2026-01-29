import AdminNavbar from "../../components/navbar/admin-navbar";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-light mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
                        <p className="text-gray-400">Total Orders</p>
                        <p className="text-2xl mt-2">120</p>
                    </div>
                    <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
                        <p className="text-gray-400">Total Revenue</p>
                        <p className="text-2xl mt-2">R 45,000</p>
                    </div>
                    <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
                        <p className="text-gray-400">Products in Stock</p>
                        <p className="text-2xl mt-2">38</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
