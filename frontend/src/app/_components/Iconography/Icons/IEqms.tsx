import HelixPalette from "~/styles/palette";

export const IEqms = ({
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
        d="M10.7868 4.5498V2C15.3884 2 19.1235 5.73506 19.1235 10.3367C19.1235 13.9223 16.8625 16.9801 13.6852 18.1554L15.3386 20.4661L13.237 22L10.7868 18.6733V16.1335C7.58961 16.1334 5 13.5438 5 10.3466C5 7.14938 7.58964 4.55974 10.7869 4.55974L10.7371 7.03982C8.90438 7.03982 7.42032 8.52389 7.42032 10.3566C7.42032 12.1892 8.90438 13.6733 10.7371 13.6733L10.7868 16.1303V16.1235C13.984 16.1235 16.5737 13.5339 16.5737 10.3367C16.5737 7.13945 13.984 4.5498 10.7868 4.5498ZM11.9523 10.3367C11.9523 10.9858 11.4261 11.512 10.777 11.512C10.1279 11.512 9.60171 10.9858 9.60171 10.3367C9.60171 9.68756 10.1279 9.16136 10.777 9.16136C11.4261 9.16136 11.9523 9.68756 11.9523 10.3367Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IEqms;
