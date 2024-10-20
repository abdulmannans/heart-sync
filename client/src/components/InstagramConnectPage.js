import React, { useState, useEffect } from 'react';
import { Instagram, Heart, Star, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const themes = {
  lust: {
    icon: Heart,
    gradient: 'from-red-400 via-red-500 to-pink-500',
    textColor: 'text-red-800',
    buttonColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    title: 'Ignite Your Passion',
    description: 'A steamy surprise awaits. Connect to unleash the heat.',
  },
  love: {
    icon: Heart,
    gradient: 'from-pink-300 via-purple-300 to-indigo-400',
    textColor: 'text-purple-800',
    buttonColor: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    title: "Unlock Your Heart's Desire",
    description: 'A heartfelt gift crafted with love, just for you.',
  },
  crush: {
    icon: Star,
    gradient: 'from-yellow-200 via-pink-200 to-pink-400',
    textColor: 'text-pink-800',
    buttonColor: 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-400',
    title: 'Reveal Your Secret Admirer',
    description: 'Someone special has a crush on you. Discover who!',
  },
  bff: {
    icon: Users,
    gradient: 'from-green-300 via-blue-300 to-purple-400',
    textColor: 'text-blue-800',
    buttonColor: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
    title: 'Best Friends Forever',
    description: 'Your BFF has a surprise waiting. Time to celebrate your friendship!',
  },
};

const InstagramConnectPage = () => {
  const [theme, setTheme] = useState('love');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useParams();

  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/connect/${token}`);
        setName(response.data.name);
        setTheme(response.data.theme);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching link data:', error);
        setError('Invalid or expired link. Please try again.');
        setLoading(false);
      }
    };

    fetchLinkData();
  }, [token]);

  const currentTheme = themes[theme];
  const ThemeIcon = currentTheme.icon;

  const handleConnect = () => {
    // TODO: Implement Instagram OAuth flow
    console.log('Connecting to Instagram...');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center p-4`}>
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm md:max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <ThemeIcon className="text-white opacity-5 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 absolute -top-8 -left-8 sm:-top-12 sm:-left-12 md:-top-16 md:-left-16 transform -rotate-12" />
          <ThemeIcon className="text-white opacity-5 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 transform rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="text-center">
            <Instagram className={`mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 ${currentTheme.textColor}`} />
            <h2 className={`mt-2 sm:mt-3 md:mt-4 text-2xl sm:text-2xl md:text-3xl font-bold ${currentTheme.textColor}`}>{currentTheme.title}</h2>
            <p className={`mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg ${currentTheme.textColor}`}>
              {name}, {currentTheme.description}
            </p>
          </div>
          <div className="mt-6 sm:mt-7 md:mt-8">
            <button
              onClick={handleConnect}
              className={`w-full flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-transparent rounded-full shadow-sm text-base sm:text-lg font-medium text-white ${currentTheme.buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Connect to Instagram
            </button>
          </div>
          <p className={`mt-4 sm:mt-5 md:mt-6 text-center text-xs sm:text-sm ${currentTheme.textColor} opacity-75`}>
            Your privacy is our priority. Connect securely to unlock your special surprise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramConnectPage;