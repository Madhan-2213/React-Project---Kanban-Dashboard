# React Kanban Dashboard

> A modern, interactive Kanban board application built with React, featuring drag-and-drop functionality, user authentication, and comprehensive project management tools.

## 🚀 Features

### 📋 Task Management
- **Drag & Drop Interface**: Seamlessly move tasks between columns (New, In Progress, Review, Completed)
- **Task Creation**: Add new tasks with title, description, due date/time, and file attachments
- **Task Editing**: Modify existing tasks with an intuitive modal interface
- **Priority System**: Assign priority levels (Low, Medium, High) with color-coded indicators
- **Task Pinning**: Pin important tasks to the top of columns
- **File Attachments**: Attach and manage files for each task
- **Search Functionality**: Global search across all tasks with auto-scroll to results

### 👥 User Management
- **Multi-user Support**: Individual dashboards for different users
- **Authentication System**: Complete sign-up/sign-in flow with role selection
- **User Roles**: Support for Admin and regular User roles
- **Email Verification**: OTP-based email verification system
- **Password Reset**: Secure password reset functionality

### 🎨 Modern Interface
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Clean UI**: Modern interface built with Tailwind CSS
- **Interactive Components**: Smooth animations and hover effects
- **Visual Feedback**: Task highlighting, completion animations, and status indicators

### 📊 Additional Features
- **Reports Dashboard**: View task analytics and progress reports
- **Meeting Management**: Schedule and manage team meetings
- **Communication Tools**: Built-in communication features
- **Settings Panel**: Customizable user preferences
- **Real-time Updates**: Live synchronization across user sessions

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS 3.2.7** - Utility-first CSS framework for styling
- **React Icons** - Comprehensive icon library

### Drag & Drop
- **@hello-pangea/dnd 18.0.1** - Modern drag-and-drop library (successor to react-beautiful-dnd)
- **react-beautiful-dnd 13.1.1** - Additional drag-and-drop support

### Backend & Services
- **Firebase 10.13.1** - Authentication, database, and hosting
- **Socket.io Client** - Real-time communication
- **Simple Peer** - WebRTC peer-to-peer connections

### Utilities
- **html2canvas** - Screenshot and export functionality
- **Recharts** - Data visualization and charts
- **Local Storage** - Client-side data persistence

## 🏗️ Project Structure

```
src/
├── App.js                  # Main application component and routing
├── Dashboard.jsx           # Main Kanban dashboard with drag-drop
├── Home.jsx               # Landing page component
├── Login.jsx              # Login interface
├── SignUpAsAdmin.jsx      # Admin registration
├── SignUpUser.jsx         # User registration
├── OtpVerification.jsx    # Email verification
├── ResetPassword.jsx      # Password reset functionality
├── Navbar.jsx             # Navigation component
├── BackHeader.jsx         # Header with back navigation
├── Communication1.jsx     # Communication features
├── Meetings.jsx           # Meeting management
├── Report.jsx             # Analytics and reports
├── Settings.jsx           # User settings
├── ViewerDashboard.jsx    # Read-only dashboard view
├── firebase.js            # Firebase configuration
├── assest/                # Static assets and images
├── App.css               # Application-specific styles
└── index.css             # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Madhan-2213/React-Project---Kanban-Dashboard.git
   cd React-Project---Kanban-Dashboard
   ```

2. **Navigate to the project directory**
   ```bash
   cd "react-tailwind2 (2)/react-tailwind2/react-tailwind-css-starter-pack-main"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
```

The build folder will contain the optimized production build.

## 📱 Usage

### Getting Started
1. **Sign Up**: Create an account as either Admin or User
2. **Verify Email**: Complete the OTP verification process
3. **Login**: Access your personalized dashboard
4. **Create Tasks**: Add new tasks to the "New" column
5. **Manage Tasks**: Drag tasks between columns, edit details, set priorities
6. **Track Progress**: Monitor task completion and generate reports

### Key Workflows

#### Task Management
- Click the "+" icon in any column to add a new task
- Fill in task details: title, description, due date, priority, and attachments
- Drag tasks between columns to update their status
- Use the pin feature to highlight important tasks
- Mark tasks as completed using the checkmark icon

#### Search and Navigation
- Use the global search in the navbar to find specific tasks
- Search results automatically scroll to and highlight matching tasks
- Navigate between different sections using the sidebar menu

#### User Management
- Admins can manage user accounts and permissions
- Users have individual task boards with data isolation
- All data is automatically saved to local storage and Firebase

## 🤝 Contributing

We welcome contributions to improve the React Kanban Dashboard! Here's how you can contribute:

### Getting Started
1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine
3. **Create a feature branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure components are responsive and accessible
- Write clean, commented code
- Test your changes thoroughly

### Submitting Changes
1. **Commit your changes** with descriptive messages
   ```bash
   git commit -m "Add: New feature description"
   ```
2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
3. **Create a Pull Request** on GitHub
   - Provide a clear description of your changes
   - Include screenshots for UI changes
   - Reference any related issues

### Areas for Contribution
- 🐛 Bug fixes and performance improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage expansion
- 🌐 Internationalization support

### Code Style
- Use functional components with hooks
- Follow ESLint configuration
- Use descriptive variable and function names
- Keep components small and focused
- Implement proper error handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Drag-and-drop functionality powered by [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Backend services by [Firebase](https://firebase.google.com/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Madhan-2213/React-Project---Kanban-Dashboard/issues) page
2. Create a new issue with detailed information
3. Reach out to the maintainers

---

**Made with ❤️ by [Madhan-2213](https://github.com/Madhan-2213)**
