import HelixPalette from "../../../styles/palette";

export const IChevronRight = ({
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
        d="M9.29289 16.7071C8.93241 16.3466 8.90468 15.7794 9.2097 15.3871L9.29289 15.2929L12.585 12L9.29289 8.70711C8.93241 8.34662 8.90468 7.77939 9.2097 7.3871L9.29289 7.29289C9.65338 6.93241 10.2206 6.90468 10.6129 7.2097L10.7071 7.29289L14.7071 11.2929C15.0676 11.6534 15.0953 12.2206 14.7903 12.6129L14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IChevronRight;
