'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Newspaper,
  BookOpen,
  Award,
  GraduationCap,
  Users,
  Mail,
  Github,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  ChevronRight,
  Sparkles,
  Code,
  Cpu,
  Brain,
  Zap,
  ChevronDown,
  Menu,
  X,
  Twitter,
} from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { name: 'Profile', icon: User, href: '#profile' },
  { name: 'News', icon: Newspaper, href: '#news' },
  { name: 'Publications', icon: BookOpen, href: '#publications' },
  { name: 'Honors', icon: Award, href: '#honors' },
  { name: 'Communications', icon: Users, href: '#communications' },
  { name: 'Education', icon: GraduationCap, href: '#education' },
]

// Social media links configuration
const socialLinks = [
  { icon: Github, href: 'https://github.com/liux520', label: 'GitHub', color: 'hover:bg-gray-800' },
  { icon: GraduationCap, href: 'https://scholar.google.com/citations?user=p6UJEDkAAAAJ&hl=zh-CN', label: 'Google Scholar', color: 'hover:bg-blue-600' },
  { icon: Twitter, href: 'https://x.com/yourusername', label: 'X (Twitter)', color: 'hover:bg-black' },
  { icon: Mail, href: 'mailto:liuxmail1220@gmail.com', label: 'Email', color: 'hover:bg-primary-500' },
]

// Navigation links configuration - set enabled to false to disable jumping to detail pages
const navLinksConfig = {
  news: { enabled: false },        // View all news -> /news
  publications: { enabled: true }, // View All Publications -> /publications
  honors: { enabled: true },      // View More Honors & Awards -> /honors
  service: { enabled: false },    // View More Academic Service & Communications -> /service
} as const

// publication award talk grant
// January February March April May June July August September October November December
const news = [
  {
    date: 'February 2026',
    title: 'Paper accepted at TPAMI',
    description: 'Our research on Self-Supervised Image Denoising has been accepted at TPAMI.',
    type: 'publication',
  },
  {
    date: 'June 2025',
    title: 'Paper accepted at TNNLS',
    description: 'Our research on Image Restoration has been accepted at TNNLS.',
    type: 'publication',
  },
  {
    date: 'March 2025',
    title: 'Paper accepted at TII',
    description: 'Our research on Image Super-Resolution has been accepted at TII.',
    type: 'publication',
  },
  {
    date: 'July 2023',
    title: 'Paper accepted at ACMMM 2023',
    description: 'Our research on Semantic Segmentation has been accepted at ACMMM 2023.',
    type: 'publication',
  },
  {
    date: 'July 2023',
    title: 'Paper accepted at ECAI 2023',
    description: 'Our research on Image Super-Resolution has been accepted at ECAI 2023.',
    type: 'publication',
  },
  {
    date: 'July 2023',
    title: 'Two Papers accepted at ICCV 2023',
    description: 'Our researches on Un-/Self-Supervised Image Denoising have been accepted at ICCV 2023.',
    type: 'publication',
  }
  // {
  //   date: 'December 2024',
  //   title: 'Invited talk at AI Research Symposium',
  //   description: 'Delivered an invited presentation on recent advances in neural architecture design.',
  //   type: 'talk',
  // },
  // {
  //   date: 'November 2024',
  //   title: 'Best Paper Award at NeurIPS Workshop',
  //   description: 'Received the Best Paper Award for our work on efficient transformer architectures.',
  //   type: 'award',
  // },
  // {
  //   date: 'October 2024',
  //   title: 'New research grant awarded',
  //   description: 'Secured funding for research on interpretable machine learning systems.',
  //   type: 'publication',
  // },
  // {
  //   date: 'October 2024',
  //   title: 'New research grant awarded',
  //   description: 'Secured funding for research on interpretable machine learning systems.',
  //   type: 'talk',
  // },
  // {
  //   date: 'October 2024',
  //   title: 'New research grant awarded',
  //   description: 'Secured funding for research on interpretable machine learning systems.',
  //   type: 'grant',
  // }
]

