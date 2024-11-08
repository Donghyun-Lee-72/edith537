interface FAQItem {
    q: string;
    a: string;
}

interface Translation {
    welcome: string;
    description: string;
    faq: FAQItem[];
}

interface Translations {
    ko: Translation;
    en: Translation;
    zh: Translation;
    ja: Translation;
}

export default Translations; 