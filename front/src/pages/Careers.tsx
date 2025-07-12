import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';

const Careers = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120K - $150K",
      description: "Join our frontend team to build amazing user experiences with React and TypeScript.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX passion"]
    },
    {
      id: 2,
      title: "Backend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130K - $160K",
      description: "Help us scale our backend infrastructure to support millions of developers.",
      requirements: ["Node.js expertise", "Database optimization", "API design"]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$140K - $170K",
      description: "Optimize our deployment pipelines and ensure platform reliability.",
      requirements: ["Kubernetes experience", "CI/CD pipelines", "Cloud platforms"]
    }
  ];

  return (
    <div className="min-h-screen space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Join Our Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Help us build the future of developer collaboration and knowledge sharing
        </p>
      </div>

      {/* Company Culture */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Why Work at StackIt?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Remote-First Culture</h3>
              <p className="text-muted-foreground">Work from anywhere with flexible hours and strong async communication.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Growth Opportunities</h3>
              <p className="text-muted-foreground">Continuous learning budget and mentorship programs for career development.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Impact-Driven Work</h3>
              <p className="text-muted-foreground">Build products that directly help millions of developers worldwide.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Competitive Benefits</h3>
              <p className="text-muted-foreground">Health insurance, equity, unlimited PTO, and top-tier equipment.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Open Positions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Open Positions</h2>
        
        {jobs.map((job) => (
          <Card key={job.id} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{job.department}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{job.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Requirements:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <Button className="w-full sm:w-auto">
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Open Positions */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Don't See a Perfect Match?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We're always looking for talented individuals to join our team. If you're passionate about 
            developer tools and community building, we'd love to hear from you!
          </p>
          <Button variant="outline">
            Send Us Your Resume
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Careers;