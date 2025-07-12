import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useAuth } from '@/contexts/AuthContext';
import AnswerForm from '@/components/AnswerForm';

const QuestionComments = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  // Mock answers data with voting
  const [answers, setAnswers] = useState([
    { 
      id: 1, 
      content: "Great explanation! Thanks for the detailed code example. This really helped me understand the authentication flow better. You can use React Context API for state management and create a custom hook for authentication.", 
      author: "user123", 
      timeAgo: "30 minutes ago",
      votes: 8,
      userVote: null as 'up' | 'down' | null,
      isAccepted: false
    },
    { 
      id: 2, 
      content: "This helped me solve my authentication issue. I was struggling with JWT token management and your approach made it much clearer. I'd recommend using a library like @tanstack/react-query for server state management.", 
      author: "developer_joe", 
      timeAgo: "15 minutes ago",
      votes: 12,
      userVote: null as 'up' | 'down' | null,
      isAccepted: true
    },
    { 
      id: 3, 
      content: "Could you explain more about the security considerations? Specifically, how do you handle token refresh and secure storage? Using httpOnly cookies is generally recommended for storing JWT tokens.", 
      author: "security_dev", 
      timeAgo: "10 minutes ago",
      votes: 5,
      userVote: null as 'up' | 'down' | null,
      isAccepted: false
    },
    { 
      id: 4, 
      content: "Perfect! This is exactly what I was looking for. The React Context approach is much cleaner than what I had before. You can also combine it with localStorage for persistence.", 
      author: "react_learner", 
      timeAgo: "5 minutes ago",
      votes: 3,
      userVote: null as 'up' | 'down' | null,
      isAccepted: false
    },
    { 
      id: 5, 
      content: "I've implemented this in my project and it works great. One question though - how would you handle role-based authentication? You might want to add role checking in your auth context.", 
      author: "fullstack_dev", 
      timeAgo: "3 minutes ago",
      votes: 7,
      userVote: null as 'up' | 'down' | null,
      isAccepted: false
    },
    { 
      id: 6, 
      content: "Thanks for sharing this! The code examples are very clear and easy to follow. This approach works well with TypeScript too.", 
      author: "junior_dev", 
      timeAgo: "1 minute ago",
      votes: 2,
      userVote: null as 'up' | 'down' | null,
      isAccepted: false
    },
  ]);

  const handleVote = (answerId: number, voteType: 'up' | 'down') => {
    setAnswers(prev => prev.map(answer => {
      if (answer.id === answerId) {
        const currentVote = answer.userVote;
        let newVotes = answer.votes;
        let newUserVote: 'up' | 'down' | null = voteType;

        // Calculate vote changes
        if (currentVote === voteType) {
          // Remove vote
          newUserVote = null;
          newVotes = voteType === 'up' ? newVotes - 1 : newVotes + 1;
        } else if (currentVote === null) {
          // Add vote
          newVotes = voteType === 'up' ? newVotes + 1 : newVotes - 1;
        } else {
          // Change vote
          newVotes = voteType === 'up' ? newVotes + 2 : newVotes - 2;
        }

        return { ...answer, votes: newVotes, userVote: newUserVote };
      }
      return answer;
    }));
  };

  const handleNewAnswer = (content: string) => {
    const newAnswer = {
      id: answers.length + 1,
      content,
      author: user?.username || 'Anonymous',
      timeAgo: 'just now',
      votes: 0,
      userVote: null as 'up' | 'down' | null,
      isAccepted: false
    };
    
    setAnswers(prev => [...prev, newAnswer]);
  };

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
            <BreadcrumbLink asChild>
              <Link to={`/question/${id}`} className="text-primary hover:text-primary/80">Question #{id}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-muted-foreground">Answers</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Link to={`/question/${id}`}>
          <Button variant="outline" size="sm" className="border-border hover:bg-accent hover:border-primary/30">
            <ArrowLeft size={16} className="mr-2" />
            Back to Question
          </Button>
        </Link>
      </div>

      {/* Comments Section */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
            All Answers ({answers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {answers.map((answer, index) => (
            <div 
              key={answer.id} 
              className={`p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border`}
            >
              <div className="flex items-start gap-3">
                {/* Voting */}
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleVote(answer.id, 'up')}
                    className={`p-1 h-8 w-8 ${answer.userVote === 'up' ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    <ChevronUp size={16} />
                  </Button>
                  <span className={`text-sm font-medium ${answer.votes > 0 ? 'text-green-600' : answer.votes < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {answer.votes}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={() => handleVote(answer.id, 'down')}
                    className={`p-1 h-8 w-8 ${answer.userVote === 'down' ? 'text-red-500 bg-accent' : 'text-muted-foreground hover:text-red-500'}`}
                  >
                    <ChevronDown size={16} />
                  </Button>
                </div>

                {/* Answer Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-3">
                    {answer.isAccepted && (
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    )}
                    <p className="text-sm sm:text-base text-foreground leading-relaxed">
                      {answer.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    <span className="font-medium text-primary">{answer.author}</span>
                    <span>•</span>
                    <span>{answer.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Answer Form */}
      <AnswerForm 
        questionId={parseInt(id || '1')} 
        onSubmit={handleNewAnswer} 
        onLoginRequired={() => {}} 
      />
    </div>
  );
};

export default QuestionComments;