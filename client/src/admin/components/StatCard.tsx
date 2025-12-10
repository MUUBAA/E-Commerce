type Props = {
  label: string;
  value: string | number;
  subtext?: string;
};

const StatCard = ({ label, value, subtext }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-1 border border-slate-100">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-2xl font-semibold text-slate-800">{value}</span>
      {subtext && <span className="text-xs text-slate-400">{subtext}</span>}
    </div>
  );
};

export default StatCard;

