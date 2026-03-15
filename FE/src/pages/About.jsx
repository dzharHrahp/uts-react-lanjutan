import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import {
  Users,
  BookOpen,
  Award,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Star,
  Shield,
  Code,
  Coffee,
  Zap,
  Target,
  Clock,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalJurusan: 0,
    versi: "2.0.0",
    lastUpdate: "2024",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/mahasiswa");
      const mahasiswa = res.data || [];

      const jurusanSet = new Set(mahasiswa.map((m) => m.jurusan));

      setStats((prev) => ({
        ...prev,
        totalMahasiswa: mahasiswa.length,
        totalJurusan: jurusanSet.size,
      }));
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const tim = [
    {
      nama: "Tim Pengembang",
      role: "Full Stack Developer",
      avatar: "👨‍💻",
      github: "#",
      linkedin: "#",
      kontribusi: ["Frontend Development", "Backend API", "UI/UX Design"],
    },
  ];

  const fitur = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Manajemen Mahasiswa",
      desc: "CRUD lengkap untuk data mahasiswa dengan validasi real-time",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Keamanan Terjamin",
      desc: "Sistem autentikasi dan proteksi route untuk keamanan data",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Responsive Design",
      desc: "Tampilan yang optimal di semua perangkat (desktop, tablet, mobile)",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Search & Filter",
      desc: "Pencarian data mahasiswa secara real-time",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Update",
      desc: "Data selalu terbaru dengan integrasi database",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Statistik Lengkap",
      desc: "Dashboard dengan informasi statistik real-time",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const teknologi = [
    {
      kategori: "Frontend",
      items: ["React.js", "Tailwind CSS", "Lucide Icons", "React Router"],
    },
    {
      kategori: "Backend",
      items: ["Node.js", "Express.js", "REST API", "Database"],
    },
    {
      kategori: "Tools",
      items: ["VS Code", "Git", "npm/yarn", "Chrome DevTools"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block p-3 bg-white/20 backdrop-blur rounded-2xl mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Tentang Aplikasi</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Sistem Informasi Mahasiswa yang modern, cepat, dan mudah digunakan
              untuk mengelola data akademik
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">{stats.totalMahasiswa}</div>
                <div className="text-sm opacity-90">Total Mahasiswa</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">{stats.totalJurusan}</div>
                <div className="text-sm opacity-90">Program Studi</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">{stats.versi}</div>
                <div className="text-sm opacity-90">Versi Aplikasi</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">{stats.lastUpdate}</div>
                <div className="text-sm opacity-90">Tahun Rilis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white"
            viewBox="0 0 1440 100"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,50 C300,100 600,0 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Description */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sekilas Tentang
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Aplikasi ini dikembangkan untuk memudahkan pengelolaan data
              mahasiswa di lingkungan pendidikan. Dengan tampilan yang modern
              dan fitur yang lengkap, diharapkan dapat meningkatkan efisiensi
              dalam administrasi akademik.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Dibangun dengan teknologi terkini dan mengutamakan pengalaman
              pengguna, aplikasi ini siap membantu Anda dalam mengelola data
              mahasiswa dengan lebih baik.
            </p>

            <div className="flex gap-4">
              <Link
                to="/mahasiswa"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
              >
                <Users size={20} />
                Mulai Kelola Data
              </Link>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                <Download size={20} />
                Download Info
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Cepat</h3>
              <p className="text-sm text-gray-500">Responsif dan ringan</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Aman</h3>
              <p className="text-sm text-gray-500">Data terproteksi</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
              <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800">User Friendly</h3>
              <p className="text-sm text-gray-500">Mudah digunakan</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Coffee className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Modern</h3>
              <p className="text-sm text-gray-500">Teknologi terkini</p>
            </div>
          </div>
        </div>

        {/* Fitur Unggulan */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fitur Unggulan
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai fitur canggih yang siap membantu Anda dalam mengelola
              data mahasiswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fitur.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teknologi yang Digunakan */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Teknologi yang Digunakan
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teknologi.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {cat.kategori}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tim Pengembang */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tim Pengembang
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tim.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-4xl mb-3 border-4 border-white">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {member.nama}
                  </h3>
                  <p className="text-indigo-100 text-sm">{member.role}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Kontribusi:
                    </p>
                    <ul className="space-y-1">
                      {member.kontribusi.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 text-yellow-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center gap-3 pt-3 border-t border-gray-100">
                    <a
                      href={member.github}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-700" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gray-700" />
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-gray-700" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
              <p className="text-indigo-100 mb-6">
                Ada pertanyaan atau masukan? Jangan ragu untuk menghubungi tim
                kami.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>support@sistemmahasiswa.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+62 812 3456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Globe className="w-6 h-6" />
                </a>
              </div>
              <p className="text-indigo-100 text-sm mt-4">
                © 2024 Sistem Informasi Mahasiswa. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
