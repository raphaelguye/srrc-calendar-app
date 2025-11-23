import { Calendar, MapPin, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  description: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date non disponible';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if invalid
    }

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatDateRange = () => {
    if (!event.startDate) return 'Date non disponible';

    const start = formatDate(event.startDate);
    const end = formatDate(event.endDate);

    // If same date or no end date, show only start date
    if (event.startDate === event.endDate || !event.endDate) {
      return start;
    }

    return `${start} - ${end}`;
  };

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border bg-gradient-to-br from-card to-accent/20">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="font-medium">{formatDateRange()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-foreground/80">
          <MapPin className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-foreground/80">
          <User className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
          <span>{event.organizer}</span>
        </div>
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 pt-2 border-t border-border/50">
            {event.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
