export interface Employee {
  username: string;
  fullName: string;
  department: string;
  email: string;
  skills: string[];
  currentLevel: string;
  targetLevel: string;
  completedCourses: string[];
  inProgressCourses: string[];
  assessmentScores: Record<string, number>;
  learningPath: LearningPathItem[];
  lastActive: string;
}

export interface LearningPathItem {
  id: string;
  title: string;
  type: 'course' | 'assessment' | 'project';
  estimatedHours: number;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  prerequisite?: string;
  skills: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  skills: string[];
  rating: number;
  enrolledCount: number;
  completionRate: number;
}

export interface Assessment {
  id: string;
  title: string;
  category: string;
  questions: Question[];
  passingScore: number;
  timeLimit: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
}

export const employees: Employee[] = [
  {
    username: "emp1",
    fullName: "Alex Rodriguez",
    department: "Software Development",
    email: "alex.rodriguez@hexaware.com",
    skills: ["JavaScript", "React", "Node.js"],
    currentLevel: "Junior Developer",
    targetLevel: "Senior Developer", 
    completedCourses: ["js-fundamentals", "react-basics"],
    inProgressCourses: ["advanced-react", "node-backend"],
    assessmentScores: {
      "JavaScript": 78,
      "React": 65,
      "Node.js": 45
    },
    learningPath: [
      {
        id: "profile-analysis",
        title: "Profile Analysis Complete",
        type: "assessment",
        estimatedHours: 0.5,
        status: "completed",
        progress: 100,
        skills: ["Assessment"]
      },
      {
        id: "skill-assessment",
        title: "Technical Skills Assessment",
        type: "assessment",
        estimatedHours: 2,
        status: "completed",
        progress: 100,
        skills: ["JavaScript", "React", "Node.js"]
      },
      {
        id: "advanced-react",
        title: "Advanced React Patterns",
        type: "course",
        estimatedHours: 24,
        status: "in-progress",
        progress: 60,
        prerequisite: "react-basics",
        skills: ["React", "JavaScript"]
      },
      {
        id: "node-backend",
        title: "Node.js Backend Development",
        type: "course",
        estimatedHours: 32,
        status: "in-progress",
        progress: 30,
        skills: ["Node.js", "Express", "MongoDB"]
      },
      {
        id: "fullstack-project",
        title: "Full-Stack Application Project",
        type: "project",
        estimatedHours: 40,
        status: "not-started",
        progress: 0,
        prerequisite: "node-backend",
        skills: ["React", "Node.js", "Database Design"]
      },
      {
        id: "senior-dev-assessment",
        title: "Senior Developer Certification",
        type: "assessment",
        estimatedHours: 3,
        status: "not-started",
        progress: 0,
        prerequisite: "fullstack-project",
        skills: ["System Design", "Leadership"]
      }
    ],
    lastActive: "2024-01-15T10:30:00Z"
  },
  {
    username: "emp2",
    fullName: "Emily Davis",
    department: "Software Development",
    email: "emily.davis@hexaware.com", 
    skills: ["Python", "Django", "PostgreSQL"],
    currentLevel: "Mid-level Developer",
    targetLevel: "Senior Developer",
    completedCourses: ["python-basics", "django-fundamentals", "database-design"],
    inProgressCourses: ["advanced-python", "system-design"],
    assessmentScores: {
      "Python": 85,
      "Django": 72,
      "PostgreSQL": 68,
      "System Design": 55
    },
    learningPath: [
      {
        id: "profile-analysis",
        title: "Profile Analysis Complete",
        type: "assessment",
        estimatedHours: 0.5,
        status: "completed",
        progress: 100,
        skills: ["Assessment"]
      },
      {
        id: "skill-assessment",
        title: "Technical Skills Assessment",
        type: "assessment", 
        estimatedHours: 2,
        status: "completed",
        progress: 100,
        skills: ["Python", "Django", "PostgreSQL"]
      },
      {
        id: "advanced-python",
        title: "Advanced Python Programming",
        type: "course",
        estimatedHours: 20,
        status: "in-progress",
        progress: 75,
        skills: ["Python", "Design Patterns"]
      },
      {
        id: "system-design",
        title: "System Design Fundamentals",
        type: "course",
        estimatedHours: 28,
        status: "in-progress",
        progress: 40,
        skills: ["System Design", "Architecture"]
      },
      {
        id: "microservices",
        title: "Microservices Architecture",
        type: "course",
        estimatedHours: 24,
        status: "not-started",
        progress: 0,
        prerequisite: "system-design",
        skills: ["Microservices", "Docker", "Kubernetes"]
      }
    ],
    lastActive: "2024-01-14T14:45:00Z"
  },
  {
    username: "emp3",
    fullName: "James Wilson",
    department: "Software Development",
    email: "james.wilson@hexaware.com",
    skills: ["Java", "Spring Boot", "MySQL"],
    currentLevel: "Junior Developer",
    targetLevel: "Mid-level Developer",
    completedCourses: ["java-basics", "spring-intro"],
    inProgressCourses: ["spring-boot-advanced"],
    assessmentScores: {
      "Java": 70,
      "Spring Boot": 58,
      "MySQL": 62
    },
    learningPath: [
      {
        id: "profile-analysis",
        title: "Profile Analysis Complete",
        type: "assessment",
        estimatedHours: 0.5,
        status: "completed",
        progress: 100,
        skills: ["Assessment"]
      },
      {
        id: "skill-assessment",
        title: "Technical Skills Assessment",
        type: "assessment",
        estimatedHours: 2,
        status: "completed",
        progress: 100,
        skills: ["Java", "Spring Boot", "MySQL"]
      },
      {
        id: "spring-boot-advanced",
        title: "Advanced Spring Boot",
        type: "course",
        estimatedHours: 30,
        status: "in-progress",
        progress: 45,
        skills: ["Spring Boot", "REST APIs", "Security"]
      },
      {
        id: "testing-fundamentals",
        title: "Testing Best Practices",
        type: "course",
        estimatedHours: 16,
        status: "not-started",
        progress: 0,
        skills: ["JUnit", "Integration Testing", "TDD"]
      }
    ],
    lastActive: "2024-01-13T09:15:00Z"
  },
  {
    username: "emp4",
    fullName: "Lisa Wang",
    department: "Data Analytics",
    email: "lisa.wang@hexaware.com",
    skills: ["Python", "SQL", "Tableau", "Machine Learning"],
    currentLevel: "Data Analyst",
    targetLevel: "Senior Data Scientist",
    completedCourses: ["python-data-analysis", "sql-advanced", "tableau-basics"],
    inProgressCourses: ["machine-learning", "deep-learning"],
    assessmentScores: {
      "Python": 88,
      "SQL": 92,
      "Tableau": 75,
      "Machine Learning": 65
    },
    learningPath: [
      {
        id: "profile-analysis",
        title: "Profile Analysis Complete",
        type: "assessment",
        estimatedHours: 0.5,
        status: "completed",
        progress: 100,
        skills: ["Assessment"]
      },
      {
        id: "skill-assessment",
        title: "Data Science Skills Assessment",
        type: "assessment",
        estimatedHours: 2.5,
        status: "completed",
        progress: 100,
        skills: ["Python", "SQL", "Statistics", "ML"]
      },
      {
        id: "machine-learning",
        title: "Machine Learning Fundamentals",
        type: "course",
        estimatedHours: 35,
        status: "in-progress",
        progress: 70,
        skills: ["Machine Learning", "Python", "Scikit-learn"]
      },
      {
        id: "deep-learning",
        title: "Deep Learning with TensorFlow",
        type: "course",
        estimatedHours: 40,
        status: "in-progress",
        progress: 25,
        prerequisite: "machine-learning",
        skills: ["Deep Learning", "TensorFlow", "Neural Networks"]
      },
      {
        id: "data-science-project",
        title: "End-to-End ML Project",
        type: "project",
        estimatedHours: 50,
        status: "not-started",
        progress: 0,
        prerequisite: "deep-learning",
        skills: ["MLOps", "Model Deployment", "Data Pipeline"]
      }
    ],
    lastActive: "2024-01-15T16:20:00Z"
  },
  {
    username: "emp5",
    fullName: "David Kumar",
    department: "Data Analytics",
    email: "david.kumar@hexaware.com",
    skills: ["R", "SQL", "Power BI", "Statistics"],
    currentLevel: "Junior Data Analyst",
    targetLevel: "Data Analyst",
    completedCourses: ["r-programming", "statistics-basics"],
    inProgressCourses: ["advanced-sql", "power-bi-advanced"],
    assessmentScores: {
      "R": 72,
      "SQL": 68,
      "Power BI": 58,
      "Statistics": 75
    },
    learningPath: [
      {
        id: "profile-analysis",
        title: "Profile Analysis Complete",
        type: "assessment",
        estimatedHours: 0.5,
        status: "completed",
        progress: 100,
        skills: ["Assessment"]
      },
      {
        id: "skill-assessment",
        title: "Analytics Skills Assessment",
        type: "assessment",
        estimatedHours: 2,
        status: "completed",
        progress: 100,
        skills: ["R", "SQL", "Statistics"]
      },
      {
        id: "advanced-sql",
        title: "Advanced SQL for Analytics",
        type: "course",
        estimatedHours: 20,
        status: "in-progress",
        progress: 80,
        skills: ["SQL", "Database Optimization", "Data Warehousing"]
      },
      {
        id: "power-bi-advanced",
        title: "Advanced Power BI Development",
        type: "course",
        estimatedHours: 18,
        status: "in-progress",
        progress: 35,
        skills: ["Power BI", "DAX", "Data Modeling"]
      },
      {
        id: "python-intro",
        title: "Python for Data Analysis",
        type: "course",
        estimatedHours: 25,
        status: "not-started",
        progress: 0,
        skills: ["Python", "Pandas", "NumPy"]
      }
    ],
    lastActive: "2024-01-12T11:45:00Z"
  }
];

