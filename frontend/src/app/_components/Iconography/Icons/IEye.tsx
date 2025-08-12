import HelixPalette from "~/styles/palette";

export const IEye = ({
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
      <path d="M10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10C10.896 10 10 10.896 10 12Z"></path>
      <path
        d="M12 6C8.082 6 4.543 8.301 2 12C4.543 15.699 8.082 18 12 18C15.918 18 19.457 15.699 22 12C19.457 8.301 15.918 6 12 6ZM12 8.00001C14.734 8.00001 17.358 9.41001 19.499 12C17.358 14.591 14.734 16 12 16C9.26498 16 6.64198 14.591 4.50098 12C6.64198 9.41001 9.26498 8.00001 12 8.00001Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IEye;