interface Publication {
  title: string
  authors: string
  venue: string
  year: string
  type: 'journal' | 'conference'
  award?: string
  impactFactor?: number | string
  ccfRank?: 'A' | 'B' | 'C'
  image?: string
  links: {
    pdf?: string
    code?: string
    project?: string
  }
}

const publications: Publication[] = [
  {
    title: 'D2S-RSG-SSD: Dual Double-Sampling with Random Sub-Samples Generation for Self-Supervised Real Image Denoising',
    authors: 'Xiao Liu, Xiuya Shi, Yizhong Pan, Shuhang Gu, Wei Liu, Chao Ren',
    venue: 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)',
    year: '2025',
    type: 'journal',
    impactFactor: 18.6,
    // award: 'most',
    image: 'papers/TPAMI-2025-Xiao Liu.webp',
    links: { pdf: 'https://www.sciencedirect.com/science/article/abs/pii/S095070512501682X', code: 'https://github.com/liux520/D2S-RSG-SSD' },
  },
  {
    title: 'Real-world blind image super-resolution with mixed and probabilistic scheme based synthetic degradation pipeline',
    authors: 'Xiao Liu, Xiaofeng Wang, Zhengyong Wang, Xiaohai He, Chao Ren',
    venue: 'Knowledge-Based Systems (KBS)',
    year: '2024',
    type: 'journal',
    impactFactor: 7.6,
    // award: 'most',
    image: 'papers/KBS-2025-Xiao Liu.webp',
    links: { pdf: 'https://www.sciencedirect.com/science/article/abs/pii/S095070512501682X' },
  },
  {
    title: 'Transformer-Style Convolutional Network for Efficient Natural and Industrial Image Superresolution',
    authors: 'Xiao Liu, Zhengyong Wang, Hong Yang, Xiaohai He, Haosong Gou, Chao Ren',
    venue: 'IEEE Transactions on Industrial Informatics (TII)',
    year: '2024',
    type: 'journal',
    impactFactor: 9.9,
    image: 'papers/TII-2025-Xiao Liu.webp', // Add your paper thumbnail image
    links: { pdf: 'https://ieeexplore.ieee.org/abstract/document/10949639', code: 'https://github.com/liux520/TSCN' },
  },
  {
    title: 'GBPG-Net: Global Background Prior-Guided Rain and Snow Image Restoration',
    authors: 'Xiao Liu, Xiaofeng Wang, Shouyi Wang, Haosong Gou, Zhengyong Wang, Chao Ren',
    venue: 'IEEE Transactions on Neural Networks and Learning Systems (TNNLS)',
    year: '2024',
    type: 'journal',
    impactFactor: 8.9,
    image: 'papers/TNNLS-2025-Xiao Liu.webp', // Add your paper thumbnail image
    links: { pdf: 'https://ieeexplore.ieee.org/abstract/document/11048715', code: 'https://github.com/liux520/GBPGNet' },
  },
  {
    title: 'DSRIR: Dynamic spatial refinement learning for progressive all-in-one image restoration',
    authors: 'Xiaofeng Wang, Xiao Liu, Yutong Yang, Zhengyong Wang, Xiaohai He, Honggang Chen, Yi Li, Pingyu Wang',
    venue: 'Information Processing & Management (IPM)',
    year: '2024',
    type: 'journal',
    impactFactor: 6.9,
    image: 'papers/paper1.webp', // Add your paper thumbnail image
    links: { pdf: 'https://www.sciencedirect.com/science/article/pii/S0306457325003218', code: 'https://github.com/xfwang23/DSRIR' },
  },
  {
    title: 'Degradation modeling for restoration-enhanced object detection in adverse weather scenes',
    authors: 'Xiaofeng Wang, Xiao Liu, Hong Yang, Zhengyong Wang, Xiaoyue Wen, Xiaohai He',
    venue: 'IEEE Transactions on Intelligent Vehicles (TIV)',
    year: '2024',
    type: 'journal',
    impactFactor: 14.3,
    image: 'papers/paper1.webp', // Add your paper thumbnail image
    links: { pdf: 'https://ieeexplore.ieee.org/document/10636782', code: 'https://github.com/xfwang23/RDMNet' },
  },
  {
    title: 'Efficient Parallel Multi-Scale Detail and Semantic Encoding Network for Lightweight Semantic Segmentation',
    authors: 'Xiao Liu, Xiuya Shi, Lufei Chen, Linbo Qing, Chao Ren',
    venue: 'ACM International Conference on Multimedia (ACMMM)',
    year: '2023',
    type: 'conference',
    ccfRank: 'A',
    image: 'papers/ACMMM-2023-Xiao Liu.webp', // Add your paper thumbnail image
    links: { pdf: 'https://dl.acm.org/doi/abs/10.1145/3581783.3611848', code: 'https://github.com/liux520/PMSDSEN' },
  },
  {
    title: 'Efficient Information Modulation Network for Image Super-Resolution',
    authors: 'Xiao Liu, Xiangyu Liao, Xiuya Shi, Linbo Qing, Chao Ren',
    venue: 'European Conference on Artificial Intelligence (ECAI)',
    year: '2023',
    type: 'conference',
    ccfRank: 'B',
    image: 'papers/ECAI-2023-Xiao Liu.webp', // Add your paper thumbnail image
    links: { pdf: 'https://ebooks.iospress.nl/doi/10.3233/FAIA230435', code: 'https://github.com/liux520/EIMN' },
  },
  {
    title: 'Random Sub-Samples Generation for Self-Supervised Real Image Denoising',
    authors: 'Yizhong Pan, Xiao Liu, Xiangyu Liao, Yuanzhouhan Cao, Chao Ren',
    venue: 'International Conference on Computer Vision (ICCV)',
    year: '2023',
    type: 'conference',
    ccfRank: 'A',
    image: 'papers/ICCV-2023-Yizhong Pan.webp', // Add your paper thumbnail image
    links: { pdf: 'https://openaccess.thecvf.com/content/ICCV2023/html/Pan_Random_Sub-Samples_Generation_for_Self-Supervised_Real_Image_Denoising_ICCV_2023_paper.html', code: '#', project: 'https://github.com/p1y2z3/SDAP' },
  },
  {
    title: 'CasaPuNet: Channel Affine Self-Attention- Based Progressively Updated Network for Real Image Denoising',
    authors: 'Jie Huang, Xiao Liu, Yizhong Pan, Xiaohai He, Chao Ren',
    venue: 'IEEE Transactions on Industrial Informatics (TII)',
    year: '2023',
    type: 'journal',
    impactFactor: 9.9,
    image: 'papers/TII-2022-Jie Huang.webp', // Add your paper thumbnail image
    links: { pdf: 'https://ieeexplore.ieee.org/document/9969152', code: 'https://github.com/chaoren88/CasaPuNet' },
  },
  {
    title: 'Unsupervised Image Denoising in Real-World Scenarios via Self-Collaboration Parallel Generative Adversarial Branches',
    authors: 'Xin Lin, Chao Ren*, Xiao Liu, Jie Huang, Yinjie Lei',
    venue: 'International Conference on Computer Vision (ICCV)',
    year: '2023',
    type: 'conference',
    ccfRank: 'A',
    image: 'papers/ICCV-2023-Xin Lin.webp', // Add your paper thumbnail image
    links: { pdf: 'https://openaccess.thecvf.com/content/ICCV2023/html/Lin_Unsupervised_Image_Denoising_in_Real-World_Scenarios_via_Self-Collaboration_Parallel_Generative_ICCV_2023_paper.html', code: 'https://github.com/linxin0/SCPGabNet' },
  },
]

