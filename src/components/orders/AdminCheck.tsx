
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AdminCheckProps {
  children: ReactNode;
}

const AdminCheck = ({ children }: AdminCheckProps) => {
  const navigate = useNavigate();
  const { user, isLoading: isLoadingAuth } = useAuth();
  const { isAdmin, isLoading: isLoadingAdmin, error: adminError } = useAdmin();

  useEffect(() => {
    // Wait until both auth and admin checks are complete
    if (isLoadingAuth || isLoadingAdmin) {
      return;
    }

    // Check if user is authenticated
    if (!user) {
      toast.error('Please sign in to access this page');
      navigate('/auth');
      return;
    }

    // If authenticated but not admin, redirect
    if (!isAdmin) {
      toast.error('You need administrator access for this page');
      navigate('/');
    }

    // Show admin errors if any
    if (adminError) {
      console.error('Admin check error:', adminError);
    }
  }, [isAdmin, isLoadingAdmin, isLoadingAuth, user, adminError, navigate]);

  // Show loading until both auth and admin status are confirmed
  if (isLoadingAuth || isLoadingAdmin) {
    return <p>Loading authentication status...</p>;
  }

  // Don't render children if not admin
  if (!isAdmin) {
    return <p>You need administrator access to view this page.</p>;
  }

  return <>{children}</>;
};

export default AdminCheck;
