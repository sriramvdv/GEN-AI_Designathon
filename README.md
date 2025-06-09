# Hexaware Learning Platform - Personalized Skill Development System

A comprehensive frontend-only web application built with React.js that simulates a Personalized Learning & Skill-Gap Analysis system for Hexaware Technologies. The platform features role-based dashboards, AI-powered learning agents, and complete learning management capabilities.

## 🚀 Features

### 🔐 Authentication & Role-Based Access
- **Multi-role login system** with hardcoded credentials
- **Role-based navigation** and dashboard access
- **Secure route protection** with automatic redirects
- **Persistent login sessions** using localStorage

### 👥 User Roles & Dashboards

#### 🔴 Admin Portal
- **System Overview**: Monitor platform performance and user analytics
- **Agent Status Monitoring**: Real-time status of AI learning agents
- **User Management**: Search, filter, and manage all platform users
- **Team Hierarchy**: Visual organization chart with manager-employee relationships
- **Department Analytics**: Progress tracking across different departments
- **Skill Gap Analysis**: Identify organization-wide learning needs
- **Learning Activity Trends**: Historical data and progress visualization

#### 🟢 Manager Portal  
- **Team Performance Dashboard**: Monitor direct reports' learning progress
- **Individual Progress Tracking**: Detailed view of each team member's journey
- **Quick Actions**: 
  - Trigger team assessments
  - Generate progress reports
  - Set learning goals and deadlines
  - Send reminders and schedule 1:1 meetings
- **Risk Assessment**: Identify team members who need attention
- **Team Analytics**: Progress distribution and achievement tracking

#### 🔵 Learner Portal (Common for all roles)
- **Personalized Learning Journey**: Stage-based progress visualization
- **Complete Learning Path**: Detailed view of all assigned courses and assessments
- **AI-Powered Recommendations**: Personalized course suggestions based on skill gaps
- **Interactive Assessments**: Adaptive testing with real-time difficulty adjustment
- **Progress Tracking**: Comprehensive analytics and learning insights
- **Team Collaboration**: View team members and organizational structure

### 🤖 AI Learning Agents (Simulated)

#### 📊 Profile Agent
- Analyzes employee data and skill vectors
- Generates comprehensive profile summaries
- Market demand analysis for skills
- Career progression recommendations

#### 🎯 Assessment Agent
- Adaptive questioning based on skill gaps
- Real-time difficulty adjustment
- Comprehensive skill evaluation
- Performance analytics and scoring

#### 💡 Recommender Agent
- AI-powered course recommendations
- Personalized learning paths
- Skill gap prioritization
- Market relevance scoring

#### 📈 Tracker Agent
- Learning progress monitoring
- Plateau detection and intervention
- Performance analytics
- Achievement tracking and insights

### 🎨 Design & User Experience
- **Modern, Professional Interface** with Hexaware branding
- **Responsive Design** optimized for desktop and mobile
- **Smooth Animations** and micro-interactions
- **Consistent Design System** with 8px spacing grid
- **Accessible Color Palette** with proper contrast ratios
- **Interactive Data Visualizations** using Recharts

### 📊 Data Management
- **Frontend-only Architecture** with no backend dependencies
- **Mock Data System** with realistic employee and course information
- **Local State Management** using React Context API
- **Persistent Storage** with localStorage for user sessions
- **Real-time Updates** and dynamic content rendering

## 🛠️ Technology Stack

- **Frontend Framework**: React.js 18+ with TypeScript
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icon library
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint with TypeScript support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hexaware-learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Admin** | admin1 | admin123 | Admin Portal + Learner Portal |
| **Manager** | manager1 | manager123 | Manager Portal + Learner Portal |
| **Manager** | manager2 | manager123 | Manager Portal + Learner Portal |
| **Employee** | emp1 | emp123 | Learner Portal Only |
| **Employee** | emp2 | emp123 | Learner Portal Only |
| **Employee** | emp3 | emp123 | Learner Portal Only |
| **Employee** | emp4 | emp123 | Learner Portal Only |
| **Employee** | emp5 | emp123 | Learner Portal Only |

## 📁 Project Structure

```
src/
├── components/
│   ├── agents/                 # AI Learning Agents
│   │   ├── ProfileAgent.tsx
│   │   ├── AssessmentAgent.tsx
│   │   ├── RecommenderAgent.tsx
│   │   └── TrackerAgent.tsx
│   ├── AdminDashboard.tsx      # Admin portal interface
│   ├── ManagerDashboard.tsx    # Manager portal interface
│   ├── LearnerDashboard.tsx    # Learner portal interface
│   ├── Login.tsx               # Authentication interface
│   ├── Navigation.tsx          # Multi-portal navigation
│   ├── PrivateRoute.tsx        # Route protection
│   ├── ProgressBar.tsx         # Progress visualization
│   ├── TeamHierarchy.tsx       # Organization chart
│   ├── LearningPathView.tsx    # Complete learning path
│   ├── AssessmentList.tsx      # Assessment management
│   └── TeamMembersView.tsx     # Team collaboration
├── contexts/
│   └── AuthContext.tsx         # Authentication state
├── data/
│   └── mockData.ts             # Simulated database
├── App.tsx                     # Main application
└── main.tsx                    # Application entry point
```

## 🎯 Key Features Breakdown

### Learning Management
- **Adaptive Learning Paths**: Personalized course sequences based on skill gaps
- **Progress Tracking**: Real-time monitoring of learning activities
- **Assessment System**: Interactive quizzes with adaptive difficulty
- **Skill Gap Analysis**: AI-powered identification of learning needs

### Team Management
- **Hierarchical Organization**: Manager-employee relationship mapping
- **Team Performance**: Aggregate progress tracking and analytics
- **Individual Monitoring**: Detailed employee progress views
- **Communication Tools**: Reminders, meetings, and goal setting

### Analytics & Reporting
- **Real-time Dashboards**: Live data visualization and metrics
- **Progress Analytics**: Historical trends and performance insights
- **Risk Assessment**: Early identification of learning challenges
- **Achievement Tracking**: Milestone and completion monitoring

### User Experience
- **Role-based Navigation**: Contextual interface based on user permissions
- **Responsive Design**: Optimized for all device sizes
- **Interactive Elements**: Engaging animations and micro-interactions
- **Accessibility**: WCAG-compliant design with proper contrast and navigation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

### Code Quality
- **TypeScript**: Full type safety and IntelliSense support
- **ESLint**: Automated code quality and style checking
- **Component Architecture**: Modular, reusable component design
- **Clean Code**: Well-documented and maintainable codebase

## 🚀 Deployment

The application can be deployed to any static hosting service:

### Netlify
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### GitHub Pages
```bash
npm run build
# Deploy the 'dist' folder to GitHub Pages
```

## 📈 Future Enhancements

- **Real Backend Integration**: Connect to actual learning management systems
- **Advanced Analytics**: Machine learning-powered insights and predictions
- **Mobile Application**: Native iOS and Android applications
- **Integration APIs**: Connect with HR systems and external learning platforms
- **Advanced Reporting**: Comprehensive analytics and custom report generation
- **Gamification**: Badges, leaderboards, and achievement systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Hexaware Technologies** for the project inspiration
- **React Community** for excellent documentation and tools
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library
- **Recharts** for powerful data visualization components

---

**Built with ❤️ for Hexaware Technologies Learning & Development**