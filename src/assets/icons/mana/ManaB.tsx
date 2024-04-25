import { IManaIconProps } from '~/assets/icons/mana/types';

export default function ManaB({
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
        fill="#BAB1AB"
      />
      <path
        d="M90.695 48.621C90.695 54.139 88.687 57.902 84.675 59.908C83.503 60.494 79.825 61.287 73.638 62.291C69.626 62.961 67.62 64.508 67.62 66.93V77.088C67.62 77.51 67.745 78.803 67.995 80.977L68.372 84.991C68.372 86.246 68.079 88.297 67.493 91.137C65.905 91.471 64.065 91.846 61.975 92.269C61.305 89.758 60.971 88.045 60.971 87.123C60.971 86.707 61.076 86.078 61.284 85.241C61.491 84.407 61.6 83.78 61.6 83.358C61.6 82.778 61.08 81.145 60.041 78.471H58.096C57.838 78.889 57.752 79.432 57.836 80.1C58.17 81.522 58.295 82.733 58.213 83.737C56.791 84.741 54.826 86.078 52.318 87.75C51.732 87.584 51.525 87.5 51.689 87.5V78.596C51.525 78.18 51.105 78.015 50.435 78.094H48.931L47.427 89.881C46.253 89.965 44.835 89.965 43.163 89.881C42.575 87.123 41.532 83.028 40.028 77.592H39.024C38.102 80.521 37.602 82.111 37.518 82.361C37.518 82.695 37.622 83.342 37.832 84.303C38.039 85.265 38.145 85.912 38.145 86.246C38.145 86.496 38.061 87.123 37.895 88.127L37.518 91.137C37.35 91.303 37.141 91.387 36.891 91.387C34.383 91.387 32.709 90.76 31.875 89.508C31.039 88.252 30.703 86.496 30.871 84.237L31.875 69.19C31.875 68.938 31.957 68.604 32.125 68.186C32.289 67.768 32.375 67.475 32.375 67.309C32.375 66.639 31.664 65.301 30.244 63.295C29.996 63.213 28.695 62.918 26.357 62.416C24.933 62.082 22.132 61.498 17.955 60.66C12.184 59.576 9.30103 54.935 9.30103 46.74C9.30103 34.533 14.319 24.375 24.352 16.265C24.766 18.523 25.479 21.531 26.481 25.294C27.235 25.464 28.866 25.839 31.372 26.423C31.876 26.591 34.425 27.511 39.024 29.183C36.68 27.761 33.631 25.464 29.868 22.285C28.446 20.613 27.735 17.814 27.735 13.885C27.735 12.965 29.325 11.877 32.503 10.621C35.343 9.45101 37.478 8.78501 38.899 8.61501C43.413 8.03301 46.883 7.73601 49.309 7.73601C59.758 7.73601 68.2 10.414 74.637 15.765C72.549 18.191 68.953 20.779 63.854 23.538C65.862 23.622 68.788 22.831 72.633 21.155C76.477 19.485 78.108 18.647 77.524 18.647C78.192 18.647 79.532 19.987 81.538 22.661C83.042 24.667 84.253 26.468 85.175 28.052C87.849 32.82 89.646 37.96 90.568 43.478C90.568 45.404 90.609 46.783 90.693 47.617V48.621H90.695ZM42.664 50.879C42.664 47.285 41.096 43.877 37.961 40.656C34.824 37.437 31.459 35.83 27.865 35.83C24.687 35.83 21.888 37.178 19.463 39.869C17.037 42.562 15.826 45.551 15.826 48.832C15.826 51.691 17.205 53.545 19.965 54.385C21.721 54.891 24.184 55.186 27.363 55.268H34.261C39.859 55.352 42.664 53.889 42.664 50.879ZM56.332 66.432V62.543C55.748 61.457 55.162 60.328 54.578 59.156C54.076 57.482 53.156 55.142 51.818 52.131L50.437 66.805C50.437 67.977 50.187 68.561 49.685 68.561C49.351 68.561 49.101 68.479 48.933 68.313C48.347 59.45 48.054 55.604 48.054 56.772V52.385C47.886 52.131 47.679 52.006 47.429 52.006C44.585 54.936 43.165 59.658 43.165 66.178C43.165 69.774 43.495 71.989 44.167 72.826C44.837 72.66 45.589 72.367 46.425 71.949C46.759 71.781 47.72 71.697 49.312 71.697C50.896 71.697 52.822 72.199 55.078 73.201C55.914 73.201 56.332 70.945 56.332 66.432ZM84.676 48.957C84.676 45.59 83.422 42.582 80.914 39.932C78.404 37.284 75.519 35.957 72.262 35.957C68.75 35.957 65.467 37.564 62.416 40.783C59.363 44.002 57.838 47.367 57.838 50.879C57.838 53.807 59.258 55.268 62.102 55.268H76.524C81.957 55.186 84.676 53.082 84.676 48.957Z"
        fill="#0D0F0F"
      />
    </svg>
  );
}
