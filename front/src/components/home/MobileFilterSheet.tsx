import { Filter, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Filter {
  id: string;
  label: string;
  count: number;
}

interface MobileFilterSheetProps {
  filters: Filter[];
  activeFilter: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFilterChange: (filterId: string) => void;
  onClearFilter?: () => void;
}

const MobileFilterSheet = ({ 
  filters, 
  activeFilter, 
  isOpen, 
  onOpenChange, 
  onFilterChange,
  onClearFilter 
}: MobileFilterSheetProps) => {
  const handleFilterSelect = (filterId: string) => {
    onFilterChange(filterId);
    onOpenChange(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-accent hover:border-primary/30 rounded-xl shrink-0"
          >
            <Filter size={16} />
            <Badge variant="secondary" className="ml-2 border-0 text-xs bg-secondary text-secondary-foreground">
              {filters.find(f => f.id === activeFilter)?.count || 0}
            </Badge>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="bg-card/95 backdrop-blur-md border-border">
          <SheetHeader>
            <SheetTitle className="text-foreground">Filter Questions</SheetTitle>
          </SheetHeader>
          <div className="space-y-3 mt-6">
            <div className="grid grid-cols-1 gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => handleFilterSelect(filter.id)}
                  className={`w-full justify-between text-sm transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-primary-foreground shadow-lg'
                      : 'border-border text-foreground hover:bg-accent hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center">
                    <Filter size={14} className="mr-2" />
                    {filter.label}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`border-0 text-xs ${
                      activeFilter === filter.id
                        ? 'bg-card/20 text-current'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
            {activeFilter !== 'all' && onClearFilter && (
              <Button
                variant="outline"
                onClick={() => {
                  onClearFilter();
                  onOpenChange(false);
                }}
                className="w-full border-border text-foreground hover:bg-accent"
              >
                <X size={14} className="mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilterSheet;