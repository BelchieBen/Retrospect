import HelixPalette from "~/styles/palette";

export const IRectangleZoom = ({
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
      <path d="M9.75 3H14.25V5.25H9.75V3Z"></path>
      <path d="M17.75 18.75H16.5V21H19C20.1046 21 21 20.1046 21 19V16.5003L18.75 16.5009V17.75C18.75 18.3023 18.3023 18.75 17.75 18.75Z"></path>
      <path d="M21 9.7503V14.2503L18.75 14.2509V9.75091L21 9.7503Z"></path>
      <path d="M5.25 7.50457V6.25C5.25 5.69772 5.69772 5.25 6.25 5.25H7.5V3H5C3.89543 3 3 3.89543 3 5V7.50517L5.25 7.50457Z"></path>
      <path d="M3 9.75517V14.2552L5.25 14.2546V9.75457L3 9.75517Z"></path>
      <path d="M3 19V16.5052L5.25 16.5046V17.75C5.25 18.3023 5.69772 18.75 6.25 18.75H7.5V21H5C3.89543 21 3 20.1046 3 19Z"></path>
      <path d="M18.75 7.50091V6.25C18.75 5.69772 18.3023 5.25 17.75 5.25H16.5V3H19C20.1046 3 21 3.89543 21 5V7.5003L18.75 7.50091Z"></path>
      <path d="M9.75 18.75H14.25V21H9.75V18.75Z"></path>
      <path d="M10.875 7.5H13.125V10.8881L16.5052 10.896L16.5 13.146L13.125 13.1381V16.5H10.875V13.1329L7.5 13.125L7.50525 10.875L10.875 10.8829V7.5Z"></path>
    </svg>
  );
};

export default IRectangleZoom;
