import HelixPalette from "../../../styles/palette";

export const IArrowRight2 = ({
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
        d="M13.0592 16.7903C12.6996 17.0699 12.193 17.0699 11.8334 16.7903L11.7392 16.7071L11.656 16.6129C11.3764 16.2533 11.3764 15.7467 11.656 15.3871L11.7392 15.2929L14.0303 13.001L8 13C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11L14.0323 11.001L11.7392 8.70711L11.656 8.6129C11.351 8.22061 11.3787 7.65338 11.7392 7.29289C12.0997 6.93241 12.6669 6.90468 13.0592 7.2097L13.1534 7.29289L17.1534 11.2929L17.2366 11.3871C17.5162 11.7467 17.5162 12.2533 17.2366 12.6129L17.1534 12.7071L13.1534 16.7071L13.0592 16.7903Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IArrowRight2;
