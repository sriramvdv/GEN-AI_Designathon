import React from 'react';
import { users } from '../contexts/AuthContext';
import { employees } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { ProgressBar } from './ProgressBar';
import { 
  Users, 
  User, 
  Crown,
  Mail,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface TeamMembersViewProps {
  onBack: () => void;
}

export function TeamMembersView({ onBack }: TeamMembersViewProps) {
  const { user } = useAuth();
  
  // Get manager and team members based on user role
  const getTeamData = () => {
    if (user?.role === 'employee') {
      // Find the manager of this employee
      const manager = users.find(u => u.username === user.manager);
      // Find all team members under the same manager
      const teamMembers = employees.filter(emp => emp.username !== user.username && 
        manager?.employees?.includes(emp.username));
      
      return { manager, teamMembers };
    } else if (user?.role === 'manager') {
      // For managers, show their direct reports
      const teamMembers = employees.filter(emp => user.employees?.includes(emp.username));
      return { manager: null, teamMembers };
    }
    
    return { manager: null, teamMembers: [] };
  };

  const { manager, teamMembers } = getTeamData();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {user?.role === 'manager' ? 'My Team' : 'Team Members'}
            </h2>
            <p className="text-sm text-gray-600">
              {user?.role === 'manager' 
                ? 'Manage and monitor your direct reports' 
                : 'Your colleagues and team structure'}
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Overview
        </button>
      </div>

      {/* Manager Section (for employees) */}
      {manager && user?.role === 'employee' && (
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Crown className="h-4 w-4 text-yellow-600" />
            <span>Your Manager</span>
          </h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {manager.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{manager.fullName}</h4>
                <p className="text-sm text-gray-600 capitalize">{manager.role} • {manager.department}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{manager.email}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                  Manager
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Members Section */}
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center space-x-2">
          <User className="h-4 w-4 text-blue-600" />
          <span>
            {user?.role === 'manager' ? 'Direct Reports' : 'Team Colleagues'} 
            ({teamMembers.length})
          </span>
        </h3>

        {teamMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No team members found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {teamMembers.map((member, index) => {
              const avgProgress = member.learningPath.reduce((sum, item) => sum + item.progress, 0) / member.learningPath.length;
              const completedCourses = member.learningPath.filter(item => item.status === 'completed').length;
              const inProgressCourses = member.learningPath.filter(item => item.status === 'in-progress').length;
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.fullName}</h4>
                          <p className="text-sm text-gray-600">{member.currentLevel}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            Employee
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-3">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{member.email}</span>
                      </div>

                      {/* Skills */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{member.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Learning Progress</span>
                          <span className="font-medium text-gray-900">{Math.round(avgProgress)}%</span>
                        </div>
                        <ProgressBar progress={avgProgress} showPercentage={false} size="sm" />
                        
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Completed: {completedCourses}</span>
                          <span>In Progress: {inProgressCourses}</span>
                          <span>Last Active: {new Date(member.lastActive).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-sm font-semibold text-green-600">{completedCourses}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-600">{inProgressCourses}</div>
                            <div className="text-xs text-gray-500">In Progress</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-purple-600">{member.skills.length}</div>
                            <div className="text-xs text-gray-500">Skills</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}