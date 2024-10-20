import React, { useState } from 'react';

const InstagramLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 font-sans bg-white">
      <div className="w-full max-w-xs">
      <div className="flex justify-center mb-12">
            <div
              className="inline-block bg-no-repeat"
              style={{
                backgroundImage: "url(https://static.cdninstagram.com/rsrc.php/v3/ym/r/BQdTmxpRI6f.png)",
                backgroundPosition: "0px 0px",
                backgroundSize: "176px 181px",
                width: "175px",
                height: "51px"
              }}
              role="img"
              aria-label="Instagram"
            ></div>
        </div>
        <form className="space-y-2" action="#" method="POST">
          <div className="relative">
            <input
              type="text"
              required
              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
              placeholder="Phone number, username or email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute text-sm font-semibold text-gray-800 transform -translate-y-1/2 right-2 top-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-1.5 px-4 mt-2 rounded-md text-sm font-semibold text-white bg-blue-400 focus:outline-none"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm font-semibold text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center w-full mt-6 text-sm font-semibold text-blue-900"
        >
          <svg className="w-5 h-5 mr-2 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Log in with Facebook
        </button>

        <div className="mt-4 text-center">
          <a href="#" className="text-xs text-blue-900">
            Forgotten your password?
          </a>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <a href="#" className="font-semibold text-blue-900">
            Sign up
          </a>
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="mb-4 text-sm">Get the app.</p>
        <div className="flex justify-center space-x-2">
          <img 
            src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" 
            alt="Download from the App Store" 
            className="h-10"
          />
          <img 
            src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" 
            alt="Get it on Google Play" 
            className="h-10"
          />
        </div>
      </div>

      <footer className="mt-8 space-y-2 text-xs text-center text-gray-400">
        <div className="flex flex-wrap justify-center gap-x-2">
          <a href="#" className="hover:underline">Meta</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Locations</a>
          <a href="#" className="hover:underline">Instagram Lite</a>
          <a href="#" className="hover:underline">Threads</a>
          <a href="#" className="hover:underline">Contact uploading and non-users</a>
          <a href="#" className="hover:underline">Meta Verified</a>
        </div>
        <div className="flex items-center justify-center mt-4">
          <select className="mr-2 text-xs text-gray-400 bg-transparent">
            <option>English (UK)</option>
          </select>
          <span>© 2024 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
};

export default InstagramLoginPage;