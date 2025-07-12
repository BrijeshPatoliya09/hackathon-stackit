import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuestionCard from '@/components/QuestionCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Question {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  answers: number;
  views: number;
  votes: number;
  tags: string[];
  timeAgo: string;
  isAccepted: boolean;
  userVote: 'up' | 'down' | null;
}

interface QuestionsListProps {
  questions: Question[];
  filteredQuestions: Question[];
  currentPage: number;
  questionsPerPage: number;
  onPageChange: (page: number) => void;
  onLoginRequired?: () => void;
  onVote?: (questionId: number, voteType: 'up' | 'down') => void;
}

const QuestionsList = ({
  questions,
  filteredQuestions,
  currentPage,
  questionsPerPage,
  onPageChange,
  onLoginRequired,
  onVote
}: QuestionsListProps) => {
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
      <CardHeader className="pb-4 px-4 sm:px-6">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-xl sm:text-2xl font-bold text-foreground">Questions</span>
          <Badge variant="outline" className="text-primary border-border text-xs sm:text-sm">
            {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question) => (
              <QuestionCard 
                key={question.id} 
                {...question} 
                className="hover:shadow-md transition-all duration-200 border-border"
                onLoginRequired={onLoginRequired}
                onVote={onVote}
                answersData={[
                  {
                    id: 1,
                    content: "You can use React Context API for state management and create a custom hook for authentication. Here's a basic implementation with JWT tokens.",
                    author: "jane_smith",
                    votes: 8,
                    timeAgo: "1 hour ago",
                    isAccepted: false
                  },
                  {
                    id: 2,
                    content: "I'd recommend using a library like @tanstack/react-query for server state management along with JWT tokens stored in httpOnly cookies for security.",
                    author: "dev_expert",
                    votes: 12,
                    timeAgo: "45 minutes ago",
                    isAccepted: true
                  },
                  {
                    id: 3,
                    content: "Another approach is to use libraries like Auth0 or Firebase Auth for a more robust authentication solution with built-in features.",
                    author: "security_dev",
                    votes: 6,
                    timeAgo: "30 minutes ago",
                    isAccepted: false
                  }
                ]}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-blue-100 dark:from-accent dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No questions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-accent'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => onPageChange(pageNum)}
                        isActive={currentPage === pageNum}
                        className={currentPage === pageNum 
                          ? 'bg-gradient-to-r from-primary to-blue-600 text-primary-foreground' 
                          : 'hover:bg-accent'
                        }
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-accent'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionsList;