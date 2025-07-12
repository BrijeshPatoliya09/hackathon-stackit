import { useState } from "react";
import { Plus, TrendingUp, Clock, Users, Search, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../hooks/use-toast";
import QuestionCard from "../components/QuestionCard";
import AskQuestionModal from "../components/AskQuestionModal";
import LoginModal from "../components/LoginModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const questionsPerPage = 20;

  const handleAskQuestion = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to ask a question.",
        variant: "destructive",
      });
      setIsLoginModalOpen(true);
      return;
    }
    setIsAskQuestionModalOpen(true);
  };

  // Mock data for questions (expanded to show pagination)
  const allMockQuestions = Array.from({ length: 85 }, (_, index) => ({
    id: index + 1,
    title: `Sample Question ${
      index + 1
    }: How to implement authentication in React with TypeScript?`,
    excerpt:
      "I'm trying to set up user authentication in my React TypeScript project. I want to use JWT tokens and protect certain routes. What's the best approach?",
    author: `user_${index + 1}`,
    answers: Math.floor(Math.random() * 10),
    views: Math.floor(Math.random() * 500) + 50,
    tags: ["react", "typescript", "authentication", "jwt"],
    timeAgo: `${Math.floor(Math.random() * 24) + 1} hours ago`,
    isAccepted: Math.random() > 0.7,
  }));

  const filteredQuestions = allMockQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const filters = [
    { id: "unanswered", label: "Unanswered", count: 23 },
    { id: "newest", label: "Newest", count: 85 },
    { id: "answered", label: "Answered", count: 62 },
  ];

  const stats = [
    { label: "Total Questions", value: "1,234", icon: Clock },
    { label: "Active Users", value: "567", icon: Users },
    { label: "Answers Posted", value: "2,890", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ask New Questions
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Share knowledge and learn together with our community
          </p>
        </div>
        <Button
          onClick={handleAskQuestion}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={20} />
          Ask Question
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-200"
          >
            <CardContent className="flex items-center p-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mr-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search - Priority on mobile */}
            <div className="relative w-full order-1 sm:order-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl bg-white/50 text-sm h-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 w-full overflow-x-auto pb-1 order-2 sm:order-1">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700"
                      : "border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800"
                  }`}
                >
                  <Filter size={12} className="mr-1" />
                  <span>{filter.label}</span>
                  <Badge
                    variant="secondary"
                    className={`ml-1.5 border-0 text-xs ${
                      activeFilter === filter.id
                        ? "bg-white/20 text-current"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3 px-3 sm:pb-4 sm:px-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Questions
            </span>
            <Badge
              variant="outline"
              className="text-purple-600 border-purple-200 text-xs sm:text-sm self-start sm:self-center"
            >
              {filteredQuestions.length} result
              {filteredQuestions.length !== 1 ? "s" : ""}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-3 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  {...question}
                  className="hover:shadow-md transition-all duration-200 border-purple-100"
                />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  No questions found
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 sm:mt-8 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={`h-8 w-8 sm:h-10 sm:w-auto text-xs sm:text-sm ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-purple-50"
                      }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <PaginationItem key={pageNum} className="hidden sm:block">
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "hover:bg-purple-50"
                          }`}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Mobile: Show current page */}
                  <PaginationItem className="sm:hidden">
                    <span className="h-8 w-12 flex items-center justify-center text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md">
                      {currentPage}/{totalPages}
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={`h-8 w-8 sm:h-10 sm:w-auto text-xs sm:text-sm ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-purple-50"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AskQuestionModal
        isOpen={isAskQuestionModalOpen}
        onClose={() => setIsAskQuestionModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Home;
