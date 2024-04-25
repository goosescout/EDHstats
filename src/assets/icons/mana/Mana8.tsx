import { IManaIconProps } from '~/assets/icons/mana/types';

export default function Mana8({
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
        d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
        fill="#CAC5C0"
      />
      <path
        d="M40.965 49.465L39.219 48.254C34.1 44.752 30.727 41.924 29.112 39.765C27.046 37.074 26.016 33.935 26.016 30.339C26.016 24.234 28.573 19.252 33.694 15.39C38.452 11.8 43.975 10.002 50.262 10.002C56.184 10.002 61.442 11.575 66.018 14.715C71.221 18.218 73.831 22.842 73.831 28.591C73.831 35.595 68.933 41.251 59.149 45.558C70.28 50.946 75.848 58.442 75.848 68.05C75.848 74.964 73.202 80.439 67.899 84.484C63.146 88.166 57.17 90.002 49.99 90.002C43.256 90.002 37.465 88.299 32.613 84.883C27.045 81.027 24.265 75.907 24.265 69.534C24.265 63.161 27.228 57.904 33.154 53.773C34.77 52.699 37.377 51.263 40.965 49.465ZM45.537 51.377C37.457 55.054 33.426 60.843 33.426 68.738C33.426 73.851 35.061 77.956 38.342 81.052C41.619 84.149 45.817 85.695 50.936 85.695C55.51 85.695 59.397 84.463 62.582 82C65.768 79.536 67.363 76.109 67.363 71.72C67.363 65.094 62.996 59.719 54.265 55.598L45.537 51.377ZM54.568 43.404C61.656 40.263 65.209 35.55 65.209 29.265C65.209 24.952 63.703 21.499 60.699 18.89C57.687 16.287 53.984 14.984 49.586 14.984C45.902 14.984 42.717 15.975 40.023 17.948C37.058 20.102 35.58 22.978 35.58 26.568C35.58 30.968 37.643 34.516 41.775 37.211C42.58 37.748 46.171 39.497 52.55 42.461L54.568 43.404Z"
        fill="#0D0F0F"
      />
    </svg>
  );
}
