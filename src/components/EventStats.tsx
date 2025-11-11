import { Calendar, TrendingUp } from "lucide-react";

interface EventStatsProps {
  totalEvents: number;
  upcomingEvents: number;
}

const EventStats = ({ totalEvents, upcomingEvents }: EventStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-3">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Kommende Events</p>
            <p className="text-3xl font-bold">{upcomingEvents}</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-3">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Total Events</p>
            <p className="text-3xl font-bold">{totalEvents}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStats;
