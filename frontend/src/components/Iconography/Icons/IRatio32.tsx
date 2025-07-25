import HelixPalette from "../../../styles/palette";

export const IRatio32 = ({
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
      <path d="M16.8501 6.08579L17.2288 5.70711C17.6193 5.31658 17.6193 4.68342 17.2288 4.29289C16.8383 3.90237 16.2051 3.90237 15.8146 4.29289L13.6933 6.41421C13.3028 6.80474 13.3028 7.4379 13.6933 7.82843L15.8146 9.94975C16.2051 10.3403 16.8383 10.3403 17.2288 9.94975C17.6193 9.55922 17.6193 8.92606 17.2288 8.53553L16.7791 8.08579H17.9866C19.0911 8.08579 19.9866 8.98122 19.9866 10.0858V12.0858C19.9866 12.6381 20.4343 13.0858 20.9866 13.0858C21.5388 13.0858 21.9866 12.6381 21.9866 12.0858V10.0858C21.9866 7.87665 20.1957 6.08579 17.9866 6.08579H16.8501Z"></path>
      <path
        d="M2 12C2 11.4477 2.44772 11 3 11H18C18.5523 11 19 11.4477 19 12V19C19 19.5523 18.5523 20 18 20H3C2.44772 20 2 19.5523 2 19V12ZM4 13H17V18H4V13Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IRatio32;
