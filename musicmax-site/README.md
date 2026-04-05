# PulseBox Music Website

PulseBox — modern, hosting-ready static music website.

## Included
- 320-track catalog
- Modern UI inspired by premium music platforms
- Search, genre filter, sorting
- Trending, New Drops, Favorites, Recent, Playlists
- Bottom music player with seek + volume
- Dark / light mode
- LocalStorage-based favorites and playlists
- 100% static files: `index.html`, `style.css`, `app.js`

## Important note about music
This project is deploy-ready and playable out of the box using public sample/demo audio links.
The 320 tracks are a generated catalog for design/demo purposes.
If you want a real production music platform, replace the demo URLs in `app.js` with your own audio library or licensed/royalty-free tracks.

## Deploy
### GitHub Pages
1. Upload all files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Source: **Deploy from branch**.
4. Branch: `main` and folder: `/root`.
5. Save.

### Netlify
1. Go to Netlify.
2. Drag and drop the whole folder.
3. Site goes live instantly.

### Vercel
1. Import the folder/repository.
2. Framework preset: **Other**.
3. Deploy.

## Customize
- Change track data in `app.js`
- Replace sample audio links in `sampleAudioSources`
- Edit colors in `style.css`
- Change branding text in `index.html`
