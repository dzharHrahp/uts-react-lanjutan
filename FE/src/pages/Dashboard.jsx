import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { 
  Users, BookOpen, Award, TrendingUp, GraduationCap, 
  Calendar, Clock, ChevronRight, Star, Activity, UserCheck,
  UserX, School, BarChart3, PieChart, Download, Filter,
  Mail, Phone, MapPin, Github, Twitter, Linkedin, Globe
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalJurusan: 0,
    mahasiswaAktif: 0,
    mahasiswaInaktif: 0,
    rataIpk: 0,
    ipkTertinggi: 0,
    ipkTerendah: 0,
  });
  
  const [recentMahasiswa, setRecentMahasiswa] = useState([]);
  const [jurusanStats, setJurusanStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    fetchData();
    setGreeting(getGreeting());
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const fetchData = async () => {
    try {
      const res = await api.get("/mahasiswa");
      const mahasiswa = res.data || [];
      
      // Hitung statistik
      const total = mahasiswa.length;
      const aktif = mahasiswa.filter(m => m.isactive).length;
      const inaktif = total - aktif;
      
      const ipkList = mahasiswa.map(m => parseFloat(m.ipk));
      const totalIpk = ipkList.reduce((a, b) => a + b, 0);
      const rataIpk = total > 0 ? (totalIpk / total).toFixed(2) : "0.00";
      const ipkTertinggi = ipkList.length > 0 ? Math.max(...ipkList).toFixed(2) : "0.00";
      const ipkTerendah = ipkList.length > 0 ? Math.min(...ipkList).toFixed(2) : "0.00";

      // Hitung per jurusan
      const jurusanMap = {};
      mahasiswa.forEach(m => {
        if (!jurusanMap[m.jurusan]) {
          jurusanMap[m.jurusan] = {
            nama: m.jurusan,
            total: 0,
            totalIpk: 0,
            aktif: 0
          };
        }
        jurusanMap[m.jurusan].total++;
        jurusanMap[m.jurusan].totalIpk += parseFloat(m.ipk);
        if (m.isactive) jurusanMap[m.jurusan].aktif++;
      });

      const jurusanStats = Object.values(jurusanMap).map(j => ({
        ...j,
        rataIpk: (j.totalIpk / j.total).toFixed(2)
      }));

      // 5 data terbaru (asumsi id increment)
      const recent = [...mahasiswa].reverse().slice(0, 5);

      setStats({
        totalMahasiswa: total,
        totalJurusan: Object.keys(jurusanMap).length,
        mahasiswaAktif: aktif,
        mahasiswaInaktif: inaktif,
        rataIpk,
        ipkTertinggi,
        ipkTerendah,
      });
      
      setJurusanStats(jurusanStats);
      setRecentMahasiswa(recent);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Mahasiswa",
      value: stats.totalMahasiswa,
      icon: Users,
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Mahasiswa Aktif",
      value: stats.mahasiswaAktif,
      icon: UserCheck,
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Mahasiswa Inaktif",
      value: stats.mahasiswaInaktif,
      icon: UserX,
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "-2%",
      trendUp: false
    },
    {
      title: "Total Jurusan",
      value: stats.totalJurusan,
      icon: School,
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "0%",
      trendUp: null
    },
    {
      title: "Rata-rata IPK",
      value: stats.rataIpk,
      icon: Award,
      color: "from-pink-600 to-pink-700",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      trend: "+0.2",
      trendUp: true
    },
    {
      title: "IPK Tertinggi",
      value: stats.ipkTertinggi,
      icon: Star,
      color: "from-yellow-600 to-yellow-700",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      trend: "4.00",
      trendUp: null
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Memuat dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {greeting}, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{username}</span>! 👋
              </h1>
              <p className="text-gray-500 mt-1">
                Selamat datang di dashboard Sistem Informasi Mahasiswa
              </p>
            </div>
            
            {/* Date & Time */}
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-700 font-medium">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <Clock className="w-5 h-5 text-indigo-600 ml-2" />
              <span className="text-gray-700 font-medium">
                {new Date().toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`${stat.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                    </div>
                    {stat.trend && (
                      <span className={`text-xs font-semibold ${
                        stat.trendUp === true ? 'text-emerald-600' :
                        stat.trendUp === false ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm text-gray-500 mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Statistik Per Jurusan
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                  Lihat Semua <ChevronRight size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {jurusanStats.slice(0, 5).map((jurusan, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{jurusan.nama}</span>
                        <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                          {jurusan.total} mhs
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-indigo-600">
                        IPK {jurusan.rataIpk}
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full group-hover:scale-105 transition-transform"
                        style={{ width: `${(jurusan.aktif / jurusan.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Aktif: {jurusan.aktif}</span>
                      <span className="text-xs text-gray-500">Tidak Aktif: {jurusan.total - jurusan.aktif}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Mahasiswa Terbaru
                </h2>
                <Link 
                  to="/mahasiswa"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  Kelola <ChevronRight size={16} />
                </Link>
              </div>

              <div className="space-y-3">
                {recentMahasiswa.map((mhs, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {mhs.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {mhs.name}
                        </h4>
                        <p className="text-xs text-gray-500">{mhs.nim} • {mhs.jurusan}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        mhs.isactive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {mhs.isactive ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {parseFloat(mhs.ipk).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Ringkasan Data
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mahasiswa Aktif</span>
                    <span className="font-bold">{stats.mahasiswaAktif} / {stats.totalMahasiswa}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(stats.mahasiswaAktif / stats.totalMahasiswa) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rata-rata IPK</span>
                    <span className="font-bold">{stats.rataIpk} / 4.00</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(parseFloat(stats.rataIpk) / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs opacity-80">IPK Tertinggi</p>
                    <p className="text-xl font-bold">{stats.ipkTertinggi}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs opacity-80">IPK Terendah</p>
                    <p className="text-xl font-bold">{stats.ipkTerendah}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/mahasiswa"
                  className="flex flex-col items-center gap-2 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Kelola Mahasiswa</span>
                </Link>
                
                <button
                  onClick={() => window.location.href = '/mahasiswa?action=add'}
                  className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Tambah Mahasiswa</span>
                </button>
                
                <button
                  onClick={fetchData}
                  className="flex flex-col items-center gap-2 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Refresh Data</span>
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="flex flex-col items-center gap-2 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Filter className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Laporan</span>
                </button>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Sistem</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">support@sistemmahasiswa.com</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-600">+62 812 3456 7890</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="text-gray-600">Jakarta, Indonesia</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-center gap-4">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;