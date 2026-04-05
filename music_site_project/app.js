const demoTracks = [
  { artist: 'Dilnoz', title: 'Kechir', tag: 'uzbek', mood: 'Soft pop', fileName: '250.Dilnoz - Kechir' },
  { artist: 'Sardor Mamadaliyev', title: 'Karvon', tag: 'uzbek', mood: 'Classic vibe', fileName: '251.Sardor Mamadaliyev - Karvon' },
  { artist: 'Yulduz Turdiyeva', title: 'Bizning sevgimiz boshqacha', tag: 'uzbek', mood: 'Romantic', fileName: '596.Yulduz Turdiyeva - Bizning sevgimiz-boshqacha' },
  { artist: 'Jaloliddin Ahmadaliyev', title: "Boy bo'lib ketsam", tag: 'uzbek', mood: 'Hit song', fileName: "597.Jaloliddin Ahmadaliyev - Boy bolib ketsam" },
  { artist: 'Dilnoz', title: 'Devona', tag: 'uzbek', mood: 'Emotional', fileName: '598.Dilnoz - Devona' },
  { artist: 'Arujan', title: 'Shataq', tag: 'world', mood: 'Dance', fileName: '599.Arujan - Shataq' },
  { artist: 'Ippocik, Senur', title: 'Uti Puti (Shirin bola)', tag: 'soft', mood: 'Cute vibe', fileName: '599.Ippocik-senur-uti-puti-shirin-bola' },
  { artist: 'Sefo', title: 'ARABA', tag: 'club', mood: 'Street energy', fileName: '599.Sefo - ARABA (prod. by DIVXRSE)' },
  { artist: 'Xamdam Sobirov', title: 'Altingul', tag: 'uzbek', mood: 'Popular', fileName: '599.Xamdam Sobirov - Altingul' },
  { artist: 'Shabnam Surayo', title: 'Shirin Arusak', tag: 'uzbek', mood: 'Wedding vibe', fileName: '600.Shabnam Surayo - Shirin-arusak' },
  { artist: 'Shohruhxon', title: 'Sumbula', tag: 'uzbek', mood: 'Warm', fileName: '600.Shohruhxon - Sumbula' },
  { artist: 'Erika Isak', title: 'Boo Hoo', tag: 'world', mood: 'Modern pop', fileName: '600.Эрика Исак - Boo Hoo' },
  { artist: 'DJ JEDY & Niki Four', title: 'Midnight Mirage', tag: 'club', mood: 'Night drive', fileName: '603.DJ JEDY & Niki Four - Midnight Mirage' },
  { artist: 'Imron', title: 'Tomchi', tag: 'uzbek', mood: 'Melodic', fileName: '603.Imron - Tomchi' },
  { artist: 'Shoxruxbek Ergashev', title: 'Boshi omon', tag: 'uzbek', mood: 'Heartfelt', fileName: '603.Shoxruxbek-ergashev-boshi-omon' },
  { artist: 'Jasoor', title: 'Que Pasa', tag: 'world', mood: 'Latin energy', fileName: '604.Jasoor - Que Pasa' },
  { artist: 'Uzmir Mira', title: 'Barini to‘xtataylik', tag: 'uzbek', mood: 'Duet', fileName: '604.Uzmir Mira - barini - Toxtataylik' },
  { artist: 'Asl Wayne', title: 'Makkam (DJ Tab remix)', tag: 'remix', mood: 'Bass boosted', fileName: '605.Asl-Wayne-makkam-dj-tab-remix' },
  { artist: 'Milena Madmusayeva', title: 'Sog‘indim', tag: 'uzbek', mood: 'Slow vibe', fileName: '605.Milena Madmusayeva - Husan - Sogindim' },
  { artist: 'Navruza', title: 'Jannat edi sevgimiz', tag: 'uzbek', mood: 'Romantic', fileName: '611.Navruza - Jannat-edi-sevgimiz' },
  { artist: 'Asl Wayne', title: 'Yor yonaman remix', tag: 'remix', mood: 'Remix heat', fileName: '612.Asl Wayne - Yor-yonaman-remix' },
  { artist: 'Crash Adams', title: 'New Heart', tag: 'world', mood: 'Fresh pop', fileName: '612.Crash Adams - New Heart' },
  { artist: 'Navai feat. MONA', title: 'Есенин', tag: 'world', mood: 'Mood', fileName: '612.Navai feat. MONA - Есенин' },
  { artist: 'Xamdam Sobirov', title: 'Sevmayman Ona (KM Remix)', tag: 'remix', mood: 'High emotion', fileName: '612.Xamdam Sobirov - Sevmayman-ona-km-remix' },
  { artist: 'Giyosbek Narzullayev', title: "Bu qizcha mani o'ldiradi", tag: 'uzbek', mood: 'Hit vibe', fileName: "613.Giyosbek Narzullayev - Bu-qizcha-mani-oldiradi" },
  { artist: 'Dilshat Nurmatov', title: 'Gulnora', tag: 'uzbek', mood: 'Classic', fileName: '614.Dilshat Nurmatov - Gulnora' },
  { artist: 'Shohrux Ummon', title: 'Ayt sevmadimmi', tag: 'soft', mood: 'Tender', fileName: '614.Shohrux Ummon - Ayt sevmadimmi' },
  { artist: 'Umar Keyn', title: 'Love is Gone', tag: 'world', mood: 'Sadwave', fileName: '614.Umar Keyn - Love is Gone' },
  { artist: 'Yulduz Usmonova', title: 'Saney', tag: 'uzbek', mood: 'Legendary', fileName: '650.Yulduz Usmonova - Saney' },
  { artist: 'DJ Snake', title: 'Turn Down For What', tag: 'club', mood: 'Festival', fileName: '655.DJ Snake feat. Lil Jon - Turn Down For What' },
  { artist: 'Triplo Max', title: 'Shadow', tag: 'club', mood: 'Night mode', fileName: '654.Triplo Max - Shadow' },
  { artist: 'AY YOLA', title: 'Homay', tag: 'world', mood: 'Mystic', fileName: '948.AY YOLA - Homay' },
  { artist: 'Indila', title: 'Love Story', tag: 'soft', mood: 'French dream', fileName: 'Indila - Love Story' }
].map((track, i) => ({
  ...track,
  id: `demo-${i + 1}`,
  duration: randomDuration(),
  source: null,
  isDemo: true,
}));

