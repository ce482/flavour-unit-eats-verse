
import { useEffect, useState, useRef } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    // Skip if auth is still loading
    if (isLoadingAuth) {
      return;
    }
    
    // If auth is loaded but no user, we know they're not admin
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      setHasChecked(false);
      previousUserId.current = null;
      return;
    }

    // Skip if we've already checked for this specific user
    if (hasChecked && previousUserId.current === user.id) {
      return;
    }
    
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
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
        previousUserId.current = user.id;
      }
    };

    checkAdminStatus();
  }, [user, isLoadingAuth, hasChecked]);

  // We're removing this second effect as it's causing the infinite loop
  // Instead, we're tracking the previous user ID in the main effect

  return { isAdmin, isLoading, error };
};
