const audio = document.getElementById("audio");
const trackGrid = document.getElementById("trackGrid");
const featuredGrid = document.getElementById("featuredGrid");
const trendingList = document.getElementById("trendingList");
const recentList = document.getElementById("recentList");
const playlistList = document.getElementById("playlistList");
const playlistForm = document.getElementById("playlistForm");
const playlistNameInput = document.getElementById("playlistName");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortFilter = document.getElementById("sortFilter");
const libraryTitle = document.getElementById("libraryTitle");
const resultsCount = document.getElementById("resultsCount");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageInfo = document.getElementById("pageInfo");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const themeToggle = document.getElementById("themeToggle");
const likeCurrentBtn = document.getElementById("likeCurrentBtn");
const toast = document.getElementById("toast");
const trackCountEl = document.getElementById("trackCount");
const genreCountEl = document.getElementById("genreCount");
const savedCountEl = document.getElementById("savedCount");
const playHeroBtn = document.getElementById("playHeroBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const refreshFeatured = document.getElementById("refreshFeatured");
const navButtons = [...document.querySelectorAll(".nav-btn")];

const STORE_KEYS = {
  theme: "pulsebox_theme",
  favorites: "pulsebox_favorites",
  playlists: "pulsebox_playlists",
  recent: "pulsebox_recent",
};

const sampleAudioSources = [
  "https://download.samplelib.com/mp3/sample-3s.mp3",
  "https://download.samplelib.com/mp3/sample-6s.mp3",
  "https://download.samplelib.com/mp3/sample-9s.mp3",
  "https://download.samplelib.com/mp3/sample-12s.mp3",
  "https://download.samplelib.com/mp3/sample-15s.mp3",
];

const genres = [
  "Pop",
  "Hip Hop",
  "Afro",
  "House",
  "Lo-fi",
  "R&B",
  "Electronic",
  "Cinematic",
  "Rock",
  "Indie",
  "Drill",
  "Ambient",
];

const moods = [
  "Night Drive",
  "Chill",
  "Workout",
  "Focus",
  "Summer",
  "Dreamy",
  "Party",
  "Sunset",
  "Late Night",
  "Hype",
];

const adjectives = [
  "Velvet",
  "Neon",
  "Electric",
  "Golden",
  "Crystal",
  "Shadow",
  "Solar",
  "Midnight",
  "Violet",
  "Echo",
  "Gravity",
  "Lunar",
  "Sonic",
  "Nova",
  "Pulse",
  "Aurora",
];

const nouns = [
  "Dream",
  "Rush",
  "City",
  "Rain",
  "Sky",
  "Ritual",
  "Motion",
  "Signal",
  "Storm",
  "Flame",
  "Ocean",
  "Empire",
  "Memory",
  "Vision",
  "Route",
  "Heat",
];

const firstNames = [
  "Aero",
  "Zayn",
  "Lina",
  "Mira",
  "Juno",
  "Kairo",
  "Nyla",
  "Aria",
  "Troy",
  "Sena",
  "Nova",
  "Rami",
  "Ivy",
  "Leo",
  "Amir",
  "Sofi",
];

const lastNames = [
  "Wave",
  "Stone",
  "Ray",
  "Bloom",
  "Vega",
  "Night",
  "Lane",
  "Fox",
  "Vale",
  "Drift",
  "Cruz",
  "Moon",
  "Blaze",
  "Skye",
  "Reed",
  "Storm",
];

const gradients = [
  ["#4f46e5", "#8b5cf6"],
  ["#0ea5e9", "#22c55e"],
  ["#f43f5e", "#f59e0b"],
  ["#8b5cf6", "#06b6d4"],
  ["#10b981", "#3b82f6"],
  ["#f97316", "#ec4899"],
  ["#6366f1", "#14b8a6"],
  ["#ef4444", "#8b5cf6"],
];

const randFrom = (arr, index, offset = 0) => arr[(index + offset) % arr.length];

function coverSvg(title, artist, index) {
  const [from, to] = gradients[index % gradients.length];
  const initials = `${title[0] || "P"}${artist[0] || "B"}`.toUpperCase();
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="40" /></filter>
    </defs>
    <rect width="600" height="600" rx="44" fill="url(#g)" />
    <circle cx="120" cy="90" r="90" fill="rgba(255,255,255,0.25)" filter="url(#blur)" />
    <circle cx="500" cy="520" r="120" fill="rgba(255,255,255,0.16)" filter="url(#blur)" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="150" font-family="Inter, Arial" font-weight="800">${initials}</text>
    <text x="38" y="548" fill="rgba(255,255,255,0.88)" font-size="28" font-family="Inter, Arial" font-weight="700">PulseBox</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createTrack(index) {
  const genre = randFrom(genres, index);
  const mood = randFrom(moods, index, 3);
  const title = `${randFrom(adjectives, index)} ${randFrom(nouns, index, 5)}`;
  const artist = `${randFrom(firstNames, index, 2)} ${randFrom(lastNames, index, 7)}`;
  const album = `${randFrom(adjectives, index, 4)} Tapes`;
  const durationSeconds = 126 + (index % 5) * 18 + (index % 7) * 7;
  const releaseYear = 2022 + (index % 5);
  const popularity = 62 + ((index * 13) % 38);
  const plays = 85000 + index * 1274;
  const isNew = index % 6 === 0;
  const isTrending = index % 4 === 0 || popularity > 90;
  return {
    id: index + 1,
    title,
    artist,
    album,
    genre,
    mood,
    durationSeconds,
    durationLabel: formatTime(durationSeconds),
    releaseYear,
    popularity,
    plays,
    isNew,
    isTrending,
    audio: sampleAudioSources[index % sampleAudioSources.length],
    cover: coverSvg(title, artist, index),
  };
}

const tracks = Array.from({ length: 320 }, (_, index) => createTrack(index));

let currentTrackIndex = 0;
let currentView = "discover";
let currentPage = 1;
const pageSize = 12;
let featuredSeed = 0;

let favorites = readStore(STORE_KEYS.favorites, []);
let recentTrackIds = readStore(STORE_KEYS.recent, []);
let playlists = readStore(STORE_KEYS.playlists, [
  { id: 1, name: "My Mix", trackIds: [1, 5, 9, 14] },
  { id: 2, name: "Night Drive", trackIds: [4, 8, 12, 16, 20] },
]);

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatTime(totalSeconds) {
  const safe = Number.isFinite(totalSeconds) ? Math.floor(totalSeconds) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function compactNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return String(num);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeToggle.textContent = theme === "light" ? "☀" : "☾";
  localStorage.setItem(STORE_KEYS.theme, theme);
}

function initTheme() {
  const saved = localStorage.getItem(STORE_KEYS.theme) || "dark";
  applyTheme(saved);
}

function fillGenreOptions() {
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function getFilteredTracks() {
  const query = searchInput.value.trim().toLowerCase();
  const genre = genreFilter.value;
  const sort = sortFilter.value;

  let filtered = [...tracks];

  if (currentView === "trending") {
    filtered = filtered.filter((track) => track.isTrending).sort((a, b) => b.popularity - a.popularity);
  } else if (currentView === "new") {
    filtered = filtered.filter((track) => track.isNew).sort((a, b) => b.releaseYear - a.releaseYear || b.id - a.id);
  } else if (currentView === "favorites") {
    filtered = filtered.filter((track) => favorites.includes(track.id));
  } else if (currentView === "recent") {
    filtered = recentTrackIds
      .map((id) => tracks.find((track) => track.id === id))
      .filter(Boolean);
  } else if (currentView === "playlists") {
    const unionIds = [...new Set(playlists.flatMap((playlist) => playlist.trackIds))];
    filtered = unionIds.map((id) => tracks.find((track) => track.id === id)).filter(Boolean);
  }

  if (genre !== "all") {
    filtered = filtered.filter((track) => track.genre === genre);
  }

  if (query) {
    filtered = filtered.filter((track) => {
      const haystack = `${track.title} ${track.artist} ${track.album} ${track.genre} ${track.mood}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  if (sort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "artist") {
    filtered.sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (sort === "latest") {
    filtered.sort((a, b) => b.releaseYear - a.releaseYear || b.id - a.id);
  } else {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  return filtered;
}

function renderFeatured() {
  const featureTracks = tracks
    .slice(featuredSeed * 4, featuredSeed * 4 + 4)
    .map((track, i) => tracks[(featuredSeed * 4 + i) % tracks.length]);

  featuredGrid.innerHTML = featureTracks
    .map(
      (track) => `
        <article class="feature-card glass-soft" style="background-image: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)), url('${track.cover}'); background-size: cover; background-position: center;">
          <div class="feature-top">
            <span class="badge-genre">${track.genre}</span>
            <button class="tiny-btn" data-play-id="${track.id}">Play</button>
          </div>
          <div>
            <h4>${track.title}</h4>
            <p class="feature-meta">${track.artist} • ${track.mood}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTrending() {
  const topTracks = [...tracks].sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  trendingList.innerHTML = topTracks
    .map(
      (track, index) => `
        <div class="trending-item">
          <div class="rank-number">${index + 1}</div>
          <div>
            <h4>${track.title}</h4>
            <p class="trending-meta">${track.artist} • ${track.genre} • ${track.durationLabel}</p>
          </div>
          <button data-play-id="${track.id}">Play</button>
        </div>
      `,
    )
    .join("");
}

function renderRecent() {
  const items = recentTrackIds
    .map((id) => tracks.find((track) => track.id === id))
    .filter(Boolean)
    .slice(0, 6);

  if (!items.length) {
    recentList.innerHTML = `<div class="empty-note">Hali trek eshitilmadi.</div>`;
    return;
  }

  recentList.innerHTML = items
    .map(
      (track) => `
        <div class="recent-item">
          <div>
            <h4>${track.title}</h4>
            <p>${track.artist} • ${track.durationLabel}</p>
          </div>
          <button data-play-id="${track.id}">Play</button>
        </div>
      `,
    )
    .join("");
}

function renderPlaylists() {
  if (!playlists.length) {
    playlistList.innerHTML = `<div class="empty-note">Playlist yo‘q. Yangi playlist yarating.</div>`;
    return;
  }

  playlistList.innerHTML = playlists
    .map((playlist) => {
      const firstTrack = tracks.find((track) => track.id === playlist.trackIds[0]);
      return `
        <div class="playlist-item">
          <div>
            <h4>${playlist.name}</h4>
            <p>${playlist.trackIds.length} tracks${firstTrack ? ` • ${firstTrack.genre}` : ""}</p>
          </div>
          <div class="playlist-row">
            <button data-playlist-play="${playlist.id}">Play All</button>
            <button data-playlist-clear="${playlist.id}">Clear</button>
            <button data-playlist-delete="${playlist.id}">Delete</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function updateStats(filteredCount) {
  trackCountEl.textContent = `${tracks.length}+`;
  genreCountEl.textContent = `${genres.length}`;
  savedCountEl.textContent = favorites.length;
  resultsCount.textContent = `${filteredCount} results`;
}

function titleByView() {
  return {
    discover: "Discover 320 tracks",
    trending: "Trending tracks",
    new: "New releases",
    favorites: "Your favorites",
    recent: "Recently played",
    playlists: "Playlist library",
  }[currentView];
}

function renderTracks() {
  const filtered = getFilteredTracks();
  libraryTitle.textContent = titleByView();
  updateStats(filtered.length);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  if (!pageItems.length) {
    trackGrid.innerHTML = `<div class="empty-note">Bu filter bo‘yicha trek topilmadi.</div>`;
    return;
  }

  trackGrid.innerHTML = pageItems
    .map(
      (track) => `
        <article class="track-card glass-soft">
          <img class="track-cover" src="${track.cover}" alt="${track.title}" />
          <div class="track-row">
            <div>
              <h4>${track.title}</h4>
              <div class="track-meta">${track.artist} • ${track.album}</div>
            </div>
          </div>
          <div class="track-stats">
            <span>${track.genre}</span>
            <span>${track.mood}</span>
            <span>${track.durationLabel}</span>
            <span>${compactNumber(track.plays)} plays</span>
          </div>
          <div class="track-actions">
            <button data-play-id="${track.id}">Play</button>
            <button data-favorite-id="${track.id}">${favorites.includes(track.id) ? "♥" : "♡"}</button>
            <button data-add-id="${track.id}">+ Playlist</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderAll() {
  renderFeatured();
  renderTrending();
  renderRecent();
  renderPlaylists();
  renderTracks();
  updatePlayerFavoriteState();
}

function updatePlayer(track) {
  if (!track) return;
  playerCover.src = track.cover;
  playerTitle.textContent = track.title;
  playerArtist.textContent = `${track.artist} • ${track.genre}`;
  durationTimeEl.textContent = track.durationLabel;
}

async function playTrackById(trackId) {
  const index = tracks.findIndex((track) => track.id === Number(trackId));
  if (index === -1) return;
  currentTrackIndex = index;
  const track = tracks[currentTrackIndex];
  audio.src = track.audio;
  updatePlayer(track);

  try {
    await audio.play();
    playPauseBtn.textContent = "❚❚";
    addToRecent(track.id);
    showToast(`${track.title} is now playing`);
  } catch {
    showToast("Audio could not auto-play. Click play again.");
  }
}

function togglePlayPause() {
  if (!audio.src) {
    playTrackById(tracks[currentTrackIndex].id);
    return;
  }
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
}

function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrackById(tracks[currentTrackIndex].id);
}

function playPrev() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrackById(tracks[currentTrackIndex].id);
}

function addToRecent(trackId) {
  recentTrackIds = [trackId, ...recentTrackIds.filter((id) => id !== trackId)].slice(0, 12);
  saveStore(STORE_KEYS.recent, recentTrackIds);
  renderRecent();
}

function toggleFavorite(trackId) {
  const id = Number(trackId);
  favorites = favorites.includes(id)
    ? favorites.filter((favId) => favId !== id)
    : [id, ...favorites];
  saveStore(STORE_KEYS.favorites, favorites);
  renderTracks();
  updateStats(getFilteredTracks().length);
  updatePlayerFavoriteState();
  showToast(favorites.includes(id) ? "Added to favorites" : "Removed from favorites");
}

function updatePlayerFavoriteState() {
  const currentTrack = tracks[currentTrackIndex];
  likeCurrentBtn.textContent = favorites.includes(currentTrack.id) ? "♥" : "♡";
}

function createPlaylist(name) {
  const clean = name.trim();
  if (!clean) return;
  playlists = [{ id: Date.now(), name: clean, trackIds: [] }, ...playlists];
  saveStore(STORE_KEYS.playlists, playlists);
  renderPlaylists();
  playlistNameInput.value = "";
  showToast("Playlist created");
}

function addTrackToPlaylist(trackId) {
  if (!playlists.length) {
    createPlaylist("My Playlist");
  }
  const id = Number(trackId);
  playlists[0].trackIds = [...new Set([id, ...playlists[0].trackIds])];
  saveStore(STORE_KEYS.playlists, playlists);
  renderPlaylists();
  showToast(`Added to ${playlists[0].name}`);
}

function clearPlaylist(playlistId) {
  playlists = playlists.map((playlist) =>
    playlist.id === Number(playlistId) ? { ...playlist, trackIds: [] } : playlist,
  );
  saveStore(STORE_KEYS.playlists, playlists);
  renderPlaylists();
  showToast("Playlist cleared");
}

function deletePlaylist(playlistId) {
  playlists = playlists.filter((playlist) => playlist.id !== Number(playlistId));
  saveStore(STORE_KEYS.playlists, playlists);
  renderPlaylists();
  renderTracks();
  showToast("Playlist deleted");
}

function playPlaylist(playlistId) {
  const playlist = playlists.find((item) => item.id === Number(playlistId));
  if (!playlist || !playlist.trackIds.length) {
    showToast("Playlist bo‘sh");
    return;
  }
  playTrackById(playlist.trackIds[0]);
}

function setView(view) {
  currentView = view;
  currentPage = 1;
  navButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
  renderTracks();
}

function shufflePlay() {
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
  playTrackById(randomTrack.id);
}

function attachEvents() {
  document.body.addEventListener("click", (event) => {
    const playId = event.target.dataset.playId;
    const favoriteId = event.target.dataset.favoriteId;
    const addId = event.target.dataset.addId;
    const playlistPlay = event.target.dataset.playlistPlay;
    const playlistClear = event.target.dataset.playlistClear;
    const playlistDelete = event.target.dataset.playlistDelete;

    if (playId) playTrackById(playId);
    if (favoriteId) toggleFavorite(favoriteId);
    if (addId) addTrackToPlaylist(addId);
    if (playlistPlay) playPlaylist(playlistPlay);
    if (playlistClear) clearPlaylist(playlistClear);
    if (playlistDelete) deletePlaylist(playlistDelete);
  });

  playlistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPlaylist(playlistNameInput.value);
  });

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderTracks();
  });

  genreFilter.addEventListener("change", () => {
    currentPage = 1;
    renderTracks();
  });

  sortFilter.addEventListener("change", renderTracks);

  navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderTracks();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage += 1;
    renderTracks();
  });

  playPauseBtn.addEventListener("click", togglePlayPause);
  prevBtn.addEventListener("click", playPrev);
  nextBtn.addEventListener("click", playNext);

  audio.addEventListener("timeupdate", () => {
    const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationTimeEl.textContent = formatTime(audio.duration || tracks[currentTrackIndex].durationSeconds);
  });

  audio.addEventListener("ended", playNext);

  progressBar.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });

  volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value);
  });

  themeToggle.addEventListener("click", () => {
    const theme = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(theme);
  });

  likeCurrentBtn.addEventListener("click", () => {
    const track = tracks[currentTrackIndex];
    toggleFavorite(track.id);
  });

  playHeroBtn.addEventListener("click", () => playTrackById(1));
  shuffleBtn.addEventListener("click", shufflePlay);
  refreshFeatured.addEventListener("click", () => {
    featuredSeed = (featuredSeed + 1) % Math.ceil(tracks.length / 4);
    renderFeatured();
    showToast("Featured cards refreshed");
  });

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input")) return;

    if (event.code === "Space") {
      event.preventDefault();
      togglePlayPause();
    }
    if (event.code === "ArrowRight") playNext();
    if (event.code === "ArrowLeft") playPrev();
    if (event.key.toLowerCase() === "f") toggleFavorite(tracks[currentTrackIndex].id);
  });
}

function init() {
  initTheme();
  fillGenreOptions();
  audio.volume = Number(volumeBar.value);
  updatePlayer(tracks[currentTrackIndex]);
  attachEvents();
  renderAll();
}

init();
