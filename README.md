# Cybersecurity Portfolio

A dark, hacker-themed personal portfolio website for cybersecurity students and professionals.

## 🚀 Quick Start

1. Open `index.html` in a browser (or use a local server)
2. All content loads from JSON files in the `data/` folder

## 📝 How to Update Content

All content is stored in simple JSON files. Edit them with any text editor — no coding needed!

### Update Your Profile
Edit `data/profile.json`:
- `name` — Your name
- `title` — Your title/role
- `taglines` — Rotating text on the home page
- `intro` — Short intro paragraph
- `bio` — About me text
- `social` — GitHub, LinkedIn, email, Twitter URLs
- `resumeFile` — Path to your resume PDF

### Add/Edit Projects
Edit `data/projects.json` — add a new object to the `projects` array:
```json
{
  "title": "Project Name",
  "description": "What it does",
  "technologies": ["Python", "Flask"],
  "github": "https://github.com/you/repo"
}
```

### Add/Edit Skills
Edit `data/skills.json` — add skills to existing categories or add new categories.

### Add/Edit Certificates
Edit `data/certificates.json` — add a new object to the `certificates` array.

### Update Experience
Edit `data/experience.json` — add entries to the `timeline` array.

### Update Resume
Replace `assets/resume.pdf` with your current resume.

### Update Profile Photo
Add your photo as `assets/images/profile.jpg` and set `"profileImage": "assets/images/profile.jpg"` in `data/profile.json`.

## 🌐 Deploy

### GitHub Pages
1. Push to a GitHub repo
2. Go to Settings → Pages → Source: main branch
3. Your site is live!

### Netlify
1. Drag and drop the folder to [netlify.com/drop](https://app.netlify.com/drop)

## 📁 File Structure
```
├── index.html          # Main page
├── style.css           # Styles
├── script.js           # JavaScript
├── data/               # ← Edit these to update content
│   ├── profile.json
│   ├── skills.json
│   ├── projects.json
│   ├── certificates.json
│   └── experience.json
└── assets/
    ├── images/         # Profile photo, cert images
    └── resume.pdf      # Your resume
```
