import HelixPalette from "~/styles/palette";

export const IXl = ({
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
        d="M16.586 2.58582C16.211 2.21082 15.702 1.99982 15.172 1.99982H6C4.896 1.99982 4 2.89582 4 3.99982V9.99982H2V17.9998H4V19.9998C4 21.1048 4.896 21.9998 6 21.9998H18C19.105 21.9998 20 21.1048 20 19.9998V6.82882C20 6.29782 19.789 5.78882 19.414 5.41382L16.586 2.58582ZM18 19.9998H6V17.9998H16V9.99982H6V3.99982H14V7.99982H18V19.9998ZM5.973 15.9998H5L6.421 13.9378L5.091 11.9998H6.093L7.016 13.4398L7.921 11.9998H8.899L7.555 13.9838L9.002 15.9998H7.965L6.969 14.4878L5.973 15.9998ZM13.002 15.2998V15.9998H10.356V11.9998H11.265V15.2998H13.002Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IXl;
