# Architecture Overview

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

This diagram illustrates the core components:

1. **Web Frontend** – Single-page interface built with Tailwind CSS for styling and anime.js for animations.
2. **API Server** – Receives poem submissions, consults cache, and if needed queries Duotrope and an AI service.
3. **Cache/Database** – Persists analysis outcomes so that similar poems don’t trigger full re-analysis.
4. **External Services** – Duotrope for magazine data and an AI provider for style matching and letter generation.
