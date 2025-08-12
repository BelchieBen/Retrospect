import HelixPalette from "~/styles/palette";

export const ITriangleOutline = ({
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
        d="M12.8302 3.90002C12.4453 3.23336 11.483 3.23336 11.0981 3.90002L2.13547 19.4238C1.75057 20.0905 2.23169 20.9238 3.00149 20.9238H20.9268C21.6966 20.9238 22.1777 20.0905 21.7928 19.4238L12.8302 3.90002ZM12.1745 6.17936C12.0981 6.0433 11.9022 6.0433 11.8257 6.17936L4.76848 18.7424C4.69359 18.8758 4.78994 19.0404 4.94285 19.0404L19.0574 19.0404C19.2103 19.0404 19.3067 18.8758 19.2318 18.7424L12.1745 6.17936Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ITriangleOutline;
