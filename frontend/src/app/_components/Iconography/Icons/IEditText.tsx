import HelixPalette from "~/styles/palette";

export const IEditText = ({
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
      <path d="M4 8V6H13V8H9.5V18H7.5V8H4Z"></path>
      <path
        d="M17.9435 11C17.7253 11 17.5076 11.0832 17.3411 11.2497L13.245 15.3458L13.0027 17.5267C12.9743 17.7822 13.175 18 13.425 18C13.441 18 13.4569 17.9992 13.4728 17.9973L15.6545 17.755L19.7503 13.6588C20.0832 13.3263 20.0832 12.7869 19.7503 12.4541L18.5459 11.2497C18.3795 11.0832 18.1613 11 17.9435 11ZM14.5607 17.0939L13.9062 16.439L13.9879 15.7029L16.5289 13.1619L17.0461 13.6791L14.9014 15.8234L15.1763 16.0988L17.321 13.954L17.8379 14.4713L15.2976 17.0123L14.5607 17.0939ZM18.3882 13.9214L17.0788 12.612L17.8912 11.7996C17.9056 11.7852 17.9231 11.7778 17.9437 11.7778C17.9639 11.7778 17.9814 11.7852 17.9958 11.7996L19.2006 13.004C19.2149 13.0187 19.2223 13.0362 19.2223 13.0565C19.2223 13.0767 19.2149 13.0946 19.2006 13.109L18.3882 13.9214Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IEditText;
