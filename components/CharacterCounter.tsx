'use client';

interface CharacterCounterProps {
  text: string;
  limit?: number;
}

export default function CharacterCounter({ text, limit = 3000 }: CharacterCounterProps) {
  const count = text.length;
  const percentage = (count / limit) * 100;
  
  let colorClass = 'text-gray-400';
  if (percentage > 90) colorClass = 'text-red-400';
  else if (percentage > 75) colorClass = 'text-yellow-400';
  else if (percentage > 50) colorClass = 'text-blue-400';

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`font-medium ${colorClass}`}>
        {count.toLocaleString()} / {limit.toLocaleString()}
      </span>
      {percentage > 75 && (
        <span className="text-xs text-gray-400">
          ({Math.round(100 - percentage)}% remaining)
        </span>
      )}
      {count > limit && (
        <span className="text-xs text-red-400 font-semibold animate-pulse">
          ⚠️ Over limit!
        </span>
      )}
    </div>
  );
}
