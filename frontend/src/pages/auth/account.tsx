import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserProfile, updateUserProfile, signOut } from '../../services/auth.service';
import { getOrdersByEmail } from '../../services/order.service';
import { User, Mail, Phone, MapPin, Package, LogOut, Edit2, Save, X, Calendar, CheckCircle, Clock, Truck, Settings } from 'lucide-react';
import { type UserProfile } from '../../types/user-profile';
import { type Order } from '../../types/order';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
        province: ''
    });

    useEffect(() => {
        loadAccountData();
    }, []);

    const loadAccountData = async () => {
        setLoading(true);
        try {
            const currentUser = await getCurrentUser();
            if (!currentUser) {
                navigate('/login');
                return;
            }

            setUser(currentUser);

            const userProfile = await getUserProfile(currentUser.id);
            if (userProfile) {
                setProfile(userProfile);
                setEditData({
                    full_name: userProfile.full_name || '',
                    phone: userProfile.phone || '',
                    address: userProfile.address || '',
                    city: userProfile.city || '',
                    postal_code: userProfile.postal_code || '',
                    province: userProfile.province || ''
                });

                const userOrders = await getOrdersByEmail(currentUser.email || '');
                setOrders(userOrders);
            }
        } catch (error) {
            console.error('Error loading account data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        if (!user) return;

        try {
            const updated = await updateUserProfile(user.id, editData);
            if (updated) {
                setProfile(updated);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const getOrderStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'shipped': return <Truck className="w-4 h-4 text-blue-500" />;
            case 'processing': return <Clock className="w-4 h-4 text-yellow-500" />;
            default: return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-neutral-400">Loading account...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">My Account</span>
                    <h1 className="text-4xl md:text-6xl font-light mt-4 tracking-wide text-white">Welcome, {profile?.full_name || 'Guest'}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-neutral-900 border border-neutral-800 p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-light text-white">{profile?.full_name || 'User'}</h3>
                                    <p className="text-sm text-neutral-400">{user?.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="w-full flex items-center gap-3 text-neutral-300 hover:text-[#d4af37] py-3 px-4 hover:bg-neutral-800 transition-colors rounded"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="w-full flex items-center gap-3 text-neutral-300 hover:text-[#d4af37] py-3 px-4 hover:bg-neutral-800 transition-colors rounded"
                                >
                                    <Package className="w-4 h-4" />
                                    My Orders
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 text-neutral-300 hover:text-red-500 py-3 px-4 hover:bg-neutral-800 transition-colors rounded"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 p-6">
                            <h3 className="text-lg font-light mb-4 text-white">Account Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-neutral-400">Total Orders</span>
                                    <span className="text-white">{orders.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-400">Total Spent</span>
                                    <span className="text-[#d4af37]">
                                        R{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Section */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-light text-white">Profile Information</h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="bg-[#d4af37] hover:bg-white text-black px-4 py-2 text-sm tracking-widest uppercase transition-colors flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="border border-neutral-700 text-neutral-400 hover:text-white px-4 py-2 text-sm tracking-widest uppercase transition-colors flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-[#d4af37] hover:text-white text-sm tracking-widest uppercase flex items-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-neutral-400 text-sm">Full Name</label>
                                            <input
                                                value={editData.full_name}
                                                onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                                className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 text-sm">Phone</label>
                                            <input
                                                value={editData.phone}
                                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-neutral-400 text-sm">Address</label>
                                            <input
                                                value={editData.address}
                                                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                                className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 text-sm">City</label>
                                            <input
                                                value={editData.city}
                                                onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                                className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 text-sm">Postal Code</label>
                                            <input
                                                value={editData.postal_code}
                                                onChange={(e) => setEditData({ ...editData, postal_code: e.target.value })}
                                                className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 text-sm">Province</label>
                                            <select
                                                value={editData.province}
                                                onChange={(e) => setEditData({ ...editData, province: e.target.value })}
                                                className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                            >
                                                <option value="">Select Province</option>
                                                <option value="Gauteng">Gauteng</option>
                                                <option value="Western Cape">Western Cape</option>
                                                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                                <option value="Eastern Cape">Eastern Cape</option>
                                                <option value="Free State">Free State</option>
                                                <option value="Mpumalanga">Mpumalanga</option>
                                                <option value="Limpopo">Limpopo</option>
                                                <option value="North West">North West</option>
                                                <option value="Northern Cape">Northern Cape</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-[#d4af37]" />
                                            <div>
                                                <p className="text-sm text-neutral-400">Full Name</p>
                                                <p className="text-white">{profile?.full_name || 'Not set'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-[#d4af37]" />
                                            <div>
                                                <p className="text-sm text-neutral-400">Email</p>
                                                <p className="text-white">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-[#d4af37]" />
                                            <div>
                                                <p className="text-sm text-neutral-400">Phone</p>
                                                <p className="text-white">{profile?.phone || 'Not set'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-[#d4af37]" />
                                            <div>
                                                <p className="text-sm text-neutral-400">Address</p>
                                                <p className="text-white">
                                                    {profile?.address ? `${profile.address}, ${profile.city}` : 'Not set'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8">
                            <h2 className="text-2xl font-light mb-6 text-white">Recent Orders</h2>
                            {orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                                    <p className="text-neutral-400">No orders yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.slice(0, 5).map((order) => (
                                        <div key={order.id} className="border border-neutral-800 p-4 hover:border-neutral-700 transition-colors">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        {getOrderStatusIcon(order.order_status)}
                                                        <span className="text-sm text-neutral-400">Order #{order.order_number}</span>
                                                    </div>
                                                    <p className="text-lg font-light text-white">R{order.total.toLocaleString()}</p>
                                                    <p className="text-sm text-neutral-400">
                                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{new Date(order.created_at || '').toLocaleDateString()}</span>
                                                    </div>
                                                    <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${order.order_status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                                            order.order_status === 'shipped' ? 'bg-blue-500/20 text-blue-500' :
                                                                order.order_status === 'processing' ? 'bg-yellow-500/20 text-yellow-500' :
                                                                    'bg-neutral-700 text-neutral-300'
                                                        }`}>
                                                        {order.order_status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Account;