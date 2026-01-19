/**
 * SpiritFlame - A dynamic SVG flame that evolves through phases:
 * Level 1: Spark (just a dot)
 * Level 2-3: Wisp (small tail)
 * Level 4-6: Flame (full fire)
 * Level 7+: Divine Fire (high intensity)
 */
const SpiritFlame = ({ level }) => {
  const intensity = Math.min(level / 10, 1);
  const scale = 0.6 + intensity * 0.6;
  const speed = (2 - intensity * 1.5).toFixed(2);

  // Phase visibility
  const isSpark = level === 1;
  const isWisp = level >= 2 && level <= 3;
  const isFlame = level >= 4;
  const isDivine = level >= 7;

  // Colors
  const baseColor = isDivine
    ? "#ffffff"
    : intensity > 0.4
      ? "#fde047"
      : "#fb923c";
  const midColor = isDivine
    ? "#fef3c7"
    : intensity > 0.4
      ? "#fb923c"
      : "#ea580c";
  const outerColor = isDivine ? "#fb923c" : "#9a3412";

  // Particle count
  const particleCount = isSpark ? 3 : Math.floor(5 + intensity * 12);
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    cx: 40 + Math.random() * 20,
    cy: isSpark ? 50 : 40 + Math.random() * 40,
    r: isSpark ? 0.5 + Math.random() : 1 + Math.random() * 2,
    dur: (1 + Math.random() * 2).toFixed(2),
    delay: (Math.random() * 2).toFixed(2),
  }));

  return (
    <div
      className="flame-wrapper"
      style={{
        transform: `scale(${scale})`,
        transition: "transform 0.5s ease-out",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="flame-svg animated"
      >
        <defs>
          <filter id="flame-glow">
            <feGaussianBlur stdDeviation={isSpark ? "1" : "2"} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="flame-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={baseColor} />
            <stop offset="50%" stopColor={midColor} />
            <stop offset="100%" stopColor={outerColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Aura Glow - Minimal for spark, grows larger for flame */}
        <circle
          cx="50"
          cy={isSpark ? "50" : "65"}
          r={isSpark ? "15" : "35"}
          fill="url(#flame-grad)"
          opacity={isSpark ? "0.2" : "0.4"}
        >
          <animate
            attributeName="opacity"
            values="0.2;0.6;0.2"
            dur={`${speed * 2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values={isSpark ? "12;18;12" : "30;40;30"}
            dur={`${speed * 2}s`}
            repeatCount="indefinite"
          />
        </circle>

        <g filter="url(#flame-glow)">
          {/* Flame Layers - Only visible if level > 1 */}
          {!isSpark && (
            <>
              {/* Outer Flame (The Wisp/Flame Tail) */}
              <path
                d="M50 85 Q30 85 30 65 Q30 40 50 10 Q70 40 70 65 Q70 85 50 85"
                fill={outerColor}
                opacity={isWisp ? 0.3 : 0.6}
              >
                <animate
                  attributeName="d"
                  values="M50 85 Q30 85 30 65 Q30 40 50 10 Q70 40 70 65 Q70 85 50 85;
                        M50 85 Q28 85 28 65 Q28 35 50 5 Q72 35 72 65 Q72 85 50 85;
                        M50 85 Q30 85 30 65 Q30 40 50 10 Q70 40 70 65 Q70 85 50 85"
                  dur={`${speed}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Middle Flame (Body) - Grows more solid in Flame phase */}
              {isFlame && (
                <path
                  d="M50 80 Q35 80 35 65 Q35 45 50 20 Q65 45 65 65 Q65 80 50 80"
                  fill={midColor}
                >
                  <animate
                    attributeName="d"
                    values="M50 80 Q35 80 35 65 Q35 45 50 20 Q65 45 65 65 Q65 80 50 80;
                          M50 80 Q32 80 32 65 Q32 40 50 15 Q68 40 68 65 Q68 80 50 80;
                          M50 80 Q35 80 35 65 Q35 45 50 20 Q65 45 65 65 Q65 80 50 80"
                    dur={`${speed * 0.8}s`}
                    repeatCount="indefinite"
                  />
                </path>
              )}
            </>
          )}

          {/* The Core (The Spark) - Always visible, central point of the evolution */}
          <circle
            cx="50"
            cy={isSpark ? "50" : "65"}
            r={isSpark ? "6" : "8"}
            fill={baseColor}
          >
            <animate
              attributeName="r"
              values={isSpark ? "5;7;5" : "7;9;7"}
              dur={`${speed * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur={`${speed * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* Divine Core - White center for high intensity */}
          {isDivine && (
            <circle cx="50" cy="65" r="4" fill="#ffffff">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="0.3s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>

        {/* Rising Sparks */}
        {particles.map((p) => (
          <circle key={p.id} cx={p.cx} cy={p.cy} r={p.r} fill={baseColor}>
            <animate
              attributeName="cy"
              values={`${p.cy};${p.cy - (isSpark ? 20 : 60)}`}
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default SpiritFlame;
