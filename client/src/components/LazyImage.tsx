import { useState } from "react";

interface LazyImageProps {
    src: string;
    alt?: string;
    className?: string;
    containerClassName?: string;
}

export function LazyImage({
    src,
    alt = "",
    className = "",
    containerClassName = "w-full aspect-[3/2]",
}: LazyImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={`relative overflow-hidden bg-gray-200 ${containerClassName}`}
            style={{ overflowAnchor: "none" }}
        >
            {!loaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                width={300}
                height={200}
                loading="lazy"
                className={`
          w-full h-full object-cover
          transition-opacity duration-700
          ${loaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
            />
        </div>
    );
}
