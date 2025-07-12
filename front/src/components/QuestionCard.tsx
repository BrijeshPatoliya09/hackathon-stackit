
import { MessageSquare, Eye, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface QuestionCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  
  answers: number;
  views: number;
  tags: string[];
  timeAgo: string;
  isAccepted?: boolean;
  className?: string;
}

const QuestionCard = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  answers, 
  views, 
  tags, 
  timeAgo, 
  isAccepted = false,
  className = ""
}: QuestionCardProps) => {
  const { isAuthenticated } = useAuth();


  const handleAnswer = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to answer questions.",
        variant: "destructive"
      });
      return;
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        <div className="w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <Link to={`/question/${id}`}>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors cursor-pointer line-clamp-2">
                  {title}
                </h3>
              </Link>
              {isAccepted && (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              )}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200 transition-all duration-200 cursor-pointer border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Meta Information */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  <span className={answers > 0 ? 'font-medium text-green-600' : ''}>{answers} answers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{timeAgo}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">by <span className="font-medium text-purple-600">{author}</span></span>
                <Link to={`/question/${id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAnswer}
                    className="border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-purple-600"
                  >
                    Answer
                  </Button>
                </Link>
            </div>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
