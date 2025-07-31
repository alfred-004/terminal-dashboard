
# 🖥️ admybrand.com — Terminal Dashboard

A fully responsive **terminal-style web dashboard** built with a nostalgic aesthetic and modern interactive features. Navigate your admin analytics, messages, and alerts using shell-like commands inside a sleek black & pink terminal interface.

> Live Demo: [https://admybrand-dashboard-xi.vercel.app/](https://admybrand.com)

---

## 🧑‍💻 Terminal UI Features

```
Welcome to Terminal Dashboard
Type 'help' to see available commands
Use 'cd dashboard', 'cd msg', or 'cd important' to access different sections
▲ arch_004:~/dashboard$ help

Available commands:
  help         - Show this help message
  clear        - Clear terminal screen
  cd dashboard - Access admin dashboard & analytics
  cd msg       - Open messages and communications
  cd important - View critical alerts and notifications
  ls           - List available sections
  whoami       - Display current user
  pwd          - Show current directory
  neofetch     - Display system information
  exit         - Exit terminal
```

---

## ✨ Key Features

### 💻 Terminal Simulation

* Prompt: `arch_004@admybrand:~$`
* Interactive command input with simulated output
* Mobile-optimized terminal experience
* Animated output for commands

### 📊 `cd dashboard` — Admin Analytics

* Metric Cards: Revenue, Users, Conversions, Growth %
* Interactive Charts:

  * Line Chart (Revenue over time)
  * Bar Chart (User growth)
  * Donut Chart (Conversion sources)

### 💬 `cd msg` — Messages & Logs

* Shows mock communications
* Styled like terminal logs

### ⚠️ `cd important` — Critical Alerts

* Displays simulated security/alert messages
* Terminal warning formatting

### 🧠 Extras

* `neofetch`: Shows fake system info (user, OS, browser)
* `ls`, `whoami`, `pwd`, `exit`, `clear`: Shell-like behavior

---

## 🔧 Tech Stack

* **Frontend**: HTML, TailwindCSS, JavaScript / TypeScript
* **Build Tools**: [Bun](https://bun.sh) and [Vite](https://vitejs.dev)
* **UI Theme**: Catppuccin / Oxocarbon Black with Rich Pink
* **Charts**: Chart.js or Recharts
* **Terminal Simulation**: Custom command parser & renderer
* **Responsive Design**: Desktop, Tablet & Mobile support

---

## ✅ Getting Started

### 📦 Installation

```bash
git clone https://github.com/your-username/admybrand-terminal-dashboard.git
cd admybrand-terminal-dashboard
bun install
bun dev
```

> Requires Bun runtime: [Install Bun](https://bun.sh/docs/installation)

### 🔨 Build for Production

```bash
bun run build
```

---
