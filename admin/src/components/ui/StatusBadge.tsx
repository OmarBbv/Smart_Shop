import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'out of stock' | 'in stock' | 'low stock';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'active':
      case 'in stock':
        return 'bg-success-100 text-success-800';
      case 'inactive':
      case 'out of stock':
        return 'bg-error-100 text-error-800';
      case 'pending':
      case 'low stock':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`badge ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;