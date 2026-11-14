interface ProgressBarProps {
  value: number;
  label: string;
  tone?: 'leaf' | 'sun' | 'berry' | 'sky' | 'clay';
  compact?: boolean;
}

export default function ProgressBar({
  value,
  label,
  tone = 'leaf',
  compact = false
}: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`progress ${compact ? 'progress--compact' : ''}`}>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(safeValue)}
      >
        <span className={`progress__fill progress__fill--${tone}`} style={{ width: `${safeValue}%` }} />
      </div>
      {!compact && <span className="progress__label">{Math.round(safeValue)}%</span>}
    </div>
  );
}
