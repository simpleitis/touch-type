export default function LoadingSpinner() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{
          shapeRendering: "auto",
          display: "block",
        }}
        height="40"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="#ffffff"
          strokeWidth="10"
          fill="none"
          strokeDasharray="164.93361431346415 56.97787143782138"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          />
        </circle>
      </svg>
    </>
  );
}
