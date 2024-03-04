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
    process.env.LUMX_ENV === "sandbox" ? testSubdomain : prodSubdomain
  }${href}/${path}`;
};
