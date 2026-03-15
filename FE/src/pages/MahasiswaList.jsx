import { useEffect, useState } from "react";
import api from "../services/api";
import MahasiswaForm from "../components/MahasiswaForm";
import MahasiswaTable from "../components/MahasiswaTable";
import Navbar from "../components/Navbar";
import NotificationModal from "../components/NotificationModal";
import { Plus, Search, RefreshCw, Filter, Download, AlertCircle } from "lucide-react";

function MahasiswaList() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    title: "",
    message: "",
    type: "success"
  });

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/mahasiswa");
      console.log("Data dari database:", res.data);
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal mengambil data dari database");
      showNotification("error", "Error!", "Gagal mengambil data dari database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const showNotification = (type, title, message) => {
    setNotification({
      show: true,
      type,
      title,
      message
    });
  };

  const addMahasiswa = async (data) => {
    try {
      await api.post("/mahasiswa", data);
      await getData();
      setShowForm(false);
      showNotification("success", "Berhasil!", "Data mahasiswa berhasil ditambahkan ke database");
    } catch (error) {
      console.error("Error adding data:", error);
      showNotification("error", "Gagal!", "Gagal menambahkan data ke database");
    }
  };

  const updateMahasiswa = async (id, data) => {
    try {
      await api.put(`/mahasiswa/${id}`, data);
      setEditData(null);
      setShowForm(false);
      await getData();
      showNotification("success", "Berhasil!", "Data mahasiswa berhasil diperbarui di database");
    } catch (error) {
      console.error("Error updating data:", error);
      showNotification("error", "Gagal!", "Gagal memperbarui data di database");
    }
  };

  const deleteMahasiswa = async (id) => {
    try {
      await api.delete(`/mahasiswa/${id}`);
      await getData();
      showNotification("success", "Berhasil!", "Data mahasiswa berhasil dihapus dari database");
    } catch (error) {
      console.error("Error deleting data:", error);
      showNotification("error", "Gagal!", "Gagal menghapus data dari database");
    }
  };

  const toggleStatus = async (mhs) => {
    try {
      const newStatus = !mhs.isactive;
      await api.put(`/mahasiswa/${mhs.id}`, {
        ...mhs,
        isActive: newStatus
      });
      await getData();
      showNotification(
        "success", 
        "Status Diperbarui!", 
        `Mahasiswa ${mhs.name} berhasil ${newStatus ? 'diaktifkan' : 'dinonaktifkan'} di database`
      );
    } catch (error) {
      console.error("Error toggling status:", error);
      showNotification("error", "Gagal!", "Gagal memperbarui status di database");
    }
  };

  const handleEdit = (mhs) => {
    setEditData(mhs);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setShowForm(true);
  };

  const filteredData = data.filter(
    (mhs) =>
      (mhs.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mhs.nim || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mhs.jurusan || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMahasiswa = data.length;
  const aktifMahasiswa = data.filter(m => m.isactive).length;
  const rataIpk = data.length > 0 
    ? (data.reduce((acc, m) => acc + parseFloat(m.ipk), 0) / data.length).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wider">Total Mahasiswa</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{totalMahasiswa}</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-2xl">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">Mahasiswa Aktif</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{aktifMahasiswa}</p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-2xl">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-semibold uppercase tracking-wider">Rata-rata IPK</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{rataIpk}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-2xl">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📋 Data Mahasiswa
            </h1>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari mahasiswa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50"
                />
              </div>

              <button
                onClick={getData}
                className="p-3 text-gray-600 hover:bg-indigo-50 rounded-xl transition-all hover:scale-110 border-2 border-gray-200"
                title="Refresh"
              >
                <RefreshCw size={20} className={loading ? "animate-spin text-indigo-600" : ""} />
              </button>

              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                <span className="font-semibold">Tambah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-rose-500" />
            <p className="text-rose-700 font-medium">{error}</p>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          <MahasiswaTable
            data={filteredData}
            deleteMahasiswa={deleteMahasiswa}
            setEditData={handleEdit}
            toggleStatus={toggleStatus}
          />
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <MahasiswaForm
          addMahasiswa={addMahasiswa}
          updateMahasiswa={updateMahasiswa}
          editData={editData}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
        />
      )}

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
}

export default MahasiswaList;