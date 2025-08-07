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

export interface FilterOptions {
  cuisine?: string;
  diet?: string;
  type?: string;
  intolerances?: string;
}

export const CUISINE_OPTIONS = [
  { value: 'italian', label: 'Italian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'indian', label: 'Indian' },
  { value: 'french', label: 'French' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'thai', label: 'Thai' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'american', label: 'American' },
  { value: 'korean', label: 'Korean' },
];

export const DIET_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten free', label: 'Gluten Free' },
  { value: 'ketogenic', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'whole30', label: 'Whole30' },
  { value: 'dairy free', label: 'Dairy Free' },
  { value: 'pescetarian', label: 'Pescetarian' },
];

export const MEAL_TYPE_OPTIONS = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'appetizer', label: 'Appetizer' },
  { value: 'snack', label: 'Snack' },
  { value: 'drink', label: 'Drinks' },
  { value: 'soup', label: 'Soup' },
];

export const searchRecipes = async (
  query: string = '',
  number: number = 12,
  offset: number = 0,
  filters: FilterOptions = {}
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

    // Add filter parameters
    if (filters.cuisine) params.append('cuisine', filters.cuisine);
    if (filters.diet) params.append('diet', filters.diet);
    if (filters.type) params.append('type', filters.type);
    if (filters.intolerances) params.append('intolerances', filters.intolerances);

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    
    if (!response.ok) {
      if (response.status === 402) {
        throw new Error('API quota exceeded. Please try again later or upgrade your plan.');
      }
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      throw new Error(`Failed to fetch recipes (${response.status}). Please try again later.`);
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
      if (response.status === 402) {
        throw new Error('API quota exceeded. Please try again later or upgrade your plan.');
      }
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      throw new Error(`Failed to fetch recipe details (${response.status}). Please try again later.`);
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
      if (response.status === 402) {
        throw new Error('API quota exceeded. Please try again later or upgrade your plan.');
      }
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      throw new Error(`Failed to fetch recipes (${response.status}). Please try again later.`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};