import {
  X,
  User,
  Hash,
  BookOpen,
  Star,
  Activity,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

function DetailModal({ isOpen, onClose, mahasiswa }) {
  if (!isOpen || !mahasiswa) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        {/* Header dengan gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors bg-white/20 hover:bg-white/30 rounded-lg p-1"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {mahasiswa.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {mahasiswa.name}
              </h2>
              <p className="text-indigo-100 flex items-center gap-1">
                <Hash size={16} />
                {mahasiswa.nim}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informasi Pribadi */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                Informasi Pribadi
              </h3>

              <div className="bg-indigo-50/50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Nama Lengkap</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {mahasiswa.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">NIM</p>
                    <p className="text-sm font-semibold text-gray-800 font-mono">
                      {mahasiswa.nim}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {mahasiswa.email || `${mahasiswa.nim}@student.ac.id`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Akademik */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                Informasi Akademik
              </h3>

              <div className="bg-purple-50/50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Jurusan</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {mahasiswa.jurusan}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">IPK</p>
                    <p
                      className={`text-sm font-bold ${
                        parseFloat(mahasiswa.ipk) >= 3.5
                          ? "text-emerald-600"
                          : parseFloat(mahasiswa.ipk) >= 3.0
                            ? "text-blue-600"
                            : "text-amber-600"
                      }`}
                    >
                      {parseFloat(mahasiswa.ipk).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">
                      {mahasiswa.isactive ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">
                          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                Informasi Tambahan
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Tahun Masuk</p>
                    <p className="text-sm font-semibold text-gray-800">2021</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Semester</p>
                    <p className="text-sm font-semibold text-gray-800">
                      Semester 6
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">No. Telepon</p>
                    <p className="text-sm font-semibold text-gray-800">
                      08xxxxxxxxxx
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-emerald-600 mt-0.5">📊</div>
                  <div>
                    <p className="text-xs text-gray-500">SKS Total</p>
                    <p className="text-sm font-semibold text-gray-800">
                      110 SKS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer dengan progress bar (opsional) */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress Studi</span>
              <span className="text-sm font-semibold text-indigo-600">
                {((parseFloat(mahasiswa.ipk) / 4) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(parseFloat(mahasiswa.ipk) / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Tombol Close */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
