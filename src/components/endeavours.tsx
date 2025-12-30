"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useScramble } from "use-scramble";
import { Spinner } from "~/components/spinner";
import { endeavours } from "~/config/endavours";

const COLLAPSE_ANIMATION_MS = 200;

export const Endeavours = () => {
  const ITEM_HEIGHT = 112;
  const DESKTOP_GRID_COLS = 4;
  const MOBILE_GRID_COLS = 2;

  const active = useMemo(
    () => endeavours.filter((e) => (e.activity ?? "active") === "active"),
    [],
  );
  const inactive = useMemo(
    () => endeavours.filter((e) => (e.activity ?? "active") === "inactive"),
    [],
  );

  const desktopRows = Math.ceil(active.length / DESKTOP_GRID_COLS);
  const mobileRows = Math.ceil(active.length / MOBILE_GRID_COLS);

  const [isMobile, setIsMobile] = useState(true);
  const [totalHeight, setTotalHeight] = useState(
    `${ITEM_HEIGHT * mobileRows}px`,
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setTotalHeight(`${ITEM_HEIGHT * (mobile ? mobileRows : desktopRows)}px`);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [desktopRows, mobileRows]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isIconicHovered, setIsIconicHovered] = useState(false);
  const [isBackBurnerOpen, setIsBackBurnerOpen] = useState(false);
  const [shouldRenderBackBurner, setShouldRenderBackBurner] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (isIconicHovered) {
      const timer = setTimeout(() => {
        setIsIconicHovered(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIconicHovered]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (inactive.length === 0) return;

    if (isBackBurnerOpen) {
      setShouldRenderBackBurner(true);
      return;
    }

    if (prefersReducedMotion) {
      setShouldRenderBackBurner(false);
      return;
    }

    const t = window.setTimeout(
      () => setShouldRenderBackBurner(false),
      COLLAPSE_ANIMATION_MS,
    );
    return () => window.clearTimeout(t);
  }, [inactive.length, isBackBurnerOpen, prefersReducedMotion]);

  const renderGridIntersections = () => {
    const cols = isMobile ? MOBILE_GRID_COLS : DESKTOP_GRID_COLS;
    const rows = Math.ceil(active.length / cols);
    if (rows === 0) return null;
    const intersections = [];
    const horizontalPoints = cols + 1;
    const verticalPoints = rows + 1;

    for (let row = 0; row < verticalPoints; row++) {
      for (let col = 0; col < horizontalPoints; col++) {
        const isHighlighted =
          hoveredIndex !== null &&
          ((row === Math.floor(hoveredIndex / cols) &&
            col === hoveredIndex % cols) || // top-left
            (row === Math.floor(hoveredIndex / cols) &&
              col === (hoveredIndex % cols) + 1) || // top-right
            (row === Math.floor(hoveredIndex / cols) + 1 &&
              col === hoveredIndex % cols) || // bottom-left
            (row === Math.floor(hoveredIndex / cols) + 1 &&
              col === (hoveredIndex % cols) + 1)); // bottom-right

        intersections.push(
          <div
            key={`intersection-${row}-${col}`}
            className={`absolute flex h-3 w-3 items-center justify-center transition-colors duration-200 ${
              isHighlighted
                ? "text-[hsl(var(--primary))]"
                : "text-gray-800 dark:text-gray-400"
            }`}
            style={{
              top: `${(row * 100) / rows}%`,
              left:
                col === 0
                  ? "0%"
                  : col === horizontalPoints - 1
                    ? "100%"
                    : `${(col * 100) / cols}%`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            +
          </div>,
        );
      }
    }

    return intersections;
  };

  return (
    <div className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="cursor-default text-sm font-bold text-gray-900 dark:text-gray-100">
          {"// currently materializing"}
        </h2>
      </div>

      <div className="relative" style={{ height: totalHeight }}>
        <div>{renderGridIntersections()}</div>

        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          style={{ height: totalHeight }}
        >
          {active.map((client, index) => (
            <div
              key={client.title}
              className={`group flex items-center justify-center ${
                client.disabled ? "cursor-default" : "cursor-pointer"
              }`}
              style={{ height: "112px" }}
              tabIndex={client.disabled ? -1 : 0}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              aria-disabled={client.disabled}
            >
              {client.disabled ? (
                <div className="relative flex h-full items-center justify-center">
                  {client.icon === "" ? (
                    <div className="transition-opacity group-hover:opacity-0">
                      <Spinner size="medium" />
                    </div>
                  ) : (
                    <Image
                      src={client.icon}
                      alt=""
                      width={500}
                      height={500}
                      className="h-12 w-auto object-contain transition-opacity group-hover:opacity-0 dark:invert"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity group-hover:opacity-100">
                    {hoveredIndex === index ? (
                      <>
                        <ScrambleText
                          text={client.title}
                          className="font-geist text-2xl font-bold tracking-wide opacity-50"
                        />
                        {client.status && (
                          <span className="mt-1 text-xs text-[var(--color-primary)] opacity-50">
                            {client.status}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="font-geist text-2xl font-bold tracking-wide opacity-50">
                        {client.title}
                      </span>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center md:hidden">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {client.title}
                    </span>
                  </div>
                </div>
              ) : (
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full items-center justify-center"
                >
                  {client.icon === "" ? (
                    <div className="transition-opacity group-hover:opacity-0">
                      <Spinner size="medium" />
                    </div>
                  ) : (
                    <Image
                      src={client.icon}
                      alt=""
                      width={500}
                      height={500}
                      className="h-12 w-auto object-contain transition-opacity group-hover:opacity-0 dark:invert"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity group-hover:opacity-100">
                    {hoveredIndex === index ? (
                      <>
                        <ScrambleText
                          text={client.title}
                          className="font-geist text-2xl font-bold tracking-wide"
                        />
                        {client.status && (
                          <span className="mt-1 text-xs text-[var(--color-primary)]">
                            {client.status}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="font-geist text-2xl font-bold tracking-wide">
                        {client.title}
                      </span>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center md:hidden">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {client.title}
                    </span>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {inactive.length > 0 && (
        <div className="mt-10">
          <div className="group">
            <button
              type="button"
              className="flex w-full select-none items-center justify-between text-sm font-bold text-gray-900 dark:text-gray-100"
              aria-expanded={isBackBurnerOpen}
              aria-controls="back-burner-panel"
              onClick={() => {
                setIsBackBurnerOpen((v) => {
                  const next = !v;
                  if (next) setShouldRenderBackBurner(true);
                  return next;
                });
              }}
            >
              <span>
                {"// back burner "}
                <span className="font-normal">({inactive.length})</span>
              </span>
              <span
                className={`font-mono text-xs transition-transform duration-200 motion-reduce:transition-none ${
                  isBackBurnerOpen ? "rotate-180" : ""
                }`}
              >
                v
              </span>
            </button>

            <div
              className={`grid ${prefersReducedMotion ? "" : "transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"} ${
                isBackBurnerOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id="back-burner-panel"
                  aria-hidden={!isBackBurnerOpen}
                  className={`pt-4 ${prefersReducedMotion ? "" : "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none"} ${
                    isBackBurnerOpen
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                  {...(!isBackBurnerOpen
                    ? ({ inert: true } as unknown as Record<string, boolean>)
                    : {})}
                >
                  {shouldRenderBackBurner ? (
                    <div className="space-y-2">
                      {inactive.map((p) => {
                        const content = (
                          <div className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                            {p.icon && p.icon !== "" ? (
                              <Image
                                src={p.icon}
                                alt=""
                                width={64}
                                height={64}
                                className="h-7 w-7 object-contain opacity-70 grayscale dark:invert"
                              />
                            ) : (
                              <div className="h-7 w-7 opacity-70">
                                <Spinner size="small" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="truncate text-sm text-gray-900 dark:text-gray-100">
                                {p.title}
                              </div>
                              {p.status ? (
                                <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                                  {p.status}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );

                        return (
                          <div key={p.title} className="opacity-70">
                            {p.disabled ? (
                              content
                            ) : (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                {content}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ScrambleText = ({
  text,
  className = "text-2xl font-bold tracking-wide font-geist",
}: {
  text: string;
  className?: string;
}) => {
  const { ref } = useScramble({
    text,
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 3,
    seed: 3,
  });

  return <span ref={ref} className={className} />;
};
