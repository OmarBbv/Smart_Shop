import { CustomDropdown } from "@/components/CustomDropdown";
import { useLocation } from "react-router-dom"

export const FilterTemplate = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (lastSegment) {
        case 'mobil-telefonlar':
            return <div className="w-full space-y-2">
                <CustomDropdown title="Vəziyyət" options={['Yeni', 'İkinci əl']} />
                <CustomDropdown title="Çatdırılma" options={['Var', 'Yox']} />
            </div>;
        case 'noutbuk-ve-netbuklar':
            return 'noutbuk-ve-netbuklar';
        case 'komputer-ve-noutbuk-aksesuarlari':
            return 'komputer-ve-noutbuk-aksesuarlari'
    }


    return null;
}