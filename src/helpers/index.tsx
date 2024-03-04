import config from "../../lumx.json";

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
    config.environment === "sandbox" ? testSubdomain : prodSubdomain
  }${href}/${path}`;
};
