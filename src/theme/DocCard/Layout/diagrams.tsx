import React from 'react';
import type {CardDiagram} from './card-diagram';

const LINE = 'var(--card-diagram-line)';
const BLUE = 'var(--ifm-color-primary)';
const FILL = 'var(--card-diagram-fill)';
const INK = 'var(--card-diagram-ink)';

const Box = ({x, y, w, h, tone = 'plain'}: {x: number; y: number; w: number; h: number; tone?: 'plain' | 'blue' | 'ink'}) => (
  <rect x={x} y={y} width={w} height={h} fill={tone === 'blue' ? BLUE : tone === 'ink' ? INK : FILL} stroke={tone === 'plain' ? LINE : 'none'} />
);

const Wire = ({d, dashed = false}: {d: string; dashed?: boolean}) => (
  <path d={d} fill="none" stroke={BLUE} strokeWidth={1.5} strokeDasharray={dashed ? '4 4' : undefined} />
);

const Tick = ({x, y, w}: {x: number; y: number; w: number}) => <rect x={x} y={y} width={w} height={4} fill={LINE} />;

const SHAPES: Record<CardDiagram, React.ReactNode> = {
  flow: (
    <>
      <Box x={24} y={34} w={48} h={28} /><Box x={96} y={34} w={48} h={28} tone="blue" /><Box x={168} y={34} w={48} h={28} />
      <Wire d="M72 48 H96" /><Wire d="M144 48 H168" />
    </>
  ),
  gateway: (
    <>
      <Box x={20} y={20} w={44} h={22} /><Box x={20} y={54} w={44} h={22} />
      <Box x={104} y={14} w={20} h={68} tone="blue" />
      <Box x={170} y={20} w={50} h={22} /><Box x={170} y={54} w={50} h={22} />
      <Wire d="M64 31 H104" /><Wire d="M64 65 H104" /><Wire d="M124 31 H170" /><Wire d="M124 65 H170" />
    </>
  ),
  policy: (
    <>
      <Box x={20} y={36} w={40} h={24} />
      <Box x={92} y={16} w={56} h={64} tone="blue" />
      <rect x={104} y={30} width={32} height={6} fill="#fff" /><rect x={104} y={45} width={32} height={6} fill="#fff" /><rect x={104} y={60} width={32} height={6} fill="#fff" />
      <Box x={180} y={36} w={40} h={24} />
      <Wire d="M60 48 H92" /><Wire d="M148 48 H180" />
    </>
  ),
  domain: (
    <>
      <Box x={20} y={18} w={200} h={22} /><rect x={30} y={26} width={8} height={8} fill={BLUE} /><Tick x={46} y={28} w={96} />
      <Box x={96} y={62} w={48} h={20} tone="blue" />
      <Wire d="M120 40 V62" />
    </>
  ),
  token: (
    <>
      <Box x={20} y={16} w={52} h={24} />
      <Box x={20} y={58} w={52} h={24} tone="ink" />
      <Box x={112} y={30} w={20} h={40} tone="blue" />
      <Box x={172} y={36} w={48} h={24} />
      <Wire d="M72 28 H96 V44 H112" /><Wire d="M46 58 V40" dashed /><Wire d="M132 50 H172" />
    </>
  ),
  people: (
    <>
      <circle cx={40} cy={30} r={9} fill={FILL} stroke={LINE} /><circle cx={40} cy={68} r={9} fill={FILL} stroke={LINE} />
      <Box x={96} y={36} w={48} h={24} tone="blue" />
      <Box x={176} y={18} w={44} h={20} /><Box x={176} y={58} w={44} h={20} />
      <Wire d="M49 30 H76 V48 H96" /><Wire d="M49 68 H76 V48" /><Wire d="M144 48 H160 V28 H176" /><Wire d="M160 48 V68 H176" />
    </>
  ),
  store: (
    <>
      <ellipse cx={56} cy={28} rx={30} ry={8} fill={FILL} stroke={LINE} /><path d="M26 28 V68 A30 8 0 0 0 86 68 V28" fill={FILL} stroke={LINE} />
      <Box x={150} y={18} w={68} h={22} /><Box x={150} y={56} w={68} h={22} />
      <rect x={158} y={26} width={8} height={6} fill={BLUE} /><rect x={158} y={64} width={8} height={6} fill={BLUE} />
      <Wire d="M86 40 H118 V29 H150" dashed /><Wire d="M118 40 V67 H150" dashed />
    </>
  ),
  clusters: (
    <>
      <Box x={92} y={12} w={56} h={24} tone="ink" />
      <Box x={20} y={60} w={52} h={24} /><Box x={94} y={60} w={52} h={24} tone="blue" /><Box x={168} y={60} w={52} h={24} />
      <Wire d="M120 36 V60" /><Wire d="M120 48 H46 V60" /><Wire d="M120 48 H194 V60" />
    </>
  ),
  signals: (
    <>
      <path d="M20 80 H220" stroke={LINE} fill="none" />
      {[28, 52, 76, 100].map((x, i) => (<rect key={x} x={x} y={[52, 36, 60, 44][i]} width={14} height={[28, 44, 20, 36][i]} fill={FILL} stroke={LINE} />))}
      <Wire d="M132 62 L154 40 L176 54 L212 22" />
      <circle cx={212} cy={22} r={4} fill={BLUE} />
    </>
  ),
  repository: (
    <>
      <Wire d="M28 30 H212" /><Wire d="M76 30 V62 H164 V30" dashed />
      {[28, 76, 164, 212].map(x => (<circle key={x} cx={x} cy={30} r={6} fill={FILL} stroke={BLUE} strokeWidth={1.5} />))}
      {[100, 140].map(x => (<circle key={x} cx={x} cy={62} r={6} fill={BLUE} />))}
    </>
  ),
  settings: (
    <>
      {[24, 48, 72].map((y, i) => (
        <g key={y}>
          <path d={`M28 ${y} H212`} stroke={LINE} fill="none" />
          <rect x={[150, 76, 118][i]} y={y - 7} width={14} height={14} fill={i === 1 ? BLUE : FILL} stroke={i === 1 ? 'none' : LINE} />
        </g>
      ))}
    </>
  ),
  build: (
    <>
      <Box x={20} y={26} w={56} h={44} tone="ink" />
      <rect x={30} y={38} width={24} height={4} fill="#78a9ff" /><rect x={36} y={48} width={30} height={4} fill="#f4f4f4" /><rect x={36} y={58} width={20} height={4} fill="#f4f4f4" />
      <Box x={104} y={34} w={40} h={28} />
      <Box x={172} y={34} w={48} h={28} tone="blue" />
      <Wire d="M76 48 H104" /><Wire d="M144 48 H172" />
    </>
  ),
  catalog: (
    <>
      {[0, 1, 2, 3].map(col => [0, 1].map(row => (
        <rect key={`${col}-${row}`} x={28 + col * 48} y={16 + row * 36} width={36} height={26} fill={col === 1 && row === 0 ? BLUE : FILL} stroke={col === 1 && row === 0 ? 'none' : LINE} />
      )))}
    </>
  ),
  diagnose: (
    <>
      <Box x={20} y={34} w={44} h={28} /><Box x={98} y={34} w={44} h={28} /><Box x={176} y={34} w={44} h={28} />
      <Wire d="M64 48 H98" /><path d="M142 48 H164" stroke="#da1e28" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
      <path d="M150 40 L162 56 M162 40 L150 56" stroke="#da1e28" strokeWidth={2} fill="none" />
      <circle cx={120} cy={48} r={22} fill="none" stroke={BLUE} strokeWidth={1.5} />
    </>
  ),
  steps: (
    <>
      <Wire d="M44 48 H196" />
      {[44, 120, 196].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={48} r={14} fill={i === 0 ? BLUE : FILL} stroke={i === 0 ? 'none' : LINE} />
          <text x={x} y={53} textAnchor="middle" fontSize={13} fontWeight={600} fill={i === 0 ? '#fff' : 'var(--ifm-color-emphasis-700)'}>{i + 1}</text>
        </g>
      ))}
    </>
  ),
};

export default function CardDiagramFigure({name}: {name: CardDiagram}): React.ReactElement {
  return (
    <svg viewBox="0 0 240 96" role="presentation" aria-hidden="true" focusable="false">
      {SHAPES[name]}
    </svg>
  );
}
