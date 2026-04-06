import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const GENERATED_DIR = path.join(__dirname, 'generated');

if (!fs.existsSync(GENERATED_DIR)) {
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
}

app.use(express.json({ limit: '10mb' }));
app.use('/generated', express.static(GENERATED_DIR));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function requireEnv(keys) {
  const missing = keys.filter((key) => !process.env[key]);
  if (missing.length) {
    return `Missing environment variable(s): ${missing.join(', ')}`;
  }
  return null;
}

function extractImageBase64(response) {
  const candidates = response?.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts || [];
    for (const part of parts) {
      if (part?.inlineData?.data) {
        return part.inlineData.data;
      }
    }
  }
  return null;
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get('/', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Media Studio</title>
  <style>
    :root {
      --bg: #070b17;
      --panel: rgba(14, 22, 42, 0.82);
      --card: rgba(20, 30, 56, 0.78);
      --line: rgba(255,255,255,0.08);
      --text: #eef4ff;
      --muted: #9bb0d1;
      --brand: #7c5cff;
      --brand-2: #18c6ff;
      --success: #29d17d;
      --danger: #ff6b7a;
      --shadow: 0 24px 80px rgba(0,0,0,0.45);
      --radius: 24px;
    }

    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(124,92,255,0.22), transparent 28%),
        radial-gradient(circle at top right, rgba(24,198,255,0.16), transparent 24%),
        linear-gradient(180deg, #050814 0%, #090f1d 40%, #07111f 100%);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    .orb, .orb2 {
      position: fixed;
      border-radius: 999px;
      filter: blur(60px);
      pointer-events: none;
      opacity: 0.35;
      z-index: 0;
    }
    .orb {
      width: 260px; height: 260px; left: -60px; top: 80px;
      background: linear-gradient(135deg, var(--brand), transparent);
    }
    .orb2 {
      width: 320px; height: 320px; right: -80px; top: 180px;
      background: linear-gradient(135deg, var(--brand-2), transparent);
    }

    .container {
      width: min(1200px, calc(100% - 32px));
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .hero {
      padding: 32px 0 20px;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      letter-spacing: 0.4px;
    }

    .logo {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      box-shadow: var(--shadow);
      font-weight: 900;
    }

    .badge {
      border: 1px solid var(--line);
      color: var(--muted);
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(14px);
      font-size: 13px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 20px;
      align-items: stretch;
    }

    .glass {
      background: var(--panel);
      border: 1px solid var(--line);
      backdrop-filter: blur(18px);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .hero-card {
      padding: 28px;
    }

    .eyebrow {
      color: #cfd9ff;
      background: rgba(124,92,255,0.16);
      border: 1px solid rgba(124,92,255,0.24);
      display: inline-flex;
      padding: 10px 14px;
      border-radius: 999px;
      font-size: 13px;
      margin-bottom: 16px;
    }

    h1 {
      margin: 0 0 14px;
      font-size: clamp(34px, 5vw, 64px);
      line-height: 1.02;
      letter-spacing: -0.04em;
    }

    .sub {
      margin: 0;
      font-size: 16px;
      color: var(--muted);
      max-width: 700px;
      line-height: 1.7;
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 22px;
    }

    .stat {
      padding: 16px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.03);
      border-radius: 20px;
    }

    .stat strong { display: block; font-size: 24px; margin-bottom: 6px; }
    .stat span { color: var(--muted); font-size: 13px; }

    .feature-list {
      padding: 24px;
      display: grid;
      gap: 14px;
    }

    .feature {
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.03);
      border-radius: 20px;
      padding: 16px;
    }
    .feature h3 { margin: 0 0 8px; font-size: 16px; }
    .feature p { margin: 0; color: var(--muted); line-height: 1.6; font-size: 14px; }

    .app-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 14px 0 40px;
    }

    .panel {
      padding: 22px;
    }

    .panel-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }

    .panel h2 {
      margin: 0;
      font-size: 24px;
      letter-spacing: -0.02em;
    }

    .panel small {
      color: var(--muted);
      display: block;
      margin-top: 6px;
      font-size: 13px;
    }

    .field {
      display: grid;
      gap: 8px;
      margin-bottom: 16px;
    }

    .field label {
      color: #d6e0ff;
      font-size: 14px;
      font-weight: 600;
    }

    textarea, input, select {
      width: 100%;
      border: 1px solid rgba(255,255,255,0.09);
      background: rgba(255,255,255,0.03);
      color: var(--text);
      padding: 14px 16px;
      border-radius: 18px;
      outline: none;
      font: inherit;
      transition: 0.18s ease;
    }

    textarea {
      min-height: 140px;
      resize: vertical;
      line-height: 1.6;
    }

    textarea:focus, input:focus, select:focus {
      border-color: rgba(124,92,255,0.7);
      box-shadow: 0 0 0 4px rgba(124,92,255,0.18);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 8px;
    }

    button {
      border: none;
      border-radius: 18px;
      padding: 14px 18px;
      color: white;
      font-weight: 700;
      cursor: pointer;
      transition: 0.18s ease;
      font: inherit;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      box-shadow: 0 10px 30px rgba(124, 92, 255, 0.36);
    }

    .btn-secondary {
      background: rgba(255,255,255,0.07);
      border: 1px solid var(--line);
      color: var(--text);
    }

    button:hover { transform: translateY(-1px); }
    button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 12px 0 2px;
    }

    .chip {
      padding: 10px 12px;
      border-radius: 999px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--line);
      color: #dce6ff;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
    }

    .status {
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 16px;
      font-size: 14px;
      display: none;
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.04);
      color: var(--text);
    }

    .status.show { display: block; }
    .status.success { border-color: rgba(41,209,125,0.3); color: #caffdf; background: rgba(41,209,125,0.12); }
    .status.error { border-color: rgba(255,107,122,0.3); color: #ffd6da; background: rgba(255,107,122,0.12); }
    .status.info { border-color: rgba(124,92,255,0.25); color: #dde4ff; background: rgba(124,92,255,0.11); }

    .result-box {
      margin-top: 18px;
      min-height: 280px;
      border: 1px dashed rgba(255,255,255,0.12);
      border-radius: 24px;
      display: grid;
      place-items: center;
      background: rgba(255,255,255,0.02);
      overflow: hidden;
      position: relative;
    }

    .placeholder {
      text-align: center;
      max-width: 320px;
      color: var(--muted);
      line-height: 1.7;
      padding: 32px;
    }

    .media-preview {
      width: 100%;
      display: block;
      border-radius: 0;
    }

    .results {
      display: grid;
      gap: 12px;
      margin-top: 16px;
    }

    .search-card {
      padding: 16px;
      border-radius: 18px;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--line);
      transition: 0.18s ease;
    }

    .search-card:hover {
      transform: translateY(-2px);
      border-color: rgba(124,92,255,0.3);
    }

    .search-card a {
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      line-height: 1.5;
    }

    .search-card p {
      color: var(--muted);
      margin: 8px 0 0;
      line-height: 1.6;
      font-size: 14px;
    }

    .search-card .meta {
      color: #7bd8ff;
      font-size: 12px;
      margin-bottom: 6px;
      word-break: break-all;
    }

    .footer-note {
      margin-top: 18px;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.6;
    }

    @media (max-width: 980px) {
      .hero-grid, .app-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .row, .stat-grid {
        grid-template-columns: 1fr;
      }

      .panel, .hero-card, .feature-list {
        padding: 18px;
      }

      .container {
        width: min(100% - 18px, 1200px);
      }
    }
  </style>
</head>
<body>
  <div class="orb"></div>
  <div class="orb2"></div>

  <div class="container">
    <section class="hero">
      <div class="nav">
        <div class="brand">
          <div class="logo">AI</div>
          <div>
            <div>AI Media Studio</div>
            <div style="color: var(--muted); font-size: 13px; font-weight: 500;">Image + Video + Google Search</div>
          </div>
        </div>
        <div class="badge">Modern Google-powered creative workspace</div>
      </div>

      <div class="hero-grid">
        <div class="glass hero-card">
          <div class="eyebrow">Creative generation + research in one dashboard</div>
          <h1>Create images, make videos, and pull ideas from Google.</h1>
          <p class="sub">
            Prompt yozing, rasm generatsiya qiling, video yarating va Google qidiruvi orqali shu promptga mos ilhom, trend yoki ma'lumotlarni bir joyda ko'ring.
          </p>
          <div class="stat-grid">
            <div class="stat"><strong>Image</strong><span>Promptdan vizual yaratish</span></div>
            <div class="stat"><strong>Video</strong><span>Kinematik qisqa video flow</span></div>
            <div class="stat"><strong>Google</strong><span>Trend va idea qidiruvi</span></div>
          </div>
        </div>

        <div class="glass feature-list">
          <div class="feature">
            <h3>Prompt chips</h3>
            <p>Tayyor uslublar bilan tez ishlash: cinematic, neon, realistic, anime, product ad va boshqalar.</p>
          </div>
          <div class="feature">
            <h3>Google research panel</h3>
            <p>Promptga mos reference, trend va tavsiyalarni qidirib chiqaradi.</p>
          </div>
          <div class="feature">
            <h3>Deploy-ready backend</h3>
            <p>Gemini / Veo va Google qidiruv API’lari uchun server route’lar tayyor.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="app-grid">
      <div class="glass panel">
        <div class="panel-head">
          <div>
            <h2>Image Generator</h2>
            <small>Rasm generatsiyasi va Google idea qidiruvi</small>
          </div>
        </div>

        <div class="field">
          <label for="imagePrompt">Image prompt</label>
          <textarea id="imagePrompt" placeholder="Masalan: futuristic cyberpunk car in rainy Tokyo street, cinematic lighting, ultra detailed"></textarea>
        </div>

        <div class="row">
          <div class="field">
            <label for="imageAspect">Aspect ratio</label>
            <select id="imageAspect">
              <option value="1:1">1:1</option>
              <option value="16:9">16:9</option>
              <option value="9:16">9:16</option>
            </select>
          </div>
          <div class="field">
            <label for="searchQuery">Google idea query</label>
            <input id="searchQuery" placeholder="Masalan: cyberpunk car ad references" />
          </div>
        </div>

        <div class="chips" id="imageChips">
          <div class="chip">cinematic portrait</div>
          <div class="chip">anime hero</div>
          <div class="chip">luxury product ad</div>
          <div class="chip">futuristic neon city</div>
          <div class="chip">photorealistic studio light</div>
        </div>

        <div class="actions">
          <button class="btn-primary" id="generateImageBtn">Generate Image</button>
          <button class="btn-secondary" id="searchIdeasBtn">Search Google Ideas</button>
          <button class="btn-secondary" id="clearImageBtn">Clear</button>
        </div>

        <div class="status" id="imageStatus"></div>

        <div class="result-box" id="imageResult">
          <div class="placeholder">Bu yerda generatsiya qilingan rasm ko‘rinadi.</div>
        </div>

        <div class="results" id="searchResults"></div>
      </div>

      <div class="glass panel">
        <div class="panel-head">
          <div>
            <h2>Video Generator</h2>
            <small>Qisqa video prompt va render natijasi</small>
          </div>
        </div>

        <div class="field">
          <label for="videoPrompt">Video prompt</label>
          <textarea id="videoPrompt" placeholder="Masalan: A sleek black sports car drifting through a neon city at night, cinematic camera movement, rain reflections, dramatic lighting"></textarea>
        </div>

        <div class="row">
          <div class="field">
            <label for="videoAspect">Aspect ratio</label>
            <select id="videoAspect">
              <option value="16:9">16:9</option>
              <option value="9:16">9:16</option>
            </select>
          </div>
          <div class="field">
            <label for="videoQuality">Quality</label>
            <select id="videoQuality">
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        </div>

        <div class="chips" id="videoChips">
          <div class="chip">car commercial</div>
          <div class="chip">epic battle scene</div>
          <div class="chip">luxury perfume ad</div>
          <div class="chip">anime intro</div>
          <div class="chip">drone skyline shot</div>
        </div>

        <div class="actions">
          <button class="btn-primary" id="generateVideoBtn">Generate Video</button>
          <button class="btn-secondary" id="clearVideoBtn">Clear</button>
        </div>

        <div class="status" id="videoStatus"></div>

        <div class="result-box" id="videoResult">
          <div class="placeholder">Bu yerda generatsiya qilingan video ko‘rinadi.</div>
        </div>

        <div class="footer-note">
          Video generatsiya rasmga qaraganda sekinroq bo‘lishi mumkin. Server tayyor bo‘lgach, tugma avtomatik render qilib natijani ko‘rsatadi.
        </div>
      </div>
    </section>
  </div>

  <script>
    const $ = (id) => document.getElementById(id);

    const imagePrompt = $('imagePrompt');
    const imageAspect = $('imageAspect');
    const searchQuery = $('searchQuery');
    const imageStatus = $('imageStatus');
    const imageResult = $('imageResult');
    const searchResults = $('searchResults');
    const generateImageBtn = $('generateImageBtn');
    const searchIdeasBtn = $('searchIdeasBtn');
    const clearImageBtn = $('clearImageBtn');

    const videoPrompt = $('videoPrompt');
    const videoAspect = $('videoAspect');
    const videoQuality = $('videoQuality');
    const videoStatus = $('videoStatus');
    const videoResult = $('videoResult');
    const generateVideoBtn = $('generateVideoBtn');
    const clearVideoBtn = $('clearVideoBtn');

    function showStatus(el, type, text) {
      el.className = 'status show ' + type;
      el.textContent = text;
    }

    function hideStatus(el) {
      el.className = 'status';
      el.textContent = '';
    }

    function setLoading(button, loadingText, isLoading) {
      button.disabled = isLoading;
      button.dataset.originalText = button.dataset.originalText || button.textContent;
      button.textContent = isLoading ? loadingText : button.dataset.originalText;
    }

    function setImagePreview(src) {
      imageResult.innerHTML = '<img class="media-preview" src="' + src + '" alt="Generated image" />';
    }

    function setVideoPreview(src) {
      videoResult.innerHTML = '<video class="media-preview" controls playsinline src="' + src + '"></video>';
    }

    function clearImageBox() {
      imageResult.innerHTML = '<div class="placeholder">Bu yerda generatsiya qilingan rasm ko‘rinadi.</div>';
      searchResults.innerHTML = '';
      hideStatus(imageStatus);
    }

    function clearVideoBox() {
      videoResult.innerHTML = '<div class="placeholder">Bu yerda generatsiya qilingan video ko‘rinadi.</div>';
      hideStatus(videoStatus);
    }

    async function generateImage() {
      const prompt = imagePrompt.value.trim();
      if (!prompt) {
        showStatus(imageStatus, 'error', 'Avval image prompt yozing.');
        return;
      }

      setLoading(generateImageBtn, 'Generating...', true);
      showStatus(imageStatus, 'info', 'Rasm generatsiya qilinmoqda...');

      try {
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, aspectRatio: imageAspect.value })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Image generation failed');

        setImagePreview(data.image);
        showStatus(imageStatus, 'success', 'Rasm tayyor bo‘ldi.');
      } catch (error) {
        showStatus(imageStatus, 'error', error.message || 'Xatolik yuz berdi.');
      } finally {
        setLoading(generateImageBtn, 'Generating...', false);
      }
    }

    async function searchGoogleIdeas() {
      const query = (searchQuery.value.trim() || imagePrompt.value.trim());
      if (!query) {
        showStatus(imageStatus, 'error', 'Google qidiruvi uchun query yozing.');
        return;
      }

      setLoading(searchIdeasBtn, 'Searching...', true);
      showStatus(imageStatus, 'info', 'Google orqali ma’lumot olinmoqda...');
      searchResults.innerHTML = '';

      try {
        const res = await fetch('/api/google-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Search failed');

        const items = data.items || [];
        if (!items.length) {
          searchResults.innerHTML = '<div class="search-card"><p>Natija topilmadi.</p></div>';
          showStatus(imageStatus, 'info', 'Natija topilmadi. Boshqa query yozib ko‘ring.');
          return;
        }

        searchResults.innerHTML = items.map(item =>
          '<div class="search-card">' +
            '<div class="meta">' + (item.displayLink || '') + '</div>' +
            '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer">' + item.title + '</a>' +
            '<p>' + (item.snippet || '') + '</p>' +
          '</div>'
        ).join('');

        showStatus(imageStatus, 'success', 'Google natijalari yuklandi.');
      } catch (error) {
        showStatus(imageStatus, 'error', error.message || 'Qidiruvda xatolik yuz berdi.');
      } finally {
        setLoading(searchIdeasBtn, 'Searching...', false);
      }
    }

    async function generateVideo() {
      const prompt = videoPrompt.value.trim();
      if (!prompt) {
        showStatus(videoStatus, 'error', 'Avval video prompt yozing.');
        return;
      }

      setLoading(generateVideoBtn, 'Rendering...', true);
      showStatus(videoStatus, 'info', 'Video generatsiya qilinmoqda. Bu biroz vaqt olishi mumkin...');

      try {
        const res = await fetch('/api/generate-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            aspectRatio: videoAspect.value,
            quality: videoQuality.value
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Video generation failed');

        setVideoPreview(data.videoUrl);
        showStatus(videoStatus, 'success', 'Video tayyor bo‘ldi.');
      } catch (error) {
        showStatus(videoStatus, 'error', error.message || 'Video generatsiyada xatolik yuz berdi.');
      } finally {
        setLoading(generateVideoBtn, 'Rendering...', false);
      }
    }

    function applyChipContainer(container, targetInput, append = false) {
      container.addEventListener('click', (event) => {
        const chip = event.target.closest('.chip');
        if (!chip) return;
        targetInput.value = append && targetInput.value.trim()
          ? targetInput.value.trim() + ', ' + chip.textContent.trim()
          : chip.textContent.trim();
      });
    }

    applyChipContainer($('imageChips'), imagePrompt, true);
    applyChipContainer($('videoChips'), videoPrompt, true);

    generateImageBtn.addEventListener('click', generateImage);
    searchIdeasBtn.addEventListener('click', searchGoogleIdeas);
    clearImageBtn.addEventListener('click', () => {
      imagePrompt.value = '';
      searchQuery.value = '';
      clearImageBox();
    });

    generateVideoBtn.addEventListener('click', generateVideo);
    clearVideoBtn.addEventListener('click', () => {
      videoPrompt.value = '';
      clearVideoBox();
    });
  </script>
</body>
</html>`);
});

app.post('/api/google-search', async (req, res) => {
  try {
    const missing = requireEnv(['GOOGLE_SEARCH_API_KEY', 'GOOGLE_SEARCH_CX']);
    if (missing) return res.status(500).json({ error: missing });

    const query = String(req.body?.query || '').trim();
    if (!query) return res.status(400).json({ error: 'Query is required.' });

    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', process.env.GOOGLE_SEARCH_API_KEY);
    url.searchParams.set('cx', process.env.GOOGLE_SEARCH_CX);
    url.searchParams.set('q', query);
    url.searchParams.set('num', '6');
    url.searchParams.set('safe', 'active');

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'Google search API error.'
      });
    }

    res.json({ items: data.items || [] });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const missing = requireEnv(['GEMINI_API_KEY']);
    if (missing) return res.status(500).json({ error: missing });

    const prompt = String(req.body?.prompt || '').trim();
    const aspectRatio = String(req.body?.aspectRatio || '1:1').trim();

    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: prompt,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio },
        thinkingConfig: {
          thinkingLevel: 'High',
          includeThoughts: false,
        },
      },
    });

    const base64 = extractImageBase64(response);
    if (!base64) {
      return res.status(500).json({ error: 'Image data was not returned by the model.' });
    }

    res.json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Image generation failed.' });
  }
});

app.post('/api/generate-video', async (req, res) => {
  try {
    const missing = requireEnv(['GEMINI_API_KEY']);
    if (missing) return res.status(500).json({ error: missing });

    const prompt = String(req.body?.prompt || '').trim();
    const aspectRatio = String(req.body?.aspectRatio || '16:9').trim();
    const quality = String(req.body?.quality || '720p').trim();

    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-generate-preview',
      prompt,
      config: {
        aspectRatio,
        resolution: quality,
      },
    });

    let attempts = 0;
    const maxAttempts = 36;

    while (!operation.done && attempts < maxAttempts) {
      await wait(10000);
      operation = await ai.operations.getVideosOperation({ operation });
      attempts += 1;
    }

    if (!operation.done) {
      return res.status(504).json({ error: 'Video generation timed out. Try a shorter or simpler prompt.' });
    }

    const videoFile = operation?.response?.generatedVideos?.[0]?.video;
    if (!videoFile) {
      return res.status(500).json({ error: 'Video file was not returned by the model.' });
    }

    const fileName = `video-${Date.now()}.mp4`;
    const downloadPath = path.join(GENERATED_DIR, fileName);

    await ai.files.download({
      file: videoFile,
      downloadPath,
    });

    res.json({ videoUrl: `/generated/${fileName}` });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Video generation failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`AI Media Studio running at http://localhost:${PORT}`);
});
