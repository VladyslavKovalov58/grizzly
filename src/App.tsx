import { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Percent, DollarSign, Settings, ShieldCheck,
  Trophy, Zap, Gift,
  RotateCcw, Gamepad2, Phone, Megaphone,
  BarChart, Target, ArrowUpRight, Users, MessageCircle
} from 'lucide-react';

const translations = {
  ru: {
    navModels: 'Модели выплат',
    navPlayers: 'Для игроков',
    navPartners: 'Для партнёров',
    navContacts: 'Контакты',
    navLogin: 'Вход',
    navReg: 'Регистрация',
    heroLine1: 'Монетизируй гемблинг',
    heroLine2: 'на максимум',
    heroType: 'Прямой рекламодатель Grizzly Casino. Лей трафик на свежий бренд и забирай до 40% RevShare',
    feature1: 'Мгновенная регистрация',
    feature2: 'Персональный менеджер',
    feature3: 'RevShare / CPA / Hybrid',
    heroBtn: 'Регистрация в Grizzly',
    modelsTitle1: 'Высокие конверсии ',
    modelsTitle2: 'для RU/CIS трафика и удобные payout-модели',
    rsTitle: 'RS до 40%',
    rsDesc: 'Без переноса минусов',
    hybridTitle: 'Hybrid',
    hybridDesc: 'Настроим гибкие комиссии под ваши источники',
    cpaTitle: 'CPA до $100',
    cpaDesc: 'Прозрачные KPI, быстрые выплаты до 2 раз в месяц',
    otherTitle: 'Прочие модели',
    otherDesc: 'Фиксы, флэты за листинги, гаранты – рассмотрим всё',
    becomePartner: 'Стать партнёром',
    pf1: 'До 15% кешбэка каждую неделю',
    pf2: 'Депозиты и выводы без верификации',
    pf3: 'Ежемесячный турнир на 2.000.000 рублей',
    pf4: 'Выводы до 60 мин на карту, крипта — до 15 минут',
    pf5: 'ТОП провайдеры, 8000+ слотов',
    pf6: 'Колесо фортуны для стримеров',
    pfText: 'Работаем с 2024 года, постоянно развиваем наш бренд. Регистрируйся в нашей партнерской программе и стань одним из тех, кто будет заливать на топовую базу.',
    pfBtn: 'Получить эксклюзивные 40%',
    abTitle: 'Быстрые и системные выплаты',
    abSub: 'без дополнительных комиссий',
    ab1: 'Быстрые выплаты партнерам без лишних проверок',
    ab2: 'Омниканальный ретеншен: звонки, рассылки, бонусы',
    ab3: 'Инструменты для повышения конверта: ленды, колеса',
    ab4: 'Revenue Share без переноса отрицательного баланса',
    ab5: 'Своя платформа → никаких лишних комиссий',
    ab6: 'Доверие к бренду за счет рекламы у стримеров',
    ab7: 'Обновление статистики ПП в реальном времени',
    ab8: 'Средний конверт Reg 2 Dep >35% (RU)',
    fTitle: 'Контакты GRIZZLY',
    tgBtnGroup: 'Перейти в Telegram',
    tgBtnManager: 'Написать в Telegram',
    fRights: 'Все права защищены.',
    fGroupTitle: 'Наша группа',
    fManagerTitle: 'Связаться с менеджером'
  },
  en: {
    navModels: 'Payout Models',
    navPlayers: 'For Players',
    navPartners: 'For Partners',
    navContacts: 'Contacts',
    navLogin: 'Login',
    navReg: 'Sign Up',
    heroLine1: 'Monetize gambling',
    heroLine2: 'to the maximum',
    heroType: 'Direct advertiser for Grizzly Casino. Drive traffic to a fresh brand and get up to 40% RevShare',
    feature1: 'Instant registration',
    feature2: 'Personal manager',
    feature3: 'RevShare / CPA / Hybrid',
    heroBtn: 'Register in Grizzly',
    modelsTitle1: 'High conversions ',
    modelsTitle2: 'for RU/CIS traffic and convenient payout models',
    rsTitle: 'RS up to 40%',
    rsDesc: 'No negative carryover',
    hybridTitle: 'Hybrid',
    hybridDesc: 'Flexible commissions tailored to your traffic sources',
    cpaTitle: 'CPA up to $100',
    cpaDesc: 'Transparent KPIs, fast payouts up to twice a month',
    otherTitle: 'Other models',
    otherDesc: 'Fixed fees, flat fees for listings, guarantees – we consider everything',
    becomePartner: 'Become a Partner',
    pf1: 'Up to 15% cashback every week',
    pf2: 'Deposits and withdrawals without KYC',
    pf3: 'Monthly tournament for €20,000',
    pf4: 'Cards up to 60 mins, crypto up to 15 mins',
    pf5: 'TOP providers, 8000+ slots',
    pf6: 'Fortune wheel for streamers',
    pfText: 'We have been constantly developing our brand since 2024. Register in our affiliate program and become one of those who will drive traffic to a top-tier database.',
    pfBtn: 'Get exclusive 40%',
    abTitle: 'Fast and systemic payouts',
    abSub: 'without additional fees',
    ab1: 'Fast payouts to partners without unnecessary checks',
    ab2: 'Omnichannel retention: calls, mailings, bonuses',
    ab3: 'Tools to increase conversion: landers, wheels',
    ab4: 'Revenue Share without negative balance carryover',
    ab5: 'Own platform → no extra fees',
    ab6: 'Brand trust due to streaming ads',
    ab7: 'Real-time affiliate program statistics update',
    ab8: 'Average Reg 2 Dep conversion >35% (RU)',
    fTitle: 'GRIZZLY Contacts',
    tgBtnGroup: 'Open in Telegram',
    tgBtnManager: 'Write in Telegram',
    fRights: 'All rights reserved.',
    fGroupTitle: 'Our group',
    fManagerTitle: 'Contact manager'
  }
};

