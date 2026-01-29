import AdminNavbar from "../../components/navbar/admin-navbar";

const Products = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-light mb-6">Products</h1>
                <div className="flex justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="px-4 py-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                    />
                    <button className="bg-[#d4af37] hover:bg-white text-black px-6 py-2 rounded uppercase tracking-widest">
                        Add Product
                    </button>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded p-6 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-800">
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Price</th>
                                <th className="py-2 px-4">Stock</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-800">
                                <td className="py-2 px-4">1</td>
                                <td className="py-2 px-4">Luxury Wig</td>
                                <td className="py-2 px-4">R1200</td>
                                <td className="py-2 px-4">15</td>
                                <td className="py-2 px-4">
                                    <button className="text-[#d4af37] hover:text-white mr-2">Edit</button>
                                    <button className="text-red-500 hover:text-white">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
