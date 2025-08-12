import HelixPalette from "~/styles/palette";

export const IArtificialIntelligence = ({
  color = HelixPalette.neutral90,
  dataId,
  size = 24,
  style,
}: {
  color?: string;
  dataId?: string;
  size?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <svg
      data-id={dataId}
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <path
        d="M9.20861 9.40375L10.7127 14.4579L11.7018 17.7235L12.3387 19.8644H16.4308L11.5257 5H6.90511L2 19.8644H6.10565L6.74251 17.7235L7.71811 14.4579L9.20861 9.40375ZM21.9999 19.8779V5.01352H18.2059V19.8779H21.9999Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IArtificialIntelligence;
