import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AlertDestructive = () => {
  return (
    <Alert variant="destructive" className="mb-5">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>Houve um erro inesperado</AlertDescription>
    </Alert>
  );
};
