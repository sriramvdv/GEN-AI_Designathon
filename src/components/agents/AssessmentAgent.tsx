import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Target, Brain } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
}

interface AssessmentAgentProps {
  onComplete?: (results: { skill: string; score: number }[]) => void;
}

export function AssessmentAgent({ onComplete }: AssessmentAgentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [results, setResults] = useState<{ skill: string; score: number }[]>([]);

  // Simulated adaptive questions
  const questions: Question[] = [
    {
      id: '1',
      text: 'What is the correct way to handle asynchronous operations in JavaScript?',
      options: ['Callbacks only', 'Promises and async/await', 'setTimeout only', 'Synchronous code'],
      difficulty: 'medium',
      skill: 'JavaScript'
    },
    {
      id: '2', 
      text: 'Which React hook is used for managing component lifecycle?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      difficulty: 'easy',
      skill: 'React'
    },
    {
      id: '3',
      text: 'What is the purpose of normalization in database design?',
      options: ['Improve performance', 'Reduce redundancy', 'Increase storage', 'Add complexity'],
      difficulty: 'medium',
      skill: 'Database'
    },
    {
      id: '4',
      text: 'Which algorithm has the best average-case time complexity for sorting?',
      options: ['Bubble Sort O(n²)', 'Quick Sort O(n log n)', 'Selection Sort O(n²)', 'Linear Search O(n)'],
      difficulty: 'hard',
      skill: 'Algorithms'
    },
    {
      id: '5',
      text: 'What is the primary benefit of microservices architecture?',
      options: ['Reduced complexity', 'Independent scalability', 'Faster development', 'Lower costs'],
      difficulty: 'hard',
      skill: 'System Design'
    }
  ];

  const correctAnswers = [1, 1, 1, 1, 1]; // Indexes of correct answers

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const skillScores: Record<string, { correct: number; total: number }> = {};
      
      questions.forEach((question, index) => {
        if (!skillScores[question.skill]) {
          skillScores[question.skill] = { correct: 0, total: 0 };
        }
        skillScores[question.skill].total++;
        if (newAnswers[index] === correctAnswers[index]) {
          skillScores[question.skill].correct++;
        }
      });

      const calculatedResults = Object.entries(skillScores).map(([skill, scores]) => ({
        skill,
        score: Math.round((scores.correct / scores.total) * 100)
      }));

      setResults(calculatedResults);
      setIsCompleted(true);
      onComplete?.(calculatedResults);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Target className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Assessment Complete</h3>
            <p className="text-sm text-gray-600">Your skill evaluation results</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{result.skill}</h4>
                  <p className="text-sm text-gray-600">Skill Assessment</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    result.score >= 80 ? 'text-green-600' :
                    result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.score}%
                  </div>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">AI Analysis</span>
            </div>
            <p className="text-sm text-blue-700">
              Based on your assessment, we recommend focusing on areas with scores below 70%. 
              Personalized learning paths have been generated to address identified skill gaps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Adaptive Assessment</h3>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
              {currentQ.difficulty}
            </span>
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-xs text-gray-500 font-medium">Skill: {currentQ.skill}</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {currentQ.text}
            </h4>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full group-hover:border-purple-500 transition-colors flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="text-gray-900 group-hover:text-purple-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <AlertCircle className="h-4 w-4" />
          <span>Select your best answer to continue</span>
        </div>
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}