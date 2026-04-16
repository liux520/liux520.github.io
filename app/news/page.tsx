'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

interface NewsItem {
  date: string
  title: string
  description: string
  type: 'publication' | 'talk' | 'award' | 'grant'
}

const allNews: NewsItem[] = [
  {
    date: 'January 2025',
    title: 'Paper accepted at CVPR 2025',
    description: 'Our research on deep learning for computer vision has been accepted for presentation at CVPR 2025.',
    type: 'publication',
  },
  {
    date: 'December 2024',
    title: 'Invited talk at AI Research Symposium',
    description: 'Delivered an invited presentation on recent advances in neural architecture design.',
    type: 'talk',
  },
  {
    date: 'November 2024',
    title: 'Best Paper Award at NeurIPS Workshop',
    description: 'Received the Best Paper Award for our work on efficient transformer architectures.',
    type: 'award',
  },
  {
    date: 'October 2024',
    title: 'New research grant awarded',
    description: 'Secured funding for research on interpretable machine learning systems.',
    type: 'grant',
  },
  {
    date: 'September 2024',
    title: 'Paper published in JMLR',
    description: 'Our journal paper on continual learning has been published in the Journal of Machine Learning Research.',
    type: 'publication',
  },
  {
    date: 'August 2024',
    title: 'Invited seminar at Stanford University',
    description: 'Presented our work on interpretable AI to the Stanford AI Lab.',
    type: 'talk',
  },
  {
    date: 'July 2024',
    title: 'Outstanding Reviewer Award',
    description: 'Recognized for exceptional reviewing contributions at ICML 2024.',
    type: 'award',
  },
  {
    date: 'June 2024',
    title: 'Collaboration with industry partner announced',
    description: 'Started a new research collaboration with a leading tech company on federated learning.',
    type: 'grant',
  },
  {
    date: 'May 2024',
    title: 'PhD student wins best poster award',
    description: 'Our PhD student won the best poster award at the CVPR 2024 student showcase.',
    type: 'award',
  },
  {
    date: 'April 2024',
    title: 'New paper on arXiv',
    description: 'Released a preprint on robust machine learning for safety-critical systems.',
    type: 'publication',
  },
]

const getTypeStyles = (type: string) => {
  const styles = {
    publication: 'from-blue-500 to-cyan-500',
    talk: 'from-primary-400 to-accent-500',
    award: 'from-amber-500 to-orange-500',
    grant: 'from-emerald-500 to-teal-500',
  }
  return styles[type as keyof typeof styles] || 'from-slate-500 to-slate-600'
}

const getTypeLabel = (type: string) => {
  const labels = {
    publication: 'Publication',
    talk: 'Talk',
    award: 'Award',
    grant: 'Grant',
  }
  return labels[type as keyof typeof labels] || 'News'
}

const typeColors = {
  publication: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  talk: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
  award: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  grant: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
}

export default function NewsPage() {
  const [filter, setFilter] = useState<'all' | 'publication' | 'talk' | 'award' | 'grant'>('all')

  const filteredNews = filter === 'all'
    ? allNews
    : allNews.filter(item => item.type === filter)

  const counts = {
    all: allNews.length,
    publication: allNews.filter(n => n.type === 'publication').length,
    talk: allNews.filter(n => n.type === 'talk').length,
    award: allNews.filter(n => n.type === 'award').length,
    grant: allNews.filter(n => n.type === 'grant').length,
  }

  // Group by year
  const newsByYear = filteredNews.reduce((acc, item) => {
    const year = item.date.split(' ')[1]
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(item)
    return acc
  }, {} as Record<string, NewsItem[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="inline sm:hidden">Back</span>
          </Link>
          <h1 className="text-base sm:text-xl font-bold text-gradient">All News</h1>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        {/* Page Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">
            Latest News
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Updates on publications, talks, awards, grants, and other research activities.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {counts.publication}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Publications</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-500">
              {counts.talk}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Talks</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-amber-500">
              {counts.award}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Awards</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-emerald-500">
              {counts.grant}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Grants</div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10"
        >
          {(['all', 'publication', 'talk', 'award', 'grant'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === filterType
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md'
              }`}
            >
              {filterType === 'all' && `All (${counts.all})`}
              {filterType === 'publication' && `Pubs (${counts.publication})`}
              {filterType === 'talk' && `Talks (${counts.talk})`}
              {filterType === 'award' && `Awards (${counts.award})`}
              {filterType === 'grant' && `Grants (${counts.grant})`}
            </button>
          ))}
        </motion.div>

        {/* News by Year */}
        <div className="space-y-8 sm:space-y-12">
          {Object.entries(newsByYear)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([year, yearNews], yearIndex) => (
              <motion.section
                key={year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIndex * 0.1 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">{year}</h3>
                  <span className="px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs sm:text-sm font-medium">
                    {yearNews.length}
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {yearNews.map((item, index) => {
                    const colors = typeColors[item.type]
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: yearIndex * 0.1 + index * 0.05 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getTypeStyles(item.type)}`} />
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`flex-shrink-0 px-2 sm:px-3 py-1.5 rounded-lg bg-gradient-to-br ${getTypeStyles(item.type)} text-white text-xs sm:text-sm font-semibold`}>
                            {item.date}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                              <span className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full ${colors.bg} ${colors.text}`}>
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.section>
            ))}
        </div>
      </main>
    </div>
  )
}
