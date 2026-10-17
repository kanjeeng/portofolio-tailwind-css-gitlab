"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

export type SkillItem = { label: string; slug?: string };
export type SkillCategory = { title: string; items: SkillItem[] };

export default function SkillCategoryGrid({
  categories,
}: {
  categories: SkillCategory[];
}) {
  const allSlugs = useMemo(
    () =>
      categories
        .flatMap((c) => c.items.map((i) => i.slug))
        .filter((s): s is string => Boolean(s)),
    [categories],
  );

  const [icons, setIcons] = useState<Record<string, ReturnType<typeof renderSimpleIcon>>>({});

  useEffect(() => {
    fetchSimpleIcons({ slugs: allSlugs }).then((data) => {
      const rendered: Record<string, ReturnType<typeof renderSimpleIcon>> = {};
      Object.values(data.simpleIcons).forEach((icon) => {
        rendered[icon.slug] = renderSimpleIcon({
          icon,
          bgHex: "#ffffff",
          fallbackHex: "#334155",
          minContrastRatio: 1.2,
          size: 28,
          aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: any) => e.preventDefault(),
          },
        });
      });
      setIcons(rendered);
    });
  }, [allSlugs]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
      {categories.map((cat) => (
        <div
          key={cat.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
        >
          <h3 className="mb-4 font-semibold text-dark text-base">{cat.title}</h3>
          <ul className="flex flex-col gap-3">
            {cat.items.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 text-sm font-medium text-secondary"
              >
                {item.slug && icons[item.slug] ? (
                  <span className="flex h-7 w-7 items-center justify-center">
                    {icons[item.slug]}
                  </span>
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">
                    {item.label
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
