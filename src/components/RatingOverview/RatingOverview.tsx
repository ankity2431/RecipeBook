import React from 'react';
import StarRating from '../StarRating/StarRating';
import {RecipeRating} from '../../Types/review';

interface RatingOverviewProps {
  rating: RecipeRating;
}

const RatingOverview: React.FC<RatingOverviewProps> = ({ rating }) => {
  if (rating.totalReviews === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        <div className="text-center py-4">
          <StarRating rating={0} size="lg" />
          <p className="text-gray-500 mt-2">No reviews yet</p>
        </div>
      </div>
    );
  }

  const getBarWidth = (count: number) => {
    return rating.totalReviews > 0 ? (count / rating.totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Reviews</h3>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{rating.averageRating}</div>
          <StarRating rating={rating.averageRating} size="lg" />
          <p className="text-sm text-gray-600 mt-1">
            {rating.totalReviews} review{rating.totalReviews !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 w-8">{stars}</span>
              <StarRating rating={1} maxRating={1} size="sm" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getBarWidth(rating.ratingDistribution[stars as keyof typeof rating.ratingDistribution])}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">
                {rating.ratingDistribution[stars as keyof typeof rating.ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;