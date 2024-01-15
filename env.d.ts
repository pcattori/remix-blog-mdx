/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module "virtual:remix/server-build" {
  import { ServerBuild } from "@remix-run/node";
  export const routes: ServerBuild["routes"];
}
