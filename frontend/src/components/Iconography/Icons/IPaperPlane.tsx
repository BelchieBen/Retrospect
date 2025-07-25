import HelixPalette from "../../../styles/palette";

export const IPaperPlane = ({
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
        d="M19.7848 2.19229C20.8448 1.60417 22.1399 2.4458 21.9877 3.62389L19.9619 19.3095C19.8392 20.2595 18.8163 20.831 17.9113 20.4553L13.1908 18.4954L10.2367 21.5446C9.31711 22.4937 7.67816 21.8604 7.67816 20.556V16.4345C7.67816 16.3602 7.68406 16.2864 7.69563 16.2138L2.89982 14.2226C1.77371 13.755 1.68389 12.2353 2.74747 11.6452L19.7848 2.19229ZM10.8595 15.4383L17.892 8.48621L16.4848 7.1383L8.90826 14.6282L4.58946 12.8351L19.9055 4.33719L18.0843 18.4381L10.8595 15.4383ZM9.65275 17.0264V19.3462L11.2555 17.6918L9.65275 17.0264Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPaperPlane;
