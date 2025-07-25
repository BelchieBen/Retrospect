import HelixPalette from "../../../styles/palette";

export const IOneplace = ({
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
        d="M12 22C10.7383 22 9.53505 21.7664 8.42524 21.3458L8.43692 17.3505C9.45327 18.028 10.6799 18.4252 11.9883 18.4252C15.5397 18.4252 18.4136 15.5514 18.4136 12C18.4136 8.4486 15.5397 5.57477 11.9883 5.57477C8.43692 5.57477 5.56309 8.4486 5.56309 12V19.6636C3.39019 17.8178 2 15.0724 2 12C2 6.4743 6.4743 2 12 2C17.5257 2 22 6.4743 22 12C22 17.5257 17.5257 22 12 22ZM15.4344 12C15.4344 13.8968 13.8967 15.4345 11.9999 15.4345C10.103 15.4345 8.56527 13.8968 8.56527 12C8.56527 10.1031 10.103 8.56538 11.9999 8.56538C13.8967 8.56538 15.4344 10.1031 15.4344 12Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IOneplace;
