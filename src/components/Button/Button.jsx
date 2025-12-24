export default function Button({
  text,
  Icon = null,
  IconSize = 16,
  className,
  onClick,
}) {
  return (
    <button className={className} onClick={onClick}>
      {Icon && <Icon size={IconSize} className="button__icon" />}
      {text}
    </button>
  );
}
