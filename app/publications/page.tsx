'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ArrowLeft, ExternalLink, Download, Code, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
  abstract?: string
  links: {
    pdf?: string
    code?: string
    project?: string
  }
}

const allPublications: Publication[] = [
  {
    title: 'D2S-RSG-SSD: Dual Double-Sampling with Random Sub-Samples Generation for Self-Supervised Real Image Denoising',
    authors: 'Xiao Liu, Xiuya Shi, Yizhong Pan, Shuhang Gu, Wei Liu, Chao Ren',
    venue: 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)',
    year: '2026',
    type: 'journal',
    impactFactor: 18.6,
    // award: 'most',
    image: 'papers/TPAMI-2025-Xiao Liu.webp',
    abstract: 'This paper proposes a novel synthetic degradation pipeline for real-world blind image super-resolution, using mixed and probabilistic schemes to better model complex real-world degradations.',
    links: { pdf: 'https://www.sciencedirect.com/science/article/abs/pii/S095070512501682X', code: 'https://github.com/liux520/D2S-RSG-SSD' },
  },
  {
    title: 'Real-world blind image super-resolution with mixed and probabilistic scheme based synthetic degradation pipeline',
    authors: 'Xiao Liu, Xiaofeng Wang, Zhengyong Wang, Xiaohai He, Chao Ren',
    venue: 'Knowledge-Based Systems (KBS)',
    year: '2025',
    type: 'journal',
    impactFactor: 7.6,
    image: 'papers/KBS-2025-Xiao Liu.webp',
    abstract: 'This paper proposes a novel synthetic degradation pipeline for real-world blind image super-resolution, using mixed and probabilistic schemes to better model complex real-world degradations.',
    links: { pdf: 'https://www.sciencedirect.com/science/article/abs/pii/S095070512501682X' },
  },
  {
    title: 'Transformer-Style Convolutional Network for Efficient Natural and Industrial Image Superresolution',
    authors: 'Xiao Liu, Zhengyong Wang, Hong Yang, Xiaohai He, Haosong Gou, Chao Ren',
    venue: 'IEEE Transactions on Industrial Informatics (TII)',
    year: '2025',
    type: 'journal',
    impactFactor: 9.9,
    image: 'papers/TII-2025-Xiao Liu.webp',
    abstract: 'A transformer-style convolutional network that efficiently handles natural and industrial image super-resolution tasks with improved performance and reduced computational cost.',
    links: { pdf: 'https://ieeexplore.ieee.org/abstract/document/10949639', code: 'https://github.com/liux520/TSCN' },
  },
  {
    title: 'GBPG-Net: Global Background Prior-Guided Rain and Snow Image Restoration',
    authors: 'Xiao Liu, Xiaofeng Wang, Shouyi Wang, Haosong Gou, Zhengyong Wang, Chao Ren',
    venue: 'IEEE Transactions on Neural Networks and Learning Systems (TNNLS)',
    year: '2025',
    type: 'journal',
    impactFactor: 8.9,
    image: 'papers/TNNLS-2025-Xiao Liu.webp',
    abstract: 'Global Background Prior-Guided Network for effective rain and snow image restoration, leveraging global background priors to improve restoration quality.',
    links: { pdf: 'https://ieeexplore.ieee.org/abstract/document/11048715', code: 'https://github.com/liux520/GBPG-Net' },
  },
  {
    title: 'DSRIR: Dynamic spatial refinement learning for progressive all-in-one image restoration',
    authors: 'Xiaofeng Wang, Xiao Liu, Yutong Yang, Zhengyong Wang, Xiaohai He, Honggang Chen, Yi Li, Pingyu Wang',
    venue: 'Information Processing & Management (IPM)',
    year: '2025',
    type: 'journal',
    impactFactor: 6.9,
    image: 'papers/KBS-2025-Xiao Liu.webp',
    abstract: 'Dynamic spatial refinement learning for progressive all-in-one image restoration, achieving state-of-the-art results on multiple restoration benchmarks.',
    links: { pdf: 'https://www.sciencedirect.com/science/article/pii/S0306457325003218', code: 'https://github.com/xfwang23/DSRIR' },
  },
  {
    title: 'Degradation modeling for restoration-enhanced object detection in adverse weather scenes',
    authors: 'Xiaofeng Wang, Xiao Liu, Hong Yang, Zhengyong Wang, Xiaoyue Wen, Xiaohai He',
    venue: 'IEEE Transactions on Intelligent Vehicles (TIV)',
    year: '2025',
    type: 'journal',
    impactFactor: 14.3,
    image: 'papers/KBS-2025-Xiao Liu.webp',
    abstract: 'Degradation modeling approach for restoration-enhanced object detection in adverse weather scenes, significantly improving detection performance under challenging conditions.',
    links: { pdf: 'https://ieeexplore.ieee.org/document/10636782', code: 'https://github.com/xfwang23/RDMNet' },
  },
  {
    title: 'Efficient Parallel Multi-Scale Detail and Semantic Encoding Network for Lightweight Semantic Segmentation',
    authors: 'Xiao Liu, Xiuya Shi, Lufei Chen, Linbo Qing, Chao Ren',
    venue: 'ACM International Conference on Multimedia (ACM MM)',
    year: '2023',
    type: 'conference',
    ccfRank: 'A',
    image: 'papers/ACMMM-2023-Xiao Liu.webp',
    abstract: 'An efficient parallel multi-scale network for lightweight semantic segmentation, balancing accuracy and computational efficiency.',
    links: { pdf: 'https://dl.acm.org/doi/abs/10.1145/3581783.3611848', code: 'https://github.com/liux520/PMSDSEN' },
  },
  {
    title: 'Efficient Information Modulation Network for Image Super-Resolution',
    authors: 'Xiao Liu, Xiangyu Liao, Xiuya Shi, Linbo Qing, Chao Ren',
    venue: 'European Conference on Artificial Intelligence (ECAI)',
    year: '2023',
    type: 'conference',
    ccfRank: 'B',
    image: 'papers/ECAI-2023-Xiao Liu.webp',
    abstract: 'Efficient Information Modulation Network for image super-resolution, achieving competitive results with reduced parameters.',
    links: { pdf: 'https://ebooks.iospress.nl/doi/10.3233/FAIA230435', code: 'https://github.com/liux520/EIMN' },
  },
  {
    title: 'Random Sub-Samples Generation for Self-Supervised Real Image Denoising',
    authors: 'Yizhong Pan, Xiao Liu, Xiangyu Liao, Yuanzhouhan Cao, Chao Ren',
    venue: 'International Conference on Computer Vision (ICCV)',
    year: '2023',
    type: 'conference',
    ccfRank: 'A',
    image: 'papers/ICCV-2023-Yizhong Pan.webp',
    abstract: 'Random sub-samples generation approach for self-supervised real image denoising, achieving state-of-the-art denoising performance.',
    links: { pdf: 'https://openaccess.thecvf.com/content/ICCV2023/html/Pan_Random_Sub-Samples_Generation_for_Self-Supervised_Real_Image_Denoising_ICCV_2023_paper.html', project: 'https://github.com/p1y2z3/SDAP' },
  },
  {
    title: 'CasaPuNet: Channel Affine Self-Attention- Based Progressively Updated Network for Real Image Denoising',
    authors: 'Jie Huang, Xiao Liu, Yizhong Pan, Xiaohai He, Chao Ren',
    venue: 'IEEE Transactions on Industrial Informatics (TII)',
    year: '2023',
    type: 'journal',
    impactFactor: 9.9,
    image: 'papers/TII-2022-Jie Huang.webp',
    abstract: 'Channel Affine Self-Attention-based progressively updated network for real image denoising with superior performance.',
    links: { pdf: 'https://ieeexplore.ieee.org/document/9969152', code: 'https://github.com/chaoren88/CasaPuNet' },
  },
  {
    title: 'Unsupervised Image Denoising in Real-World Scenarios via Self-Collaboration Parallel Generative Adversarial Branches',
    authors: 'Xin Lin, Chao Ren*, Xiao Liu, Jie Huang, Yinjie Lei',
    venue: 'International Conference on Computer Vision (ICCV)',
    year: '2023',
    type: 'conference',
    ccfRank: 'A',
    image: 'papers/ICCV-2023-Xin Lin.webp',
    abstract: 'Self-collaboration parallel generative adversarial branches for unsupervised real-world image denoising.',
    links: { pdf: 'https://openaccess.thecvf.com/content/ICCV2023/html/Lin_Unsupervised_Image_Denoising_in_Real-World_Scenarios_via_Self-Collaboration_Parallel_Generative_ICCV_2023_paper.html', code: 'https://github.com/linxin0/SCPGabNet' },
  },
]

