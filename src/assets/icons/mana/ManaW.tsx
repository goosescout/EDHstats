import { IManaIconProps } from '~/assets/icons/mana/types';

export default function ManaW({
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
        d="M50 100.002C77.6142 100.002 100 77.6162 100 50.002C100 22.3878 77.6142 0.0019989 50 0.0019989C22.3858 0.0019989 0 22.3878 0 50.002C0 77.6162 22.3858 100.002 50 100.002Z"
        fill="#F8F6D8"
      />
      <path
        d="M97.6911 57.066C91.1301 53.367 86.9231 51.515 85.0741 51.515C83.7301 51.515 82.6791 52.547 81.9201 54.607C81.1621 56.67 79.6501 57.697 77.3791 57.697C76.4531 57.697 74.5611 57.361 71.701 56.689C70.1031 59.129 69.3031 60.685 69.3031 61.357C69.3031 62.283 69.9921 63.373 71.3671 64.638C72.7421 65.9 73.9021 66.529 74.8491 66.529C75.4511 66.529 76.2651 66.404 77.2981 66.15C78.3291 65.9 79.0191 65.773 79.3621 65.773C80.3951 65.773 80.9091 67.666 80.9091 71.451C80.9091 75.068 80.069 80.619 78.386 88.105C76.198 79.525 73.8861 75.234 71.4481 75.234C71.1101 75.234 70.4171 75.486 69.3661 75.994C68.3131 76.496 67.5361 76.748 67.0321 76.748C64.5941 76.748 62.4071 74.521 60.4711 70.06C56.6021 70.65 54.666 72.627 54.666 75.994C54.666 77.678 55.4431 79.021 57.0021 80.029C58.5551 81.037 59.3361 81.756 59.3361 82.174C59.3361 84.447 56.0121 87.938 49.3671 92.647C45.8361 95.17 43.3941 96.936 42.0511 97.944C43.2251 96.432 44.4031 94.457 45.5841 92.016C46.9281 89.241 47.6021 87.096 47.6021 85.58C47.6021 84.74 46.6351 83.56 44.7001 82.047C42.7641 80.535 41.8 78.936 41.8 77.254C41.8 75.826 42.3021 74.061 43.3121 71.955C42.2181 70.693 40.9171 70.06 39.4021 70.06C36.0371 70.06 34.3571 71.156 34.3571 73.34C34.3571 71.826 34.3571 72.961 34.3571 76.746C34.4391 79.522 32.3371 80.91 28.0461 80.91C24.7671 80.91 19.255 80.151 11.519 78.639C20.267 76.451 24.6401 73.928 24.6401 71.069C24.6401 71.405 24.472 70.397 24.136 68.041C23.798 65.437 25.6501 63.08 29.6871 60.978C28.9291 57.111 26.9141 55.172 23.6301 55.172C23.1261 55.172 22.1981 56.056 20.8551 57.819C19.5091 59.59 18.2481 60.471 17.0721 60.471C15.0521 60.471 12.4431 58.285 9.25006 53.908C7.73406 51.724 5.42008 48.484 2.30908 44.193C4.24308 45.205 6.17807 46.213 8.11407 47.224C10.6371 48.4 12.6551 48.99 14.1711 48.99C15.3491 48.99 16.5051 47.959 17.6401 45.898C18.7751 43.837 20.269 42.806 22.119 42.806C22.373 42.806 24.055 43.31 27.166 44.322C28.762 41.883 29.5641 40.074 29.5641 38.896C29.5641 37.886 28.9531 36.73 27.7341 35.425C26.5131 34.122 25.4001 33.47 24.3901 33.47C23.9681 33.47 23.3181 33.595 22.4331 33.849C21.5521 34.101 20.9001 34.228 20.4801 34.228C18.9641 34.228 18.2071 32.335 18.2071 28.55C18.2071 27.54 19.1761 21.78 21.1111 11.265C21.0251 12.525 21.5721 14.882 22.7501 18.329C24.1801 22.536 25.8611 24.638 27.7991 24.638C28.1331 24.638 28.807 24.386 29.817 23.88C30.825 23.376 31.6241 23.126 32.2131 23.126C34.1471 23.126 35.7441 24.22 37.0081 26.403L38.9011 29.809C40.6671 29.809 42.1391 29.18 43.3151 27.918C44.4931 26.656 45.0831 25.141 45.0831 23.375C45.0831 21.525 44.3061 20.115 42.7491 19.148C41.1901 18.181 40.4131 17.445 40.4131 16.941C40.4131 15.173 43.1901 12.189 48.7411 7.98299C53.1981 4.61999 56.1001 2.64299 57.4481 2.05299C53.8311 6.93199 52.0221 10.504 52.0221 12.777C52.0221 13.955 52.7351 15.218 54.1671 16.562C55.9331 18.16 56.9421 19.296 57.1941 19.968C58.0341 21.906 57.95 24.554 56.942 27.917C59.213 29.517 60.9361 30.313 62.1161 30.313C64.5521 30.313 65.774 29.049 65.774 26.528C65.774 26.276 65.6691 25.477 65.4601 24.132C65.2471 22.788 65.1871 22.03 65.2691 21.861C65.6051 20.683 67.9191 20.093 72.2081 20.093C74.8991 20.093 80.4911 20.851 88.9891 22.366C87.1371 22.87 84.3621 23.626 80.6631 24.636C77.2981 25.646 75.6141 26.781 75.6141 28.042C75.6141 28.632 75.8231 29.64 76.2451 31.069C76.6651 32.501 76.8781 33.549 76.8781 34.225C76.8781 35.401 76.1201 36.495 74.6071 37.502L70.3161 40.533C71.3261 42.385 71.9981 43.478 72.3361 43.812C73.1761 44.82 74.3111 45.326 75.7421 45.326C76.7521 45.326 77.6761 44.443 78.5171 42.678C79.3571 40.91 80.705 40.028 82.554 40.028C84.824 40.028 87.3921 42.132 90.2511 46.339C91.8441 48.699 94.3261 52.272 97.6911 57.066ZM69.6841 49.75C69.6841 44.369 67.7051 39.699 63.7521 35.744C59.7991 31.791 55.131 29.814 49.748 29.814C44.279 29.814 39.5681 31.771 35.6171 35.683C31.6641 39.593 29.6441 44.283 29.5621 49.749C29.4761 55.132 31.474 59.779 35.554 63.687C39.634 67.599 44.3651 69.556 49.7471 69.556C55.4661 69.556 60.2391 67.683 64.0651 63.941C67.8951 60.201 69.7661 55.471 69.6841 49.75ZM67.791 49.75C67.791 54.881 66.0661 59.131 62.6171 62.49C59.1661 65.857 54.877 67.539 49.748 67.539C44.785 67.539 40.5371 65.816 37.0061 62.365C33.4751 58.92 31.7071 54.713 31.7071 49.75C31.7071 44.873 33.4921 40.686 37.0661 37.197C40.6441 33.707 44.869 31.959 49.748 31.959C54.625 31.959 58.8521 33.725 62.4281 37.26C66.0021 40.793 67.791 44.955 67.791 49.75Z"
        fill="#0D0F0F"
      />
    </svg>
  );
}
