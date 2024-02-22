import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import Link from "./Link";

export type BreadcrumbItem = {
  label: string;
  url: string;
  active?: boolean;
};        

const auth = () => {
  // Placeholder for authentication logic
  // This function should be expanded to include actual authentication checks
  // For example, checking if a user is logged in or has the correct permissions
  // to access a certain route or perform a certain action.
  console.warn("Authentication logic not implemented.");
};

const convertXmlToJson = (xml) => {
  // Placeholder for XML to JSON conversion logic
  // This function should be expanded to include actual logic for converting XML to JSON
  console.warn("XML to JSON conversion logic not implemented.");
};
const objectToArrayOfValues = (obj) => {
  return Object.values(obj);
};


export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items, className, ...props }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-72", className)} {...props}>
      <ol className="flex w-full items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
        {items.map((e, i) => (
          <React.Fragment key={i}>
            {i !== 0 && (
              <li>
                <ChevronRightIcon className="w-4 h-4" />
              </li>
            )}
            <li>
              <Link
                className={cn("no-underline", !e.active && "text-gray-900")}
                href={e.url}
              >
                {e.label}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
