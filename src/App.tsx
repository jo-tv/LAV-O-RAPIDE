import { useState, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = '212670600342';

/* ======================== ANIMATED COUNTER ======================== */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 50;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ======================== TRANSLATIONS ======================== */
const translations = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    langLabel: 'FR',
    langFull: 'Français',
    langIcon: '🇫🇷',

    // Navbar
    navLinks: ['الرئيسية', 'خدماتنا', 'كيف نعمل', 'الأسعار', 'آراء العملاء', 'اتصل بنا'],
    navCTA: 'اطلب الآن',
    subtitle: 'تصبين سريع للملابس',

    // Hero
    heroBadge: 'الخدمة #1 في المنطقة',
    heroTitle1: 'نظافة',
    heroTitle2: 'مثالية',
    heroTitle3: 'في',
    heroTitle4: 'لمح البصر',
    heroDesc: 'نقدم لك خدمة تصبين وكي سريعة واحترافية بأعلى جودة. نستلم منك ونعيد لك ملابسك نظيفة ومرتبة في أسرع وقت.',
    heroFeatures: ['استلام وتوصيل مجاني', 'نظافة مضمونة 100%', 'تسليم في الوقت المحدد', 'أسعار تنافسية'],
    heroCTA: 'اطلب خدمتك الآن',
    heroSecondary: 'تعرف على خدماتنا',
    waDefaultMsg: 'مرحبا، أريد طلب خدمة تصبين',

    // Stats
    stats: [
      { target: 5000, suffix: '+', label: 'عميل سعيد' },
      { target: 50000, suffix: '+', label: 'قطعة مكوية' },
      { target: 24, suffix: '/7', label: 'خدمة متواصلة' },
      { target: 99, suffix: '%', label: 'رضا العملاء' },
    ],

    // Services
    servicesTag: 'ما نقدمه لك',
    servicesTitle1: 'خدماتنا',
    servicesTitle2: 'المتميزة',
    servicesDesc: 'نقدم مجموعة شاملة من خدمات التنظيف والصيانة لملابسك ومفروشاتك بأعلى معايير الجودة',
    services: [
      { icon: 'fa-solid fa-shirt', title: 'غسيل سريع', desc: 'غسيل ملابسك بأحدث التقنيات والمنظفات المتطورة في أسرع وقت ممكن مع الحفاظ على جودة القماش.', badge: 'الأكثر طلباً' },
      { icon: 'fa-solid fa-temperature-arrow-up', title: 'كوي احترافي', desc: 'كي الملابس بأعلى جودة واحترافية باستخدام مكواة ببخار متطورة لنتائج مثالية.', badge: null },
      { icon: 'fa-solid fa-spray-can-sparkles', title: 'تنظيف جاف', desc: 'تنظيف جاف للملابس الحساسة والغالية باستخدام أحدث المعدات والمواد الآمنة.', badge: null },
      { icon: 'fa-solid fa-droplet', title: 'إزالة البقع', desc: 'إزالة أصعب البقع والشوائب بأساليب متخصصة تضمن عودة ملابسك كالجديدة.', badge: 'مميز' },
      { icon: 'fa-solid fa-couch', title: 'تنظيف المفروشات', desc: 'خدمة تنظيف الستائر والبطانيات والمفروشات المنزلية بأحدث الأساليب.', badge: null },
      { icon: 'fa-solid fa-truck-fast', title: 'استلام وتوصيل', desc: 'نأتي إليك أينما كنت لاستلام ملابسك ونعيدها إليك نظيفة ومرتبة مجاناً.', badge: 'مجاني' },
    ],
    serviceBadges: [
      { icon: 'fa-solid fa-clock', text: 'سرعة في التنفيذ' },
      { icon: 'fa-solid fa-shield-halved', text: 'ضمان الجودة' },
      { icon: 'fa-solid fa-truck-fast', text: 'توصيل مجاني' },
    ],

    // How it works
    howTag: 'خطوات بسيطة',
    howTitle1: 'كيف',
    howTitle2: 'نعمل؟',
    howDesc: 'في 4 خطوات بسيطة فقط، ستحصل على ملابسك نظيفة ومرتبة دون عناء',
    steps: [
      { icon: 'fa-brands fa-whatsapp', title: 'تواصل معنا', desc: 'تواصل معنا عبر واتساب وأخبرنا بالخدمة التي تحتاجها' },
      { icon: 'fa-solid fa-location-dot', title: 'حدد موقعك', desc: 'أرسل لنا موقعك عبر واتساب ليصلك مندوبنا' },
      { icon: 'fa-solid fa-truck', title: 'نستلم ملابسك', desc: 'يأتي مندوبنا إلى باب بيتك لاستلام الملابس' },
      { icon: 'fa-solid fa-circle-check', title: 'استلم ملابسك نظيفة', desc: 'نعيد لك ملابسك نظيفة ومرتبة في الوقت المحدد' },
    ],
    howCTA: 'ابدأ الآن - إنه سهل!',

    // Pricing
    pricingTag: 'أسعارنا',
    pricingTitle1: 'باقات',
    pricingTitle2: 'تناسب الجميع',
    pricingDesc: 'اختر الباقة التي تناسب احتياجاتك واستمتع بخدماتنا المتميزة بأسعار تنافسية',
    perBag: 'لكل كيس',
    choosePlan: 'اختر هذه الباقة',
    mostPopular: '⭐ الأكثر طلباً',
    plans: [
      { name: 'أساسي', price: '---', icon: '🧺', desc: 'مثالي للاحتياجات اليومية', features: ['غسيل عادي', 'كوي أساسي', 'تسليم في 48 ساعة', 'استلام وتوصيل'], popular: false },
      { name: 'مميز', price: '---', icon: '⭐', desc: 'الأكثر طلباً - قيمة ممتازة', features: ['غسيل + تنظيف جاف', 'كوي احترافي بالبخار', 'تسليم في 24 ساعة', 'استلام وتوصيل مجاني', 'إزالة البقع العادية', 'تعطير مجاني'], popular: true },
      { name: 'VIP', price: '---', icon: '👑', desc: 'خدمة شاملة لا مثيل لها', features: ['كل خدمات المميز', 'تنظيف جاف فاخر', 'إزالة أصعب البقع', 'تسليم في 12 ساعة', 'أولوية قصوى', 'ضمان استرداد المال', 'خصم 15% للمتكررين'], popular: false },
    ],
    subscribePlanMsg: 'مرحبا، أريد الاشتراك في باقة',

    // Testimonials
    testimonialsTag: 'ماذا يقول عملاؤنا',
    testimonialsTitle1: 'آراء',
    testimonialsTitle2: 'عملائنا',
    testimonials: [
      { name: 'أمينة بوعلام', role: 'ربة منزل', text: 'خدمة ممتازة وسريعة! ملابسي عادت كأنها جديدة. أنصح الجميع بهذه الخدمة الرائعة.', rating: 5, avatar: '👩' },
      { name: 'محمد خالد', role: 'موظف', text: 'كنت أبحث عن خدمة تصبين سريعة وموثوقة، ووجدتها هنا! الكوي احترافي جداً والتسليم في الموعد.', rating: 5, avatar: '👨' },
      { name: 'فاطمة الزهراء', role: 'مصممة أزياء', text: 'أتعامل معهم منذ سنة ولست مخطئة أبداً. يهتمون بالتفاصيل ويتعاملون مع الملابس الحساسة بعناية فائقة.', rating: 5, avatar: '👩‍🎨' },
      { name: 'يوسف عمراني', role: 'صاحب مطعم', text: 'خدمة رائعة لتنظيف زيّ الموظفين. دائماً نظيف ومرتب. شكراً على الخدمة المتميزة والأسعار المناسبة.', rating: 4, avatar: '👨‍🍳' },
      { name: 'سارة حداد', role: 'طبيبة', text: 'خدمة التوصيل ممتازة والتنظيف الجاف لمعاطف البياض احترافي. وفرت علي الكثير من الوقت والجهد.', rating: 5, avatar: '👩‍⚕️' },
    ],

    // Contact
    contactTag: 'تواصل معنا',
    contactTitle1: 'اطلب',
    contactTitle2: 'خدمتك الآن',
    contactDesc: 'املأ النموذج وأرسل طلبك عبر واتساب، أو تواصل معنا مباشرة',
    formName: 'الاسم الكامل *',
    formNamePlaceholder: 'أدخل اسمك',
    formPhone: 'رقم الهاتف *',
    formPhonePlaceholder: '05XX XXX XXX',
    formService: 'الخدمة المطلوبة *',
    formServicePlaceholder: 'اختر الخدمة',
    formServiceOptions: ['غسيل سريع', 'كوي احترافي', 'تنظيف جاف', 'إزالة البقع', 'تنظيف المفروشات', 'باقة مميزة', 'باقة VIP'],
    formLocation: 'موقعك / عنوانك',
    formLocationPlaceholder: 'أدخل عنوانك أو أرسل موقعك',
    formLocateMe: 'حدد موقعي',
    formLocating: 'جارٍ التحديد...',
    formLocated: 'تم ✓',
    formLocationSuccess: 'تم تحديد موقعك بنجاح وسيتم إرساله مع الطلب',
    formNotes: 'ملاحظات إضافية',
    formNotesPlaceholder: 'أي تفاصيل إضافية عن طلبك...',
    formSubmit: 'أرسل الطلب عبر واتساب',
    formRequired: 'يرجى ملء الحقول المطلوبة (الاسم، الهاتف، الخدمة)',
    formWAMsg: 'مرحبا! أريد طلب خدمة تصبين 🧺',

    quickOrderTitle: '⚡ طلب سريع',
    quickOrderDesc: 'لا وقت لإملاء النموذج؟ تواصل معنا مباشرة عبر واتساب',
    quickOrderCTA: 'تواصل الآن',
    quickOrderMsg: 'مرحبا! أريد طلب خدمة تصبين. أرجو التواصل معي.',

    contactInfoTitle: '📞 معلومات التواصل',
    contactInfoItems: [
      { icon: 'fa-solid fa-phone text-primary', label: 'الهاتف', value: '06 70 60 03 42' },
      { icon: 'fa-brands fa-whatsapp text-success', label: 'واتساب', value: '06 70 60 03 42' },
      { icon: 'fa-solid fa-envelope text-info', label: 'البريد الإلكتروني', value: 'alsmlalydlal@gmail·com' },
      { icon: 'fa-solid fa-location-dot text-warning', label: 'العنوان', value: 'Complexe résidentiel et touristique Al Boughaz, Av Mohamed VI, Malabata, Tanger' },
      { icon: 'fa-solid fa-location-dot text-warning', label: 'المدينة', value: 'مالاباطا - طنجة' },
    ],
    openMaps: '📍 فتح الموقع على Google Maps',

    workingHoursTitle: '🕐 ساعات العمل',
    workingHours: [{ day: 'الإثنين - الأحد', time: '9:00 ص - 19:00 م' }],
    availableNow: 'متاحون الآن لاستقبال طلباتكم',

    // Footer
    footerAbout: 'شركة رائدة في مجال التصبين السريع والتنظيف الاحترافي. نقدم خدماتنا بأعلى معايير الجودة والسرعة لنضمن رضاكم التام.',
    footerQuickLinks: 'روابط سريعة',
    footerServices: 'خدماتنا',
    footerServicesList: ['غسيل سريع', 'كوي احترافي', 'تنظيف جاف', 'إزالة البقع', 'تنظيف المفروشات', 'استلام وتوصيل'],
    footerContact: 'تواصل معنا',
    footerRights: 'جميع الحقوق محفوظة.',
    footerMade: 'صُنع بـ',
    footerCountry: 'في المغرب',

    // WA Popup
    waPopupTitle: 'صبيني express',
    waPopupSubtitle: 'نرد خلال دقائق ⚡',
    waPopupQuickLabel: 'رسائل سريعة:',
    waQuickMessages: [
      { text: 'مرحبا، أريد طلب خدمة غسيل', icon: '🧺' },
      { text: 'أريد خدمة كوي احترافي', icon: '👔' },
      { text: 'أريد تنظيف جاف لملابسي', icon: '✨' },
      { text: 'أريد معرفة الأسعار', icon: '💰' },
    ],

    geoNotSupported: 'متصفحك لا يدعم تحديد الموقع',
    geoFailed: 'لم نتمكن من تحديد موقعك. تأكد من تفعيل خدمات الموقع.',
  },

  fr: {
    dir: 'ltr',
    lang: 'fr',
    langLabel: 'عربي',
    langFull: 'العربية',
    langIcon: '🇲🇦',

    // Navbar
    navLinks: ['Accueil', 'Services', 'Comment ça marche', 'Tarifs', 'Avis clients', 'Contact'],
    navCTA: 'Commander',
    subtitle: 'Pressing rapide pour vêtements',

    // Hero
    heroBadge: 'Service #1 dans la région',
    heroTitle1: 'Propreté',
    heroTitle2: 'parfaite',
    heroTitle3: 'en',
    heroTitle4: 'un clin d\'œil',
    heroDesc: 'Nous vous offrons un service de lavage et repassage rapide et professionnel de haute qualité. Nous récupérons et livrons vos vêtements propres et bien rangés dans les plus brefs délais.',
    heroFeatures: ['Collecte et livraison gratuites', 'Propreté garantie 100%', 'Livraison à l\'heure', 'Prix compétitifs'],
    heroCTA: 'Commandez maintenant',
    heroSecondary: 'Découvrir nos services',
    waDefaultMsg: 'Bonjour, je souhaite commander un service de pressing',

    // Stats
    stats: [
      { target: 5000, suffix: '+', label: 'Clients satisfaits' },
      { target: 50000, suffix: '+', label: 'Pièces repassées' },
      { target: 24, suffix: '/7', label: 'Service continu' },
      { target: 99, suffix: '%', label: 'Satisfaction client' },
    ],

    // Services
    servicesTag: 'Ce que nous offrons',
    servicesTitle1: 'Nos services',
    servicesTitle2: 'distingués',
    servicesDesc: 'Nous proposons une gamme complète de services de nettoyage et d\'entretien pour vos vêtements et textiles avec les plus hauts standards de qualité',
    services: [
      { icon: 'fa-solid fa-shirt', title: 'Lavage rapide', desc: 'Lavage de vos vêtements avec les dernières technologies et détergents avancés dans les plus brefs délais tout en préservant la qualité du tissu.', badge: 'Le plus demandé' },
      { icon: 'fa-solid fa-temperature-arrow-up', title: 'Repassage professionnel', desc: 'Repassage de vêtements de haute qualité et professionnel utilisant un fer à vapeur avancé pour des résultats parfaits.', badge: null },
      { icon: 'fa-solid fa-spray-can-sparkles', title: 'Nettoyage à sec', desc: 'Nettoyage à sec pour les vêtements délicats et précieux en utilisant les équipements et matériaux les plus sûrs.', badge: null },
      { icon: 'fa-solid fa-droplet', title: 'Détachage', desc: 'Élimination des taches les plus difficiles avec des méthodes spécialisées garantissant que vos vêtements reviennent comme neufs.', badge: 'Spécial' },
      { icon: 'fa-solid fa-couch', title: 'Nettoyage d\'ameublement', desc: 'Service de nettoyage des rideaux, couvertures et textiles d\'intérieur avec les méthodes les plus modernes.', badge: null },
      { icon: 'fa-solid fa-truck-fast', title: 'Collecte et livraison', desc: 'Nous venons chez vous où que vous soyez pour récupérer vos vêtements et les rendre propres et bien rangés gratuitement.', badge: 'Gratuit' },
    ],
    serviceBadges: [
      { icon: 'fa-solid fa-clock', text: 'Rapidité d\'exécution' },
      { icon: 'fa-solid fa-shield-halved', text: 'Garantie qualité' },
      { icon: 'fa-solid fa-truck-fast', text: 'Livraison gratuite' },
    ],

    // How it works
    howTag: 'Étapes simples',
    howTitle1: 'Comment',
    howTitle2: 'ça marche ?',
    howDesc: 'En seulement 4 étapes simples, vous obtiendrez vos vêtements propres et bien rangés sans effort',
    steps: [
      { icon: 'fa-brands fa-whatsapp', title: 'Contactez-nous', desc: 'Contactez-nous via WhatsApp et dites-nous le service dont vous avez besoin' },
      { icon: 'fa-solid fa-location-dot', title: 'Partagez votre position', desc: 'Envoyez-nous votre localisation via WhatsApp pour que notre agent vous rejoigne' },
      { icon: 'fa-solid fa-truck', title: 'Nous récupérons', desc: 'Notre agent vient à votre porte pour récupérer les vêtements' },
      { icon: 'fa-solid fa-circle-check', title: 'Recevez vos vêtements', desc: 'Nous vous rendons vos vêtements propres et bien rangés à temps' },
    ],
    howCTA: 'Commencez maintenant - C\'est facile !',

    // Pricing
    pricingTag: 'Nos tarifs',
    pricingTitle1: 'Des forfaits',
    pricingTitle2: 'pour tous',
    pricingDesc: 'Choisissez le forfait qui correspond à vos besoins et profitez de nos services premium à des prix compétitifs',
    perBag: 'par sac',
    choosePlan: 'Choisir ce forfait',
    mostPopular: '⭐ Le plus demandé',
    plans: [
      { name: 'Basique', price: '---', icon: '🧺', desc: 'Idéal pour les besoins quotidiens', features: ['Lavage normal', 'Repassage basique', 'Livraison en 48h', 'Collecte et livraison'], popular: false },
      { name: 'Premium', price: '---', icon: '⭐', desc: 'Le plus demandé - Excellent rapport qualité/prix', features: ['Lavage + Nettoyage à sec', 'Repassage professionnel vapeur', 'Livraison en 24h', 'Collecte et livraison gratuite', 'Détachage normal', 'Parfumage gratuit'], popular: true },
      { name: 'VIP', price: '---', icon: '👑', desc: 'Service complet sans pareil', features: ['Tous les services Premium', 'Nettoyage à sec luxe', 'Détachage difficile', 'Livraison en 12h', 'Priorité maximale', 'Garantie remboursement', 'Remise 15% fidélité'], popular: false },
    ],
    subscribePlanMsg: 'Bonjour, je souhaite souscrire au forfait',

    // Testimonials
    testimonialsTag: 'Ce que disent nos clients',
    testimonialsTitle1: 'Avis de',
    testimonialsTitle2: 'nos clients',
    testimonials: [
      { name: 'Amina Boualem', role: 'Femme au foyer', text: 'Service excellent et rapide ! Mes vêtements sont revenus comme neufs. Je recommande ce service à tout le monde.', rating: 5, avatar: '👩' },
      { name: 'Mohamed Khaled', role: 'Employé', text: 'Je cherchais un service de pressing rapide et fiable, et je l\'ai trouvé ici ! Le repassage est très professionnel et la livraison est ponctuelle.', rating: 5, avatar: '👨' },
      { name: 'Fatima Zahra', role: 'Styliste', text: 'Je travaille avec eux depuis un an et je n\'ai jamais été déçue. Ils font attention aux détails et traitent les vêtements délicats avec le plus grand soin.', rating: 5, avatar: '👩‍🎨' },
      { name: 'Youssef Amrani', role: 'Restaurateur', text: 'Service excellent pour le nettoyage des uniformes des employés. Toujours propre et bien rangé. Merci pour le service distingué et les prix raisonnables.', rating: 4, avatar: '👨‍🍳' },
      { name: 'Sara Haddad', role: 'Médecin', text: 'Le service de livraison est excellent et le nettoyage à sec des blouses est professionnel. Cela m\'a fait gagner beaucoup de temps et d\'efforts.', rating: 5, avatar: '👩‍⚕️' },
    ],

    // Contact
    contactTag: 'Contactez-nous',
    contactTitle1: 'Commandez',
    contactTitle2: 'votre service',
    contactDesc: 'Remplissez le formulaire et envoyez votre demande via WhatsApp, ou contactez-nous directement',
    formName: 'Nom complet *',
    formNamePlaceholder: 'Entrez votre nom',
    formPhone: 'Téléphone *',
    formPhonePlaceholder: '06XX XXX XXX',
    formService: 'Service souhaité *',
    formServicePlaceholder: 'Choisir le service',
    formServiceOptions: ['Lavage rapide', 'Repassage professionnel', 'Nettoyage à sec', 'Détachage', 'Nettoyage d\'ameublement', 'Forfait Premium', 'Forfait VIP'],
    formLocation: 'Votre position / adresse',
    formLocationPlaceholder: 'Entrez votre adresse ou envoyez votre position',
    formLocateMe: 'Ma position',
    formLocating: 'Localisation...',
    formLocated: 'Fait ✓',
    formLocationSuccess: 'Votre position a été déterminée avec succès et sera envoyée avec la commande',
    formNotes: 'Notes supplémentaires',
    formNotesPlaceholder: 'Tout détail supplémentaire concernant votre commande...',
    formSubmit: 'Envoyer via WhatsApp',
    formRequired: 'Veuillez remplir les champs obligatoires (nom, téléphone, service)',
    formWAMsg: 'Bonjour ! Je souhaite commander un service de pressing 🧺',

    quickOrderTitle: '⚡ Commande rapide',
    quickOrderDesc: 'Pas le temps de remplir le formulaire ? Contactez-nous directement via WhatsApp',
    quickOrderCTA: 'Contacter maintenant',
    quickOrderMsg: 'Bonjour ! Je souhaite commander un service de pressing. Merci de me contacter.',

    contactInfoTitle: '📞 Informations de contact',
    contactInfoItems: [
      { icon: 'fa-solid fa-phone text-primary', label: 'Téléphone', value: '06 70 60 03 42' },
      { icon: 'fa-brands fa-whatsapp text-success', label: 'WhatsApp', value: '06 70 60 03 42' },
      { icon: 'fa-solid fa-envelope text-info', label: 'Email', value: 'alsmlalydlal@gmail·com' },
      { icon: 'fa-solid fa-location-dot text-warning', label: 'Adresse', value: 'Complexe résidentiel et touristique Al Boughaz, Av Mohamed VI, Malabata, Tanger' },
      { icon: 'fa-solid fa-location-dot text-warning', label: 'Ville', value: 'Malabata - Tanger' },
    ],
    openMaps: '📍 Ouvrir sur Google Maps',

    workingHoursTitle: '🕐 Heures de travail',
    workingHours: [{ day: 'Lundi - Dimanche', time: '9h00 - 19h00' }],
    availableNow: 'Disponibles maintenant pour recevoir vos commandes',

    // Footer
    footerAbout: 'Entreprise leader dans le domaine du pressing rapide et du nettoyage professionnel. Nous offrons nos services avec les plus hauts standards de qualité et de rapidité pour garantir votre satisfaction totale.',
    footerQuickLinks: 'Liens rapides',
    footerServices: 'Nos services',
    footerServicesList: ['Lavage rapide', 'Repassage professionnel', 'Nettoyage à sec', 'Détachage', 'Nettoyage d\'ameublement', 'Collecte et livraison'],
    footerContact: 'Contactez-nous',
    footerRights: 'Tous droits réservés.',
    footerMade: 'Fait avec',
    footerCountry: 'au Maroc',

    // WA Popup
    waPopupTitle: 'Pressing Express',
    waPopupSubtitle: 'Réponse en quelques minutes ⚡',
    waPopupQuickLabel: 'Messages rapides :',
    waQuickMessages: [
      { text: 'Bonjour, je souhaite un service de lavage', icon: '🧺' },
      { text: 'Je souhaite un repassage professionnel', icon: '👔' },
      { text: 'Je souhaite un nettoyage à sec', icon: '✨' },
      { text: 'Je souhaite connaître les prix', icon: '💰' },
    ],

    geoNotSupported: 'Votre navigateur ne supporte pas la géolocalisation',
    geoFailed: 'Impossible de déterminer votre position. Vérifiez que les services de localisation sont activés.',
  }
};

