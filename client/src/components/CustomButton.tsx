interface Props {
  classNames?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
}
export default function CustomButton({
  classNames = '',
  type = 'button',
  onClick = () => {},
  children,
  disabled = false,
  variant = 'primary',
  icon = null,
}: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      value={'button'}
      className={`flex items-center justify-center ${classNames} ${variant}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
