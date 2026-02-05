
import React from 'react';
import { Book } from '../types';

interface EBookReaderProps {
  book: Book;
  onClose: () => void;
}

export const EBookReader: React.FC<EBookReaderProps> = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/90 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl h-full max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        <div className="p-4 border-b dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">{book.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Reading Mode</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 font-serif text-lg leading-relaxed text-slate-800 dark:text-slate-200">
          <div className="max-w-2xl mx-auto">
             <div className="mb-12 text-center">
                <img src={book.coverUrl} className="w-48 mx-auto rounded-lg shadow-lg mb-6" alt="Cover" />
                <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-slate-500">By {book.author}</p>
             </div>
             {book.content?.split('\n').map((para, i) => (
               <p key={i} className="mb-6">{para}</p>
             ))}
             <div className="h-24"></div> {/* Spacer */}
          </div>
        </div>
        
        <div className="p-4 border-t dark:border-slate-800 flex justify-center space-x-4">
           <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-white">Previous Page</button>
           <button className="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-500">Next Page</button>
        </div>
      </div>
    </div>
  );
};
