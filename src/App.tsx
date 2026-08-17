import { useEffect, useState } from 'react'
import { 
  Copy, Check, LogIn, Globe, Sparkles, 
  ShieldCheck, Plus, Settings, ArrowRight, ExternalLink
} from 'lucide-react'
import './App.css'

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  color?: string;
}

interface Code {
  id: string;
  code: string;
  link?: string;
  description: string;
  is_verified: boolean;
  user: string;
  karma?: number;
  email?: string;
}

const API_BASE_URL = 'https://codiceamico.app/api/extension';

const getFirstName = (fullName: string) => fullName.split(' ')[0];

function App() {
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [codes, setCodes] = useState<Code[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabUrl, setActiveTabUrl] = useState<string>('');
  const [showSafariGuide, setShowSafariGuide] = useState(false);
  const [userProfile, setUserProfile] = useState<{ username: string; karma: number } | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/session`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.loggedIn) {
          setUserProfile({
            username: data.user.username,
            karma: data.user.karma
          });
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    fetchSession();
  }, []);
  
  // Detect if we are running in an extension or as a website
  const isExtension = typeof window !== 'undefined' && 
    (!!(window.chrome && window.chrome.runtime && window.chrome.runtime.id) || 
     !!((window as any).browser && (window as any).browser.runtime && (window as any).browser.runtime.id));

  useEffect(() => {
    const checkTab = async () => {
      try {
        if (isExtension) {
          // Add class for CSS targeting
          document.documentElement.classList.add('is-extension');
          document.body.classList.add('is-extension');

          const extensionRoot = (window as any).browser || (window as any).chrome;
          if (extensionRoot?.tabs?.query) {
            const tabs = await extensionRoot.tabs.query({ active: true, currentWindow: true });
            if (tabs[0]?.url) {
              setActiveTabUrl(tabs[0].url);
              await fetchCodes(tabs[0].url);
              return;
            }
          }
          setLoading(false);
        } else {
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('demo') === '1' || urlParams.get('url')) {
            document.documentElement.classList.add('is-extension');
            document.body.classList.add('is-extension');
            const targetUrl = urlParams.get('url') || 'https://www.ing.it';
            setActiveTabUrl(targetUrl);
            await fetchCodes(targetUrl);
            return;
          } else {
            document.documentElement.classList.remove('is-extension');
            document.body.classList.remove('is-extension');
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error querying tabs:', error);
        setLoading(false);
      }
    };

    checkTab();
  }, [isExtension]);

  const fetchCodes = async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/check?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.found) {
        setBrand(data.brand);
        setCodes(data.codes);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
    }

    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (urlParams && (urlParams.get('demo') === '1' || !isExtension)) {
      setBrand({
        id: 'ing-demo',
        name: 'ING',
        slug: 'ing',
        color: '#ea580c'
      });
      setCodes([
        {
          id: 'code-1',
          code: '9CX64N',
          description: 'Scegli anche tu ING! Con il mio codice amico 9CX64N puoi ricevere 50 euro di cashback sul Conto Arancio.',
          is_verified: false,
          user: 'Michele'
        },
        {
          id: 'code-2',
          code: '9C6699',
          description: '‼️50€ + 4% x 12 mesi‼️LINK GUIDA FACILE COME FARE: https://sites.google.com/view/codici-amico-amazon-cashback/ING?utm_source=ponss ==> Telegram: https://web.telegram.org/a/#-1003721528629',
          is_verified: false,
          user: 'Emiliano'
        }
      ]);
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const goToLogin = () => {
    window.open('https://codiceamico.app/login', '_blank');
  };

  const goToAddCode = () => {
    const urlParam = activeTabUrl ? `?url=${encodeURIComponent(activeTabUrl)}` : '';
    window.open(`https://codiceamico.app/dashboard${urlParam}`, '_blank');
  };

  if (loading && isExtension) {
    return (
      <div className="popup-container loading-state">
        <div className="loader-ring" />
        <p className="loading-text">Cerco codici...</p>
      </div>
    );
  }

  return (
    <div className={`popup-container ${!isExtension ? 'is-landing-page' : ''}`}>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="logo" onClick={() => window.open('https://codiceamico.app', '_blank')}>
          <img src="./icons/icon48.png" alt="CodiceAmico" className="logo-img" />
          <div className="logo-meta">
            <span className="logo-text">Codice<span className="logo-accent">Amico</span></span>
            {!isExtension && <span className="version-pill">v1.0.2</span>}
          </div>
        </div>

        <div className="header-actions">
          {userProfile ? (
            <div className="user-profile-badge" onClick={() => window.open('https://codiceamico.app/dashboard', '_blank')} title="Vai alla tua Dashboard">
              <span className="user-profile-name">@{getFirstName(userProfile.username)}</span>
              <span className="user-profile-karma">{userProfile.karma} ⚡</span>
            </div>
          ) : (
            <>
              <button className="add-code-btn" onClick={goToAddCode} title="Aggiungi il tuo codice">
                <Plus size={13} />
                <span>Aggiungi</span>
              </button>
              <button className="login-btn" onClick={goToLogin} title="Accedi o registrati">
                <LogIn size={13} />
                <span>Accedi</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="main">
        {!isExtension && (
          <div className="landing-content">
            <section className="landing-hero">
              <div className="badge">L'estensione ufficiale</div>
              <h1>Risparmia ovunque con un click</h1>
              <p className="hero-subtitle">
                Trova automaticamente i migliori codici sconto e bonus referral mentre navighi. La community di Codice Amico, ora sempre con te.
              </p>
              
              <div className="download-section">
                <h3>Scegli il tuo browser</h3>
                <div className="download-buttons">
                  <a href="#" className="download-btn chrome">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_empty.svg" alt="" width="20" />
                    <div className="btn-txt">
                      <span>Installa su</span>
                      <strong>Chrome</strong>
                    </div>
                  </a>
                  <a href="https://addons.mozilla.org/en-US/firefox/addon/codiceamico-app-trova-bonus/" className="download-btn firefox">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" alt="" width="20" />
                    <div className="btn-txt">
                      <span>Installa su</span>
                      <strong>Firefox</strong>
                    </div>
                  </a>
                  <button onClick={() => setShowSafariGuide(!showSafariGuide)} className={`download-btn safari ${showSafariGuide ? 'active' : ''}`}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" alt="" width="20" />
                    <div className="btn-txt">
                      <span>Guida per</span>
                      <strong>Safari</strong>
                    </div>
                  </button>
                </div>

                {showSafariGuide && (
                  <div className="safari-guide glass-card fade-in">
                    <h4><Settings size={16} /> Come installare su Safari (macOS)</h4>
                    <ol>
                      <li>
                        <strong>Developer Mode:</strong> Apri Safari e vai in <em>Impostazioni &gt; Avanzate</em>, abilita "Mostra menu Sviluppo".
                      </li>
                      <li>
                        <strong>Carica:</strong> Dal menu <em>Sviluppo</em>, seleziona "Consenti estensioni non firmate", quindi trascina la cartella `dist` nel pannello Estensioni.
                      </li>
                    </ol>
                    <p className="note">Stiamo lavorando per portare l'estensione ufficialmente sul Mac App Store!</p>
                  </div>
                )}
              </div>
            </section>

            <section className="open-source-section glass-card">
              <div className="os-header">
                <div className="os-title">
                  <ShieldCheck size={24} />
                  <div>
                    <h3>Massima Privacy e Sicurezza</h3>
                    <p>Trasparente, veloce e gratuito per tutti.</p>
                  </div>
                </div>
              </div>
              <div className="os-grid">
                <div className="os-item">
                  <ShieldCheck size={18} />
                  <span>Nessun tracciamento</span>
                </div>
                <div className="os-item">
                  <Sparkles size={18} />
                  <span>100% Gratuito</span>
                </div>
                <div className="os-item">
                  <Globe size={18} />
                  <span>Sincronizzato in tempo reale</span>
                </div>
              </div>
            </section>

            <div className="main-site-link">
              <span>Oppure torna al portale ufficiale:</span>
              <a href="https://codiceamico.app" className="hero-link">
                www.codiceamico.app
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        )}

        {brand ? (
          <>
            <div className="brand-card glass-card">
              <div className="brand-avatar" style={{ '--brand-color': brand.color || '#3B82F6' } as React.CSSProperties}>
                {brand.logo_url ? (
                  <img src={brand.logo_url} alt={brand.name} className="brand-img" />
                ) : (
                  <span className="brand-initial">{brand.name[0]}</span>
                )}
                <div className="brand-glow" />
              </div>
              <div className="brand-meta">
                <h2 className="brand-name">{brand.name}</h2>
                <div className="brand-count">
                  <Sparkles size={11} />
                  <span>{codes.length} codic{codes.length === 1 ? 'e' : 'i'} disponibil{codes.length === 1 ? 'e' : 'i'}</span>
                </div>
              </div>
            </div>

            <div className="codes-list">
              {codes.map((code, idx) => (
                <div key={code.id} className="code-card glass-card" style={{ '--delay': `${idx * 60}ms` } as React.CSSProperties}>
                  <div className="code-card-top">
                    <div className="code-meta">
                      <span className="user-pill">
                        @{getFirstName(code.user)}
                        {code.karma !== undefined && code.karma > 0 && ` (${code.karma} ⚡)`}
                      </span>
                      {code.is_verified && (
                        <span className="verified-pill">
                          <ShieldCheck size={9} />
                          Verificato
                        </span>
                      )}
                    </div>
                    {code.description && (
                      <p className="code-desc">{code.description}</p>
                    )}
                  </div>
                  <div className="code-row">
                    {code.code && (
                      <>
                        <div className="code-chip">
                          <code>{code.code}</code>
                        </div>
                        <button
                          className={`copy-btn ${copiedId === code.id ? 'copied' : ''}`}
                          onClick={() => copyToClipboard(code.code, code.id)}
                          title="Copia codice"
                        >
                          {copiedId === code.id ? (
                            <><Check size={13} /><span>Copiato</span></>
                          ) : (
                            <><Copy size={13} /><span>Copia</span></>
                          )}
                        </button>
                      </>
                    )}
                    
                    {!code.code && code.link && (
                      <button
                        className="copy-btn offer-link-btn"
                        onClick={() => window.open(code.link, '_blank')}
                        title="Vai all'offerta"
                        style={{ width: '100%' }}
                      >
                        <ExternalLink size={13} />
                        <span>Vai all'Offerta</span>
                      </button>
                    )}

                    {code.code && code.link && (
                      <button
                        className="link-btn"
                        onClick={() => window.open(code.link, '_blank')}
                        title="Vai all'offerta"
                      >
                        <ExternalLink size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          isExtension && (
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <Globe size={28} />
              </div>
              <h3 className="empty-title">Nessun codice trovato</h3>
              <p className="empty-desc">Non abbiamo ancora promozioni per questo sito.<br />Accedi per essere il primo a condividerne uno!</p>
              <button className="cta-btn" onClick={goToLogin}>
                <LogIn size={15} />
                Accedi e aggiungi
              </button>
            </div>
          )
        )}
      </main>

      <footer className="footer">
        {isExtension ? (
          <a href="https://codiceamico.app" target="_blank" rel="noreferrer" className="footer-link">
            codiceamico.app <ExternalLink size={10} />
          </a>
        ) : (
          <a href="https://codiceamico.app" target="_blank" rel="noreferrer" className="footer-link">
            © 2026 CodiceAmico • Fatto con ❤️ dalla community
          </a>
        )}
      </footer>
    </div>
  );
}

export default App
