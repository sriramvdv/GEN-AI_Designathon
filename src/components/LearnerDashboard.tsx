import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { employees } from '../data/mockData';
import { ProgressBar, StageProgress } from './ProgressBar';
import { ProfileAgent } from './agents/ProfileAgent';
import { AssessmentList } from './AssessmentList';
import { RecommenderAgent } from './agents/RecommenderAgent';
import { TrackerAgent } from './agents/TrackerAgent';
import { LearningPathView } from './LearningPathView';
import { TeamMembersView } from './TeamMembersView';
import { 
  User, 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  PlayCircle,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';

export function LearnerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'assessment' | 'recommendations' | 'progress' | 'learning-path' | 'team'>('overview');
  const [startSpecificAssessment, setStartSpecificAssessment] = useState<string | null>(null);
  
  // Find employee data
  const employeeData = employees.find(emp => emp.username === user?.username);
  
  if (!employeeData) {
    return <div>Employee data not found</div>;
  }

  // Calculate learning stage based on progress
  const getLearningStages = () => {
    const totalProgress = employeeData.learningPath.reduce((sum, item) => sum + item.progress, 0) / employeeData.learningPath.length;
    
    return [
      { title: 'Profile', status: 'completed' as const },
      { title: 'Assessment', status: totalProgress > 0 ? 'completed' as const : 'current' as const },
      { title: 'Recommendations', status: totalProgress > 20 ? 'completed' as const : totalProgress > 0 ? 'current' as const : 'pending' as const },
      { title: 'Learning', status: totalProgress > 50 ? 'current' as const : totalProgress > 20 ? 'current' as const : 'pending' as const },
      { title: 'Completion', status: totalProgress > 90 ? 'current' as const : 'pending' as const }
    ];
  };

  const stages = getLearningStages();
  const overallProgress = employeeData.learningPath.reduce((sum, item) => sum + item.progress, 0) / employeeData.learningPath.length;
  const completedCourses = employeeData.learningPath.filter(item => item.status === 'completed').length;
  const inProgressCourses = employeeData.learningPath.filter(item => item.status === 'in-progress').length;

  const skillGaps = Object.entries(employeeData.assessmentScores)
    .filter(([_, score]) => score < 70)
    .map(([skill, _]) => skill);

  const tabButtons = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'profile', label: 'Profile Analysis', icon: Target },
    { id: 'assessment', label: 'Assessment', icon: CheckCircle },
    { id: 'recommendations', label: 'Recommendations', icon: Star },
    { id: 'progress', label: 'Progress Tracker', icon: TrendingUp },
    { id: 'team', label: 'Team Members', icon: Users }
  ];

  const handleStartAssignment = (assessmentId: string) => {
    setStartSpecificAssessment(assessmentId);
    setActiveTab('assessment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabButtons.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {employeeData.fullName.split(' ')[0]}!</h1>
                  <p className="text-blue-100 mb-4">
                    Continue your journey from {employeeData.currentLevel} to {employeeData.targetLevel}
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4" />
                      <span>{completedCourses} completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{inProgressCourses} in progress</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{Math.round(overallProgress)}%</div>
                  <div className="text-blue-100 text-sm">Overall Progress</div>
                </div>
              </div>
            </div>

            {/* Learning Progress Stages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Journey</h2>
              <StageProgress stages={stages} />
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{completedCourses}</p>
                    <p className="text-sm text-gray-600">Courses Completed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <PlayCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{inProgressCourses}</p>
                    <p className="text-sm text-gray-600">Currently Learning</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{skillGaps.length}</p>
                    <p className="text-sm text-gray-600">Skill Gaps Identified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Learning Path */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Path</h2>
              <div className="space-y-3">
                {employeeData.learningPath.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {item.type} • {item.estimatedHours}h • {item.status.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32">
                        <ProgressBar progress={item.progress} showPercentage={false} size="sm" />
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-12 text-right">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => setActiveTab('learning-path')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View complete learning path →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileAgent employee={employeeData} />
        )}

        {activeTab === 'assessment' && (
          <AssessmentList 
            startSpecificAssessment={startSpecificAssessment}
            onBack={() => {
              setStartSpecificAssessment(null);
              setActiveTab('overview');
            }}
          />
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <RecommenderAgent 
              skillGaps={skillGaps} 
              currentSkills={employeeData.skills}
              onStartAssignment={handleStartAssignment}
            />
          </div>
        )}

        {activeTab === 'progress' && (
          <TrackerAgent employeeData={employeeData} />
        )}

        {activeTab === 'learning-path' && (
          <LearningPathView 
            learningPath={employeeData.learningPath}
            onBack={() => setActiveTab('overview')}
          />
        )}

        {activeTab === 'team' && (
          <TeamMembersView 
            onBack={() => setActiveTab('overview')}
          />
        )}
      </div>
    </div>
  );
}