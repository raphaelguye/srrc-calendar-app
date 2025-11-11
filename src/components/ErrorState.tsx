import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-4">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Erreur de chargement</AlertTitle>
        <AlertDescription className="mt-2">
          {message || "Impossible de charger les événements. Veuillez réessayer plus tard."}
        </AlertDescription>
      </Alert>
      {onRetry && (
        <Button onClick={onRetry} variant="default" size="lg">
          Réessayer
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
