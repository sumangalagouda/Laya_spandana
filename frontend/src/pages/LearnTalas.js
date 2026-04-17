import React, { useEffect, useMemo, useRef, useState } from "react";
import "./LearnTalas.css";

const LEARN_DATA = {
  tishra: {
    color: "#D4AF37",
    audioSrc: "/audio/tishra_alaripu.mp3",
    videoSrc: "/videos/tishra_dance.mp4",
    poster: "/images/tishra_poster.jpg",
    bpm: 120,
    beats: 3,
    avartanams: 1,
    beatTag: "3-beat cycle",
    trackTitle: "Tishra Alaripu Recitation",
    trackSubtitle: "Carnatic Vocal Percussion · 3-beat nadai",
    videoTitle: "Tishra Alaripu — Classical Bharatanatyam Performance",
    videoCaption:
      "Observe how the dancer's movements align with each beat of the Tishra cycle. Notice the wave-like arm movement on beat 1 of each triplet group.",
    structure: "3 beats × 1 avartanam",
    family: "Tishra Jati",
    clapPattern: ["Clap", "Wave", "Wave"],
    syllables: [
      { label: "Avartanam 1", chips: ["Ta", "Ki", "Ta", "|", "Ta", "Ki", "Ta", "|", "Ta", "Ki", "Ta"] },
      { label: "Avartanam 2", chips: ["Ta", "Ka", "Ta", "Ki", "Ta", "|", "Ta", "Ka", "Ta", "Ki", "Ta"] },
      { label: "Avartanam 3", chips: ["Tha", "Dhi", "Gi", "Na", "Thom", "|", "Tha", "Dhi", "Gi", "Na", "Thom"] },
    ],
    syllableDesc:
      "The syllables Ta Ki Ta create the three-beat subdivision. Each group of three forms one beat of the tala cycle.",
    bodyParts: [
      { icon: "👁", name: "Eyes", sanskrit: "Drishti Bheda" },
      { icon: "🔄", name: "Neck", sanskrit: "Greeva Bheda" },
      { icon: "💪", name: "Shoulders", sanskrit: "Amsa Bheda" },
      { icon: "🤲", name: "Arms & Hands", sanskrit: "Hasta" },
      { icon: "🫀", name: "Torso", sanskrit: "Anga" },
      { icon: "🦵", name: "Knees", sanskrit: "Janu" },
      { icon: "🦶", name: "Feet", sanskrit: "Pada" },
    ],
  },
  chatusra: {
    color: "#C0392B",
    audioSrc: "/audio/chatusra_alaripu.mp3",
    videoSrc: "/videos/chatusra_dance.mp4",
    poster: "/images/chatusra_poster.jpg",
    bpm: 108,
    beats: 4,
    avartanams: 2,
    beatTag: "4-beat cycle",
    trackTitle: "Chatusra Alaripu Recitation",
    trackSubtitle: "Carnatic Vocal Percussion · 4-beat nadai",
    videoTitle: "Chatusra Alaripu — Classical Bharatanatyam Performance",
    videoCaption:
      "Observe how the dancer's movements align with each beat of the Chatusra cycle. Notice the systematic body-part progression on beat 1 and beat 3.",
    structure: "4 beats × 2 avartanam",
    family: "Chatusra Jati",
    clapPattern: ["Clap", "Wave", "Finger", "Wave"],
    syllables: [
      { label: "Avartanam 1", chips: ["Ta", "Ka", "Di", "Mi", "|", "Ta", "Ka", "Di", "Mi"] },
      { label: "Avartanam 2", chips: ["Tha", "Ka", "Dhi", "Mi", "|", "Tha", "Ka", "Dhi", "Mi"] },
      { label: "Avartanam 3", chips: ["Ta", "Di", "Gi", "Na", "Thom", "Ka", "Tha", "Dhi", "Mi"] },
    ],
    syllableDesc:
      "Ta Ka Di Mi forms the foundation of Chatusra. The four syllables create a perfectly balanced rhythmic cycle suitable for all tempos.",
    bodyParts: [
      { icon: "👁", name: "Eyes", sanskrit: "Drishti Bheda" },
      { icon: "🔄", name: "Neck", sanskrit: "Greeva Bheda" },
      { icon: "💪", name: "Shoulders", sanskrit: "Amsa Bheda" },
      { icon: "🤲", name: "Arms & Hands", sanskrit: "Hasta" },
      { icon: "🫀", name: "Torso", sanskrit: "Anga" },
      { icon: "🦵", name: "Knees", sanskrit: "Janu" },
      { icon: "🦶", name: "Feet", sanskrit: "Pada" },
    ],
  },
  kandam: {
    color: "#1A6B8A",
    audioSrc: "/audio/kandam_alaripu.mp3",
    videoSrc: "/videos/kandam_dance.mp4",
    poster: "/images/kandam_poster.jpg",
    bpm: 96,
    beats: 5,
    avartanams: 1,
    beatTag: "5-beat cycle",
    trackTitle: "Kandam Alaripu Recitation",
    trackSubtitle: "Carnatic Vocal Percussion · 5-beat nadai",
    videoTitle: "Kandam Alaripu — Classical Bharatanatyam Performance",
    videoCaption:
      "Observe how the dancer's movements align with each beat of the Kandam cycle. Notice the angular emphasis around beat 4 before returning to sam.",
    structure: "5 beats × 1 avartanam",
    family: "Khanda Jati",
    clapPattern: ["Clap", "Finger", "Finger", "Wave", "Wave"],
    syllables: [
      { label: "Avartanam 1", chips: ["Ta", "Ka", "Ta", "Ki", "Ta", "|", "Ta", "Ka", "Ta", "Ki", "Ta"] },
      { label: "Avartanam 2", chips: ["Dhi", "Gi", "Na", "Thom", "Ka", "|", "Dhi", "Gi", "Na", "Thom", "Ka"] },
      { label: "Avartanam 3", chips: ["Ta", "Ka", "Dhi", "Mi", "Ta", "Ka", "Ta", "Ki", "Ta"] },
    ],
    syllableDesc:
      "The five syllables Ta Ka Ta Ki Ta define the Kandam cycle. The irregular grouping creates the characteristic syncopated tension of this advanced nadai.",
    bodyParts: [
      { icon: "👁", name: "Eyes", sanskrit: "Drishti Bheda" },
      { icon: "🔄", name: "Neck", sanskrit: "Greeva Bheda" },
      { icon: "💪", name: "Shoulders", sanskrit: "Amsa Bheda" },
      { icon: "🤲", name: "Arms & Hands", sanskrit: "Hasta" },
      { icon: "🫀", name: "Torso", sanskrit: "Anga" },
      { icon: "🦵", name: "Knees", sanskrit: "Janu" },
      { icon: "🦶", name: "Feet", sanskrit: "Pada" },
    ],
  },
};

