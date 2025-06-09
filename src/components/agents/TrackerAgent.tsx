import React from 'react';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import { ProgressBar } from '../ProgressBar';

interface TrackerAgentProps {
  employeeData: {
    username: string;
    fullName: string;
    learningPath: Array<{
      id: string;
      title: string;
      type: string;
      status: string;
      progress: number;
      estimatedHours: number;
    }>;
    lastActive: string;
  };
}

export function TrackerAgent({ employeeData }: TrackerAgentProps) {
  const { learningPath, lastActive } = employeeData;
  
  // Calculate overall progress
  const totalItems = learningPath.length;
  const completedItems = learningPath.filter(item => item.status === 'completed').length;
  const inProgressItems = learningPath.filter(item => item.status === 'in-progress').length;
  const overallProgress = learningPath.reduce((sum, item) => sum + item.progress, 0) / totalItems;

  // Simulate learning analytics
  const analyticsData = {
    weeklyHours: 8.5,
    averageSessionTime: 45,
    streakDays: 12,
    completionRate: 78,
    timeToComplete: 6, // weeks
    riskLevel: overallProgress < 30 ? 'high' : overallProgress < 60 ? 'medium' : 'low'
  };

  // Detect learning patterns and plateaus
  const insights = [
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'Strong Progress',
      message: 'Consistent learning pattern detected. 12-day streak maintained.'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Attention Needed',
      message: 'Advanced React course progress has slowed. Consider scheduling focused study time.'
    },
    {
      type: 'suggestion',
      icon: Target,
      title: 'Optimization Tip',
      message: 'Peak learning hours identified: 9-11 AM. Schedule challenging topics during this time.'
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'suggestion': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Activity className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Learning Progress Tracker</h3>
          <p className="text-sm text-gray-600">AI-powered progress monitoring and insights</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Current Progress</h4>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Completion</span>
                <span className="text-lg font-bold text-blue-600">{Math.round(overallProgress)}%</span>
              </div>
              <ProgressBar progress={overallProgress} showPercentage={false} />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{completedItems}</div>
                <div className="text-xs text-green-700">Completed</div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{inProgressItems}</div>
                <div className="text-xs text-blue-700">In Progress</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-600">{totalItems - completedItems - inProgressItems}</div>
                <div className="text-xs text-gray-700">Not Started</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-900">Learning Analytics</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Weekly Hours:</span>
                <span className="font-medium">{analyticsData.weeklyHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Session:</span>
                <span className="font-medium">{analyticsData.averageSessionTime}min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Learning Streak:</span>
                <span className="font-medium text-orange-600">{analyticsData.streakDays} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate:</span>
                <span className="font-medium">{analyticsData.completionRate}%</span>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Risk Assessment</span>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRiskColor(analyticsData.riskLevel)}`}>
                {analyticsData.riskLevel.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Estimated completion: {analyticsData.timeToComplete} weeks at current pace
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">AI Insights & Recommendations</h4>
          
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start space-x-2">
                    <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-sm font-medium mb-1">{insight.title}</h5>
                      <p className="text-xs opacity-90">{insight.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Next Milestone</span>
            </div>
            <p className="text-sm text-orange-700">
              Complete "Advanced React Patterns" to unlock the next phase of your learning path.
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-orange-600 mb-1">
                <span>Progress to next milestone</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-1.5">
                <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Achievement Unlocked</span>
            </div>
            <p className="text-sm text-green-700">
              Maintained consistent learning for 12 days! Keep up the excellent work.
            </p>
          </div>
        </div>
      </div>

      {/* Current Learning Items */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Active Learning Items</h4>
        <div className="space-y-2">
          {learningPath
            .filter(item => item.status === 'in-progress')
            .map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">{item.title}</h5>
                  <p className="text-xs text-gray-600 capitalize">{item.type} • {item.estimatedHours}h</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24">
                    <ProgressBar progress={item.progress} showPercentage={false} size="sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-10 text-right">
                    {item.progress}%
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}