// award | grant | service
const honors = [
  {
    title: 'Sichuan University Academic Star',
    organization: 'Sichuan University',
    year: '2025',
    category: 'award' as const,
  },
  {
    title: 'Yanbao Scholarship',
    organization: 'Baofeng Group Co., Ltd.',
    year: '2025',
    category: 'award' as const,
  },
  {
    title: 'Outstanding Graduate Student',
    organization: 'Sichuan University',
    year: '2024',
    category: 'award' as const,
  },
  {
    title: 'Outstanding Graduate Thesis',
    organization: 'Sichuan University',
    year: '2024',
    // description: 'Awarded for outstanding master\'s thesis in Electronic Science and Technology.',
    category: 'award' as const,
  },
  {
    title: 'Xiaomi Scholarship',
    organization: 'Xiaomi Technology Co., Ltd.',
    year: '2024',
    category: 'award' as const,
  },
  {
    title: 'First Prize in the ICDT HUAWEI Terminal New Display Technology Competition',
    organization: 'ICDT and HUAWEI',
    year: '2023',
    description: 'First Prize in the Mobile Display Enhancement Track.',
    category: 'award' as const,
  },
]

const education = [
  {
    degree: 'Ph.D. in Information and Communication Engineering',
    institution: 'Sichuan of Technology',
    location: 'Chengdu, China',
    period: '2024 - 2028',
    advisor: 'Prof. Chao Ren',
    // thesis: 'Title of Doctoral Dissertation',
    description: 'Research focused on Computer Vision, Image Super-Resolution, and Its Applications',
  },
  {
    degree: 'M.S. in Electronic Science and Technology',
    institution: 'Sichuan University',
    location: 'Chengdu, China',
    period: '2021 - 2024',
    advisor: 'Prof. Zhengyong Wang and Prof. Chao Ren',
    thesis: 'Research on Super-Resolution and Semantic Segmentation for Real-World Degraded Images',
    description: 'Graduated with Outstanding Graduates and Outstanding Theses. Specialized in Computer Vision, Image Restoration, and Visual Understanding.',
  },
  {
    degree: 'B.S. in Electronic Science and Technology',
    institution: 'Chengdu University of Information Technology',
    location: 'Chengdu, China',
    period: '2017 - 2021',
    thesis: 'Study on the Magnetic Near-Neighbor Effect in Pt/YIG',
    description: 'Graduated with Outstanding Graduate. Focus on First Principles and Spintronics. ',
  },
]