const DefaultPaperIcon = () => (
  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center">
    <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500" />
  </div>
)

export default function PublicationsPage() {
  const [filter, setFilter] = useState<'all' | 'journal' | 'conference'>('all')

  const filteredPublications = allPublications.filter(
    (pub) => filter === 'all' || pub.type === filter
  )

  const journalCount = allPublications.filter(pub => pub.type === 'journal').length
  const conferenceCount = allPublications.filter(pub => pub.type === 'conference').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/70 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="inline sm:hidden">Back</span>
          </Link>
          <h1 className="text-base sm:text-xl font-bold text-gradient-indigo">All Publications</h1>
        </div>
      </motion.header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        {/* Page Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 font-display">
            Publications
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of my research work published in leading journals and conferences.
            Topics include Computer Vision, Image Restoration, and Super-Resolution.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto"
        >
          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-2 sm:p-4 text-center shadow-card">
            <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
              {allPublications.length}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Total</div>
          </div>
          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-2 sm:p-4 text-center shadow-card">
            <div className="text-xl sm:text-2xl font-bold text-primary-500">
              {journalCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Journals</div>
          </div>
          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-2 sm:p-4 text-center shadow-card">
            <div className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
              {conferenceCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Conf</div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 flex-wrap"
        >
          {(['all', 'journal', 'conference'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-400 ease-premium text-xs sm:text-sm ${
                filter === filterType
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md'
              }`}
            >
              {filterType === 'all' && `All (${allPublications.length})`}
              {filterType === 'journal' && `Journal (${journalCount})`}
              {filterType === 'conference' && `Conf (${conferenceCount})`}
            </button>
          ))}
        </motion.div>

        {/* Publications List */}
        <AnimatePresence mode="popLayout">
          {filteredPublications.map((pub, index) => (
            <motion.article
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-card-lg transition-all duration-400 ease-premium group overflow-hidden mb-4 sm:mb-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Paper Image - Top on Mobile / Left Side on Desktop */}
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

                {/* Paper Info - Bottom on Mobile / Right Side on Desktop */}
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
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb mb-2"
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
                          Conf
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

                  {/* Abstract */}
                  {pub.abstract && (
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-3 line-clamp-2">
                      {pub.abstract}
                    </p>
                  )}

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
            </motion.article>
          ))}
        </AnimatePresence>
      </main>
    </div>
  )
}
