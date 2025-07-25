import HelixPalette from "../../../styles/palette";

export const ILinkedin2 = ({
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
      <path d="M6.449 8.19328C5.49789 8.19328 4.729 7.42328 4.729 6.47328C4.729 5.52439 5.49789 4.75439 6.449 4.75439C7.39678 4.75439 8.16789 5.52439 8.16789 6.47328C8.16789 7.42328 7.39678 8.19328 6.449 8.19328Z"></path>
      <path d="M4.96436 19.0424H7.93213V9.49902H4.96436V19.0424Z"></path>
      <path d="M16.0775 19.0423H19.0409V13.8079C19.0409 11.2368 18.4864 9.26123 15.4853 9.26123C14.042 9.26123 13.0742 10.0523 12.6787 10.8023H12.6375V9.49901H9.79199V19.0423H12.7575V14.3212C12.7575 13.0757 12.9931 11.8701 14.5364 11.8701C16.0564 11.8701 16.0775 13.2946 16.0775 14.4012V19.0423Z"></path>
    </svg>
  );
};

export default ILinkedin2;
