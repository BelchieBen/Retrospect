import HelixPalette from "~/styles/palette";

export const IChevronLeft = ({
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
        d="M14.7071 16.7071C15.0676 16.3466 15.0953 15.7794 14.7903 15.3871L14.7071 15.2929L11.415 12L14.7071 8.70711C15.0676 8.34662 15.0953 7.77939 14.7903 7.3871L14.7071 7.29289C14.3466 6.93241 13.7794 6.90468 13.3871 7.2097L13.2929 7.29289L9.29289 11.2929C8.93241 11.6534 8.90468 12.2206 9.2097 12.6129L9.29289 12.7071L13.2929 16.7071C13.6834 17.0976 14.3166 17.0976 14.7071 16.7071Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IChevronLeft;
