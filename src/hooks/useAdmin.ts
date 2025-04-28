
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAdmin = () => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't check admin status until auth is loaded
    if (isLoadingAuth) return;
    
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        setError('Not authenticated');
        return;
      }

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
