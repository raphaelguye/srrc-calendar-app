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
        <AlertTitle className="text-lg font-semibold">Fehler beim Laden</AlertTitle>
        <AlertDescription className="mt-2">
          {message || "Die Events konnten nicht geladen werden. Bitte versuchen Sie es später erneut."}
        </AlertDescription>
      </Alert>
      {onRetry && (
        <Button onClick={onRetry} variant="default" size="lg">
          Erneut versuchen
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
