// src/pages/not_found/NotFoundPage.jsx veya .tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return null;
};
