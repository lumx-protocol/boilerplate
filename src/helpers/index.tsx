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
  console.log(process.env.NEXT_PUBLIC_LUMX_ENV);
  return `https://${
    process.env.NEXT_PUBLIC_LUMX_ENV === "sandbox"
      ? testSubdomain
      : prodSubdomain
  }${href}/${path}`;
};
