
import { Book, User, UserRole } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Classic',
    description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    coverUrl: 'https://picsum.photos/seed/gatsby/400/600',
    isEBook: false,
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: '2',
    title: 'Digital Minimalism',
    author: 'Cal Newport',
    isbn: '9780525536512',
    category: 'Self-Help',
    description: 'A practical guide to finding focus in an increasingly noisy world.',
    coverUrl: 'https://picsum.photos/seed/minimalism/400/600',
    isEBook: true,
    content: 'Digital Minimalism is a philosophy of technology use in which you focus your online time on a small number of carefully selected and optimized activities that strongly support things you value, and then happily miss out on everything else...',
    totalCopies: 1,
    availableCopies: 1
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    category: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverUrl: 'https://picsum.photos/seed/atomic/400/600',
    isEBook: false,
    totalCopies: 10,
    availableCopies: 7
  }
];

export const MOCK_STUDENT: User = {
  id: 'student_1',
  name: 'Alex Johnson',
  role: UserRole.STUDENT,
  avatar: 'https://picsum.photos/seed/alex/100/100'
};

export const MOCK_LIBRARIAN: User = {
  id: 'lib_1',
  name: 'Sarah Librarian',
  role: UserRole.LIBRARIAN,
  avatar: 'https://picsum.photos/seed/sarah/100/100'
};
