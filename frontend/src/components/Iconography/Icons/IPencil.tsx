import HelixPalette from "../../../styles/palette";

export const IPencil = ({
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
        d="M15.7119 3C15.1509 3 14.5909 3.214 14.1629 3.642L3.6299 14.175L3.0069 19.783C2.9339 20.44 3.4499 21 4.0929 21C4.1339 21 4.1749 20.998 4.2159 20.993L9.8259 20.37L20.3579 9.837C21.2139 8.982 21.2139 7.595 20.3579 6.739L17.2609 3.642C16.8329 3.214 16.2719 3 15.7119 3ZM7.01308 18.67L5.33008 16.986L5.54008 15.093L12.0741 8.55896L13.4041 9.88896L7.88908 15.403L8.59608 16.111L14.1111 10.596L15.4401 11.926L8.90808 18.46L7.01308 18.67ZM13.4878 7.145L16.8548 10.512L18.9438 8.423C18.9808 8.386 18.9998 8.34 18.9998 8.288C18.9998 8.236 18.9808 8.191 18.9438 8.153L15.8458 5.056C15.8088 5.019 15.7638 5 15.7118 5C15.6588 5 15.6138 5.019 15.5768 5.056L13.4878 7.145Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPencil;
