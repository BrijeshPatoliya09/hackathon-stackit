import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Code, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          About StackIt
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Building a community where developers learn, share, and grow together
        </p>
      </div>

      {/* Mission */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg leading-relaxed">
            StackIt is dedicated to creating an inclusive platform where developers of all skill levels can ask questions, 
            share knowledge, and help each other solve coding challenges. We believe that the best way to learn is through 
            collaboration and community support.
          </p>
        </CardContent>
      </Card>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-primary" />
              Community First
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We prioritize building a supportive community where everyone feels welcome to contribute and learn.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code className="w-5 h-5 text-primary" />
              Quality Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We encourage high-quality questions and answers that provide real value to the developer community.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5 text-primary" />
              Open Source Spirit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We embrace the open source philosophy of sharing knowledge freely and collaborating openly.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            StackIt was born from the idea that every developer, regardless of their experience level, should have 
            access to a supportive community where they can grow their skills. Founded by developers for developers, 
            we understand the challenges of learning new technologies and solving complex problems.
          </p>
          <p className="text-muted-foreground">
            Our platform combines the best aspects of traditional Q&A sites with modern features designed to 
            facilitate meaningful connections and knowledge sharing among developers worldwide.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;