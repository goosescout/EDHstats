import { IManaIconProps } from '~/assets/icons/mana/types';

export default function ManaGP({
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
        d="M100 50C100 77.615 77.615 100.002 49.998 100.002C22.385 100.002 0 77.615 0 50C0 22.387 22.385 0.00201416 49.998 0.00201416C77.615 0.00201416 100 22.387 100 50Z"
        fill="#A3C095"
      />
      <path
        d="M77.563 49.927C77.621 44.583 75.922 39.188 72.596 34.999C70.987 33.228 69.665 31.212 67.962 29.538C64.208 25.812 58.587 25.564 54.065 23.217C53.803 20.86 52.94 18.502 53.462 16.124C53.621 15.333 53.854 14.531 53.434 13.775C52.247 11.043 53.266 8.077 53.055 5.228C52.897 3.74 52.998 1.919 51.581 1C51.251 4.097 50.112 6.979 49.189 9.918C48.763 12.208 48.763 14.594 47.776 16.754C48.402 18.942 47.162 20.784 45.82 22.4C42.854 23.92 39.324 24.281 36.743 26.51C34.902 28.072 32.915 29.441 30.855 30.712C29.31 32.646 27.599 34.509 26.911 36.952C24.149 40.287 23.823 44.763 22.257 48.669C22.228 54.468 23.403 60.712 27.107 65.36C29.757 67.548 31.609 70.491 34.255 72.68C36.795 74.196 39.506 75.442 42.129 76.807C43.839 77.205 45.604 77.401 47.305 77.866C48.685 84.975 49.627 92.257 52.396 98.999C53.316 96.231 53.205 93.265 53.998 90.468C55.116 86.332 52.822 82.027 54.115 77.967C56.053 76.234 59.285 77.359 61.435 75.872C65.527 73.349 69.857 70.892 72.825 67.032C73.929 64.813 76.251 63.155 76.251 60.493C76.27 56.908 78.359 53.551 77.563 49.927ZM47.188 71.857C44.223 71.136 41.461 69.718 38.974 67.986C36.298 66.203 35.3 62.876 32.66 61.052C30.188 58.101 30.723 54.07 29.71 50.576C30.116 48.138 30.595 45.72 30.848 43.251C32.054 41.295 33.915 39.735 34.431 37.381C36.198 34.849 38.889 33.097 41.05 30.902C42.622 29.089 45.124 29.853 47.189 29.783C46.984 31.783 46.821 33.851 47.322 35.824C47.566 37.036 48.113 38.23 47.925 39.5C47.511 42.199 48.524 44.906 47.808 47.574C46.365 53.152 47.939 58.783 48.076 64.406C47.871 66.897 47.755 69.406 47.188 71.857ZM69.665 61.287C67.701 62.683 66.027 64.398 64.314 66.072C61.335 68.132 58.39 70.312 54.845 71.342C55.164 68.813 55.476 66.211 54.67 63.735C52.692 58.141 55.116 52.29 55.524 46.633C55.164 43.27 55.508 39.682 53.967 36.584C53.764 34.257 54.77 32.01 55.452 29.82C57.794 30.755 59.999 32.017 61.948 33.64C64.302 35.404 67.908 36.548 68.435 39.838C68.704 41.999 71.068 43.306 70.999 45.517C70.854 50.773 71.579 56.27 69.665 61.287Z"
        fill="#111212"
      />
    </svg>
  );
}