type Lang = 'ru' | 'en';
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: typeof translations.ru }>({
  lang: 'ru',
  setLang: () => { },
  t: translations.ru
});

const Navbar = () => {
  const { lang, setLang, t } = useContext(LangContext);

  return (
    <nav className="navbar" style={{
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '1200px',
      zIndex: 100,
      background: 'rgba(20, 10, 35, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(139, 61, 255, 0.1)',
      borderRadius: '100px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: '#120d1a',
            border: '1px solid rgba(139, 61, 255, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}>
            <img src="/favicon.svg" alt="Grizzly Logo" style={{ width: 26, height: 26 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.5px', color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>
              Grizzly
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1, letterSpacing: '0.2px', textTransform: 'uppercase' }}>
              affiliate
            </span>
          </div>
        </div>
        <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#models" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>{t.navModels}</a>
          <a href="#players" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>{t.navPlayers}</a>
          <a href="#partners" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>{t.navPartners}</a>
          <a href="#contacts" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>{t.navContacts}</a>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="desktop-only" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="https://a.grizzly-partner.com/welcome/login" className="btn btn-secondary glass-btn shine-effect" style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}>{t.navLogin}</a>
            <a href="https://a.grizzly-partner.com/welcome/register" className="btn btn-primary shine-effect" style={{ padding: '0.6rem 1.5rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}>{t.navReg}</a>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
          </div>

          {/* Переключатель языка */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.25rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setLang('ru')}
              style={{ background: lang === 'ru' ? 'rgba(139, 61, 255, 0.2)' : 'transparent', color: lang === 'ru' ? 'white' : 'var(--text-muted)', border: lang === 'ru' ? '1px solid rgba(139, 61, 255, 0.3)' : '1px solid transparent', borderRadius: '8px', padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: '0.3s' }}>
              RU
            </button>
            <button
              onClick={() => setLang('en')}
              style={{ background: lang === 'en' ? 'rgba(139, 61, 255, 0.2)' : 'transparent', color: lang === 'en' ? 'white' : 'var(--text-muted)', border: lang === 'en' ? '1px solid rgba(139, 61, 255, 0.3)' : '1px solid transparent', borderRadius: '8px', padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: '0.3s' }}>
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Typewriter = ({ text, delay = 0, langKey }: { text: string, delay?: number, langKey: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setShowCursor(false);
    let isCancelled = false;

    const animate = async () => {
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      if (isCancelled) return;
      setShowCursor(true);

      while (!isCancelled) {
        // Typing forward
        for (let i = 1; i <= text.length; i++) {
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 40));
          if (isCancelled) return;
        }

        // Wait 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        if (isCancelled) return;

        // Erasing backward
        for (let i = text.length - 1; i >= 0; i--) {
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 20)); // erasing faster
          if (isCancelled) return;
        }

        // Wait before typing again
        await new Promise(resolve => setTimeout(resolve, 500));
        if (isCancelled) return;
      }
    };

    animate();

    return () => {
      isCancelled = true;
    };
  }, [text, delay, langKey]);

  return (
    <span>
      {text.split('').map((char, index) => {
        const isVisible = index < currentIndex;
        const isCursorHere = index === currentIndex;

        return (
          <span key={index} style={{ position: 'relative' }}>
            {isCursorHere && showCursor && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.1em',
                  bottom: '0.1em',
                  width: '2px',
                  background: 'var(--primary)'
                }}
              />
            )}
            <span style={{ opacity: isVisible ? 1 : 0 }}>{char}</span>
          </span>
        );
      })}
      {currentIndex === text.length && showCursor && (
        <span style={{ position: 'relative' }}>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{
              position: 'absolute',
              left: 0,
              top: '0.1em',
              bottom: '0.1em',
              width: '2px',
              background: 'var(--primary)'
            }}
          />
        </span>
      )}
    </span>
  );
};

