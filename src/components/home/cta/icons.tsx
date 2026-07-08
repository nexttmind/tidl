import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function QuizIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="5.5" width="18" height="22" rx="2.5" />
      <path d="M12 5.5v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
      <path d="M11.5 13l1.6 1.6 2.9-3.1" />
      <path d="M19 13.5h1.5" />
      <path d="M11.5 19.5l1.6 1.6 2.9-3.1" />
      <path d="M19 20h1.5" />
    </svg>
  );
}

export function ReviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 3.5l9.5 3.4v7.6c0 6.6-4.1 11.3-9.5 13.5-5.4-2.2-9.5-6.9-9.5-13.5V6.9L16 3.5z" />
      <circle cx="16" cy="12.5" r="3.1" />
      <path d="M10.5 22.5c1-3 3-4.4 5.5-4.4s4.5 1.4 5.5 4.4" />
      <path d="M16 6.5v2M15 7.5h2" />
    </svg>
  );
}

export function DeliveryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 11.5L16 6l10.5 5.5v9L16 26 5.5 20.5v-9z" />
      <path d="M5.5 11.5L16 17l10.5-5.5" />
      <path d="M16 17v9" />
      <path d="M20.5 10.2v3.2M18.9 11.8h3.2" />
    </svg>
  );
}

export function IntakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="17" r="9.5" />
      <path d="M16 11.5V17l3.8 2.6" />
      <path d="M13 4.5h6" />
      <path d="M16 4.5v3" />
    </svg>
  );
}

export function SecureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="8.5" y="14" width="15" height="12" rx="2.5" />
      <path d="M11.5 14v-3.5a4.5 4.5 0 0 1 9 0V14" />
      <path d="M16 19v3" />
    </svg>
  );
}