const DEFAULT_PROGRESS = {
  tishra: { listened: false, syllablesRead: false, videoWatched: false, markedLearned: false },
  chatusra: { listened: false, syllablesRead: false, videoWatched: false, markedLearned: false },
  kandam: { listened: false, syllablesRead: false, videoWatched: false, markedLearned: false },
};

const PRONUNCIATION = [
  ["Ta", "Tah", "Base stroke"],
  ["Ki", "Kee", "Secondary stroke"],
  ["Tha", "Thaa", "Open resonant tone"],
  ["Dhi", "Dhee", "Muted stroke"],
  ["Thom", "Thohm", "Bass resonant tone"],
  ["Ka", "Kah", "Crisp stroke"],
  ["Di", "Dee", "Light tap"],
  ["Mi", "Mee", "Soft closure"],
];

const ACTION_ICON = {
  Clap: "👏",
  Wave: "🤚",
  Finger: "☝",
};

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function createGradient(color) {
  return `linear-gradient(90deg, ${color}, var(--gold))`;
}

function LearnTalas() {
  const [selectedTala, setSelectedTala] = useState("tishra");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);
  const [isPronunciationOpen, setIsPronunciationOpen] = useState(false);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [hoverTime, setHoverTime] = useState(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [videoMissing, setVideoMissing] = useState({ tishra: false, chatusra: false, kandam: false });
  const [videoOverlayVisible, setVideoOverlayVisible] = useState(true);

  const audioRef = useRef(null);
  const metronomeRef = useRef(null);
  const syllableRef = useRef(null);
  const progressTrackRef = useRef(null);
  const videoRef = useRef(null);

  const tala = LEARN_DATA[selectedTala];

  const progressForSelected = progress[selectedTala] || DEFAULT_PROGRESS[selectedTala];

  const totalLearned = useMemo(
    () => Object.values(progress).filter((item) => Object.values(item).every(Boolean)).length,
    [progress]
  );

  const overallPercent = (totalLearned / 3) * 100;

  const stopMetronome = () => {
    if (metronomeRef.current) {
      clearInterval(metronomeRef.current);
      metronomeRef.current = null;
    }
    setActiveBeat(0);
  };

  const startMetronome = (bpm, beats) => {
    stopMetronome();
    const interval = Math.round(60000 / bpm);
    let beatIndex = 0;
    setActiveBeat(0);
    metronomeRef.current = setInterval(() => {
      beatIndex = (beatIndex + 1) % beats;
      setActiveBeat(beatIndex);
    }, interval);
  };

  const markProgress = (talaKey, field) => {
    setProgress((prev) => ({
      ...prev,
      [talaKey]: {
        ...prev[talaKey],
        [field]: true,
      },
    }));
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      stopMetronome();
      return;
    }

    try {
      audio.playbackRate = playbackSpeed;
      audio.loop = isLooping;
      audio.volume = volume;
      await audio.play();
      setIsPlaying(true);
      markProgress(selectedTala, "listened");
      startMetronome(tala.bpm, tala.beats);
    } catch {
      setIsPlaying(false);
      stopMetronome();
    }
  };

  const seek = (time) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    const next = Math.max(0, Math.min(time, duration || 0));
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const skipForward = () => seek(currentTime + 10);
  const skipBackward = () => seek(currentTime - 10);

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const getTrackTimeFromPointer = (clientX) => {
    const el = progressTrackRef.current;
    if (!el || !duration) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * duration;
  };

  const handleTrackMouseDown = (event) => {
    setIsSeeking(true);
    const time = getTrackTimeFromPointer(event.clientX);
    seek(time);
  };

  const handleTrackMouseMove = (event) => {
    const time = getTrackTimeFromPointer(event.clientX);
    setHoverTime(time);
    setShowTooltip(true);
    if (isSeeking) {
      seek(time);
    }
  };

  const handleTrackMouseLeave = () => {
    setShowTooltip(false);
    if (!isSeeking) {
      setHoverTime(null);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("tala_learn_progress");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress({ ...DEFAULT_PROGRESS, ...parsed });
      } catch {
        setProgress(DEFAULT_PROGRESS);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tala_learn_progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const target = syllableRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markProgress(selectedTala, "syllablesRead");
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [selectedTala]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        stopMetronome();
        setCurrentTime(0);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isLooping]);

  useEffect(() => {
    const onMouseUp = () => setIsSeeking(false);
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.playbackRate = 1;
      audio.loop = false;
      audio.volume = 0.8;
      audio.load();
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setVolume(0.8);
    setPlaybackSpeed(1);
    setIsLooping(false);
    setVideoOverlayVisible(true);
    setHoverTime(null);
    setShowTooltip(false);
    stopMetronome();

    return () => {
      stopMetronome();
    };
  }, [selectedTala]);

  useEffect(() => () => stopMetronome(), []);

  const selectedCompletion = Object.values(progressForSelected).filter(Boolean).length;

  return (
    <div className="learn-page">
      <section className="learn-hero">
        <div className="learn-mandala" />
        <div className="learn-om">ॐ</div>
        <h1>Learn Alaripu Talas</h1>
        <p className="hero-sanskrit">शिक्षा</p>
        <p className="hero-text">
          Listen to the authentic recitation of each nadai, follow the syllables, and watch the
          dance to master the three talas of Alaripu
        </p>
        <div className="hero-stat-pills">
          <span><strong>3</strong> Talas to Learn</span>
          <span><strong>🎵</strong> Audio Recitation</span>
          <span><strong>💃</strong> Dance Videos</span>
        </div>
        <div className="hero-divider">✦ — 🪷 — ✦</div>
      </section>

      <section className="tala-tabs">
        {Object.entries(LEARN_DATA).map(([key, item]) => (
          <article
            key={key}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedTala(key)}
            className={`tab-card ${selectedTala === key ? "active" : ""}`}
            style={{ "--tala-color": item.color }}
          >
            <h3>{item.beats}</h3>
            <h4>{key === "tishra" ? "Tishra Nadai" : key === "chatusra" ? "Chatusra Nadai" : "Kandam Nadai"}</h4>
            <p className="tab-tamil">
              {key === "tishra" && "திஸ்ர நடை"}
              {key === "chatusra" && "சதுஸ்ர நடை"}
              {key === "kandam" && "கண்ட நடை"}
            </p>
            <div className="tab-beat-dots">
              {Array.from({ length: item.beats }).map((_, idx) => (
                <span key={idx} />
              ))}
            </div>
            <small>{item.beatTag}</small>
          </article>
        ))}
      </section>

      <section key={selectedTala} className="learn-card-fade">
        <article className="audio-player-card">
          <div className="temple-corners" />
          <h2>🎵 Listen to Recitation <span>{tala.trackTitle}</span></h2>

          <audio ref={audioRef} src={tala.audioSrc} preload="metadata" style={{ display: "none" }} />

          <div className="player-track-row">
            <div className={`wave-bars ${isPlaying ? "playing" : ""}`}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} style={{ animationDelay: `${idx * 0.11}s` }} />
              ))}
            </div>
            <div className="track-text">
              <h3>{tala.trackTitle}</h3>
              <p>{tala.trackSubtitle}</p>
            </div>
            <div className="track-duration">{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>

          <div
            className="progress-track"
            ref={progressTrackRef}
            onMouseDown={handleTrackMouseDown}
            onMouseMove={handleTrackMouseMove}
            onMouseLeave={handleTrackMouseLeave}
          >
            <div className="progress-fill" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%`, background: createGradient(tala.color) }} />
            <span className="progress-thumb" style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%`, borderColor: tala.color }} />
            {showTooltip && hoverTime !== null && (
              <span className="time-tooltip" style={{ left: `${duration ? (hoverTime / duration) * 100 : 0}%` }}>
                {formatTime(hoverTime)}
              </span>
            )}
          </div>

          <div className="player-controls-row">
            <button type="button" className="small-round" onClick={skipBackward}>◀◀</button>
            <button
              type="button"
              className={`play-btn ${isPlaying ? "playing" : ""}`}
              onClick={togglePlay}
              style={{ "--tala-color": tala.color }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button type="button" className="small-round" onClick={skipForward}>▶▶</button>

            <div className="speed-row">
              {[0.5, 0.75, 1, 1.25].map((sp) => (
                <button
                  type="button"
                  key={sp}
                  className={playbackSpeed === sp ? "speed active" : "speed"}
                  onClick={() => changeSpeed(sp)}
                >
                  {sp}x
                </button>
              ))}
            </div>

            <div className="volume-row">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setVolume(next);
                  if (audioRef.current) audioRef.current.volume = next;
                }}
              />
            </div>

            <button
              type="button"
              className={isLooping ? "loop-btn active" : "loop-btn"}
              onClick={() => {
                const next = !isLooping;
                setIsLooping(next);
                if (audioRef.current) audioRef.current.loop = next;
              }}
            >
              ↺
            </button>
          </div>

          <div className="beat-metronome">
            {Array.from({ length: tala.beats }).map((_, idx) => (
              <span
                key={idx}
                className={activeBeat === idx && isPlaying ? "beat-dot active" : "beat-dot"}
                style={{ "--tala-color": tala.color }}
              >
                {idx + 1}
              </span>
            ))}
          </div>
        </article>

        <article className="syllable-card" ref={syllableRef}>
          <h2>📝 Recitation Syllables</h2>
          <div className="syllable-grid">
            {tala.syllables.map((line) => (
              <div className="syllable-line" key={line.label}>
                <label>{line.label}</label>
                <div className="syllable-chip-row">
                  {line.chips.map((chip, idx) =>
                    chip === "|" ? (
                      <span key={`${line.label}-${idx}`} className="beat-separator" />
                    ) : (
                      <span
                        key={`${line.label}-${chip}-${idx}`}
                        className="syllable-chip"
                        style={{ borderColor: tala.color, color: tala.color }}
                      >
                        {chip}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="syllable-desc">{tala.syllableDesc}</p>

          <button
            type="button"
            className={isPronunciationOpen ? "pronunciation-toggle open" : "pronunciation-toggle"}
            onClick={() => setIsPronunciationOpen((prev) => !prev)}
          >
            Pronunciation Guide <span>⌄</span>
          </button>

          {isPronunciationOpen && (
            <div className="pronunciation-wrap">
              <table className="pronunciation-table">
                <thead>
                  <tr>
                    <th>Syllable</th>
                    <th>Pronunciation</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {PRONUNCIATION.map(([s, p, m]) => (
                    <tr key={s}>
                      <td>{s}</td>
                      <td>{p}</td>
                      <td>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="details-card">
          <div className="details-grid">
            <div className="details-left">
              <h2>About this Tala</h2>
              <div className="info-row"><strong>Structure</strong><span>{tala.structure}</span></div>
              <div className="info-row"><strong>Tala Family</strong><span>{tala.family}</span></div>
              <div className="info-row"><strong>Tempo (Kala)</strong><span>Prathama Kala (Slow) → Dwithiya Kala (Medium) → Thrithiya Kala (Fast)</span></div>
              <div className="info-row"><strong>Origin</strong><span>Natya Shastra, ~200 BCE</span></div>
              <div className="info-row"><strong>Used In</strong><span>Alaripu, Jatiswaram, Varnam</span></div>

              <h3>Body Parts Introduced</h3>
              <ul className="body-parts-list">
                {tala.bodyParts.map((item, idx) => (
                  <li key={`${item.name}-${idx}`} style={{ animationDelay: `${idx * 0.08}s` }}>
                    <span>{item.icon}</span>
                    <p>{item.name} <small>({item.sanskrit})</small></p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="details-right">
              <h2>Rhythm Structure</h2>
              <div className="rhythm-grid-wrap">
                {Array.from({ length: tala.avartanams }).map((_, rowIdx) => (
                  <div key={rowIdx} className="rhythm-row">
                    {Array.from({ length: tala.beats }).map((__, beatIdx) => (
                      <div
                        key={beatIdx}
                        className={`rhythm-cell ${beatIdx === 0 ? "sam" : ""}`}
                        style={{
                          background:
                            beatIdx === 0
                              ? tala.color
                              : `color-mix(in srgb, ${tala.color} ${Math.max(25, 70 - beatIdx * 12)}%, transparent)`,
                        }}
                      >
                        {beatIdx === 0 ? "Sam (ஸம்)" : beatIdx + 1}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <h3>Clap Pattern (Kriya)</h3>
              <div className="kriya-row">
                {tala.clapPattern.map((action, idx) => (
                  <span key={`${action}-${idx}`}>{ACTION_ICON[action]} {action}</span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="video-card">
          <h2>💃 Watch the Dance</h2>
          <div className="video-container" style={{ "--tala-color": tala.color }}>
            <div className="temple-corners" />
            {!videoMissing[selectedTala] ? (
              <>
                <video
                  ref={videoRef}
                  controls
                  preload="metadata"
                  src={tala.videoSrc}
                  poster={tala.poster}
                  onPlay={() => {
                    markProgress(selectedTala, "videoWatched");
                    setVideoOverlayVisible(false);
                  }}
                  onPause={() => setVideoOverlayVisible(true)}
                  onEnded={() => setVideoOverlayVisible(true)}
                  onError={() => setVideoMissing((prev) => ({ ...prev, [selectedTala]: true }))}
                />
                {videoOverlayVisible && (
                  <button
                    type="button"
                    className="video-overlay"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                  >
                    <span className="play-overlay-btn">▶</span>
                  </button>
                )}
                <div className="video-bottom-overlay">
                  <p>{tala.videoTitle}</p>
                  <span>{formatTime(duration)}</span>
                </div>
              </>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-mandala one" />
                <div className="placeholder-mandala two" />
                <div className="placeholder-mandala three" />
                <h3>Video Coming Soon</h3>
                <p>Place your video file at public/videos/{selectedTala}_dance.mp4</p>
              </div>
            )}
          </div>
          <p className="video-caption">{tala.videoCaption}</p>
        </article>
      </section>

      <section className="practice-guide">
        <h2><span /> 🌟 Practice Guide <span /></h2>
        <div className="practice-grid">
          <article className="practice-card" style={{ "--accent": "#27AE60" }}>
            <div className="icon-wrap">🌱</div>
            <h3>Beginner</h3>
            <p>First Steps</p>
            <ul>
              <li>Start by clapping the tala pattern slowly</li>
              <li>Repeat the syllables out loud before moving</li>
              <li>Practice at half speed — use the 0.5x audio player</li>
              <li>Focus on one avartanam at a time</li>
              <li>Count aloud: 1-2-3, 1-2-3 for Tishra</li>
            </ul>
          </article>
          <article className="practice-card" style={{ "--accent": "#D4AF37" }}>
            <div className="icon-wrap">🪷</div>
            <h3>Intermediate</h3>
            <p>Building Fluency</p>
            <ul>
              <li>Add neck and eye movements to the clapping</li>
              <li>Practice with the metronome on the audio player</li>
              <li>Try switching between 0.75x and 1x speed</li>
              <li>Memorise all three lines of syllables</li>
              <li>Record yourself and compare with the audio</li>
            </ul>
          </article>
          <article className="practice-card" style={{ "--accent": "#C0392B" }}>
            <div className="icon-wrap">🔱</div>
            <h3>Advanced</h3>
            <p>Mastery</p>
            <ul>
              <li>Perform the full body sequence with correct mudras</li>
              <li>Transition between Slow → Medium → Fast (3 kalas)</li>
              <li>Practice all three talas back to back</li>
              <li>Perform without the audio guidance</li>
              <li>Learn the corresponding Jatiswaram in this tala</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="progress-section">
        <h2>Your Learning Progress</h2>
        <p className="overall-text">You have learned {totalLearned} / 3 talas</p>
        <div className="overall-progress">
          <span style={{ width: `${overallPercent}%` }} />
        </div>

        <div className="progress-tracker">
          {Object.entries(LEARN_DATA).map(([key, item]) => {
            const itemProgress = progress[key] || DEFAULT_PROGRESS[key];
            const count = Object.values(itemProgress).filter(Boolean).length;
            const percent = (count / 4) * 100;
            const mastered = count === 4;

            return (
              <article
                key={key}
                className={`progress-card ${mastered ? "mastered sparkle" : ""}`}
                style={{ "--tala-color": item.color }}
              >
                {mastered && <span className="mastered-badge">🏆 Mastered!</span>}
                <header>
                  <h3>{key === "tishra" ? "Tishra" : key === "chatusra" ? "Chatusra" : "Kandam"}</h3>
                  <span className="beat-badge">{item.beats}</span>
                </header>

                <div className="check-item">
                  <span className={itemProgress.listened ? "check-icon done" : "check-icon"}>{itemProgress.listened ? "✓" : ""}</span>
                  <p>Listened to recitation audio</p>
                </div>
                <div className="check-item">
                  <span className={itemProgress.syllablesRead ? "check-icon done" : "check-icon"}>{itemProgress.syllablesRead ? "✓" : ""}</span>
                  <p>Read the syllables</p>
                </div>
                <div className="check-item">
                  <span className={itemProgress.videoWatched ? "check-icon done" : "check-icon"}>{itemProgress.videoWatched ? "✓" : ""}</span>
                  <p>Watched the dance video</p>
                </div>
                <div className="check-item">
                  <span className={itemProgress.markedLearned ? "check-icon done" : "check-icon"}>{itemProgress.markedLearned ? "✓" : ""}</span>
                  <p>Marked as Learned</p>
                </div>

                <div className="card-progress">
                  <div className="card-progress-track"><span style={{ width: `${percent}%`, background: item.color }} /></div>
                  <small>{percent}% complete</small>
                </div>

                <button
                  type="button"
                  className={itemProgress.markedLearned ? "mark-learned-btn done" : "mark-learned-btn"}
                  style={{ "--tala-color": item.color }}
                  onClick={() => markProgress(key, "markedLearned")}
                >
                  {itemProgress.markedLearned ? "Learned! 🎉" : "Mark as Learned ✓"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <div className="learn-footer-space">{selectedCompletion}/4 steps done for this tala</div>
    </div>
  );
}

export default LearnTalas;
