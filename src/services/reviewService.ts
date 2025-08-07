import { Review, RecipeRating } from '../Types/review';


// Mock data storage - in a real app, this would be a database
let reviews: Review[] = [
  {
    id: '1',
    recipeId: 715538,
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely delicious! The flavors were perfectly balanced and the instructions were easy to follow. My family loved it!',
    date: '2024-01-15',
    helpful: 12
  },
  {
    id: '2',
    recipeId: 715538,
    userName: 'Mike R.',
    rating: 4,
    comment: 'Great recipe! I made a few substitutions and it still turned out amazing. Will definitely make again.',
    date: '2024-01-10',
    helpful: 8
  },
  {
    id: '3',
    recipeId: 715538,
    userName: 'Emma L.',
    rating: 5,
    comment: 'This has become our go-to recipe for dinner parties. Always a crowd pleaser!',
    date: '2024-01-05',
    helpful: 15
  }
];

let nextId = 4;

export const getReviewsForRecipe = (recipeId: number): Review[] => {
  return reviews.filter(review => review.recipeId === recipeId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRecipeRating = (recipeId: number): RecipeRating => {
  const recipeReviews = reviews.filter(review => review.recipeId === recipeId);
  
  if (recipeReviews.length === 0) {
    return {
      recipeId,
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const totalRating = recipeReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / recipeReviews.length;

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  recipeReviews.forEach(review => {
    ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
  });

  return {
    recipeId,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: recipeReviews.length,
    ratingDistribution
  };
};

export const addReview = (review: Omit<Review, 'id' | 'date' | 'helpful'>): Review => {
  const newReview: Review = {
    ...review,
    id: nextId.toString(),
    date: new Date().toISOString().split('T')[0],
    helpful: 0
  };
  
  reviews.push(newReview);
  nextId++;
  
  return newReview;
};

export const markReviewHelpful = (reviewId: string): void => {
  const review = reviews.find(r => r.id === reviewId);
  if (review) {
    review.helpful++;
  }
};