const communications = [
  {
    role: 'Conference Reviewer',
    venue: 'CVPR, ACMMM, PRCV',
    description: 'Reviewed submissions for top-tier deep learning journals and conferences.',
  },
  {
    role: 'Journal Reviewer',
    venue: 'Scientific Reports, Neurcomputing, Visual Intelligence, Computer Vision and Image Understanding, Neurcomputing, Visual Intelligence, Scientific Reports, Neurcomputing, Visual Intelligence',
    description: 'Reviewed submissions for top-tier deep learning journals and conferences.',
  },
  // {
  //   role: 'Program Committee Member',
  //   venue: 'NeurIPS 2024, ICML 2024',
  //   description: 'Reviewed submissions for top-tier machine learning conferences.',
  // },
  // {
  //   role: 'Guest Editor',
  //   venue: 'Special Issue on Interpretable AI',
  //   journal: 'Journal of Machine Learning Research',
  //   description: 'Organizing special issue on interpretability in machine learning.',
  // },
  // {
  //   role: 'Invited Speaker',
  //   venue: 'AI Research Seminar Series',
  //   institution: 'Multiple Institutions',
  //   description: 'Delivered talks at various universities and research labs.',
  // },
  // {
  //   role: 'Conference Co-organizer',
  //   venue: 'Workshop on Robust AI',
  //   conference: 'NeurIPS 2023',
  //   description: 'Co-organized workshop focusing on robustness in AI systems.',
  // },
]

// Skills - Temporarily Commented Out
// const skills = [
//   { category: 'Machine Learning', items: ['Deep Learning', 'Computer Vision', 'NLP', 'Reinforcement Learning'], icon: Brain },
//   { category: 'Programming', items: ['Python', 'PyTorch', 'TensorFlow', 'C++', 'CUDA'], icon: Code },
//   { category: 'Research Areas', items: ['Interpretable AI', 'Federated Learning', 'Self-Supervised Learning', 'Graph Neural Networks'], icon: Cpu },
//   { category: 'Tools & Frameworks', items: ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'Cloud Computing'], icon: Zap },
// ]

