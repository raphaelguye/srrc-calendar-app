import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

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

const API_BASE_URL = "https://srrc-calendar-api-production-4112.up.railway.app/api/v1";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch upcoming events only
  const { data: upcomingEvents, isLoading, error, refetch } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/events/upcoming`);
      if (!response.ok) throw new Error("Échec du chargement des événements");
      const json = await response.json();
      const arr = Array.isArray(json)
        ? json
        : Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json?.events)
        ? json.events
        : [];
      return arr as Event[];
    },
  });

  const filteredEvents = useMemo(() => {
    const base: Event[] = Array.isArray(upcomingEvents) ? upcomingEvents : [];

    if (!searchQuery.trim()) return base;

    const query = searchQuery.toLowerCase();
    return base.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query)
    );
  }, [upcomingEvents, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[#FF0000] backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white text-center mb-1">
            Calendrier SRRC
          </h1>
          <p className="text-center text-sm text-white/90">
            Swiss Rock'n'Roll Confederation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Search */}
        <div className="flex justify-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Events Display */}
        {isLoading && <LoadingState />}
        
        {error && (
          <ErrorState
            message={(error as Error).message}
            onRetry={refetch}
          />
        )}

        {!isLoading && !error && (
          <>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {searchQuery
                    ? "Aucun événement trouvé correspondant à votre recherche."
                    : "Aucun événement disponible actuellement."}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {searchQuery ? "Résultats de recherche" : "Événements à venir"}
                  </h2>
                  <span className="text-sm text-muted-foreground font-medium">
                    {filteredEvents.length} {filteredEvents.length === 1 ? "événement" : "événements"}
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
          <p>&copy; 2025 Swiss Rock'n'Roll Confederation. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