const Hero = () => {
  const { t, lang } = useContext(LangContext);

  return (
    <section className="section hero-section" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="bg-gradient-overlay" />
      <div className="container" style={{ textAlign: 'center', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <motion.h1
          key={lang + '-h1'}
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}
        >
          {t.heroLine1} <br />
          <span style={{ color: 'var(--primary)' }}>{t.heroLine2}</span>
        </motion.h1>

        <motion.div
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            color: 'var(--text-main)',
            maxWidth: '850px',
            fontWeight: 500
          }}
        >
          <Typewriter
            langKey={lang}
            text={t.heroType}
            delay={0.5}
          />
        </motion.div>

        <motion.div
          key={lang + '-features'}
          className="hero-features"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }} // Shows up after typing is roughly done
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            fontWeight: 500
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
            {t.feature1}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
            {t.feature2}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
            {t.feature3}
          </div>
        </motion.div>

        <motion.div
          key={lang + '-btn'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <a
            href="https://a.grizzly-partner.com/welcome/register"
            className="btn btn-primary shine-effect hero-main-btn"
          >
            {t.heroBtn}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="desktop-only"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer'
        }}
        onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="mouse-scroll">
          <div className="mouse-scroll-wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

const PaymentModels = () => {
  const { t } = useContext(LangContext);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const models = [
    { title: t.rsTitle, desc: t.rsDesc, icon: <Percent size={24} /> },
    { title: t.hybridTitle, desc: t.hybridDesc, icon: <Settings size={24} /> },
    { title: t.cpaTitle, desc: t.cpaDesc, icon: <DollarSign size={24} /> },
    { title: t.otherTitle, desc: t.otherDesc, icon: <ShieldCheck size={24} /> }
  ];

  return (
    <section id="models" className="section">
      <div className="container">
        <h2 className="heading-lg text-center" style={{ maxWidth: '600px', margin: '0 auto 5rem' }}>
          {t.modelsTitle1} <br />
          {t.modelsTitle2}
        </h2>

        <div className="min-h-auto-mobile" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            className="desktop-only"
            initial={{ scale: 0.8, opacity: 0, rotate: 15 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 15 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              scale: { duration: 0.6 },
              opacity: { duration: 0.6 },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            viewport={{ once: true }}
            style={{
              position: 'absolute', zIndex: 10,
              width: 250, height: 250,
              background: 'linear-gradient(135deg, #a769ff 0%, #7622ff 100%)',
              borderRadius: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(139, 61, 255, 0.4), inset 5px 5px 20px rgba(255,255,255,0.4)'
            }}
          >
            <ArrowUpRight size={150} color="white" strokeWidth={2.5} />
          </motion.div>

          <div className="grid-models" style={{ display: 'grid', gap: '6rem', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <motion.div
                initial={isMobile ? { opacity: 0, y: 15 } : { x: -50, opacity: 0 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { x: 0, opacity: 1 }}
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? { duration: 0.4, ease: "easeOut" } : { x: { duration: 0.5 }, opacity: { duration: 0.5 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "0px" }}
                className="nova-card"
              >
                <div className="nova-icon-box">{models[0].icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{models[0].title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{models[0].desc}</p>
              </motion.div>
              <motion.div
                initial={isMobile ? { opacity: 0, y: 15 } : { x: -50, opacity: 0 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { x: 0, opacity: 1 }}
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? { duration: 0.4, ease: "easeOut" } : { delay: 0.2, x: { duration: 0.5 }, opacity: { duration: 0.5 }, y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 } }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "0px" }}
                className="nova-card"
              >
                <div className="nova-icon-box">{models[2].icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{models[2].title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{models[2].desc}</p>
              </motion.div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <motion.div
                initial={isMobile ? { opacity: 0, y: 15 } : { x: 50, opacity: 0 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { x: 0, opacity: 1 }}
                animate={isMobile ? {} : { y: [0, -12, 0] }}
                transition={isMobile ? { duration: 0.4, ease: "easeOut" } : { x: { duration: 0.5 }, opacity: { duration: 0.5 }, y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 } }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "0px" }}
                className="nova-card"
              >
                <div className="nova-icon-box">{models[1].icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{models[1].title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{models[1].desc}</p>
              </motion.div>
              <motion.div
                initial={isMobile ? { opacity: 0, y: 15 } : { x: 50, opacity: 0 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { x: 0, opacity: 1 }}
                animate={isMobile ? {} : { y: [0, -8, 0] }}
                transition={isMobile ? { duration: 0.4, ease: "easeOut" } : { delay: 0.2, x: { duration: 0.5 }, opacity: { duration: 0.5 }, y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 } }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "0px" }}
                className="nova-card"
              >
                <div className="nova-icon-box">{models[3].icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{models[3].title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{models[3].desc}</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: '5rem' }}>
          <a href="https://a.grizzly-partner.com/welcome/register" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>{t.becomePartner}</a>
        </div>
      </div>
    </section>
  );
};

const PlayersFeatures = () => {
  const { t } = useContext(LangContext);
  const features = [
    { text: t.pf1, icon: <RotateCcw size={32} /> },
    { text: t.pf2, icon: <ShieldCheck size={32} /> },
    { text: t.pf3, icon: <Trophy size={32} /> },
    { text: t.pf4, icon: <Zap size={32} /> },
    { text: t.pf5, icon: <Gamepad2 size={32} /> },
    { text: t.pf6, icon: <Gift size={32} /> },
  ];

  return (
    <section id="players" className="section">
      <div className="container">
        <div className="brand-tabs-container">
          <div className="brand-tab active" style={{ cursor: 'default' }}>
            <img src="https://grizzly.win/assets/img/grizzly.svg" alt="Grizzly Casino" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="nova-card" style={{ padding: '3rem 4rem' }}>
          <div className="grid-2" style={{ display: 'grid', gap: '4rem 6rem' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                <p style={{ fontWeight: 500, fontSize: '1rem', maxWidth: '280px', margin: 0, lineHeight: 1.4 }}>{f.text}</p>
                <div style={{ color: 'var(--primary)', opacity: 0.8, transform: 'scale(1.2)' }}>
                  {f.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="hero-flex-mobile" style={{ marginTop: '4rem', padding: '2.5rem', background: '#1c1626', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
            <p style={{ maxWidth: '600px', margin: 0, color: 'var(--text-main)', lineHeight: 1.6 }}>
              {t.pfText}
            </p>
            <a href="https://a.grizzly-partner.com/welcome/register" className="btn btn-primary" style={{ flexShrink: 0, width: '100%', maxWidth: '300px', textAlign: 'center' }}>{t.pfBtn}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AffiliateBenefits = () => {
  const { t } = useContext(LangContext);
  const benefits = [
    { text: t.ab1, icon: <DollarSign size={24} /> },
    { text: t.ab2, icon: <Phone size={24} /> },
    { text: t.ab3, icon: <Gift size={24} /> },
    { text: t.ab4, icon: <Percent size={24} /> },
    { text: t.ab5, icon: <Zap size={24} /> },
    { text: t.ab6, icon: <Megaphone size={24} /> },
    { text: t.ab7, icon: <BarChart size={24} /> },
    { text: t.ab8, icon: <Target size={24} /> },
  ];

  return (
    <section id="partners" className="section">
      <div className="container">
        <h2 className="heading-lg text-center" style={{ maxWidth: '800px', margin: '0 auto 5rem', lineHeight: '1.3' }}>
          {t.abTitle} <br />
          {t.abSub}
        </h2>

        <div className="grid-4" style={{ display: 'grid', gap: '1px', border: '1px solid rgba(139, 61, 255, 0.1)', borderRadius: '16px', overflow: 'hidden', background: 'rgba(139, 61, 255, 0.1)' }}>
          {benefits.map((b, i) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} style={{ padding: '4rem 2rem', background: 'var(--card-bg)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="nova-icon-box" style={{ marginBottom: '1.5rem', transform: 'scale(1.2)' }}>
                {b.icon}
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#e5e5e5' }}>
                {b.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useContext(LangContext);

  return (
    <footer id="contacts" style={{ paddingTop: '6rem', paddingBottom: '3rem', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="nova-card" style={{ padding: '4rem', textAlign: 'center', background: 'linear-gradient(180deg, rgba(20, 10, 35, 0.8) 0%, rgba(10, 5, 20, 0.9) 100%)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '4rem', letterSpacing: '-0.02em' }}>{t.fTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            <a href="https://t.me/grizzly_casino" target="_blank" rel="noopener noreferrer" className="contact-card shine-effect" style={{
              padding: '3rem 2rem',
              borderRadius: '24px',
              background: 'rgba(139, 61, 255, 0.05)',
              border: '1px solid rgba(139, 61, 255, 0.1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              textDecoration: 'none'
            }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #a769ff 0%, #7622ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 25px rgba(139, 61, 255, 0.4)' }}>
                <Users size={36} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem', fontWeight: 700 }}>{t.fGroupTitle}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0', fontSize: '1rem' }}>{t.tgBtnGroup}</p>
            </a>

            <a href="https://t.me/grizzly_casino" target="_blank" rel="noopener noreferrer" className="contact-card shine-effect" style={{
              padding: '3rem 2rem',
              borderRadius: '24px',
              background: 'rgba(139, 61, 255, 0.05)',
              border: '1px solid rgba(139, 61, 255, 0.1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              textDecoration: 'none'
            }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #a769ff 0%, #7622ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 25px rgba(139, 61, 255, 0.4)' }}>
                <MessageCircle size={36} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem', fontWeight: 700 }}>{t.fManagerTitle}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0', fontSize: '1rem' }}>{t.tgBtnManager}</p>
            </a>
          </div>
        </div>

        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '3rem' }}>
          © 2026 Grizzly Affiliate. {t.fRights}
        </div>
      </div>
    </footer>
  );
};

const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'ru';
  const path = window.location.pathname;
  if (path.startsWith('/ru')) return 'ru';
  if (path.startsWith('/en')) return 'en';

  const browserLang = navigator.language || (navigator as any).userLanguage || '';
  return browserLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
};

function App() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    const path = window.location.pathname;
    if (!path.startsWith('/ru') && !path.startsWith('/en')) {
      window.history.replaceState(null, '', `/${lang}${window.location.search}${window.location.hash}`);
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/ru')) setLangState('ru');
      else if (currentPath.startsWith('/en')) setLangState('en');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);

  const setLang = (newLang: Lang) => {
    if (newLang === lang) return;
    setLangState(newLang);
    window.history.pushState(null, '', `/${newLang}${window.location.search}${window.location.hash}`);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <Navbar />
      <Hero />
      <PaymentModels />
      <PlayersFeatures />
      <AffiliateBenefits />
      <Footer />

      {/* Mobile Bottom Bar */}
      <div className="mobile-bottom-bar" style={{ padding: '1rem', background: 'rgba(10,5,20,0.95)' }}>
        <a href="https://a.grizzly-partner.com/welcome/register" className="btn btn-primary shine-effect" style={{ flex: 1, padding: '1rem', fontSize: '1rem', borderRadius: '12px' }}>
          {translations[lang].navReg}
        </a>
        <a href="https://a.grizzly-partner.com/welcome/login" className="btn btn-secondary glass-btn shine-effect" style={{ flex: 1, padding: '1rem', fontSize: '1rem', borderRadius: '12px' }}>
          {translations[lang].navLogin}
        </a>
      </div>
    </LangContext.Provider>
  );
}

export default App;
