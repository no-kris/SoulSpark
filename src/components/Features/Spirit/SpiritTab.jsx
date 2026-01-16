import { useAuth } from "../../../context/AuthContext";
import ProgressBar from "../../Misc/ProgressBar";
import Stats from "../../Misc/Stats";
import Badges from "../../Misc/Badges";
import calculateLevel from "./utils/calculateLevel";
import Spirit from "./Spirit";

export default function SpiritTab() {
  const { userProfile } = useAuth();
  const xp = userProfile?.experiencePoints || 0;
  const { level, xpInCurrentLevel, progressPercent } = calculateLevel(xp);

  return (
    <div className="spirit-container">
      <div className="spirit-container__header">
        <h3>Spirit Flame</h3>
        <span>Level: {level}</span>
      </div>
      <div className="spirit-container__pet">
        <Spirit level={level} />
      </div>
      <ProgressBar progressPercent={progressPercent} />
      <Stats userProfile={userProfile} />
      <div>
        <Badges />
      </div>
    </div>
  );
}
