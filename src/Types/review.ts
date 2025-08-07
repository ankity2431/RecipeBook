export interface Review {
    id: string;
    recipeId: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }
  
  export interface RecipeRating {
    recipeId: number;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  }