import HelixPalette from "../../../styles/palette";

export const IRatio31 = ({
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
      <path d="M16.8501 7.08579L17.2288 6.70711C17.6193 6.31658 17.6193 5.68342 17.2288 5.29289C16.8383 4.90237 16.2051 4.90237 15.8146 5.29289L13.6933 7.41421C13.3028 7.80474 13.3028 8.4379 13.6933 8.82843L15.8146 10.9497C16.2051 11.3403 16.8383 11.3403 17.2288 10.9497C17.6193 10.5592 17.6193 9.92606 17.2288 9.53553L16.7791 9.08579H17.9866C19.0911 9.08579 19.9866 9.98122 19.9866 11.0858V13.0858C19.9866 13.6381 20.4343 14.0858 20.9866 14.0858C21.5388 14.0858 21.9866 13.6381 21.9866 13.0858V11.0858C21.9866 8.87665 20.1957 7.08579 17.9866 7.08579H16.8501Z"></path>
      <path
        d="M2 13C2 12.4477 2.44772 12 3 12H18C18.5523 12 19 12.4477 19 13V17C19 17.5523 18.5523 18 18 18H3C2.44772 18 2 17.5523 2 17V13ZM4 14H17V16H4V14Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IRatio31;
