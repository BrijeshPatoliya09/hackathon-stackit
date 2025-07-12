
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'answer' | 'comment' | 'mention';
  title: string;
  message: string;
  questionId?: number;
  answerId?: number;
  from: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    if (!isAuthenticated) return;
    
    const notification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Show toast notification
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate receiving notifications
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      // Simulate random notifications for demo
      if (Math.random() > 0.95) {
        const types = ['answer', 'comment', 'mention'] as const;
        const type = types[Math.floor(Math.random() * types.length)];
        
        const messages = {
          answer: {
            title: 'New Answer',
            message: 'Someone answered your question about React TypeScript.'
          },
          comment: {
            title: 'New Comment',
            message: 'Someone commented on your answer.'
          },
          mention: {
            title: 'You were mentioned',
            message: 'You were mentioned in a discussion.'
          }
        };
        
        addNotification({
          type,
          ...messages[type],
          from: 'user_demo',
          questionId: 1
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
