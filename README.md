# 🏥 GS Clinic — Premium Healthcare Website (Agra)

A modern, fully responsive, production-ready single-page website for **GS Clinic**, located in Agra, Uttar Pradesh, India. Built with clean HTML, CSS, and vanilla JavaScript featuring a premium medical UI, smooth animations, glassmorphism cards, and an AI clinic assistant chatbot.

![Status](https://img.shields.io/badge/status-production--ready-success) ![Made with](https://img.shields.io/badge/made%20with-HTML%20%7C%20CSS%20%7C%20JS-blue)

---

## ✨ Features

- 🎬 **Loading animation** with branded pulse loader
- 🧭 **Sticky navbar** with scroll effect, active link highlighting & **mobile menu**
- 🌊 **Animated hero section** with floating blobs, glass cards & animated counters
- ℹ️ **About clinic** section with image collage and highlights
- 👨‍⚕️ **Doctor profile** card with social links and stats
- 🩺 **Services grid** (8 services) with hover effects
- 💡 **Health tips** cards
- 📅 **Appointment booking form** with validation & success message
- 🤖 **Floating AI Clinic Assistant chatbot** ("GS Clinic AI Assistant") — answers timing, location, services, appointment, doctor availability & emergency questions
- 🗺️ **Google Map** of Agra (embedded)
- ⭐ **Patient reviews** section
- 🖼️ **Gallery** with hover zoom
- ❓ **FAQ accordion**
- 💬 **WhatsApp button** + 📞 **Call now button** (floating)
- ⬆️ **Back to top** button & **scroll progress bar**
- 📱 Fully **responsive** (mobile, tablet, desktop)
- 🎨 Modern medical theme — gradients, glassmorphism, smooth animations & hover effects

---

## 📁 File Structure

```
gs-clinic/
├── index.html      # Page structure & content
├── style.css       # All styling (theme, layout, animations, responsive)
├── script.js       # All interactivity (navbar, chatbot, form, animations)
└── README.md       # Documentation
```

---

## 🚀 How to Run

1. **Download / clone** the project files into one folder.
2. Make sure `index.html`, `style.css`, and `script.js` are in the **same directory**.
3. Open `index.html` in any modern web browser.

> 💡 For best results (and so the chatbot/map work smoothly), you can run a local server:
> ```bash
> # Python 3
> python -m http.server 8000
> # then visit http://localhost:8000
> ```

No build tools, frameworks, or installations required. Icons load from Font Awesome CDN and fonts from Google Fonts (internet connection needed for these).

---

## 🛠️ Customization Guide

### Clinic details (phone, email, address)
- Open `index.html` and search for the placeholders:
  - Phone/WhatsApp: `+91 98765 43210` (also in `tel:` and `wa.me/` links)
  - Email: `contact@gsclinic.in`
  - Location text: "Agra, Uttar Pradesh, India"
- Update the same values inside `script.js` (chatbot replies) so the AI assistant stays accurate.

### Colors & theme
- Open `style.css` and edit the variables in `:root`:
  ```css
  --primary:#0ea5a4;
  --secondary:#2563eb;
  --grad:linear-gradient(135deg,#0ea5a4 0%,#2563eb 100%);
  ```

### Images
- Replace the Unsplash image URLs in `index.html` (hero, about, doctor, gallery, tips) with your own clinic photos.

### Google Map
- In `index.html`, find the `<iframe>` in the **Map** section and replace the `src` query with your exact clinic address or Google Maps embed link.

### Services / Reviews / FAQ
- These are simple repeating HTML blocks in `index.html` — copy, paste, and edit to add or remove items.

### Chatbot answers
- Edit the `getBotReply()` function in `script.js`. Each `if` block matches keywords (regex) and returns a reply. Add new conditions for more topics.

---

## 🌐 Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `gs-clinic`).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` (or push via Git):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GS Clinic website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gs-clinic.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
6. Wait a minute — your site will be live at:
   ```
   https://<your-username>.github.io/gs-clinic/
   ```

---

## 📄 License

Free to use and customize for your clinic or learning purposes.

---

Made with ❤️ for better health — **GS Clinic, Agra**.
