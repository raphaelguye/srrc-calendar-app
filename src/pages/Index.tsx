import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import FilterToggle from "@/components/FilterToggle";
import EventStats from "@/components/EventStats";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  organizer: string;
  description: string;
}

const API_BASE_URL = "https://srrc-calendar-api-production-4112.up.railway.app/api/v1";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true);

  // Fetch all events
  const { data: allEvents, isLoading: allLoading, error: allError, refetch: refetchAll } = useQuery({
    queryKey: ["events", "all"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) throw new Error("Failed to fetch all events");
      return response.json() as Promise<Event[]>;
    },
  });

  // Fetch upcoming events
  const { data: upcomingEvents, isLoading: upcomingLoading, error: upcomingError, refetch: refetchUpcoming } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/events/upcoming`);
      if (!response.ok) throw new Error("Failed to fetch upcoming events");
      return response.json() as Promise<Event[]>;
    },
  });

  const displayEvents = showUpcomingOnly ? upcomingEvents : allEvents;
  const isLoading = showUpcomingOnly ? upcomingLoading : allLoading;
  const error = showUpcomingOnly ? upcomingError : allError;

  const filteredEvents = useMemo(() => {
    if (!displayEvents) return [];
    
    if (!searchQuery.trim()) return displayEvents;

    const query = searchQuery.toLowerCase();
    return displayEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query)
    );
  }, [displayEvents, searchQuery]);

  const handleRetry = () => {
    if (showUpcomingOnly) {
      refetchUpcoming();
    } else {
      refetchAll();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12 px-4 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
            SRRC Events Kalender
          </h1>
          <p className="text-center text-lg opacity-90">
            Swiss Rock'n'Roll Confederation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Stats Section */}
        <div className="flex justify-center">
          <EventStats
            totalEvents={allEvents?.length || 0}
            upcomingEvents={upcomingEvents?.length || 0}
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="w-full lg:w-auto lg:min-w-[320px]">
            <FilterToggle
              showUpcomingOnly={showUpcomingOnly}
              onToggle={() => setShowUpcomingOnly(!showUpcomingOnly)}
            />
          </div>
        </div>

        {/* Events Display */}
        {isLoading && <LoadingState />}
        
        {error && (
          <ErrorState
            message={(error as Error).message}
            onRetry={handleRetry}
          />
        )}

        {!isLoading && !error && (
          <>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {searchQuery
                    ? "Keine Events gefunden, die Ihrer Suche entsprechen."
                    : "Derzeit sind keine Events verfügbar."}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {searchQuery ? "Suchergebnisse" : showUpcomingOnly ? "Kommende Events" : "Alle Events"}
                  </h2>
                  <span className="text-sm text-muted-foreground font-medium">
                    {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-16 py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Swiss Rock'n'Roll Confederation. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
