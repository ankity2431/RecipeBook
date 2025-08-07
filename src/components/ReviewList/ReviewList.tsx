import React, { useState } from 'react';
import { ThumbsUp, Calendar } from 'lucide-react';
import StarRating from '../StarRating/StarRating';
import {Review} from '../../Types/review';
import { markReviewHelpful } from '../../services/reviewService';

interface ReviewListProps {
  reviews: Review[];
  onReviewsUpdate: () => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onReviewsUpdate }) => {
  const [helpfulClicks, setHelpfulClicks] = useState<Set<string>>(new Set());

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulClicks.has(reviewId)) return;
    
    markReviewHelpful(reviewId);
    setHelpfulClicks(prev => new Set([...prev, reviewId]));
    onReviewsUpdate();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review this recipe!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-gray-800">{review.userName}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-sm text-gray-600">
                  {review.rating} out of 5 stars
                </span>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(review.date)}
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleHelpfulClick(review.id)}
              disabled={helpfulClicks.has(review.id)}
              className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                helpfulClicks.has(review.id)
                  ? 'text-green-600 cursor-default'
                  : 'text-gray-500 hover:text-green-600 cursor-pointer'
              }`}
            >
              <ThumbsUp className={`h-4 w-4 ${helpfulClicks.has(review.id) ? 'fill-current' : ''}`} />
              <span>
                Helpful ({review.helpful + (helpfulClicks.has(review.id) ? 1 : 0)})
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;