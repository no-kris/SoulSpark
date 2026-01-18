import { useAuth } from "../../../context/AuthContext";
import SpiritFlame from "./SpiritFlame";
import ProgressBar from "../../Misc/ProgressBar";
import calculateLevel from "./utils/calculateLevel";

export default function Spirit() {
  const { userProfile } = useAuth();
  const xp = userProfile?.experiencePoints || 0;
  const { level, xpInCurrentLevel, progressPercent, XP_PER_LEVEL } =
    calculateLevel(xp);

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
      </div>
    </div>
  );
}
