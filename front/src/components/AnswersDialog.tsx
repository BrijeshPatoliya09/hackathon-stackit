import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Answer {
  id: number;
  content: string;
  author: string;
  votes: number;
  userVote?: 'up' | 'down' | null;
  timeAgo: string;
  isAccepted?: boolean;
}

interface AnswersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: number;
  questionTitle: string;
  answers: Answer[];
  onVote?: (answerId: number, voteType: 'up' | 'down') => void;
}

const AnswersDialog = ({ 
  isOpen, 
  onClose, 
  questionId, 
  questionTitle, 
  answers,
  onVote 
}: AnswersDialogProps) => {
  const { user } = useAuth();
  const displayedAnswers = answers.slice(0, 3);
  const hasMoreAnswers = answers.length > 3;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground line-clamp-2">
            Answers for: {questionTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {displayedAnswers.map((answer) => (
            <div 
              key={answer.id} 
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border"
            >
              <div className="flex items-start gap-3">
                {/* Voting */}
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => onVote?.(answer.id, 'up')}
                    className={`p-1 h-6 w-6 ${answer.userVote === 'up' ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    <ChevronUp size={14} />
                  </Button>
                  <span className={`text-xs font-medium ${answer.votes > 0 ? 'text-green-600' : answer.votes < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {answer.votes}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={() => onVote?.(answer.id, 'down')}
                    className={`p-1 h-6 w-6 ${answer.userVote === 'down' ? 'text-red-500 bg-accent' : 'text-muted-foreground hover:text-red-500'}`}
                  >
                    <ChevronDown size={14} />
                  </Button>
                </div>

                {/* Answer Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    {answer.isAccepted && (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                      {answer.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span className="font-medium text-primary">{answer.author}</span>
                    <span>•</span>
                    <span>{answer.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Show More Link */}
          {hasMoreAnswers && (
            <div className="text-center pt-4 border-t border-border">
              <Link to={`/question/${questionId}/answers`}>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-border hover:bg-accent hover:border-primary/30"
                >
                  Show all {answers.length} answers
                </Button>
              </Link>
            </div>
          )}

          {/* Add Answer Link */}
          <div className="text-center pt-2">
            <Link to={`/question/${questionId}`}>
              <Button 
                onClick={onClose}
                className="w-full"
              >
                Add Your Answer
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnswersDialog;