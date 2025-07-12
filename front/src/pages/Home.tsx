import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from '@/hooks/use-toast';
import AskQuestionModal from '@/components/AskQuestionModal';
import LoginModal from '@/components/LoginModal';
import PageHeader from '@/components/home/PageHeader';
import StatsCards from '@/components/home/StatsCards';
import FiltersAndSearch from '@/components/home/FiltersAndSearch';
import QuestionsList from '@/components/home/QuestionsList';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { addNotification } = useNotifications();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const questionsPerPage = 10;
  const questionIdRef = useRef(86); // Start from 86 since we have 85 initial questions

  // Sample question templates for real-time simulation
  const questionTemplates = [
    {
      title: "How to optimize React performance with large datasets?",
      excerpt: "I'm rendering thousands of items in my React app and it's getting slow. What are the best practices for optimization?",
      tags: ["react", "performance", "optimization"]
    },
    {
      title: "Understanding TypeScript generics with practical examples",
      excerpt: "I'm struggling to understand when and how to use TypeScript generics. Can someone explain with real-world examples?",
      tags: ["typescript", "generics", "tutorial"]
    },
    {
      title: "Best practices for state management in modern React apps",
      excerpt: "Should I use Redux, Zustand, or Context API for my new React project? What are the pros and cons?",
      tags: ["react", "state-management", "redux", "zustand"]
    },
    {
      title: "How to implement secure JWT authentication?",
      excerpt: "I want to implement JWT authentication but I'm concerned about security. What are the best practices?",
      tags: ["authentication", "jwt", "security"]
    },
    {
      title: "CSS Grid vs Flexbox: When to use which?",
      excerpt: "I'm confused about when to use CSS Grid versus Flexbox. Can someone explain the differences and use cases?",
      tags: ["css", "grid", "flexbox", "layout"]
    }
  ];

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decide whether to add a new question (30% chance every 15 seconds)
      if (Math.random() < 0.3) {
        const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        const newQuestion = {
          id: questionIdRef.current++,
          title: template.title,
          excerpt: template.excerpt,
          author: `user_${Math.floor(Math.random() * 1000) + 100}`,
          answers: 0,
          views: Math.floor(Math.random() * 20) + 1,
          votes: Math.floor(Math.random() * 5),
          tags: template.tags,
          timeAgo: "just now",
          isAccepted: false,
          userVote: null as 'up' | 'down' | null
        };

        setAllMockQuestions(prev => [newQuestion, ...prev]);

        // Show toast notification for new question
        toast({
          title: "New Question Posted",
          description: `"${newQuestion.title.substring(0, 50)}${newQuestion.title.length > 50 ? '...' : ''}"`,
          duration: 4000
        });
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAskQuestion = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to ask a question.",
        variant: "destructive"
      });
      setIsLoginModalOpen(true);
      return;
    }
    setIsAskQuestionModalOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setActiveFilter('all');
    setCurrentPage(1);
  };

  // Handle new question added from modal
  const handleQuestionAdded = (newQuestion: any) => {
    setAllMockQuestions(prev => [newQuestion, ...prev]);
  };

  // Mock data for questions (expanded to show pagination)
  const [allMockQuestions, setAllMockQuestions] = useState(Array.from({ length: 85 }, (_, index) => ({
    id: index + 1,
    title: `Sample Question ${index + 1}: How to implement authentication in React with TypeScript?`,
    excerpt: "I'm trying to set up user authentication in my React TypeScript project. I want to use JWT tokens and protect certain routes. What's the best approach?",
    author: `user_${index + 1}`,
    answers: Math.floor(Math.random() * 10),
    views: Math.floor(Math.random() * 500) + 50,
    votes: Math.floor(Math.random() * 20) - 10, // Can have negative votes
    tags: ["react", "typescript", "authentication", "jwt"],
    timeAgo: `${Math.floor(Math.random() * 24) + 1} hours ago`,
    isAccepted: Math.random() > 0.7,
    userVote: null as 'up' | 'down' | null // Track user's vote
  })));

  // Handle voting on questions
  const handleVote = (questionId: number, voteType: 'up' | 'down') => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to vote on questions.",
        variant: "destructive"
      });
      setIsLoginModalOpen(true);
      return;
    }

    setAllMockQuestions(prev => prev.map(question => {
      if (question.id === questionId) {
        let newVotes = question.votes;
        let newUserVote: 'up' | 'down' | null = voteType;

        // Remove previous vote if exists
        if (question.userVote === 'up') newVotes--;
        if (question.userVote === 'down') newVotes++;

        // Apply new vote
        if (voteType === 'up') {
          newVotes++;
          if (question.userVote === 'up') {
            newVotes--; // Remove upvote if clicking again
            newUserVote = null;
          }
        } else {
          newVotes--;
          if (question.userVote === 'down') {
            newVotes++; // Remove downvote if clicking again
            newUserVote = null;
          }
        }

        // Notify question owner about the vote (only if it's a new vote, not removing a vote)
        if (question.author !== user?.username && newUserVote !== null) {
          addNotification({
            type: 'answer',
            title: `Question ${voteType === 'up' ? 'Upvoted' : 'Downvoted'}`,
            message: `${user?.username} ${voteType === 'up' ? 'upvoted' : 'downvoted'} your question: "${question.title.length > 50 ? question.title.substring(0, 50) + '...' : question.title}"`,
            from: user?.username || 'Anonymous',
            questionId: question.id
          });
        }

        return { ...question, votes: newVotes, userVote: newUserVote };
      }
      return question;
    }));
  };

  const filteredQuestions = allMockQuestions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filters = [
    { id: 'all', label: 'All', count: 85 },
    { id: 'unanswered', label: 'Unanswered', count: 23 },
    { id: 'newest', label: 'Newest', count: 85 },
    { id: 'answered', label: 'Answered', count: 62 }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <PageHeader onAskQuestion={handleAskQuestion} />

      {/* Stats Cards */}
      <StatsCards />

      {/* Filters and Search */}
      <FiltersAndSearch
        filters={filters}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        isMobileFilterOpen={isMobileFilterOpen}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onMobileFilterOpenChange={setIsMobileFilterOpen}
        onClearFilter={clearFilter}
      />

      {/* Questions List */}
      <QuestionsList
        questions={allMockQuestions}
        filteredQuestions={filteredQuestions}
        currentPage={currentPage}
        questionsPerPage={questionsPerPage}
        onPageChange={setCurrentPage}
        onLoginRequired={() => setIsLoginModalOpen(true)}
        onVote={handleVote}
      />

      {/* Modals */}
      <AskQuestionModal 
        isOpen={isAskQuestionModalOpen} 
        onClose={() => setIsAskQuestionModalOpen(false)}
        onQuestionAdded={handleQuestionAdded}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Home;