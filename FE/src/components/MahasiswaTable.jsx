import { useState } from "react";
import {
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react";
import ConfirmModal from "./ConfirmModal";
import DetailModal from "./DetailModal";

function MahasiswaTable({ data, deleteMahasiswa, setEditData, toggleStatus }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  const handleDeleteClick = (mhs) => {
    setSelectedMahasiswa(mhs);
    setShowDeleteModal(true);
  };

  const handleToggleClick = (mhs) => {
    setSelectedMahasiswa(mhs);
    setShowToggleModal(true);
  };

  const handleDetailClick = (mhs) => {
    setSelectedMahasiswa(mhs);
    setShowDetailModal(true);
  };

  const handleConfirmDelete = () => {
    deleteMahasiswa(selectedMahasiswa.id);
    setShowDeleteModal(false);
    setSelectedMahasiswa(null);
  };

  const handleConfirmToggle = () => {
    toggleStatus(selectedMahasiswa);
    setShowToggleModal(false);
    setSelectedMahasiswa(null);
  };

  const handleEditClick = (mhs) => {
    setEditData(mhs);
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
        <UserCheck size={14} />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">
        <UserX size={14} />
        Inactive
      </span>
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  NIM
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Jurusan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  IPK
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-indigo-50 p-4 rounded-full mb-4">
                        <svg
                          className="w-12 h-12 text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        Belum ada data mahasiswa
                      </p>
                      <p className="text-sm text-gray-500">
                        Klik tombol Tambah untuk menambahkan data ke database
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((mhs, index) => (
                  <tr
                    key={mhs.id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {mhs.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {mhs.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                        {mhs.nim}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{mhs.jurusan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-bold ${
                          parseFloat(mhs.ipk) >= 3.5
                            ? "text-emerald-600"
                            : parseFloat(mhs.ipk) >= 3.0
                              ? "text-blue-600"
                              : "text-amber-600"
                        }`}
                      >
                        {parseFloat(mhs.ipk).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(mhs.isactive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDetailClick(mhs)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all hover:scale-110"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditClick(mhs)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-all hover:scale-110"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleToggleClick(mhs)}
                          className={`p-2 rounded-xl transition-all hover:scale-110 ${
                            mhs.isactive
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          title={mhs.isactive ? "Nonaktifkan" : "Aktifkan"}
                        >
                          {mhs.isactive ? (
                            <ToggleRight size={18} />
                          ) : (
                            <ToggleLeft size={18} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(mhs)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all hover:scale-110"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Data Mahasiswa"
        message={`Apakah Anda yakin ingin menghapus data mahasiswa "${selectedMahasiswa?.name}" dari database?`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />

      {/* Toggle Status Confirmation Modal */}
      <ConfirmModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        onConfirm={handleConfirmToggle}
        title={
          selectedMahasiswa?.isactive
            ? "Nonaktifkan Mahasiswa"
            : "Aktifkan Mahasiswa"
        }
        message={`Apakah Anda yakin ingin ${selectedMahasiswa?.isactive ? "menonaktifkan" : "mengaktifkan"} mahasiswa "${selectedMahasiswa?.name}" di database?`}
        confirmText={selectedMahasiswa?.isactive ? "Nonaktifkan" : "Aktifkan"}
        cancelText="Batal"
        type={selectedMahasiswa?.isactive ? "warning" : "success"}
      />

      {/* Detail Modal */}
      {showDetailModal && (
        <DetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          mahasiswa={selectedMahasiswa}
        />
      )}
    </>
  );
}

export default MahasiswaTable;
