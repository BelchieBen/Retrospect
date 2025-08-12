import HelixPalette from "~/styles/palette";

export const IFilterActive = ({
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
        d="M16.1707 3H4.0604C3.23885 3 2.7678 3.93574 3.25715 4.59564L10.2221 13.9882V22L12.575 20.8823V13.986L17.9075 6.79488C16.7909 6.35807 16 5.2714 16 4C16 3.64936 16.0602 3.31278 16.1707 3ZM7.04643 5.23527L11.3975 11.103L15.7487 5.23528L7.04643 5.23527Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M21 4C21 5.10457 20.1046 6 19 6C17.8954 6 17 5.10457 17 4C17 2.89543 17.8954 2 19 2C20.1046 2 21 2.89543 21 4Z"></path>
    </svg>
  );
};

export default IFilterActive;
