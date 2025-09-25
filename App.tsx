import React, { useState, useEffect, useCallback } from 'react';
import type { Memory } from './types';
import Header from './components/Header';
import AddMemoryForm from './components/AddMemoryForm';
import MemoryLane from './components/MemoryLane';

import { db, storage } from './firebase/config';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const App: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'memories'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memoriesData: Memory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        memoriesData.push({
          id: doc.id,
          imageUrl: data.imageUrl,
          storagePath: data.storagePath,
          caption: data.caption,
          date: data.date?.toDate().toISOString(),
        });
      });
      setMemories(memoriesData);
      setIsLoading(false);
    }, (err) => {
      console.error(err);
      setError("Failed to load memories. Have you configured firebase/config.ts?");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addMemory = useCallback(async (imageFile: File, caption: string) => {
    const storagePath = `images/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(storage, storagePath);

    // 1. Upload file to Firebase Storage
    const uploadResult = await uploadBytes(storageRef, imageFile);
    
    // 2. Get the public download URL
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // 3. Add memory metadata to Firestore
    await addDoc(collection(db, 'memories'), {
      imageUrl,
      caption,
      storagePath,
      date: serverTimestamp(),
    });

    setIsFormVisible(false);
  }, []);

  const deleteMemory = useCallback(async (memory: Memory) => {
    if (!memory.id) return;
    try {
      // 1. Delete the document from Firestore
      await deleteDoc(doc(db, 'memories', memory.id));
      
      // 2. Delete the image file from Firebase Storage
      const storageRef = ref(storage, memory.storagePath);
      await deleteObject(storageRef);
    } catch (err) {
      console.error("Error deleting memory:", err);
      // Optionally set an error state to show in the UI
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-serif text-[#635343]">Loading our memories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-lg">
          <strong className="font-bold">Oh no!</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <p className="text-sm mt-2 text-gray-700">Please make sure you've added your project credentials to the `firebase/config.ts` file and that your Firestore security rules are correctly set up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#4A4A4A] bg-[#FFFBF5]">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">
        <Header />

        <div className="text-center my-8">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-[#C3B091] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#b5a283] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C3B091] focus:ring-offset-[#FFFBF5]"
          >
            {isFormVisible ? 'Close Form' : 'Add a New Memory'}
          </button>
        </div>

        {isFormVisible && (
          <div className="mb-12">
            <AddMemoryForm onAddMemory={addMemory} />
          </div>
        )}
        
        <MemoryLane memories={memories} onDeleteMemory={deleteMemory} />
      </div>
       <footer className="text-center p-4 text-gray-400 text-sm mt-8">
            <p>Made with love, for my love ❤️</p>
        </footer>
    </div>
  );
};

export default App;