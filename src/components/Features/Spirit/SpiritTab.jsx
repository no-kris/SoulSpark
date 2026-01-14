import { useState } from "react";
import ProgressBar from "../../Misc/ProgressBar";
import SpiritPet from "./SpiritPet";
import Stats from "../../Misc/Stats";
import Badges from "../../Misc/Badges";

export default function SpiritTab() {
  const [profileStats, setProfileStats] = useState({});

  return (
    <div className="spirit-container">
      <div className="spirit-container__header">
        <h3>My Spirit Companion</h3>
        <p>Form: (spirit pet)</p>
      </div>
      <div className="spirit-container__pet">
        <SpiritPet profileStats={profileStats} />
      </div>
      <ProgressBar profileStats={profileStats} />
      <Stats profileStats={profileStats} />
      <div>
        <Badges />
      </div>
    </div>
  );
}
