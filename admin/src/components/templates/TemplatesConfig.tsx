import { categoryFields } from "./categoryFields";
import StaticDropdowns from "./StaticDropdowns";
import { Fragment } from "react";
import { renderComponent } from "./RenderComponent";

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


