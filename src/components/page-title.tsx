import { ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";

interface PageTitleProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const PageTitle = ({ title, description, actions }: PageTitleProps) => {
  return (
    <div className="flex gap-x-1 w-full">
      <SidebarTrigger className="cursor-pointer size-8 hover:text-black p-1 transition duration-500 rounded-full text-primary" />
      <div className="mb-8 flex justify-between gap-4 w-full">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

export default PageTitle;
