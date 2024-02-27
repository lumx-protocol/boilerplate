import { getItemType, getContract } from "@/api";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Content } from "./content";

export default async function Home({
  searchParams,
}: {
  searchParams: { hash: string };
}) {
  const item = await getItemType();
  const contract = await getContract();

  const props = { item, contract, searchParams };

  return <Content {...props} />;
}
