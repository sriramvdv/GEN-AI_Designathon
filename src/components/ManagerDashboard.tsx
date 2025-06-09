import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { employees } from '../data/mockData';
import { ProgressBar } from './ProgressBar';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Eye,
  PlayCircle,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
  FileText,
  Bell
} from 'lucide-react';

export function ManagerDashboard() {
  const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  
  // Get manager's team members
  const teamMembers = employees.filter(emp => 
    user?.employees?.includes(emp.username)
  );

  // Calculate team statistics
  const teamStats = {
    totalMembers: teamMembers.length,
    averageProgress: teamMembers.reduce((sum, emp) => 
      sum + (emp.learningPath.reduce((pSum, item) => pSum + item.progress, 0) / emp.learningPath.length), 0
    ) / teamMembers.length,
    completedCourses: teamMembers.reduce((sum, emp) => 
      sum + emp.learningPath.filter(item => item.status === 'completed').length, 0
    ),
    atRiskEmployees: teamMembers.filter(emp => {
      const avgProgress = emp.learningPath.reduce((sum, item) => sum + item.progress, 0) / emp.learningPath.length;
      return avgProgress < 40;
    }).length
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (employee: any) => {
    const avgProgress = employee.learningPath.reduce((sum: number, item: any) => sum + item.progress, 0) / employee.learningPath.length;
    const skillGaps = Object.entries(employee.assessmentScores).filter(([_, score]) => (score as number) < 60).length;
    
    if (avgProgress < 30 || skillGaps > 3) return { level: 'High', color: 'text-red-600 bg-red-100' };
    if (avgProgress < 60 || skillGaps > 1) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600 bg-green-100' };
  };

  const handleQuickAction = (action: string, employeeId?: string) => {
    switch (action) {
      case 'start-assessment':
        alert('Assessment triggered for all team members. Notifications sent!');
        break;
      case 'generate-report':
        alert('Generating team progress report... Download will start shortly.');
        break;
      case 'set-goals':
        alert('Opening goal setting interface for team objectives.');
        break;
      case 'send-reminder':
        alert(`Reminder sent to ${employeeId ? employees.find(e => e.username === employeeId)?.fullName : 'team member'}`);
        break;
      case 'schedule-meeting':
        alert(`1:1 meeting scheduled with ${employeeId ? employees.find(e => e.username === employeeId)?.fullName : 'team member'}`);
        break;
      default:
        break;
    }
  };

  if (showTeamMembers) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">My Team Members</h2>
                  <p className="text-sm text-gray-600">Detailed view of your direct reports</p>
                </div>
              </div>
              <button
                onClick={() => setShowTeamMembers(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="grid gap-6">
              {teamMembers.map((employee, index) => {
                const avgProgress = employee.learningPath.reduce((sum, item) => sum + item.progress, 0) / employee.learningPath.length;
                const completedItems = employee.learningPath.filter(item => item.status === 'completed').length;
                const inProgressItems = employee.learningPath.filter(item => item.status === 'in-progress').length;
                const risk = getRiskLevel(employee);

                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {employee.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{employee.fullName}</h3>
                          <p className="text-sm text-gray-600">{employee.currentLevel} • {employee.department}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${risk.color}`}>
                          {risk.level} Risk
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Learning Progress</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Overall Progress</span>
                              <span className={`font-medium ${getProgressColor(avgProgress)}`}>
                                {Math.round(avgProgress)}%
                              </span>
                            </div>
                            <ProgressBar progress={avgProgress} showPercentage={false} size="sm" />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-green-50 rounded">
                              <div className="text-lg font-bold text-green-600">{completedItems}</div>
                              <div className="text-xs text-green-700">Completed</div>
                            </div>
                            <div className="p-2 bg-blue-50 rounded">
                              <div className="text-lg font-bold text-blue-600">{inProgressItems}</div>
                              <div className="text-xs text-blue-700">In Progress</div>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <div className="text-lg font-bold text-gray-600">{employee.learningPath.length - completedItems - inProgressItems}</div>
                              <div className="text-xs text-gray-700">Not Started</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Skills & Assessment</h4>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Core Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {employee.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Assessment Scores:</p>
                            <div className="space-y-1">
                              {Object.entries(employee.assessmentScores).slice(0, 3).map(([skill, score], scoreIndex) => (
                                <div key={scoreIndex} className="flex justify-between text-xs">
                                  <span className="text-gray-600">{skill}:</span>
                                  <span className={`font-medium ${(score as number) >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                    {score}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Current Learning Items</h4>
                      <div className="space-y-2">
                        {employee.learningPath.filter(item => item.status === 'in-progress').slice(0, 2).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.title}</p>
                              <p className="text-xs text-gray-600 capitalize">{item.type} • {item.estimatedHours}h</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-16">
                                <ProgressBar progress={item.progress} showPercentage={false} size="sm" />
                              </div>
                              <span className="text-xs font-medium text-gray-600 w-8 text-right">
                                {item.progress}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <button 
                          onClick={() => handleQuickAction('send-reminder', employee.username)}
                          className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                        >
                          Send Reminder
                        </button>
                        <button 
                          onClick={() => handleQuickAction('schedule-meeting', employee.username)}
                          className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                        >
                          Schedule 1:1
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Team Performance Overview</h1>
              <p className="text-teal-100">
                Manage and monitor your team's learning progress and skill development
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{Math.round(teamStats.averageProgress)}%</div>
              <div className="text-teal-100 text-sm">Team Average</div>
            </div>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{teamStats.totalMembers}</p>
                <p className="text-sm text-gray-600">Team Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{teamStats.completedCourses}</p>
                <p className="text-sm text-gray-600">Courses Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-600">{Math.round(teamStats.averageProgress)}%</p>
                <p className="text-sm text-gray-600">Average Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{teamStats.atRiskEmployees}</p>
                <p className="text-sm text-gray-600">At Risk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Members List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                <button 
                  onClick={() => setShowTeamMembers(true)}
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View All Members
                </button>
              </div>

              <div className="space-y-4">
                {teamMembers.slice(0, 3).map((employee, index) => {
                  const avgProgress = employee.learningPath.reduce((sum, item) => sum + item.progress, 0) / employee.learningPath.length;
                  const completedItems = employee.learningPath.filter(item => item.status === 'completed').length;
                  const inProgressItems = employee.learningPath.filter(item => item.status === 'in-progress').length;
                  const risk = getRiskLevel(employee);

                  return (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer ${
                        selectedEmployee === employee.username ? 'border-teal-300 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedEmployee(selectedEmployee === employee.username ? null : employee.username)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {employee.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{employee.fullName}</h3>
                            <p className="text-sm text-gray-600">{employee.currentLevel}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${risk.color}`}>
                            {risk.level} Risk
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className={`font-medium ${getProgressColor(avgProgress)}`}>
                            {Math.round(avgProgress)}%
                          </span>
                        </div>
                        <ProgressBar progress={avgProgress} showPercentage={false} size="sm" />
                        
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                          <span>Completed: {completedItems}</span>
                          <span>In Progress: {inProgressItems}</span>
                          <span>Last Active: {new Date(employee.lastActive).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {selectedEmployee === employee.username && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                          <h4 className="font-medium text-gray-900">Current Learning Path</h4>
                          {employee.learningPath.filter(item => item.status === 'in-progress').slice(0, 2).map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between p-2 bg-white rounded border">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                <p className="text-xs text-gray-600 capitalize">{item.type} • {item.estimatedHours}h</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-16">
                                  <ProgressBar progress={item.progress} showPercentage={false} size="sm" />
                                </div>
                                <span className="text-xs font-medium text-gray-600 w-8 text-right">
                                  {item.progress}%
                                </span>
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAction('send-reminder', employee.username);
                              }}
                              className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                            >
                              Send Reminder
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAction('schedule-meeting', employee.username);
                              }}
                              className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                            >
                              Schedule 1:1
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Team Analytics */}
          <div className="space-y-6">
            {/* Progress Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Distribution</h3>
              <div className="space-y-3">
                {[
                  { range: '80-100%', count: teamMembers.filter(emp => {
                    const avg = emp.learningPath.reduce((sum, item) => sum + item.progress, 0) / emp.learningPath.length;
                    return avg >= 80;
                  }).length, color: 'bg-green-500' },
                  { range: '60-79%', count: teamMembers.filter(emp => {
                    const avg = emp.learningPath.reduce((sum, item) => sum + item.progress, 0) / emp.learningPath.length;
                    return avg >= 60 && avg < 80;
                  }).length, color: 'bg-blue-500' },
                  { range: '40-59%', count: teamMembers.filter(emp => {
                    const avg = emp.learningPath.reduce((sum, item) => sum + item.progress, 0) / emp.learningPath.length;
                    return avg >= 40 && avg < 60;
                  }).length, color: 'bg-yellow-500' },
                  { range: '0-39%', count: teamMembers.filter(emp => {
                    const avg = emp.learningPath.reduce((sum, item) => sum + item.progress, 0) / emp.learningPath.length;
                    return avg < 40;
                  }).length, color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-600">{item.range}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleQuickAction('start-assessment')}
                  className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  <PlayCircle className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-medium text-gray-900">Start Team Assessment</p>
                    <p className="text-sm text-gray-600">Trigger skills evaluation for all members</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleQuickAction('generate-report')}
                  className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Generate Report</p>
                    <p className="text-sm text-gray-600">Download team progress summary</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleQuickAction('set-goals')}
                  className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all"
                >
                  <Target className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">Set Team Goals</p>
                    <p className="text-sm text-gray-600">Define learning objectives and deadlines</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Team Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Emily completed Advanced Python</p>
                    <p className="text-xs text-green-600">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Team reached 75% avg progress</p>
                    <p className="text-xs text-blue-600">1 week ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Alex needs attention</p>
                    <p className="text-xs text-yellow-600">Progress below target</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}