import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Introduction */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Your Privacy Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            At StackIt, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
          </p>
        </CardContent>
      </Card>

      {/* Information We Collect */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-500" />
            Information We Collect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Username and email address when you create an account</li>
              <li>Profile information you choose to provide</li>
              <li>Questions, answers, and comments you post</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>How you interact with our platform</li>
              <li>Pages you visit and features you use</li>
              <li>Time and duration of your visits</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Technical Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>IP address and browser information</li>
              <li>Device type and operating system</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* How We Use Your Information */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-green-500" />
            How We Use Your Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>To provide and maintain our services</li>
            <li>To personalize your experience</li>
            <li>To send you notifications about your account activity</li>
            <li>To improve our platform and develop new features</li>
            <li>To prevent fraud and ensure platform security</li>
            <li>To comply with legal obligations</li>
          </ul>
        </CardContent>
      </Card>

      {/* Data Security */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-red-500" />
            Data Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Technical Measures</h4>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Encryption in transit and at rest</li>
                <li>Secure authentication systems</li>
                <li>Regular security updates</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Administrative Measures</h4>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Limited access to personal data</li>
                <li>Employee training on data protection</li>
                <li>Regular security audits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Rights */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">You have the following rights regarding your personal information:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
            </ul>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Export your data</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Contact Us */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> privacy@stackit.com</p>
            <p><strong>Address:</strong> 123 Developer Street, Tech City, TC 12345</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </CardContent>
      </Card>

      <Separator />
      
      <div className="text-center text-sm text-muted-foreground">
        <p>This privacy policy is effective as of {new Date().toLocaleDateString()} and will remain in effect except with respect to any changes in its provisions in the future.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;