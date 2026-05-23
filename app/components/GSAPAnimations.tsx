"use client";

import dynamic from "next/dynamic";

const GSAPAnimationsInner = dynamic(() => import("./GSAPAnimationsInner"), {
  ssr: false,
});

export default function GSAPAnimations() {
  return <GSAPAnimationsInner />;
}
