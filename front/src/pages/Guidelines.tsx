import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Users, MessageSquare, Heart } from 'lucide-react';

const Guidelines = () => {
  return (
    <div className="min-h-screen space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Community Guidelines
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Building a respectful and helpful community for all developers
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5 text-red-500" />
              Be Kind & Respectful
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Treat all community members with respect, regardless of their experience level or background.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-blue-500" />
              Help Others Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Share knowledge generously and help others grow their skills through constructive feedback.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5 text-green-500" />
              Stay On Topic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Keep discussions focused on programming, development, and technology-related topics.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Question Guidelines */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Asking Great Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Do
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Write clear, descriptive titles
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Provide relevant code examples
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Explain what you've tried
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Include error messages
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use appropriate tags
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Search for similar questions first
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Don't
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Ask multiple questions in one post
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Post homework without effort
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Use vague titles like "Help me"
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Post screenshots of code
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Include personal information
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Post duplicate questions
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answer Guidelines */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Writing Helpful Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Do
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Provide working code examples
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Explain your solution
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Test your code before posting
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Be constructive and helpful
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Reference documentation
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Don't
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Post "just Google it" responses
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Criticize without helping
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Provide untested code
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Copy answers without attribution
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Answer off-topic questions
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prohibited Content */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Prohibited Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The following types of content are not allowed on StackIt:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Badge variant="destructive" className="text-xs">Banned</Badge>
                <div>
                  <h4 className="font-semibold text-sm">Harassment & Abuse</h4>
                  <p className="text-muted-foreground text-xs">Personal attacks, bullying, or discriminatory language</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="destructive" className="text-xs">Banned</Badge>
                <div>
                  <h4 className="font-semibold text-sm">Spam & Self-Promotion</h4>
                  <p className="text-muted-foreground text-xs">Excessive self-promotion or irrelevant content</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="destructive" className="text-xs">Banned</Badge>
                <div>
                  <h4 className="font-semibold text-sm">Illegal Content</h4>
                  <p className="text-muted-foreground text-xs">Content that violates laws or regulations</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Badge variant="destructive" className="text-xs">Banned</Badge>
                <div>
                  <h4 className="font-semibold text-sm">Plagiarism</h4>
                  <p className="text-muted-foreground text-xs">Copying content without proper attribution</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="destructive" className="text-xs">Banned</Badge>
                <div>
                  <h4 className="font-semibold text-sm">Malicious Code</h4>
                  <p className="text-muted-foreground text-xs">Code intended to cause harm or damage</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="destructive" className="text-xs">Banned</Badge>
                <div>
                  <h4 className="font-semibold text-sm">Off-Topic Content</h4>
                  <p className="text-muted-foreground text-xs">Content unrelated to programming or development</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enforcement */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Enforcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Violations of these guidelines may result in:
          </p>
          
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Content removal</li>
            <li>Warning notifications</li>
            <li>Temporary account suspension</li>
            <li>Permanent account termination (for severe violations)</li>
          </ul>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Report Issues:</strong> If you see content that violates these guidelines, 
              please report it using the report button or contact our moderation team.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appeals */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Appeals Process</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you believe your content was removed in error or you received an unfair penalty, 
            you can appeal the decision by contacting us at appeals@stackit.com with:
          </p>
          
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Your username</li>
            <li>Link to the content in question</li>
            <li>Explanation of why you believe the action was incorrect</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Guidelines;