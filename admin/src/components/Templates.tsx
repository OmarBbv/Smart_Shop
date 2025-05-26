import { TemplateProps } from "@/types/temaplate"
import { CustomField } from "./CustomField"
import { Box } from "./ui/Box"

export const Templates = ({ temp }: TemplateProps) => {
    switch (temp) {
        case 'Mobil telefonlar':
            return (
                <Box className="max-w-[440px] grid grid-cols-1 gap-3 my-10">
                    <div className="flex justify-between items-center gap-3">
                        <CustomField type="template" label="Props" name="Endirim" value="name" onChange={() => console.log('Endirim')} />
                        <CustomField type="template" label="Props" name="Model" value="Model" onChange={() => console.log('Model')} />
                    </div>
                </Box>
            )
        case 'Smart saatlar':
            return <div>mobile</div>
        default:
            return <div>default</div>
    }
}