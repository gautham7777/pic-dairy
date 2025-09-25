import React, { useState } from 'react';

interface AddMemoryFormProps {
  onAddMemory: (imageFile: File, caption: string) => Promise<void>;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);


const AddMemoryForm: React.FC<AddMemoryFormProps> = ({ onAddMemory }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image is too large. Please select a file under 5MB.');
        return;
      }
      setError('');
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please select an image to upload.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await onAddMemory(imageFile, caption);
      // Reset form state after successful submission
      setCaption('');
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Failed to add memory:", err);
      setError("Could not save memory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F7EFE5] p-6 sm:p-8 rounded-xl shadow-lg border border-[#EAE0D5]">
      <h2 className="text-2xl font-bold font-serif text-[#635343] mb-6 text-center">Share a new memory</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#C3B091] border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {preview ? (
                <img src={preview} alt="Image preview" className="mx-auto h-48 w-auto rounded-md object-contain" />
              ) : (
                <>
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400"/>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#C3B091] hover:text-[#b5a283] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#C3B091]">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
            Caption (optional)
          </label>
          <div className="mt-1">
            <textarea
              id="caption"
              name="caption"
              rows={3}
              className="shadow-sm focus:ring-[#C3B091] focus:border-[#C3B091] block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="What was special about this moment?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={isLoading || !imageFile}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DAB88B] hover:bg-[#c9a87a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAB88B] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save this Memory'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemoryForm;