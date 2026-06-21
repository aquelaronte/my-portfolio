import type { AstroGlobal } from "astro";
import { ui, defaultLang } from "./ui";

export function useTranslations(
  ctx: keyof typeof ui | Readonly<AstroGlobal<any, any>>,
) {
  const lang: keyof typeof ui =
    typeof ctx === "string" ? ctx : getCurrentLocale(ctx);

  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getCurrentLocale(
  astro: Readonly<AstroGlobal<any, any>>,
): keyof typeof ui {
  return (astro.currentLocale || defaultLang) as keyof typeof ui;
}
