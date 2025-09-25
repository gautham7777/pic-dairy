export interface Memory {
  id: string;
  imageUrl: string; // Firebase Storage URL
  storagePath: string; // Path to the image in Firebase Storage for deletion
  caption: string;
  date: string; // ISO string
}