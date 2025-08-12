import HelixPalette from "~/styles/palette";

export const IExcursions = ({
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
      <path d="M4.00174 12.1686C4.09148 16.509 7.63806 20 12 20V22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12H20C20 8.36098 17.5703 5.28945 14.2446 4.31919L12.5 6.5H10.5L9 9H8L6.5 10V12H8.5L7 15.5L4.00174 12.1686Z"></path>
      <path
        d="M17.4246 10.4748C19.1752 12.2254 19.3289 14.9681 17.8858 16.893L21.3959 20.403C21.67 20.6772 21.67 21.1217 21.3959 21.3958C21.1217 21.67 20.6772 21.67 20.4031 21.3959L16.893 17.8858C14.9682 19.3289 12.2254 19.1752 10.4749 17.4246C8.55575 15.5055 8.55575 12.394 10.4749 10.4748C12.394 8.55572 15.5055 8.55572 17.4246 10.4748ZM16.4319 16.4318C17.8027 15.061 17.8027 12.8385 16.4319 11.4677C15.0611 10.0969 12.8386 10.0969 11.4678 11.4677C10.097 12.8385 10.097 15.061 11.4678 16.4318C12.8386 17.8026 15.0611 17.8026 16.4319 16.4318Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IExcursions;
