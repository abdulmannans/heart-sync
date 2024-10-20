import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';

const themes = [
  { id: 'love', name: 'Love', description: 'Express your deep affection' },
  { id: 'lust', name: 'Lust', description: 'Ignite passion and desire' },
  { id: 'crush', name: 'Crush', description: 'Reveal your secret admiration' },
  { id: 'bff', name: 'BFF', description: 'Celebrate your friendship' },
];

const CreateLinkPage = () => {
  const [recipientName, setRecipientName] = useState('');
  const [theme, setTheme] = useState('love');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:5001/api/create-link', { name: recipientName, theme });
      setGeneratedLink(`${window.location.origin}/connect/${response.data.token}`);
    } catch (error) {
      console.error('Error creating link:', error);
      // TODO: Add user-friendly error handling
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HeartSync Link',
          text: 'Check out my HeartSync link!',
          url: generatedLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Create Your HeartSync Link</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                Recipient's Name or Username
              </label>
              <input
                type="text"
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500
                disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="Enter recipient's name or username"
                required
              />
            </div>
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Choose Theme
              </label>
              <div className="mt-1 space-y-2">
                {themes.map((t) => (
                  <div key={t.id} className="flex items-center">
                    <input
                      id={t.id}
                      name="theme"
                      type="radio"
                      checked={theme === t.id}
                      onChange={() => setTheme(t.id)}
                      className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300"
                    />
                    <label htmlFor={t.id} className="ml-3 block text-sm font-medium text-gray-700">
                      <span className="font-semibold">{t.name}</span> - {t.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Link'}
            </button>
          </form>
          <AnimatePresence>
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5
                }}
                className="mt-8 p-4 bg-gray-50 rounded-md"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Generated Link:</h2>
                <div className="flex items-center justify-between">
                  <a
                    href={generatedLink}
                    className="text-pink-600 hover:text-pink-800 break-all text-sm flex-grow mr-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {generatedLink}
                  </a>
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors duration-200"
                  >
                    <Share2 className="w-5 h-5 text-pink-600" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkPage;