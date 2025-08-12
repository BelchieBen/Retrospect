import HelixPalette from "~/styles/palette";

export const IArrowLeft2 = ({
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
        d="M11.3871 7.2097C11.7467 6.9301 12.2533 6.9301 12.6129 7.2097L12.7071 7.29289L12.7903 7.3871C13.0699 7.7467 13.0699 8.2533 12.7903 8.6129L12.7071 8.70711L10.414 11H16.4463C16.9986 11 17.4463 11.4477 17.4463 12C17.4463 12.5128 17.0602 12.9355 16.5629 12.9933L16.4463 13H10.414L12.7071 15.2929L12.7903 15.3871C13.0953 15.7794 13.0676 16.3466 12.7071 16.7071C12.3466 17.0676 11.7794 17.0953 11.3871 16.7903L11.2929 16.7071L7.29289 12.7071L7.2097 12.6129C6.9301 12.2533 6.9301 11.7467 7.2097 11.3871L7.29289 11.2929L11.2929 7.29289L11.3871 7.2097Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IArrowLeft2;
