# Weather Dashboard

A comprehensive weather dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Get real-time weather information and 5-day forecasts for any city worldwide.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **API**: OpenWeatherMap API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your OpenWeatherMap API key to `.env.local`:
\`\`\`env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_API_KEY=your_api_key_here
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add the key to your environment variables

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── SearchBar.tsx     # Search functionality
│   ├── WeatherCard.tsx   # Current weather display
│   ├── ForecastCard.tsx  # 5-day forecast
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Zustand store
├── types/                # TypeScript type definitions
└── ...
\`\`\`

## Features in Detail

### Search & Weather Display
- Real-time weather data fetching
- Comprehensive weather information display
- Dynamic weather icons
- Error handling with user-friendly messages

### Search History
- Stores last 5 searched cities
- Persistent storage using localStorage
- One-click re-search functionality

### Responsive Design
- Mobile-first approach
- Smooth transitions between breakpoints
- Optimized for all device sizes

### Performance Optimizations
- Image optimization with Next.js Image component
- API response caching with SWR
- Efficient state management
- Code splitting and lazy loading

## API Integration

The application uses OpenWeatherMap API for:
- Current weather data
- 5-day weather forecast
- Weather icons and conditions

API calls are handled securely through Next.js API routes to protect API keys.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`