export const courseCatalog: Course[] = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript programming",
    category: "Programming",
    level: "beginner",
    estimatedHours: 16,
    skills: ["JavaScript", "DOM Manipulation", "ES6+"],
    rating: 4.5,
    enrolledCount: 1250,
    completionRate: 85
  },
  {
    id: "react-basics",
    title: "React.js Basics",
    description: "Introduction to React.js framework and component-based development",
    category: "Frontend",
    level: "beginner",
    estimatedHours: 20,
    skills: ["React", "JSX", "State Management"],
    rating: 4.7,
    enrolledCount: 890,
    completionRate: 78
  },
  {
    id: "advanced-react",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts, hooks, and performance optimization",
    category: "Frontend",
    level: "advanced",
    estimatedHours: 24,
    skills: ["React", "Hooks", "Performance", "Context API"],
    rating: 4.8,
    enrolledCount: 456,
    completionRate: 72
  },
  {
    id: "node-backend",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express",
    category: "Backend",
    level: "intermediate",
    estimatedHours: 32,
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    rating: 4.6,
    enrolledCount: 678,
    completionRate: 68
  },
  {
    id: "python-data-analysis",
    title: "Python for Data Analysis",
    description: "Use Python libraries for data manipulation and analysis",
    category: "Data Science",
    level: "intermediate",
    estimatedHours: 28,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
    rating: 4.9,
    enrolledCount: 734,
    completionRate: 82
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and applications",
    category: "Data Science",
    level: "intermediate",
    estimatedHours: 35,
    skills: ["Machine Learning", "Scikit-learn", "Statistics", "Python"],
    rating: 4.7,
    enrolledCount: 567,
    completionRate: 65
  },
  {
    id: "system-design",
    title: "System Design Fundamentals",
    description: "Learn to design scalable and reliable systems",
    category: "Architecture", 
    level: "advanced",
    estimatedHours: 28,
    skills: ["System Design", "Scalability", "Load Balancing", "Databases"],
    rating: 4.8,
    enrolledCount: 345,
    completionRate: 58
  },
  {
    id: "spring-boot-advanced",
    title: "Advanced Spring Boot",
    description: "Master Spring Boot for enterprise applications",
    category: "Backend",
    level: "intermediate",
    estimatedHours: 30,
    skills: ["Spring Boot", "Security", "Testing", "Microservices"],
    rating: 4.5,
    enrolledCount: 423,
    completionRate: 71
  }
];

