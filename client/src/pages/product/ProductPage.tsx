
import { ProductContent } from "@/components/ui/product/ProductContent";
import { FilterPanel } from "@/components/ui/product/ProductFilter";


export default function ProductPage() {
  return (
    <div className="flex px-4 py-6 space-x-6">
      <aside className="w-[270px] hidden lg:block">
        <div className="sticky top-32">
          <FilterPanel />
        </div>
      </aside>

      <div className="flex-1">
        <ProductContent />
      </div>
    </div>
  );
}


