import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: LucideIcon;
  color?: 'pink' | 'blue' | 'green' | 'purple' | 'orange';
};

const StatCard = ({ 
  label, 
  value, 
  subtext, 
  trend, 
  trendValue, 
  icon: Icon,
  color = 'pink'
}: Props) => {
  const colorClasses = {
    pink: 'from-pink-500 to-pink-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-slate-600 bg-slate-50'
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1 truncate">{label}</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors break-all">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className="text-white" size={20} />
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {subtext && (
          <span className="text-xs sm:text-sm text-slate-500 truncate">{subtext}</span>
        )}
        {trend && trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendColors[trend]} self-start sm:self-auto`}>
            <TrendIcon size={12} />
            <span className="whitespace-nowrap">{trendValue}</span>
          </div>
        )}
      </div>
      
      {/* Progress bar for visual enhancement */}
      <div className="mt-3 sm:mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: '75%' }}
        />
      </div>
    </div>
  );
};

export default StatCard;

