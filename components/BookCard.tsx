
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAction: (book: Book) => void;
  actionLabel: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAction, actionLabel }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {book.isEBook && (
          <span className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            E-Book
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-outfit font-semibold text-slate-900 dark:text-white line-clamp-1">{book.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{book.author}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md">
            {book.category}
          </span>
          <span className={`text-[11px] font-bold ${book.availableCopies > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {book.availableCopies} available
          </span>
        </div>
        <button
          onClick={() => onAction(book)}
          className="w-full mt-4 py-2 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};
