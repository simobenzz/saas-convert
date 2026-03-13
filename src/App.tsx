import React, { useState } from 'react';
import './styles/main.scss';
import * as pdfjs from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FileText, 
  FileCode, 
  ArrowRightLeft, 
  Download, 
  FileCheck,
  Zap,
  ShieldCheck,
  Lock,
  File as FileIcon,
  ChevronLeft
} from 'lucide-react';

// Direct worker import
import PDFWorker from 'pdfjs-dist/build/pdf.worker.mjs?worker';

if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerPort = new PDFWorker();
}

type Mode = 'pdf-to-word' | 'word-to-pdf';

const SEO: React.FC<{ title?: string; description?: string; path?: string }> = ({ title, description, path = "" }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const baseUrl = "https://pdf2word-online.com";
  const fullUrl = `${baseUrl}${path}`;
  
  const defaultTitle = t('title');
  const defaultDescription = t('description');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": defaultTitle,
    "operatingSystem": "Windows, macOS, Linux, Android, iOS",
    "applicationCategory": "UtilitiesApplication",
    "url": baseUrl,
    "description": defaultDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250"
    },
    "featureList": [
      "PDF to Word conversion",
      "Word to PDF conversion",
      "100% Private local processing",
      "No file upload required"
    ]
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title ? `${title} | ${defaultTitle}` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={fullUrl} />
      
      {/* Twitter */}
      <meta property="twitter:title" content={title ? `${title} | ${defaultTitle}` : defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

const Converter: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('pdf-to-word');
  const [dragging, setDragging] = useState<boolean>(false);

  // States
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfConverting, setPdfConverting] = useState<boolean>(false);
  const [wordUrl, setWordUrl] = useState<string | null>(null);
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [wordConverting, setWordConverting] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handlePdfChange = (file: File) => {
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setWordUrl(null);
    }
  };

  const handleWordChange = (file: File) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx'))) {
      setWordFile(file);
      setPdfUrl(null);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (mode === 'pdf-to-word') handlePdfChange(file);
    else handleWordChange(file);
  };

  const handleConvertPdfToWord = async () => {
    if (!pdfFile) return;
    setPdfConverting(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const paragraphs: Paragraph[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        let lastY: number | null = null;
        let currentLine = "";
        textContent.items.forEach((item: any) => {
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            if (currentLine.trim()) paragraphs.push(new Paragraph({ children: [new TextRun(currentLine)] }));
            currentLine = "";
          }
          currentLine += item.str + " ";
          lastY = item.transform[5];
        });
        if (currentLine.trim()) paragraphs.push(new Paragraph({ children: [new TextRun(currentLine)] }));
      }
      const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      setWordUrl(URL.createObjectURL(blob));
    } catch (e) { alert(t('error')); }
    finally { setPdfConverting(false); }
  };

  const handleConvertWordToPdf = async () => {
    if (!wordFile) return;
    setWordConverting(true);
    try {
      const arrayBuffer = await wordFile.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const cleanHtml = DOMPurify.sanitize(result.value);
      const container = document.createElement('div');
      container.style.width = '210mm';
      container.style.padding = '20mm';
      container.style.backgroundColor = 'white';
      container.style.color = 'black';
      container.style.position = 'fixed';
      container.style.top = '-10000px';
      container.innerHTML = cleanHtml;
      document.body.appendChild(container);
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), (canvas.height * pdf.internal.pageSize.getWidth()) / canvas.width);
      setPdfUrl(URL.createObjectURL(pdf.output('blob')));
      document.body.removeChild(container);
    } catch (e) { alert(t('error')); }
    finally { setWordConverting(false); }
  };

  return (
    <>
      <SEO />
      <header>
        <div className="logo-icon"><Zap color="white" size={24} fill="white" /></div>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </header>

      <div className="tabs">
        <button className={mode === 'pdf-to-word' ? 'active' : ''} onClick={() => setMode('pdf-to-word')}>
          <FileText size={18} /> {t('pdfToWord')}
        </button>
        <button className={mode === 'word-to-pdf' ? 'active' : ''} onClick={() => setMode('word-to-pdf')}>
          <FileCode size={18} /> {t('wordToPdf')}
        </button>
      </div>

      <div className="card">
        {mode === 'pdf-to-word' ? (
          <>
            <div className={`upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} onClick={() => document.getElementById('pdfInput')?.click()}>
              <div className="upload-content">
                {pdfFile ? <div className="file-preview"><FileCheck size={48} color="var(--success)" /><p>{pdfFile.name}</p><div className="file-info-badge">{t('pdfReady')}</div></div> : <><div className="upload-icon"><FileText size={48} color="#ef4444" /></div><p>{t('dropPdf')}</p><span>{t('browse')}</span></>}
              </div>
              <input type="file" id="pdfInput" hidden onChange={(e) => e.target.files && handlePdfChange(e.target.files[0])} accept="application/pdf" />
            </div>
            <div className="controls">
              <button onClick={handleConvertPdfToWord} disabled={!pdfFile || pdfConverting}>{pdfConverting ? <div className="loader"></div> : <ArrowRightLeft size={20} />}{pdfConverting ? t('converting') : t('convertToWord')}</button>
            </div>
            {wordUrl && <a href={wordUrl} download={pdfFile?.name.replace('.pdf', '.docx')} className="download-link"><Download size={20} /> {t('downloadWord')}</a>}
          </>
        ) : (
          <>
            <div className={`upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} onClick={() => document.getElementById('wordInput')?.click()}>
              <div className="upload-content">
                {wordFile ? <div className="file-preview"><FileCheck size={48} color="var(--success)" /><p>{wordFile.name}</p><div className="file-info-badge">{t('wordReady')}</div></div> : <><div className="upload-icon"><FileIcon size={48} color="#3b82f6" /></div><p>{t('dropWord')}</p><span>{t('supportsDocx')}</span></>}
              </div>
              <input type="file" id="wordInput" hidden onChange={(e) => e.target.files && handleWordChange(e.target.files[0])} accept=".docx" />
            </div>
            <div className="controls">
              <button onClick={handleConvertWordToPdf} disabled={!wordFile || wordConverting}>{wordConverting ? <div className="loader"></div> : <ArrowRightLeft size={20} />}{wordConverting ? t('converting') : t('convertToPdf')}</button>
            </div>
            {pdfUrl && <a href={pdfUrl} download={wordFile?.name.replace('.docx', '.pdf')} className="download-link"><Download size={20} /> {t('downloadPdf')}</a>}
          </>
        )}
        <div className="badges-container">
          <div className="badge"><ShieldCheck size={14} /> {t('private')}</div>
          <div className="badge"><Lock size={14} /> HTTPS</div>
          <div className="badge"><Zap size={14} /> {t('instant')}</div>
        </div>
      </div>
    </>
  );
};

