import HelixPalette from "../../../styles/palette";

export const IFolderLocked = ({
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
      <path d="M12 5H20C21.0537 5 21.9176 5.81629 21.9941 6.85059L22 7L22.001 9.35547C21.48 8.76485 20.7872 8.32854 20.001 8.12598L20 7H4V19H12V21H4C2.94627 21 2.08237 20.1837 2.00586 19.1494L2 19V3H10L12 5Z"></path>
      <path
        d="M19 10C20.1046 10 21 10.8954 21 12V14H22V21H14V14H15V12C15 10.8954 15.8954 10 17 10H19ZM17.5 12C17.2436 12 17.0318 12.3219 17.0029 12.7363L17 12.833V14H19V12.833C18.9999 12.406 18.807 12.0542 18.5586 12.0059L18.5 12H17.5Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFolderLocked;
