import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Percent, DollarSign, Settings, ShieldCheck,
  Trophy, Zap, Gift,
  RotateCcw, Gamepad2,
  ArrowUpRight, Users, MessageCircle, Activity,
  Mail, Send, MessageSquare, Star
} from 'lucide-react';

const translations = {
  ru: {
    navModels: 'Модели выплат',
    navPlayers: 'Для игроков',
    navContacts: 'Контакты',
    navLogin: 'Вход',
    navReg: 'Регистрация',
    navTerms: 'Условия оплаты',
    heroLine1: 'Монетизируй гемблинг',
    heroLine2: 'на максимум',
    heroType: 'Прямой рекламодатель Grizzly Casino. Лей трафик на  НОВЫЙ БРЕНД и забирай до 70% RevShare',
    feature1: 'Высокие конверсии для RU трафика',
    feature2: 'Удобные payout-модели',
    feature3: '',
    heroBtn: 'Регистрация в Grizzly',
    modelsTitle1: 'Высокие конверсии ',
    modelsTitle2: 'для RU трафика и удобные payout-модели',
    rsTitle: 'Revenue Share (RS) до 70%',
    rsShort: 'Revenue Share - это комиссионная модель, которая позволяет партнерам получать регулярный доход от прибыли онлайн казино.',
    rsFull: `Revenue Share - это комиссионная модель, которая позволяет партнерам получать регулярный доход от прибыли онлайн казино. Расчет заработка Партнера по методу RevenueShare заключается в передаче Партнеру установленного процента от чистого дохода Казино (NGR) с каждого приведенного реферала в размере до 70% от NGR. 
Размер вознаграждения каждого Партнера обсуждается отдельно и определяется его уровнем в Партнерской программе.
Модель доступна каждому партнеру. Доступны фиксированная и динамическая ставки.

1-й уровень - 30,00%, 0-5 FD, NGR – от 1.00 USD/EUR | 10,000 RUB
2-й - 35,00%, 5-10 FD, NGR – 1.000 USD/EUR | 100,000 RUB
3-й - 40,00%, 10-20 FD, NGR – 2.000 USD/EUR | 200,000 RUB
4-й - 45,00%, 20-50 FD, NGR – 4.000 USD/EUR | 400,000 RUB
5-й - 50,00%, 50-200 FD, NGR – 5.000 USD/EUR | 500,000 RUB
6-й - 55,00%, 200+ FD, NGR – 10.000 USD/EUR | 1000,000 RUB

Динамическая ставка устанавливается по результатам последнего отчетного периода и зависит от KPI.
Размеры вознаграждения Партнера при использовании "брендового трафика" обсуждается отдельно.
Изменение уровня Партнера возможно только 1-го числа каждого месяца. Уровень присваивается на период до 3-х (трех) месяцев. В случае, если показатели Партнера не соответствуют необходимым параметрам уровня (допускается индивидуальная погрешность в 10-15%), то процентная ставка Заработка может быть уменьшена.`,
    hybridTitle: 'Hybrid',
    hybridShort: 'Hybrid модель сочетает в себе RevShare + CPA, предлагая фиксированное вознаграждение за каждого подходящего игрока, а также дополнительный процент от NGR.',
    hybridFull: 'Hybrid модель сочетает в себе RevShare + CPA, предлагая фиксированное вознаграждение за каждого подходящего игрока, а также дополнительный процент от NGR по предварительному согласованию с affiliate-менеджером.\n\nУсловия сотрудничества по модели Revenue Share + CPA обсуждаются с каждым Партнером индивидуально.\n\nОкно пост-клика- 30 дней.\n\nТестовые капы - 20-30 FD.\n\nОбе стороны должны обсудить все условия KPI для квалификации трафика до начала тестов. Целевая аудитория также должна быть согласована заранее.',
    cpaTitle: 'CPA до 250 USD',
    cpaShort: 'Забирай процент прибыли от твоих лидов. Фиксированная оплата / Прозрачные KPI / Быстрые выплаты',
    cpaFull: `Метод CPA предполагает расчет вознаграждения Партнеру, исходя из фиксированной ставки за каждый первый депозит (FD), внесенный привлеченными рефералами. Модель доступна только активным Партнерам после оценки качества источников и самого трафика на индивидуальных условиях – с выплатой от 10 до 250 USD за один FD.
    
Окно пост-клика- 30 дней.

Тестовые капы- 20-30 FD.
Обе стороны должны обсудить все условия KPI для квалификации трафика до начала тестов. Целевая аудитория также должна быть согласована заранее.
Важным условием смены метода Партнера с RS на модель CPA является осуществление проверки качества привлеченного трафика в тестовом режиме. Особое внимание, что признание трафика некачественным является основанием для отказа в переводе на модель CPA и предложения другой модели.
В случае, если Партнер не дает согласия на проведение мероприятий по оценке качества трафика, то участие такого Партнера в Партнерской программе по методу CPA будет приостановлено или сотрудничество полностью прекращено.`,
    otherTitle: 'Прочие модели',
    otherDesc: 'Фиксы, флэты за листинги, гаранты – рассмотрим всё',
    becomePartner: 'Условия оплаты',
    rsTermsBtn: 'Условия по RS',
    cpaTermsBtn: 'Условия по CPA/HYBRID',
    qualityTitle: 'Требования к качеству трафика',
    qualityPoint1: 'Общий объем дубликатов и самоисключений не должен превышать 15-20%.',
    qualityPoint2: 'Среднее количество депозитов приведенных игроков должно быть не менее 1,5.',
    prohibitedTitle: 'Запрещенный трафик',
    prohibitedBtn: 'Запрещенный трафик',
    pf1: 'Депозиты и выводы без верификации',
    pf2: 'VIP статус – 10 уровней',
    pf3: 'До 15% CashBack каждую неделю',
    pf4: 'Регулярные турниры',
    pf5: 'Быстрые выплаты от 3 минут',
    pf6: 'Лицензия Anjouan',
    pf7: 'Более 8000 слотов, ТОП провайдеры',
    pf8: 'Колесо фортуны для стримеров',
    pf9: 'Еженедельные лотереи',
    pf10: 'Сильные retention-решения',
    pfText: 'Работаем с 2024 года, постоянно развиваем наш бренд. Регистрируйся в нашей партнерской программе и стань одним из тех, кто будет заливать на топовую базу.',
    pfBtn: 'Получить эксклюзивные условия',
    tgBtnGroup: 'Перейти в Telegram',
    tgBtnManager: 'Написать в Telegram',
    fRights: 'Все права защищены.',
    fGroupTitle: 'Наша группа',
    fManagerTitle: 'Связаться с менеджером',
    fContactSupport: 'Связаться с нами',
    fContactResources: 'Каналы',
    fContactEmail: 'Почта',
    fContactManager: 'Менеджер',
    fContactGroup: 'Группа',
    fContactFeedback: 'Отзывы',
    fExternalPlatforms: 'Мы на других площадках:',
    fCasinoReviews: 'Читать отзывы на casino.ru',
    seoTitle: 'Grizzly Affiliate | Прямой рекламодатель Grizzly Casino',
    seoDesc: 'Grizzly Affiliate — прямой рекламодатель Grizzly Casino. Лей трафик на свежий бренд с высокими конверсиями. Получай до 70% RevShare без переноса минусов или CPA до $250.'
  },
  en: {
    navModels: 'Payout Models',
    navPlayers: 'For Players',
    navContacts: 'Contacts',
    navLogin: 'Login',
    navReg: 'Sign Up',
    navTerms: 'Payment Terms',
    heroLine1: 'Monetize gambling',
    heroLine2: 'to the maximum',
    heroType: 'Direct advertiser for Grizzly Casino. Drive traffic to a NEW BRAND and get up to 70% RevShare',
    feature1: 'High conversions for RU traffic',
    feature2: 'Convenient payout models',
    feature3: '',
    heroBtn: 'Register in Grizzly',
    modelsTitle1: 'High conversions ',
    modelsTitle2: 'for RU traffic and convenient payout models',
    rsTitle: 'Revenue Share (RS) up to 70%',
    rsShort: 'Revenue Share is a commission model that allows partners to receive regular income from online casino profits.',
    rsFull: 'Detailed terms for RS...',
    hybridTitle: 'Hybrid',
    hybridShort: 'Hybrid model combines RevShare + CPA, offering fixed reward for each suitable player, plus additional percentage of NGR.',
    hybridFull: 'Detailed terms for Hybrid...',
    cpaTitle: 'CPA up to 250 USD',
    cpaShort: 'Take a percentage of profit from your leads. Fixed pay / Transparent KPIs / Fast payouts',
    cpaFull: 'Detailed terms for CPA...',
    otherTitle: 'Other models',
    otherDesc: 'Fixed fees, flat fees for listings, guarantees – we consider everything',
    becomePartner: 'Payment Terms',
    rsTermsBtn: 'RS Terms',
    cpaTermsBtn: 'CPA/HYBRID Terms',
    qualityTitle: 'Traffic Quality Requirements',
    qualityPoint1: 'The total volume of duplicates and self-exclusions should not exceed 15-20%.',
    qualityPoint2: 'Average number of deposits from players should be at least 1.5.',
    prohibitedTitle: 'Prohibited Traffic',
    prohibitedBtn: 'Prohibited Traffic',
    pf1: 'Deposits and withdrawals without KYC',
    pf2: 'VIP status – 10 levels',
    pf3: 'Up to 15% CashBack every week',
    pf4: 'Regular tournaments',
    pf5: 'Fast payouts from 3 minutes',
    pf6: 'Anjouan license',
    pf7: 'Over 8000 slots, TOP providers',
    pf8: 'Fortune wheel for streamers',
    pf9: 'Weekly lotteries',
    pf10: 'Strong retention solutions',
    pfText: 'We have been constantly developing our brand since 2024. Register in our affiliate program and become one of those who will drive traffic to a top-tier database.',
    pfBtn: 'Get exclusive conditions',
    tgBtnGroup: 'Open in Telegram',
    tgBtnManager: 'Write in Telegram',
    fRights: 'All rights reserved.',
    fGroupTitle: 'Our group',
    fManagerTitle: 'Contact manager',
    fContactSupport: 'Contact Us',
    fContactResources: 'Channels',
    fContactEmail: 'Email',
    fContactManager: 'Manager',
    fContactGroup: 'Group',
    fContactFeedback: 'Feedback',
    fExternalPlatforms: 'External Platforms:',
    fCasinoReviews: 'Read reviews on casino.ru',
    seoTitle: 'Grizzly Affiliate | Direct Advertiser for Grizzly Casino',
    seoDesc: 'Grizzly Affiliate is the direct advertiser for Grizzly Casino. Get up to 70% RevShare with no negative carryover or CPA up to $250.'
  }
};

