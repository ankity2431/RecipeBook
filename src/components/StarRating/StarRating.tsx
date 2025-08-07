import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isHalfFilled = starRating - 0.5 <= rating && starRating > rating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starRating)}
            disabled={!interactive}
            className={`relative ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-150 ${
              interactive ? 'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded' : ''
            }`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled || isHalfFilled
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } ${interactive ? 'hover:text-yellow-400' : ''} transition-colors duration-150`}
            />
            {isHalfFilled && (
              <Star
                className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400 absolute top-0 left-0`}
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;