'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { Check, ClipboardCopy, Quote } from 'lucide-react'
import type { PublicationCitation } from '../publicationCitations'

interface CiteButtonProps {
  citation: PublicationCitation
  title: string
}

type CitationFormat = keyof PublicationCitation

const citationSections: Array<{ key: CitationFormat; label: string }> = [
  { key: 'standard', label: 'Standard' },
  { key: 'fullAuthor', label: 'Full author' },
  { key: 'bibtex', label: 'BibTeX' },
]

export default function CiteButton({ citation, title }: CiteButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [copyStatus, setCopyStatus] = useState<{ key?: CitationFormat; error?: boolean }>({})
  const [panelStyle, setPanelStyle] = useState<CSSProperties | null>(null)
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const panelId = useId()
  const isOpen = isHovered || isPinned

  const cancelClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    setIsHovered(true)
  }

  const scheduleClose = () => {
    closeTimerRef.current = window.setTimeout(() => setIsHovered(false), 120)
  }

  const updatePanelPosition = () => {
    const button = buttonContainerRef.current?.getBoundingClientRect()
    if (!button) return

    const margin = 16
    const gap = 8
    const width = Math.min(672, window.innerWidth - margin * 2)
    const left = Math.min(
      Math.max(margin, button.left),
      window.innerWidth - width - margin
    )
    const spaceBelow = window.innerHeight - button.bottom - gap - margin
    const spaceAbove = button.top - gap - margin

    if (spaceBelow >= 320 || spaceBelow >= spaceAbove) {
      setPanelStyle({
        left,
        top: button.bottom + gap,
        width,
        maxHeight: Math.max(160, spaceBelow),
      })
    } else {
      setPanelStyle({
        bottom: window.innerHeight - button.top + gap,
        left,
        width,
        maxHeight: Math.max(160, spaceAbove),
      })
    }
  }

  useLayoutEffect(() => {
    if (isOpen) updatePanelPosition()
    else setPanelStyle(null)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const closePanel = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !buttonContainerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setIsPinned(false)
        setIsHovered(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPinned(false)
        setIsHovered(false)
      }
    }

    document.addEventListener('pointerdown', closePanel)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', updatePanelPosition)
    window.addEventListener('scroll', updatePanelPosition, true)
    return () => {
      document.removeEventListener('pointerdown', closePanel)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', updatePanelPosition)
      window.removeEventListener('scroll', updatePanelPosition, true)
    }
  }, [isOpen])

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
  }, [])

  const copyCitation = async (key: CitationFormat) => {
    const text = citation[key]
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      setCopyStatus({ key })
      window.setTimeout(() => setCopyStatus({}), 1800)
    } catch {
      setCopyStatus({ key, error: true })
      window.setTimeout(() => setCopyStatus({}), 1800)
    }
  }

  const panel = isOpen && panelStyle ? createPortal(
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-label={`Citation formats for ${title}`}
      style={{ ...panelStyle, zIndex: 9999 }}
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
      className="fixed overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-3 border-b border-slate-200 pb-3 dark:border-slate-700">
        <p className="pr-2 text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">
          Cite this publication
        </p>
        <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{title}</p>
      </div>

      <div className="space-y-3">
        {citationSections.map(({ key, label }) => {
          const isCurrentStatus = copyStatus.key === key
          return (
            <section key={key} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200">{label}</h3>
                <button
                  type="button"
                  onClick={() => copyCitation(key)}
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  {isCurrentStatus && !copyStatus.error ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="h-3.5 w-3.5" />
                      {isCurrentStatus && copyStatus.error ? 'Copy failed' : 'Copy'}
                    </>
                  )}
                </button>
              </div>
              {key === 'bibtex' ? (
                <pre className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                  <code>{citation[key]}</code>
                </pre>
              ) : (
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {citation[key]}
                </p>
              )}
            </section>
          )
        })}
      </div>
    </div>,
    document.body
  ) : null

  return (
    <div
      ref={buttonContainerRef}
      className="relative"
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`Cite ${title}`}
        onClick={() => {
          setIsPinned((current) => !current)
          setIsHovered(false)
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-500 hover:text-white transition-all duration-300 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
      >
        <Quote className="w-3.5 h-3.5" />
        Cite
      </button>
      {panel}
    </div>
  )
}
