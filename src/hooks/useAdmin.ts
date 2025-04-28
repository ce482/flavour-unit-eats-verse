
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false); // Flag to prevent multiple checks

  useEffect(() => {
    // Skip if we've already checked or if auth is still loading
    if (hasChecked || isLoadingAuth) {
      return;
    }
    
    // If auth is loaded but no user, we know they're not admin
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      setHasChecked(true);
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
        setHasChecked(true);
      }
    };

    checkAdminStatus();
  }, [user, isLoadingAuth, hasChecked]);

  // Reset the check flag when the user changes
  useEffect(() => {
    if (!isLoadingAuth) {
      setHasChecked(false);
    }
  }, [user?.id]);

  return { isAdmin, isLoading, error };
};
