import { Button } from "@/components/ui/button";

interface FilterToggleProps {
  showUpcomingOnly: boolean;
  onToggle: () => void;
}

const FilterToggle = ({ showUpcomingOnly, onToggle }: FilterToggleProps) => {
  return (
    <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border border-border">
      <Button
        variant={showUpcomingOnly ? "default" : "ghost"}
        onClick={() => !showUpcomingOnly && onToggle()}
        className="flex-1 transition-all"
      >
        Événements à venir
      </Button>
      <Button
        variant={!showUpcomingOnly ? "default" : "ghost"}
        onClick={() => showUpcomingOnly && onToggle()}
        className="flex-1 transition-all"
      >
        Tous les événements
      </Button>
    </div>
  );
};

export default FilterToggle;
