import HelixPalette from "../../../styles/palette";

export const IFilePositive = ({
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
        d="M15.172 2C15.702 2 16.211 2.211 16.586 2.586L19.414 5.414C19.789 5.789 20 6.298 20 6.829V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V4C4 2.896 4.896 2 6 2H15.172ZM6 20H18V8H14V4H6V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M15.8085 10.8384C15.3959 10.4437 14.7347 10.4764 14.3634 10.9097L10.7524 15.1233C10.7062 15.1772 10.6237 15.181 10.5727 15.1314L9.64742 14.232C9.25972 13.8552 8.64167 13.8526 8.25083 14.2262C7.84061 14.6184 7.83908 15.2712 8.24745 15.6653L10.1142 17.4666C10.4158 17.7576 10.9 17.7403 11.1798 17.4285L15.861 12.212C16.2176 11.8146 16.1944 11.2076 15.8085 10.8384Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFilePositive;
