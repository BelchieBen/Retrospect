import HelixPalette from "~/styles/palette";

export const IFlipHorizontal = ({
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
      <path d="M13.0001 4.125V19.875C13.0001 20.4963 12.5524 21 12.0001 21C11.4479 21 11.0001 20.4963 11.0001 19.875V4.125C11.0001 3.50368 11.4479 3 12.0001 3C12.5524 3 13.0001 3.50368 13.0001 4.125Z"></path>
      <path
        d="M14.5001 11.134C13.8335 11.5189 13.8335 12.4811 14.5001 12.866L19.5618 15.7884C20.2285 16.1733 21.0618 15.6922 21.0618 14.9224V9.07766C21.0618 8.30786 20.2285 7.82674 19.5618 8.21164L14.5001 11.134ZM19.7182 9.67282L15.6874 12L19.7182 14.3272L19.7182 9.67282Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M9.56167 11.134C10.2283 11.5189 10.2283 12.4811 9.56167 12.866L4.5 15.7884C3.83333 16.1733 3 15.6921 3 14.9223V9.07762C3 8.30782 3.83333 7.82669 4.5 8.21159L9.56167 11.134ZM8.37445 12L4.34361 14.3272V9.67277L8.37445 12Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFlipHorizontal;
