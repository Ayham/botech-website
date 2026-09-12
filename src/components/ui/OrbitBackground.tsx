import type { CSSProperties, ReactNode } from 'react';

export type OrbitVariant =
  | 'hero'
  | 'services'
  | 'products'
  | 'minimal'
  | 'about'
  | 'contact'
  | 'cta'
  | 'footer'
  | 'dark'
  | 'raseed';

export interface OrbitBackgroundProps {
  variant?: OrbitVariant;
  className?: string;
}

interface RingSpec {
  r: number;
  dash?: string;
  arc?: [number, number];
  color?: string;
  width?: number;
}

interface DotSpec {
  r: number;
  duration?: number;
  reverse?: boolean;
  delay?: number;
  size?: number;
}

const LIGHT: Record<string, string> = {
  '--orbit-line-strong': 'rgba(28, 74, 127, 0.13)',
  '--orbit-line-soft': 'rgba(28, 74, 127, 0.06)',
  '--orbit-dot': 'rgba(28, 74, 127, 0.4)',
};

const DARK: Record<string, string> = {
  '--orbit-line-strong': 'rgba(255, 255, 255, 0.16)',
  '--orbit-line-soft': 'rgba(255, 255, 255, 0.08)',
  '--orbit-dot': 'rgba(255, 255, 255, 0.5)',
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const [sx, sy] = polar(cx, cy, r, start);
  const [ex, ey] = polar(cx, cy, r, end);
  const large = Math.abs(end - start) > 180 ? 1 : 0;
  const sweep = end > start ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} ${sweep} ${ex} ${ey}`;
}

function Orbit({
  size,
  rings = [],
  dots = [],
  core = false,
  className = '',
  style,
}: {
  size: number;
  rings?: RingSpec[];
  dots?: DotSpec[];
  core?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const c = size / 2;

  return (
    <div
      className={`absolute ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        {rings.map((ring, index) =>
          ring.arc ? (
            <path
              key={index}
              d={arcPath(c, c, ring.r, ring.arc[0], ring.arc[1])}
              stroke={ring.color || 'var(--orbit-line-strong)'}
              strokeWidth={ring.width || 1}
            />
          ) : (
            <circle
              key={index}
              cx={c}
              cy={c}
              r={ring.r}
              stroke={ring.color || 'var(--orbit-line-strong)'}
              strokeWidth={ring.width || 1}
              strokeDasharray={ring.dash}
              vectorEffect="non-scaling-stroke"
            />
          )
        )}
        {core && <circle cx={c} cy={c} r={2} fill="var(--orbit-dot)" opacity={0.55} />}
      </svg>

      {dots.map((dot, index) => {
        const diameter = dot.r * 2;
        return (
          <div
            key={index}
            className={`orbit-spin ${dot.reverse ? 'orbit-spin-rev' : ''}`}
            style={{
              width: diameter,
              height: diameter,
              left: '50%',
              top: '50%',
              marginLeft: -dot.r,
              marginTop: -dot.r,
              '--orbit-dur': `${dot.duration ?? 40}s`,
              '--orbit-delay': `${dot.delay ?? 0}s`,
            } as CSSProperties}
          >
            <span className="orbit-dot" style={{ width: dot.size ?? 4, height: dot.size ?? 4 }} />
          </div>
        );
      })}
    </div>
  );
}

