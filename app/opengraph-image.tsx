import { ImageResponse } from 'next/og';

export const alt = 'NextAge Consult — Raising Solution Providers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(circle at 85% 10%, rgba(20,153,230,.45), transparent 45%), radial-gradient(circle at 10% 95%, rgba(248,184,23,.30), transparent 40%), #03142B',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 72,
              border: '4px solid #F8B817',
              borderRadius: 14,
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            <span style={{ color: '#F8B817' }}>N</span>AC
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>NEXTAGE CONSULT</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1, letterSpacing: -3 }}>Raising Solution Providers</div>
          <div style={{ marginTop: 24, fontSize: 34, fontWeight: 800, color: '#F8B817' }}>NEXTAGE 360 EQUIP HUB</div>
        </div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,.75)', letterSpacing: 6 }}>LEARN • CREATE • EARN • IMPACT</div>
      </div>
    ),
    size,
  );
}