function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('profile')

  useEffect(() => {
    const sections = navItems.map(item => item.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a
              href="#"
              className="text-xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary-500" />
                Research Portfolio
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.href.slice(1)
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 lg:hidden glass"
        >
          <div className="flex flex-col items-center justify-center h-full gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-3 rounded-full text-lg font-medium flex items-center gap-3 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

// Hero Section with Background Image Carousel - Premium Redesign
function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Background images - Update these paths with your actual images
  const backgroundImages = [
    {
      url: '/images/scu-1.webp',
      title: 'Campus'
    },
    {
      url: '/images/scu-4.webp',
      title: 'Campus'
    },
    {
      url: '/images/scu-2.webp',
      title: 'Campus'
    },
    {
      url: '/images/scu-3.webp',
      title: 'Campus'
    },
    {
      url: '/images/my-1.webp',
      title: 'Campus'
    },
    {
      url: '/images/my-2.webp',
      title: 'Campus'
    },
    {
      url: '/images/my-3.webp',
      title: 'Campus'
    },
    // {
    //   url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
    //   title: 'AI Research Lab'
    // }
  ]

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % backgroundImages.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.1,
            }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Multi-layer gradient overlay for depth - refined indigo tones */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-primary-950/75 to-slate-950/90" />
            {/* Radial vignette with indigo tint */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(30,27,75,0.4)_100%)]" />
          </motion.div>
        ))}
      </div>

      {/* Decorative animated gradient orb - Deep Indigo palette */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/10 rounded-full blur-3xl"
      />

      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 20 }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto mb-4 sm:mb-6 lg:mb-8"
          >
            {/* Animated ring - Deep Indigo gradient */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full p-1"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />
            </motion.div>

            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-xl overflow-hidden">
               {/*<User className="w-16 h-16 sm:w-20 sm:h-20 text-slate-600 dark:text-slate-300" /> */}
               <Image
                  src="/images/my-66.webp"
                  alt="Xiao Liu"
                  fill
                  className="object-cover"
                  priority
               />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight"
          >
            <span className="text-white drop-shadow-lg">Xiao Liu</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm sm:text-base text-slate-200 mb-2 tracking-wide font-medium"
          >
            Computer Vision Learner and Researcher
          </motion.p>

          {/* Institution */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6 lg:mb-8 tracking-wide"
          >
            <span className="hidden sm:inline">College of Electronics and Information Engineering</span>
            <span className="inline sm:hidden">Sichuan University</span>
            <span className="mx-2 text-slate-500">|</span>
            PhD
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-6 sm:mb-8 lg:mb-10"
          >
            {/* View Publications Button - Commented Out */}
            {/* <a
              href="#publications"
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                View Publications
              </span>
            </a> */}
            {/* Contact Me Button - Commented Out */}
            {/* <a
              href="mailto:your.email@university.edu"
              className="px-6 py-3 bg-white/10 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a> */}
          </motion.div>

          {/* Social Icons with Tooltips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="inline-flex items-center gap-3 sm:gap-5"
          >
            {socialLinks.map((social, index) => (
              <SocialIconItem key={social.label} social={social} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Image Thumbnails - Bottom Right - Redesigned */}
      <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-20 hidden sm:block">
        <div className="flex flex-col gap-2 items-end">
          {/* Navigation arrows */}
          <div className="flex gap-1 p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            <button
              onClick={goToPrev}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={goToNext}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails - aligned with arrows width */}
          <div className="flex flex-col gap-1.5">
            {backgroundImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-primary-400 scale-105 shadow-lg shadow-primary-400/30'
                    : 'border-white/20 opacity-50 hover:opacity-80 hover:border-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}: ${image.title}`}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {/* Active indicator */}
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary-400/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Slide number */}
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-white text-[10px] font-medium">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Progress bar - Deep Indigo gradient */}
          <div className="w-20 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              key={currentIndex}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator - Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-8 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/10" />
    </section>
  )
}