type Lang = 'ru' | 'en';
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: typeof translations.ru }>({
  lang: 'ru',
  setLang: () => { },
  t: translations.ru
});

const Navbar = ({ onTermsClick, onHomeClick }: { onTermsClick: () => void; onHomeClick: () => void }) => {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={onHomeClick}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: '#120d1a',
            border: '1px solid rgba(139, 61, 255, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)'
          }}>
            <img src="/favicon.svg" alt="Grizzly Logo" style={{ width: 22, height: 22 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.4px', color: '#fff', textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap' }}>
              Grizzly
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1, letterSpacing: '0.1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              affiliate
            </span>
          </div>
        </div>
        <div className="desktop-only" style={{ display: 'flex', gap: '1.15rem', alignItems: 'center' }}>
          <a href="#models" onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ fontSize: '0.8rem', color: '#e5e5e5', fontWeight: 500, whiteSpace: 'nowrap' }}>{t.navModels}</a>
          <button onClick={onTermsClick} style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.8rem', color: '#e5e5e5', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, whiteSpace: 'nowrap' }}>{t.navTerms}</button>
          <a href="#players" onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('players')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ fontSize: '0.8rem', color: '#e5e5e5', fontWeight: 500, whiteSpace: 'nowrap' }}>{t.navPlayers}</a>
          <a href="#contacts" onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ fontSize: '0.8rem', color: '#e5e5e5', fontWeight: 500, whiteSpace: 'nowrap' }}>{t.navContacts}</a>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="desktop-only" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a href="https://a.grizzly-partner.com/welcome/login" className="btn btn-secondary glass-btn shine-effect" style={{ padding: '0.55rem 1.2rem', borderRadius: '10px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{t.navLogin}</a>
            <a href="https://a.grizzly-partner.com/welcome/register" className="btn btn-primary shine-effect" style={{ padding: '0.55rem 1.2rem', borderRadius: '10px', background: 'var(--primary)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{t.navReg}</a>
            <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }}></div>
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

const Modal = ({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 2000,
        display: isOpen ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>{title}</h3>
        <div style={{
          fontSize: '1rem',
          lineHeight: 1.6,
          color: '#e5e5e5',
          whiteSpace: 'pre-line'
        }}>
          {content}
        </div>
      </motion.div>
    </motion.div>
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
            key={lang + '-btn'}
            className="hero-btn-wrap"
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

const PaymentModels = ({ onTermsClick }: { onTermsClick: (id?: string) => void }) => {
  const { t } = useContext(LangContext);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);

  const models = [
    { title: t.rsTitle, desc: t.rsShort, full: t.rsFull, icon: <Percent size={24} /> },
    { title: t.hybridTitle, desc: t.hybridShort, full: t.hybridFull, icon: <Settings size={24} /> },
    { title: t.cpaTitle, desc: t.cpaShort, full: t.cpaFull, icon: <DollarSign size={24} /> },
    { title: t.otherTitle, desc: t.otherDesc, icon: <ShieldCheck size={24} />, isStatic: true }
  ];

  return (
    <section id="models" className="section">
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal?.title || ''}
        content={activeModal?.content || ''}
      />
      <div className="container">
        <h2 className="heading-lg text-center" style={{ maxWidth: '600px', margin: '0 auto 5rem' }}>
          {t.modelsTitle1} <br />
          {t.modelsTitle2}
        </h2>

        <div className="min-h-auto-mobile" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            className="desktop-only"
            initial={{ scale: 0.8, opacity: 0, rotate: 15, y: 0 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 15, y: [0, -20, 0] }}
            transition={{
              scale: { duration: 0.6 },
              opacity: { duration: 0.6 },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.6 }
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
              {[models[0], models[2]].map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={isMobile ? { opacity: 0, y: 15 } : { x: -50, opacity: 0, y: 0 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { x: 0, opacity: 1, y: [0, -10, 0] }}
                  transition={isMobile ? { duration: 0.4, ease: "easeOut" } : { x: { duration: 1, ease: "easeOut", delay: idx * 0.2 }, opacity: { duration: 1, ease: "easeOut", delay: idx * 0.2 }, y: { repeat: Infinity, duration: 5 + idx, ease: "easeInOut", delay: 1 } }}
                  viewport={{ once: true, margin: isMobile ? "-20px" : "0px" }}
                  className="nova-card payment-card"
                  onClick={() => !m.isStatic && setActiveModal({ title: m.title, content: m.full || '' })}
                  style={{ cursor: m.isStatic ? 'default' : 'pointer', flex: 1 }}
                >
                  <div className="payment-card-header">
                    <div className="nova-icon-box" style={{ marginBottom: 0 }}>{m.icon}</div>
                    <h3 style={{ margin: 0 }}>{m.title}</h3>
                  </div>
                  <p className="payment-card-desc">{m.desc}</p>
                  {!m.isStatic && (
                    <div className="learn-more-hint">Подробнее</div>
                  )}
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {[models[1], models[3]].map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={isMobile ? { opacity: 0, y: 15 } : { x: 50, opacity: 0, y: 0 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { x: 0, opacity: 1, y: [0, -12, 0] }}
                  transition={isMobile ? { duration: 0.4, ease: "easeOut" } : { x: { duration: 1, ease: "easeOut", delay: idx * 0.2 }, opacity: { duration: 1, ease: "easeOut", delay: idx * 0.2 }, y: { repeat: Infinity, duration: 6 + idx, ease: "easeInOut", delay: 1 } }}
                  viewport={{ once: true, margin: isMobile ? "-20px" : "0px" }}
                  className="nova-card payment-card"
                  onClick={() => !m.isStatic && setActiveModal({ title: m.title, content: m.full || '' })}
                  style={{ cursor: m.isStatic ? 'default' : 'pointer', flex: 1 }}
                >
                  <div className="payment-card-header">
                    <div className="nova-icon-box" style={{ marginBottom: 0 }}>{m.icon}</div>
                    <h3 style={{ margin: 0 }}>{m.title}</h3>
                  </div>
                  <p className="payment-card-desc">{m.desc}</p>
                  {!m.isStatic && (
                    <div className="learn-more-hint">Подробнее</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center btn-margin-top" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onTermsClick('terms-rs')} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>{t.rsTermsBtn}</button>
          <button onClick={() => onTermsClick('terms-cpa')} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>{t.cpaTermsBtn}</button>
        </div>
      </div>
    </section>
  );
};

const TermsView = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lang } = useContext(LangContext);

  const content = {
    ru: {
      title: 'Условия оплаты',
      rsTitle: 'Revenue Share',
      rsPoints: [
        'Отчетный период, установленный Партнерской Программой, равен половине календарного месяца: с 1-го по 15-е число месяца, и с 16-го по 30/31-е число месяца.',
        'Начисления за прошедший отчетный период производятся до 5 рабочих дней после окончания отчетного периода.',
        'Партнерские выплаты могут быть не выплачены в срок по причинам проверки источников трафика партнеров или из-за подозрительной активности игроков Партнера.',
        'Минимальная возможная выплата с партнерского счета составляет 15 USD/EUR, 1.000 RUB, 500 UAH, 5.000 KZT или эквивалента в иных валютах',
        'Отрицательный баланс переноситься на следующий отчетный период.',
        'Смена платежных реквизитов осуществляется минимум за 5 рабочих дня, до окончания текущего отчетного периода.',
        'Аккаунты Партнеров, которые длительное время не посещали свой личный кабинет в Партнерской Программе и не отвечают на сообщения, могут быть заморожены. Это связано с тем, что такие аккаунты больше прочих подвержены мошенническим действиям третьих лиц.',
        'Для восстановления доступа к аккаунту, необходимо будет пройти процедуру верификации аккаунта.',
        'Партнерская Программа оставляет за собой право не выплачивать партнерский доход за игроков-фродеров.'
      ],
      cpaTitle: 'CPA и Hybrid',
      cpaPoints: [
        'Отчетный период, установленный Партнерской Программой по данным методам, равен 30 дней.',
        'Ни один из видов запрещенного трафика, в случае обнаружения, оплачиваться не будет. Партнерская Программа имеет право продлить период холда или отклонить некоторые конверсии по собственному усмотрению.',
        'Выплата производится после аналитики трафика. В случае подозрения на фрод, компания оставляет за собой право захолдировать выплату партнеру.',
        'Если CPA-трафик по объективным причинам признан некачественным, партнерская программа оставляет за собой право оплатить такой трафик по RevShare.',
        'Дальнейшие условия, такие как источники трафика, лимиты и ставки обсуждаются после проведения тестов и анализа результатов. Оверкапы могут быть не оплачены даже при хорошем качестве трафика.',
        'Любая из сторон может потребовать изменения условий соглашения в течение 14 дней до начала нового месяца.',
        'В случае прекращения сотрудничества возможны 2 варианта развития событий:',
        'Все FD подлежат оплате до момента прекращения сотрудничества. Игроки, которые зарегистрировались после момента прекращения сотрудничества, не подлежат оплате.',
        'В случае мошенничества или запрещенного трафика, все FD не подлежат оплате.'
      ],
      qualityTitle: translations[lang].qualityTitle,
      qualityPoints: [
        translations[lang].qualityPoint1,
        translations[lang].qualityPoint2
      ],
      prohibitedTitle: translations[lang].prohibitedTitle,
      prohibitedPoints: [
        'Мотивированный трафик по СРА и Hybrid является запрещенным. Включает в себя любой трафик, привлеченный по схеме "обыграть/обмануть казино".',
        'Вводящие в заблуждение (заведомо неправильная информация о казино: бонусы за регистрацию, завышение процента фактических бонусов, количества FS и т.д.).',
        'Фрод (несколько аккаунтов, аномально высокий процент Bonus Hunter и т.д.).',
        'Брендовый трафик любого вида (контекстная реклама, SEO).',
        'Трафик с поддельных аккаунтов в соцсетях наших проектов или тех, которые ассоциируются с официальными (использование логотипов, официального брендинга, обращение от имени казино и т.д.).',
        'Личные аккаунты в Telegram, Instagram или TikTok.'
      ],
      expandText: 'Предоставление партнером заведомо неправдивой информации об источниках трафика, влечет за собой блокировку аккаунта. Партнерская Программа GRIZZLY не предоставляет Партнерам конфиденциальную информацию и статистику привлеченных игроков, кроме той, которую Партнер может самостоятельно видеть в личном кабинете Партнерской программы. В случае мошенничества или привлечения запрещенного трафика, Партнерская Программа немедленно расторгает CPA-соглашение и оставляет за собой право заморозить баланс Партнера на неопределенный срок до выяснения ситуации. Во избежание серьезных финансовых потерь обеих сторон, выплаты по новым FD, привлеченным после расторжения CPA-соглашения, могут быть пересчитаны в соответствии с комиссионной моделью RevShare.\n\nCPA и Hybrid модели могут быть деактивированы Партнерской Программой, если любая из них приносит отрицательную прибыль казино или Партнерской Программе в течение нескольких отчетных периодов. Кроме того, с момента прекращения действия модели CPA игроки, приведенные с соблюдением условий для модели CPA, не могут быть учтены в вознаграждении Партнера.\n\nВ случае снижения качества трафика Партнерская Программа письменно информирует Партнера об этом, после чего принимает решение либо о прекращении сотрудничества, либо об оптимизации потоков трафика. Кроме того, может быть принято обоюдное решение о продолжении сотрудничества с новыми квалификационными условиями или с базовым уровнем. Уведомление должно быть сделано не менее, чем за 2 дня до расторжения договора CPA или изменения условий сотрудничества.'
    },
    en: {
      title: 'Payment Terms',
      rsTitle: 'Revenue Share',
      rsPoints: [
        'The reporting period is half a calendar month: 1st-15th and 16th-30/31st.',
        'Payouts are processed within 5 business days after the period ends.',
        'Min payout: 15 USD/EUR or equivalent.'
      ],
      cpaTitle: 'CPA and Hybrid',
      cpaPoints: [
        'Reporting period: 30 days.',
        'Prohibited traffic will not be paid.'
      ],
      qualityTitle: translations[lang].qualityTitle,
      qualityPoints: [
        translations[lang].qualityPoint1,
        translations[lang].qualityPoint2
      ],
      prohibitedTitle: translations[lang].prohibitedTitle,
      prohibitedPoints: [
        'Incentivized traffic, motivated schemes.',
        'Misleading information.',
        'Fraud, multi-accounting.',
        'Brand traffic (context, SEO).'
      ],
      expandText: 'Detailed legal information about traffic quality and fraud prevention...'
    }
  }[lang];

  return (
    <div className="terms-view" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="nova-card"
          style={{ padding: '3rem' }}
        >
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '3rem' }}>{content.title}</h1>

          <div className="terms-section" id="terms-rs">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>{content.rsTitle}</h2>
            <ul className="terms-list">
              {content.rsPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="terms-section" id="terms-cpa" style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>{content.cpaTitle}</h2>
            <ul className="terms-list">
              {content.cpaPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="terms-section" style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>{content.qualityTitle}</h2>
            <ul className="terms-list">
              {content.qualityPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="terms-section" id="terms-prohibited" style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>{content.prohibitedTitle}</h2>
            <ul className="terms-list">
              {content.prohibitedPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="terms-expandable" style={{ marginTop: '3rem' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn-secondary"
              style={{
                background: 'rgba(139, 61, 255, 0.1)',
                border: '1px solid var(--primary)',
                padding: '0.8rem 2rem',
                borderRadius: '12px',
                color: 'var(--primary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isExpanded ? (lang === 'ru' ? 'Скрыть' : 'Hide') : (lang === 'ru' ? 'Подробнее' : 'Show details')}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', marginTop: '1.5rem' }}
                >
                  <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                    {content.expandText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PlayersFeatures = () => {
  const { t } = useContext(LangContext);
  const features = [
    { text: t.pf1, icon: <ShieldCheck size={32} /> },
    { text: t.pf2, icon: <Trophy size={32} /> },
    { text: t.pf3, icon: <RotateCcw size={32} /> },
    { text: t.pf4, icon: <Activity size={32} /> },
    { text: t.pf5, icon: <Zap size={32} /> },
    { text: t.pf6, icon: <ShieldCheck size={32} /> },
    { text: t.pf7, icon: <Gamepad2 size={32} /> },
    { text: t.pf8, icon: <Gift size={32} /> },
    { text: t.pf9, icon: <Trophy size={32} /> },
    { text: t.pf10, icon: <MessageCircle size={32} /> },
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
          <div className="grid-2-to-1" style={{ display: 'grid', gap: '2rem 6rem' }}>
            {features.map((f, i) => (
              <div key={i} className="player-feature-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <p className="player-feature-text" style={{ fontWeight: 500, maxWidth: '320px', margin: 0, lineHeight: 1.4, color: '#e5e5e5' }}>{f.text}</p>
                <div className="player-feature-icon" style={{ color: 'var(--primary)', opacity: 0.8 }}>
                  {f.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pf-container" style={{ marginTop: '4rem', padding: '2.5rem', background: '#1c1626', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
            <a href="https://a.grizzly-partner.com/welcome/register" className="btn btn-primary pf-main-btn" style={{ flexShrink: 0, width: '100%', maxWidth: '350px', textAlign: 'center' }}>{t.pfBtn}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const TrafficQuality = ({ onTermsClick }: { onTermsClick: (id?: string) => void }) => {
  const { t } = useContext(LangContext);
  return (
    <section className="section" style={{ position: 'relative', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="nova-card"
          style={{
            padding: '2.5rem 3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(139, 61, 255, 0.08) 0%, rgba(10, 5, 20, 0.9) 100%)',
            border: '1px solid rgba(139, 61, 255, 0.15)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="heading-lg" style={{
              color: 'var(--primary)',
              marginBottom: '0.75rem',
              fontSize: '1.6rem',
              textShadow: '0 0 20px rgba(139, 61, 255, 0.3)'
            }}>
              {t.qualityTitle}
            </h2>
            <div style={{ width: '40px', height: '2px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px', opacity: 0.5 }}></div>
          </div>

          <div style={{ textAlign: 'left', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              display: 'flex',
              gap: '1.25rem',
              background: 'rgba(255,255,255,0.02)',
              padding: '1.25rem 1.75rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.04)',
              alignItems: 'center'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(139, 61, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(139, 61, 255, 0.2)'
              }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>1</span>
              </div>
              <p style={{ margin: 0, color: '#f1f1f1', fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 500 }}>{t.qualityPoint1}</p>
            </div>

            <div style={{
              display: 'flex',
              gap: '1.25rem',
              background: 'rgba(255,255,255,0.02)',
              padding: '1.25rem 1.75rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.04)',
              alignItems: 'center'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(139, 61, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(139, 61, 255, 0.2)'
              }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>2</span>
              </div>
              <p style={{ margin: 0, color: '#f1f1f1', fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 500 }}>{t.qualityPoint2}</p>
            </div>
          </div>

          <button
            onClick={() => onTermsClick('terms-prohibited')}
            className="btn btn-secondary glass-btn shine-effect"
            style={{
              padding: '0.8rem 3rem',
              fontSize: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 61, 255, 0.4)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {t.prohibitedBtn}
          </button>
        </motion.div>
      </div>
    </section>
  );
};


const Footer = () => {
  const { t } = useContext(LangContext);

  return (
    <footer id="contacts" style={{ paddingTop: '6rem', paddingBottom: '3rem', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="nova-card" style={{ padding: '3.5rem 4rem', background: 'linear-gradient(180deg, rgba(20, 10, 35, 0.8) 0%, rgba(10, 5, 20, 0.9) 100%)' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Communication Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(139, 61, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={20} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'white', margin: 0, fontWeight: 700 }}>{t.fContactSupport}</h3>
              </div>

              <a href="mailto:affiliate@grizzly.bingo" className="shine-effect" style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'rgba(139, 61, 255, 0.05)',
                border: '1px solid rgba(139, 61, 255, 0.1)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                textDecoration: 'none', transition: '0.3s'
              }}>
                <Mail size={18} color="var(--primary)" />
                <span style={{ color: '#e5e5e5', fontSize: '0.95rem' }}>{t.fContactEmail}: affiliate@grizzly.bingo</span>
              </a>

              <a href="https://t.me/grzl_supp" target="_blank" rel="noopener noreferrer" className="shine-effect" style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'rgba(139, 61, 255, 0.05)',
                border: '1px solid rgba(139, 61, 255, 0.1)',
                display: 'flex', alignItems: 'center', gap: '1.1rem',
                textDecoration: 'none', transition: '0.3s'
              }}>
                <Send size={18} color="var(--primary)" />
                <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>{t.fContactManager}: @grzl_supp</span>
              </a>
            </div>

            {/* Resources Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(139, 61, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'white', margin: 0, fontWeight: 700 }}>{t.fContactResources}</h3>
              </div>

              <a href="https://t.me/grizzly_casino" target="_blank" rel="noopener noreferrer" className="shine-effect" style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'rgba(139, 61, 255, 0.05)',
                border: '1px solid rgba(139, 61, 255, 0.1)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                textDecoration: 'none', transition: '0.3s'
              }}>
                <Send size={18} color="var(--primary)" />
                <span style={{ color: '#e5e5e5', fontSize: '0.95rem' }}>{t.fContactGroup}: @grizzly_casino</span>
              </a>

              <a href="https://t.me/grizzly_feedback" target="_blank" rel="noopener noreferrer" className="shine-effect" style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'rgba(139, 61, 255, 0.05)',
                border: '1px solid rgba(139, 61, 255, 0.1)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                textDecoration: 'none', transition: '0.3s'
              }}>
                <Star size={18} color="var(--primary)" />
                <span style={{ color: '#e5e5e5', fontSize: '0.95rem' }}>{t.fContactFeedback}: @grizzly_feedback</span>
              </a>
            </div>
          </div>

          {/* External Review Link */}
          <div className="footer-external-block" style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.fExternalPlatforms}</p>
            <a href="https://casino.ru/otzyvy-casino-grizzly/" target="_blank" rel="noopener noreferrer" style={{
              textDecoration: 'none', transition: '0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem'
            }}>
              <img src="https://casino.ru/wp-content/themes/casino.ru/assets/images/logo.svg" alt="Casino.ru" style={{ height: '30px', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <span className="footer-external-link" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'underline' }}>{t.fCasinoReviews}&nbsp;→</span>
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
  const [view, setView] = useState<'home' | 'terms'>('home');

  useEffect(() => {
    const path = window.location.pathname;

    // Language and URL enforcement
    const isTerms = path.includes('/terms');
    if (isTerms) setView('terms');

    // Ensure URL has lang prefix for SEO
    const hasLangPrefix = path.startsWith('/ru') || path.startsWith('/en');
    if (!hasLangPrefix) {
      const suffix = isTerms ? '/terms' : '';
      window.history.replaceState(null, '', `/${lang}${suffix}${window.location.search}${window.location.hash}`);
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      if (currentPath.includes('/terms')) setView('terms');
      else setView('home');

      if (currentPath.includes('/ru')) setLangState('ru');
      else if (currentPath.includes('/en')) setLangState('en');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);

  // Dynamic SEO
  useEffect(() => {
    const t = translations[lang];
    document.title = t.seoTitle + (view === 'terms' ? ` | ${t.navTerms}` : '');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.seoDesc);

    // Update canonical if needed
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const suffix = view === 'terms' ? '/terms' : '';
    canonical.setAttribute('href', `https://grizzly-affiliate.com/${lang}${suffix}`);
  }, [lang, view]);

  const setLang = (newLang: Lang) => {
    if (newLang === lang) return;
    setLangState(newLang);
    const suffix = view === 'terms' ? '/terms' : '';
    window.history.pushState(null, '', `/${newLang}${suffix}${window.location.search}${window.location.hash}`);
  };

  const showTerms = (sectionId?: string) => {
    setView('terms');
    window.history.pushState(null, '', `/${lang}/terms${sectionId ? '#' + sectionId : ''}`);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showHome = () => {
    setView('home');
    window.history.pushState(null, '', `/${lang}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <Navbar onTermsClick={showTerms} onHomeClick={showHome} />
      {view === 'home' ? (
        <>
          <Hero />
          <PaymentModels onTermsClick={showTerms} />
          <TrafficQuality onTermsClick={showTerms} />
          <PlayersFeatures />
        </>
      ) : (
        <TermsView />
      )}
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
