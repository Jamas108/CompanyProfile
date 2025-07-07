import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, MapPin, Github, Linkedin, ExternalLink, Code, Database, Globe, Smartphone, Download, ArrowRight, Phone, Briefcase, GraduationCap, Calendar, Award, Instagram } from 'lucide-react';
import ProfilImage from '../src/assets/images/portoimage.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'skills', 'portfolio', 'contact'];
      const scrollY = window.scrollY;
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const skills = [
    { name: 'Laravel', level: 98, icon: <Globe className="w-6 h-6" /> },
    { name: 'CodeIgnitier', level: 90, icon: <Globe className="w-6 h-6" /> },
    { name: 'Flutter', level: 70, icon: <Smartphone className="w-6 h-6" /> },
    { name: 'React Native', level: 90, icon: <Smartphone className="w-6 h-6" /> },
    { name: 'MySQL', level: 98, icon: <Database className="w-6 h-6" /> },
    { name: 'PostgreSQL', level: 90, icon: <Database className="w-6 h-6" /> },
    { name: 'Firebase', level: 90, icon: <Database className="w-6 h-6" /> },
    { name: 'MongoDB', level: 70, icon: <Database className="w-6 h-6" /> }
  ];

  const education = [
    {
      degree: 'S1 Sistem Informasi',
      institution: 'Telkom University Surabaya',
      period: '2021 - Februari 2025',
      icon: <GraduationCap className="w-6 h-6" />,
      description: "IPK 3.69 dengan predikat kelulusan CUMLAUDE"
    },
    {
      degree: 'SMAS Giki 2 Surabaya',
      institution: 'IPA',
      period: '2018 - 2021',
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Fokus pada mata pelajaran IPA"
    },
    {
      degree: 'SMPN 29 Surabaya',
      institution: '',
      period: '2015 - 2018',
      icon: <GraduationCap className="w-6 h-6" />,
      description: ""
    },
    {
      degree: 'SDN Pacar Keling V Surabaya',
      institution: '',
      period: '2009 - 2015',
      icon: <GraduationCap className="w-6 h-6" />,
      description: ""
    }
  ];

  const experience = [
    {
      position: 'Fullstack Developer',
      company: 'PT. Orindo Bangun Samudera',
      period: 'Juli 2025 - Sekarang',
      icon: <Briefcase className="w-6 h-6" />,
      description: "Pengembangan website internal perusahaan menggunakan framework Laravel"
    },
    {
      position: 'Fullstack Developer (Magang)',
      company: 'PT PLN (Persero) Unit Induk Distribusi Jawa Timur',
      period: 'Juni 2024 - Agustus 2024',
      icon: <Briefcase className="w-6 h-6" />,
      description: "Membangun dan mengembangkan aplikasi internal perusahaan untuk mendukung operasi distribusi listrik"
    },
    {
      position: 'Asisten Praktikum',
      company: 'Pemrograman Website, Framework, Mobile APP, Sistem Operasi, DevOps, Keamanan Sistem Informasi',
      period: '2023 - 2025',
      icon: <Briefcase className="w-6 h-6" />,
      description: "Membantu mahasiswa dalam memahami dan menerapkan konsep pemrograman dalam berbagai mata kuliah"
    }
  ];

  const organizations = [
    {
      position: 'Ketua Umum',
      organization: 'Himpunan Mahasiswa Sistem Informasi',
      period: '2024 - 2025',
      icon: <Award className="w-6 h-6" />,
      description: "Memimpin dan mengkoordinasikan seluruh kegiatan himpunan untuk meningkatkan kualitas mahasiswa"
    },
    {
      position: 'Staff Adkesma',
      organization: 'Himpunan Mahasiswa Sistem Informasi',
      period: '2023 - 2024',
      icon: <Award className="w-6 h-6" />,
      description: "Bertugas dalam meningkatkan kesejahteraan mahasiswa dan mengadakan program-program sosial"
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution dengan React, Node.js, dan MongoDB. Fitur meliputi autentikasi user, integrasi payment, dan admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas kolaboratif dengan real-time updates, fitur tim collaboration, dan tracking deadline.',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      github: '#',
      demo: '#'
    },
    {
      title: 'Mobile Banking App',
      description: 'Aplikasi mobile banking React Native dengan autentikasi aman, riwayat transaksi, dan fitur transfer uang.',
      tech: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop',
      github: '#',
      demo: '#'
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "jamasguitarist@gmail.com",
      link: "mailto:jamasguitarist@gmail.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+62 821-3673-6166",
      link: "https://wa.me/6282136736166",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub",
      value: "jamas108",
      link: "https://github.com/jamas108",
      color: "from-gray-700 to-gray-900"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn",
      value: "Ansar Nur Jamas",
      link: "https://www.linkedin.com/in/ansar-nur-jamas-163096310/",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram",
      value: "@jamass10_",
      link: "https://instagram.com/jamass10_",
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Surabaya, Indonesia",
      link: "https://maps.google.com/?q=Surabaya,Indonesia",
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              JamsCode
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Education', 'Experience', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-purple-400 transition-colors duration-300 ${activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-gray-300'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-900/20">
              {['Home', 'About', 'Education', 'Experience', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 hover:text-purple-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-2">

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Hello, I'm</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                    Ansar Nur Jamas
                  </span>
                </h1>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                  <span className="text-purple-400">Fullstack Developer</span> &
                  <span className="text-blue-400"> Mobile App Creator</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                  Mengembangkan aplikasi web dan mobile yang inovatif dengan teknologi terkini.
                  Spesialisasi dalam React, Node.js, Flutter, dan React Native untuk menciptakan
                  solusi digital yang efisien dan user-friendly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full text-sm text-purple-300 hover:bg-purple-800/50 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  Laravel
                </span>
                <span className="px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-full text-sm text-blue-300 hover:bg-blue-800/50 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  CodeIgnitier
                </span>
                <span className="px-4 py-2 bg-green-900/30 border border-green-500/30 rounded-full text-sm text-green-300 hover:bg-green-800/50 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  Flutter
                </span>
                <span className="px-4 py-2 bg-pink-900/30 border border-pink-500/30 rounded-full text-sm text-pink-300 hover:bg-pink-800/50 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  React Native
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    Portofolio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-purple-500/50 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Phone className="w-5 h-5" />
                    Kontak
                  </span>
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/jamas108"
                  className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ansar-nur-jamas-163096310/"
                  className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right Side - Professional Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

                {/* Photo Container */}
                <div className="relative z-10 w-80 h-80 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl rotate-6 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-2xl -rotate-6 animate-pulse delay-300"></div>

                  {/* Main Photo */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                    {/* Your actual photo */}
                    <img
                      src={ProfilImage}
                      alt="Ansar Nur Jamas"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${isVisible.about ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Tentang Saya
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">
                Halo! Nama Saya Ansar Nur Jamas
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Perkenalkan, Nama Saya Ansar Nur Jamas. Saya biasa di panggil Ansar atau Jamas. Saya berusia 22 Tahun dan tinggal di Surabaya. Saya merupakan lulusan kampus Telkom University Surabaya Jurusan S1 Sistem Informasi dengan IPK 3.69 dan predikat kelulusan CUMLAUDE.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Saat berkuliah saya aktif dalam mengikuti kegiatan organisasi dan kegiatan akademik seperti menjadi asisten praktikum mata kuliah. minat saya dalam bidang teknologi membuat saya selalu bersemangat untuk menambah pengalaman dan pengetahuan tentang teknologi atau hal baru.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Saat ini saya sudah membuat beberapa aplikasi berupa website maupun android yang temanya menyesuaikan permintaan pelanggan. Saya merupakan fullstack developer yang mampu membuat aplikasi dengan beberapa bahasa pemrograman dan framework sesuai kebutuhan.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-900/20">
                <h4 className="text-xl font-semibold mb-4 text-purple-400">Informasi Pribadi</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Surabaya, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 font-semibold">Umur:</span>
                    <span className="text-gray-300">22 Tahun</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 font-semibold">Pendidikan:</span>
                    <span className="text-gray-300">S1 Sistem Informasi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 font-semibold">Lembaga:</span>
                    <span className="text-gray-300">Telkom University Surabaya</span>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - REDESIGNED */}
      <section id="education" className={`py-20 px-4 bg-gray-900/30 ${isVisible.education ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Pendidikan
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <div 
                key={index} 
                className="group bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm transform hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-700/20 group-hover:from-purple-500/30 group-hover:to-purple-700/30 transition-all duration-500">
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-500">
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                      {item.degree}
                    </h3>
                    {item.institution && (
                      <p className="text-gray-300 mb-2">{item.institution}</p>
                    )}
                    {item.description && (
                      <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - REDESIGNED */}
      <section id="experience" className={`py-20 px-4 ${isVisible.experience ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Pengalaman Bekerja
            </span>
          </h2>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-blue-900/20 opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon container */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500 shadow-lg shadow-blue-500/10">
                        <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-500">
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-1 rounded-full backdrop-blur-sm w-fit">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{item.period}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">
                        {item.company}
                      </p>
                      
                      <p className="text-gray-400 mt-3 group-hover:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Organization Experience - REDESIGNED */}
          <h3 className="text-2xl font-bold text-center my-16">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Pengalaman Organisasi
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {organizations.map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm transform hover:scale-105"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-purple-900/20 opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon container */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-500">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-500">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {item.position}
                      </h3>
                      <p className="text-gray-300 mt-1 group-hover:text-white transition-colors duration-300">
                        {item.organization}
                      </p>
                      <p className="text-gray-400 text-sm mt-3 group-hover:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 bg-gray-900/30 ${isVisible.skills ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Kemampuan
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-purple-400">{skill.icon}</div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <span className="text-purple-400 font-semibold ml-auto">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-700 h-2 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-20 px-4 ${isVisible.portfolio ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg overflow-hidden border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs hover:bg-purple-800/50 hover:text-purple-200 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - REDESIGNED */}
      <section id="contact" className={`py-20 px-4 bg-gray-900/30 ${isVisible.contact ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Hubungi Saya
            </span>
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Anda dapat menghubungi saya dari kontak yang tertera di bawah ini
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <a 
                key={index} 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative p-6 flex items-center gap-4">
                  {/* Icon container */}
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-500`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Ansar Nur Jamas. All rights reserved. Built with React.js
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;