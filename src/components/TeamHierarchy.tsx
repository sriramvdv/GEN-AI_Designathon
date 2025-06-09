import React from 'react';
import { users } from '../contexts/AuthContext';
import { employees } from '../data/mockData';
import { Users, User, ChevronDown, ChevronRight } from 'lucide-react';

export function TeamHierarchy() {
  const managers = users.filter(user => user.role === 'manager');
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Team Hierarchy</h2>
          <p className="text-sm text-gray-600">Organization structure and reporting relationships</p>
        </div>
      </div>

      <div className="space-y-6">
        {managers.map((manager, index) => {
          const teamMembers = employees.filter(emp => 
            manager.employees?.includes(emp.username)
          );

          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              {/* Manager */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {manager.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{manager.fullName}</h3>
                  <p className="text-sm text-gray-600">{manager.role} • {manager.department}</p>
                  <p className="text-xs text-gray-500">{manager.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                    Manager
                  </span>
                  <span className="text-sm text-gray-500">
                    {teamMembers.length} direct reports
                  </span>
                </div>
              </div>

              {/* Team Members */}
              <div className="ml-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <ChevronDown className="h-4 w-4" />
                  <span>Team Members</span>
                </div>
                
                {teamMembers.map((member, memberIndex) => (
                  <div key={memberIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {member.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{member.fullName}</h4>
                      <p className="text-sm text-gray-600">{member.currentLevel}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        Employee
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {member.skills.slice(0, 2).join(', ')}
                        {member.skills.length > 2 && ` +${member.skills.length - 2}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}