const els = {
  loader: document.getElementById('loader'),
  trackGrid: document.getElementById('trackGrid'),
  queueList: document.getElementById('queueList'),
  searchInput: document.getElementById('searchInput'),
  chipRow: document.getElementById('chipRow'),
  audio: document.getElementById('audio'),
  playBtn: document.getElementById('playBtn'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  progress: document.getElementById('progress'),
  volume: document.getElementById('volume'),
  currentTime: document.getElementById('currentTime'),
  duration: document.getElementById('duration'),
  currentTitle: document.getElementById('currentTitle'),
  currentArtist: document.getElementById('currentArtist'),
  playerCover: document.getElementById('playerCover'),
  heroCover: document.getElementById('heroCover'),
  heroTrackTitle: document.getElementById('heroTrackTitle'),
  heroTrackSub: document.getElementById('heroTrackSub'),
  shuffleBtn: document.getElementById('shuffleBtn'),
  folderInput: document.getElementById('folderInput'),
  themeBtn: document.getElementById('themeBtn'),
  toast: document.getElementById('toast'),
  trackCount: document.getElementById('trackCount'),
  artistCount: document.getElementById('artistCount'),
  modeType: document.getElementById('modeType'),
  libraryModeChip: document.getElementById('libraryModeChip'),
  visualizer: document.getElementById('visualizer'),
  playHeroBtn: document.getElementById('playHeroBtn'),
  scrollLibraryBtn: document.getElementById('scrollLibraryBtn'),
  demoInfoBtn: document.getElementById('demoInfoBtn')
};

let tracks = [...demoTracks];
let filteredTracks = [...tracks];
let currentIndex = 0;
let currentFilter = 'all';
let audioContext;
let analyser;
let sourceNode;
let animationId;
let userMode = 'demo';

function init() {
  setupLoader();
  setupStars();
  setupReveal();
  setupEvents();
  updateHero(tracks[0]);
  updateStats();
  renderAll();
  els.audio.volume = 0.8;
  updatePlayerInfo(null);
  startVisualizerIdle();
}

function setupLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => els.loader.classList.add('hide'), 900);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function setupStars() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let w, h, stars;

  const resize = () => {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    stars = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 10)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.4,
      s: Math.random() * 0.6 + 0.2,
      a: Math.random() * 0.7 + 0.1,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((star) => {
      star.y += star.s;
      if (star.y > h) {
        star.y = -10;
        star.x = Math.random() * w;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${star.a})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize);
}

