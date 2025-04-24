# Portfolio 2024

A modern, multilingual portfolio website built with React, TypeScript, and Firebase, featuring blog management, project showcases, and multiple language support.

## 🌟 Features

- **Multilingual Support**: English, French, and Vietnamese translations
- **Responsive Design**: Fully responsive layout for all devices
- **Blog Management System**: Create, edit, and delete blog posts with rich content editing
- **Project Showcase**: Display projects with details like role, duration, and description
- **Authentication**: Secure admin area for content management
- **Dynamic Content**: Fetch and display content from Firebase
- **Theme Support**: Light and dark theme options

## 🔧 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: SCSS Modules
- **Database & Hosting**: Firebase (Firestore, Authentication, Hosting)
- **Internationalization**: i18next
- **Content**: Markdown editor for rich content
- **Animation**: AOS (Animate On Scroll)

## 📂 Project Structure

```
portfolio2024/
├── src/
│   ├── assets/          # Static assets, images, etc.
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files (Firebase, i18n)
│   ├── contexts/        # React contexts (Theme, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   │   ├── main/        # Main portfolio sections
│   │   ├── blog/        # Blog viewer page
│   │   └── blogAdmin/   # Admin interface for blog management
│   ├── services/        # API and service functions
│   ├── styles/          # Global styles
│   ├── translations/    # i18n translation files
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .env.development     # Environment variables for development
├── .env.production      # Environment variables for production
├── firebase.json        # Firebase configuration
└── package.json         # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio2024.git
   cd portfolio2024
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure Firebase
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
   - Set up Authentication, Firestore, and Hosting
   - Copy your Firebase configuration to `.env.development` and `.env.production`:

   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Deploying to Firebase

```bash
npm run deploy
# or
yarn deploy
```

## 📝 Blog Management

The admin interface at `/admin` allows you to:
- Create blog posts with different types (Project, Association, Art, Sport)
- Upload images for blog posts
- Edit content in multiple languages
- Set priorities for display order
- Manage publication dates

## 🌐 Sections

- **Home**: Introduction and quick links
- **About**: Personal information and strengths
- **Services**: Services offered
- **Skills**: Technical and personal skills
- **Education**: Educational background
- **Projects**: Showcase of personal and professional projects
- **Activities**: Extracurricular activities including associations, arts, and sports
- **Contact**: Contact form and information

## 🔒 Security

Environment variables, Firebase credentials, and other sensitive information are excluded from version control through .gitignore. Make sure to properly configure environment variables for your deployment environments.