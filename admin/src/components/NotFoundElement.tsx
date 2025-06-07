import { useNavigate } from "react-router-dom";
import { CustomButton } from "./ui/CustomButton";

interface Props {
    title: string,
    desc: string,
    buttonContent: string,
    url: string
}

const NotFoundElement = ({ title, desc, buttonContent, url }: Props) => {
    const router = useNavigate()

    const handleRouter = () => router(url);

    return (
        <div className="flex items-center justify-center min-h-[60dvh] bg-gray-50 p-6 flex-1">
            <div className="bg-white rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">
                    {desc}
                </p>
                <CustomButton
                    onClick={handleRouter}
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
                    {buttonContent}
                </CustomButton>
            </div>
        </div>
    );
};

export default NotFoundElement;
