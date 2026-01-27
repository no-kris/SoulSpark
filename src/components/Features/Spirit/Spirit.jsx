import { useAuth } from "../../../hooks/useAuth";
import SpiritFlame from "./SpiritFlame";
import ProgressBar from "../../Misc/ProgressBar";
import calculateLevel from "./utils/calculateLevel";
import Stats from "../../Misc/Stats";
import { useProfileStats } from "../../../hooks/useProfileStats";

export default function Spirit() {
  const { userProfile } = useAuth();
  const xp = userProfile?.experiencePoints || 0;
  const { level, xpInCurrentLevel, progressPercent, XP_PER_LEVEL } =
    calculateLevel(xp);
  const { counts } = useProfileStats();

  return (
    <div className="spirit-flame-container">
      <div className="spirit-flame-inner">
        <SpiritFlame level={level} />
        <ProgressBar
          level={level}
          xpInCurrentLevel={xpInCurrentLevel}
          progressPercent={progressPercent}
          XP_PER_LEVEL={XP_PER_LEVEL}
        />
        <Stats userProfile={userProfile} counts={counts} />
      </div>
    </div>
  );
}
