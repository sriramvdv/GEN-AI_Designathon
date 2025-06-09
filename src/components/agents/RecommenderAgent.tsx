import React from 'react';
import { BookOpen, Star, Clock, Users, TrendingUp, Lightbulb } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  estimatedHours: number;
  rating: number;
  enrolledCount: number;
  skills: string[];
  relevanceScore: number;
  reason: string;
  assessmentId?: string;
}

interface RecommenderAgentProps {
  skillGaps: string[];
  currentSkills: string[];
  onStartAssignment?: (assessmentId: string) => void;
}

export function RecommenderAgent({ skillGaps, currentSkills, onStartAssignment }: RecommenderAgentProps) {
  // Simulated AI-powered course recommendations
  const recommendations: Course[] = [
    {
      id: 'advanced-react',
      title: 'Advanced React Patterns & Performance',
      description: 'Master advanced React concepts including hooks, context, performance optimization, and modern patterns.',
      level: 'Advanced',
      estimatedHours: 24,
      rating: 4.8,
      enrolledCount: 1250,
      skills: ['React', 'JavaScript', 'Performance Optimization'],
      relevanceScore: 95,
      reason: 'High skill gap identified in React performance optimization. This course directly addresses your target senior role requirements.',
      assessmentId: 'react-advanced'
    },
    {
      id: 'system-design',
      title: 'System Design Fundamentals',
      description: 'Learn to design scalable, reliable systems. Cover load balancing, databases, caching, and microservices.',
      level: 'Intermediate',
      estimatedHours: 32,
      rating: 4.7,
      enrolledCount: 890,
      skills: ['System Design', 'Architecture', 'Scalability'],
      relevanceScore: 88,
      reason: 'Critical skill for senior developers. Your assessment shows 35-point gap in system design knowledge.',
      assessmentId: 'system-design'
    },
    {
      id: 'node-microservices',
      title: 'Node.js Microservices Architecture',
      description: 'Build and deploy microservices using Node.js, Docker, and Kubernetes. Includes monitoring and testing.',
      level: 'Advanced',
      estimatedHours: 28,
      rating: 4.6,
      enrolledCount: 634,
      skills: ['Node.js', 'Microservices', 'Docker', 'Kubernetes'],
      relevanceScore: 82,
      reason: 'Complements your existing Node.js skills. High demand in your department for microservices expertise.',
      assessmentId: 'node-backend'
    },
    {
      id: 'typescript-advanced',
      title: 'Advanced TypeScript for Large Applications',
      description: 'Deep dive into TypeScript advanced features, design patterns, and best practices for enterprise applications.',
      level: 'Advanced',
      estimatedHours: 20,
      rating: 4.9,
      enrolledCount: 567,
      skills: ['TypeScript', 'Design Patterns', 'Enterprise Development'],
      relevanceScore: 78,
      reason: 'TypeScript adoption is growing rapidly in your team. This will give you a competitive advantage.',
      assessmentId: 'js-fundamentals'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-teal-100 rounded-lg">
          <Lightbulb className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Course Recommendations</h3>
          <p className="text-sm text-gray-600">Personalized learning paths based on your skill gaps</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Recommendation Summary */}
        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-teal-600" />
            <span className="font-medium text-teal-800">Smart Analysis</span>
          </div>
          <p className="text-sm text-teal-700">
            Based on your assessment and career goals, we've identified {skillGaps.length} skill gaps. 
            These {recommendations.length} courses are ranked by relevance to your development path.
          </p>
        </div>

        {/* Course Recommendations */}
        <div className="space-y-4">
          {recommendations.map((course, index) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <div className={`text-sm font-semibold ${getRelevanceColor(course.relevanceScore)}`}>
                      {course.relevanceScore}% Match
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                </div>
              </div>

              {/* Course Metrics */}
              <div className="flex items-center space-x-6 mb-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.estimatedHours}h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {course.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-2 py-1 text-xs rounded-full ${
                      skillGaps.includes(skill) 
                        ? 'bg-red-100 text-red-700 font-medium' 
                        : currentSkills.includes(skill)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {skill}
                    {skillGaps.includes(skill) && ' ⚡'}
                  </span>
                ))}
              </div>

              {/* AI Reasoning */}
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-teal-400 mb-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-gray-700">AI Recommendation:</span>
                    <p className="text-xs text-gray-600 mt-1">{course.reason}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => course.assessmentId && onStartAssignment?.(course.assessmentId)}
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Start Assignment
                </button>
                <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path Summary */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Recommended Learning Path</span>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            Complete these courses in order for optimal skill development:
          </p>
          <ol className="list-decimal list-inside text-sm text-blue-600 space-y-1">
            {recommendations.slice(0, 3).map((course, index) => (
              <li key={index}>{course.title} ({course.estimatedHours}h)</li>
            ))}
          </ol>
          <p className="text-xs text-blue-600 mt-2 font-medium">
            Total time investment: {recommendations.slice(0, 3).reduce((total, course) => total + course.estimatedHours, 0)} hours
          </p>
        </div>
      </div>
    </div>
  );
}