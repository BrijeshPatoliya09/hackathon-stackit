
import { ArrowUp, ArrowDown, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

interface AnswerProps {
  id: number;
  content: string;
  author: string;
  votes: number;
  timeAgo: string;
  isAccepted?: boolean;
  canAccept?: boolean;
  onAccept?: (answerId: number) => void;
  className?: string;
  onLoginRequired?: () => void;
}

const Answer = ({ 
  id, 
  content, 
  author, 
  votes: initialVotes, 
  timeAgo, 
  isAccepted = false,
  canAccept = false,
  onAccept,
  className = "",
  onLoginRequired
}: AnswerProps) => {
  const { isAuthenticated } = useAuth();
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  
  // Mock comments data
  const [comments] = useState([
    { id: 1, content: "Great explanation! Thanks for the detailed code example.", author: "user123", timeAgo: "30 minutes ago" },
    { id: 2, content: "This helped me solve my authentication issue.", author: "developer_joe", timeAgo: "15 minutes ago" },
    { id: 3, content: "Could you explain more about the security considerations?", author: "security_dev", timeAgo: "10 minutes ago" },
    { id: 4, content: "Perfect! This is exactly what I was looking for.", author: "react_learner", timeAgo: "5 minutes ago" },
  ]);

  const handleVote = (type: 'up' | 'down') => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to vote on answers.",
        variant: "destructive"
      });
      onLoginRequired?.();
      return;
    }
    
    let newVotes = votes;
    
    if (userVote === type) {
      // Remove vote
      newVotes = type === 'up' ? votes - 1 : votes + 1;
      setUserVote(null);
    } else if (userVote === null) {
      // Add vote
      newVotes = type === 'up' ? votes + 1 : votes - 1;
      setUserVote(type);
    } else {
      // Change vote
      newVotes = type === 'up' ? votes + 2 : votes - 2;
      setUserVote(type);
    }
    
    setVotes(newVotes);
    
    toast({
      title: `Vote ${type === 'up' ? 'Up' : 'Down'}`,
      description: `You voted ${type} on this answer.`,
    });
  };

  const handleAccept = () => {
    if (!canAccept || !onAccept) return;
    
    onAccept(id);
    toast({
      title: "Answer Accepted",
      description: "This answer has been marked as accepted.",
    });
  };

  return (
    <Card className={`border-l-4 ${isAccepted ? 'border-l-primary bg-primary/5' : 'border-l-border'} ${className}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Vote Section */}
          <div className="flex flex-row sm:flex-col items-center justify-center sm:items-center gap-3 sm:gap-2 min-w-fit sm:min-w-[60px] order-2 sm:order-1 bg-muted/30 sm:bg-transparent rounded-lg sm:rounded-none p-2 sm:p-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('up')}
              className={`p-2 transition-colors ${
                userVote === 'up' 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary' 
                  : 'hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <ArrowUp size={16} className="sm:w-5 sm:h-5" />
            </Button>
            
            <div className="flex items-center justify-center min-w-[32px] sm:min-w-[40px] py-1 sm:py-2">
              <span className="text-sm sm:text-base font-semibold text-foreground">
                {votes}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('down')}
              className={`p-2 transition-colors ${
                userVote === 'down' 
                  ? 'bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive' 
                  : 'hover:bg-destructive/10 hover:text-destructive'
              }`}
            >
              <ArrowDown size={16} className="sm:w-5 sm:h-5" />
            </Button>
            
            {/* Accept Button */}
            {canAccept && !isAccepted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAccept}
                className="p-2 hover:bg-primary/10 hover:text-primary transition-colors"
                title="Accept this answer"
              >
                <CheckCircle2 size={16} className="sm:w-5 sm:h-5" />
              </Button>
            )}
            
            {/* Accepted Badge */}
            {isAccepted && (
              <div className="flex flex-row sm:flex-col items-center gap-1 sm:gap-0">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                <span className="text-xs text-primary font-medium">Accepted</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 order-1 sm:order-2">
            {/* Answer Content */}
            <div className="prose prose-sm max-w-none mb-4">
              <p className="text-foreground whitespace-pre-wrap text-sm sm:text-base">{content}</p>
            </div>
            
            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={14} className="sm:w-4 sm:h-4" />
                  <span>{timeAgo}</span>
                </div>
                
                {/* Comments */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary hover:bg-accent p-1 h-auto"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      {comments.length} answer{comments.length !== 1 ? 's' : ''}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Answers ({comments.length})</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {comments.slice(0, 3).map((comment) => (
                        <div key={comment.id} className="border-b border-border pb-3 last:border-b-0">
                          <p className="text-sm text-foreground mb-2">{comment.content}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium text-primary">{comment.author}</span>
                            <span>•</span>
                            <span>{comment.timeAgo}</span>
                          </div>
                        </div>
                      ))}
                      {comments.length > 3 && (
                        <Link 
                          to={`/question/1/comments`} 
                          className="block text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Show all {comments.length} answers →
                        </Link>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  by <span className="font-medium text-primary">{author}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Answer;
