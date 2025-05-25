import { useState } from "react";

interface ImageUploadPreviewProps {
    onFilesChange?: (files: File[]) => void;
}

export function ImageUploadPreview({ onFilesChange }: ImageUploadPreviewProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    function removePreview(index: number) {
        URL.revokeObjectURL(previews[index]); // Bellekten temizle
        setPreviews((prev) => prev.filter((_, i) => i !== index)); // Listeden çıkar
    }



    function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;

        const filesArray = Array.from(files);
        onFilesChange?.(filesArray);

        const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
        setPreviews(newPreviews);
    }

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor="images"
                className="mb-2 text-lg font-semibold text-gray-700"
            >
                Ürün Resimleri
            </label>
            <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
                className="block w-full text-gray-700 cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />
            <div className="mt-4 flex flex-wrap gap-4">
                {previews.map((src, i) => (
                    <div key={i} className="relative">
                        <img
                            src={src}
                            alt={`preview-${i}`}
                            className="w-24 h-24 object-cover rounded-md border border-gray-300"
                        />
                        <button
                            onClick={() => removePreview(i)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
