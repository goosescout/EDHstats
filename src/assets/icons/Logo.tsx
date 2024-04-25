import colors from '@/utils/colors';

export default function Logo() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_38_108)">
        <path
          d="M42 0H8C3.58172 0 0 3.58172 0 8V42C0 46.4183 3.58172 50 8 50H42C46.4183 50 50 46.4183 50 42V8C50 3.58172 46.4183 0 42 0Z"
          fill={colors.black}
        />
        <path
          d="M4.43703 25V10.76H8.43703V25H4.43703ZM7.67703 25V21.68H15.317V25H7.67703ZM7.67703 19.36V16.12H14.577V19.36H7.67703ZM7.67703 14.08V10.76H15.197V14.08H7.67703ZM20.0905 25V21.6H23.4105C24.1571 21.6 24.8038 21.4667 25.3505 21.2C25.8971 20.92 26.3171 20.5 26.6105 19.94C26.9038 19.38 27.0505 18.6867 27.0505 17.86C27.0505 17.0333 26.8971 16.3467 26.5905 15.8C26.2971 15.2533 25.8771 14.8467 25.3305 14.58C24.7971 14.3 24.1571 14.16 23.4105 14.16H19.8905V10.76H23.4105C24.5305 10.76 25.5571 10.9267 26.4905 11.26C27.4371 11.5933 28.2571 12.0733 28.9505 12.7C29.6438 13.3267 30.1771 14.08 30.5505 14.96C30.9371 15.8267 31.1305 16.8 31.1305 17.88C31.1305 18.96 30.9371 19.94 30.5505 20.82C30.1771 21.6867 29.6438 22.4333 28.9505 23.06C28.2571 23.6867 27.4438 24.1667 26.5105 24.5C25.5771 24.8333 24.5571 25 23.4505 25H20.0905ZM17.4105 25V10.76H21.4105V25H17.4105ZM32.962 25V10.76H36.962V25H32.962ZM41.562 25V10.76H45.562V25H41.562ZM35.142 19.4V16.08H43.122V19.4H35.142Z"
          fill={colors.white}
        />
        <path
          d="M7.94767 36.992C8.44234 36.992 8.82967 36.9033 9.10967 36.726C9.39901 36.5487 9.54367 36.306 9.54367 35.998C9.54367 35.7833 9.50167 35.6107 9.41767 35.48C9.33367 35.34 9.16567 35.214 8.91367 35.102C8.66167 34.9807 8.28367 34.8547 7.77967 34.724C6.96767 34.5187 6.35634 34.2573 5.94567 33.94C5.54434 33.6133 5.34367 33.1467 5.34367 32.54C5.34367 31.896 5.60967 31.3827 6.14167 31C6.67367 30.608 7.39234 30.412 8.29767 30.412C9.38967 30.412 10.3277 30.6967 11.1117 31.266L10.4397 32.26C9.77701 31.8213 9.07701 31.602 8.33967 31.602C7.40634 31.602 6.93967 31.8727 6.93967 32.414C6.93967 32.6007 6.99101 32.7547 7.09367 32.876C7.20567 32.9973 7.39234 33.114 7.65367 33.226C7.91501 33.3287 8.30234 33.45 8.81567 33.59C9.61834 33.814 10.2157 34.0893 10.6077 34.416C11.009 34.7427 11.2097 35.2327 11.2097 35.886C11.2097 36.642 10.897 37.216 10.2717 37.608C9.64634 37.9907 8.87167 38.182 7.94767 38.182C6.72501 38.182 5.71234 37.8367 4.90967 37.146L5.73567 36.194C6.04367 36.4367 6.38434 36.6327 6.75767 36.782C7.14034 36.922 7.53701 36.992 7.94767 36.992ZM19.8282 37.608C19.5482 37.7853 19.2215 37.9253 18.8482 38.028C18.4749 38.1307 18.0829 38.182 17.6722 38.182C16.8322 38.182 16.1835 37.9673 15.7262 37.538C15.2689 37.0993 15.0402 36.5067 15.0402 35.76V31.756H13.4022V30.608H15.0402V28.956L16.6082 28.774V30.608H19.1142L18.9322 31.756H16.6082V35.746C16.6082 36.1473 16.7109 36.446 16.9162 36.642C17.1215 36.8287 17.4482 36.922 17.8962 36.922C18.3909 36.922 18.8482 36.8053 19.2682 36.572L19.8282 37.608ZM27.7047 36.194C27.7047 36.474 27.7467 36.684 27.8307 36.824C27.9147 36.9547 28.0594 37.0527 28.2647 37.118L27.9007 38.182C27.1261 38.0887 26.6174 37.748 26.3747 37.16C26.1041 37.496 25.7634 37.7527 25.3527 37.93C24.9514 38.098 24.5081 38.182 24.0227 38.182C23.2761 38.182 22.6834 37.972 22.2447 37.552C21.8061 37.132 21.5867 36.5767 21.5867 35.886C21.5867 35.1113 21.8901 34.514 22.4967 34.094C23.1127 33.674 23.9807 33.464 25.1007 33.464H26.1507V32.988C26.1507 32.5213 26.0107 32.1807 25.7307 31.966C25.4507 31.7513 25.0447 31.644 24.5127 31.644C24.2514 31.644 23.9481 31.6767 23.6027 31.742C23.2574 31.8073 22.9074 31.9007 22.5527 32.022L22.1607 30.916C23.0474 30.58 23.9107 30.412 24.7507 30.412C25.7307 30.412 26.4681 30.6267 26.9627 31.056C27.4574 31.4853 27.7047 32.0967 27.7047 32.89V36.194ZM24.4847 37.034C24.8114 37.034 25.1241 36.95 25.4227 36.782C25.7307 36.614 25.9734 36.3807 26.1507 36.082V34.444H25.2827C24.5734 34.444 24.0554 34.5653 23.7287 34.808C23.4021 35.0413 23.2387 35.382 23.2387 35.83C23.2387 36.222 23.3414 36.5207 23.5467 36.726C23.7614 36.9313 24.0741 37.034 24.4847 37.034ZM36.6173 37.608C36.3373 37.7853 36.0106 37.9253 35.6373 38.028C35.2639 38.1307 34.8719 38.182 34.4613 38.182C33.6213 38.182 32.9726 37.9673 32.5153 37.538C32.0579 37.0993 31.8293 36.5067 31.8293 35.76V31.756H30.1913V30.608H31.8293V28.956L33.3973 28.774V30.608H35.9033L35.7213 31.756H33.3973V35.746C33.3973 36.1473 33.4999 36.446 33.7053 36.642C33.9106 36.8287 34.2373 36.922 34.6853 36.922C35.1799 36.922 35.6373 36.8053 36.0573 36.572L36.6173 37.608ZM41.5258 36.992C42.0205 36.992 42.4078 36.9033 42.6878 36.726C42.9771 36.5487 43.1218 36.306 43.1218 35.998C43.1218 35.7833 43.0798 35.6107 42.9958 35.48C42.9118 35.34 42.7438 35.214 42.4918 35.102C42.2398 34.9807 41.8618 34.8547 41.3578 34.724C40.5458 34.5187 39.9345 34.2573 39.5238 33.94C39.1225 33.6133 38.9218 33.1467 38.9218 32.54C38.9218 31.896 39.1878 31.3827 39.7198 31C40.2518 30.608 40.9705 30.412 41.8758 30.412C42.9678 30.412 43.9058 30.6967 44.6898 31.266L44.0178 32.26C43.3551 31.8213 42.6551 31.602 41.9178 31.602C40.9845 31.602 40.5178 31.8727 40.5178 32.414C40.5178 32.6007 40.5691 32.7547 40.6718 32.876C40.7838 32.9973 40.9705 33.114 41.2318 33.226C41.4931 33.3287 41.8805 33.45 42.3938 33.59C43.1965 33.814 43.7938 34.0893 44.1858 34.416C44.5871 34.7427 44.7878 35.2327 44.7878 35.886C44.7878 36.642 44.4751 37.216 43.8498 37.608C43.2245 37.9907 42.4498 38.182 41.5258 38.182C40.3031 38.182 39.2905 37.8367 38.4878 37.146L39.3138 36.194C39.6218 36.4367 39.9625 36.6327 40.3358 36.782C40.7185 36.922 41.1151 36.992 41.5258 36.992Z"
          fill={colors.white}
        />
      </g>
      <defs>
        <clipPath id="clip0_38_108">
          <rect width="50" height="50" fill={colors.white} />
        </clipPath>
      </defs>
    </svg>
  );
}
