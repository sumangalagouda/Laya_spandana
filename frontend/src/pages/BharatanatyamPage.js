import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./BharatanatyamPage.css";

const timelineEvents = [
  {
    year: "200 BCE",
    title: "Natya Shastra",
    icon: "📜",
    color: "#D4AF37",
    description:
      "Sage Bharata Muni composes the Natya Shastra — the foundational treatise on Indian performing arts. It codifies 108 karanas, dramatic forms, and the theory of rasa and bhava that underpins all classical dance.",
  },
  {
    year: "6th Century CE",
    title: "Temple Devadasi Tradition",
    icon: "🏛️",
    color: "#FF6B00",
    description:
      "Bharatanatyam flourishes in South Indian temples as Sadir Attam. Devadasis perform daily for the deity while dynasties such as the Cholas and Pallavas patronize the art.",
  },
  {
    year: "Chola Period",
    title: "Bronze Nataraja Icons",
    icon: "🗿",
    color: "#C0392B",
    description:
      "The Chola dynasty creates iconic bronze Nataraja sculptures that become the visual grammar of Bharatanatyam and a timeless model for dancers.",
  },
  {
    year: "1892",
    title: "British Colonial Ban",
    icon: "⚖️",
    color: "#5D4037",
    description:
      "The Anti-Nautch Act suppresses Devadasi performances. With declining temple patronage and social stigma, the form faces near extinction.",
  },
  {
    year: "1930s",
    title: "The Great Revival",
    icon: "🌸",
    color: "#D4AF37",
    description:
      "E. Krishna Iyer and Rukmini Devi Arundale revive and reform the art, renaming it Bharatanatyam and introducing it to modern proscenium stages.",
  },
  {
    year: "1936",
    title: "Kalakshetra Founded",
    icon: "🏫",
    color: "#FF6B00",
    description:
      "Rukmini Devi establishes Kalakshetra in Chennai, creating a major institutional ecosystem for training, repertory, and pedagogy.",
  },
  {
    year: "Post-Independence",
    title: "National Recognition",
    icon: "🇮🇳",
    color: "#27AE60",
    description:
      "Bharatanatyam becomes a national cultural emblem. Exponents carry the form to global stages with renewed scholarship and virtuosity.",
  },
  {
    year: "2016",
    title: "UNESCO Recognition",
    icon: "🌍",
    color: "#D4AF37",
    description:
      "UNESCO recognizes Indian classical dance traditions, including Bharatanatyam, as Intangible Cultural Heritage of Humanity.",
  },
];

const abhinayaCards = [
  {
    icon: "🤲",
    color: "#D4AF37",
    title: "Angika Abhinaya",
    sanskrit: "आंगिक अभिनय",
    subtitle: "Expression through body movement",
    description:
      "The body becomes language through karanas, hastas, drishti bhedas and greeva bhedas. Angika builds semantic precision in every gesture.",
    tags: ["108 Karanas", "64 Hastas", "Eye movements", "Footwork"],
  },
  {
    icon: "🎵",
    color: "#FF6B00",
    title: "Vachika Abhinaya",
    sanskrit: "वाचिक अभिनय",
    subtitle: "Expression through voice and sound",
    description:
      "The sung sahitya, nattuvangam recitation, and rhythmic syllables form the sonic grammar that the dancer embodies with clarity and timing.",
    tags: ["Sahitya", "Solkattu", "Raga melody", "Rhythm syllables"],
  },
  {
    icon: "👗",
    color: "#8E44AD",
    title: "Aharya Abhinaya",
    sanskrit: "आहार्य अभिनय",
    subtitle: "Expression through costume and makeup",
    description:
      "Costume, jewelry, and stage makeup elevate readability and character. Aharya amplifies narrative visibility while preserving tradition.",
    tags: ["Silk saree", "Temple jewelry", "Stage makeup", "Flower garlands"],
  },
  {
    icon: "✨",
    color: "#1A6B8A",
    title: "Sattvika Abhinaya",
    sanskrit: "सात्विक अभिनय",
    subtitle: "Expression through inner emotion",
    description:
      "The most subtle path where inner states surface naturally — trembling, tears, and stillness. It arises from lived emotional truth.",
    tags: ["Tears of joy", "Goosebumps", "Natural trembling", "Inner experience"],
  },
];

const margamItems = [
  { n: 1, name: "Alaripu", icon: "🌸", color: "#D4AF37", dur: "5-10 min", type: "Pure Dance (Nritta)", desc: "Body awakening in structured rhythm." },
  { n: 2, name: "Jatiswaram", icon: "🎵", color: "#FF6B00", dur: "8-12 min", type: "Pure Dance (Nritta)", desc: "Rhythmic melody and expanding footwork." },
  { n: 3, name: "Shabdam", icon: "📝", color: "#C0392B", dur: "8-15 min", type: "Expressive (Nritya)", desc: "First narrative entry with sahitya." },
  { n: 4, name: "Varnam", icon: "💎", color: "#1A6B8A", dur: "30-45 min", type: "Combined (Nritta + Nritya)", desc: "The centerpiece of complete mastery.", main: true },
  { n: 5, name: "Padam", icon: "🎭", color: "#8E44AD", dur: "10-20 min", type: "Pure Expression (Nritya)", desc: "Emotional poetry and abhinaya depth." },
  { n: 6, name: "Javali", icon: "🎪", color: "#D4AF37", dur: "5-10 min", type: "Expression (Nritya)", desc: "Lighter playful expressive item." },
  { n: 7, name: "Thillana", icon: "🎆", color: "#FF6B00", dur: "8-12 min", type: "Pure Dance (Nritta)", desc: "Brilliant rhythmic climax." },
  { n: 8, name: "Mangalam", icon: "🙏", color: "#27AE60", dur: "2-3 min", type: "Devotional", desc: "Auspicious closing prayer." },
];

const ornaments = [
  ["🌸", "Kondai", "குண்டலம்", "Hair bun adorned with jasmine and ornaments."],
  ["💛", "Jimikki", "ஜிமிக்கி", "Chandelier earrings that sparkle under stage lights."],
  ["💍", "Oddiyanam", "ஒட்டியாணம்", "Waist belt that defines torso and anchors drape."],
  ["🔴", "Pottu", "பொட்டு", "Pronounced forehead mark for stage visibility."],
  ["🦶", "Salangai", "சலங்கை", "Sacred ankle bells, the audible voice of dance."],
  ["👗", "Costume", "உடை", "Silk costume with fan pleats opening in Aramandi."],
];

const exponents = [
  {
    name: "Rukmini Devi Arundale",
    years: "1904–1986",
    role: "Revivalist & Reformer",
    color: "#D4AF37",
    contribution:
      "Founded Kalakshetra (1936), restructured pedagogy and stagecraft, and gave Bharatanatyam a modern institutional framework.",
    quote: "Dance is a divine art. Every movement is a prayer.",
  },
  {
    name: "Balasaraswati",
    years: "1918–1984",
    role: "Devadasi Tradition Bearer",
    color: "#C0392B",
    contribution:
      "Preserved the authentic Devadasi lineage with unmatched abhinaya and carried its depth to international stages.",
    quote: "Bharatanatyam is a manifestation of the universe in the human body.",
  },
  {
    name: "Yamini Krishnamurthy",
    years: "1940–present",
    role: "International Ambassador",
    color: "#FF6B00",
    contribution:
      "Renowned for technical brilliance and stage presence, helping globalize Bharatanatyam through major tours and performances.",
    quote: "The body is the instrument, the soul is the musician.",
  },
  {
    name: "Mrinalini Sarabhai",
    years: "1918–2016",
    role: "Institution Builder",
    color: "#8E44AD",
    contribution:
      "Founded Darpana Academy and expanded Bharatanatyam discourse through pedagogy, choreography, and cultural diplomacy.",
    quote: "Art is the language of the soul speaking to other souls.",
  },
  {
    name: "Padma Subrahmanyam",
    years: "1943–present",
    role: "Scholar-Practitioner",
    color: "#1A6B8A",
    contribution:
      "Reconstructed the 108 karanas through textual and sculptural study, reconnecting contemporary practice to ancient grammar.",
    quote: "The karanas are the grammar of Bharatanatyam.",
  },
  {
    name: "Alarmel Valli",
    years: "1956–present",
    role: "Contemporary Master",
    color: "#27AE60",
    contribution:
      "Expanded thematic language while preserving classical rigor, known for nuanced abhinaya and musicality.",
    quote: "In Bharatanatyam, silence speaks as loudly as sound.",
  },
];

