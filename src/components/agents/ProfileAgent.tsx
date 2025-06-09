import React from 'react';
import { User, Brain, TrendingUp, CheckCircle } from 'lucide-react';

interface ProfileAgentProps {
  employee: {
    fullName: string;
    department: string;
    currentLevel: string;
    targetLevel: string;
    skills: string[];
    completedCourses: string[];
  };
}

export function ProfileAgent({ employee }: ProfileAgentProps) {
  const skillAnalysis = employee.skills.map(skill => ({
    name: skill,
    proficiency: Math.floor(Math.random() * 30) + 60, // Simulated score 60-90
    marketDemand: Math.floor(Math.random() * 20) + 80  // Simulated demand 80-100
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Brain className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Analysis</h3>
          <p className="text-sm text-gray-600">AI-powered skill assessment and recommendations</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Profile */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-600" />
            <span>Current Profile</span>
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Position:</span>
              <span className="text-sm font-medium text-gray-900">{employee.currentLevel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Department:</span>
              <span className="text-sm font-medium text-gray-900">{employee.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed Courses:</span>
              <span className="text-sm font-medium text-green-600">{employee.completedCourses.length}</span>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Core Skills</h5>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span>Growth Analysis</span>
          </h4>

          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Target Role</span>
              </div>
              <p className="text-sm text-green-700">{employee.targetLevel}</p>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Skill Market Analysis</h5>
              <div className="space-y-2">
                {skillAnalysis.slice(0, 3).map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-1.5 bg-blue-500 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="text-sm font-medium text-blue-800 mb-1">AI Recommendation</h5>
            <p className="text-xs text-blue-700">
              Focus on {skillAnalysis.sort((a, b) => b.marketDemand - a.marketDemand)[0]?.name} 
              to maximize career growth potential. High market demand detected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}