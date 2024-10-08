'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, X, Gamepad2, Music } from 'lucide-react'
import Flag from './Flag'
import TerminalComponent from './TerminalComponent'
import ChessGame from './ChessGame'
import SpotifyTerminal from './SpotifyTerminal'
import { useLanguage } from '../hooks/useLanguage'
import { usePDFGenerator } from '../hooks/usePDFGenerator'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<'main' | 'terminal' | 'game' | 'spotify'>('main')
  const { language, toggleLanguage } = useLanguage()
  const { generatePDF, cvRef } = usePDFGenerator(language)

  const toggleSection = useCallback((section: 'main' | 'terminal' | 'game' | 'spotify') => {
    setActiveSection(prev => prev === section ? 'main' : section)
  }, [])

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-mono relative">
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggleLanguage} 
          className="language-button"
          aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          <Flag country={language === 'en' ? 'UK' : 'Spain'} />
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
                <div className="flex items-center p-4">
                  <div className="w-24 h-24 rounded-full bg-profile mr-4 flex-shrink-0" aria-label="Profile photo of Carmen Cruzado" />
                  <div className="text-white">
                    <h1 className="text-2xl font-bold mb-2">Carmen Cruzado</h1>
                    <p className="text-lg">{language === 'en' ? 'Machine Learning Engineer' : 'Ingeniera de Aprendizaje Automático'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 sm:p-3 md:p-4">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  <Link href="https://www.linkedin.com/in/carmen-cruzado/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="https://medium.com/@carcruz97" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sr-only">Medium</span>
                  </Link>
                  <Link href="https://x.com/carcruz97" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="https://replicate.com/carcruz97" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sr-only">Replicate</span>
                  </Link>
                  <Link href="https://calendly.com/carmencruzado97/data-ai" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sr-only">Calendar</span>
                  </Link>
                  <Link href="https://github.com/carcruz97/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <button onClick={generatePDF} className="social-icon" aria-label={language === 'en' ? "Download CV" : "Descargar CV"}>
                    <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button onClick={() => toggleSection('terminal')} className="social-icon" aria-label={language === 'en' ? "Open Terminal" : "Abrir Terminal"}>
                    <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button onClick={() => toggleSection('game')} className="social-icon" aria-label={language === 'en' ? "Play Chess Game" : "Jugar Ajedrez"}>
                    <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button onClick={() => toggleSection('spotify')} className="social-icon" aria-label={language === 'en' ? "Open Spotify Terminal" : "Abrir Terminal de Spotify"}>
                    <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeSection === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TerminalComponent onClose={() => toggleSection('main')} language={language} />
            </motion.div>
          )}

          {activeSection === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChessGame onClose={() => toggleSection('main')} language={language} />
            </motion.div>
          )}

          {activeSection === 'spotify' && (
            <motion.div
              key="spotify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpotifyTerminal onClose={() => toggleSection('main')} language={language} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden CV content for PDF generation */}
        <div className="hidden" ref={cvRef}>
          {/* CV content */}
        </div>
      </div>
    </div>
  )
}