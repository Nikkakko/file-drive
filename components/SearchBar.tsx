"use client";
import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "@/hooks/debounce";

interface SearchBoxProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const SearchBox: React.FC<SearchBoxProps> = ({ ...props }) => {
  const debouncedOnChange = useDebouncedCallback(onChange, 300);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const s = searchParams.get("s")?.toString();

  function onChange(term: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("s", term);
    } else {
      params.delete("s");
    }

    replace(`${pathname}?${params}`, { scroll: false });
  }

  return (
    <form
      className={cn(
        "border border-secondary py-2 px-4 flex items-center justify-between rounded-[4px] md:max-w-[641px]  mx-auto shadow-sm",
        props.className
      )}
    >
      <input
        type="text"
        name="search"
        placeholder="Search file names..."
        defaultValue={s || ""}
        onChange={e => debouncedOnChange(e.target.value)}
        className="border-none bg-transparent w-full focus:none outline-none
            text-black/50 font-normal leading-normal"
        autoComplete="off"
      />
      <SearchIcon className="" />
    </form>
  );
};

export default SearchBox;