const rasas = [
  ["❤️", "Shringara", "श्रृंगार", "சிங்காரம்", "Love/Beauty", "#C0392B", "Graceful romantic and devotional expression."],
  ["😄", "Hasya", "हास्य", "ஹாஸ்யம்", "Joy/Humor", "#F39C12", "Playful brightness and comic charm."],
  ["😢", "Karuna", "करुण", "கருணை", "Compassion/Sorrow", "#2980B9", "Slow gestures and tender emotional weight."],
  ["😠", "Raudra", "रौद्र", "ரௌத்ரம்", "Fury/Anger", "#E74C3C", "Forceful stance and fierce energy."],
  ["⚔️", "Vira", "वीर", "வீரம்", "Heroism/Courage", "#D4AF37", "Upright power and resolute rhythm."],
  ["😱", "Bhayanaka", "भयानक", "பயானகம்", "Terror/Fear", "#5D4037", "Tension, recoil, and trembling anticipation."],
  ["🤢", "Bibhatsa", "बीभत्स", "பீபத்ஸம்", "Disgust", "#616161", "Repulsion shown through withdrawal."],
  ["😲", "Adbhuta", "अद्भुत", "அத்புதம்", "Wonder", "#8E44AD", "Astonishment before divine marvel."],
  ["🕊️", "Shanta", "शांत", "சாந்தம்", "Serenity", "#1A6B8A", "Stillness and meditative resolution."],
];

const instruments = [
  ["🥁", "Mridangam", "मृदंगम्", "#D4AF37", "The rhythmic backbone responding to footwork in real time."],
  ["🎸", "Veena", "वीणा", "#FF6B00", "Deep resonant melodic frame for raga expression."],
  ["🎵", "Flute (Venu)", "वेणु", "#27AE60", "Breath-driven timbre ideal for lyrical passages."],
  ["🎤", "Nattuvangam", "नट्टुवांगम्", "#C0392B", "Conducting syllables and cymbal timekeeping by the guru."],
  ["🎻", "Violin", "बेला", "#8E44AD", "Expressive melodic companion to vocalist and dancer."],
  ["🎙️", "Vocalist", "गायक", "#1A6B8A", "Delivers sahitya that the dancer embodies word-by-word."],
];

function initials(name) {
  return name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");
}

function BharatanatyamPage() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bharatanatyam-page">
      <section className="hero-section">
        <div className="hero-diagonals" />
        <div className="mandala-rings">
          {[200, 400, 600, 800, 1000].map((size, idx) => (
            <span
              key={size}
              className="ring"
              style={{
                width: size,
                height: size,
                animationDuration: `${[60, 45, 30, 20, 15][idx]}s`,
                animationDirection: idx % 2 === 0 ? "normal" : "reverse",
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-ornament">✦ ── ✦ ── 🪷 ── ✦ ── ✦</div>
          <p className="hero-invocation">नटराजाय नमः</p>
          <h1 className="text-gradient">Bharatanatyam</h1>
          <p className="hero-tamil">பரதநாட்டியம்</p>
          <p className="hero-tagline">The Divine Language of Body, Music and Devotion</p>
          <div className="hero-pills">
            <span>2000+ Years Old</span>
            <span>Tamil Nadu Origin</span>
            <span>UNESCO Recognized</span>
          </div>
        </div>

        <div className="scroll-indicator">
          <small>Explore</small>
          <div className="bounce-arrow">↓</div>
        </div>

        <svg className="hero-divider-curve" viewBox="0 0 100 60" preserveAspectRatio="none">
          <path d="M0,0 Q50,60 100,0" />
        </svg>
      </section>

      <section className="content-section reveal-section intro-layout">
        <div>
          <p className="section-label">● THE DIVINE ART</p>
          <h2>What is Bharatanatyam?</h2>
          <p>
            Bharatanatyam is one of the oldest and most revered classical dance forms of India,
            originating in the sacred temples of Tamil Nadu over two thousand years ago. It is a
            synthesis of Bha (Bhava), Ra (Raga), and Ta (Tala).
          </p>
          <p>
            Rooted in the ancient <em>Natya Shastra</em>, it was performed by <em>Devadasis</em>
            as an offering to the divine. Its grammar evolved in temples before reaching modern
            concert stages.
          </p>
          <p>
            In the twentieth century, <em>Rukmini Devi Arundale</em> and E. Krishna Iyer revived
            and restructured the form through institutions like <em>Kalakshetra</em>.
          </p>
          <p>
            Today Bharatanatyam is global and living. It remains both rigorous technique and
            devotional pathway, recognized as <em>Intangible Cultural Heritage</em>.
          </p>

          <blockquote>
            <p>
              Bharatanatyam is not mere dance — it is a moving prayer, a poem in motion, the
              body&apos;s conversation with the divine.
            </p>
            <small>— Rukmini Devi Arundale</small>
          </blockquote>
        </div>

        <div className="nataraja-container">

          <img className="nataraja-svg" src="/images/nataraja.png" alt="Nataraja - The Lord of Dance" width={500} />
          <p className="nataraja-label">नटराज — Nataraja</p>

        </div>
      </section>

      <section className="content-section reveal-section">
        <h2>A Journey Through Time</h2>
        <p className="sanskrit-sub">इतिहास</p>
        <div className="timeline">
          {timelineEvents.map((event, idx) => (
            <article key={event.title} className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}>
              <span className="timeline-dot" style={{ background: event.color, boxShadow: `0 0 14px ${event.color}` }} />
              <div className="timeline-card" style={{ "--evt-color": event.color }}>
                <div className="timeline-top">
                  <span className="year-pill">{event.year}</span>
                  <span className="event-icon">{event.icon}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section reveal-section bha-layout">
        <div className="dancer-container">

          <img className="dancer-svg" src="/images/bh1.jpeg" alt="Bharatanatyam dancer" />

        </div>

        <div>
          <h2>The Three Pillars: BHA · RA · TA</h2>
          <p className="sanskrit-sub">भाव · राग · ताल</p>
          <div className="pillar-card" style={{ "--pillar": "#D4AF37" }}>
            <h3>BHA <small>Bhava · भाव</small></h3>
            <span className="meaning-pill">Expression & Emotion</span>
            <p>Bhava is emotional transmission through eyes, face, torso and gesture, turning movement into felt meaning.</p>
            <div className="sub-items">Navarasas · Abhinaya · Sanchari Bhava</div>
          </div>
          <div className="pillar-card" style={{ "--pillar": "#FF6B00" }}>
            <h3>RA <small>Raga · राग</small></h3>
            <span className="meaning-pill">Melody & Music</span>
            <p>Raga shapes mood through melodic architecture. The dancer listens deeply to tonal color and phrase contour.</p>
            <div className="sub-items">Carnatic music · Veena · Nattuvangam</div>
          </div>
          <div className="pillar-card" style={{ "--pillar": "#C0392B" }}>
            <h3>TA <small>Tala · ताल</small></h3>
            <span className="meaning-pill">Rhythm & Timing</span>
            <p>Tala governs time cycles and precision. Bharatanatyam anchors expression within exact rhythmic mathematics.</p>
            <div className="sub-items">Adi/Rupaka · Nadais · Mridangam</div>
          </div>
        </div>
      </section>

      <section className="content-section reveal-section">
        <h2>Abhinaya — The Four Paths of Expression</h2>
        <p className="sanskrit-sub">अभिनय के चार मार्ग</p>
        <div className="abhinaya-grid">
          {abhinayaCards.map((item) => (
            <article key={item.title} className="abhinaya-card" style={{ "--abhi": item.color }}>
              <div className="abhinaya-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="sanskrit-inline">{item.sanskrit}</p>
              <p className="abhi-sub">{item.subtitle}</p>
              <p>{item.description}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section reveal-section">
        <h2>The Margam — A Complete Recital</h2>
        <p className="sanskrit-sub">मार्गम् — The Path</p>
        <p className="section-lead">A traditional recital rises in complexity, tempo and emotional intensity from invocation to auspicious close.</p>
        <div className="margam-flow">
          {margamItems.map((item, idx) => (
            <div key={item.name} className="margam-item" style={{ "--margam": item.color }}>
              <span className="big-num">{item.n}</span>
              <div className="margam-top">
                <span>{item.icon}</span>
                <b>{item.name}</b>
                <small>{item.dur}</small>
              </div>
              <p>{item.desc}</p>
              <em>{item.type}</em>
              {item.main && <strong>★ Main Piece</strong>}
              {idx < margamItems.length - 1 && <span className="flow-arrow">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="content-section reveal-section costume-layout">
        <div>
          <h2>The Costume — आभूषण और वस्त्र</h2>
          <div className="ornament-grid">
            {ornaments.map(([icon, name, tamil, desc]) => (
              <article key={name} className="ornament-card">
                <span>{icon}</span>
                <h3>{name}</h3>
                <p className="sanskrit-inline">{tamil}</p>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="costume-diagram">
          <img className="costume-image" src="/images/image.png" alt="Bharatanatyam costume diagram" />

        </div>
      </section>

      <section className="content-section reveal-section">
        <h2>The Masters — गुरु परम्परा</h2>
        <p className="section-lead">Artists who shaped the tradition</p>
        <div className="person-cards">
          {exponents.map((p) => (
            <article key={p.name} className="person-card" style={{ "--person": p.color }}>
              <div className="avatar">{initials(p.name)}</div>
              <h3>{p.name}</h3>
              <small>{p.years}</small>
              <span className="role-pill">{p.role}</span>
              <p>{p.contribution}</p>
              <blockquote>{p.quote}</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section reveal-section">
        <h2>Navarasas — The Nine Emotions</h2>
        <p className="sanskrit-sub">नव रस</p>
        <p className="section-lead">Rasa is the emotional essence awakened in the audience through dance, music, and expression.</p>
        <div className="rasa-grid">
          {rasas.map(([emoji, name, sanskrit, tamil, meaning, color, desc], i) => (
            <article key={name} className="rasa-card" style={{ "--rasa": color }}>
              <span className="rasa-num">{i + 1}</span>
              <div className="rasa-emoji">{emoji}</div>
              <h3>{name}</h3>
              <p className="sanskrit-inline">{sanskrit} · {tamil}</p>
              <small>{meaning}</small>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section reveal-section">
        <h2>The Orchestra — वाद्य यंत्र</h2>
        <p className="section-lead">Instruments of a Bharatanatyam performance</p>
        <div className="instrument-grid">
          {instruments.map(([emoji, name, sanskrit, color, desc]) => (
            <article key={name} className="instrument-card" style={{ "--inst": color }}>
              <span>{emoji}</span>
              <h3>{name}</h3>
              <p className="sanskrit-inline">{sanskrit}</p>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section reveal-section">
        <div className="giant-om">ॐ</div>
        <p className="closing-sanskrit">नृत्यं भावं व्यक्त करोति</p>
        <p className="closing-translation">Dance gives form to the formless, voice to the voiceless</p>
        <small>— Natya Shastra, Bharata Muni</small>
        <div className="hero-ornament">✦ ── 🪷 ── ✦</div>

        <div className="cta-grid">
          <Link to="/" className="cta-card">🎵 Detect Your Tala</Link>
          <Link to="/learn" className="cta-card">🎓 Learn the Talas</Link>
          <Link to="/history" className="cta-card">📜 View History</Link>
        </div>
      </section>
    </div>
  );
}

export default BharatanatyamPage;
