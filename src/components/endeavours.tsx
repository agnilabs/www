"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { Spinner } from "~/components/spinner";
import { endeavours } from "~/config/endavours";

export const Endeavours = () => {
  const ITEM_HEIGHT = 112;
  const DESKTOP_GRID_COLS = 4;
  const MOBILE_GRID_COLS = 2;
  const desktopRows = Math.ceil(endeavours.length / DESKTOP_GRID_COLS);
  const mobileRows = Math.ceil(endeavours.length / MOBILE_GRID_COLS);

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

  useEffect(() => {
    if (isIconicHovered) {
      const timer = setTimeout(() => {
        setIsIconicHovered(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIconicHovered]);

  const renderGridIntersections = () => {
    const cols = isMobile ? MOBILE_GRID_COLS : DESKTOP_GRID_COLS;
    const rows = Math.ceil(endeavours.length / cols);
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
        <h2 className="cursor-default text-lg font-bold">
          materializing fun ideas
        </h2>
      </div>

      <div className="relative" style={{ height: totalHeight }}>
        <div>{renderGridIntersections()}</div>

        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          style={{ height: totalHeight }}
        >
          {endeavours.map((client, index) => (
            <div
              key={client.title}
              className={`group flex items-center justify-center ${
                client.disabled ? "cursor-default" : "cursor-pointer"
              }`}
              style={{ height: "112px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
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
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
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
