import SpiritFlame from "./SpiritFlame";

export default function Spirit({ level }) {
  return (
    <div className="spirit-pet-container">
      <SpiritFlame level={level} />
    </div>
  );
}
