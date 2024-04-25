export const createLink = ({
  href,
  path,
  prodSubdomain,
  testSubdomain,
}: {
  href: string;
  path: string;
  prodSubdomain: string;
  testSubdomain: string;
}) => {
  return `https://${
    process.env.NEXT_PUBLIC_LUMX_ENV === "sandbox"
      ? testSubdomain
      : prodSubdomain
  }${href}/${path}`;
};

export const isSafari = () => {
  if (typeof window === "undefined") return false;

  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};
