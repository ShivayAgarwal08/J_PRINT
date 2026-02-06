import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getApiUrl } from '../config';
import {
    LayoutGrid,
    Plus,
    Search,
    Package,
    Trash2,
    Edit2,
    Save,
    X,
    LogOut,
    TrendingUp,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', stock: '', category: '' });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await fetch(getApiUrl('api/inventory'));
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(getApiUrl('api/inventory'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                const added = await res.json();
                setItems([added, ...items]);
                setShowAddModal(false);
                setNewItem({ name: '', price: '', stock: '', category: '' });
            }
        } catch (error) {
            console.error("Failed to add item", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await fetch(getApiUrl(`api/inventory/${id}`), { method: 'DELETE' });
            setItems(items.filter(i => i.id !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditForm({ ...item });
    };

    const saveEdit = async () => {
        try {
            const res = await fetch(getApiUrl(`api/inventory/${editingId}`), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            if (res.ok) {
                const updated = await res.json();
                setItems(items.map(i => i.id === editingId ? updated : i));
                setEditingId(null);
            }
        } catch (error) {
            console.error("Failed to update", error);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(239,68,68,0.4)]">A</div>
                    <div className="leading-tight">
                        <h1 className="font-grotesk font-bold text-lg tracking-tight">System Admin</h1>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Inventory Control</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    >
                        <Plus size={16} /> Add Product
                    </button>
                    <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="pt-32 px-8 max-w-7xl mx-auto pb-20">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#12121A] border border-white/5 p-6 rounded-2xl flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-blue-400">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Total Products</p>
                            <p className="text-2xl font-bold">{items.length}</p>
                        </div>
                    </div>
                    <div className="bg-[#12121A] border border-white/5 p-6 rounded-2xl flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-red-400">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Low Stock</p>
                            <p className="text-2xl font-bold">{items.filter(i => i.stock < 5).length}</p>
                        </div>
                    </div>
                    <div className="bg-[#12121A] border border-white/5 p-6 rounded-2xl flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-green-400">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Active Status</p>
                            <p className="text-2xl font-bold">{items.filter(i => i.status === 'active').length}</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h2 className="font-bold text-lg">Inventory Database</h2>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                            <input type="text" placeholder="Search ID..." className="bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-white/40 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="p-6">Product</th>
                                    <th className="p-6">Category</th>
                                    <th className="p-6">Price</th>
                                    <th className="p-6">Stock</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {items.map(item => (
                                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            {editingId === item.id ? (
                                                <input
                                                    className="bg-black border border-white/20 rounded px-2 py-1 w-full text-sm"
                                                    value={editForm.name}
                                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                />
                                            ) : (
                                                <span className="font-bold">{item.name}</span>
                                            )}
                                        </td>
                                        <td className="p-6 text-sm text-white/60">
                                            {editingId === item.id ? (
                                                <input
                                                    className="bg-black border border-white/20 rounded px-2 py-1 w-full text-sm"
                                                    value={editForm.category}
                                                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                                />
                                            ) : item.category}
                                        </td>
                                        <td className="p-6 text-sm font-mono">
                                            {editingId === item.id ? (
                                                <input
                                                    type="number"
                                                    className="bg-black border border-white/20 rounded px-2 py-1 w-20 text-sm"
                                                    value={editForm.price}
                                                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                                />
                                            ) : `₹${item.price}`}
                                        </td>
                                        <td className="p-6">
                                            {editingId === item.id ? (
                                                <input
                                                    type="number"
                                                    className="bg-black border border-white/20 rounded px-2 py-1 w-20 text-sm"
                                                    value={editForm.stock}
                                                    onChange={e => setEditForm({ ...editForm, stock: e.target.value })}
                                                />
                                            ) : (
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.stock < 5 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                    {item.stock} UNITS
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            {editingId === item.id ? (
                                                <select
                                                    className="bg-black border border-white/20 rounded px-2 py-1 text-sm"
                                                    value={editForm.status}
                                                    onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            ) : (
                                                <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-500'}`} />
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            {editingId === item.id ? (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={saveEdit} className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"><Save size={16} /></button>
                                                    <button onClick={() => setEditingId(null)} className="p-2 bg-white/5 text-white/40 rounded-lg hover:bg-white/10"><X size={16} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => startEdit(item)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {items.length === 0 && !loading && (
                        <div className="p-12 text-center text-white/20 text-sm font-medium">No inventory items found. Add one to start.</div>
                    )}
                </div>
            </main>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowAddModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#12121A] border border-white/10 rounded-3xl p-8 w-full max-w-lg relative z-10 shadow-2xl"
                        >
                            <h2 className="text-xl font-bold mb-6">Add New Product</h2>
                            <form onSubmit={handleAddItem} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Item Name</label>
                                    <input required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none"
                                        value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="e.g. Lab Manual" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Price (₹)</label>
                                        <input required type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none"
                                            value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Stock</label>
                                        <input required type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none"
                                            value={newItem.stock} onChange={e => setNewItem({ ...newItem, stock: e.target.value })} placeholder="100" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Category</label>
                                    <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none"
                                        value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} placeholder="Stationery, Hardware..." />
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
                                    <button type="submit" className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">Create Product</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
