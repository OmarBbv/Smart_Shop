import { categoryFields, FieldConfig } from "./categoryFields";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CustomDropdown } from "./CustomDropdown";
import StaticDropdowns from "./StaticDropdowns";
import { Fragment } from "react";

interface Props {
  selectedCategory: {
    lastCategory: string;
    lastCatIndex: number | null;
  }
  categoryPathUrl: string[];
}

export default function TemplatesConfig({
  selectedCategory,
  categoryPathUrl,
}: Props) {

  const fields = categoryFields[selectedCategory.lastCategory];

  return (
    <div className="max-w-md grid grid-cols-2 gap-4">
      {categoryPathUrl.length > 0 && !fields ? (
        <StaticDropdowns />
      ) : (
        <>
          {categoryPathUrl.length > 0 && <StaticDropdowns />}
          {fields?.map((item) => {
            return <Fragment key={item.name}>
              {renderComponent(item)}
            </Fragment>
          })}
        </>
      )}
    </div>
  );
}

function renderComponent(item: FieldConfig) {
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
