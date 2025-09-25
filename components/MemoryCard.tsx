import React from 'react';
import type { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
  onDelete: (memory: Memory) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.718c-1.126 0-2.037.954-2.037 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);


const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete }) => {
  const formattedDate = memory.date ? new Date(memory.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Just now';

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg group relative transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 break-inside-avoid mb-6 lg:mb-8">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
        <img
          src={memory.imageUrl}
          alt={memory.caption || 'A cherished memory'}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
        {memory.caption && (
          <p className="mt-1 font-serif italic text-lg text-gray-800">"{memory.caption}"</p>
        )}
      </div>
      <button
        onClick={() => onDelete(memory)}
        className="absolute top-2 right-2 p-2 bg-black bg-opacity-30 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        aria-label="Delete memory"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MemoryCard;