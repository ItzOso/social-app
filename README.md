# SocialConnect 🤝📸

SocialConnect is a simple, functional social media app built as a practice project to explore core features like authentication, posting, commenting, liking, and user profiles. Users can log in, create posts, follow others, and interact with content through a clean interface.

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password)
- 🏠 Home feed showing posts from users you follow
- 🔍 Explore page showing posts from users you don't follow
- ❤️ Like and 💬 comment on posts
- 👤 View and follow/unfollow other users
- 🛠️ Edit your profile (profile picture + bio)
- 📝 Create and view posts in real-time

---

## 🧰 Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router
- **Backend/Services:** Firebase (Auth, Firestore)

---

## ⚙️ Getting Started

To run SocialConnect locally:

```bash
# Clone the repository
git clone https://github.com/your-username/smartnotesai.git
cd smartnotesai

# Install dependencies
npm install

# Start the development server
npm run dev
```

# 🔑 Environment Variables
Create a `.env` file in the root directory and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENAI_API_KEY=your_openai_key  # Only if used on client side
```

# 📝 Notes
This project was created to practice building core social media functionality, including user accounts, feeds, and post interaction features. While it is not optimized for production or scalability, it helped me understand how to structure and manage user-generated content using Firebase.

# 📌 Future Improvements(not planned)
- Pagination or lazy loading for posts and users
- Notifications or messaging system
- Better scalability and performance optimization
