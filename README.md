# Recipe Book Application : https://recipe-book-navy-mu.vercel.app/

A modern, responsive Recipe Book application built with React.js and Vite that allows users to discover, browse, and review delicious recipes from around the world using the Spoonacular Recipe API.

## 🍳 Project Overview

The Recipe Book application is a comprehensive recipe discovery platform that provides users with an intuitive interface to explore thousands of recipes. Users can search for specific dishes, filter by cuisine types and dietary preferences, view detailed recipe information, and contribute their own reviews and ratings.

### Key Features

- **Recipe Discovery**: Browse featured recipes and search for specific dishes
- **Advanced Filtering**: Filter recipes by cuisine, dietary preferences, and meal types
- **Detailed Recipe Views**: Complete recipe information including ingredients, instructions, and nutrition
- **Rating & Review System**: Rate recipes and leave detailed reviews for other users
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and interactions

## 🚀 Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### API Integration
- **Spoonacular Recipe API** - Comprehensive recipe and nutrition data
- **Fetch API** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
recipe-book/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage/
│   │   ├── FilterBar/
│   │   ├── LoadingSpinner/
│   │   ├── Navigation/
│   │   ├── RatingOverview/
│   │   ├── RecipeCard/
│   │   ├── ReviewForm/
│   │   ├── ReviewList/
│   │   ├── SearchBar/
│   │   └── StarRating/
│   ├── pages/
│   │   ├── Homepage/
│   │   └── RecipeDetails/
│   ├── services/
│   │   ├── api.js
│   │   └── reviewService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Spoonacular API key

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-book
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SPOONACULAR_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### Homepage
- **Featured Recipes**: Display of random popular recipes
- **Search Functionality**: Search recipes by name or ingredients
- **Advanced Filters**: Filter by cuisine, diet, and meal type
- **Recipe Cards**: Beautiful cards showing recipe previews with ratings

### Recipe Details Page
- **Complete Recipe Information**: Title, description, and high-quality images
- **Ingredients List**: Detailed list of all required ingredients
- **Step-by-Step Instructions**: Clear cooking instructions
- **Nutrition Information**: Detailed nutritional breakdown
- **User Reviews**: Display of user ratings and reviews
- **Interactive Rating**: Users can rate and review recipes

### Rating & Review System
- **Star Rating**: 5-star rating system with visual feedback
- **Written Reviews**: Detailed user reviews with timestamps
- **Rating Overview**: Aggregate rating display with distribution
- **Helpful Voting**: Users can mark reviews as helpful

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Cross-Browser**: Compatible with all modern browsers

## 🎨 Design Philosophy

The application follows modern design principles with:

- **Clean Typography**: Readable fonts with proper hierarchy
- **Consistent Color Scheme**: Warm colors (orange, green, blue) for different categories
- **Smooth Animations**: Subtle hover effects and transitions
- **Intuitive Navigation**: Clear navigation patterns and breadcrumbs
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔗 API Integration

### Spoonacular Recipe API
The application integrates with the Spoonacular Recipe API to provide:

- **Recipe Search**: Complex search with multiple parameters
- **Recipe Details**: Complete recipe information including nutrition
- **Random Recipes**: Featured recipes for homepage display
- **Filter Options**: Cuisine, diet, and meal type filtering

### Error Handling
- **Network Errors**: Graceful handling of connection issues
- **API Limits**: Clear messaging for quota exceeded scenarios
- **Invalid Responses**: Fallback content for missing data

## 🚀 Deployment

The application can be deployed to various platforms:

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your repository to Vercel
2. Set environment variables in project settings
3. Deploy automatically on push

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request


**Happy Cooking! 🍽️**
