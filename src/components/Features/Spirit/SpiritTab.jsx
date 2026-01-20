import { useAuth } from "../../../context/AuthContext";
import { useProfileStats } from "../../../hooks/useProfileStats";
import Badges from "../../Misc/Badges";
import Spirit from "./Spirit";

export default function SpiritTab() {
  const { userProfile } = useAuth();
  const { counts, answeredPrayersCount } = useProfileStats();

  return (
    <>
      <div className="spirit-container">
        <div className="spirit-container__header">
          <h3>Spirit Flame</h3>
          <span>
            "Never be lacking in zeal, but keep your spiritual fervor, serving
            the Lord." - Romans 12:11
          </span>
        </div>
        <div className="spirit-container__flame">
          <Spirit />
        </div>
      </div>
      <div className="badges-container">
        <Badges
          userProfile={userProfile}
          counts={counts}
          answeredPrayersCount={answeredPrayersCount}
        />
      </div>
    </>
  );
}
