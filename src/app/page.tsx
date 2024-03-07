import { getItemType, getContract } from "@/api";
import { Content } from "./content";

export default async function Home({
  searchParams,
}: {
  searchParams: { hash: string };
}) {
  const [item, contract] = await Promise.all([getItemType(), getContract()]);

  const props = { item, contract, searchParams };

  return <Content {...props} />;
}
