import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cookie, Settings, Shield, Info } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn how we use cookies to improve your experience on StackIt
        </p>
      </div>

      {/* Introduction */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="w-6 h-6 text-primary" />
            What Are Cookies?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Cookies are small text files that are stored on your device when you visit our website. They help us 
            provide you with a better experience by remembering your preferences and enabling certain features.
          </p>
          <p className="text-muted-foreground">
            This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
          </p>
        </CardContent>
      </Card>

      {/* Types of Cookies */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Types of Cookies We Use</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-green-500" />
                Essential Cookies
                <Badge variant="destructive" className="text-xs">Required</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">
                These cookies are necessary for the website to function properly. They enable core functionality 
                such as security, network management, and accessibility.
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Authentication cookies</li>
                <li>Security cookies</li>
                <li>Load balancing cookies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5 text-blue-500" />
                Functional Cookies
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">
                These cookies allow us to remember choices you make and provide enhanced, more personal features.
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Language preferences</li>
                <li>Theme settings (dark/light mode)</li>
                <li>Layout preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-orange-500" />
                Analytics Cookies
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">
                These cookies help us understand how visitors interact with our website by collecting and 
                reporting information anonymously.
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Page views and navigation</li>
                <li>Feature usage statistics</li>
                <li>Performance metrics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cookie className="w-5 h-5 text-purple-500" />
                Preference Cookies
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">
                These cookies enable the website to remember information that changes the way the website 
                behaves or looks for you.
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>User interface customizations</li>
                <li>Notification preferences</li>
                <li>Accessibility settings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Managing Cookies */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Managing Your Cookie Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You have several options to manage cookies:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Browser Settings</h3>
              <p className="text-muted-foreground text-sm">
                Most web browsers allow you to control cookies through their settings. You can set your browser 
                to refuse cookies or to alert you when cookies are being sent.
              </p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Cookie Consent</h3>
              <p className="text-muted-foreground text-sm mb-3">
                When you first visit our site, you'll see a cookie consent banner where you can choose which 
                types of cookies to accept.
              </p>
              <Button size="sm">Update Cookie Preferences</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third-Party Cookies */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Third-Party Cookies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Some cookies may be set by third-party services that appear on our pages:
          </p>
          
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              <strong>Google Analytics:</strong> We use Google Analytics to understand how our site is used. 
              These cookies collect information anonymously.
            </li>
            <li>
              <strong>Authentication Services:</strong> When you log in using third-party authentication 
              (if available), those services may set their own cookies.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Updates */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Updates to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for 
            other operational, legal, or regulatory reasons. When we make changes, we will update the 
            "Last Updated" date at the top of this policy.
          </p>
          
          <div className="p-4 bg-accent/20 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> January 15, 2024
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Questions About Cookies?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> privacy@stackit.com</p>
            <p><strong>Address:</strong> 123 Developer Street, Tech City, TC 12345</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePolicy;