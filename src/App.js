import "./styles.css";
import { useEffect, useState, useRef } from "react";

export default function App() {
  const links = ["burgers", "fruits", "nuts"];
  // const [hashValue, sethashValue] = useState(window.location.hash.substr(1));
  const [activeItem, setActiveItem] = useState(
    window.location.hash.substr(1) || "burgers"
  );
  const tabContentRef = useRef();
  useEffect(() => {
    window.addEventListener("hashchange", () => {
      const newHash = window.location.hash.substr(1);
      if (links.includes(newHash)) {
        setActiveItem(newHash);
      }
      // sethashValue(window.location.hash.substr(1));
    });
  });

  const handleSectionScroll = () => {
    clearTimeout(tabContentRef.current.scrollTimer);
    tabContentRef.current.scrollTimer = setTimeout(() => {
      const activeItemIndex =
        tabContentRef.current.scrollLeft / tabContentRef.current.clientWidth;
      setActiveItem(links[activeItemIndex]);
    }, 50);
  };

  return (
    <div className="App">
      <h1 className="title">tabs with scroll snap</h1>
      <div>
        <header className="header">
          <ul className="header-items">
            {links.map((el, id) => (
              <li key={id}>
                <a
                  className={`${activeItem === el ? "selected" : ""}`}
                  href={`#${el}`}
                >
                  {el}
                </a>
              </li>
            ))}
          </ul>
        </header>
        <section
          ref={tabContentRef}
          onScroll={handleSectionScroll}
          className="tab-snap"
        >
          <section id="burgers" className="tab-snap-item">
            burgers
          </section>
          <section id="fruits" className="tab-snap-item">
            fruits
          </section>
          <section id="nuts" className="tab-snap-item">
            nuts
          </section>
        </section>
      </div>
    </div>
  );
}
