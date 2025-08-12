import HelixPalette from "~/styles/palette";

export const IArrowTool = ({
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
        d="M20.7851 13.1254C20.7286 13.5774 20.3703 13.9356 19.9184 13.9922L19.7929 13.9999L19.6675 13.9922C19.2155 13.9356 18.8573 13.5774 18.8007 13.1254L18.7929 12.9999L18.7931 6.65665L4.91414 20.5356C4.52362 20.9261 3.89045 20.9261 3.49992 20.5356C3.1373 20.173 3.11139 19.6011 3.42222 19.2086L3.49993 19.1214L17.3789 5.24243L10.9999 5.24255L10.8744 5.23476C10.3814 5.17306 9.99988 4.75235 9.99988 4.24255C9.99988 3.73275 10.3814 3.31205 10.8744 3.25034L10.9999 3.24255L19.7929 3.24258L19.9184 3.25038C20.3704 3.30694 20.7286 3.66516 20.7851 4.11715L20.7929 4.24258L20.7929 12.9999L20.7851 13.1254Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IArrowTool;
