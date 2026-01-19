import Badges from "../../Misc/Badges";
import Spirit from "./Spirit";

export default function SpiritTab() {
  return (
    <div className="spirit-container">
      <div className="spirit-container__header">
        <h3>Spirit Flame</h3>
        <span>
          "Never be lacking in zeal, but keep your spiritual fervor, serving the
          Lord." - Romans 12:11
        </span>
      </div>
      <div className="spirit-container__flame">
        <Spirit />
      </div>
      <div>
        <Badges />
      </div>
    </div>
  );
}
