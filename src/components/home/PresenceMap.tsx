import Link from "next/link";
import { dots, gulfPath, hub, indiaPath, lines, pins } from "@/components/home/presence-map-data";

const pinPath =
  "M0 0C-1.6-7.2-8.4-9.2-8.4-16.6-8.4-22.8-4.6-26.6 0-26.6 4.6-26.6 8.4-22.8 8.4-16.6 8.4-9.2 1.6-7.2 0 0Z";

export function PresenceMap() {
  return (
    <section className="bg-white" aria-labelledby="presence-heading">
      <h2 id="presence-heading" className="sr-only">
        Screenista screens in Jaipur, Lucknow, Indore, Bhopal, Nagpur, Goa, the UAE, and Saudi Arabia, and counting
      </h2>
      <div className="mx-auto w-full max-w-[1100px] overflow-x-auto px-4 py-6 md:px-8 md:py-12">
        <div className="relative min-w-[760px]">
          <svg viewBox="0 0 1200 760" className="h-auto w-full overflow-visible font-sans" aria-hidden="true">
            <defs>
              <filter id="presence-bloom" x="-28%" y="-28%" width="156%" height="156%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              <filter id="presence-core" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <radialGradient id="presence-land" cx="42%" cy="40%" r="68%">
                <stop offset="0%" stopColor="#f7fbff" />
                <stop offset="46%" stopColor="#d4ecfb" />
                <stop offset="100%" stopColor="#b7dff6" />
              </radialGradient>
              <radialGradient id="presence-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff4ad8" stopOpacity="0.9" />
                <stop offset="28%" stopColor="#e9d5ff" stopOpacity="0.5" />
                <stop offset="64%" stopColor="#bfdbfe" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g filter="url(#presence-bloom)" opacity="0.9">
              <path d={indiaPath} fill="#8ecff5" />
              <path d={gulfPath} fill="#b9e4f8" />
            </g>
            <path d={indiaPath} fill="url(#presence-land)" />
            <path d={gulfPath} fill="#d7f0fc" />
            <ellipse cx={hub.x} cy={hub.y} rx="158" ry="116" fill="url(#presence-glow)" filter="url(#presence-core)" />

            {lines.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="#8ebfe0"
                strokeWidth="1.15"
                strokeDasharray="2.6 4.6"
                strokeLinecap="round"
              />
            ))}

            {dots.map(([x, y], index) => (
              <circle key={`${index}-${x}-${y}`} cx={x} cy={y} r="4.2" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
            ))}

            {pins.map((pin) => (
              <g key={pin.name} transform={`translate(${pin.x} ${pin.y})`}>
                <path d={pinPath} fill={pin.color} />
                <circle cy="-16.6" r="3.2" fill="#fff" />
                <text x={pin.lx} y={pin.ly} textAnchor={pin.anchor} fill="#1c2430" fontSize="16" fontWeight="600">
                  {pin.name}
                </text>
              </g>
            ))}
          </svg>
          <Link
            href="/locations"
            className="absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-[#1e3a5f] px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-white"
            style={{ left: "87%", top: "60%" }}
          >
            & Counting...
          </Link>
        </div>
      </div>
    </section>
  );
}
