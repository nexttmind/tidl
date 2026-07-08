import type { SVGProps } from "react";

const stroke = 1.5;

function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props} />
  );
}

export function GoalsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.5V2M12 22v-2.5M4.5 12H2M22 12h-2.5" />
    </Base>
  );
}

export function HealthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 5.5v12M8 9.5h8M6.5 19.5h11a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z" />
      <path d="M9 12.5h6" />
    </Base>
  );
}

export function MinutesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.5l3.5 2" />
    </Base>
  );
}

export function ProviderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M8.5 19.5v-6a3.5 3.5 0 0 1 7 0v6" />
      <path d="M5.5 19.5h13" />
      <path d="M12 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </Base>
  );
}

export function PlanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="4.5" y="5.5" width="15" height="13" rx="2" />
      <path d="M8 10h8M8 13.5h5.5" />
    </Base>
  );
}

export function ReviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 8.5h12M6 12h8M6 15.5h10" />
      <rect x="4.5" y="5" width="15" height="14" rx="2" />
      <path d="M16.5 17.5 18 19l3-3.5" />
    </Base>
  );
}

export function DeliveryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M3.5 8.5h11v8H3.5z" />
      <path d="M14.5 11h3.5l2.5 3v2.5h-6V11Z" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="17" cy="16.5" r="1.5" />
    </Base>
  );
}

export function SupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M5 10.5a7 7 0 0 1 14 0v3.5a2 2 0 0 1-2 2h-1.2l-2.3 2.8v-2.8H7a2 2 0 0 1-2-2v-3.5Z" />
    </Base>
  );
}

export function ReorderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M8 7.5h11M8 12h11M8 16.5h11" />
      <path d="M4.5 7.5h.5M4.5 12h.5M4.5 16.5h.5" />
    </Base>
  );
}
