export default function ProgressBar({
  level,
  xpInCurrentLevel,
  progressPercent,
  XP_PER_LEVEL,
}) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <span className="progress-bar__label">Level {level}</span>
        <span className="progress-bar__value">
          {Math.round(xpInCurrentLevel)} / {XP_PER_LEVEL} XP
        </span>
      </div>
      <div className="progress-fill">
        <div
          className="progress-fill__value"
          style={{ width: `${progressPercent}%` }}
        >
          {progressPercent}
        </div>
      </div>
    </div>
  );
}
