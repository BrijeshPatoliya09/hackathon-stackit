
import { MessageSquare, Eye, Clock, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AnswersDialog from './AnswersDialog';

interface QuestionCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  answers: number;
  views: number;
  votes?: number;
  userVote?: 'up' | 'down' | null;
  tags: string[];
  timeAgo: string;
  isAccepted?: boolean;
  className?: string;
  onLoginRequired?: () => void;
  onVote?: (questionId: number, voteType: 'up' | 'down') => void;
  answersData?: Array<{
    id: number;
    content: string;
    author: string;
    votes: number;
    userVote?: 'up' | 'down' | null;
    timeAgo: string;
    isAccepted?: boolean;
  }>;
}

const QuestionCard = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  answers, 
  views, 
  votes = 0,
  userVote = null,
  tags, 
  timeAgo, 
  isAccepted = false,
  className = "",
  onLoginRequired,
  onVote,
  answersData = []
}: QuestionCardProps) => {
  const { isAuthenticated } = useAuth();
  const [isAnswersDialogOpen, setIsAnswersDialogOpen] = useState(false);


  const handleAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to answer questions.",
        variant: "destructive"
      });
      onLoginRequired?.();
      return;
    }

    // If user is authenticated and there are answers, show dialog
    if (answers > 0) {
      setIsAnswersDialogOpen(true);
    }
  };

  const handleAnswerVote = (answerId: number, voteType: 'up' | 'down') => {
    // Handle answer voting logic here
    console.log(`Vote ${voteType} for answer ${answerId}`);
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 border-0 bg-card/80 backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        <div className="w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <Link to={`/question/${id}`}>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                  {title}
                </h3>
              </Link>
              {isAccepted && (
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              )}
            </div>
            
            <div 
              className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: excerpt.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') 
              }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-transparent border-border text-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Meta Information */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Voting */}
                <div className="flex flex-col items-center gap-1 mr-2">
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onVote?.(id, 'up');
                    }}
                    className={`p-1 h-6 w-6 ${userVote === 'up' ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    <ChevronUp size={16} />
                  </Button>
                  <span className={`text-xs font-medium ${votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {votes}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onVote?.(id, 'down');
                    }}
                    className={`p-1 h-6 w-6 ${userVote === 'down' ? 'text-red-500 bg-accent' : 'text-muted-foreground hover:text-red-500'}`}
                  >
                    <ChevronDown size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                  <div 
                    className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={handleAnswer}
                  >
                    <MessageSquare size={16} />
                    <span className={`${answers > 0 ? 'font-medium text-primary' : ''} hidden sm:inline`}>
                      {answers} answers
                    </span>
                    <span className={`${answers > 0 ? 'font-medium text-primary' : ''} sm:hidden`}>
                      {answers}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span className="hidden sm:inline">{views} views</span>
                    <span className="sm:hidden">{views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="hidden sm:inline">{timeAgo}</span>
                    <span className="sm:hidden">{timeAgo.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  by <span className="font-medium text-primary">{author}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAnswer}
                  className="border-border hover:bg-accent hover:border-primary/30 text-primary text-xs sm:text-sm px-2 sm:px-3"
                >
                  <span className="hidden sm:inline">Answer</span>
                  <span className="sm:hidden">Reply</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Answers Dialog */}
      <AnswersDialog
        isOpen={isAnswersDialogOpen}
        onClose={() => setIsAnswersDialogOpen(false)}
        questionId={id}
        questionTitle={title}
        answers={answersData}
        onVote={handleAnswerVote}
      />
    </Card>
  );
};

export default QuestionCard;
