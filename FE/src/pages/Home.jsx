import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Loader2,
  GraduationCap,
  UserCheck,
  UserX,
  School,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalJurusan: 0,
    rataIpk: 0,
    mahasiswaAktif: 0,
    mahasiswaInaktif: 0,
    jurusanList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/mahasiswa");
      const mahasiswa = res.data || [];

      // Hitung statistik
      const total = mahasiswa.length;
      const aktif = mahasiswa.filter((m) => m.isactive).length;
      const inaktif = total - aktif;

      // Hitung rata-rata IPK
      const totalIpk = mahasiswa.reduce((sum, m) => sum + parseFloat(m.ipk), 0);
      const rataIpk = total > 0 ? (totalIpk / total).toFixed(2) : "0.00";

      // Dapatkan daftar jurusan unik
      const jurusanSet = new Set(mahasiswa.map((m) => m.jurusan));
      const jurusanList = Array.from(jurusanSet);
      const totalJurusan = jurusanList.length;

      // Hitung IPK per jurusan
      const ipkPerJurusan = {};
      jurusanList.forEach((jurusan) => {
        const mhsJurusan = mahasiswa.filter((m) => m.jurusan === jurusan);
        const totalIpkJurusan = mhsJurusan.reduce(
          (sum, m) => sum + parseFloat(m.ipk),
          0,
        );
        ipkPerJurusan[jurusan] = (totalIpkJurusan / mhsJurusan.length).toFixed(
          2,
        );
      });

      setStats({
        totalMahasiswa: total,
        totalJurusan,
        rataIpk,
        mahasiswaAktif: aktif,
        mahasiswaInaktif: inaktif,
        jurusanList,
        ipkPerJurusan,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal mengambil data dari database");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Mahasiswa",
      value: stats.totalMahasiswa,
      icon: Users,
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "Seluruh mahasiswa terdaftar",
    },
    {
      label: "Mahasiswa Aktif",
      value: stats.mahasiswaAktif,
      icon: UserCheck,
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      description: "Mahasiswa dengan status aktif",
    },
    {
      label: "Mahasiswa Inaktif",
      value: stats.mahasiswaInaktif,
      icon: UserX,
      color: "from-rose-600 to-rose-700",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
      description: "Mahasiswa dengan status tidak aktif",
    },
    {
      label: "Rata-rata IPK",
      value: stats.rataIpk,
      icon: Award,
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      description: "Rata-rata IPK semua mahasiswa",
    },
    {
      label: "Total Jurusan",
      value: stats.totalJurusan,
      icon: BookOpen,
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      description: "Jumlah program studi",
    },
    {
      label: "Graduation Rate",
      value:
        stats.totalMahasiswa > 0
          ? `${Math.round((stats.mahasiswaAktif / stats.totalMahasiswa) * 100)}%`
          : "0%",
      icon: GraduationCap,
      color: "from-indigo-600 to-indigo-700",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      description: "Persentase mahasiswa aktif",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-xl text-gray-600 font-medium">Memuat data...</p>
            <p className="text-sm text-gray-500 mt-2">
              Mengambil data dari database
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <School className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Website Mahasiswa</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mb-6">
              Selamat datang di sistem informasi data mahasiswa. Kelola data
              mahasiswa dengan mudah dan efisien.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
                <p className="text-sm opacity-80">Total Data</p>
                <p className="text-2xl font-bold">
                  {stats.totalMahasiswa} Mahasiswa
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
                <p className="text-sm opacity-80">Jurusan</p>
                <p className="text-2xl font-bold">
                  {stats.totalJurusan} Program Studi
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
                <p className="text-sm opacity-80">IPK Rata-rata</p>
                <p className="text-2xl font-bold">{stats.rataIpk}</p>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/mahasiswa"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-opacity-90 transition-all hover:scale-105"
            >
              <Users size={20} />
              Kelola Mahasiswa
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-4 mb-6">
            <p className="text-rose-700 font-medium">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                    </div>
                    <span className="text-4xl font-bold text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jurusan Section */}
        {stats.jurusanList.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              Statistik per Jurusan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.jurusanList.map((jurusan, index) => {
                const mhsJurusan =
                  stats.totalMahasiswa > 0
                    ? Math.round(
                        (stats.mahasiswaAktif / stats.totalMahasiswa) * 100,
                      )
                    : 0;

                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold">
                          {jurusan.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {jurusan}
                        </h3>
                        <p className="text-xs text-gray-500">
                          IPK Rata-rata: {stats.ipkPerJurusan[jurusan]}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Mahasiswa</span>
                        <span className="font-semibold text-indigo-600">
                          {stats.totalMahasiswa} mhs
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${mhsJurusan}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Manajemen Data
            </h3>
            <p className="text-gray-600">
              Kelola data mahasiswa dengan mudah, termasuk tambah, edit, dan
              hapus data secara real-time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Informasi Lengkap
            </h3>
            <p className="text-gray-600">
              Lihat detail lengkap mahasiswa termasuk NIM, jurusan, IPK, dan
              status dengan tampilan interaktif.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Status Akademik
            </h3>
            <p className="text-gray-600">
              Pantau status aktif mahasiswa dengan mudah melalui fitur toggle
              status yang responsif.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Data diperbarui secara real-time dari database • Terakhir
            diperbarui: {new Date().toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
