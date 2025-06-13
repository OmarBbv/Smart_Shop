interface Props {
    children: React.ReactNode;
}

export const IsProtected = ({ children }: Props) => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/giris";
    }

    return children
}
