import HelixPalette from "../../../styles/palette";

export const IOffline = ({
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
        d="M12 4C8.09 4 4.561 5.553 2 8.049L9.139 15C9.872 14.287 10.883 13.847 12 13.847C13.117 13.847 14.129 14.287 14.86 15L22 8.049C19.439 5.553 15.91 4 12 4ZM12.0002 6C14.5442 6 16.9712 6.76 19.0102 8.169L14.6292 12.434C13.8192 12.049 12.9252 11.846 12.0002 11.846C11.0752 11.846 10.1812 12.049 9.37123 12.434L4.99023 8.169C7.02923 6.76 9.45723 6 12.0002 6Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M12 16C10.896 16 10 16.896 10 18C10 19.104 10.896 20 12 20C13.104 20 14 19.104 14 18C14 16.896 13.104 16 12 16Z"></path>
    </svg>
  );
};

export default IOffline;
