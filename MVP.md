# Duo Project – Git Contribution Guide

## 📌 Branching Structure

We are using a **feature-branch workflow** to keep development organized:
- `main` – stable production branch
- `dev` – collective development branch
- `feature/<component-name>` – individual feature branches per component

---

## 🧑‍💻 **Team Assignments**

| Team Member | Task Focus | Branch Name Example |
|--------------|------------|----------------------|
| **Griffin** | Tasks.jsx | `feature/tasks-griffin` |
| **Fletcher** | CompletedTasks.jsx | `feature/completed-fletcher` |
| **You (Team Lead)** | Header components (mobile & desktop), Dashboard, Main | `feature/header-dashboard-lead` |

---

## 🚀 **Workflow Steps (VS Code Terminal)**

### 1️⃣ Clone the Repository
```bash
git clone <repo-url>
cd CFG

```

2️⃣ Setup Development Branch

```bash

git checkout -b dev
git push -u origin dev

```

3️⃣ Create Feature Branch (Example: Griffin)

```bash

git checkout dev
git pull origin dev
git checkout -b feature/tasks-griffin
git push -u origin feature/tasks-griffin

```
4️⃣ Daily Workflow

```bash

git checkout feature/tasks-griffin
git pull origin dev

```

5️⃣ Stage, Commit & Push

```bash

git add .
git commit -m "Add: initial Tasks component UI"
git push

```

6️⃣ Merging to dev

```bash

git checkout dev
git pull origin dev
git merge feature/tasks-griffin
git push

```

7️⃣ Merging to main (By Team Lead Only)

```bash

git checkout main
git pull origin main
git merge dev
git push

```

## Project File Structure

Frontend/
├── node_modules/           # Project dependencies
├── public/                 # Public static files (e.g., favicon, index.html base template)
├── src/                    # Source code for the React app
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/ 
│   │   │   ── Analytics.jsx # Analytics dashboard
│   │   │   ── CompletedTasks.jsx # Achievement view
│   ├── services/           # API service calls or utilities (e.g., api.js)
│   ├── App.css             # Main CSS styling
│   ├── App.jsx             # Root React component
│   ├── index.css           # Global CSS styles
│   ├── main.jsx            # React DOM rendering entry point
├── .gitignore              # Files and folders Git should ignore
├── eslint.config.js        # Linting configuration
├── index.html              # HTML template for Vite
├── package-lock.json       # Lock file for npm dependencies
├── package.json            # Project metadata and dependencies
├── README.md               # Project overview and instructions
├── vite.config.js          # Vite configuration file
├── env                     # Environment variables file
├── MVP.md                  # Minimum Viable Product
├── .env                    # Environment variables for the project