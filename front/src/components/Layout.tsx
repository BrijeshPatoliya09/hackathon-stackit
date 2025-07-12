
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Bell, User, Plus, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from '@/hooks/use-toast';
import LoginModal from './LoginModal';
import AskQuestionModal from './AskQuestionModal';
import ScrollToTop from './ScrollToTop';
import NotificationDropdown from './NotificationDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { unreadCount, markAllAsRead } = useNotifications();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAskQuestion = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to ask a question.",
        variant: "destructive"
      });
      setIsLoginModalOpen(true);
      return;
    }
    setIsAskQuestionModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/50 dark:from-background dark:via-background dark:to-blue-950/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md shadow-lg border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm sm:text-lg">S</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                StackIt
              </h1>
            </Link>

            {/* User Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {isAuthenticated && <NotificationDropdown />}

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-accent">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                          <User size={14} className="text-primary-foreground" />
                        </div>
                      )}
                      <span className="font-medium text-sm sm:text-base hidden sm:inline">{user?.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="border-border hover:bg-accent hover:border-primary/30"
                >
                  <User size={16} className="mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <main className="w-full">
          <Outlet />
        </main>
      </div>


      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <AskQuestionModal isOpen={isAskQuestionModalOpen} onClose={() => setIsAskQuestionModalOpen(false)} />
      
      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