function setupEvents() {
  els.searchInput.addEventListener('input', filterAndRender);
  els.chipRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    document.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    filterAndRender();
  });

  els.playBtn.addEventListener('click', togglePlay);
  els.prevBtn.addEventListener('click', prevTrack);
  els.nextBtn.addEventListener('click', nextTrack);
  els.progress.addEventListener('input', seekAudio);
  els.volume.addEventListener('input', () => {
    els.audio.volume = Number(els.volume.value);
  });

  els.audio.addEventListener('timeupdate', syncProgress);
  els.audio.addEventListener('loadedmetadata', syncMeta);
  els.audio.addEventListener('ended', nextTrack);

  els.shuffleBtn.addEventListener('click', shuffleVisible);
  els.folderInput.addEventListener('change', handleFolderImport);
  els.themeBtn.addEventListener('click', () => document.body.classList.toggle('light-theme'));
  els.playHeroBtn.addEventListener('click', () => playTrack(0));
  els.scrollLibraryBtn.addEventListener('click', () => {
    document.getElementById('library').scrollIntoView({ behavior: 'smooth' });
  });
  els.demoInfoBtn.addEventListener('click', () => {
    showToast('Demo playlist tayyor. Real audio uchun “Papkani yuklash” tugmasini bosing.');
  });
}

function renderAll() {
  renderTrackGrid();
  renderQueue();
}

function filterAndRender() {
  const q = els.searchInput.value.trim().toLowerCase();

  filteredTracks = tracks.filter((track) => {
    const matchesSearch = `${track.artist} ${track.title} ${track.fileName} ${track.mood}`.toLowerCase().includes(q);
    const matchesFilter = currentFilter === 'all' ? true : track.tag === currentFilter;
    return matchesSearch && matchesFilter;
  });

  renderAll();
}

function renderTrackGrid() {
  if (!filteredTracks.length) {
    els.trackGrid.innerHTML = `
      <div class="track-card">
        <h3>Hech narsa topilmadi</h3>
        <p class="track-note">Qidiruvni o‘zgartirib ko‘ring yoki audio papkani yuklang.</p>
      </div>
    `;
    return;
  }

  els.trackGrid.innerHTML = filteredTracks.map((track) => {
    const initials = getInitials(track.artist, track.title);
    const actualIndex = tracks.findIndex((item) => item.id === track.id);
    return `
      <article class="track-card">
        <div class="track-card-top">
          <div class="track-cover" data-initials="${escapeHtml(initials)}"></div>
          <div class="track-text">
            <h3 title="${escapeHtml(track.title)}">${escapeHtml(track.title)}</h3>
            <p class="track-sub" title="${escapeHtml(track.artist)}">${escapeHtml(track.artist)}</p>
          </div>
          <button class="track-action" data-index="${actualIndex}" title="Play">▶</button>
        </div>
        <div class="meta-row">
          <span>${capitalize(track.tag)}</span>
          <span>${track.duration || '0:00'}</span>
        </div>
        <p class="track-note">${track.isDemo ? 'Demo track — nom videodan olindi. Real playback uchun papka yuklang.' : 'Yuklangan real audio fayl. Bosib ijro qiling.'}</p>
      </article>
    `;
  }).join('');

  els.trackGrid.querySelectorAll('.track-action').forEach((btn) => {
    btn.addEventListener('click', () => playTrack(Number(btn.dataset.index)));
  });
}

function renderQueue() {
  const queueSource = filteredTracks.slice(0, 6);
  els.queueList.innerHTML = queueSource.map((track) => `
    <div class="queue-item">
      <div class="queue-thumb" data-initials="${escapeHtml(getInitials(track.artist, track.title))}"></div>
      <div>
        <h4>${escapeHtml(track.title)}</h4>
        <p>${escapeHtml(track.artist)} · ${track.duration || '0:00'}</p>
      </div>
    </div>
  `).join('');
}

function updateHero(track) {
  if (!track) return;
  els.heroTrackTitle.textContent = `${track.artist} — ${track.title}`;
  els.heroTrackSub.textContent = `${capitalize(track.tag)} / ${track.isDemo ? 'demo playlist' : 'your imported folder'}`;
  setCoverInitials(els.heroCover, getInitials(track.artist, track.title));
}

function updateStats() {
  const artistSet = new Set(tracks.map((track) => track.artist));
  els.trackCount.textContent = tracks.length;
  els.artistCount.textContent = artistSet.size;
  els.modeType.textContent = userMode === 'demo' ? 'Demo' : 'Live';
  els.libraryModeChip.textContent = userMode === 'demo'
    ? 'Demo playlist active'
    : `Imported folder active · ${tracks.length} ta audio`;
}

function playTrack(index) {
  if (index < 0 || index >= tracks.length) return;
  currentIndex = index;
  const track = tracks[index];
  updateHero(track);
  updatePlayerInfo(track);

  if (!track.source) {
    els.audio.pause();
    els.playBtn.textContent = '▶';
    els.progress.value = 0;
    els.currentTime.textContent = '0:00';
    els.duration.textContent = track.duration || '0:00';
    startVisualizerIdle(true);
    showToast('Bu demo trek. Pastdagi “Papkani yuklash” orqali real audio fayllarni ulang.');
    return;
  }

  els.audio.src = track.source;
  setupAudioContext();
  els.audio.play()
    .then(() => {
      els.playBtn.textContent = '❚❚';
      showToast(`Ijro etilmoqda: ${track.artist} — ${track.title}`);
    })
    .catch(() => showToast('Brauzer ijroni blokladi. Trek tugmasini yana bir marta bosing.'));
}

function togglePlay() {
  const currentTrack = tracks[currentIndex];
  if (!currentTrack) return;

  if (!currentTrack.source) {
    showToast('Demo rejim. Real playback uchun audio papkani yuklang.');
    return;
  }

  if (els.audio.paused) {
    setupAudioContext();
    els.audio.play();
    els.playBtn.textContent = '❚❚';
  } else {
    els.audio.pause();
    els.playBtn.textContent = '▶';
  }
}

function prevTrack() {
  if (!tracks.length) return;
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentIndex);
}

function nextTrack() {
  if (!tracks.length) return;
  currentIndex = (currentIndex + 1) % tracks.length;
  playTrack(currentIndex);
}

function seekAudio() {
  if (!els.audio.duration) return;
  els.audio.currentTime = (Number(els.progress.value) / 100) * els.audio.duration;
}

function syncProgress() {
  if (!els.audio.duration) return;
  els.progress.value = (els.audio.currentTime / els.audio.duration) * 100;
  els.currentTime.textContent = formatTime(els.audio.currentTime);
}

function syncMeta() {
  els.duration.textContent = formatTime(els.audio.duration || 0);
}

function updatePlayerInfo(track) {
  if (!track) {
    els.currentTitle.textContent = 'Demo playlist tayyor';
    els.currentArtist.textContent = 'Audio papka yuklanganda real playback ishlaydi';
    setCoverInitials(els.playerCover, 'PM');
    return;
  }

  els.currentTitle.textContent = track.title;
  els.currentArtist.textContent = `${track.artist} · ${capitalize(track.tag)} · ${track.duration || '0:00'}`;
  setCoverInitials(els.playerCover, getInitials(track.artist, track.title));
}

async function handleFolderImport(e) {
  const files = [...e.target.files].filter((file) => file.type.startsWith('audio/'));
  if (!files.length) {
    showToast('Audio fayl topilmadi. MP3 yoki boshqa music fayllar bor papkani tanlang.');
    return;
  }

  showToast('Papka yuklanmoqda...');

  const importedTracks = await Promise.all(files.map(async (file, idx) => {
    const cleaned = cleanFileName(file.name);
    const parsed = parseArtistTitle(cleaned);
    const source = URL.createObjectURL(file);
    const duration = await getAudioDuration(source);
    return {
      id: `user-${idx + 1}`,
      artist: parsed.artist,
      title: parsed.title,
      tag: detectTag(cleaned),
      mood: detectMood(cleaned),
      fileName: file.name,
      duration,
      source,
      isDemo: false,
    };
  }));

  tracks.forEach((track) => {
    if (track.source) URL.revokeObjectURL(track.source);
  });

  tracks = importedTracks.sort((a, b) => a.artist.localeCompare(b.artist));
  filteredTracks = [...tracks];
  currentFilter = 'all';
  document.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
  document.querySelector('[data-filter="all"]').classList.add('active');
  els.searchInput.value = '';
  userMode = 'live';
  updateStats();
  renderAll();
  updateHero(tracks[0]);
  updatePlayerInfo(tracks[0]);
  showToast(`${tracks.length} ta audio yuklandi. Endi real player ishlaydi.`);
}

