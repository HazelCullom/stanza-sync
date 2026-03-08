# Stanza Sync

**Stanza Sync** is a tool designed to connect poets with the right editors by leveraging AI and the Duotrope database of poetry magazines. It streamlines the process of finding matching publications and crafting tailored submissions, cover letters, and emails.

---

## 🚀 Features

- **Submission Matching** – Analyzes user poems, identifies stylistic similarities, and cross‑references them with Duotrope’s database of poetry magazines.
- **Editor Lookup** – Retrieves an up‑to‑date list of relevant magazines and their editors based on poem style.
- **AI‑Powered Drafts** – Generates a polished, magazine‑specific submission and cover letter that the poet can review and edit.
- **Email Formatting** – Prepares a ready‑to‑send email template addressed to the selected editors.
- **Web Interface with Animations** – Interactive front end powered by `anime.js` and styled with `tailwind.css` for a smooth user experience.
- **Caching Layer** – Stores analysis results from Duotrope queries so subsequent style matches are retrieved quickly without re‑processing every poem.

---

## 🧭 How It Works

1. **Poem Submission** – The poet (user) uploads their poem to Stanza Sync.
2. **Style Analysis** – The AI evaluates the poem’s style and tone.
3. **Database Search** – It queries the Duotrope database to find magazines accepting work that matches the poem’s style.
4. **Editor Matching** – Produces a list of magazines along with editor contact information.
5. **Draft Generation** – Creates a customized cover letter and submission tailored to each publication.
6. **Email Prep** – Formats a professional email that the user can edit and send directly.

---

## ⚙️ Installation

Follow these steps to get the web application running locally. Adjust commands to match your preferred environment.

```bash
# clone the repository
git clone https://github.com/your-org/stanza-sync.git
cd stanza-sync

# install backend dependencies (Node, Python, etc.) and frontend packages
# e.g. npm install or pip install -r requirements.txt

# build frontend assets (tailwind/webpack or similar)
# npm run build

# set environment variables for DUOTROPE_API_KEY and AI_SERVICE_KEY
``` 

> **Note:** You'll need access to the Duotrope API and an AI service for style analysis and letter generation. A local database or cache (e.g. SQLite, Redis, Postgres) should be configured to persist analysis results.

---

## 📄 Usage

1. **Start the backend server:**
   ```bash
   # e.g. npm start or python app.py
   ```
2. **Launch frontend:**
   ```bash
   # serve static files or start dev server (e.g. npm run dev)
   ```
3. Open your browser and navigate to `http://localhost:3000` (or configured port).
4. Upload or paste your poem using the web form.
5. Watch animations and feedback powered by `anime.js`.
6. Review suggested magazines and editors pulled from cached Duotrope data.
7. Edit or approve the generated submission, cover letter, and email.
8. Send the email to the chosen editor(s) or export the draft.

---

## 💡 Tips for Poets

- Provide as much context or background about your poem as possible to improve AI matching accuracy.
- Consider editing the generated cover letter to reflect your personal voice.
- Double‑check editor contact details before sending.

---

## 📐 Architecture

Below is a high-level view of how the web application is structured. (Full diagram in [ARCHITECTURE.md](ARCHITECTURE.md)).

```mermaid
flowchart LR
  subgraph UI
    user[(Poet / User)] -->|enters poem| web[Web Frontend<br/>(Tailwind + anime.js)]
  end

  subgraph Backend
    web --> api[API Server<br/>(Node/Express)]
    api --> cache[(Cache / Database<br/>SQLite / Redis)]
    api --> duotrope[(Duotrope API)]
    api --> ai[(AI Service<br/>Style Analysis & Drafting)]
  end

  duotrope --> api
  ai --> api

  note right of cache
    - store poem hashes
    - store previous analysis results
    - speed up repeat lookups
  end
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) or submit a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

*Happy submitting!* ✍️
