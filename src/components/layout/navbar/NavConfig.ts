import { useAuth } from '@/contexts/AuthContext';

// Define a function that returns navigation items based on auth state
export const getNavItems = (isAdmin: boolean) => {
  const baseItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Egg Rolls', path: '/egg-rolls' },
    { name: 'Le Petit Déjeuner', path: '/petit-dejeuner' },
    { name: 'Legacy Kitchen', path: '/legacy-kitchen' },
    { name: 'Cookbook', path: '/cookbook' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add Orders item only if user is admin
  if (isAdmin) {
    baseItems.splice(7, 0, { name: 'Orders', path: '/admin/orders' });
  }

  return baseItems;
};

// Keep the static reference to dark text routes
export const darkTextRoutes = [
  '/about', 
  '/faq', 
  '/cookbook', 
  '/legacy-kitchen', 
  '/contact', 
  '/petit-dejeuner',
  '/checkout',
  '/wholesale',
  '/admin/orders',
  '/auth'
];
