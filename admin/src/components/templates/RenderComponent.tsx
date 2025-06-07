import { usePostStore } from "@/stores/productPostStore";
import { CustomDropdown } from "./CustomDropdown";
import { FieldConfig } from "./categoryFields";
import { MultiSelectDropdown } from "./MultiSelectDropdown";

export function renderComponent(item: FieldConfig) {
    const { setCurrentPost } = usePostStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const name = item.name;

        if (!name) return;

        setCurrentPost({
            features: {
                ...(usePostStore.getState().currentPost.features || {}),
                [name]: value,
            }
        });
    };

    switch (item.type) {
        case "dropdown":
            return (
                <CustomDropdown
                    label={item.label}
                    name={item.name ?? "bos"}
                    options={item.options || []}
                />
            );
        case "textarea":
            return (
                <div className="flex flex-col gap-2">
                    <h2>{item.label}</h2>
                    <textarea
                        name={item.name}
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>
            );
        case "text":
            return (
                <div className="flex flex-col gap-2">
                    <h2>{item.label}</h2>
                    <input
                        type="text"
                        name={item.name}
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>
            );
        case "checkbox":
            return (
                <MultiSelectDropdown
                    label={item.label}
                    name={item.name ?? "bos"}
                    options={item.options || []}
                />
            );
        default:
            return null;
    }
}
