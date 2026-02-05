
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Book, User, UserRole, BorrowRecord } from './types';
import { INITIAL_BOOKS, MOCK_STUDENT, MOCK_LIBRARIAN } from './constants';
import { ThemeToggle } from './components/ThemeToggle';
import { BookCard } from './components/BookCard';
import { EBookReader } from './components/EBookReader';
import { getBookEnrichment } from './services/geminiService';

// --- Shared Layout Component ---
const Layout: React.FC<{ 
  user: User; 
  onLogout: () => void; 
  children: React.ReactNode; 
  isDark: boolean; 
  setIsDark: (v: boolean) => void;
}> = ({ user, onLogout, children, isDark, setIsDark }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors`}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="font-outfit font-bold text-2xl tracking-tight">Lumina</span>
          </div>

          <nav className="space-y-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${location.pathname === '/' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/books" 
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${location.pathname === '/books' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              <span>Catalog</span>
            </Link>
            {user.role === UserRole.LIBRARIAN && (
              <>
                <Link 
                  to="/manage" 
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${location.pathname === '/manage' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Inventory</span>
                </Link>
                <Link 
                  to="/requests" 
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${location.pathname === '/requests' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                  <span>Requests</span>
                </Link>
              </>
            )}
            {user.role === UserRole.STUDENT && (
              <Link 
                to="/my-books" 
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${location.pathname === '/my-books' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                <span>Borrowed</span>
              </Link>
            )}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t dark:border-slate-800">
          <div className="flex items-center space-x-3 mb-6">
            <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Avatar" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate dark:text-white">{user.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b dark:border-slate-800 z-10">
          <h2 className="font-outfit font-bold text-lg text-slate-900 dark:text-white">
            {location.pathname === '/' ? 'Dashboard' : 
             location.pathname === '/books' ? 'Book Catalog' :
             location.pathname === '/manage' ? 'Manage Inventory' : 'Library'}
          </h2>
          <div className="flex items-center space-x-4">
             <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Quick Search..." 
                  className="pl-10 pr-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          {children}
        </section>
      </main>
    </div>
  );
};

// --- Sub-pages ---

const Home: React.FC<{ user: User; books: Book[]; borrows: BorrowRecord[] }> = ({ user, books, borrows }) => {
  const stats = useMemo(() => ({
    total: books.length,
    ebooks: books.filter(b => b.isEBook).length,
    activeBorrows: borrows.filter(r => r.status === 'BORROWED').length
  }), [books, borrows]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
           </div>
           <p className="text-slate-500 text-sm font-medium">Total Collection</p>
           <h3 className="text-3xl font-bold font-outfit mt-1 dark:text-white">{stats.total} Books</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <p className="text-slate-500 text-sm font-medium">E-Books Available</p>
           <h3 className="text-3xl font-bold font-outfit mt-1 dark:text-white">{stats.ebooks} Digital</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <p className="text-slate-500 text-sm font-medium">Active Loans</p>
           <h3 className="text-3xl font-bold font-outfit mt-1 dark:text-white">{stats.activeBorrows} Students</h3>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] text-white shadow-xl">
        <h2 className="text-3xl font-outfit font-bold mb-4">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="text-indigo-100 max-w-lg mb-6 leading-relaxed">
          {user.role === UserRole.LIBRARIAN 
            ? "Manage your collection efficiently. You have 3 pending borrow requests today."
            : "Explore over 5,000 titles in our digital and physical catalog. Your next adventure is just a click away."}
        </p>
        <div className="flex space-x-4">
           <Link to="/books" className="px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-2xl hover:shadow-lg transition-all">Browse Now</Link>
           {user.role === UserRole.LIBRARIAN && <Link to="/manage" className="px-6 py-2.5 bg-indigo-500/30 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-indigo-500/40 transition-all">Inventory</Link>}
        </div>
      </div>
    </div>
  );
};

const Catalog: React.FC<{ 
  books: Book[]; 
  onBorrow: (book: Book) => void;
  onRead: (book: Book) => void;
  role: UserRole;
}> = ({ books, onBorrow, onRead, role }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(b => {
    const matchesFilter = filter === 'All' || (filter === 'E-Books' ? b.isEBook : b.category === filter);
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', 'E-Books', ...Array.from(new Set(books.map(b => b.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
           {categories.map(cat => (
             <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:border-indigo-300'}`}
             >
               {cat}
             </button>
           ))}
        </div>
        <div className="relative w-full md:w-64">
           <input 
             type="text" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search title, author..." 
             className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-none shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
           />
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            onAction={book.isEBook ? onRead : onBorrow} 
            actionLabel={book.isEBook ? 'Read Now' : 'Borrow Book'}
          />
        ))}
      </div>
      
      {filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <p className="text-lg">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const ManageInventory: React.FC<{ 
  books: Book[]; 
  onAddBook: (b: Partial<Book>) => void;
  onDeleteBook: (id: string) => void;
}> = ({ books, onAddBook, onDeleteBook }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '', author: '', isbn: '', category: 'Classic', totalCopies: 1, availableCopies: 1, isEBook: false, description: '', content: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAISummarize = async () => {
    if (!newBook.title || !newBook.author) return;
    setIsGenerating(true);
    const result = await getBookEnrichment(newBook.title, newBook.author);
    if (result) {
      setNewBook(prev => ({ ...prev, description: result.summary }));
    }
    setIsGenerating(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({ 
      ...newBook, 
      id: Math.random().toString(36).substr(2, 9),
      coverUrl: `https://picsum.photos/seed/${Math.random()}/400/600`
    });
    setShowAddModal(false);
    setNewBook({ title: '', author: '', isbn: '', category: 'Classic', totalCopies: 1, availableCopies: 1, isEBook: false, description: '', content: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-outfit font-bold dark:text-white">Current Inventory</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-indigo-500 transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          <span>Add New Asset</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Book Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Availability</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {books.map(book => (
              <tr key={book.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={book.coverUrl} className="w-8 h-12 object-cover rounded shadow-sm" alt="Cover" />
                    <div>
                      <p className="font-semibold text-sm dark:text-white">{book.title}</p>
                      <p className="text-xs text-slate-500">{book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${book.isEBook ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {book.isEBook ? 'Digital' : 'Physical'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm dark:text-slate-300">{book.category}</td>
                <td className="px-6 py-4 text-sm dark:text-slate-300">
                   {book.availableCopies} / {book.totalCopies}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onDeleteBook(book.id)} className="text-slate-400 hover:text-rose-500 p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-8 border-b dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-2xl font-outfit font-bold dark:text-white">Add Library Resource</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
             </div>
             <form onSubmit={handleAddSubmit} className="p-8 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title</label>
                    <input required type="text" value={newBook.title} onChange={e => setNewBook(p => ({...p, title: e.target.value}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white" placeholder="Book Title" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Author</label>
                    <input required type="text" value={newBook.author} onChange={e => setNewBook(p => ({...p, author: e.target.value}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white" placeholder="Author Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">ISBN</label>
                    <input required type="text" value={newBook.isbn} onChange={e => setNewBook(p => ({...p, isbn: e.target.value}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white" placeholder="978-..." />
                  </div>
                </div>

                <div className="mb-4">
                   <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-400 uppercase">Description / AI Summary</label>
                      <button 
                        type="button" 
                        onClick={handleAISummarize} 
                        disabled={!newBook.title || !newBook.author || isGenerating}
                        className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center space-x-1 disabled:opacity-50"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         <span>{isGenerating ? 'Enriching...' : 'Auto-Generate with AI'}</span>
                      </button>
                   </div>
                   <textarea rows={3} value={newBook.description} onChange={e => setNewBook(p => ({...p, description: e.target.value}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white" placeholder="Short overview..." />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Resource Type</label>
                    <select value={newBook.isEBook ? 'true' : 'false'} onChange={e => setNewBook(p => ({...p, isEBook: e.target.value === 'true'}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white">
                      <option value="false">Physical Copy</option>
                      <option value="true">Digital E-Book</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Stock Level</label>
                    <input type="number" value={newBook.totalCopies} onChange={e => setNewBook(p => ({...p, totalCopies: parseInt(e.target.value), availableCopies: parseInt(e.target.value)}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white" min="1" />
                  </div>
                </div>

                {newBook.isEBook && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-Book Content (Text/Markdown)</label>
                    <textarea rows={5} value={newBook.content} onChange={e => setNewBook(p => ({...p, content: e.target.value}))} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border-none dark:text-white font-serif" placeholder="Paste full content here..." />
                  </div>
                )}

                <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all">Create Asset</button>
             </form>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Authentication Screen ---
const Auth: React.FC<{ onLogin: (u: User) => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
         <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white font-bold text-4xl mb-6 shadow-indigo-200 shadow-2xl">L</div>
            <h1 className="text-4xl font-outfit font-bold text-slate-900">Lumina</h1>
            <p className="text-slate-500 mt-2">Intelligent Library Systems</p>
         </div>

         <div className="space-y-4">
            <button 
              onClick={() => onLogin(MOCK_STUDENT)}
              className="w-full group relative overflow-hidden bg-white hover:bg-indigo-50 border-2 border-slate-100 hover:border-indigo-100 p-4 rounded-2xl transition-all flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">Student Access</p>
                <p className="text-xs text-slate-500">Browse and borrow resources</p>
              </div>
            </button>

            <button 
              onClick={() => onLogin(MOCK_LIBRARIAN)}
              className="w-full group relative overflow-hidden bg-white hover:bg-emerald-50 border-2 border-slate-100 hover:border-emerald-100 p-4 rounded-2xl transition-all flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">Librarian Access</p>
                <p className="text-xs text-slate-500">Manage assets and staff</p>
              </div>
            </button>
         </div>

         <p className="mt-12 text-center text-xs text-slate-400 font-medium">© 2024 Lumina Systems Group. All rights reserved.</p>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [borrows, setBorrows] = useState<BorrowRecord[]>([]);
  const [activeReading, setActiveReading] = useState<Book | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleBorrow = (book: Book) => {
    if (book.availableCopies > 0) {
      setBooks(prev => prev.map(b => b.id === book.id ? { ...b, availableCopies: b.availableCopies - 1 } : b));
      const newBorrow: BorrowRecord = {
        id: Math.random().toString(),
        bookId: book.id,
        studentId: user?.id || 'unknown',
        borrowDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'BORROWED'
      };
      setBorrows(prev => [...prev, newBorrow]);
      alert(`Success! "${book.title}" borrowed. Due: ${new Date(newBorrow.dueDate).toLocaleDateString()}`);
    } else {
      alert("No copies available at the moment.");
    }
  };

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <HashRouter>
      <Layout user={user} onLogout={() => setUser(null)} isDark={isDark} setIsDark={setIsDark}>
        <Routes>
          <Route path="/" element={<Home user={user} books={books} borrows={borrows} />} />
          <Route path="/books" element={<Catalog books={books} role={user.role} onBorrow={handleBorrow} onRead={setActiveReading} />} />
          <Route path="/manage" element={user.role === UserRole.LIBRARIAN ? <ManageInventory books={books} onAddBook={b => setBooks(prev => [b as Book, ...prev])} onDeleteBook={id => setBooks(prev => prev.filter(b => b.id !== id))} /> : <Home user={user} books={books} borrows={borrows} />} />
          <Route path="/my-books" element={
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-outfit dark:text-white">Your Borrowed Resources</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {borrows.filter(r => r.studentId === user.id && r.status === 'BORROWED').map(record => {
                  const book = books.find(b => b.id === record.bookId);
                  if (!book) return null;
                  return (
                    <div key={record.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <img src={book.coverUrl} className="w-full aspect-[2/3] object-cover rounded-2xl mb-4" alt="Cover" />
                      <h4 className="font-bold text-sm line-clamp-1 dark:text-white">{book.title}</h4>
                      <p className="text-xs text-rose-500 font-medium mt-1">Due: {new Date(record.dueDate).toLocaleDateString()}</p>
                      <button className="w-full mt-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">Return</button>
                    </div>
                  );
                })}
              </div>
              {borrows.filter(r => r.studentId === user.id && r.status === 'BORROWED').length === 0 && (
                <p className="text-slate-400 py-20 text-center">You haven't borrowed any books yet.</p>
              )}
            </div>
          } />
        </Routes>
      </Layout>
      {activeReading && <EBookReader book={activeReading} onClose={() => setActiveReading(null)} />}
    </HashRouter>
  );
};

export default App;
