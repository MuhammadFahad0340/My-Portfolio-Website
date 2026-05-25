'use client';

import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

// Natural Earth TopoJSON from official CDN
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Rawalpindi, Pakistan coordinates
const LOCATION: [number, number] = [73.0479, 33.5651];

export default function WorldMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[320px] cursor-grab active:cursor-grabbing"
    >
      {/* Cyan center glow behind Pakistan */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 250, center: [73.0479, 20] }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={8}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a1f35"
                  stroke="#2a3050"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Location Marker — Rawalpindi, Pakistan */}
          <Marker coordinates={LOCATION}>
            {/* Animated pulsing rings */}
            <motion.circle
              r={12}
              fill="rgba(6,182,212,0.08)"
              animate={{ r: [12, 22, 12], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r={7}
              fill="rgba(6,182,212,0.15)"
              animate={{ r: [7, 14, 7], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Glowing beam — line from dot upward */}
            <line
              x1={0} y1={0}
              x2={0} y2={-36}
              stroke="url(#beamGradient)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />

            {/* Core dot */}
            <circle r={3.5} fill="#22d3ee" />
            <circle r={1.8} fill="#ffffff" />

            {/* "We are here" tooltip */}
            <g transform="translate(0, -52)">
              <rect
                x={-44} y={-13}
                width={88} height={24}
                rx={12} ry={12}
                fill="rgba(17,22,37,0.92)"
                stroke="rgba(6,182,212,0.4)"
                strokeWidth={0.8}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                y={0}
                style={{
                  fontSize: '8px',
                  fontWeight: 700,
                  fill: '#e2e8f0',
                  fontFamily: 'sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                I am here
              </text>
            </g>

            {/* SVG gradient for beam */}
            <defs>
              <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.9} />
              </linearGradient>
            </defs>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </motion.div>
  );
}
