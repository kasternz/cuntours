import { useEffect, useRef } from "react";

/**
 * TripAdvisor's official "Write a Review" widget. This is a third-party
 * script that manipulates the DOM directly, so it only runs in the browser
 * (never during SSR) and is scoped to its own container via a ref.
 */
export function TripAdvisorWriteReviewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = `
      <div id="TA_cdswritereviewlgvi470" class="TA_cdswritereviewlgvi">
        <ul id="UkmyRVfrR43O" class="TA_links LyEwGbGz">
          <li id="i1n5J0lqQmkP" class="lTdyyrDQ">
            <a target="_blank" rel="noopener noreferrer" href="https://www.tripadvisor.com/">
              <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" />
            </a>
          </li>
        </ul>
      </div>
    `;

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.jscache.com/wejs?wtype=cdswritereviewlgvi&uniq=470&locationId=34134240&lang=en_US&display_version=2";
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="flex justify-center" />;
}
