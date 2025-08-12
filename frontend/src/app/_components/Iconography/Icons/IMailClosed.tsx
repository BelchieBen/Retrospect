import HelixPalette from "~/styles/palette";

export const IMailClosed = ({
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
        d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4.08301 8.33307V16.9586C4.08301 17.5108 4.53072 17.9586 5.08301 17.9586H19.083C19.6353 17.9586 20.083 17.5108 20.083 16.9586V8.35761L13.5836 14.4057C12.7621 15.1701 11.4506 15.1891 10.6543 14.4481L4.08301 8.33307ZM18.3667 5.86121H5.82568L5.74178 5.93929C5.33103 6.32152 5.32083 6.93174 5.71899 7.30226L11.3753 12.5658C11.7734 12.9363 12.4292 12.9268 12.8399 12.5446L18.4506 7.32346C18.8614 6.94123 18.8716 6.33101 18.4734 5.9605L18.3667 5.86121Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IMailClosed;
