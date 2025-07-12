import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

interface ProtectedPageWrapperProps {
  children: React.ReactNode;
}

const ProtectedPageWrapper = ({ children }: ProtectedPageWrapperProps) => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Authentication Required</h1>
            <p className="text-muted-foreground">You need to be logged in to access this page.</p>
          </div>
        </div>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedPageWrapper;