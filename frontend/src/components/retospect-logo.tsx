import HelixPalette from "~/styles/palette";

export const RetospectLogo = ({
  color = HelixPalette.neutral100,
  strokeColor = HelixPalette.neutral80,
  dataId,
  size = 32,
  style,
}: {
  color?: string;
  strokeColor?: string;
  dataId?: string;
  size?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <svg
      data-id={dataId}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal background */}
      <path
        d="M20 3L34 12V28L20 37L6 28V12L20 3Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth="0.5"
      />

      {/* Collaboration icon */}
      <g transform="translate(12, 12)">
        {/* Three vertical bars representing kanban columns */}
        <rect x="1" y="2" width="3" height="12" rx="0.5" fill="white" />
        <rect x="6.5" y="2" width="3" height="12" rx="0.5" fill="white" />
        <rect x="12" y="2" width="3" height="12" rx="0.5" fill="white" />

        {/* Connection indicator at top */}
        <circle cx="2.5" cy="0.5" r="0.75" fill="white" />
        <circle cx="8" cy="0.5" r="0.75" fill="white" />
        <circle cx="13.5" cy="0.5" r="0.75" fill="white" />
        <line
          x1="2.5"
          y1="0.5"
          x2="8"
          y2="0.5"
          stroke="white"
          strokeWidth="0.5"
        />
        <line
          x1="8"
          y1="0.5"
          x2="13.5"
          y2="0.5"
          stroke="white"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
};

export default RetospectLogo;
