import { addFilter, clearFilter } from "@/stores/productFilterSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

interface formType {
  maxPrice: number | null,
  minPrice: number | null
}

export function FilterPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<formType>({
    defaultValues: {
      maxPrice: null,
      minPrice: null
    }
  });

  const handleClearFilter = () => {
    const searchParams = new URLSearchParams();
    searchParams.delete('max-qiymet');
    searchParams.delete('min-qiymet');
    navigate(`?${searchParams.toString()}`, { replace: true })
    dispatch(clearFilter());
    reset();
  }

  const handleFilterSubmit = (data: formType) => {
    const searchParams = new URLSearchParams(location.search);

    if (data.minPrice) {
      searchParams.set("min-qiymet", data.minPrice.toString());
    } else {
      searchParams.delete("min-qiymet");
    }

    if (data.maxPrice) {
      searchParams.set("max-qiymet", data.maxPrice.toString());
    } else {
      searchParams.delete("max-qiymet");
    }

    navigate(`?${searchParams.toString()}`, { replace: true })

    dispatch(addFilter({
      min: data.minPrice?.toString() || '',
      max: data.maxPrice?.toString() || ''
    }));
  };


  const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const min = searchParams.get('min-qiymet');
    const max = searchParams.get('max-qiymet');

    if (min || max) {
      dispatch(addFilter({
        min: min || '',
        max: max || ''
      }));
    }

    reset({
      minPrice: min ? Number(min) : null,
      maxPrice: max ? Number(max) : null,
    })

  }, [location.search])

  return (
    <div className="bg-white shadow rounded p-4 w-[270px]">
      <h2 className="text-lg font-semibold mb-4">Filtreler</h2>
      <form onSubmit={handleSubmit(handleFilterSubmit)} className="w-full space-y-2">
        {/* <div className="flex items-center gap-2 w-full">
          <FilterTemplate />
        </div> */}
        <div className="flex items-center gap-2 w-full">
          <input {...register('minPrice')} onKeyDown={allowOnlyNumbers} min="0" inputMode="numeric" pattern="[0-9]*" type="text" placeholder="min" className="w-1/2 outline-none border border-gray-400 p-1 rounded-md" />
          <input {...register('maxPrice')} onKeyDown={allowOnlyNumbers} min="0" inputMode="numeric" pattern="[0-9]*" type="text" placeholder="max" className="w-1/2 outline-none border border-gray-400 p-1 rounded-md" />
        </div>
        <button type="submit" className="p-1 w-full bg-green-500 text-white my-2 rounded-md hover:bg-green-600 duration-200">Göstər</button>
        <button
          onClick={handleClearFilter}
          type="button" className="w-full text-gray-400 my-2 rounded-md duration-200 cursor-pointer">Bütün filtrləri təmizlə</button>
      </form>
    </div>
  );
}
