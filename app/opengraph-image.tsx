import { ImageResponse } from 'next/og';

export const alt = 'Imobicom SRL - Agentie Imobiliara';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#fafaf8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Gold top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#c9a84c',
            display: 'flex',
          }}
        />
        {/* Gold bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#c9a84c',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* House icon */}
          <svg
            viewBox="0 0 360 160"
            width={360}
            height={160}
            style={{ marginBottom: 8 }}
          >
            {/* Roof */}
            <line x1="70" y1="75" x2="180" y2="20" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            <line x1="180" y1="20" x2="290" y2="75" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            {/* Walls */}
            <line x1="85" y1="68" x2="85" y2="140" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            <line x1="275" y1="68" x2="275" y2="140" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            <line x1="85" y1="140" x2="275" y2="140" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            {/* Chimney */}
            <rect x="210" y="28" width="18" height="22" fill="#1a1a1a" rx="1" />
            {/* Window */}
            <rect x="163" y="48" width="34" height="34" fill="none" stroke="#1a1a1a" strokeWidth="4" />
            <line x1="180" y1="48" x2="180" y2="82" stroke="#1a1a1a" strokeWidth="3" />
            <line x1="163" y1="65" x2="197" y2="65" stroke="#1a1a1a" strokeWidth="3" />
          </svg>

          {/* AGENȚIA IMOBILIARĂ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 12,
            }}
          >
            <div style={{ width: 80, height: 2, background: '#1a1a1a', display: 'flex' }} />
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28,
                letterSpacing: '0.25em',
                color: '#1a1a1a',
                fontWeight: 600,
              }}
            >
              AGENTIA IMOBILIARA
            </span>
            <div style={{ width: 80, height: 2, background: '#1a1a1a', display: 'flex' }} />
          </div>

          {/* Gold tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 80, height: 1, background: '#c9a84c', display: 'flex' }} />
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 20,
                letterSpacing: '0.15em',
                color: '#c9a84c',
                fontStyle: 'italic',
              }}
            >
              VINDEM. NU DOAR PROMOVAM.
            </span>
            <div style={{ width: 80, height: 1, background: '#c9a84c', display: 'flex' }} />
          </div>

          {/* IMOBICOM */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 28,
            }}
          >
            <div style={{ width: 60, height: 2, background: '#1a1a1a', display: 'flex' }} />
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 52,
                letterSpacing: '0.45em',
                color: '#1a1a1a',
                fontWeight: 700,
              }}
            >
              IMOBICOM
            </span>
            <div style={{ width: 60, height: 2, background: '#1a1a1a', display: 'flex' }} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
