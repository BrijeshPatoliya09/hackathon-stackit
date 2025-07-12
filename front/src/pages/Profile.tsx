
import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, MessageSquare, Eye, ArrowUp, Activity, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import QuestionCard from '@/components/QuestionCard';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    questionsAsked: 0,
    answersGiven: 0,
    reputation: 0,
    joinDate: 'January 2024',
    acceptRate: 0,
    totalViews: 0,
    weeklyActivity: 0
  });

  // Simulate loading user data dynamically
  useEffect(() => {
    const loadUserStats = () => {
      // Simulate API call with increasing numbers for dynamic effect
      const timer = setTimeout(() => {
        setStats({
          questionsAsked: Math.floor(Math.random() * 50) + 10,
          answersGiven: Math.floor(Math.random() * 100) + 20,
          reputation: Math.floor(Math.random() * 500) + 100,
          joinDate: 'January 2024',
          acceptRate: Math.floor(Math.random() * 40) + 60,
          totalViews: Math.floor(Math.random() * 5000) + 1000,
          weeklyActivity: Math.floor(Math.random() * 20) + 5
        });
      }, 500);
      return () => clearTimeout(timer);
    };
    loadUserStats();
  }, []);

  // Generate dynamic user questions based on current user
  const userQuestions = [
    {
      id: 1,
      title: "How to implement dynamic authentication in React with TypeScript?",
      excerpt: "**I'm trying to set up user authentication in my React TypeScript project with dynamic user data. What's the best approach for real-time updates and secure token management?**",
      author: user?.username || "user",
      votes: Math.floor(Math.random() * 30) + 5,
      answers: Math.floor(Math.random() * 10) + 1,
      views: Math.floor(Math.random() * 500) + 50,
      tags: ["react", "typescript", "authentication", "dynamic"],
      timeAgo: "2 hours ago",
      isAccepted: true
    },
    {
      id: 2,
      title: "Best practices for real-time state management in large React applications",
      excerpt: "**I'm working on a large React application with dynamic data updates. Should I use Redux, Zustand, or stick with Context API for real-time features? Need performance optimization tips.**",
      author: user?.username || "user",
      votes: Math.floor(Math.random() * 25) + 3,
      answers: Math.floor(Math.random() * 8) + 2,
      views: Math.floor(Math.random() * 400) + 80,
      tags: ["react", "state-management", "realtime", "redux"],
      timeAgo: "6 hours ago"
    },
    {
      id: 3,
      title: "How to optimize React component performance with dynamic data?",
      excerpt: "**My React components are re-rendering too often with dynamic data updates. What optimization techniques should I implement for better performance and user experience?**",
      author: user?.username || "user",
      votes: Math.floor(Math.random() * 20) + 8,
      answers: Math.floor(Math.random() * 6) + 1,
      views: Math.floor(Math.random() * 300) + 120,
      tags: ["react", "performance", "optimization", "dynamic"],
      timeAgo: "1 day ago"
    }
  ];

  // Generate dynamic user answers
  const userAnswers = [
    {
      id: 1,
      questionTitle: "How to optimize React component performance with dynamic updates?",
      answer: "**You can optimize React components by using React.memo, useMemo, and useCallback hooks appropriately. For dynamic data, consider implementing virtual scrolling and debouncing updates to reduce unnecessary re-renders.**",
      votes: Math.floor(Math.random() * 40) + 10,
      isAccepted: true,
      timeAgo: "3 hours ago"
    },
    {
      id: 2,
      questionTitle: "What's the difference between useState and useRef for dynamic content?",
      answer: "**useState triggers re-renders when the state changes, while useRef doesn't. For dynamic content that doesn't need to trigger renders, useRef is more efficient and prevents unnecessary component updates.**",
      votes: Math.floor(Math.random() * 30) + 5,
      isAccepted: false,
      timeAgo: "1 day ago"
    },
    {
      id: 3,
      questionTitle: "How to handle real-time data in React applications?",
      answer: "**For real-time data, you can use WebSockets, Server-Sent Events, or libraries like Socket.io. Combine with useEffect and useState for reactive updates, and consider using React Query for caching.**",
      votes: Math.floor(Math.random() * 35) + 15,
      isAccepted: true,
      timeAgo: "2 days ago"
    }
  ];

  // Recent activity timeline
  const recentActivity = [
    {
      id: 1,
      type: "question",
      title: "Asked: How to implement dynamic authentication?",
      time: "2 hours ago",
      icon: MessageSquare,
      color: "blue"
    },
    {
      id: 2,
      type: "answer",
      title: "Answered: React performance optimization",
      time: "5 hours ago",
      icon: CheckCircle,
      color: "green"
    },
    {
      id: 3,
      type: "vote",
      title: "Received 5 upvotes on your answer",
      time: "1 day ago",
      icon: ArrowUp,
      color: "purple"
    },
    {
      id: 4,
      type: "accepted",
      title: "Your answer was accepted",
      time: "2 days ago",
      icon: Award,
      color: "yellow"
    }
  ];

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary/5 via-background to-blue-50/50 dark:from-primary/10 dark:via-background dark:to-blue-950/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full" />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {user.username}
              </h1>
              <p className="text-muted-foreground flex items-center mt-2">
                <Mail size={16} className="mr-2" />
                {user.email}
              </p>
              <p className="text-muted-foreground flex items-center mt-1">
                <Calendar size={16} className="mr-2" />
                Member since {stats.joinDate}
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <Badge variant="secondary" className="flex items-center">
                  <Activity size={14} className="mr-1" />
                  {stats.weeklyActivity} activities this week
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  {stats.acceptRate}% accept rate
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="bg-background/80 backdrop-blur">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.questionsAsked}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.answersGiven}</p>
              <p className="text-sm text-muted-foreground">Answers</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.reputation}</p>
              <p className="text-sm text-muted-foreground">Reputation</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Profile Views</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2" />
            My Activity Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted rounded-lg p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="questions" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                My Questions ({userQuestions.length})
              </TabsTrigger>
              <TabsTrigger 
                value="answers" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                My Answers ({userAnswers.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="mr-2" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className={`p-2 rounded-full mr-4 ${
                            activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                            activity.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                            activity.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                            'bg-yellow-100 dark:bg-yellow-900/30'
                          }`}>
                            <IconComponent className={`w-4 h-4 ${
                              activity.color === 'blue' ? 'text-blue-600' :
                              activity.color === 'green' ? 'text-green-600' :
                              activity.color === 'purple' ? 'text-purple-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="questions" className="mt-6 animate-fade-in">
              <div className="space-y-4">
                {userQuestions.map((question, index) => (
                  <div key={question.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <QuestionCard {...question} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="answers" className="mt-6 animate-fade-in">
              <div className="space-y-4">
                {userAnswers.map((answer, index) => (
                  <Card 
                    key={answer.id} 
                    className="hover:shadow-md transition-all duration-200 hover-scale border-l-4 border-l-primary/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center hover:text-primary transition-colors cursor-pointer">
                        <MessageSquare size={16} className="mr-2 text-muted-foreground" />
                        {answer.questionTitle}
                      </h3>
                      <div 
                        className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: answer.answer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') 
                        }}
                      />
                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-green-600">
                            <ArrowUp size={14} className="text-green-600" />
                            <span className="text-sm font-medium">{answer.votes} votes</span>
                          </div>
                          {answer.isAccepted && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 animate-pulse">
                              <Award size={12} className="mr-1" />
                              Accepted Solution
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{answer.timeAgo}</span>
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
