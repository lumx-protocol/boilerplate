import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer>
      <Separator />
      <div className="flex h-[60px] sm:h-[80px] items-center justify-between sm:px-[calc(15vw)] px-[calc(5vw)]">
        <p className="text-sm leading-6">
          <span className="hidden sm:inline-block mr-1">
            Lance seu projeto com{" "}
          </span>
          <a
            className="underline text-neutral-900 sm:text-sm text-xs dark:text-neutral-100"
            href="https://docs.lumx.io/get-started/introduction"
            target="_blank"
          >
            Lumx Protocol
          </a>
        </p>
        <div className="ml-auto flex gap-4 text-neutral-500 font-medium sm:text-sm text-xs">
          <a href="https://discord.gg/sSGvyywSKS" target="_blank">
            Comunidade
          </a>
          <a href="'https://drive.google.com/file/d/11WpZp5mZvu03YCaGajgJdcxYURO_Thh1/view'">
            Termos de serviço
          </a>
          <a href="'https://drive.google.com/file/d/11WpZp5mZvu03YCaGajgJdcxYURO_Thh1/view'">
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
};