export const assessments: Assessment[] = [
  {
    id: "js-assessment",
    title: "JavaScript Skills Assessment",
    category: "Programming",
    passingScore: 70,
    timeLimit: 60,
    questions: [
      {
        id: "js1",
        text: "What is the correct way to declare a variable in modern JavaScript?",
        options: ["var x = 5", "let x = 5", "const x = 5", "Both let and const are correct"],
        correctAnswer: 3,
        difficulty: "easy",
        skill: "JavaScript"
      },
      {
        id: "js2",
        text: "What does the spread operator (...) do in JavaScript?",
        options: [
          "Creates a new array",
          "Spreads array elements",
          "Copies object properties", 
          "Both spreads array elements and copies object properties"
        ],
        correctAnswer: 3,
        difficulty: "medium",
        skill: "JavaScript"
      }
    ]
  },
  {
    id: "react-assessment",
    title: "React.js Skills Assessment",
    category: "Frontend",
    passingScore: 75,
    timeLimit: 45,
    questions: [
      {
        id: "react1",
        text: "What is the purpose of useEffect hook in React?",
        options: [
          "To manage component state",
          "To handle side effects",
          "To render components",
          "To handle events"
        ],
        correctAnswer: 1,
        difficulty: "medium",
        skill: "React"
      },
      {
        id: "react2",
        text: "How do you pass data from parent to child component?",
        options: ["Using state", "Using props", "Using context", "Using refs"],
        correctAnswer: 1,
        difficulty: "easy",
        skill: "React"
      }
    ]
  }
];

// Progress tracking data
export const progressData = {
  departmentProgress: [
    { department: "Software Development", completed: 145, inProgress: 89, notStarted: 34 },
    { department: "Data Analytics", completed: 78, inProgress: 56, notStarted: 23 },
    { department: "DevOps", completed: 34, inProgress: 28, notStarted: 15 },
    { department: "Quality Assurance", completed: 67, inProgress: 45, notStarted: 18 }
  ],
  skillGapAnalysis: [
    { skill: "JavaScript", currentLevel: 65, targetLevel: 85, gap: 20 },
    { skill: "React", currentLevel: 58, targetLevel: 80, gap: 22 },
    { skill: "Python", currentLevel: 72, targetLevel: 90, gap: 18 },
    { skill: "Machine Learning", currentLevel: 45, targetLevel: 75, gap: 30 },
    { skill: "System Design", currentLevel: 35, targetLevel: 70, gap: 35 }
  ],
  monthlyProgress: [
    { month: "Aug", completed: 45, started: 67 },
    { month: "Sep", completed: 62, started: 78 },
    { month: "Oct", completed: 78, started: 89 },
    { month: "Nov", completed: 89, started: 95 },
    { month: "Dec", completed: 102, started: 112 },
    { month: "Jan", completed: 118, started: 125 }
  ]
};