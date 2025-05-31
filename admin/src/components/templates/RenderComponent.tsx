import { FieldConfig } from "./categoryFields";
import { CustomDropdown } from "./CustomDropdown";
import { MultiSelectDropdown } from "./MultiSelectDropdown";

export function renderComponent(item: FieldConfig) {
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
                    <textarea name={item.name} className="border p-2 rounded" />
                </div>
            );
        case "text":
            return (
                <div className="flex flex-col gap-2">
                    <h2>{item.label}</h2>
                    <input type="text" className="border p-2 rounded" />
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