function shuffleVisible() {
  if (!filteredTracks.length) return;
  const randomTrack = filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
  const actualIndex = tracks.findIndex((item) => item.id === randomTrack.id);
  playTrack(actualIndex);
}

function getAudioDuration(source) {
  return new Promise((resolve) => {
    const tempAudio = new Audio();
    tempAudio.src = source;
    tempAudio.addEventListener('loadedmetadata', () => resolve(formatTime(tempAudio.duration || 0)), { once: true });
    tempAudio.addEventListener('error', () => resolve(randomDuration()), { once: true });
  });
}

function cleanFileName(name) {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/^\d+[.)_-]?\s*/, '')
    .replace(/\[(.*?)\]/g, '')
    .replace(/\((.*?)\)/g, ' $1 ')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseArtistTitle(name) {
  const parts = name.split(' - ');
  if (parts.length >= 2) {
    return {
      artist: parts[0].trim(),
      title: parts.slice(1).join(' - ').trim(),
    };
  }

  const words = name.split(' ');
  return {
    artist: words.slice(0, 2).join(' ') || 'Unknown Artist',
    title: words.slice(2).join(' ') || name,
  };
}

function detectTag(text) {
  const t = text.toLowerCase();
  if (/(remix|dj|club|mix|bass|boosted)/.test(t)) return t.includes('club') ? 'club' : 'remix';
  if (/(love|heart|sev|romantic|story|gone|tomchi|kechir|gulnora)/.test(t)) return 'soft';
  if (/[а-яё]/i.test(text) || /(snake|lil jon|major lazer|indila|crash|tim gallagher|ay yola|dua lipa)/.test(t)) return 'world';
  if (/(shoh|yulduz|jaloliddin|xamdam|dilnoz|jasoor|uzmir|navruza|giyosbek|ummon|sardor|shabnam|jasoor|musofir|ozoda|doston)/.test(t)) return 'uzbek';
  return 'world';
}

function detectMood(text) {
  const t = text.toLowerCase();
  if (/(remix|dj|club|boom|taki|turn down)/.test(t)) return 'High energy';
  if (/(love|sev|heart|gone|tomchi|kechir|gulnora|story)/.test(t)) return 'Soft mood';
  if (/(shadow|midnight|night)/.test(t)) return 'Night vibe';
  return 'Modern vibe';
}

function setupAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 128;
    sourceNode = audioContext.createMediaElementSource(els.audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  if (audioContext.state === 'suspended') audioContext.resume();
  startVisualizerLive();
}

function startVisualizerLive(force = false) {
  if (!analyser && !force) return;
  cancelAnimationFrame(animationId);

  const ctx = els.visualizer.getContext('2d');
  const width = els.visualizer.width;
  const height = els.visualizer.height;
  const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(0, 0, width, height);

    const barCount = 32;
    const barWidth = width / barCount - 4;

    for (let i = 0; i < barCount; i++) {
      let value;
      if (analyser && !els.audio.paused) {
        analyser.getByteFrequencyData(dataArray);
        value = dataArray[i] / 255;
      } else {
        value = (Math.sin((Date.now() / 180) + i) + 1) / 2 * 0.35;
      }

      const barHeight = Math.max(8, value * (height - 24));
      const x = i * (barWidth + 4) + 2;
      const y = height - barHeight - 8;
      const gradient = ctx.createLinearGradient(0, y, 0, height);
      gradient.addColorStop(0, '#05d9e8');
      gradient.addColorStop(0.5, '#7c5cff');
      gradient.addColorStop(1, '#ff5ea8');
      ctx.fillStyle = gradient;
      roundRect(ctx, x, y, barWidth, barHeight, 8);
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  };

  draw();
}

function startVisualizerIdle(force = false) {
  startVisualizerLive(force);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function randomDuration() {
  const min = Math.floor(Math.random() * 2) + 2;
  const sec = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove('show'), 2600);
}

function getInitials(artist, title) {
  const a = (artist || 'P').trim().charAt(0).toUpperCase();
  const t = (title || 'M').trim().charAt(0).toUpperCase();
  return `${a}${t}`;
}

function setCoverInitials(el, initials) {
  el.setAttribute('data-initials', initials);
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

init();
