import { FiSearch } from 'react-icons/fi';

interface Props {
  label?: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search';
  placeholder: string;
  value?: string;
  classNames?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  onClick?: () => void;
  ref?: React.RefObject<HTMLInputElement>;
}

export default function CustomInput({
  label = 'text',
  type = 'text',
  placeholder = '',
  value = '',
  classNames = '',
  autoComplete,
  onClick,
  ref,
}: Props) {
  const withOutSearch = type === 'search' ? 'search' : 'normal';

  switch (withOutSearch) {
    case 'search':
      return (
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <input
            ref={ref}
            type="text"
            placeholder="Axtarış..."
            className={classNames}
            autoComplete={autoComplete || 'off'}
            onClick={onClick}
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      );
    case 'normal':
      return (
        <div className="flex-1 relative">
          <label id={label} className="text-sm font-medium text-gray-700 mb-1">
            {label}
            <span className="text-red-500">*</span>
          </label>
          <input
            id="label"
            type={type}
            placeholder={placeholder}
            value={value}
            className={classNames}
            autoComplete={autoComplete}
          />
        </div>
      );
  }
}
