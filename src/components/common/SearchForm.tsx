import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
          className="w-full pl-10 pr-16 py-3 rounded-lg text-black"
          placeholder="Search for content..."
          type="search"
        />
        <Button className="absolute right-0 top-0 h-full px-5" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
