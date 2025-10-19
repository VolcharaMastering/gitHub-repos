# GitHub Repositories Administration

A small test project implementing an **administration panel for GitHub repositories**.  
The goal was to create a lightweight and secure interface for managing repositories via the GitHub API.

---

## Overview

On the start page (`/`), the user can enter a **GitHub username** and a **personal access token** (generated in:  
`Settings → Developer settings → Personal access tokens`).

After pressing the **Save** button:

- If the credentials are valid, the user is redirected to the `/repositories` page.
- The credentials are stored in **Zustand / React in-memory state** (not persisted for safety).
- The token is erased after a page reload or app restart.

---

## Repositories Page

After successful authentication, the `/repositories` page displays a **table of repositories** for the specified account.

Each repository entry shows:

- Name and description
- SSH and HTTPS clone URLs (copyable via button)
- Last updated date
- Visibility (public/private)
- Action buttons: **Edit** and **Delete**

At the top of the page, there is a **“New repository”** button.  
Creating a repo requires filling in its **name**, **description**, and **visibility**.

Editing allows changing **description** or **visibility**.  
Deleting a repository opens a confirmation dialog before performing the action.

Repositories can be **sorted** by:

- Name
- Updated At
- Visibility

Sorting is toggled by clicking the corresponding table header (ascending / descending).

All API or frontend errors are handled by the **Error Handler** and displayed via a popup message.

---

## Project Structure

```
src/
│
├── assets/           # Icons and images
├── components/       # UI and logic components
│   └── PopupForms/   # Forms used inside popup components
├── config/           # System configurations (currently axios instance)
├── routes/           # Application routes and layout
│   ├── Root/         # Root layout with Error, Popup, and Loader
│   ├── AdminPage/    # Settings page (credentials input)
│   ├── Repositories/ # Repositories management page
│   └── NotFound/     # 404 page
├── store/            # Zustand store files
├── styles/           # Global SCSS constants and mixins
├── types/            # Global TypeScript types (e.g., Repository)
├── UI/               # UI elements (InputElement, CustomButton, Popup, etc.)
├── utils/            # Helpers: API calls, validation, utilities
│
├── main.tsx          # App entry point
└── index.scss        # Global styles
```

---

## Technologies Used

- **React.js**
- **TypeScript**
- **SCSS**
- **Zustand**
- **Zod**
- **Axios**
- **Vite**
- **GitHub REST API**
- **full-form-control** — custom NPM library (form control for React + TS)

---

## Future Plans

- Add responsive layout (flexible/adaptive design)
- Integrate embedded code editor (IDE-like view)
- Add OAuth-based GitHub authorization for improved security
