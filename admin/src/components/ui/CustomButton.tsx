import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const CustomButton = ({ children, ...props }: Props) => {
    return <button {...props}>{children}</button>
}