import { useMemo } from "react";
import BADGES from "../../constants/badges";
import { CheckCircle, Trophy, Lock } from "lucide-react";

export default function Badges({ userProfile, counts, answeredPrayersCount }) {
  const stats = { userProfile, counts, answeredPrayersCount };
  const unlockedBadges = useMemo(
    () => BADGES.filter((b) => b.condition(stats)),
    [stats],
  );
  const lockedBadges = useMemo(
    () => BADGES.filter((b) => !b.condition(stats)),
    [stats],
  );

  return (
    <div>
      {/* Unlocked Badges */}
      <h4 className="history-title">
        <Trophy size={16} /> Unlocked Milestones ({unlockedBadges.length})
      </h4>
      {unlockedBadges.length > 0 ? (
        <div className="badge-grid" style={{ marginBottom: "2rem" }}>
          {unlockedBadges.map((badge) => (
            <div key={badge.id} className="badge-card unlocked">
              <div className="badge-icon">
                <badge.icon size={28} />
              </div>
              <div>
                <p className="badge-name">{badge.name}</p>
                <p className="badge-desc">{badge.desc}</p>
              </div>
              <div className="check-icon">
                <CheckCircle size={14} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="badge-desc">No badges unlocked yet.</p>
      )}

      {/* Locked Badges */}
      <h4 className="history-title">
        <Lock size={16} /> Next Steps
      </h4>
      <div className="badge-grid">
        {lockedBadges.map((badge) => (
          <div key={badge.id} className="badge-card locked">
            <div className="badge-icon">
              <badge.icon size={28} />
            </div>
            <div>
              <p className="badge-name">{badge.name}</p>
              <p className="badge-desc">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
