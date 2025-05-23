import { Box } from "../ui/Box";
import { Typography } from "../ui/Typography";

export type FeatureData =
    | string
    | number
    | boolean
    | { [key: string]: FeatureData }
    | FeatureData[];
interface Props {
    data?: FeatureData;
    maxItems?: number;
}

export function FeatureRenderer({ data, maxItems }: Props) {
    if (data == null) {
        return <Typography className="italic text-gray-500">—</Typography>;
    }

    if (typeof data === "object" && !Array.isArray(data)) {
        const entries = Object.entries(data);
        const limited = typeof maxItems === "number"
            ? entries.slice(0, maxItems)
            : entries;

        return (
            <Box className="flex flex-col gap-4 py-2">
                {limited.map(([key, value]) => (
                    <Box
                        key={key}
                        className="flex flex-col p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <Typography className="text-sm font-semibold text-indigo-600 mb-1 capitalize">
                            {key.replace(/_/g, " ")}
                        </Typography>
                        <FeatureRenderer data={value} />
                    </Box>
                ))}
            </Box>
        );
    }

    if (Array.isArray(data)) {
        const items = typeof maxItems === "number"
            ? data.slice(0, maxItems)
            : data;

        return (
            <ul className="list-disc list-inside space-y-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex">
                        <Typography>{String(item)}</Typography>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <Typography className="text-gray-700">
            {String(data)}
        </Typography>
    );
}
