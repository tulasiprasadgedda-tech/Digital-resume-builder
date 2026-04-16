import { motion } from 'framer-motion';
import { calculateScore } from '../utils/scoreCalculator';

const ResumeScore = ({ resumeData }) => {
  const scoreData = calculateScore(resumeData);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (scoreData.percentage / 100) * circumference;
  
  const gradeColors = {
    'A+': '#10b981', 'A': '#10b981', 'B': '#6366f1',
    'C': '#f59e0b', 'D': '#f97316', 'F': '#ef4444'
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-text dark:text-text-dark mb-4">Resume Score</h3>
      
      {/* Circular progress */}
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-700" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none"
              stroke={gradeColors[scoreData.grade]}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold"
              style={{ color: gradeColors[scoreData.grade] }}
            >
              {scoreData.percentage}%
            </motion.span>
            <span className="text-xs text-text-muted">Grade: {scoreData.grade}</span>
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="space-y-2.5">
        {Object.entries(scoreData.breakdown).map(([key, data]) => (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-muted dark:text-gray-400">{data.label}</span>
              <span className="font-medium text-text dark:text-text-dark">{data.score}/{data.max}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(data.score / data.max) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${gradeColors[scoreData.grade]}, ${gradeColors[scoreData.grade]}88)` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      {scoreData.tips.length > 0 && (
        <div className="mt-4 space-y-1.5">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tips</h4>
          {scoreData.tips.slice(0, 3).map((tip, i) => (
            <p key={i} className="text-xs text-text-muted dark:text-gray-400 flex items-start gap-1.5">
              <span className="text-amber-500 mt-0.5">💡</span>
              {tip}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeScore;
