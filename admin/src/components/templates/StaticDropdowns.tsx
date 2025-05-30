import { useState } from "react";

export default function StaticDropdowns() {
    const [statusOpen, setStatusOpen] = useState(false);
    const [deliveryOpen, setDeliveryOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [delivery, setDelivery] = useState("");
    const [price, setPrice] = useState("");

    const statusOptions = ["Yeni", "İşlənmiş", "Sıfır kimi", "Qutusunda"];
    const deliveryOptions = ['Pulsuz çatdırılma', 'Ödənişli çatdırılma', 'Rayonlara çatdırılma', 'Ünvandan götürmə'];

    return (
        <>
            <div className="flex flex-col gap-2 relative">
                <label htmlFor="price" className="text-sm font-medium">Qiymət</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Məbləğ daxil edin"
                    className="border p-2 rounded"
                />
            </div>

            <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium">Vəziyyəti</label>
                <div
                    className="border p-2 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => setStatusOpen(!statusOpen)}
                >
                    <span>{status || "Seçmək"}</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform ${statusOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {statusOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10">
                        {statusOptions.map((option, i) => (
                            <div
                                key={i}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                    setStatus(option);
                                    setStatusOpen(false);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium">Çatdırılma</label>
                <div
                    className="border p-2 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => setDeliveryOpen(!deliveryOpen)}
                >
                    <span>{delivery || "Seçmək"}</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform ${deliveryOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {deliveryOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10 overflow-hidden">
                        {deliveryOptions.map((option, i) => (
                            <div
                                key={i}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                    setDelivery(option);
                                    setDeliveryOpen(false);
                                }}
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
