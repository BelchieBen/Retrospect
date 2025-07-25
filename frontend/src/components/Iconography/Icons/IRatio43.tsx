import HelixPalette from "../../../styles/palette";

export const IRatio43 = ({
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
      <path d="M16.8501 4.08579L17.2288 3.70711C17.6193 3.31658 17.6193 2.68342 17.2288 2.29289C16.8383 1.90237 16.2051 1.90237 15.8146 2.29289L13.6933 4.41421C13.3028 4.80474 13.3028 5.4379 13.6933 5.82843L15.8146 7.94975C16.2051 8.34027 16.8383 8.34027 17.2288 7.94975C17.6193 7.55922 17.6193 6.92606 17.2288 6.53553L16.7791 6.08579H17.9866C19.0911 6.08579 19.9866 6.98122 19.9866 8.08579V10.0858C19.9866 10.6381 20.4343 11.0858 20.9866 11.0858C21.5388 11.0858 21.9866 10.6381 21.9866 10.0858V8.08579C21.9866 5.87665 20.1957 4.08579 17.9866 4.08579H16.8501Z"></path>
      <path
        d="M2 10C2 9.44772 2.44772 9 3 9H18C18.5523 9 19 9.44772 19 10V21C19 21.5523 18.5523 22 18 22H3C2.44772 22 2 21.5523 2 21V10ZM4 11H17V20H4V11Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IRatio43;
