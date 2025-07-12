import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MobileFilterSheet from './MobileFilterSheet';

interface Filter {
  id: string;
  label: string;
  count: number;
}

interface FiltersAndSearchProps {
  filters: Filter[];
  activeFilter: string;
  searchQuery: string;
  isMobileFilterOpen: boolean;
  onFilterChange: (filterId: string) => void;
  onSearchChange: (query: string) => void;
  onMobileFilterOpenChange: (open: boolean) => void;
  onClearFilter?: () => void;
}

const FiltersAndSearch = ({
  filters,
  activeFilter,
  searchQuery,
  isMobileFilterOpen,
  onFilterChange,
  onSearchChange,
  onMobileFilterOpenChange,
  onClearFilter,
}: FiltersAndSearchProps) => {
  return (
    <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
          {/* Desktop Filters */}
          <div className="hidden lg:flex flex-wrap gap-2 w-full xl:w-auto items-center">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => onFilterChange(filter.id)}
                className={`rounded-full px-3 sm:px-4 py-2 text-sm transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-primary-foreground shadow-lg hover:from-primary/90 hover:to-blue-600/90'
                    : 'border-border text-foreground hover:bg-accent hover:border-primary/30'
                }`}
              >
                <Filter size={14} className="mr-1 sm:mr-2" />
                <span>{filter.label}</span>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 border-0 text-xs ${
                    activeFilter === filter.id
                      ? 'bg-card/20 text-current'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {filter.count}
                </Badge>
              </Button>
            ))}
            {activeFilter !== 'all' && onClearFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilter}
                className="text-muted-foreground hover:text-foreground p-2"
              >
                <X size={16} />
              </Button>
            )}
          </div>

          {/* Mobile Layout: Search Left, Filter Right */}
          <div className="lg:hidden flex gap-3 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 border-border focus:border-primary focus:ring-primary rounded-xl bg-card/50 text-sm"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <MobileFilterSheet
              filters={filters}
              activeFilter={activeFilter}
              isOpen={isMobileFilterOpen}
              onOpenChange={onMobileFilterOpenChange}
              onFilterChange={onFilterChange}
              onClearFilter={onClearFilter}
            />
          </div>

          {/* Desktop Search */}
          <div className="relative w-full xl:w-80 hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 sm:pl-10 border-border focus:border-primary focus:ring-primary rounded-xl bg-card/50 text-sm sm:text-base"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltersAndSearch;