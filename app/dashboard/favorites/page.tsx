import { FileBrowser } from "@/components/dashboard/FileBrowser";
import * as React from "react";

interface pageProps {}

async function Page({}: pageProps) {
  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
}

export default Page;
