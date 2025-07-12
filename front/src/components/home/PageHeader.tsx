import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  onAskQuestion: () => void;
}

const PageHeader = ({ onAskQuestion }: PageHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Ask New Questions
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Share knowledge and learn together with our community</p>
      </div>
      <Button 
        onClick={onAskQuestion}
        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
      >
        <Plus size={20} />
        Ask Question
      </Button>
    </div>
  );
};

export default PageHeader;