
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AnswerFormProps {
  questionId: number;
  onSubmit: (content: string) => void;
}

const AnswerForm = ({ questionId, onSubmit }: AnswerFormProps) => {
  const { isAuthenticated, user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to post an answer.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter your answer content.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(content.trim());
      setContent('');
      
      toast({
        title: "Answer Posted",
        description: "Your answer has been posted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 text-center">
          <p className="text-muted-foreground mb-4">Please log in to post an answer.</p>
          <Button variant="outline">
            Log In to Answer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="answer-content" className="block text-sm font-medium text-foreground mb-2">
              Your Answer
            </label>
            <Textarea
              id="answer-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your answer here... You can use @username to mention other users."
              className="min-h-[100px] sm:min-h-[120px]"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <p className="text-sm text-muted-foreground">
              Posting as <span className="font-medium text-primary">{user?.username}</span>
            </p>
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Posting...' : 'Post Answer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnswerForm;
