import { useRef, useCallback } from 'react'

export const usePDFGenerator = (language: 'en' | 'es') => {
  const cvRef = useRef<HTMLDivElement>(null)

  const generatePDF = useCallback(() => {
    if (cvRef.current && typeof window !== 'undefined') {
      import('html2pdf.js').then(html2pdf => {
        html2pdf.default().from(cvRef.current).save(`cv_${language}.pdf`)
      }).catch(err => console.error('Error loading html2pdf:', err))
    }
  }, [language])

  return { generatePDF, cvRef }
}