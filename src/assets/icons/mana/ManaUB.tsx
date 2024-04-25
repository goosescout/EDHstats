import { IManaIconProps } from '~/assets/icons/mana/types';

export default function ManaUB({
  width = 100,
  height = 100,
  className = '',
}: IManaIconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M85.349 14.639C94.401 23.69 100 36.19 100 49.999C100 77.615 77.613 100.002 50 100.002C36.193 100.002 23.695 94.406 14.646 85.356"
        fill="#BAB1AB"
      />
      <path
        d="M14.646 85.356C5.597 76.309 0 63.807 0 50C0 22.387 22.387 0.00299072 50 0.00299072C63.802 0.00299072 76.301 5.59699 85.349 14.64"
        fill="#C1D7E9"
      />
      <path
        d="M41.116 48.158C38.424 50.894 35.109 52.265 31.17 52.265C26.748 52.265 23.241 50.752 20.646 47.724C18.194 44.839 16.969 41.164 16.969 36.697C16.969 31.892 19.059 26.413 23.24 20.261C26.651 15.217 30.663 10.796 35.277 6.99899C34.604 10.076 34.268 12.261 34.268 13.558C34.268 16.538 35.203 19.447 37.079 22.281C39.385 25.644 41.14 28.144 42.341 29.777C44.215 32.613 45.153 35.377 45.153 38.064C45.153 42.057 43.806 45.418 41.116 48.158ZM41.044 32.772C40.323 31.161 39.483 30.091 38.521 29.561C38.666 29.85 38.737 30.258 38.737 30.789C38.737 31.799 38.45 33.239 37.873 35.112L36.935 37.997C36.935 39.678 37.776 40.518 39.458 40.518C41.235 40.518 42.126 39.34 42.126 36.987C42.125 35.785 41.764 34.38 41.044 32.772Z"
        fill="#0D0F0F"
      />
      <path
        d="M89.62 65.992C89.62 68.693 88.638 70.536 86.673 71.517C86.099 71.804 84.299 72.195 81.269 72.683C79.306 73.013 78.323 73.769 78.323 74.954V79.927C78.323 80.136 78.386 80.769 78.507 81.832L78.692 83.798C78.692 84.411 78.548 85.415 78.261 86.806C77.484 86.969 76.583 87.154 75.56 87.361C75.232 86.131 75.069 85.292 75.069 84.841C75.069 84.638 75.119 84.329 75.222 83.92C75.324 83.513 75.376 83.204 75.376 82.998C75.376 82.714 75.123 81.915 74.614 80.604H73.661C73.535 80.809 73.494 81.076 73.534 81.401C73.698 82.098 73.759 82.69 73.719 83.182C73.022 83.673 72.062 84.328 70.834 85.147C70.545 85.065 70.445 85.024 70.526 85.024V80.665C70.445 80.462 70.241 80.38 69.912 80.419H69.175L68.438 86.19C67.865 86.231 67.17 86.231 66.352 86.19C66.065 84.839 65.553 82.836 64.817 80.173H64.324C63.874 81.606 63.629 82.384 63.587 82.507C63.587 82.67 63.639 82.986 63.742 83.458C63.843 83.93 63.895 84.245 63.895 84.409C63.895 84.531 63.853 84.839 63.77 85.33L63.586 86.805C63.503 86.884 63.403 86.925 63.28 86.925C62.052 86.925 61.232 86.618 60.825 86.006C60.413 85.391 60.249 84.531 60.332 83.426L60.825 76.061C60.825 75.938 60.864 75.774 60.946 75.569C61.028 75.366 61.069 75.221 61.069 75.141C61.069 74.813 60.721 74.157 60.026 73.173C59.903 73.133 59.269 72.988 58.122 72.742C57.427 72.58 56.055 72.293 54.01 71.885C51.185 71.354 49.772 69.082 49.772 65.071C49.772 59.093 52.229 54.122 57.139 50.151C57.343 51.257 57.693 52.729 58.184 54.571C58.552 54.655 59.351 54.84 60.578 55.125C60.825 55.206 62.072 55.657 64.323 56.476C63.178 55.781 61.683 54.658 59.843 53.101C59.146 52.283 58.797 50.911 58.797 48.988C58.797 48.536 59.575 48.006 61.132 47.388C62.523 46.816 63.566 46.492 64.263 46.409C66.472 46.123 68.171 45.978 69.359 45.978C74.474 45.978 78.609 47.289 81.76 49.91C80.738 51.098 78.977 52.363 76.481 53.716C77.463 53.757 78.896 53.369 80.779 52.548C82.661 51.733 83.459 51.32 83.173 51.32C83.5 51.32 84.156 51.976 85.138 53.285C85.873 54.267 86.467 55.148 86.918 55.925C88.228 58.258 89.108 60.778 89.559 63.477C89.559 64.419 89.579 65.094 89.62 65.502V65.992ZM66.104 67.1C66.104 65.339 65.337 63.671 63.803 62.094C62.267 60.518 60.618 59.731 58.859 59.731C57.304 59.731 55.934 60.391 54.746 61.709C53.559 63.028 52.966 64.491 52.966 66.099C52.966 67.499 53.641 68.408 54.992 68.818C55.852 69.066 57.058 69.21 58.613 69.252H61.99C64.733 69.287 66.104 68.57 66.104 67.1ZM72.797 74.712V72.811C72.511 72.278 72.224 71.723 71.939 71.151C71.693 70.334 71.242 69.188 70.588 67.712L69.912 74.896C69.912 75.472 69.79 75.757 69.543 75.757C69.38 75.757 69.256 75.717 69.175 75.634C68.888 71.296 68.746 69.412 68.746 69.988V67.84C68.663 67.714 68.561 67.652 68.438 67.652C67.047 69.089 66.352 71.4 66.352 74.59C66.352 76.351 66.515 77.435 66.842 77.847C67.171 77.765 67.537 77.621 67.949 77.416C68.112 77.333 68.582 77.293 69.36 77.293C70.135 77.293 71.08 77.538 72.183 78.028C72.593 78.025 72.797 76.923 72.797 74.712ZM86.673 66.156C86.673 64.51 86.059 63.037 84.831 61.738C83.603 60.441 82.191 59.793 80.597 59.793C78.877 59.793 77.269 60.58 75.776 62.154C74.281 63.73 73.534 65.378 73.534 67.099C73.534 68.531 74.231 69.246 75.622 69.246H82.681C85.343 69.206 86.673 68.178 86.673 66.156Z"
        fill="#0D0F0F"
      />
    </svg>
  );
}
