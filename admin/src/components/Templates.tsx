import { TemplateProps } from "@/types/temaplate"
import { Box } from "lucide-react"
import { CustomField } from "./CustomField"

export const Templates = ({ temp }: TemplateProps) => {
    switch (temp) {
        case 'Mobil telefonlar':
            return (
                <Box className="max-w-[440px] grid grid-cols-2">
                    <div className="flex justify-between items-center gap-3">
                        <CustomField type="input" label="Props" name="Endirim" value="name" onChange={() => console.log('')} />
                    </div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </Box>
            )
        case 'Smart saatlar':
            return <div>mobile</div>
        default:
            return <div>default</div>
    }
}