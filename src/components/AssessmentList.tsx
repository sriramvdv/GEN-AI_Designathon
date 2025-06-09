import React, { useState } from 'react';
import { AssessmentAgent } from './agents/AssessmentAgent';
import { 
  Target, 
  Clock, 
  CheckCircle, 
  PlayCircle,
  Award,
  BookOpen
} from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
}

interface AssessmentListProps {
  onBack?: () => void;
  startSpecificAssessment?: string;
}

export function AssessmentList({ onBack, startSpecificAssessment }: AssessmentListProps) {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(startSpecificAssessment || null);

  const assessments: Assessment[] = [
    {
      id: 'js-fundamentals',
      title: 'JavaScript Fundamentals Assessment',
      description: 'Test your knowledge of core JavaScript concepts, ES6+ features, and modern programming practices.',
      category: 'Programming',
      estimatedTime: 45,
      difficulty: 'medium',
      skills: ['JavaScript', 'ES6+', 'DOM Manipulation'],
      status: 'completed',
      score: 85
    },
    {
      id: 'react-advanced',
      title: 'Advanced React Patterns',
      description: 'Evaluate your understanding of advanced React concepts, hooks, context, and performance optimization.',
      category: 'Frontend',
      estimatedTime: 60,
      difficulty: 'hard',
      skills: ['React', 'Hooks', 'Performance', 'State Management'],
      status: 'not-started'
    },
    {
      id: 'system-design',
      title: 'System Design Fundamentals',
      description: 'Assess your ability to design scalable systems, handle load balancing, and database optimization.',
      category: 'Architecture',
      estimatedTime: 90,
      difficulty: 'hard',
      skills: ['System Design', 'Scalability', 'Databases', 'Architecture'],
      status: 'not-started'
    },
    {
      id: 'node-backend',
      title: 'Node.js Backend Development',
      description: 'Test your knowledge of Node.js, Express, API design, and backend best practices.',
      category: 'Backend',
      estimatedTime: 50,
      difficulty: 'medium',
      skills: ['Node.js', 'Express', 'REST APIs', 'Database Integration'],
      status: 'in-progress'
    },
    {
      id: 'python-data',
      title: 'Python for Data Analysis',
      description: 'Evaluate your skills in Python data manipulation, analysis libraries, and statistical concepts.',
      category: 'Data Science',
      estimatedTime: 55,
      difficulty: 'medium',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
      status: 'not-started'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in-progress':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  if (selectedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Assessment in Progress</h2>
          <button
            onClick={() => setSelectedAssessment(null)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Assessments
          </button>
        </div>
        <AssessmentAgent onComplete={() => setSelectedAssessment(null)} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Available Assessments</h2>
            <p className="text-sm text-gray-600">Test your skills and track your progress</p>
          </div>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(assessment.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(assessment.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                      {assessment.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{assessment.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{assessment.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{assessment.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {assessment.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {assessment.status === 'completed' && assessment.score && (
                  <div className="mb-2">
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">{assessment.score}%</span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedAssessment(assessment.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    assessment.status === 'completed'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : assessment.status === 'in-progress'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {assessment.status === 'completed' ? 'Retake' :
                   assessment.status === 'in-progress' ? 'Continue' : 'Start Assessment'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-2">Assessment Guidelines</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Complete assessments to unlock personalized learning recommendations</li>
          <li>• Each assessment adapts to your skill level as you progress</li>
          <li>• You can retake assessments to improve your scores</li>
          <li>• Results are used to create your personalized learning path</li>
        </ul>
      </div>
    </div>
  );
}