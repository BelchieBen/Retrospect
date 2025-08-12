import HelixPalette from "~/styles/palette";

export const IPin = ({
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
        d="M13.5978 4.49449L14.3378 5.24149L9.15582 10.4725C8.33882 9.64749 7.01282 9.64749 6.19482 10.4725L13.5978 17.9445C14.4148 17.1195 14.4148 15.7815 13.5978 14.9565L18.7788 9.72549L19.5198 10.4725L20.9998 8.97849L15.0778 3.00049L13.5978 4.49449ZM17.2987 8.23051L12.1167 13.4605L10.6367 11.9665L15.8187 6.73651L17.2987 8.23051Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M9.89655 17.1975L4.11455 20.8115C3.26855 21.3405 2.65655 20.6735 3.21455 19.8305L6.93555 14.2075L9.89655 17.1975Z"></path>
    </svg>
  );
};

export default IPin;