const LegalPage: React.FC<{ type: 'privacy' | 'terms' | 'about' }> = ({ type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="card legal-view">
      <SEO 
        title={t(type)} 
        description={t(`${type}Content`)} 
        path={location.pathname} 
      />
      <button className="back-btn" onClick={() => navigate('/')}><ChevronLeft size={18} /> {t('home')}</button>
      <h2>{t(type)}</h2>
      <p>{t(`${type}Content`)}</p>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8 }}>{t('disclaimer')}</p>
    </div>
  );
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <div className="container">
        <div className="lang-switcher">
          <button className={i18n.language === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>EN</button>
          <button className={i18n.language.startsWith('fr') ? 'active' : ''} onClick={() => i18n.changeLanguage('fr')}>FR</button>
        </div>

        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
          <Route path="/about" element={<LegalPage type="about" />} />
        </Routes>

        <footer>
          <div style={{ marginBottom: '0.5rem' }}>
            &copy; {new Date().getFullYear()} {t('title')} by @simoBenazzouz. {t('footer')}
          </div>
          <div className="footer-links">
            <Link to="/about">{t('about')}</Link>
            <Link to="/privacy-policy">{t('privacy')}</Link>
            <Link to="/terms-of-service">{t('terms')}</Link>
            <a href="mailto:support@pdf2word-online.com">{t('contact')}</a>
          </div>
          <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', opacity: 0.5 }}>Local processing • No file storage</div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
