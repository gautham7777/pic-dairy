import React from 'react';
import type { Memory } from '../types';
import MemoryCard from './MemoryCard';

interface MemoryLaneProps {
  memories: Memory[];
  onDeleteMemory: (memory: Memory) => void;
}

const MemoryLane: React.FC<MemoryLaneProps> = ({ memories, onDeleteMemory }) => {
  if (memories.length === 0) {
    return (
      <div className="text-center py-20 px-6 bg-[#F7EFE5] rounded-xl border-2 border-dashed border-[#EAE0D5]">
        <h2 className="text-2xl font-serif text-[#635343] mb-2">Your Story Begins Here</h2>
        <p className="text-gray-500">Click "Add a New Memory" to save your first photo together.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} onDelete={onDeleteMemory} />
      ))}
    </div>
  );
};

export default MemoryLane;