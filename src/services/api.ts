const API_KEY = '80e7c64f1b744e12a2844c4789bd2d5d';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  pricePerServing?: number;
}

export interface RecipeDetails extends Recipe {
  extendedIngredients: Array<{
    id: number;
    original: string;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: string;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
  dishTypes: string[];
  diets: string[];
  cuisines: string[];
}

export interface SearchResponse {
  results: Recipe[];
  totalResults: number;
}

export const searchRecipes = async (
  query: string = '',
  number: number = 12,
  offset: number = 0
): Promise<SearchResponse> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query,
      number: number.toString(),
      offset: offset.toString(),
      addRecipeInformation: 'true',
      fillIngredients: 'true',
    });

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};

export const getRecipeDetails = async (id: number): Promise<RecipeDetails> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeNutrition: 'true',
    });

    const response = await fetch(`${BASE_URL}/${id}/information?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error('Failed to fetch recipe details. Please try again later.');
  }
};

export const getRandomRecipes = async (number: number = 12): Promise<{ recipes: Recipe[] }> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: number.toString(),
    });

    const response = await fetch(`${BASE_URL}/random?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};