
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, MapPin, Github, Linkedin, ExternalLink, Code, Database, 
  Globe, Smartphone, Download, ArrowRight, Phone, Briefcase, GraduationCap, 
  Calendar, Award, Instagram, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import ProfilImage from '../src/assets/images/portoimage.png';
import SiditaImage from '../src/assets/images/sidita.png';
import NetrisImage from '../src/assets/images/netrislogoo.png';
import pln from '../src/assets/images/pln.png';
// Import Favicon (optional)
// import Favicon from '../src/assets/images/favicon.ico';
// import { Helmet } from 'react-helmet'; // Uncomment if using react-helmet

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [isVisible, setIsVisible] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [codeSnippets] = useState([
    `const App = () => {\n  const [state, setState] = useState(null);\n  return <div>Hello World</div>;\n};`,
    `function fetchData() {\n  return fetch('/api/data')\n    .then(res => res.json());\n}`,
    `class User {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return \`Hello, \${this.name}\`;\n  }\n}`
  ]);
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // Create initial particles
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.2})`
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Handle cursor animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
      
      // Also update mouse position for card tilt effect
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };
    
    const handleMouseLeave = () => {
      setShowCursor(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Rotate through code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCodeIndex(prev => (prev + 1) % codeSnippets.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

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
      const sections = ['beranda', 'informasi', 'pendidikan', 'pengalaman', 'kemampuan', 'portfolio', 'kontak'];
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
      
      // Check if we should show the scroll-to-top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
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
  
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Calculate card tilt based on mouse position
  const calculateTilt = () => {
    if (!cardRef.current) return { x: 0, y: 0 };
    
    const cardWidth = cardRef.current.offsetWidth;
    const cardHeight = cardRef.current.offsetHeight;
    
    // Calculate tilt values
    const tiltX = (mousePosition.y / cardHeight - 0.5) * 25; // 25 degrees max tilt
    const tiltY = -(mousePosition.x / cardWidth - 0.5) * 25;
    
    return { x: tiltX, y: tiltY };
  };

  const tilt = calculateTilt();
  
  // Toggle card flip
  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

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
      title: 'SIDITA',
      description: 'Aplikasi pengelolahan vendor yang di bangun dengan framework codeignitier4 serta database MySql',
      tech: ['PHP', 'CodeIgnitier4', 'MySQL', 'Bootsrap'],
      image: SiditaImage,
      github: 'https://github.com/Jamas108/sidita',
      demo: 'https://sidita.online'
    },
    {
      title: 'NETRIS APK',
      description: 'Aplikasi android untuk mencari tempat perbaikan ban terdekat. Dibuat bersama tim penelitian Netris Sistem Informasi TELU Surabaya',
      tech: ['JavaScript', 'React Native', 'Firebase', 'Cloudinary'],
      image: NetrisImage,
      github: '#',
      demo: '#'
    },
    {
      title: 'PLN Inventory',
      description: 'Aplikasi website yang digunakan oleh PLN UID JATIM untuk mengelola pengelolaan barang untuk di distribusikan ke seluruh PLN cabang jawa timur.',
      tech: ['PHP', 'Laravel', 'MySQL', 'Firebase', 'Bootstrap'],
      image: pln,
      github: 'https://github.com/Jamas108/InventoryPLN_UIDJatim.git',
      demo: '#'
    },
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

  // Matrix Rain Animation Component
  const MatrixRain = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="matrix-code">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="matrix-line" style={{ 
              animationDelay: `${Math.random() * 5}s`,
              left: `${i * 7}%`
            }}>
              {Array.from({ length: 25 }, (_, j) => (
                <span key={j} style={{ 
                  animationDelay: `${Math.random() * 5}s`,
                  color: `rgba(${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${100 + Math.random() * 155}, ${0.5 + Math.random() * 0.5})`
                }}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Binary Background for Card Back
  const BinaryBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="absolute text-xs" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.3 + Math.random() * 0.7,
            animation: `float ${3 + Math.random() * 7}s infinite ease-in-out`
          }}>
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
    );
  };

  // Custom cursor component
  const CustomCursor = () => {
    if (!showCursor) return null;
    
    return (
      <div 
        className="custom-cursor pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      >
        <div className="cursor-dot bg-white rounded-full w-3 h-3"></div>
        <div className="cursor-ring border-2 border-white rounded-full w-8 h-8 absolute -top-2.5 -left-2.5"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic Favicon (Optional) */}
      {/*
      <Helmet>
        <link rel="icon" href={Favicon} />
        <link rel="apple-touch-icon" href={Favicon} />
      </Helmet>
      */}
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes pulse-shadow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        
        .matrix-code {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .matrix-line {
          position: absolute;
          top: 0;
          animation: matrix-fall 15s linear infinite;
          display: flex;
          flex-direction: column;
        }
        
        .matrix-line span {
          font-family: monospace;
          animation: blink 3s infinite;
        }
        
        .card-container {
          perspective: 1500px;
          transform-style: preserve-3d;
        }
        
        .card {
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card.flipped {
          transform: rotateY(180deg);
        }
        
        .card-front, .card-back {
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        .card-back {
          transform: rotateY(180deg);
        }
        
        .typing-text {
          overflow: hidden;
          white-space: pre;
          border-right: 2px solid purple;
          animation: 
            typing 3.5s steps(40, end),
            blink 0.75s step-end infinite;
        }
        
        .flying-code {
          animation: float 6s infinite ease-in-out;
        }
        
        .custom-cursor .cursor-ring {
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold flex items-center">
              <Code className="w-6 h-6 mr-2 text-purple-400 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                JamsCode
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Beranda', 'Informasi', 'Pendidikan', 'Pengalaman', 'Kemampuan', 'Portfolio', 'Kontak'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-purple-400 transition-colors duration-300 transform hover:scale-110 ${activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-gray-300'
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
              {['Beranda', 'Informasi', 'Pendidikan', 'Pengalaman', 'Kemampuan', 'Portfolio', 'Kontak'].map((item) => (
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
      <section id="beranda" className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${isVisible.beranda ? 'animate-fadeIn' : 'opacity-0'}`}>
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
          
          {/* Animated code blocks */}
          <div className="absolute top-1/3 right-1/4 w-48 flying-code opacity-30">
            <div className="bg-gray-900/70 p-2 rounded text-xs font-mono text-green-400">
              <pre>{`function hello() {
  return "world";
}`}</pre>
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/5 w-48 flying-code opacity-30" style={{ animationDelay: '2s' }}>
            <div className="bg-gray-900/70 p-2 rounded text-xs font-mono text-blue-400">
              <pre>{`const data = [1, 2, 3];
data.map(x => x * 2);`}</pre>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Halo, Saya</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                    Ansar Nur Jamas
                  </span>
                </h1>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                  <span className="text-purple-400">Fullstack Developer</span>
                  <span className="text-blue-400"> (Web & Mobile)</span>
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
                  onClick={() => scrollToSection('kontak')}
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

            {/* Right Side - ID Card Animation */}
            <div className="flex justify-center lg:justify-end">
              {/* ID Card Container */}
              <div 
                className="card-container w-80 h-96 md:w-96 md:h-[30rem] cursor-pointer"
                onClick={handleCardFlip}
                ref={cardRef}
                style={{
                  animation: 'float 6s infinite ease-in-out, fadeIn 1s ease-out',
                }}
              >
                {/* The Card */}
                <div 
                  className={`card relative w-full h-full ${isCardFlipped ? 'flipped' : ''}`}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Front - ID Card */}
                  <div className="card-front absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 overflow-hidden">
                    {/* ID Card Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-center">
                      <h3 className="text-xl font-bold">DEVELOPER ID CARD</h3>
                      <div className="text-xs text-purple-200">Fullstack Developer</div>
                    </div>
                    
                    {/* Photo Area */}
                    <div className="relative w-full px-8 pt-6 flex justify-center">
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg shadow-purple-500/30">
                        <img
                          src={ProfilImage}
                          alt="Ansar Nur Jamas"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      {/* Barcode */}
                      <div className="absolute bottom-0 right-4 w-16 h-8 bg-white rounded">
                        <div className="flex h-full">
                          {Array.from({ length: 12 }, (_, i) => (
                            <div 
                              key={i} 
                              className="h-full" 
                              style={{ 
                                width: `${1 + Math.random() * 3}px`, 
                                backgroundColor: Math.random() > 0.5 ? 'black' : 'transparent',
                                marginLeft: `${Math.random() * 2}px`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* ID Card Details */}
                    <div className="p-6 text-center">
                      <h4 className="text-xl font-bold text-white mb-2">Ansar Nur Jamas</h4>
                      <div className="space-y-1 text-sm text-gray-300">
                        <p>ID: DEV-2024-108</p>
                        <p>Fullstack Developer</p>
                        <p>Surabaya, Indonesia</p>
                      </div>
                      
                      {/* Signature */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="text-purple-400 italic font-signature">Ansar Nur Jamas</div>
                        <div className="text-xs text-gray-400">Signature</div>
                      </div>
                    </div>
                    
                    {/* Flip prompt */}
                    <div className="absolute bottom-2 right-2 text-xs text-purple-400 flex items-center animate-pulse">
                      Flip <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                  
                  {/* Card Back - Programming Elements */}
                  <div className="card-back absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 overflow-hidden">
                    {/* Matrix Rain Background */}
                    <MatrixRain />
                    
                    {/* Binary Background */}
                    <BinaryBackground />
                    
                    {/* Content Container */}
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          Developer Skills
                        </h3>
                      </div>
                      
                      {/* Code Editor */}
                      <div className="flex-1 bg-gray-900/80 rounded-lg p-4 border border-gray-700 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2 border-b border-gray-700 pb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="text-xs text-gray-400 ml-2">code_skills.js</div>
                        </div>
                        
                        <pre className="text-xs font-mono text-green-400 overflow-auto h-48">
                          {codeSnippets[activeCodeIndex]}
                        </pre>
                      </div>
                      
                      {/* Skills Icons */}
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {skills.slice(0, 4).map((skill, index) => (
                          <div key={index} className="text-center">
                            <div className="bg-purple-900/30 p-2 rounded-full mx-auto w-10 h-10 flex items-center justify-center">
                              {skill.icon}
                            </div>
                            <div className="text-xs mt-1">{skill.name}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Flip prompt */}
                      <div className="absolute bottom-2 left-2 text-xs text-purple-400 flex items-center animate-pulse">
                        <ChevronLeft className="w-3 h-3" /> Flip
                      </div>
                    </div>
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
      <section id="informasi" className={`py-20 px-4 ${isVisible.informasi ? 'animate-fadeIn' : 'opacity-0'}`}>
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
              {/* Animated terminal */}
              <div className="bg-gray-900/70 rounded-lg border border-purple-900/30 shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-400">ansar@jamas-terminal ~ </div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="flex">
                    <span className="text-green-400">ansar@jamas-terminal</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$ </span>
                    <span className="typing-text text-purple-300">whoami</span>
                  </div>
                  <div className="text-green-300 mt-2">Ansar Nur Jamas</div>
                  <div className="flex mt-2">
                    <span className="text-green-400">ansar@jamas-terminal</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$ </span>
                    <span className="typing-text text-purple-300" style={{ animationDelay: '4s' }}>cat info.json</span>
                  </div>
                  <div className="text-yellow-300 mt-2">
                    {`{
  "name": "Ansar Nur Jamas",
  "occupation": "Fullstack Developer",
  "location": "Surabaya, Indonesia",
  "education": "S1 Sistem Informasi",
  "institution": "Telkom University Surabaya",
  "skills": ["Laravel", "React", "Flutter", "MySQL"]
}`}
                  </div>
                </div>
              </div>
              
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
        
        {/* Floating Code Elements */}
        <div className="absolute -right-20 top-1/4 opacity-30 w-40 flying-code" style={{ animationDelay: '1s' }}>
          <div className="bg-gray-900/70 p-3 rounded-lg border border-blue-500/30 font-mono text-xs text-blue-400">
            {`<div className="app">
  <Header />
  <Main />
  <Footer />
</div>`}
          </div>
        </div>
        
        <div className="absolute -left-20 bottom-1/4 opacity-30 w-40 flying-code" style={{ animationDelay: '3s' }}>
          <div className="bg-gray-900/70 p-3 rounded-lg border border-green-500/30 font-mono text-xs text-green-400">
            {`const api = {
  get: async (url) => {
    const res = await fetch(url);
    return res.json();
  }
};`}
          </div>
        </div>
      </section>

      {/* Education Section - REDESIGNED */}
      <section id="pendidikan" className={`py-20 px-4 bg-gray-900/30 ${isVisible.pendidikan ? 'animate-fadeIn' : 'opacity-0'}`}>
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
                className="group relative overflow-hidden bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm transform hover:scale-105"
              >
                {/* Programming elements background */}
                <div className="absolute inset-0 overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="absolute text-xs font-mono" style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 20 - 10}deg)`,
                      color: Math.random() > 0.5 ? '#a855f7' : '#3b82f6'
                    }}>
                      {Math.random() > 0.5 ? '{educate()}' : '<knowledge/>'}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-start gap-4 relative z-10">
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
                
                {/* Animated corner decoration */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl group-hover:top-0 group-hover:right-0 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - REDESIGNED */}
      <section id="pengalaman" className={`py-20 px-4 ${isVisible.pengalaman ? 'animate-fadeIn' : 'opacity-0'}`}>
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
                
                {/* Programming elements background */}
                <div className="absolute inset-0 overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="absolute text-xs font-mono" style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 20 - 10}deg)`,
                      color: Math.random() > 0.5 ? '#60a5fa' : '#93c5fd'
                    }}>
                      {Math.random() > 0.5 ? 'function work() {}' : 'const experience = [];'}
                    </div>
                  ))}
                </div>

                <div className="relative p-6 md:p-8 z-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon container */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500 shadow-lg shadow-blue-500/10 animate-pulse-shadow">
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

                {/* Programming elements background */}
                <div className="absolute inset-0 overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="absolute text-xs font-mono" style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 20 - 10}deg)`,
                      color: Math.random() > 0.5 ? '#c084fc' : '#a855f7'
                    }}>
                      {Math.random() > 0.5 ? 'team.collaborate()' : 'leadership++'}
                    </div>
                  ))}
                </div>

                <div className="relative p-6 z-10">
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
      <section id="kemampuan" className={`py-20 px-4 bg-gray-900/30 ${isVisible.kemampuan ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Kemampuan
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 p-6 rounded-lg border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-purple-400 animate-pulse">{skill.icon}</div>
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
                
                {/* Binary data animation */}
                <div className="mt-3 overflow-hidden h-8">
                  <div className="text-xs font-mono text-purple-400/50 overflow-hidden whitespace-nowrap animate-typing" style={{ animationDelay: `${index * 0.5}s` }}>
                    {Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
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
              Portofolio Proyek
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group bg-gray-900/50 rounded-lg overflow-hidden border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                {/* Image with overlay effect */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="w-full p-4">
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          className="flex items-center gap-2 text-white bg-purple-600/80 hover:bg-purple-600 px-3 py-2 rounded-lg text-sm transition-all duration-300 backdrop-blur-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                        <a
                          href={project.demo}
                          className="flex items-center gap-2 text-white bg-blue-600/80 hover:bg-blue-600 px-3 py-2 rounded-lg text-sm transition-all duration-300 backdrop-blur-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Code animation overlay */}
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="text-xs font-mono text-green-400 overflow-hidden h-full w-full p-4">
                      {`import React from 'react';
                      
const ${project.title.replace(/\s+/g, '')} = () => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Initialize project
    setLoading(true);
    fetchData()
      .then(data => {
        processData(data);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="project">
      <h1>${project.title}</h1>
      {/* Project content */}
    </div>
  );
};`}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">{project.title}</h3>
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
                </div>
                
                {/* Animated corner element */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-500/30 to-transparent transform rotate-45 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - REDESIGNED */}
      <section id="kontak" className={`py-20 px-4 bg-gray-900/30 ${isVisible.kontak ? 'animate-fadeIn' : 'opacity-0'}`}>
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
                
                {/* Binary/code background for tech feel */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="absolute text-xs font-mono" style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 20 - 10}deg)`,
                    }}>
                      {Math.random() > 0.5 ? 'contact()' : '<reach/>'}
                    </div>
                  ))}
                </div>

                <div className="relative p-6 flex items-center gap-4 z-10">
                  {/* Icon container with pulse animation */}
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-500 group-hover:animate-pulse`}>
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
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Animated corner decoration */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl group-hover:top-0 group-hover:right-0 transition-all duration-700"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-900/20 relative overflow-hidden">
        {/* Matrix-like effect in footer */}
        <div className="absolute inset-0 opacity-5">
          <MatrixRain />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 p-px rounded-lg mb-4">
            <div className="bg-gray-900 px-6 py-2 rounded-lg">
              <Code className="w-6 h-6 inline-block mr-2 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent font-bold">
                JamsCode
              </span>
            </div>
          </div>
          
          <p className="text-gray-400">
            © 2025 Ansar Nur Jamas. Build With Love :)
          </p>
          
          <div className="mt-4 text-xs text-gray-500">
            <div className="font-mono">
              // Keep coding, keep creating
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button - Floating in bottom right corner */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-110 z-50 animate-fadeIn"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;