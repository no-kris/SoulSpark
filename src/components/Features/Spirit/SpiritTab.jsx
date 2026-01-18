import Stats from "../../Misc/Stats";
import Badges from "../../Misc/Badges";
import Spirit from "./Spirit";

export default function SpiritTab() {
  return (
    <div className="spirit-container">
      <div className="spirit-container__header">
        <h3>Spirit Flame</h3>
      </div>
      <div className="spirit-container__flame">
        <Spirit />
      </div>
      <Stats />
      <div>
        <Badges />
      </div>
    </div>
  );
}