function Profile() {
  return (
    <section id="profile" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo">About Me</h2>
          </div>

          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-card border border-slate-200/50 dark:border-slate-700/40 hover:shadow-card-lg transition-all duration-400 ease-premium">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-justify">
              Hi, I am Xiao Liu, a Ph.D. candidate at Sichuan University. My research lies in artificial intelligence and computer vision, with a focus on real-world image restoration and enhancement.
              My work centers on addressing fundamental challenges in complex degradation modeling, efficient neural architecture design, and high-quality image reconstruction under low-compute constraints. I aim to develop unified frameworks that bridge theoretical modeling and practical deployment, with particular emphasis on real-scene image enhancement and lightweight vision systems.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-justify">
              I have published six first-author papers in leading international journals and conferences, including IEEE Transactions on Pattern Analysis and Machine Intelligence, IEEE Transactions on Neural Networks and Learning Systems, IEEE Transactions on Industrial Informatics, and Knowledge-Based Systems, as well as ACM Multimedia (CCF-A) and the European Conference on Artificial Intelligence (CCF-B).
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              For more details, please refer to my <a href="#" className="text-primary-600 hover:text-primary-700 underline underline-offset-2">CV</a>.
            </p>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Artificial Intelligence',
                  'Computer Vision',
                  'Self-Supervised Learning',
                  'Un-Supervised Learning',
                  'AI for Healthcare',
                  'Low-level Vision Tasks',
                  'Visual Perception and Understanding',
                  'VLM'
                ].map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700/70 transition-colors duration-300 hover:border-primary-300 dark:hover:border-primary-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills - Temporarily Commented Out */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-gradient">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="glass rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <skillGroup.icon className="w-6 h-6 text-primary-500" />
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {skillGroup.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}

function News() {
  const getTypeStyles = (type: string) => {
    const styles = {
      publication: 'from-primary-500 to-primary-600',
      talk: 'from-primary-400 to-accent-500',
      award: 'from-award-500 to-award-600',
      grant: 'from-success-500 to-success-600',
    }
    return styles[type as keyof typeof styles] || 'from-slate-500 to-slate-600'
  }

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary-50/30 dark:to-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo">Latest News</h2>
          </div>

          {/* Scrollable news container */}
          <div className="max-h-[400px] sm:max-h-[400px] overflow-y-auto pr-2 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-card hover:shadow-card-lg transition-all duration-400 ease-premium relative overflow-hidden group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getTypeStyles(item.type)}`} />
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`flex-shrink-0 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-gradient-to-br ${getTypeStyles(item.type)} text-white text-[10px] sm:text-xs font-semibold`}>
                    <span className="hidden sm:inline">{item.date}</span>
                    <span className="inline sm:hidden">
                      {item.date.split(' ')[0]?.substring(0, 3)} {item.date.split(' ')[1]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-primary-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 text-center"
          >
            {navLinksConfig.news.enabled ? (
              <a
                href="/news"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
              >
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
                View all news
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 text-slate-500 dark:text-slate-400 rounded-full font-medium cursor-not-allowed opacity-60 text-sm sm:text-base"
              >
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
                View all news
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Publications() {
  const [filter, setFilter] = useState<'all' | 'journal' | 'conference'>('all')

  const filteredPublications = publications.filter(
    (pub) => filter === 'all' || pub.type === filter
  )

  // Default placeholder for papers without images
  const DefaultPaperIcon = () => (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center">
      <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500" />
    </div>
  )

  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo">Publications</h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {(['all', 'journal', 'conference'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:shadow-md'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredPublications.map((pub, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-card-lg transition-all duration-400 ease-premium group overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Paper Image - Left Side / Top on Mobile */}
                    <div className="flex-shrink-0 w-full h-32 sm:w-40 sm:h-28 lg:w-48 lg:h-36 flex items-center justify-center order-1 sm:order-none">
                      {pub.image ? (
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
                          <Image
                            src={pub.image}
                            alt={pub.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 160px, 192px"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>
                      )}
                    </div>

                    {/* Paper Info - Right Side / Bottom on Mobile */}
                    <div className="flex-1 min-w-0 order-2 sm:order-none">
                      {pub.award && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-award-500 to-award-600 text-white text-xs font-semibold shadow-sm">
                            <Award className="w-3 h-3" />
                            {pub.award}
                          </span>
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {pub.title}
                      </h3>

                      <p
                        className="text-sm text-slate-600 dark:text-slate-400 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: pub.authors.replace(
                            'Xiao Liu',
                            '<strong class="text-slate-900 dark:text-slate-200 font-semibold">Xiao Liu</strong>'
                          ),
                        }}
                      />

                      <div className="flex items-center flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 mb-3">
                        <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {pub.venue} ({pub.year})
                        </p>
                        {/* Type Badge: Journal or Conference */}
                        <span
                          className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold border ${
                            pub.type === 'journal'
                              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800/30'
                              : 'bg-slate-100 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {pub.type === 'journal' ? (
                            <>
                              <span className="text-primary-400 text-[10px] sm:text-xs">📄</span>
                              Journal
                            </>
                          ) : (
                            <>
                              <span className="text-slate-400 text-[10px] sm:text-xs">📋</span>
                              Conference
                            </>
                          )}
                        </span>
                        {/* Impact Factor Badge (for journals) */}
                        {pub.type === 'journal' && pub.impactFactor && (
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-award-50 dark:bg-award-950/40 text-award-600 dark:text-award-400 text-[10px] sm:text-xs font-semibold border border-award-200 dark:border-award-800/30">
                            <span className="text-award-400 text-[10px] sm:text-xs">★</span>
                            IF {pub.impactFactor}
                          </span>
                        )}
                        {/* CCF Rank Badge (for conferences) */}
                        {pub.type === 'conference' && pub.ccfRank && (
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-award-50 dark:bg-award-950/40 text-award-600 dark:text-award-400 text-[10px] sm:text-xs font-semibold border border-award-200 dark:border-award-800/30">
                            <span className="text-award-400 text-[10px] sm:text-xs">★</span>
                            CCF {pub.ccfRank}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {pub.links.pdf && (
                          <a
                            href={pub.links.pdf}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white transition-all duration-300 text-xs font-medium"
                          >
                            <Download className="w-3.5 h-3.5" />
                            PDF
                          </a>
                        )}
                        {pub.links.code && (
                          <a
                            href={pub.links.code}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white transition-all duration-300 text-xs font-medium"
                          >
                            <Code className="w-3.5 h-3.5" />
                            Code
                          </a>
                        )}
                        {pub.links.project && (
                          <a
                            href={pub.links.project}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white transition-all duration-300 text-xs font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            {navLinksConfig.publications.enabled ? (
              <a
                href="/publications"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <BookOpen className="w-5 h-5" />
                View All Publications
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 text-slate-500 dark:text-slate-400 rounded-full font-medium cursor-not-allowed opacity-60"
              >
                <BookOpen className="w-5 h-5" />
                View All Publications
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Honors() {
  const categoryConfig = {
    award: {
      label: 'Award',
      bgGradient: 'from-award-400 to-award-500',
      bgLight: 'bg-award-50 dark:bg-award-950/40',
      textLight: 'text-award-600 dark:text-award-400',
      borderLight: 'border-award-200 dark:border-award-800/30',
    },
    grant: {
      label: 'Grant',
      bgGradient: 'from-success-400 to-success-500',
      bgLight: 'bg-success-50 dark:bg-success-950/40',
      textLight: 'text-success-600 dark:text-success-400',
      borderLight: 'border-success-200 dark:border-success-800/30',
    },
    service: {
      label: 'Service',
      bgGradient: 'from-slate-500 to-slate-600',
      bgLight: 'bg-slate-100 dark:bg-slate-900/70',
      textLight: 'text-slate-600 dark:text-slate-300',
      borderLight: 'border-slate-200 dark:border-slate-800',
    },
  }

  return (
    <section id="honors" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-100/70 dark:to-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo">Honors & Awards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {honors.map((honor, index) => {
              const config = categoryConfig[honor.category || 'award']
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-all duration-400 ease-premium"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${config.bgGradient} flex items-center justify-center shadow-md`}>
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 ${config.bgLight} ${config.textLight} text-xs font-semibold rounded-md border ${config.borderLight}`}>
                          {config.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                        {honor.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-2">
                        {honor.organization}
                      </p>
                      <p className="text-slate-500 dark:text-slate-500 text-sm flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        {honor.year}
                      </p>
                      {honor.description && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {honor.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            {navLinksConfig.honors.enabled ? (
              <a
                href="/honors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-award-500 to-award-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 ease-premium"
              >
                <Award className="w-5 h-5" />
                View More Honors & Awards
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 text-slate-500 dark:text-slate-400 rounded-full font-medium cursor-not-allowed opacity-60"
              >
                <Award className="w-5 h-5" />
                View More Honors & Awards
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo">Education</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 hidden sm:block" />

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative pl-0 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 border-4 border-white dark:border-slate-900 shadow-lg hidden sm:block" />

                  <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-all duration-400 ease-premium">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold">
                        {edu.period}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      {edu.degree}
                    </h3>

                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {edu.institution}
                    </p>

                    {edu.advisor && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        <span className="font-medium">Advisor:</span> {edu.advisor}
                      </p>
                    )}

                    {/* Thesis field - uncomment when needed */}
                    {edu.thesis && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                        <span className="font-medium">Thesis:</span> {edu.thesis}
                      </p>
                    )}

                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Communications() {
  return (
    <section id="communications" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary-50/30 dark:to-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo">Academic Service & Communications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communications.map((comm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-all duration-400 ease-premium"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {comm.role}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-1">
                      {comm.venue}
                    </p>
                    {comm.description && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {comm.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            {navLinksConfig.service.enabled ? (
              <a
                href="/service"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Users className="w-5 h-5" />
                View More Academic Service & Communications
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 text-slate-500 dark:text-slate-400 rounded-full font-medium cursor-not-allowed opacity-60"
              >
                <Users className="w-5 h-5" />
                View More Academic Service & Communications
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-950 via-slate-950 to-primary-950">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Xiao Liu</h3>
            <p className="text-slate-400">
              PhD, Sichuan University
            </p>
            {/*<p className="text-slate-400">*/}
            {/*  University of Technology*/}
            {/*</p>*/}
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800/50 text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-premium flex items-center justify-center hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Xiao Liu. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, Tailwind CSS, and Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}

// Social icon item component - hooks must be at component top level
function SocialIconItem({ social, index }: { social: typeof socialLinks[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTooltipHovered, setIsTooltipHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsTooltipHovered(false)
      }}
    >
      <motion.a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-300"
      >
        <social.icon className="w-5 h-5" />
      </motion.a>

      {/* Tooltip - positioned closer to icon */}
      {(isHovered || isTooltipHovered) && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-30"
          onMouseEnter={() => setIsTooltipHovered(true)}
          onMouseLeave={() => setIsTooltipHovered(false)}
        >
          {/* Tooltip content - selectable */}
          <div className="relative px-2.5 py-1 bg-slate-900 dark:bg-slate-800 text-white text-[10px] sm:text-xs rounded shadow-lg whitespace-nowrap select-text cursor-text">
            {social.href}
            {/* Arrow - tip points exactly to icon center */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-l-transparent border-r-transparent border-b-slate-900 dark:border-b-slate-800" />
          </div>
        </div>
      )}
    </div>
  )
}

// Home page component
export default function Home() {
  const activeSection = useScrollSpy()

  return (
    <main className="min-h-screen">
      <Navbar activeSection={activeSection} />
      <Hero />
      <Profile />
      <News />
      <Publications />
      <Honors />
      <Communications />
      <Education />
      <Footer />
    </main>
  )
}
