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
      about: "About PDF2WORD Online",
      aboutContent: "PDF2WORD Online is a premium, secure, and fast document utility. Our mission is to provide high-quality conversion tools that respect user privacy by processing all files locally in the browser. \n\n### How to convert a PDF to Word for free?\n\nConverting your documents shouldn't be complicated or expensive. At PDF2WORD Online, we've simplified the process. Simply drag and drop your PDF file into our converter, and within seconds, you'll have a fully editable Word document. Because we use advanced client-side processing, you can convert a PDF to Word for free without ever worrying about your data leaving your computer. Our tool maintains the original formatting, ensuring that your fonts, tables, and images remain exactly where they belong.\n\n### Why choose pdf2word-online.com for your documents?\n\nWhen searching for a reliable converter, users often ask: 'Why choose pdf2word-online.com for your documents?' The answer lies in our unique architecture. Unlike traditional online converters that upload your sensitive files to a remote server, we process everything locally. This means we offer the speed of a desktop application with the convenience of a web tool. Whether you are a student, a legal professional, or a business owner, our platform provides the precision required for high-stakes document management. We support both PDF to Word and Word to PDF transitions, making us a versatile choice for all your document needs.\n\n### Security and privacy of your PDF files\n\nWe understand that document security is paramount. The security and privacy of your PDF files are our top priority. By leveraging modern web technologies like WebAssembly and JavaScript, our converter performs all calculations inside your browser's sandbox. This 'Zero-Upload' policy ensures that your files are never stored, viewed, or leaked. In an era where data breaches are common, PDF2WORD Online provides a safe haven for your intellectual property. You don't need to create an account or provide an email address, further protecting your digital footprint.\n\n### Professional Quality Conversion\n\nOur engine is designed to handle complex layouts. Many free tools struggle with nested tables or custom fonts, but PDF2WORD Online uses high-fidelity libraries to ensure that the output DOCX file is ready for professional use. It is the ideal solution for anyone looking to edit a PDF without access to expensive software like Adobe Acrobat. By choosing our service, you are opting for a high-performance utility that values your time and your privacy.\n\n### Accessibility and Ease of Use\n\nWe believe that powerful tools should be accessible to everyone. Our interface is clean, ad-free, and optimized for both desktop and mobile devices. There are no limits on file sizes or the number of conversions you can perform in a day. It is truly a free, unlimited resource for the global community. Experience the future of document conversion today with PDF2WORD Online—where your files stay yours.",
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
