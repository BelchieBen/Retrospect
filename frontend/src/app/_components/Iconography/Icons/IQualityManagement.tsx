import HelixPalette from "~/styles/palette";

export const IQualityManagement = ({
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
      <path d="M16.5896 22L10.5417 15.9521C10.9043 16.0247 11.3394 16.0972 11.76 16.0972C14.7041 16.0972 17.1552 13.6461 17.1552 10.702C17.1552 7.7578 14.7041 5.37926 11.76 5.37926C8.81581 5.37926 6.36476 7.83031 6.36476 10.7745C6.36476 11.2096 6.43727 11.6447 6.50979 11.9927L3.20305 8.68601C4.13125 4.79913 7.58303 2 11.76 2C16.6476 2 20.5344 5.95939 20.5344 10.7745C20.5344 13.5736 19.1711 16.0972 17.0827 17.7505L19.5337 20.2016L16.5896 22ZM12.1371 19.5635C11.992 19.5635 11.9195 19.5635 11.7745 19.5635C6.88687 19.5635 3 15.6041 3 10.789C3 10.6439 3 10.5714 3 10.4264L12.1371 19.5635Z"></path>
    </svg>
  );
};

export default IQualityManagement;
