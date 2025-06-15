import { Loader2, AlertTriangle } from "lucide-react";

type Props = {
    isLoading?: boolean;
    error?: string;
};

export const LoadingOrError = ({ isLoading = false, error }: Props) => {
    return (
        <div className="flex items-center justify-center min-h-[200px] text-gray-700">
            {isLoading ? (
                <div className="text-blue-600 flex items-center gap-1">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-sm">Yüklənir...</p>
                </div>
            ) : error ? (
                <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="w-8 h-8" />
                    <p className="text-sm">{error}</p>
                </div>
            ) : null}
        </div>
    );
};
