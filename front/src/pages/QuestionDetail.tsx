
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, Eye, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from '@/hooks/use-toast';
import Answer from '@/components/Answer';
import AnswerForm from '@/components/AnswerForm';
import LoginModal from '@/components/LoginModal';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Mock question data
  const [question] = useState({
    id: parseInt(id || '1'),
    title: 'How to implement authentication in React with TypeScript?',
    content: "I'm trying to set up user authentication in my React TypeScript project. I want to use JWT tokens and protect certain routes. What's the best approach for handling authentication state management and protecting routes?",
    author: 'john_doe',
    
    views: 342,
    tags: ['react', 'typescript', 'authentication', 'jwt'],
    timeAgo: '2 hours ago',
    isAccepted: false
  });

  const [answers, setAnswers] = useState([
    {
      id: 1,
      content: "You can use React Context API for state management and create a custom hook for authentication. Here's a basic implementation:\n\n```typescript\nconst AuthContext = createContext();\n\nexport const useAuth = () => {\n  const context = useContext(AuthContext);\n  return context;\n};\n```\n\nThis approach allows you to manage authentication state globally and protect routes easily.",
      author: 'jane_smith',
      votes: 8,
      timeAgo: '1 hour ago',
      isAccepted: false
    },
    {
      id: 2,
      content: "I'd recommend using a library like @tanstack/react-query for server state management along with JWT tokens stored in httpOnly cookies for security. You can create protected route components that check authentication status before rendering.",
      author: 'dev_expert',
      votes: 12,
      timeAgo: '45 minutes ago',
      isAccepted: true
    }
  ]);


  const handleAcceptAnswer = (answerId: number) => {
    setAnswers(prev =>
      prev.map(answer => ({
        ...answer,
        isAccepted: answer.id === answerId
      }))
    );

    // Notify the answer author
    const answer = answers.find(a => a.id === answerId);
    if (answer) {
      addNotification({
        type: 'answer',
        title: 'Answer Accepted',
        message: `Your answer to "${question.title}" was accepted!`,
        from: user?.username || 'Anonymous',
        questionId: question.id,
        answerId
      });
    }
  };

  const handleNewAnswer = (content: string) => {
    const newAnswer = {
      id: answers.length + 1,
      content,
      author: user?.username || 'Anonymous',
      votes: 0,
      timeAgo: 'just now',
      isAccepted: false
    };
    
    setAnswers(prev => [...prev, newAnswer]);

    // Notify the question author if someone else answers
    if (user?.username !== question.author) {
      addNotification({
        type: 'answer',
        title: 'New Answer',
        message: `${user?.username} answered your question: "${question.title}"`,
        from: user?.username || 'Anonymous',
        questionId: question.id,
        answerId: newAnswer.id
      });
    }
  };

  const isQuestionOwner = user?.username === question.author;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-primary hover:text-primary/80">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-muted-foreground">Question #{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Question Card */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="w-full">
            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">{question.title}</h1>
              
              <div className="prose prose-sm sm:prose-lg max-w-none mb-4 sm:mb-6">
                <p className="text-foreground whitespace-pre-wrap">{question.content}</p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {question.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="bg-transparent border-border text-foreground hover:bg-accent hover:text-primary transition-all duration-200 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} className="sm:w-4 sm:h-4" />
                    <span>{answers.length} answer{answers.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} className="sm:w-4 sm:h-4" />
                    <span>{question.views} view{question.views !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    <span>{question.timeAgo}</span>
                  </div>
                </div>
                
                <span className="text-xs sm:text-sm text-muted-foreground">
                  asked by <span className="font-medium text-primary">{question.author}</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers Section */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
            {answers.length} Answer{answers.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
          {answers.map((answer) => (
            <Answer
              key={answer.id}
              {...answer}
              canAccept={isQuestionOwner && !answer.isAccepted}
              onAccept={handleAcceptAnswer}
              onLoginRequired={() => setIsLoginModalOpen(true)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Answer Form */}
      <AnswerForm questionId={question.id} onSubmit={handleNewAnswer} onLoginRequired={() => setIsLoginModalOpen(true)} />
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default QuestionDetail;
