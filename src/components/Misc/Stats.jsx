export default function Stats({ userProfile, counts }) {
  return (
    <div className="stats-wrapper">
      <div className="stats-row">
        <div className="stats-row__item">
          <span className="stats-row__value">{userProfile?.streak || 0}</span>
          <span className="stats-row__label">Streak</span>
        </div>
        <div className="stats-row__item">
          <span className="stats-row__value">{counts.prayers}</span>
          <span className="stats-row__label">Prayers</span>
        </div>
        <div className="stats-row__item">
          <span className="stats-row__value">{counts.gratitudes}</span>
          <span className="stats-row__label">Gratitudes</span>
        </div>
      </div>
    </div>
  );
}
