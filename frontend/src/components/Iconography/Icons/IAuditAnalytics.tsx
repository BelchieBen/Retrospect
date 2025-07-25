import HelixPalette from "../../../styles/palette";

export const IAuditAnalytics = ({
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
        d="M12.3202 2.19691C12.1881 1.93436 11.8133 1.93436 11.6812 2.19691L2.03817 21.4847C1.91929 21.7224 2.09266 22.0015 2.35686 22.0015H6.76228C6.89768 22.0015 7.02317 21.9239 7.08261 21.8017L11.6796 12.4327C11.81 12.1669 12.1898 12.1669 12.3202 12.4327L16.9172 21.8017C16.9766 21.9239 17.1021 22.0015 17.2375 22.0015H21.643C21.9088 22.0015 22.0805 21.7224 21.9616 21.4847L12.3186 2.19691H12.3202Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M13.7882 21.4847C13.9071 21.7224 13.7337 22.0015 13.4695 22.0015H10.537C10.2711 22.0015 10.0994 21.7224 10.2183 21.4847L11.6846 18.5521C11.8167 18.2896 12.1915 18.2896 12.3236 18.5521L13.7898 21.4847H13.7882Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IAuditAnalytics;
