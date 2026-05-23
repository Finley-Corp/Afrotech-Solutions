import Image from "next/image";
import Link from "next/link";
import { COMPANY_LOGO_SRC, COMPANY_NAME } from "@/lib/company";

const LOGO_WIDTH = 291;
const LOGO_HEIGHT = 98;

type LogoProps = {
  height?: number;
  href?: string | null;
  priority?: boolean;
  onNavigate?: () => void;
};

export default function Logo({ height = 44, href = "/", priority = false, onNavigate }: LogoProps) {
  const image = (
    <Image
      src={COMPANY_LOGO_SRC}
      alt={COMPANY_NAME}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      style={{
        height,
        width: "auto",
        maxWidth: "min(220px, 52vw)",
        objectFit: "contain",
      }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
        aria-label={`${COMPANY_NAME} home`}
      >
        {image}
      </Link>
    );
  }

  return image;
}
