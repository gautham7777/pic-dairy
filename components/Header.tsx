
import React from 'react';

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center py-8 border-b-2 border-dashed border-[#EAE0D5]">
      <div className="flex justify-center items-center gap-4">
        <HeartIcon className="w-8 h-8 text-[#DAB88B]" />
        <h1 className="text-4xl md:text-5xl font-bold text-[#635343] font-serif italic">
          Our Photo Diary
        </h1>
        <HeartIcon className="w-8 h-8 text-[#DAB88B]" />
      </div>
      <p className="mt-4 text-lg text-gray-500">A collection of our favorite moments.</p>
    </header>
  );
};

export default Header;
