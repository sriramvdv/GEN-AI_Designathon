import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'teal';
}

export function ProgressBar({ 
  progress, 
  className = '', 
  showPercentage = true, 
  size = 'md',
  color = 'blue'
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600', 
    yellow: 'bg-yellow-500',
    red: 'bg-red-600',
    teal: 'bg-teal-600'
  };

  const getProgressColor = () => {
    if (progress >= 90) return 'bg-green-600';
    if (progress >= 70) return 'bg-blue-600';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`flex-1 bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div
          className={`${color === 'blue' ? getProgressColor() : colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-right">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}

interface StageProgressProps {
  stages: Array<{
    title: string;
    status: 'completed' | 'current' | 'pending';
  }>;
}

export function StageProgress({ stages }: StageProgressProps) {
  return (
    <div className="flex items-center space-x-2">
      {stages.map((stage, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                stage.status === 'completed'
                  ? 'bg-green-600 text-white'
                  : stage.status === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs text-gray-600 mt-1 text-center max-w-16">
              {stage.title}
            </span>
          </div>
          {index < stages.length - 1 && (
            <div
              className={`h-0.5 w-12 transition-all ${
                stages[index + 1].status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}