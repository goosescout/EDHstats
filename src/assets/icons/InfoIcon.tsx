import colors from '@app/styles/colors';

const InfoIcon = (props: any) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.1067 9.64998C10.1067 9.42897 10.1945 9.217 10.3508 9.06072C10.507 8.90444 10.719 8.81665 10.94 8.81665C11.161 8.81665 11.373 8.90444 11.5293 9.06072C11.6856 9.217 11.7734 9.42897 11.7734 9.64998V14.65C11.7734 14.871 11.6856 15.083 11.5293 15.2392C11.373 15.3955 11.161 15.4833 10.94 15.4833C10.719 15.4833 10.507 15.3955 10.3508 15.2392C10.1945 15.083 10.1067 14.871 10.1067 14.65V9.64998ZM10.94 5.54248C10.719 5.54248 10.507 5.63028 10.3508 5.78656C10.1945 5.94284 10.1067 6.1548 10.1067 6.37581C10.1067 6.59683 10.1945 6.80879 10.3508 6.96507C10.507 7.12135 10.719 7.20915 10.94 7.20915C11.161 7.20915 11.373 7.12135 11.5293 6.96507C11.6856 6.80879 11.7734 6.59683 11.7734 6.37581C11.7734 6.1548 11.6856 5.94284 11.5293 5.78656C11.373 5.63028 11.161 5.54248 10.94 5.54248Z"
      fill={colors.black}
      fillOpacity="0.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.94 2.16675C6.33752 2.16675 2.60669 5.89758 2.60669 10.5001C2.60669 15.1026 6.33752 18.8334 10.94 18.8334C15.5425 18.8334 19.2734 15.1026 19.2734 10.5001C19.2734 5.89758 15.5425 2.16675 10.94 2.16675ZM4.27336 10.5001C4.27336 12.2682 4.97574 13.9639 6.22598 15.2141C7.47622 16.4644 9.17191 17.1667 10.94 17.1667C12.7081 17.1667 14.4038 16.4644 15.6541 15.2141C16.9043 13.9639 17.6067 12.2682 17.6067 10.5001C17.6067 8.73197 16.9043 7.03628 15.6541 5.78604C14.4038 4.53579 12.7081 3.83341 10.94 3.83341C9.17191 3.83341 7.47622 4.53579 6.22598 5.78604C4.97574 7.03628 4.27336 8.73197 4.27336 10.5001Z"
      fill={colors.black}
      fillOpacity="0.5"
    />
  </svg>
);

export default InfoIcon;
