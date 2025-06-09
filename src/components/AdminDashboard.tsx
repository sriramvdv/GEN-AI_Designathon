import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { employees, progressData } from '../data/mockData';
import { TeamHierarchy } from './TeamHierarchy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Activity,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Layers
} from 'lucide-react';

export function AdminDashboard() {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'teams'>('overview');

  // Calculate system statistics
  const systemStats = {
    totalUsers: employees.length,
    totalManagers: 2, // Based on our user data
    activeUsers: employees.filter(emp => {
      const lastActive = new Date(emp.lastActive);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastActive > weekAgo;
    }).length,
    completionRate: employees.reduce((sum, emp) => {
      const completed = emp.learningPath.filter(item => item.status === 'completed').length;
      return sum + (completed / emp.learningPath.length);
    }, 0) / employees.length * 100
  };

  // Agent status simulation
  const agentStatus = [
    { name: 'Profile Agent', status: 'healthy', latency: '45ms', processed: 1247, errors: 2 },
    { name: 'Assessment Agent', status: 'healthy', latency: '82ms', processed: 856, errors: 0 },
    { name: 'Recommender Agent', status: 'warning', latency: '156ms', processed: 634, errors: 5 },
    { name: 'Tracker Agent', status: 'healthy', latency: '23ms', processed: 2145, errors: 1 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Filter employees based on search and department
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  const tabButtons = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'teams', label: 'Team Hierarchy', icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">System Administration</h1>
              <p className="text-red-100">
                Monitor platform performance, user analytics, and agent operations
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{Math.round(systemStats.completionRate)}%</div>
              <div className="text-red-100 text-sm">Platform Completion Rate</div>
            </div>
          </div>
        </div>

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
                        ? 'border-red-500 text-red-600'
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
            {/* System Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{systemStats.totalUsers}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</p>
                    <p className="text-sm text-gray-600">Active This Week</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{systemStats.totalManagers}</p>
                    <p className="text-sm text-gray-600">Team Managers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-teal-600">{Math.round(systemStats.completionRate)}%</p>
                    <p className="text-sm text-gray-600">Avg Completion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Agent System Status</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Real-time monitoring</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agentStatus.map((agent, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{agent.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Latency:</span>
                        <span className="font-medium">{agent.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processed:</span>
                        <span className="font-medium text-green-600">{agent.processed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Errors:</span>
                        <span className={`font-medium ${agent.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {agent.errors}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Department Progress Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Progress Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={progressData.departmentProgress} margin={{ bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="department" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      interval={0}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" />
                    <Bar dataKey="inProgress" stackId="a" fill="#3B82F6" name="In Progress" />
                    <Bar dataKey="notStarted" stackId="a" fill="#E5E7EB" name="Not Started" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Skill Gap Analysis */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skill Gaps</h3>
                <div className="space-y-4">
                  {progressData.skillGapAnalysis.slice(0, 5).map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">{skill.skill}</span>
                        <span className="text-red-600 font-medium">{skill.gap}pt gap</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full"
                          style={{ width: `${(skill.gap / 40) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Current: {skill.currentLevel}%</span>
                        <span>Target: {skill.targetLevel}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Progress Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Activity Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData.monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed" />
                  <Line type="monotone" dataKey="started" stroke="#3B82F6" strokeWidth={2} name="Started" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => {
                    const avgProgress = employee.learningPath.reduce((sum, item) => sum + item.progress, 0) / employee.learningPath.length;
                    const isActive = new Date(employee.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {employee.fullName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{employee.fullName}</p>
                              <p className="text-sm text-gray-600">{employee.currentLevel}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{employee.department}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${avgProgress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-600">{Math.round(avgProgress)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(employee.lastActive).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <TeamHierarchy />
        )}
      </div>
    </div>
  );
}