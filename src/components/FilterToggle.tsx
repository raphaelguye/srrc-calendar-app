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
        Kommende Events
      </Button>
      <Button
        variant={!showUpcomingOnly ? "default" : "ghost"}
        onClick={() => showUpcomingOnly && onToggle()}
        className="flex-1 transition-all"
      >
        Alle Events
      </Button>
    </div>
  );
};

export default FilterToggle;
