import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Users, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Introduction */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Agreement to Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            By accessing and using StackIt, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </CardContent>
      </Card>

      {/* User Accounts */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            User Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Account Creation</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>You must be at least 13 years old to create an account</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>One person may not maintain multiple accounts</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Account Responsibilities</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* User Content */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            User Content and Conduct
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Content Guidelines</h3>
            <p className="text-muted-foreground mb-3">
              All content you post must adhere to our community standards:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Be respectful and professional</li>
              <li>Stay on-topic and provide helpful information</li>
              <li>Do not post spam, advertising, or promotional content</li>
              <li>Respect intellectual property rights</li>
              <li>Do not share personal or sensitive information</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Prohibited Activities</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Harassment, bullying, or threatening behavior</li>
              <li>Posting illegal, harmful, or offensive content</li>
              <li>Attempting to hack or disrupt the service</li>
              <li>Creating fake accounts or impersonating others</li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Content Ownership</h3>
            <p className="text-muted-foreground">
              You retain ownership of content you create, but grant StackIt a license to use, modify, and distribute your content for the purpose of operating the platform.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Service Availability */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Service Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We strive to maintain high availability of our service, but we cannot guarantee uninterrupted access. We reserve the right to:
          </p>
          
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Modify or discontinue any part of the service</li>
            <li>Suspend accounts that violate these terms</li>
            <li>Remove content that violates our guidelines</li>
            <li>Update these terms as necessary</li>
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            Disclaimers and Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Service Disclaimer</h3>
            <p className="text-muted-foreground text-sm">
              StackIt is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any information on the platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Limitation of Liability</h3>
            <p className="text-muted-foreground text-sm">
              StackIt shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you have questions about these Terms of Service, please contact us:
          </p>
          
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> legal@stackit.com</p>
            <p><strong>Address:</strong> 123 Developer Street, Tech City, TC 12345</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </CardContent>
      </Card>

      <Separator />
      
      <div className="text-center text-sm text-muted-foreground">
        <p>By using StackIt, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.</p>
      </div>
    </div>
  );
};

export default TermsOfService;