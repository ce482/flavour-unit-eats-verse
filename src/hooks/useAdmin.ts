
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't check admin status until auth is loaded and we have a user
    if (isLoadingAuth || !user) {
      if (!isLoadingAuth && !user) {
        // If auth is loaded but no user, we know they're not admin
        setIsAdmin(false);
        setIsLoading(false);
      }
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('Error checking admin status:', error);
          setError(`Error checking admin status: ${error.message}`);
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
          setError(null);
        }
      } catch (err) {
        console.error('Exception checking admin status:', err);
        setError('Failed to check admin status');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isLoadingAuth]);

  return { isAdmin, isLoading, error };
};
