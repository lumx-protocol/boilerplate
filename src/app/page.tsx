import { getItemType, getContract } from "@/api";
import { Content } from "./content";

export default async function Home({
  searchParams,
}: {
  searchParams: { hash: string };
}) {
  const [item, contract] = await Promise.all([getItemType(), getContract()]);

  if (!item || !contract) {
    return <div>Item or contract not found</div>;
  }

  const props = { item, contract, searchParams };

  return <Content {...props} />;
}
