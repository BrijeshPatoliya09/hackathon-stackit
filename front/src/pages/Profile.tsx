
import { useState } from 'react';
import { User, Mail, Calendar, Award, MessageSquare, Eye, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import QuestionCard from '@/components/QuestionCard';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('questions');

  // Mock user stats
  const userStats = {
    questionsAsked: 12,
    answersGiven: 28,
    reputation: 150,
    joinDate: 'January 2024'
  };

  // Mock user questions
  const userQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React with TypeScript?",
      excerpt: "I'm trying to set up user authentication in my React TypeScript project. I want to use JWT tokens and protect certain routes. What's the best approach?",
      author: user?.username || "john_doe",
      votes: 15,
      answers: 3,
      views: 234,
      tags: ["react", "typescript", "authentication", "jwt"],
      timeAgo: "2 hours ago",
      isAccepted: true
    },
    {
      id: 2,
      title: "Best practices for state management in large React applications",
      excerpt: "I'm working on a large React application and struggling with state management. Should I use Redux, Zustand, or stick with Context API?",
      author: user?.username || "john_doe",
      votes: 8,
      answers: 5,
      views: 156,
      tags: ["react", "state-management", "redux", "context-api"],
      timeAgo: "4 hours ago"
    }
  ];

  // Mock user answers
  const userAnswers = [
    {
      id: 1,
      questionTitle: "How to optimize React component performance?",
      answer: "You can optimize React components by using React.memo, useMemo, and useCallback hooks appropriately...",
      votes: 24,
      isAccepted: true,
      timeAgo: "1 day ago"
    },
    {
      id: 2,
      questionTitle: "What's the difference between let and const?",
      answer: "The main difference is that let allows reassignment while const doesn't. However, with objects and arrays...",
      votes: 12,
      isAccepted: false,
      timeAgo: "2 days ago"
    }
  ];

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full" />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <Mail size={16} className="mr-2" />
                {user.email}
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <Calendar size={16} className="mr-2" />
                Member since {userStats.joinDate}
              </p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.questionsAsked}</p>
              <p className="text-sm text-gray-600">Questions Asked</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.answersGiven}</p>
              <p className="text-sm text-gray-600">Answers Given</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-yellow-100 rounded-lg mr-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.reputation}</p>
              <p className="text-sm text-gray-600">Reputation</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-purple-100 rounded-lg mr-4">
              <ArrowUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">Accept Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Content */}
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">My Questions</TabsTrigger>
              <TabsTrigger value="answers">My Answers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="questions" className="mt-6">
              <div className="space-y-4">
                {userQuestions.map((question) => (
                  <QuestionCard key={question.id} {...question} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="answers" className="mt-6">
              <div className="space-y-4">
                {userAnswers.map((answer) => (
                  <Card key={answer.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {answer.questionTitle}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {answer.answer}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <ArrowUp size={14} />
                            <span className="text-sm">{answer.votes} votes</span>
                          </div>
                          {answer.isAccepted && (
                            <Badge className="bg-green-100 text-green-800">
                              Accepted
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{answer.timeAgo}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
