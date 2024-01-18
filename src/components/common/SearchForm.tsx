import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface SearchFormProps extends React.HTMLAttributes<HTMLFormElement> {
  searchURL: string;
  inputName: string;
}
const SearchForm = ({
  className,
  searchURL,
  inputName,
  ...props
}: SearchFormProps) => {
  return (
    <form
      method="POST"
      action={searchURL}
      className={cn("w-full mx-auto", className)}
      {...props}
    >
      <div className="relative">
        <Input
          name={inputName}
          className="w-full  py-3 rounded-lg "
          placeholder="Search for content..."
          type="search"
        />
        <Button className="absolute right-0 top-0 h-full px-4" type="submit">
          <span className="hidden md:block"> Search</span>
          <span className="md:hidden block">
            <Search className="w-4 h-4" />
          </span>
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
