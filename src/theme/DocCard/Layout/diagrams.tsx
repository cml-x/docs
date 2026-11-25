import React from 'react';
import type {CardDiagram} from './card-diagram';

const LINE = 'var(--card-diagram-line)';
const BLUE = 'var(--ifm-color-primary)';
const FILL = 'var(--card-diagram-fill)';
const INK = 'var(--card-diagram-ink)';
const RED = '#da1e28';
const GREEN = '#198038';

type Tone = 'plain' | 'blue' | 'ink' | 'soft';

const paint = (tone: Tone) => (tone === 'blue' ? BLUE : tone === 'ink' ? INK : tone === 'soft' ? 'var(--ifm-color-emphasis-300)' : FILL);

const B = (x: number, y: number, w: number, h: number, tone: Tone = 'plain') => (
  <rect key={`b${x}-${y}-${w}`} x={x} y={y} width={w} height={h} fill={paint(tone)} stroke={tone === 'plain' ? LINE : 'none'} />
);
const W = (d: string, dashed = false, color: string = BLUE) => (
  <path key={`w${d}`} d={d} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray={dashed ? '4 4' : undefined} />
);
const G = (d: string) => W(d, false, LINE);
const T = (x: number, y: number, w: number, color: string = LINE) => <rect key={`t${x}-${y}`} x={x} y={y} width={w} height={4} fill={color} />;
const C = (cx: number, cy: number, r: number, tone: Tone = 'plain') => (
  <circle key={`c${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={paint(tone)} stroke={tone === 'plain' ? LINE : 'none'} />
);
const X = (cx: number, cy: number) => W(`M${cx - 6} ${cy - 6} L${cx + 6} ${cy + 6} M${cx + 6} ${cy - 6} L${cx - 6} ${cy + 6}`, false, RED);
const K = (cx: number, cy: number, color: string = GREEN) => W(`M${cx - 6} ${cy} l4 5 l8 -10`, false, color);
const L = (x: number, y: number, text: string, tone: 'ink' | 'white' = 'ink', size = 12) => (
  <text key={`l${x}-${y}`} x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={600} fill={tone === 'white' ? '#fff' : 'var(--ifm-color-emphasis-800)'}>{text}</text>
);
const person = (cx: number, cy: number, tone: Tone = 'plain') => [C(cx, cy - 8, 7, tone), <path key={`p${cx}-${cy}`} d={`M${cx - 12} ${cy + 14} a12 11 0 0 1 24 0 z`} fill={paint(tone)} stroke={tone === 'plain' ? LINE : 'none'} />];
const cylinder = (cx: number, top: number, rx: number, h: number) => [
  <path key={`y${cx}`} d={`M${cx - rx} ${top} V${top + h} A${rx} 7 0 0 0 ${cx + rx} ${top + h} V${top}`} fill={FILL} stroke={LINE} />,
  <ellipse key={`e${cx}`} cx={cx} cy={top} rx={rx} ry={7} fill={FILL} stroke={LINE} />,
];
const lock = (cx: number, cy: number) => [
  <path key={`k${cx}`} d={`M${cx - 7} ${cy - 4} V${cy - 10} a7 7 0 0 1 14 0 V${cy - 4}`} fill="none" stroke={BLUE} strokeWidth={2} />,
  B(cx - 11, cy - 4, 22, 18, 'blue'),
];
const key = (cx: number, cy: number) => [
  <circle key={`kc${cx}`} cx={cx - 12} cy={cy} r={8} fill="none" stroke={BLUE} strokeWidth={3} />,
  W(`M${cx - 4} ${cy} H${cx + 18} M${cx + 8} ${cy} V${cy + 7} M${cx + 16} ${cy} V${cy + 7}`),
];

const SHAPES: Record<CardDiagram, React.ReactNode> = {
  flow: [B(24, 34, 48, 28), B(96, 34, 48, 28, 'blue'), B(168, 34, 48, 28), W('M72 48 H96'), W('M144 48 H168')],
  gateway: [B(20, 20, 44, 22), B(20, 54, 44, 22), B(104, 14, 20, 68, 'blue'), B(170, 20, 50, 22), B(170, 54, 50, 22), W('M64 31 H104'), W('M64 65 H104'), W('M124 31 H170'), W('M124 65 H170')],
  policy: [B(20, 36, 40, 24), B(92, 16, 56, 64, 'blue'), <rect key="p1" x={104} y={30} width={32} height={6} fill="#fff" />, <rect key="p2" x={104} y={45} width={32} height={6} fill="#fff" />, <rect key="p3" x={104} y={60} width={32} height={6} fill="#fff" />, B(180, 36, 40, 24), W('M60 48 H92'), W('M148 48 H180')],
  domain: [B(20, 18, 200, 22), <rect key="d" x={30} y={26} width={8} height={8} fill={BLUE} />, T(46, 28, 96), B(96, 62, 48, 20, 'blue'), W('M120 40 V62')],
  token: [B(20, 16, 52, 24), B(20, 58, 52, 24, 'ink'), B(112, 30, 20, 40, 'blue'), B(172, 36, 48, 24), W('M72 28 H96 V44 H112'), W('M46 58 V40', true), W('M132 50 H172')],
  people: [...person(40, 30), ...person(40, 70), B(96, 36, 48, 24, 'blue'), B(176, 18, 44, 20), B(176, 58, 44, 20), W('M52 32 H76 V48 H96'), W('M52 72 H76 V48'), W('M144 48 H160 V28 H176'), W('M160 48 V68 H176')],
  store: [...cylinder(56, 28, 30, 40), B(150, 18, 68, 22), B(150, 56, 68, 22), <rect key="s1" x={158} y={26} width={8} height={6} fill={BLUE} />, <rect key="s2" x={158} y={64} width={8} height={6} fill={BLUE} />, W('M86 46 H118 V29 H150', true), W('M118 46 V67 H150', true)],
  clusters: [B(92, 12, 56, 24, 'ink'), B(20, 60, 52, 24), B(94, 60, 52, 24, 'blue'), B(168, 60, 52, 24), W('M120 36 V60'), W('M120 48 H46 V60'), W('M120 48 H194 V60')],
  signals: [G('M20 80 H220'), B(28, 52, 14, 28), B(52, 36, 14, 44), B(76, 60, 14, 20), B(100, 44, 14, 36), W('M132 62 L154 40 L176 54 L212 22'), C(212, 22, 4, 'blue')],
  repository: [W('M28 30 H212'), W('M76 30 V62 H164 V30', true), ...[28, 76, 164, 212].map(x => <circle key={`r${x}`} cx={x} cy={30} r={6} fill={FILL} stroke={BLUE} strokeWidth={1.5} />), C(100, 62, 6, 'blue'), C(140, 62, 6, 'blue')],
  settings: [G('M28 24 H212'), G('M28 48 H212'), G('M28 72 H212'), B(150, 17, 14, 14), B(76, 41, 14, 14, 'blue'), B(118, 65, 14, 14)],
  build: [B(20, 26, 56, 44, 'ink'), T(30, 38, 24, '#78a9ff'), T(36, 48, 30, '#f4f4f4'), T(36, 58, 20, '#f4f4f4'), B(104, 34, 40, 28), B(172, 34, 48, 28, 'blue'), W('M76 48 H104'), W('M144 48 H172')],
  catalog: [0, 1, 2, 3].flatMap(col => [0, 1].map(row => B(28 + col * 48, 16 + row * 36, 36, 26, col === 1 && row === 0 ? 'blue' : 'plain'))),
  diagnose: [B(20, 34, 44, 28), B(98, 34, 44, 28), B(176, 34, 44, 28), W('M64 48 H98'), W('M142 48 H164', true, RED), X(156, 48), <circle key="dg" cx={120} cy={48} r={22} fill="none" stroke={BLUE} strokeWidth={1.5} />],
  steps: [W('M44 48 H196'), C(44, 48, 14, 'blue'), C(120, 48, 14), C(196, 48, 14), L(44, 53, '1', 'white'), L(120, 53, '2'), L(196, 53, '3')],

  apiKey: [...key(60, 48), B(112, 20, 16, 56, 'blue'), B(168, 36, 52, 24), W('M80 48 H112'), W('M128 48 H168')],
  lock: [B(20, 36, 52, 24), B(168, 36, 52, 24), W('M72 48 H168'), ...lock(120, 50)],
  password: [B(40, 30, 160, 36), ...person(64, 46, 'soft'), ...[98, 114, 130, 146, 162].map(x => C(x, 48, 4, 'ink')), B(176, 40, 16, 16, 'blue')],
  breaker: [B(20, 36, 48, 24), B(172, 36, 48, 24), W('M68 48 H104'), W('M140 48 H172'), W('M104 48 L132 28'), C(104, 48, 4, 'blue'), C(140, 48, 4, 'blue'), X(120, 70)],
  clientTraffic: [...person(34, 26), ...person(34, 66), B(100, 14, 20, 68, 'blue'), W('M48 28 H100'), W('M48 68 H100'), <path key="ct" d="M150 66 A30 30 0 0 1 210 66" fill="none" stroke={LINE} strokeWidth={6} />, W('M180 66 L198 44')],
  origins: [B(20, 20, 84, 56), B(136, 20, 84, 56), G('M20 34 H104'), G('M136 34 H220'), C(30, 27, 3, 'blue'), C(146, 27, 3, 'ink'), W('M84 54 H156'), K(120, 46, BLUE)],
  script: [B(20, 36, 40, 24), B(180, 36, 40, 24), B(84, 16, 72, 64, 'ink'), T(94, 30, 28, '#78a9ff'), T(102, 42, 40, '#f4f4f4'), T(102, 54, 28, '#42be65'), T(94, 66, 20, '#78a9ff'), W('M60 48 H84'), W('M156 48 H180')],
  askOutside: [B(20, 50, 44, 24), B(98, 44, 20, 36, 'blue'), B(170, 50, 50, 24), B(86, 8, 44, 20, 'ink'), W('M64 62 H98'), W('M118 62 H170'), W('M102 44 V28', true), W('M114 28 V44', true)],
  headers: [B(40, 14, 160, 16), B(40, 34, 160, 16, 'blue'), B(40, 54, 160, 16), B(40, 74, 160, 10, 'soft'), T(50, 20, 40), <rect key="h" x={50} y={40} width={56} height={4} fill="#fff" />, T(50, 60, 32)],
  allowDeny: [B(30, 16, 180, 18), B(30, 39, 180, 18), B(30, 62, 180, 18), T(42, 23, 70), T(42, 46, 90), T(42, 69, 56), K(190, 25), X(190, 48), K(190, 71)],
  tokenParts: [B(24, 34, 58, 28, 'ink'), B(90, 34, 74, 28, 'blue'), B(172, 34, 44, 28), C(86, 62, 2, 'ink'), C(168, 62, 2, 'ink'), T(34, 46, 36, '#f4f4f4'), <rect key="tp" x={100} y={46} width={52} height={4} fill="#fff" />, T(180, 46, 28)],
  fanOut: [B(20, 36, 44, 24, 'blue'), B(170, 10, 50, 20), B(170, 38, 50, 20), B(170, 66, 50, 20), W('M64 48 H120 V20 H170'), W('M120 48 H170'), W('M120 48 V76 H170')],
  ceiling: [G('M20 82 H220'), W('M20 30 H220', true, RED), B(32, 52, 20, 30), B(64, 40, 20, 42), B(96, 30, 20, 52, 'blue'), B(128, 30, 20, 52, 'blue'), B(160, 46, 20, 36), B(192, 60, 20, 22)],
  loop: [B(20, 36, 48, 24), B(172, 36, 48, 24), W('M68 48 H172'), <path key="lp" d="M150 36 A30 22 0 1 0 92 36" fill="none" stroke={BLUE} strokeWidth={1.5} strokeDasharray="4 4" />, W('M92 36 l-2 -10 M92 36 l10 -3')],
  clock: [B(20, 36, 44, 24), B(176, 36, 44, 24), W('M64 48 H92'), W('M148 48 H176', true), <circle key="ck" cx={120} cy={48} r={26} fill={FILL} stroke={BLUE} strokeWidth={1.5} />, W('M120 48 V30 M120 48 L134 56')],
  rewrite: [B(20, 20, 200, 20), T(30, 28, 28), T(64, 28, 44, BLUE), B(20, 58, 200, 20), T(30, 66, 28), T(64, 66, 70, INK), W('M86 40 V58')],
  grouped: [<rect key="gr" x={20} y={12} width={200} height={72} fill="none" stroke={BLUE} strokeDasharray="5 4" />, B(34, 30, 48, 36), B(96, 30, 48, 36, 'blue'), B(158, 30, 48, 36)],
  route: [B(20, 14, 20, 68, 'blue'), W('M40 48 H120'), B(120, 34, 100, 28), T(132, 46, 24, BLUE), T(162, 46, 44)],
  routing: [B(20, 36, 40, 24), C(110, 48, 12, 'blue'), B(176, 10, 44, 20), B(176, 38, 44, 20), B(176, 66, 44, 20), W('M60 48 H98'), W('M122 48 H176'), G('M118 40 L176 22'), G('M118 56 L176 76')],
  outside: [<rect key="ou" x={12} y={10} width={130} height={76} fill="none" stroke={LINE} strokeDasharray="5 4" />, B(28, 36, 44, 24), B(90, 20, 16, 56, 'blue'), B(176, 36, 48, 24, 'ink'), W('M72 48 H90'), W('M106 48 H176')],
  placement: [B(16, 14, 96, 68), B(128, 14, 96, 68), B(28, 28, 30, 20, 'blue'), B(66, 28, 30, 20, 'blue'), B(28, 54, 30, 20, 'soft'), B(140, 28, 30, 20, 'soft'), B(178, 54, 30, 20, 'blue')],
  gearFlow: [B(20, 36, 44, 24), B(176, 36, 44, 24), W('M64 48 H94'), W('M146 48 H176'), <circle key="g1" cx={120} cy={48} r={22} fill="none" stroke={BLUE} strokeWidth={6} strokeDasharray="8 6" />, C(120, 48, 8, 'blue')],
  gauges: [<path key="ga" d="M24 66 A34 34 0 0 1 92 66" fill="none" stroke={LINE} strokeWidth={8} />, <path key="gb" d="M24 66 A34 34 0 0 1 70 36" fill="none" stroke={BLUE} strokeWidth={8} />, <path key="gc" d="M148 66 A34 34 0 0 1 216 66" fill="none" stroke={LINE} strokeWidth={8} />, <path key="gd" d="M148 66 A34 34 0 0 1 166 40" fill="none" stroke={BLUE} strokeWidth={8} />, T(40, 76, 36), T(164, 76, 36)],
  fileToBox: [B(28, 14, 64, 68), T(38, 26, 40), T(38, 38, 30, BLUE), T(38, 50, 44), T(38, 62, 24), W('M92 48 H156'), B(156, 30, 60, 36, 'blue')],
  nested: [B(24, 12, 192, 72), B(40, 26, 160, 44, 'soft'), B(58, 36, 60, 24, 'blue'), B(126, 36, 56, 24)],
  calendar: [B(40, 16, 160, 66), B(40, 16, 160, 16, 'ink'), ...[0, 1, 2, 3, 4].flatMap(c => [0, 1].map(r => B(52 + c * 28, 42 + r * 18, 18, 10, c === 2 && r === 0 ? 'blue' : 'soft')))],
  minAvailable: [B(28, 28, 44, 40, 'blue'), B(98, 28, 44, 40, 'blue'), B(168, 28, 44, 40), X(190, 48), W('M20 78 H150'), T(156, 76, 24)],
  keyValues: [B(30, 14, 180, 18), B(30, 39, 180, 18), B(30, 64, 180, 18), T(40, 21, 44, INK), T(40, 46, 30, INK), T(40, 71, 56, INK), T(112, 21, 70, BLUE), T(112, 46, 50, BLUE), T(112, 71, 84, BLUE)],
  heartbeat: [G('M20 48 H70'), W('M70 48 L86 48 L96 22 L112 74 L124 36 L134 48 H170'), G('M170 48 H220'), C(204, 48, 6, 'blue')],
  heap: [B(30, 30, 180, 36), B(30, 30, 104, 36, 'blue'), W('M170 22 V74', true, RED), T(30, 76, 60)],
  twoBars: [B(30, 20, 180, 20), B(30, 20, 70, 20, 'blue'), B(30, 56, 180, 20), B(30, 56, 130, 20, 'ink'), W('M100 14 V46', true), W('M160 50 V82', true)],
  volume: [B(24, 30, 70, 36, 'blue'), ...cylinder(180, 30, 30, 40), W('M94 48 H150')],
  isolation: [B(20, 14, 60, 30, 'blue'), B(90, 14, 60, 30, 'blue'), B(160, 14, 60, 30, 'blue'), B(20, 52, 60, 30, 'blue'), <rect key="is" x={90} y={52} width={60} height={30} fill={FILL} stroke={RED} strokeDasharray="5 4" />, B(160, 52, 60, 30, 'blue')],
  map: [B(20, 12, 200, 18), B(20, 38, 60, 22), B(90, 38, 60, 22, 'blue'), B(160, 38, 60, 22), B(20, 68, 200, 16, 'ink')],
  replicas: [B(20, 36, 44, 24), W('M64 48 H108'), B(108, 22, 46, 30), B(122, 34, 46, 30), B(136, 46, 46, 30, 'blue'), W('M196 62 H222 M209 49 V75')],
  matrix: [...[0, 1, 2].flatMap(r => [0, 1, 2, 3].map(c => B(60 + c * 40, 16 + r * 24, 32, 16, (r + c) % 3 === 0 ? 'blue' : 'plain'))), T(20, 22, 28), T(20, 46, 28), T(20, 70, 28)],
  robot: [B(84, 22, 72, 52), C(106, 44, 6, 'blue'), C(134, 44, 6, 'blue'), T(104, 60, 32), W('M120 22 V10'), C(120, 8, 4, 'blue'), ...key(204, 48), G('M156 48 H178'), B(20, 36, 40, 24), G('M60 48 H84')],
  roleCard: [B(50, 14, 140, 68), B(50, 14, 140, 18, 'ink'), K(70, 46, BLUE), T(88, 44, 80), K(70, 66, BLUE), T(88, 64, 56)],
  addUser: [...person(96, 44), W('M150 30 V62 M134 46 H166'), <circle key="au" cx={150} cy={46} r={24} fill="none" stroke={BLUE} strokeWidth={1.5} />],
  twoFactor: [B(24, 30, 76, 36), ...[40, 54, 68, 82].map(x => C(x, 48, 4, 'ink')), W('M100 48 H132'), B(132, 14, 44, 68), T(142, 26, 24), B(144, 44, 20, 20, 'blue'), W('M176 48 H200'), K(210, 48, GREEN)],
  orgTree: [B(92, 10, 56, 22, 'ink'), B(20, 46, 60, 22, 'blue'), B(160, 46, 60, 22, 'blue'), W('M120 32 V40 H50 V46'), W('M120 40 H190 V46'), B(20, 74, 26, 12), B(54, 74, 26, 12), B(160, 74, 26, 12), B(194, 74, 26, 12)],
  triple: [C(48, 48, 22), C(120, 48, 22, 'blue'), C(192, 48, 22), W('M70 48 H98'), W('M142 48 H170'), ...person(48, 46, 'soft'), K(120, 50, '#fff'), T(180, 46, 24)],
  toggles: [...[24, 48, 72].flatMap((y, i) => [T(30, y - 2, 80), <rect key={`tg${y}`} x={160} y={y - 9} width={40} height={18} rx={9} fill={i === 1 ? 'var(--ifm-color-emphasis-300)' : BLUE} />, <circle key={`tc${y}`} cx={i === 1 ? 169 : 191} cy={y} r={6} fill="#fff" />])],
  userList: [...[18, 42, 66].flatMap((y, i) => [B(30, y, 180, 20, i === 0 ? 'soft' : 'plain'), C(44, y + 10, 6, i === 1 ? 'blue' : 'ink'), T(58, y + 8, 60), T(150, y + 8, 40, i === 1 ? BLUE : LINE)])],
  lockUser: [...person(80, 44), ...lock(160, 50), G('M96 48 H140')],
  tag: [W('M28 60 H212'), ...[28, 90, 152].map(x => C(x, 60, 6)), C(212, 60, 7, 'blue'), <path key="tg" d="M172 14 H216 V34 H172 L160 24 Z" fill={BLUE} />, <rect key="tgl" x={180} y={22} width={26} height={4} fill="#fff" />, W('M212 34 V53')],
  stamp: [B(24, 20, 60, 56, 'ink'), T(34, 32, 40, '#f4f4f4'), T(34, 44, 30, '#78a9ff'), T(34, 56, 36, '#f4f4f4'), W('M84 48 H128'), B(128, 14, 56, 44), B(144, 30, 56, 44), B(160, 46, 56, 36, 'blue')],
  schema: [B(24, 14, 80, 68), B(24, 14, 80, 16, 'ink'), T(34, 40, 30), T(34, 52, 44), T(34, 64, 24), B(136, 14, 80, 68), B(136, 14, 80, 16, 'blue'), T(146, 40, 44), T(146, 52, 30), W('M104 54 H136')],
  plug: [B(20, 30, 70, 36, 'blue'), W('M90 40 H112 M90 56 H112'), B(128, 30, 92, 36), W('M128 40 H118 M128 56 H118', false, LINE), T(142, 46, 60)],
  versions: [B(28, 26, 60, 44, 'soft'), B(90, 20, 60, 56), B(152, 14, 60, 68, 'blue'), L(58, 53, 'v1'), L(120, 53, 'v2'), L(182, 53, 'v3', 'white')],
  editor: [B(20, 12, 200, 72, 'ink'), <rect key="ed" x={20} y={12} width={48} height={72} fill="var(--ifm-color-emphasis-700)" />, T(28, 24, 30, '#c6c6c6'), T(28, 36, 22, '#c6c6c6'), T(28, 48, 30, '#78a9ff'), T(80, 26, 60, '#78a9ff'), T(90, 38, 90, '#f4f4f4'), T(90, 50, 60, '#42be65'), T(80, 62, 40, '#78a9ff')],
  share: [C(60, 48, 12, 'blue'), C(180, 22, 10), C(180, 74, 10), C(204, 48, 10), W('M72 44 L170 24'), W('M72 52 L170 72'), W('M72 48 H194')],
  stages: [B(20, 34, 58, 28), B(91, 34, 58, 28), B(162, 34, 58, 28, 'blue'), W('M78 48 H91'), W('M149 48 H162'), T(30, 70, 38), T(101, 70, 38), T(172, 70, 38, BLUE)],
  logPipe: [B(20, 16, 60, 64), T(28, 28, 40), T(28, 40, 30), T(28, 52, 44), T(28, 64, 24), W('M80 48 H120'), B(120, 38, 20, 20, 'blue'), W('M140 48 H170 V26 H186'), W('M170 48 V70 H186'), B(186, 16, 34, 20), B(186, 60, 34, 20, 'ink')],
  network: [C(40, 26, 10), C(40, 70, 10), C(120, 48, 12, 'blue'), C(200, 26, 10), C(200, 70, 10), W('M50 30 L108 44'), W('M50 66 L108 52'), W('M132 44 L190 30'), W('M132 52 L174 64', true, RED), X(182, 67)],
  tunnel: [B(16, 26, 60, 44), B(164, 26, 60, 44, 'ink'), <rect key="tu" x={76} y={38} width={88} height={20} fill={FILL} stroke={BLUE} strokeDasharray="5 4" />, W('M84 48 H156'), ...lock(120, 22)],
  target: [B(20, 12, 200, 72), <rect key="ta" x={36} y={26} width={100} height={44} fill="none" stroke={BLUE} strokeDasharray="5 4" />, B(48, 36, 34, 24, 'blue'), B(90, 36, 34, 24), B(152, 26, 52, 44, 'soft')],
  dashboard: [B(20, 12, 200, 72), B(30, 22, 54, 24, 'blue'), B(92, 22, 54, 24), B(154, 22, 56, 24), G('M30 74 H210'), W('M34 70 L70 58 L104 66 L140 54 L176 62 L206 52')],
  logLines: [B(20, 12, 200, 72, 'ink'), ...[24, 36, 48, 60, 72].map((y, i) => T(32, y, [150, 110, 170, 90, 130][i], i === 2 ? '#fa4d56' : '#c6c6c6')), <circle key="ll" cx={196} cy={30} r={12} fill="none" stroke="#78a9ff" strokeWidth={2} />, <path key="lm" d="M204 39 L214 50" stroke="#78a9ff" strokeWidth={2} />],
  spans: [B(20, 14, 200, 12, 'blue'), B(20, 32, 80, 12), B(60, 50, 110, 12, 'ink'), B(110, 68, 60, 12), G('M20 86 H220')],
  alert: [G('M20 80 H220'), W('M20 36 H220', true, RED), W('M24 68 L64 60 L100 64 L136 44 L164 24 L200 30'), C(164, 24, 5, 'blue'), <path key="al" d="M196 44 L214 76 H178 Z" fill={RED} />, <rect key="am" x={194} y={56} width={4} height={10} fill="#fff" />],
  clientList: [B(20, 16, 90, 64), ...[28, 46, 64].map((y, i) => T(30, y, [60, 44, 52][i], i === 1 ? BLUE : LINE)), W('M110 48 H150'), B(150, 28, 20, 40, 'blue'), W('M170 48 H196'), K(208, 48)],
  search: [B(24, 18, 150, 24), T(34, 28, 70), <circle key="se" cx={196} cy={30} r={12} fill="none" stroke={BLUE} strokeWidth={2} />, W('M205 39 L216 50'), B(24, 54, 44, 26), B(76, 54, 44, 26, 'blue'), B(128, 54, 44, 26)],
};

export default function CardDiagramFigure({name}: {name: CardDiagram}): React.ReactElement {
  return (
    <svg viewBox="0 0 240 96" role="presentation" aria-hidden="true" focusable="false">
      {SHAPES[name]}
    </svg>
  );
}
