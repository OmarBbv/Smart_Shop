import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

import { getMetricIcon } from '../../services/mockData';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: string;
  formatter?: (value: number) => string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  formatter = (val) => val.toString(),
}) => {
  const Icon = getMetricIcon(icon);
  const isPositive = change >= 0;

  return (
    <motion.div 
      className="card"
      whileHover={{ 
        y: -5,
        transition: { type: 'spring', stiffness: 300 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{formatter(value)}</h3>
          <div className="mt-2 flex items-center">
            <span className={`flex items-center text-xs font-medium ${
              isPositive ? 'text-success-600' : 'text-error-600'
            }`}>
              {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(change)}%
            </span>
            <span className="ml-1 text-xs text-gray-500">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-${icon === 'DollarSign' ? 'success' : 'primary'}-100`}>
          <Icon size={24} className={`text-${icon === 'DollarSign' ? 'success' : 'primary'}-600`} />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;