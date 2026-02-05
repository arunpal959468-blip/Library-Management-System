
export enum UserRole {
  STUDENT = 'STUDENT',
  LIBRARIAN = 'LIBRARIAN'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverUrl: string;
  isEBook: boolean;
  content?: string; // For ebooks
  totalCopies: number;
  availableCopies: number;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}
