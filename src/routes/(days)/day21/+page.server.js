import { PUBLIC_SECRET_KEY } from "$env/static/public";

export function load() {
  return {PUBLIC_SECRET_KEY};
}