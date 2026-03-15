import { useState, useEffect } from "react";
import { X } from "lucide-react";

function MahasiswaForm({ addMahasiswa, updateMahasiswa, editData, onClose }) {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [ipk, setIpk] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setNim(editData.nim || "");
      setJurusan(editData.jurusan || "");
      setIpk(editData.ipk || "");
      // Perhatikan: di database mungkin pakai isActive atau isactive
      setIsActive(
        editData.isActive !== undefined
          ? editData.isActive
          : editData.isactive !== undefined
            ? editData.isactive
            : true,
      );
    } else {
      resetForm();
    }
  }, [editData]);

  const resetForm = () => {
    setName("");
    setNim("");
    setJurusan("");
    setIpk("");
    setIsActive(true);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Nama harus diisi";
    if (!nim.trim()) newErrors.nim = "NIM harus diisi";
    if (!jurusan.trim()) newErrors.jurusan = "Jurusan harus diisi";
    if (!ipk.trim()) newErrors.ipk = "IPK harus diisi";
    else if (isNaN(ipk) || ipk < 0 || ipk > 4)
      newErrors.ipk = "IPK harus antara 0 - 4";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Format data sesuai dengan yang diharapkan database
    const data = {
      name: name.trim(),
      nim: nim.trim(),
      jurusan: jurusan.trim(),
      ipk: parseFloat(ipk),
      isActive: isActive, // Pastikan pakai isActive (camelCase)
    };

    if (editData) {
      updateMahasiswa(editData.id, data);
    } else {
      addMahasiswa(data);
    }

    resetForm();
    if (onClose) onClose();
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIM
            </label>
            <input
              type="text"
              placeholder="Masukkan NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                errors.nim ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nim && (
              <p className="mt-1 text-sm text-red-600">{errors.nim}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jurusan
            </label>
            <input
              type="text"
              placeholder="Masukkan jurusan"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                errors.jurusan ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.jurusan && (
              <p className="mt-1 text-sm text-red-600">{errors.jurusan}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IPK
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="0.00 - 4.00"
              value={ipk}
              onChange={(e) => setIpk(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                errors.ipk ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.ipk && (
              <p className="mt-1 text-sm text-red-600">{errors.ipk}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value === "true")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              {editData ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MahasiswaForm;
