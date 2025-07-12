import { TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CountUp from 'react-countup';

const StatsCards = () => {
  const stats = [
    { label: "Total Questions", value: 1234, icon: Clock },
    { label: "Active Users", value: 567, icon: Users },
    { label: "Answers Posted", value: 2890, icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
          <CardContent className="flex items-center p-6">
            <div className="p-3 bg-gradient-to-r from-primary to-blue-500 rounded-xl mr-4">
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                <CountUp end={stat.value} duration={2} separator="," />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;