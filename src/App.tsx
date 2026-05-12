import { useState, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = '212601862102';

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
      {count.toLocaleString('ar-DZ')}{suffix}
    </span>
  );
}

/* ======================== MAIN APP ======================== */
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [waPopupOpen, setWaPopupOpen] = useState(false);
  const [mobileTestimonial, setMobileTestimonial] = useState(0);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', address: '', notes: ''
  });

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

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) { alert('متصفحك لا يدعم تحديد الموقع'); return; }
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
        alert('لم نتمكن من تحديد موقعك. تأكد من تفعيل خدمات الموقع.');
      },
      { enableHighAccuracy: true }
    );
  };

  const sendWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.service) {
      alert('يرجى ملء الحقول المطلوبة (الاسم، الهاتف، الخدمة)');
      return;
    }
    let msg = `مرحبا! أريد طلب خدمة تصبين 🧺\n\n`;
    msg += `📋 *الاسم:* ${formData.name}\n`;
    msg += `📱 *الهاتف:* ${formData.phone}\n`;
    msg += `🧹 *الخدمة:* ${formData.service}\n`;
    if (coords) msg += `\n📍 *موقعي:* https://maps.google.com/?q=${coords.lat},${coords.lng}\n`;
    else if (formData.address) msg += `\n📍 *العنوان:* ${formData.address}\n`;
    if (formData.notes) msg += `\n📝 *ملاحظات:* ${formData.notes}\n`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const quickWA = (text: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setWaPopupOpen(false);
  };

  const testimonials = [
    { name: 'أمينة بوعلام', role: 'ربة منزل', text: 'خدمة ممتازة وسريعة! ملابسي عادت كأنها جديدة. أنصح الجميع بهذه الخدمة الرائعة.', rating: 5, avatar: '👩' },
    { name: 'محمد خالد', role: 'موظف', text: 'كنت أبحث عن خدمة تصبين سريعة وموثوقة، ووجدتها هنا! الكوي احترافي جداً والتسليم في الموعد.', rating: 5, avatar: '👨' },
    { name: 'فاطمة الزهراء', role: 'مصممة أزياء', text: 'أتعامل معهم منذ سنة ولست مخطئة أبداً. يهتمون بالتفاصيل ويتعاملون مع الملابس الحساسة بعناية فائقة.', rating: 5, avatar: '👩‍🎨' },
    { name: 'يوسف عمراني', role: 'صاحب مطعم', text: 'خدمة رائعة لتنظيف زيّ الموظفين. دائماً نظيف ومرتب. شكراً على الخدمة المتميزة والأسعار المناسبة.', rating: 4, avatar: '👨‍🍳' },
    { name: 'سارة حداد', role: 'طبيبة', text: 'خدمة التوصيل ممتازة والتنظيف الجاف لمعاطف البياض احترافي. وفرت علي الكثير من الوقت والجهد.', rating: 5, avatar: '👩‍⚕️' },
  ];

  const services = [
    { icon: 'fa-solid fa-shirt', title: 'غسيل سريع', desc: 'غسيل ملابسك بأحدث التقنيات والمنظفات المتطورة في أسرع وقت ممكن مع الحفاظ على جودة القماش.', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)', badge: 'الأكثر طلباً' },
    { icon: 'fa-solid fa-temperature-arrow-up', title: 'كوي احترافي', desc: 'كي الملابس بأعلى جودة واحترافية باستخدام مكواة ببخار متطورة لنتائج مثالية.', color: 'linear-gradient(135deg, #8b5cf6, #ec4899)', badge: null },
    { icon: 'fa-solid fa-spray-can-sparkles', title: 'تنظيف جاف', desc: 'تنظيف جاف للملابس الحساسة والغالية باستخدام أحدث المعدات والمواد الآمنة.', color: 'linear-gradient(135deg, #10b981, #14b8a6)', badge: null },
    { icon: 'fa-solid fa-droplet', title: 'إزالة البقع', desc: 'إزالة أصعب البقع والشوائب بأساليب متخصصة تضمن عودة ملابسك كالجديدة.', color: 'linear-gradient(135deg, #f97316, #ef4444)', badge: 'مميز' },
    { icon: 'fa-solid fa-couch', title: 'تنظيف المفروشات', desc: 'خدمة تنظيف الستائر والبطانيات والمفروشات المنزلية بأحدث الأساليب.', color: 'linear-gradient(135deg, #6366f1, #3b82f6)', badge: null },
    { icon: 'fa-solid fa-truck-fast', title: 'استلام وتوصيل', desc: 'نأتي إليك أينما كنت لاستلام ملابسك ونعيدها إليك نظيفة ومرتبة مجاناً.', color: 'linear-gradient(135deg, #eab308, #f97316)', badge: 'مجاني' },
  ];

  const steps = [
    { icon: 'fa-brands fa-whatsapp', title: 'تواصل معنا', desc: 'تواصل معنا عبر واتساب وأخبرنا بالخدمة التي تحتاجها', color: 'linear-gradient(135deg, #22c55e, #10b981)' },
    { icon: 'fa-solid fa-location-dot', title: 'حدد موقعك', desc: 'أرسل لنا موقعك عبر واتساب ليصلك مندوبنا', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
    { icon: 'fa-solid fa-truck', title: 'نستلم ملابسك', desc: 'يأتي مندوبنا إلى باب بيتك لاستلام الملابس', color: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    { icon: 'fa-solid fa-circle-check', title: 'استلم ملابسك نظيفة', desc: 'نعيد لك ملابسك نظيفة ومرتبة في الوقت المحدد', color: 'linear-gradient(135deg, #f97316, #eab308)' },
  ];

  const plans = [
    { name: 'أساسي', price: '---', icon: '🧺', desc: 'مثالي للاحتياجات اليومية', features: ['غسيل عادي', 'كوي أساسي', 'تسليم في 48 ساعة', 'استلام وتوصيل'], popular: false, color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
    { name: 'مميز', price: '---', icon: '⭐', desc: 'الأكثر طلباً - قيمة ممتازة', features: ['غسيل + تنظيف جاف', 'كوي احترافي بالبخار', 'تسليم في 24 ساعة', 'استلام وتوصيل مجاني', 'إزالة البقع العادية', 'تعطير مجاني'], popular: true, color: 'linear-gradient(135deg, #f59e0b, #f97316)' },
    { name: 'VIP', price: '---', icon: '👑', desc: 'خدمة شاملة لا مثيل لها', features: ['كل خدمات المميز', 'تنظيف جاف فاخر', 'إزالة أصعب البقع', 'تسليم في 12 ساعة', 'أولوية قصوى', 'ضمان استرداد المال', 'خصم 15% للمتكررين'], popular: false, color: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  ];

  const waQuickMessages = [
    { text: 'مرحبا، أريد طلب خدمة غسيل', icon: '🧺' },
    { text: 'أريد خدمة كوي احترافي', icon: '👔' },
    { text: 'أريد تنظيف جاف لملابسي', icon: '✨' },
    { text: 'أريد معرفة الأسعار', icon: '💰' },
  ];

  return (
    <div style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}>

      {/* ==================== NAVBAR ==================== */}
      <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${navScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2 text-white" href="#hero">
                <div className="logo-icon"><i class="fa-solid fa-soap"></i></div>
            <div>
              <div className="lh-1">LAV'O RAPIDE <span style={{ color: '#f59e0b' }}>SEMLALI</span></div>
              <small className="text-white-40" style={{ fontSize: '0.65rem', opacity: 0.5 }}>تصبين سريع للملابس</small>
            </div>
          </a>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" style={{ color: '#fff' }}>
            <i className="fa-solid fa-bars" style={{ color: '#fff', fontSize: '1.3rem' }}></i>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {['الرئيسية', 'خدماتنا', 'كيف نعمل', 'الأسعار', 'آراء العملاء', 'اتصل بنا'].map((name, i) => (
                <li className="nav-item" key={i}>
                  <a className="nav-link" href={['#hero', '#services', '#how', '#pricing', '#testimonials', '#contact'][i]}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحبا، أريد طلب خدمة تصبين')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp-nav d-none d-lg-inline-flex align-items-center gap-2">
              <i className="fa-brands fa-whatsapp"></i> اطلب الآن
            </a>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section id="hero" className="hero-section">
        {/* Background decorations */}
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
            <div className="col-lg-7 py-5 text-center text-lg-start">
              <div data-aos="fade-down" data-aos-delay="100">
                <span className="hero-badge mb-4 d-inline-block">
                  <i className="fa-solid fa-star" style={{ fontSize: '0.7rem' }}></i>
                  الخدمة #1 في المنطقة
                </span>
              </div>

              <h1 className="hero-title mb-4" data-aos="fade-up" data-aos-delay="200">
                نظافة <span className="text-gradient">مثالية</span><br />
                في <span className="text-gradient-gold">لمح البصر</span>
              </h1>

              <p className="text-white-50 fs-5 mb-4" data-aos="fade-up" data-aos-delay="300" style={{ maxWidth: '520px' }}>
                نقدم لك خدمة تصبين وكي سريعة واحترافية بأعلى جودة.
                نستلم منك ونعيد لك ملابسك نظيفة ومرتبة في أسرع وقت.
              </p>

              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4" data-aos="fade-up" data-aos-delay="350">
                {['استلام وتوصيل مجاني', 'نظافة مضمونة 100%', 'تسليم في الوقت المحدد', 'أسعار تنافسية'].map((f, i) => (
                  <span key={i} className="hero-feature"><i className="fa-solid fa-circle-check"></i>{f}</span>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="400">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحبا، أريد طلب خدمة تصبين')}`}
                  target="_blank" rel="noopener noreferrer" className="btn-hero-wa">
                  <i className="fa-brands fa-whatsapp"></i> اطلب خدمتك الآن
                </a>
                <a href="#services" className="btn-hero-outline">
                  <i className="fa-solid fa-arrow-down"></i> تعرف على خدماتنا
                </a>
              </div>
            </div>

            {/* Hero visual */}
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
            {[
              { target: 5000, suffix: '+', label: 'عميل سعيد' },
              { target: 50000, suffix: '+', label: 'قطعة مكوية' },
              { target: 24, suffix: '/7', label: 'خدمة متواصلة' },
              { target: 99, suffix: '%', label: 'رضا العملاء' },
            ].map((s, i) => (
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
              ما نقدمه لك
            </span>
            <h2 className="section-title">خدماتنا <span className="text-gradient">المتميزة</span></h2>
            <p className="text-muted mt-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
              نقدم مجموعة شاملة من خدمات التنظيف والصيانة لملابسك ومفروشاتك بأعلى معايير الجودة
            </p>
          </div>

          <div className="row g-4">
            {services.map((s, i) => (
              <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="service-card">
                  {s.badge && <span className="service-badge">{s.badge}</span>}
                  <div className="service-icon" style={{ background: s.color }}>
                    <i className={s.icon}></i>
                  </div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-5" data-aos="fade-up">
            {[
              { icon: 'fa-solid fa-clock', text: 'سرعة في التنفيذ' },
              { icon: 'fa-solid fa-shield-halved', text: 'ضمان الجودة' },
              { icon: 'fa-solid fa-truck-fast', text: 'توصيل مجاني' },
            ].map((b, i) => (
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
              خطوات بسيطة
            </span>
            <h2 className="section-title text-white">كيف <span className="text-gradient">نعمل؟</span></h2>
            <p className="text-white-40 mt-2" style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.5 }}>
              في 4 خطوات بسيطة فقط، ستحصل على ملابسك نظيفة ومرتبة دون عناء
            </p>
          </div>

          <div className="row g-4">
            {steps.map((s, i) => (
              <div key={i} className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay={i * 120}>
                <div className="step-card">
                  {i > 0 && <div className="step-connector"></div>}
                  <span className="step-number">0{i + 1}</span>
                  <div className="step-icon" style={{ background: s.color }}>
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
              <i className="fa-brands fa-whatsapp"></i> ابدأ الآن - إنه سهل!
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
              أسعارنا
            </span>
            <h2 className="section-title">باقات <span className="text-gradient-gold">تناسب الجميع</span></h2>
            <p className="text-muted mt-2" style={{ maxWidth: '550px', margin: '0 auto' }}>
              اختر الباقة التي تناسب احتياجاتك واستمتع بخدماتنا المتميزة بأسعار تنافسية
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {plans.map((p, i) => (
              <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={i * 120}>
                <div className={`pricing-card ${p.popular ? 'pricing-popular' : ''}`}>
                  {p.popular && <div className="pricing-popular-badge">⭐ الأكثر طلباً</div>}
                  <div className="pricing-body">
                    <div className="text-center mb-4">
                      <span className="pricing-icon">{p.icon}</span>
                      <h4 className="fw-bold mt-2">{p.name}</h4>
                      <small className="text-muted">{p.desc}</small>
                    </div>
                    <div className="text-center mb-4">
                      <span className="pricing-price text-gradient">{p.price}</span>
                      <span className="text-muted fw-bold ms-1">DH</span>
                      <div><small className="text-muted">لكل كيس</small></div>
                    </div>
                    <div className="mb-4 flex-grow-1">
                      {p.features.map((f, fi) => (
                        <div key={fi} className="pricing-feature">
                          <span className="check-icon" style={{ background: p.color }}><i className="fa-solid fa-check"></i></span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`مرحبا، أريد الاشتراك في باقة ${p.name}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className={`pricing-btn ${p.popular ? 'pricing-btn-primary' : 'pricing-btn-secondary'}`}>
                      <i className="fa-brands fa-whatsapp"></i> اختر هذه الباقة
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
              ماذا يقول عملاؤنا
            </span>
            <h2 className="section-title">آراء <span className="text-gradient">عملائنا</span></h2>
          </div>

          {/* Desktop grid */}
          <div className="row g-4 d-none d-md-flex">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="testimonial-card">
                  <i className="fa-solid fa-quote-right testimonial-quote"></i>
                  <div className="testimonial-stars mb-2">
                    {[...Array(5)].map((_, si) => (
                      <i key={si} className={`fa-solid fa-star ${si < t.rating ? '' : 'opacity-25'}`}></i>
                    ))}
                  </div>
                  <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>"{t.text}"</p>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{t.name}</div>
                      <small className="text-muted">{t.role}</small>
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
                  <i key={si} className={`fa-solid fa-star ${si < testimonials[mobileTestimonial].rating ? '' : 'opacity-25'}`}></i>
                ))}
              </div>
              <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                "{testimonials[mobileTestimonial].text}"
              </p>
              <div className="d-flex align-items-center gap-3 pt-3 border-top">
                <div className="testimonial-avatar">{testimonials[mobileTestimonial].avatar}</div>
                <div>
                  <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{testimonials[mobileTestimonial].name}</div>
                  <small className="text-muted">{testimonials[mobileTestimonial].role}</small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
              <button className="btn btn-sm btn-light rounded-circle shadow-sm px-2" onClick={() => setMobileTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
              </button>
              <div className="d-flex gap-1">
                {testimonials.map((_, i) => (
                  <button key={i} className={`slider-dot ${i === mobileTestimonial ? 'active' : ''}`} onClick={() => setMobileTestimonial(i)} />
                ))}
              </div>
              <button className="btn btn-sm btn-light rounded-circle shadow-sm px-2" onClick={() => setMobileTestimonial(p => (p + 1) % testimonials.length)}>
                <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.7rem' }}></i>
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
              <i className="fa-brands fa-whatsapp"></i> تواصل معنا
            </span>
            <h2 className="section-title text-white">اطلب <span className="text-gradient">خدمتك الآن</span></h2>
            <p className="text-white-40 mt-2" style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.5 }}>
              املأ النموذج وأرسل طلبك عبر واتساب، أو تواصل معنا مباشرة
            </p>
          </div>

          <div className="row g-4">
            {/* Form */}
            <div className="col-lg-7" data-aos="fade-left">
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem' }}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label-custom">الاسم الكامل *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="أدخل اسمك" className="form-control form-control-custom" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-custom">رقم الهاتف *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="05XX XXX XXX" className="form-control form-control-custom" dir="ltr" />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">الخدمة المطلوبة *</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="form-select form-select-custom">
                      <option value="">اختر الخدمة</option>
                      <option value="غسيل سريع">غسيل سريع</option>
                      <option value="كوي احترافي">كوي احترافي</option>
                      <option value="تنظيف جاف">تنظيف جاف</option>
                      <option value="إزالة البقع">إزالة البقع</option>
                      <option value="تنظيف المفروشات">تنظيف المفروشات</option>
                      <option value="باقة مميزة">باقة مميزة</option>
                      <option value="باقة VIP">باقة VIP</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">
                      <i className="fa-solid fa-location-dot ms-1"></i> موقعك / عنوانك
                    </label>
                    <div className="d-flex gap-2">
                      <input type="text" name="address" value={formData.address} onChange={handleChange}
                        placeholder="أدخل عنوانك أو أرسل موقعك" className="form-control form-control-custom" />
                      <button onClick={getLocation} disabled={locationStatus === 'loading'}
                        className={`btn btn-location ${locationStatus === 'success' ? 'success' : ''}`}>
                        {locationStatus === 'loading' ? (
                          <><span className="spinner-tiny"></span> جارٍ التحديد...</>
                        ) : locationStatus === 'success' ? (
                          <><i className="fa-solid fa-location-crosshairs"></i> تم ✓</>
                        ) : (
                          <><i className="fa-solid fa-location-dot"></i> حدد موقعي</>
                        )}
                      </button>
                    </div>
                    {locationStatus === 'success' && coords && (
                      <small className="d-block mt-2" style={{ color: '#25d366', fontSize: '0.8rem' }}>
                        <i className="fa-solid fa-location-crosshairs"></i> تم تحديد موقعك بنجاح وسيتم إرساله مع الطلب
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">ملاحظات إضافية</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                      placeholder="أي تفاصيل إضافية عن طلبك..."
                      className="form-control form-control-custom" style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="col-12 mt-3">
                    <button onClick={sendWhatsApp} className="btn-submit-wa">
                      <i className="fa-brands fa-whatsapp fa-lg"></i>
                      أرسل الطلب عبر واتساب
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-5" data-aos="fade-right">
              {/* Quick order */}
              <div className="quick-order-card mb-4">
                <h5 className="text-white fw-bold mb-2">⚡ طلب سريع</h5>
                <p className="mb-3" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
                  لا وقت لإملاء النموذج؟ تواصل معنا مباشرة عبر واتساب
                </p>
                <button onClick={() => quickWA('مرحبا! أريد طلب خدمة تصبين. أرجو التواصل معي.')}
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
                  style={{ background: '#25d366', color: '#fff', borderRadius: '12px', padding: '0.75rem' }}>
                  <i className="fa-brands fa-whatsapp fa-lg"></i> تواصل الآن
                </button>
              </div>

              {/* Contact info */}
              <div className="contact-info-card mb-4">
                <h5 className="text-white fw-bold mb-3">📞 معلومات التواصل</h5>
                {[
                  { icon: 'fa-solid fa-phone text-primary', label: 'الهاتف', value: '06 70 60 03 42' },
                  { icon: 'fa-brands fa-whatsapp text-success', label: 'واتساب', value: '06 70 60 03 42' },
                { icon: 'fa-solid fa-envelope text-info', label: 'البريد الإلكتروني', value: 'alsmlalydlal@gmail·com' },
                  { icon: 'fa-solid fa-location-dot text-warning', label: 'العنوان', value: 'Complexe résidentiel et touristiqueAl Boughaz, Av Mohamed Vl,Malabata, Tanger' },
                  { icon: 'fa-solid fa-location-dot text-warning', label: 'المدينة', value: '  مالاباطا -طنجة' },
                ].map((c, i) => (
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
                  📍 فتح الموقع على Google Maps
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
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Working hours */}
              <div className="contact-info-card">
                <h5 className="text-white fw-bold mb-3">🕐 ساعات العمل</h5>
                {[
                  { day: 'الإثنين - الأحد', time: '9:00 ص - 19:00 م' },
//                   { day: 'الجمعة', time: '2:00 م - 10:00 م' },
                ].map((h, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center py-2">
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{h.day}</span>
                    <span className="text-white fw-medium" style={{ background: 'rgba(37,211,102,0.1)', padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem' }}>
                      {h.time}
                    </span>
                  </div>
                ))}
                
                <div className="mt-3 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#25d366', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span className="d-inline-block rounded-circle me-2" style={{ width: 8, height: 8, background: '#25d366', animation: 'pulse 2s infinite' }}></span>
                    متاحون الآن لاستقبال طلباتكم
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
                <div className="logo-icon"><i class="fa-solid fa-soap"></i></div>
                <div>
                <span style={{ color: '#f59e0b' }}>SEMLALI</span>
                  <h5 className="text-white fw-bold mb-0">LAV'O RAPIDE </h5>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', lineHeight: 1.8 }} className="mb-3">
                شركة رائدة في مجال التصبين السريع والتنظيف الاحترافي. نقدم خدماتنا بأعلى معايير الجودة والسرعة لنضمن رضاكم التام.
              </p>
              <div className="d-flex gap-2">
                {['fa-brands fa-facebook-f', 'fa-brands fa-instagram', 'fa-brands fa-tiktok', 'fa-brands fa-whatsapp'].map((icon, i) => (
                  <a key={i} href="#" className="footer-social"><i className={icon}></i></a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-bold mb-3">روابط سريعة</h6>
              {['الرئيسية', 'خدماتنا', 'كيف نعمل', 'الأسعار', 'آراء العملاء', 'اتصل بنا'].map((l, i) => (
                <a key={i} href={['#hero', '#services', '#how', '#pricing', '#testimonials', '#contact'][i]} className="footer-link d-block py-1">{l}</a>
              ))}
            </div>

            {/* Services */}
            <div className="col-6 col-lg-3">
              <h6 className="text-white fw-bold mb-3">خدماتنا</h6>
              {['غسيل سريع', 'كوي احترافي', 'تنظيف جاف', 'إزالة البقع', 'تنظيف المفروشات', 'استلام وتوصيل'].map((s, i) => (
                <a key={i} href="#services" className="footer-link d-block py-1">{s}</a>
              ))}
            </div>

            {/* Contact */}
            <div className="col-lg-3">
              <h6 className="text-white fw-bold mb-3">تواصل معنا</h6>
              {[
                { icon: 'fa-solid fa-location-dot', text: ' Complexe résidentiel et touristiqueAl Boughaz, Av Mohamed Vl,Malabata, Tanger' },
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
              © {new Date().getFullYear()} LAV'O RAPIDE SEMLALI . جميع الحقوق محفوظة.
            </small>
            <small style={{ color: 'rgba(255,255,255,0.25)' }}>
              صُنع بـ <i className="fa-solid fa-heart text-danger" style={{ fontSize: '0.65rem' }}></i> في المغرب
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
                  <div className="text-white fw-bold" style={{ fontSize: '0.85rem' }}>صبيني express</div>
                  <small style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>نرد خلال دقائق ⚡</small>
                </div>
              </div>
              <button className="wa-popup-close" onClick={() => setWaPopupOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-3">
              <small className="text-muted d-block mb-2 fw-medium">رسائل سريعة:</small>
              {waQuickMessages.map((m, i) => (
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

    </div>
  );
}
