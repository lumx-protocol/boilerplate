import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer>
      <Separator />
      <div className="flex h-[80px] items-center justify-between sm:px-[calc(15vw)] px-[calc(5vw)]">
        <p className="text-sm leading-6">
          <span className="hidden sm:inline-block mr-1">
            Launch your project with{" "}
          </span>
          <a
            className="underline text-neutral-900"
            href="https://docs.lumx.io/get-started/introduction"
            target="_blank"
          >
            Lumx Protocol
          </a>
        </p>
        <div className="ml-auto flex gap-4 text-neutral-500 font-medium sm:text-sm text-xs">
          <a>Community</a>
          <a>Terms of Service</a>
          <a>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
