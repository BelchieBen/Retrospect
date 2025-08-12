import HelixPalette from "~/styles/palette";

export const IPreferencesHorizontal = ({
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
      <path d="M3 12C3 13.104 3.896 14 5 14C6.104 14 7 13.104 7 12C7 10.896 6.104 10 5 10C3.896 10 3 10.896 3 12Z"></path>
      <path d="M12 14C10.896 14 10 13.104 10 12C10 10.896 10.896 10 12 10C13.104 10 14 10.896 14 12C14 13.104 13.104 14 12 14Z"></path>
      <path d="M19 14C17.896 14 17 13.104 17 12C17 10.896 17.896 10 19 10C20.104 10 21 10.896 21 12C21 13.104 20.104 14 19 14Z"></path>
    </svg>
  );
};

export default IPreferencesHorizontal;
