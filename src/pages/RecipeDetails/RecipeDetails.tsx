import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Clock, Users, DollarSign, ChefHat, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { getRecipeDetails, RecipeDetails as RecipeDetailsType } from '../../services/api';
import { getReviewsForRecipe, getRecipeRating } from '../../services/reviewService';
import { Review, RecipeRating } from '../../Types/review';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import StarRating from '../../components/StarRating/StarRating';
import RatingOverview from '../../components/RatingOverview/RatingOverview';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import ReviewList from '../../components/ReviewList/ReviewList';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetailsType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<RecipeRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviewsAndRating = () => {
    if (!id) return;
    const recipeId = parseInt(id);
    setReviews(getReviewsForRecipe(recipeId));
    setRating(getRecipeRating(recipeId));
  };

  const fetchRecipeDetails = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getRecipeDetails(parseInt(id));
      setRecipe(data);
      loadReviewsAndRating();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  if (loading) return <LoadingSpinner text="Loading recipe details..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRecipeDetails} />;
  if (!recipe) return <ErrorMessage message="Recipe not found" />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-600 transition-colors duration-200">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{recipe.title}</span>
      </nav>

      {/* Recipe Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 sm:h-80 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          
          {rating && rating.totalReviews > 0 && (
            <div className="flex items-center space-x-3 mb-4">
              <StarRating rating={rating.averageRating} size="lg" />
              <span className="text-lg font-medium text-gray-700">
                {rating.averageRating} out of 5
              </span>
              <span className="text-gray-500">
                ({rating.totalReviews} review{rating.totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
          )}
          
          {recipe.summary && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {stripHtml(recipe.summary)}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {recipe.readyInMinutes && (
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="font-medium">{recipe.readyInMinutes} minutes</span>
              </div>
            )}
            
            {recipe.servings && (
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <span className="font-medium">{recipe.servings} servings</span>
              </div>
            )}
            
            {recipe.pricePerServing && (
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <span className="font-medium">${formatPrice(recipe.pricePerServing)} per serving</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {recipe.dishTypes?.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
            {recipe.diets?.map((diet, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {diet}
              </span>
            ))}
            {recipe.cuisines?.map((cuisine, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <ChefHat className="h-5 w-5 text-orange-500 mr-2" />
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.extendedIngredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">{ingredient.original}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
            {recipe.instructions ? (
              <div 
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <p className="text-gray-500 italic">Instructions not available for this recipe.</p>
            )}
          </div>
        </div>
      </div>

      {/* Nutrition Info */}
      {recipe.nutrition?.nutrients && recipe.nutrition.nutrients.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recipe.nutrition.nutrients.slice(0, 6).map((nutrient, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800">{nutrient.name}</p>
                <p className="text-lg font-bold text-orange-600">
                  {nutrient.amount.toFixed(1)}{nutrient.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-8 space-y-6">
        {rating && <RatingOverview rating={rating} />}
        
        <ReviewForm 
          recipeId={parseInt(id!)} 
          onReviewAdded={loadReviewsAndRating} 
        />
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Reviews ({reviews.length})
          </h3>
          <ReviewList 
            reviews={reviews} 
            onReviewsUpdate={loadReviewsAndRating} 
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Recipes</span>
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetails;