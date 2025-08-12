import React from 'react';

interface ArcProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  className?: string;
  animated?: boolean;
}

const Arc: React.FC<ArcProps> = ({
  percentage,
  size = 200,
  strokeWidth = 12,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  className = '',
  animated = true
}) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clampedPercentage / 100);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={animated ? 'transition-all duration-1000 ease-out' : ''}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>

      {/* Percentage Text */}
      {showPercentage && (
        <div
          className="absolute w-full h-full flex flex-col items-center  justify-center"
          style={{
            width: size,
            height: size,
          }}
        >
          <span
            className="font-bold text-gray-700"
            style={{ fontSize: `${size * 0.12}px` }}
          >
            {Math.round(clampedPercentage)}%
          </span>
          <h1 className="text-xl font-bold">Completed</h1>
        </div>
      )}
    </div>
  );
};

export default Arc;