/* ======================== MAIN APP ======================== */
export default function App() {
  const [lang, setLang] = useState<'ar' | 'fr'>('ar');
  const [navScrolled, setNavScrolled] = useState(false);
  const [waPopupOpen, setWaPopupOpen] = useState(false);
  const [mobileTestimonial, setMobileTestimonial] = useState(0);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', address: '', notes: ''
  });
  const [isFlipping, setIsFlipping] = useState(false);

  const t = translations[lang];

  // Toggle language with flip animation
  const toggleLang = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setLang(prev => prev === 'ar' ? 'fr' : 'ar');
      setIsFlipping(false);
    }, 400);
  };

  // Update document direction
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
  }, [lang, t.dir, t.lang]);

  // Navbar scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // AOS init
  useEffect(() => {
    // @ts-ignore
    if (window.AOS) {
      // @ts-ignore
      window.AOS.init({ duration: 800, once: true, offset: 80 });
    }
  }, []);

  // Reinit AOS on language change
  useEffect(() => {
    // @ts-ignore
    if (window.AOS) {
      setTimeout(() => {
        // @ts-ignore
        window.AOS.refresh();
      }, 500);
    }
  }, [lang]);

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) { alert(t.geoNotSupported); return; }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocationStatus('success');
        setFormData(f => ({ ...f, address: `https://maps.google.com/?q=${latitude},${longitude}` }));
      },
      () => {
        setLocationStatus('idle');
        alert(t.geoFailed);
      },
      { enableHighAccuracy: true }
    );
  };

  const sendWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.service) {
      alert(t.formRequired);
      return;
    }
    let msg = `${t.formWAMsg}\n\n`;
    msg += `📋 *${t.formName.replace(' *', '')}:* ${formData.name}\n`;
    msg += `📱 *${t.formPhone.replace(' *', '')}:* ${formData.phone}\n`;
    msg += `🧹 *${t.formService.replace(' *', '')}:* ${formData.service}\n`;
    if (coords) msg += `\n📍 *${t.formLocation}:* https://maps.google.com/?q=${coords.lat},${coords.lng}\n`;
    else if (formData.address) msg += `\n📍 *${t.formLocation}:* ${formData.address}\n`;
    if (formData.notes) msg += `\n📝 *${t.formNotes}:* ${formData.notes}\n`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const quickWA = (text: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setWaPopupOpen(false);
  };

  const serviceColors = [
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #10b981, #14b8a6)',
    'linear-gradient(135deg, #f97316, #ef4444)',
    'linear-gradient(135deg, #6366f1, #3b82f6)',
    'linear-gradient(135deg, #eab308, #f97316)',
  ];

  const stepColors = [
    'linear-gradient(135deg, #22c55e, #10b981)',
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #f97316, #eab308)',
  ];

  const planColors = [
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #f59e0b, #f97316)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
  ];

  return (
    <div style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }} dir={t.dir} className={isFlipping ? 'page-flipping' : ''}>

      {/* ==================== LANGUAGE TOGGLE BUTTON ==================== */}
      <button
        onClick={toggleLang}
        className="lang-toggle-btn"
        title={t.langFull}
        aria-label={`Switch to ${t.langFull}`}
      >
        <span className="lang-toggle-icon">{t.langIcon}</span>
        <span className="lang-toggle-label">{t.langLabel}</span>
      </button>

      {/* ==================== NAVBAR ==================== */}
      <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${navScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2 text-white" href="#hero">
            <div className="logo-icon"><i className="fa-solid fa-soap"></i></div>
            <div>
              <div className="lh-1">LAV'O RAPIDE <span style={{ color: '#f59e0b' }}>SEMLALI</span></div>
              <small className="text-white-40" style={{ fontSize: '0.65rem', opacity: 0.5 }}>{t.subtitle}</small>
            </div>
          </a>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" style={{ color: '#fff' }}>
            <i className="fa-solid fa-bars" style={{ color: '#fff', fontSize: '1.3rem' }}></i>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className={`navbar-nav ${t.dir === 'rtl' ? 'me-auto' : 'ms-auto'} mb-2 mb-lg-0`}>
              {t.navLinks.map((name, i) => (
                <li className="nav-item" key={i}>
                  <a className="nav-link" href={['#hero', '#services', '#how', '#pricing', '#testimonials', '#contact'][i]}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waDefaultMsg)}`}
              target="_blank" rel="noopener noreferrer"
              className={`btn btn-whatsapp-nav d-none d-lg-inline-flex align-items-center gap-2 ${t.dir === 'rtl' ? '' : 'ms-3'}`}>
              <i className="fa-brands fa-whatsapp"></i> {t.navCTA}
            </a>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section id="hero" className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-grid-pattern"></div>
        <div className="hero-bubbles">
          {[40, 60, 25, 50, 35, 70, 30, 55].map((size, i) => (
            <div key={i} className="hero-bubble" style={{
              width: size, height: size,
              top: `${10 + i * 11}%`, left: `${5 + i * 12}%`,
              '--duration': `${4 + i * 0.8}s`,
              '--delay': `${i * 0.6}s`
            } as React.CSSProperties} />
          ))}
        </div>

        <div className="container position-relative" style={{ zIndex: 10, paddingTop: '6rem' }}>
          <div className="row align-items-center min-vh-100">
            <div className={`col-lg-7 py-5 text-center text-lg-${t.dir === 'rtl' ? 'start' : 'start'}`}>
              <div data-aos="fade-down" data-aos-delay="100">
                <span className="hero-badge mb-4 d-inline-block">
                  <i className="fa-solid fa-star" style={{ fontSize: '0.7rem' }}></i>
                  {t.heroBadge}
                </span>
              </div>

              <h1 className="hero-title mb-4" data-aos="fade-up" data-aos-delay="200">
                {t.heroTitle1} <span className="text-gradient">{t.heroTitle2}</span><br />
                {t.heroTitle3} <span className="text-gradient-gold">{t.heroTitle4}</span>
              </h1>

              <p className="text-white-50 fs-5 mb-4" data-aos="fade-up" data-aos-delay="300" style={{ maxWidth: '520px' }}>
                {t.heroDesc}
              </p>

              <div className={`d-flex flex-wrap gap-3 justify-content-center justify-content-lg-${t.dir === 'rtl' ? 'start' : 'start'} mb-4`} data-aos="fade-up" data-aos-delay="350">
                {t.heroFeatures.map((f, i) => (
                  <span key={i} className="hero-feature"><i className="fa-solid fa-circle-check"></i>{f}</span>
                ))}
              </div>

              <div className={`d-flex flex-wrap gap-3 justify-content-center justify-content-lg-${t.dir === 'rtl' ? 'start' : 'start'}`} data-aos="fade-up" data-aos-delay="400">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waDefaultMsg)}`}
                  target="_blank" rel="noopener noreferrer" className="btn-hero-wa">
                  <i className="fa-brands fa-whatsapp"></i> {t.heroCTA}
                </a>
                <a href="#services" className="btn-hero-outline">
                  <i className="fa-solid fa-arrow-down"></i> {t.heroSecondary}
                </a>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
              <div className="hero-visual" data-aos="zoom-in" data-aos-delay="300">
                <div className="hero-circle-outer"></div>
                <div className="hero-circle-mid"></div>
                <div className="hero-circle-inner">
                  <span className="icon-main">👔</span>
                  <span className="icon-sparkle">✨</span>
                </div>
                <div className="hero-float-item">🧺</div>
                <div className="hero-float-item">🧼</div>
                <div className="hero-float-item">⭐</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row g-3 mt-4 pb-4" data-aos="fade-up" data-aos-delay="500">
            {t.stats.map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-number"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="#services" className="scroll-indicator">
          <i className="fa-solid fa-chevron-down fa-lg"></i>
        </a>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="services-section py-5 position-relative">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-badge bg-primary bg-opacity-10 text-primary mb-3">
              <i className="fa-solid fa-star text-warning" style={{ fontSize: '0.7rem' }}></i>
              {t.servicesTag}
            </span>
            <h2 className="section-title">{t.servicesTitle1} <span className="text-gradient">{t.servicesTitle2}</span></h2>
            <p className="text-muted mt-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {t.servicesDesc}
            </p>
          </div>

          <div className="row g-4">
            {t.services.map((s, i) => (
              <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="service-card">
                  {s.badge && <span className="service-badge">{s.badge}</span>}
                  <div className="service-icon" style={{ background: serviceColors[i] }}>
                    <i className={s.icon}></i>
                  </div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-5" data-aos="fade-up">
            {t.serviceBadges.map((b, i) => (
              <span key={i} className="service-badge-item">
                <i className={`${b.icon} text-primary`}></i> {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how" className="how-section py-5 position-relative">
        <div className="how-grid-bg"></div>
        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-badge text-white-50 border border-white-10 mb-3" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              {t.howTag}
            </span>
            <h2 className="section-title text-white">{t.howTitle1} <span className="text-gradient">{t.howTitle2}</span></h2>
            <p className="text-white-40 mt-2" style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.5 }}>
              {t.howDesc}
            </p>
          </div>

          <div className="row g-4">
            {t.steps.map((s, i) => (
              <div key={i} className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay={i * 120}>
                <div className="step-card">
                  {i > 0 && <div className="step-connector"></div>}
                  <span className="step-number">0{i + 1}</span>
                  <div className="step-icon" style={{ background: stepColors[i] }}>
                    <i className={s.icon}></i>
                  </div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="500">
            <a href="#contact" className="btn-hero-wa" style={{ display: 'inline-flex' }}>
              <i className="fa-brands fa-whatsapp"></i> {t.howCTA}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="pricing-section py-5 position-relative">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-badge bg-warning bg-opacity-10 text-warning mb-3">
              <i className="fa-solid fa-crown" style={{ fontSize: '0.75rem' }}></i>
              {t.pricingTag}
            </span>
            <h2 className="section-title">{t.pricingTitle1} <span className="text-gradient-gold">{t.pricingTitle2}</span></h2>
            <p className="text-muted mt-2" style={{ maxWidth: '550px', margin: '0 auto' }}>
              {t.pricingDesc}
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {t.plans.map((p, i) => (
              <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={i * 120}>
                <div className={`pricing-card ${p.popular ? 'pricing-popular' : ''}`}>
                  {p.popular && <div className="pricing-popular-badge">{t.mostPopular}</div>}
                  <div className="pricing-body">
                    <div className="text-center mb-4">
                      <span className="pricing-icon">{p.icon}</span>
                      <h4 className="fw-bold mt-2">{p.name}</h4>
                      <small className="text-muted">{p.desc}</small>
                    </div>
                    <div className="text-center mb-4">
                      <span className="pricing-price text-gradient">{p.price}</span>
                      <span className="text-muted fw-bold ms-1">DH</span>
                      <div><small className="text-muted">{t.perBag}</small></div>
                    </div>
                    <div className="mb-4 flex-grow-1">
                      {p.features.map((f, fi) => (
                        <div key={fi} className="pricing-feature">
                          <span className="check-icon" style={{ background: planColors[i] }}><i className="fa-solid fa-check"></i></span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${t.subscribePlanMsg} ${p.name}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className={`pricing-btn ${p.popular ? 'pricing-btn-primary' : 'pricing-btn-secondary'}`}>
                      <i className="fa-brands fa-whatsapp"></i> {t.choosePlan}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="testimonials-section py-5">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-badge bg-primary bg-opacity-10 text-primary mb-3">
              <i className="fa-solid fa-comments" style={{ fontSize: '0.75rem' }}></i>
              {t.testimonialsTag}
            </span>
            <h2 className="section-title">{t.testimonialsTitle1} <span className="text-gradient">{t.testimonialsTitle2}</span></h2>
          </div>

          {/* Desktop grid */}
          <div className="row g-4 d-none d-md-flex">
            {t.testimonials.slice(0, 3).map((item, i) => (
              <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="testimonial-card">
                  <i className="fa-solid fa-quote-right testimonial-quote"></i>
                  <div className="testimonial-stars mb-2">
                    {[...Array(5)].map((_, si) => (
                      <i key={si} className={`fa-solid fa-star ${si < item.rating ? '' : 'opacity-25'}`}></i>
                    ))}
                  </div>
                  <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>"{item.text}"</p>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <div className="testimonial-avatar">{item.avatar}</div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{item.name}</div>
                      <small className="text-muted">{item.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile slider */}
          <div className="d-md-none">
            <div className="testimonial-card" data-aos="fade-up">
              <i className="fa-solid fa-quote-right testimonial-quote"></i>
              <div className="testimonial-stars mb-2">
                {[...Array(5)].map((_, si) => (
                  <i key={si} className={`fa-solid fa-star ${si < t.testimonials[mobileTestimonial].rating ? '' : 'opacity-25'}`}></i>
                ))}
              </div>
              <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                "{t.testimonials[mobileTestimonial].text}"
              </p>
              <div className="d-flex align-items-center gap-3 pt-3 border-top">
                <div className="testimonial-avatar">{t.testimonials[mobileTestimonial].avatar}</div>
                <div>
                  <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{t.testimonials[mobileTestimonial].name}</div>
                  <small className="text-muted">{t.testimonials[mobileTestimonial].role}</small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
              <button className="btn btn-sm btn-light rounded-circle shadow-sm px-2" onClick={() => setMobileTestimonial(p => (p - 1 + t.testimonials.length) % t.testimonials.length)}>
                <i className={`fa-solid fa-chevron-${t.dir === 'rtl' ? 'right' : 'left'}`} style={{ fontSize: '0.7rem' }}></i>
              </button>
              <div className="d-flex gap-1">
                {t.testimonials.map((_, i) => (
                  <button key={i} className={`slider-dot ${i === mobileTestimonial ? 'active' : ''}`} onClick={() => setMobileTestimonial(i)} />
                ))}
              </div>
              <button className="btn btn-sm btn-light rounded-circle shadow-sm px-2" onClick={() => setMobileTestimonial(p => (p + 1) % t.testimonials.length)}>
                <i className={`fa-solid fa-chevron-${t.dir === 'rtl' ? 'left' : 'right'}`} style={{ fontSize: '0.7rem' }}></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="contact-section py-5">
        <div className="contact-glow" style={{ top: '20%', right: '5%', width: '300px', height: '300px', background: 'rgba(37,211,102,0.05)' }}></div>
        <div className="contact-glow" style={{ bottom: '20%', left: '5%', width: '250px', height: '250px', background: 'rgba(245,158,11,0.04)' }}></div>

        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-badge mb-3" style={{ background: 'rgba(37,211,102,0.1)', color: '#25d366', border: '1px solid rgba(37,211,102,0.2)' }}>
              <i className="fa-brands fa-whatsapp"></i> {t.contactTag}
            </span>
            <h2 className="section-title text-white">{t.contactTitle1} <span className="text-gradient">{t.contactTitle2}</span></h2>
            <p className="text-white-40 mt-2" style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.5 }}>
              {t.contactDesc}
            </p>
          </div>

          <div className="row g-4">
            {/* Form */}
            <div className="col-lg-7" data-aos={t.dir === 'rtl' ? 'fade-left' : 'fade-right'}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem' }}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label-custom">{t.formName}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder={t.formNamePlaceholder} className="form-control form-control-custom" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-custom">{t.formPhone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder={t.formPhonePlaceholder} className="form-control form-control-custom" dir="ltr" />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">{t.formService}</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="form-select form-select-custom">
                      <option value="">{t.formServicePlaceholder}</option>
                      {t.formServiceOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">
                      <i className={`fa-solid fa-location-dot ${t.dir === 'rtl' ? 'ms-1' : 'me-1'}`}></i> {t.formLocation}
                    </label>
                    <div className="d-flex gap-2">
                      <input type="text" name="address" value={formData.address} onChange={handleChange}
                        placeholder={t.formLocationPlaceholder} className="form-control form-control-custom" />
                      <button onClick={getLocation} disabled={locationStatus === 'loading'}
                        className={`btn btn-location ${locationStatus === 'success' ? 'success' : ''}`}>
                        {locationStatus === 'loading' ? (
                          <><span className="spinner-tiny"></span> {t.formLocating}</>
                        ) : locationStatus === 'success' ? (
                          <><i className="fa-solid fa-location-crosshairs"></i> {t.formLocated}</>
                        ) : (
                          <><i className="fa-solid fa-location-dot"></i> {t.formLocateMe}</>
                        )}
                      </button>
                    </div>
                    {locationStatus === 'success' && coords && (
                      <small className="d-block mt-2" style={{ color: '#25d366', fontSize: '0.8rem' }}>
                        <i className="fa-solid fa-location-crosshairs"></i> {t.formLocationSuccess}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">{t.formNotes}</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                      placeholder={t.formNotesPlaceholder}
                      className="form-control form-control-custom" style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="col-12 mt-3">
                    <button onClick={sendWhatsApp} className="btn-submit-wa">
                      <i className="fa-brands fa-whatsapp fa-lg"></i>
                      {t.formSubmit}
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-5" data-aos={t.dir === 'rtl' ? 'fade-right' : 'fade-left'}>
              {/* Quick order */}
              <div className="quick-order-card mb-4">
                <h5 className="text-white fw-bold mb-2">{t.quickOrderTitle}</h5>
                <p className="mb-3" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
                  {t.quickOrderDesc}
                </p>
                <button onClick={() => quickWA(t.quickOrderMsg)}
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
                  style={{ background: '#25d366', color: '#fff', borderRadius: '12px', padding: '0.75rem' }}>
                  <i className="fa-brands fa-whatsapp fa-lg"></i> {t.quickOrderCTA}
                </button>
              </div>

              {/* Contact info */}
              <div className="contact-info-card mb-4">
                <h5 className="text-white fw-bold mb-3">{t.contactInfoTitle}</h5>
                {t.contactInfoItems.map((c, i) => (
                  <div key={i} className="contact-info-item">
                    <div className="contact-info-icon"><i className={c.icon}></i></div>
                    <div>
                      <small style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{c.label}</small>
                      <div dir='ltr' className="text-white" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://maps.app.goo.gl/WjqrEv7Jf4b5GgEw9"
                target="_blank"
                rel="noreferrer"
                className="btn btn-info mt-3"
              >
                {t.openMaps}
              </a>
              <div className="map-container mt-4">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps?q=35.774485,-5.782388&z=17&output=embed"
                  width="100%"
                  height="300"
                  style={{
                    border: 0,
                    borderRadius: '20px',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Working hours */}
              <div className="contact-info-card mt-4">
                <h5 className="text-white fw-bold mb-3">{t.workingHoursTitle}</h5>
                {t.workingHours.map((h, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center py-2">
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{h.day}</span>
                    <span className="text-white fw-medium" style={{ background: 'rgba(37,211,102,0.1)', padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem' }}>
                      {h.time}
                    </span>
                  </div>
                ))}

                <div className="mt-3 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#25d366', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span className={`d-inline-block rounded-circle ${t.dir === 'rtl' ? 'me-2' : 'ms-2'}`} style={{ width: 8, height: 8, background: '#25d366', animation: 'pulse 2s infinite' }}></span>
                    {t.availableNow}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer-section pt-5 pb-4">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(30,64,175,0.5), transparent)' }}></div>

        <div className="container">
          <div className="row g-4 mb-5">
            {/* Logo & About */}
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="logo-icon"><i className="fa-solid fa-soap"></i></div>
                <div>
                  <span style={{ color: '#f59e0b' }}>SEMLALI</span>
                  <h5 className="text-white fw-bold mb-0">LAV'O RAPIDE</h5>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', lineHeight: 1.8 }} className="mb-3">
                {t.footerAbout}
              </p>
              <div className="d-flex gap-2">
                {['fa-brands fa-facebook-f', 'fa-brands fa-instagram', 'fa-brands fa-tiktok', 'fa-brands fa-whatsapp'].map((icon, i) => (
                  <a key={i} href="#" className="footer-social"><i className={icon}></i></a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-bold mb-3">{t.footerQuickLinks}</h6>
              {t.navLinks.map((l, i) => (
                <a key={i} href={['#hero', '#services', '#how', '#pricing', '#testimonials', '#contact'][i]} className="footer-link d-block py-1">{l}</a>
              ))}
            </div>

            {/* Services */}
            <div className="col-6 col-lg-3">
              <h6 className="text-white fw-bold mb-3">{t.footerServices}</h6>
              {t.footerServicesList.map((s, i) => (
                <a key={i} href="#services" className="footer-link d-block py-1">{s}</a>
              ))}
            </div>

            {/* Contact */}
            <div className="col-lg-3">
              <h6 className="text-white fw-bold mb-3">{t.footerContact}</h6>
              {[
                { icon: 'fa-solid fa-location-dot', text: 'Complexe Al Boughaz, Av Mohamed VI, Malabata, Tanger' },
                { icon: 'fa-brands fa-whatsapp', text: '+2126 70 60 03 42' },
                { icon: 'fa-solid fa-envelope', text: 'alsmlalydlal@gmail·com' },
              ].map((c, i) => (
                <div key={i} className="d-flex align-items-start gap-2 py-1">
                  <i className={`${c.icon} mt-1`} style={{ color: '#3b82f6', fontSize: '0.85rem' }}></i>
                  <span dir="ltr" className="footer-link">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="footer-divider" />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 py-2">
            <small style={{ color: 'rgba(255,255,255,0.25)' }}>
              © {new Date().getFullYear()} LAV'O RAPIDE SEMLALI. {t.footerRights}
            </small>
            <small style={{ color: 'rgba(255,255,255,0.25)' }}>
              {t.footerMade} <i className="fa-solid fa-heart text-danger" style={{ fontSize: '0.65rem' }}></i> {t.footerCountry}
            </small>
          </div>
        </div>
      </footer>

      {/* ==================== WHATSAPP FLOAT ==================== */}
      <div className="whatsapp-float">
        {waPopupOpen && (
          <div className="wa-popup">
            <div className="wa-popup-header">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-brands fa-whatsapp text-white"></i>
                </div>
                <div>
                  <div className="text-white fw-bold" style={{ fontSize: '0.85rem' }}>{t.waPopupTitle}</div>
                  <small style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>{t.waPopupSubtitle}</small>
                </div>
              </div>
              <button className="wa-popup-close" onClick={() => setWaPopupOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-3">
              <small className="text-muted d-block mb-2 fw-medium">{t.waPopupQuickLabel}</small>
              {t.waQuickMessages.map((m, i) => (
                <button key={i} className="wa-quick-btn" onClick={() => quickWA(m.text)}>
                  <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
                  <span>{m.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button className="whatsapp-float-btn" onClick={() => setWaPopupOpen(!waPopupOpen)}>
          <i className={`fa-solid ${waPopupOpen ? 'fa-xmark' : 'fa-brands fa-whatsapp'}`}></i>
        </button>
      </div>

      {/* ==================== FLIP ANIMATION STYLES ==================== */}
      <style>{`
        /* Language Toggle Button */
        .lang-toggle-btn {
          position: fixed;
          top: 90px;
          ${lang === 'ar' ? 'left: 20px;' : 'right: 20px;'}
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
          backdrop-filter: blur(20px);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
          font-family: 'Cairo', 'Tajawal', sans-serif;
        }

        .lang-toggle-btn:hover {
          transform: translateY(-2px) scale(1.05);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.3);
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(51, 65, 85, 0.98));
        }

        .lang-toggle-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .lang-toggle-icon {
          font-size: 1.2rem;
          line-height: 1;
        }

        .lang-toggle-label {
          font-size: 0.8rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Page Flip Animation */
        .page-flipping {
          animation: pageFlip 0.8s ease-in-out;
        }

        @keyframes pageFlip {
          0% {
            opacity: 1;
            transform: perspective(1200px) rotateY(0deg);
          }
          50% {
            opacity: 0.3;
            transform: perspective(1200px) rotateY(90deg);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateY(0deg);
          }
        }

        /* Pulse animation for availability dot */
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        /* Responsive adjustments for lang button */
        @media (max-width: 768px) {
          .lang-toggle-btn {
            top: 80px;
            padding: 8px 14px;
            font-size: 0.75rem;
          }
          .lang-toggle-icon {
            font-size: 1rem;
          }
        }
      `}</style>

    </div>
  );
}