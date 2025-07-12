import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageSquare, AtSign, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  useEffect(() => {
    // Mark all notifications as read when page is visited
    notifications.forEach(notification => {
      if (!notification.read) {
        markAsRead(notification.id);
      }
    });
  }, [notifications, markAsRead]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return <MessageSquare className="w-5 h-5 text-primary" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'mention':
        return <AtSign className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
      </div>

      {/* Notifications List */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            All Notifications
            <Badge variant="outline" className="ml-auto">
              {notifications.length} total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">When you receive notifications, they'll appear here.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
                  notification.read 
                    ? "bg-background border-border" 
                    : "bg-accent/20 border-primary/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground">{notification.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>from <span className="font-medium text-primary">{notification.from}</span></span>
                        {!notification.read && (
                          <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      
                      {notification.questionId && (
                        <Link to={`/question/${notification.questionId}`}>
                          <Button variant="outline" size="sm" className="text-xs">
                            View Question
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;