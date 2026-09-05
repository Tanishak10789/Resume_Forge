# Resume Forge 📄⚡

A modern, full-stack resume builder powered by AI to help job seekers quickly craft, customize, and export clean, ATS-friendly resumes.

---

## 🌟 Key Features

* **AI-Assisted Writing**: Generate and refine professional summaries and work experience bullet points on demand.
* **Pre-Built Resume Templates**:
  * **Classic**: Traditional and clean, ideal for corporate roles.
  * **Modern**: Contemporary layout with dynamic section accents.
  * **Minimal**: Distraction-free, typography-focused structure.
  * **Minimal Image**: Balanced layout with dedicated headshot placement[cite: 1].
* **Live Theme Customization**: Real-time color picker to adjust header and accent tones[cite: 1].
* **Modular Form Builder**: Separate form views for Personal Info, Summary, Experience, Education, Projects, and Skills[cite: 1].
* **Image Hosting**: Profile photo uploads handled via Multer and ImageKit[cite: 1].
* **Authentication & Dashboard**: Secure user registration, JWT login, and a centralized dashboard to manage, edit, and duplicate resumes[cite: 1].
* **Live Preview**: Split-screen editing with dynamic updates before final export[cite: 1].

---

## 🛠️ Tech Stack

* **Front-End**: React 18, Vite, Redux Toolkit, Tailwind CSS, React Router DOM, Axios[cite: 1]
* **Back-End**: Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs[cite: 1]
* **Database**: MongoDB with Mongoose[cite: 1]
* **Third-Party Services**: ImageKit (media storage), AI API integration[cite: 1]

---

## 📂 Project Structure

```text
Resume_Forge-main/
├── client/                     # Front-end React + Vite app[cite: 1]
│   ├── src/
│   │   ├── app/                # Redux store & auth slice[cite: 1]
│   │   ├── components/         # UI forms, resume templates & home sections[cite: 1]
│   │   ├── pages/              # Home, Dashboard, ResumeBuilder, Preview, Login[cite: 1]
│   │   └── configs/            # Axios API config[cite: 1]
│   └── package.json[cite: 1]
├── server/                     # Back-end Express REST API[cite: 1]
│   ├── configs/                # DB, AI, ImageKit, Multer configs[cite: 1]
│   ├── controllers/            # AI, Resume, and User controllers[cite: 1]
│   ├── middlewares/            # JWT auth middleware[cite: 1]
│   ├── models/                 # Mongoose schemas (User, Resume)[cite: 1]
│   ├── routes/                 # API route endpoints[cite: 1]
│   └── package.json[cite: 1]
└── README.md[cite: 1]
