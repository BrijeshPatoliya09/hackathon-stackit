import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Building a Better Developer Community: Our Vision for 2024",
      excerpt: "Learn about our plans to enhance StackIt's features and foster an even more inclusive environment for developers.",
      author: "Sarah Chen",
      date: "January 15, 2024",
      category: "Company",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Best Practices for Writing Great Questions",
      excerpt: "A comprehensive guide to asking questions that get helpful answers and contribute to the community.",
      author: "Mike Johnson",
      date: "January 10, 2024",
      category: "Tips",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 3,
      title: "Introducing Real-time Notifications",
      excerpt: "Stay up-to-date with answers to your questions and mentions in discussions with our new notification system.",
      author: "Alex Rodriguez",
      date: "December 20, 2023",
      category: "Product",
      readTime: "3 min read",
      featured: false
    },
    {
      id: 4,
      title: "How Code Reviews Improve Developer Skills",
      excerpt: "Exploring the benefits of peer code review and how it contributes to professional growth.",
      author: "Emily Davis",
      date: "December 15, 2023",
      category: "Development",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 5,
      title: "The Future of Remote Development Teams",
      excerpt: "Insights into how remote work is changing software development and what tools are essential.",
      author: "David Kim",
      date: "December 5, 2023",
      category: "Industry",
      readTime: "7 min read",
      featured: false
    }
  ];

  const categories = ["All", "Company", "Product", "Tips", "Development", "Industry"];

  return (
    <div className="min-h-screen space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          StackIt Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, updates, and stories from the developer community
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "default" : "outline"}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Post */}
      {posts.filter(post => post.featured).map((post) => (
        <Card key={post.id} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <Badge className="w-fit">Featured</Badge>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-lg">{post.excerpt}</p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            
            <Button asChild>
              <Link to={`/blog/${post.id}`}>
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Recent Posts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{post.excerpt}</p>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                </div>
                
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/blog/${post.id}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Subscribe to our newsletter to get the latest posts and updates delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;