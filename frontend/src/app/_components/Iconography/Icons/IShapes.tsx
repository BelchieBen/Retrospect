import HelixPalette from "~/styles/palette";

export const IShapes = ({
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
        d="M16.1174 16.0201C19.4559 15.4601 21.9999 12.5566 21.9999 9.05892C21.9999 5.16052 18.8397 2.00024 14.9413 2.00024C11.4437 2.00024 8.54026 4.54406 7.98018 7.88248H4C2.89543 7.88248 2 8.7779 2 9.88247V19.9998C2 21.1044 2.89543 21.9998 4 21.9998H14.1174C15.2219 21.9998 16.1174 21.1044 16.1174 19.9998V16.0201ZM7.89329 9.45107H3.56863V20.4312H14.5488V16.1069C10.9628 15.9104 8.08966 13.0372 7.89329 9.45107ZM20.5881 9.05892C20.5881 12.1776 18.0599 14.7059 14.9411 14.7059C11.8224 14.7059 9.29419 12.1776 9.29419 9.05892C9.29419 5.9402 11.8224 3.41197 14.9411 3.41197C18.0599 3.41197 20.5881 5.9402 20.5881 9.05892Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IShapes;
