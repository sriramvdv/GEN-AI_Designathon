import React from 'react';
import { ProgressBar } from './ProgressBar';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  PlayCircle,
  Target,
  Award
} from 'lucide-react';

interface LearningPathViewProps {
  learningPath: Array<{
    id: string;
    title: string;
    type: string;
    status: string;
    progress: number;
    estimatedHours: number;
    skills: string[];
    prerequisite?: string;
  }>;
  onBack: () => void;
}

export function LearningPathView({ learningPath, onBack }: LearningPathViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in-progress':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'assessment':
        return <Target className="h-4 w-4" />;
      case 'project':
        return <Award className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Complete Learning Path</h2>
          <p className="text-sm text-gray-600">Your personalized journey to skill mastery</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Overview
        </button>
      </div>

      <div className="space-y-4">
        {learningPath.map((item, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(item.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getTypeIcon(item.type)}
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full capitalize">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Estimated time: {item.estimatedHours}h
                  </p>
                  {item.prerequisite && (
                    <p className="text-xs text-gray-500 mb-2">
                      Prerequisite: {learningPath.find(p => p.id === item.prerequisite)?.title}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {item.skills.map((skill, skillIndex) => (
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
                <span className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${
                  item.status === 'completed' ? 'text-green-700 bg-green-100' :
                  item.status === 'in-progress' ? 'text-blue-700 bg-blue-100' :
                  'text-gray-700 bg-gray-100'
                }`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <ProgressBar progress={item.progress} showPercentage={false} size="sm" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {item.progress}%
              </span>
              {item.status === 'not-started' && (
                <button className="ml-3 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                  Start
                </button>
              )}
              {item.status === 'in-progress' && (
                <button className="ml-3 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
                  Continue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">Learning Path Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {learningPath.filter(item => item.status === 'completed').length}
            </div>
            <div className="text-green-700">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {learningPath.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-blue-700">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-600">
              {learningPath.filter(item => item.status === 'not-started').length}
            </div>
            <div className="text-gray-700">Not Started</div>
          </div>
        </div>
      </div>
    </div>
  );
}