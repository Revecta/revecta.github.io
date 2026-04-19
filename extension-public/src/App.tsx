import { useEffect, useState } from 'react'
import { ExternalLink, Copy, Check, LogIn, Globe, Sparkles, ShieldCheck, Plus } from 'lucide-react'
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
  description: string;
  is_verified: boolean;
  user: string;
}

const API_BASE_URL = 'https://codiceamico.app/api/extension';

const getFirstName = (fullName: string) => fullName.split(' ')[0];

function App() {
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [codes, setCodes] = useState<Code[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabUrl, setActiveTabUrl] = useState<string>('');
  
  // Detect if we are running in an extension or as a website
  const isExtension = typeof window !== 'undefined' && 
    (!!(window.chrome && window.chrome.runtime && window.chrome.runtime.id) || 
     !!((window as any).browser && (window as any).browser.runtime && (window as any).browser.runtime.id));

  useEffect(() => {
    const checkTab = async () => {
      try {
        // Only try to query tabs if we are in an extension context and browser/chrome is available
        if (isExtension) {
          const extensionRoot = (window as any).browser || (window as any).chrome;
          if (extensionRoot?.tabs?.query) {
            const tabs = await extensionRoot.tabs.query({ active: true, currentWindow: true });
            if (tabs[0]?.url) {
              setActiveTabUrl(tabs[0].url);
              fetchCodes(tabs[0].url);
              return;
            }
          }
        }
      } catch (error) {
        console.error('Error querying tabs:', error);
      } finally {
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
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
    } finally {
      setLoading(false);
    }
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
        <div className="logo">
          <img src="./icons/icon48.png" alt="CodiceAmico" className="logo-img" />
          <span className="logo-text">Codice<span className="logo-accent">Amico</span></span>
        </div>

        <div className="header-actions">
          <button className="add-code-btn" onClick={goToAddCode} title="Aggiungi il tuo codice">
            <Plus size={13} />
            <span>Aggiungi</span>
          </button>
          <button className="login-btn" onClick={goToLogin} title="Accedi o registrati">
            <LogIn size={13} />
            <span>Accedi</span>
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="main">
        {!isExtension && (
          <div className="landing-hero">
            <h1>L'estensione per risparmiare online</h1>
            <p className="hero-subtitle">
              Trova automaticamente i migliori codici sconto e bonus referral mentre navighi sui tuoi siti preferiti.
            </p>
            
            <div className="download-section">
              <h3>Installa l'estensione gratuita:</h3>
              <div className="download-buttons">
                <a href="#" className="download-btn chrome">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_empty.svg" alt="" width="18" />
                  Chrome Web Store
                </a>
                <a href="https://addons.mozilla.org/it/firefox/addon/codiceamico-app/" className="download-btn firefox">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" alt="" width="18" />
                  Firefox Add-ons
                </a>
              </div>
            </div>

            <div className="main-site-link">
              <span>Oppure visita il sito principale:</span>
              <a href="https://codiceamico.app" className="hero-link">
                www.codiceamico.app
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        {brand ? (
          <>
            <div className="brand-card">
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
                <div key={code.id} className="code-card" style={{ '--delay': `${idx * 60}ms` } as React.CSSProperties}>
                  <div className="code-card-top">
                    <div className="code-meta">
                      <span className="user-pill">@{getFirstName(code.user)}</span>
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
                    <div className="code-chip">
                      <code>{code.code || '—'}</code>
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
        <a href="https://codiceamico.app" target="_blank" rel="noreferrer" className="footer-link">
          codiceamico.app <ExternalLink size={10} />
        </a>
      </footer>
    </div>
  );
}

export default App