export function OrbitBackground({ variant = 'hero', className = '' }: OrbitBackgroundProps) {
  const dark =
    variant === 'about' || variant === 'cta' || variant === 'footer' || variant === 'dark';
  const colors = dark ? DARK : LIGHT;

  let nodes: ReactNode = null;

  switch (variant) {
    case 'hero': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-44 -left-44 hidden sm:block">
            <Orbit
              size={780}
              className="orbit-float"
              rings={[{ r: 390 }, { r: 288, dash: '1 11' }, { r: 170, arc: [35, 215] }]}
              dots={[
                { r: 390, duration: 58 },
                { r: 288, duration: 40, reverse: true },
                { r: 170, duration: 27, delay: 2 },
              ]}
            />
          </div>

          <div className="orbit-parallax orbit-p-mid absolute -right-36 top-[12%] hidden lg:block">
            <Orbit
              size={460}
              className="orbit-float"
              rings={[{ r: 230 }, { r: 148, dash: '1 9' }]}
              dots={[{ r: 230, duration: 46, reverse: true }, { r: 148, duration: 32 }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-fast absolute -bottom-28 -left-20 hidden md:block">
            <Orbit
              size={300}
              className="orbit-float"
              rings={[{ r: 150, dash: '2 12' }, { r: 96, arc: [20, 250] }]}
              dots={[{ r: 150, duration: 38 }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-mid absolute bottom-[12%] right-[5%] hidden xl:block">
            <Orbit size={170} className="orbit-float" rings={[{ r: 85 }]} dots={[{ r: 85, duration: 30 }]} />
          </div>
        </>
      );
      break;
    }

    case 'services': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-40 -right-44">
            <Orbit
              size={720}
              className="orbit-float"
              rings={[{ r: 360 }, { r: 250, dash: '1 12' }, { r: 150, arc: [20, 160] }]}
              dots={[{ r: 360, duration: 54 }, { r: 250, duration: 36, reverse: true }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-fast absolute -bottom-28 -left-28 orbit-hide-sm">
            <Orbit
              size={300}
              className="orbit-float"
              rings={[{ r: 150 }, { r: 100, dash: '1 7' }]}
              dots={[{ r: 150, duration: 40 }]}
            />
          </div>
        </>
      );
      break;
    }

    case 'products': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-mid absolute top-[5%] right-[6%]">
            <Orbit
              size={380}
              className="orbit-float"
              core
              rings={[{ r: 190 }, { r: 130, dash: '0.5 7' }]}
              dots={[
                { r: 130, duration: 32 },
                { r: 190, duration: 48, reverse: true, size: 3 },
              ]}
            />
          </div>

          <div className="orbit-parallax orbit-p-fast absolute bottom-[8%] left-[4%] orbit-hide-sm">
            <Orbit
              size={240}
              className="orbit-float"
              rings={[{ r: 120, dash: '1 9' }, { r: 76, arc: [30, 210] }]}
              dots={[{ r: 120, duration: 34 }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-slow absolute top-[38%] left-[12%] hidden xl:block">
            <Orbit size={110} className="orbit-float" rings={[{ r: 55 }]} dots={[{ r: 55, duration: 26 }]} />
          </div>
        </>
      );
      break;
    }

    case 'minimal': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute top-[10%] left-[4%]">
            <Orbit
              size={280}
              className="orbit-float"
              rings={[{ r: 140 }, { r: 88, dash: '1 7' }]}
              dots={[{ r: 140, duration: 48 }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-mid absolute bottom-[6%] right-[6%] orbit-hide-sm">
            <Orbit
              size={170}
              className="orbit-float"
              rings={[{ r: 85, dash: '1 8' }, { r: 54, arc: [25, 200] }]}
              dots={[{ r: 85, duration: 36, reverse: true, size: 3 }]}
            />
          </div>
        </>
      );
      break;
    }

    case 'about': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-40 -right-40">
            <Orbit
              size={620}
              className="orbit-float"
              rings={[{ r: 310 }, { r: 210, dash: '1 10' }, { r: 130, arc: [40, 200] }]}
              dots={[{ r: 310, duration: 56 }, { r: 210, duration: 38, reverse: true }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-mid absolute bottom-[6%] left-[3%] orbit-hide-sm">
            <Orbit
              size={200}
              className="orbit-float"
              rings={[{ r: 100, dash: '1 8' }]}
              dots={[{ r: 100, duration: 32 }]}
            />
          </div>
        </>
      );
      break;
    }

    case 'contact': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-mid absolute -top-16 -left-10">
            <Orbit
              size={300}
              className="orbit-float"
              rings={[{ r: 150 }, { r: 110, dash: '1 9' }]}
              dots={[{ r: 150, duration: 38, reverse: true }, { r: 110, duration: 26 }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-slow absolute -bottom-20 -right-16 orbit-hide-sm">
            <Orbit
              size={220}
              className="orbit-float"
              rings={[{ r: 110 }, { r: 74, arc: [25, 205] }]}
              dots={[{ r: 110, duration: 34 }]}
            />
          </div>
        </>
      );
      break;
    }

    case 'cta': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-52 -right-40">
            <Orbit
              size={700}
              className="orbit-float"
              rings={[{ r: 350 }, { r: 230, dash: '1 11' }, { r: 150, arc: [200, 350] }]}
              dots={[{ r: 350, duration: 60 }, { r: 230, duration: 44, reverse: true }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-mid absolute -bottom-32 -left-32 orbit-hide-sm">
            <Orbit
              size={360}
              className="orbit-float"
              rings={[{ r: 180, dash: '2 14' }, { r: 120 }]}
              dots={[{ r: 180, duration: 40, reverse: true }]}
            />
          </div>
        </>
      );
      break;
    }

    case 'footer': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-24 -left-24 hidden md:block">
            <Orbit
              size={420}
              className="orbit-float"
              rings={[{ r: 210 }, { r: 140, dash: '1 9' }]}
              dots={[{ r: 210, duration: 60 }, { r: 140, duration: 40, reverse: true }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-mid absolute top-[10%] right-[2%] hidden lg:block">
            <Orbit size={150} className="orbit-float" rings={[{ r: 75, dash: '1 7' }]} dots={[{ r: 75, duration: 36 }]} />
          </div>
        </>
      );
      break;
    }

    case 'dark': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-40 -right-40">
            <Orbit
              size={560}
              className="orbit-float"
              rings={[{ r: 280 }, { r: 190, dash: '1 11' }, { r: 120, arc: [60, 240] }]}
              dots={[{ r: 280, duration: 54 }, { r: 190, duration: 38, reverse: true }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-fast absolute -bottom-24 -left-24 orbit-hide-sm">
            <Orbit
              size={260}
              className="orbit-float"
              rings={[{ r: 130, dash: '1 8' }, { r: 86 }]}
              dots={[{ r: 130, duration: 34 }]}
            />
          </div>
        </>
      );
      break;
    }

    case 'raseed': {
      nodes = (
        <>
          <div className="orbit-parallax orbit-p-slow absolute -top-32 -left-32">
            <Orbit
              size={520}
              className="orbit-float"
              rings={[{ r: 260 }, { r: 190, dash: '1 10' }]}
              dots={[{ r: 260, duration: 52 }, { r: 190, duration: 36, reverse: true }]}
            />
          </div>

          <div className="orbit-parallax orbit-p-fast absolute -bottom-24 -right-20 orbit-hide-sm">
            <Orbit
              size={240}
              className="orbit-float"
              rings={[{ r: 120, dash: '2 12' }, { r: 78, arc: [30, 240] }]}
              dots={[{ r: 120, duration: 36 }]}
            />
          </div>
        </>
      );
      break;
    }

    default:
      nodes = null;
  }

  return (
    <div
      className={`orbit-layer ${className}`}
      style={colors as unknown as CSSProperties}
      aria-hidden="true"
    >
      {nodes}
    </div>
  );
}

OrbitBackground.displayName = 'OrbitBackground';