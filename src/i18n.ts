import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "PDF to Word & Word to PDF Online - Free & Instant - PDF2WORD",
      description: "Convert PDF to Word and Word to PDF online for free. Fast, high-quality, and 100% private document conversion directly in your browser. No software installation needed.",
      pdfToWord: "PDF to Word",
      wordToPdf: "Word to PDF",
      dropPdf: "Drop your PDF here",
      dropWord: "Drop your Word file here",
      browse: "or click to browse from your device",
      supportsDocx: "Supports .docx format",
      pdfReady: "PDF Document Ready",
      wordReady: "Word Document Ready",
      convertToWord: "Convert to Word",
      convertToPdf: "Convert to PDF",
      converting: "Converting...",
      downloadWord: "Download Word Document",
      downloadPdf: "Download PDF Document",
      private: "100% Private",
      instant: "Instant Results",
      footer: "Built with precision for the modern web.",
      error: "Error during conversion",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
      home: "Home",
      about: "About",
      aboutContent: "PDF2WORD Online is a premium, secure, and fast document utility. Our mission is to provide high-quality conversion tools that respect user privacy by processing all files locally in the browser.",
      contactContent: "Have questions or feedback? Reach out to us at support@pdf2word-online.com.",
      disclaimer: "Disclaimer: PDF2WORD Online is an independent tool and is not affiliated with Adobe or Microsoft.",
      privacyContent: "We respect your privacy. All document processing is performed locally in your browser. We never upload, store, or see your files. No personal data is collected during the conversion process.",
      termsContent: "By using PDF2WORD Online, you agree to use this tool for lawful purposes. The service is provided 'as is' without warranty of any kind. We are not responsible for any data loss or conversion inaccuracies."
    }
  },
  fr: {
    translation: {
      title: "Convertir PDF en Word & Word en PDF Gratuit - Rapide & Sécurisé - PDF2WORD",
      description: "Transformez vos fichiers PDF en documents Word modifiables instantanément. Rapide, gratuit et sécurisé. Tout se passe dans votre navigateur pour une confidentialité maximale.",
      pdfToWord: "PDF vers Word",
      wordToPdf: "Word vers PDF",
      dropPdf: "Déposez votre PDF ici",
      dropWord: "Déposez votre fichier Word ici",
      browse: "ou cliquez pour parcourir vos fichiers",
      supportsDocx: "Supporte le format .docx",
      pdfReady: "Document PDF prêt",
      wordReady: "Document Word prêt",
      convertToWord: "Convertir en Word",
      convertToPdf: "Convertir en PDF",
      converting: "Conversion...",
      downloadWord: "Télécharger le Word",
      downloadPdf: "Télécharger le PDF",
      private: "100% Privé",
      instant: "Résultats Instantanés",
      footer: "Conçu avec précision pour le web moderne.",
      error: "Erreur lors de la conversion",
      privacy: "Confidentialité",
      terms: "Conditions",
      contact: "Contact",
      home: "Accueil",
      about: "À propos",
      aboutContent: "PDF2WORD Online est un utilitaire de documents premium, sécurisé et rapide. Notre mission est de fournir des outils de conversion de haute qualité qui respectent la vie privée des utilisateurs.",
      contactContent: "Vous avez des questions ou des commentaires ? Contactez-nous à support@pdf2word-online.com.",
      disclaimer: "Note : PDF2WORD Online est un outil indépendant non affilié à Adobe ou Microsoft.",
      privacyContent: "Nous respectons votre vie privée. Tout le traitement des documents est effectué localement dans votre navigateur. Nous ne téléchargeons, ne stockons et ne voyons jamais vos fichiers.",
      termsContent: "En utilisant ce site, vous acceptez nos conditions. Le service est fourni 'tel quel'. Nous ne sommes pas responsables des erreurs de conversion."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Force English as default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
