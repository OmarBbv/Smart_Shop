import { usePostStore } from "@/stores/productPostStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

export default function StaticDropdowns() {
    const { currentPost, updateFeature, setCurrentPost } = usePostStore(useShallow((state) => ({
        currentPost: state.currentPost,
        updateFeature: state.updateFeature,
        setCurrentPost: state.setCurrentPost
    })));

    const [dropdownState, setDropdownState] = useState({
        statusOpen: false,
        deliveryOpen: false,
    });

    function toggleDropdown(name: "statusOpen" | "deliveryOpen") {
        setDropdownState((prev) => ({ ...prev, [name]: !prev[name] }));
    }

    function handleStatusSelect(option: string) {
        updateFeature("status", option);
        setDropdownState((prev) => ({ ...prev, statusOpen: false }));
    }

    function handleDeliverySelect(option: string) {
        updateFeature("delivery", option);
        setDropdownState((prev) => ({ ...prev, deliveryOpen: false }));
    }

    const statusOptions = ["Yeni", "İşlənmiş", "Sıfır kimi", "Qutusunda"];
    const deliveryOptions = [
        "Pulsuz çatdırılma",
        "Ödənişli çatdırılma",
        "Rayonlara çatdırılma",
        "Ünvandan götürmə",
    ];

    return (
        <>
            <div className="flex flex-col gap-2 relative justify-between">
                <label htmlFor="price" className="text-sm font-medium">Qiymət</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={currentPost.price ?? ''}
                    onChange={(e) => setCurrentPost({ price: Number(e.target.value) })}
                    placeholder="Məbləğ daxil edin"
                    className="border p-2 rounded"
                />

            </div>

            <div className="flex flex-col gap-2 relative justify-between">
                <label className="text-sm font-medium">Vəziyyəti</label>
                <div
                    className="border p-2 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => toggleDropdown("statusOpen")}
                >
                    <span>{currentPost.features.status || "Seçmək"}</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform ${dropdownState.statusOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {dropdownState.statusOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10">
                        {statusOptions.map((option, i) => (
                            <div
                                key={i}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleStatusSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 relative justify-between">
                <label className="text-sm font-medium">Çatdırılma</label>
                <div
                    className="border p-2 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => toggleDropdown("deliveryOpen")}
                >
                    <span>{currentPost.features.delivery || "Seçmək"}</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform ${dropdownState.deliveryOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {dropdownState.deliveryOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10 overflow-hidden">
                        {deliveryOptions.map((option, i) => (
                            <div
                                key={i}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleDeliverySelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
