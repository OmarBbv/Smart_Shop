import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
    title: 'Vəziyyət' | 'Çatdırılma';
    options: string[];
    register?: UseFormRegister<any>
}

export const CustomDropdown = ({ title = "Çatdırılma", options = [], register }: Props) => {
    const [isShow, setIsShow] = useState(false);
    const isDrop = isShow && options.length > 0;
    const isRadio = title === "Çatdırılma";

    return (
        <div className="w-full bg-white rounded-sm border border-gray-300">
            <button
                onClick={() => setIsShow(prev => !prev)}
                className={`p-2 flex justify-between items-center w-full ${isDrop && 'border-b border-b-gray-300'}`}
            >
                <span className="text-gray-500">{title}</span>
                {isDrop ? <Minus className="size-4" /> : <Plus className="size-4" />}
            </button>

            {isDrop && options.map((op: any, i: number) => (
                <div key={i} className="p-2 flex justify-between items-center py-2 group">
                    <label htmlFor={`${title}-${i}`} className="w-full select-none text-base leading-5">{op}</label>
                    <input
                        {...register(title)}
                        type={isRadio ? "radio" : "checkbox"}
                        id={`${title}-${i}`}
                        name={isRadio ? title : `${title}-${i}`}
                        className="group-hover:bg-gray-600"
                    />
                </div>
            ))}
        </div>
    );
};
