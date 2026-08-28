"use client";

import { useState } from "react";

const categories = ["Populært", "Pizza", "Spicy", "Burger", "Pasta", "Tilbehør"];
const menuItems = [
  { category: "Populært", number: "24", name: "Din egen pizza", description: "Tomatsauce, ost og op til 5 valgfri ingredienser", price: 85, badge: "Mest bestilt" },
  { category: "Populært", number: "5", name: "Pepperoni", description: "Tomatsauce, ost og fyldt pepperoni", price: 75 },
  { category: "Populært", number: "11", name: "Kebab", description: "Tomatsauce, ost, kebab, løg, salat og dressing", price: 80 },
  { category: "Pizza", number: "1", name: "Margherita", description: "Tomatsauce og ost", price: 70 },
  { category: "Pizza", number: "4", name: "Hawaii", description: "Tomatsauce, ost, skinke og ananas", price: 75 },
  { category: "Pizza", number: "16", name: "Italia", description: "Tomatsauce, ost, oksefilet, gorgonzola og løg", price: 85 },
  { category: "Spicy", number: "25", name: "Spicy 1", description: "Oksefilet, løg, oliven og jalapeños", price: 75, hot: true },
  { category: "Spicy", number: "26", name: "Spicy 2", description: "Kebab, pepperoni, frisk chili og pølse", price: 75, hot: true },
  { category: "Spicy", number: "27", name: "Spicy 3", description: "Kylling, champignon, stærk peber og bacon", price: 75, hot: true },
  { category: "Burger", number: "80", name: "Cheeseburger", description: "200 g bøf, ost, syltet agurk, løg og ketchup", price: 55 },
  { category: "Burger", number: "82", name: "Smokey burger", description: "200 g bøf, ost, bacon, tomat og BBQ-sauce", price: 65 },
  { category: "Pasta", number: "40", name: "Fettuccine con pollo", description: "Båndpasta med kylling, broccoli og karrysauce", price: 80 },
  { category: "Tilbehør", number: "94", name: "Pommes frites", description: "Sprøde pommes frites med 2 slags dip", price: 40 },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Populært");
  const visibleItems = menuItems.filter((item) => item.category === activeCategory);
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Spicy Pizza og Grill, forsiden"><span className="brand-mark">S</span><span>SPICY <b>PIZZA & GRILL</b></span></a>
        <nav aria-label="Hovedmenu"><a href="#menu">Menukort</a><a href="#about">Om os</a><a href="#contact">Kontakt</a></nav>
        <a className="button button-small" href="https://wolt.com/en/dnk/horsens/restaurant/spicy-pizza-grill">Bestil nu</a>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow"><i /> Vestergade 45 · Horsens</span>
          <h1>Smagen må gerne <em>bide lidt.</em></h1>
          <p>Sprøde pizzaer, saftige burgere og vores egen stærke sauce. Tilberedt frisk, når du bestiller.</p>
          <div className="hero-actions"><a className="button" href="#menu">Se menukort</a><a className="text-link" href="tel:+4526432750">Ring 26 43 27 50 <span>→</span></a></div>
          <div className="hero-meta"><div><strong>4,7</strong><span>★★★★★<small>Google rating</small></span></div><div><strong>20</strong><span>min.<small>Ca. afhentning</small></span></div></div>
        </div>
        <div className="hero-visual" aria-label="Frisk pizza med krydrede ingredienser"><div className="hero-tag"><span>Åben i dag</span><strong>16:00—23:00</strong></div><div className="round-label"><span>HORSENS</span><b>SPICY</b></div></div>
      </section>
      <section className="marquee" aria-label="Restaurantens kvaliteter"><span>Friske råvarer</span><b>✦</b><span>Hjemmelavet dressing</span><b>✦</b><span>Hurtig afhentning</span><b>✦</b><span>Levering i Horsens</span></section>
      <section className="menu-section" id="menu">
        <div className="section-heading"><div><span className="eyebrow"><i /> Vælg din favorit</span><h2>Fra vores menukort</h2></div><p>Et lille udvalg fra menuen. Alle retter tilberedes først, når du bestiller.</p></div>
        <div className="category-tabs" role="tablist" aria-label="Menukategorier">{categories.map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div>
        <div className="menu-grid">{visibleItems.map((item) => <article className="menu-card" key={`${item.category}-${item.number}`}><div className="menu-number">{item.number}</div><div className="menu-copy"><div className="menu-title"><h3>{item.name}</h3>{item.hot && <span className="hot">STÆRK</span>}{item.badge && <span className="badge">{item.badge}</span>}</div><p>{item.description}</p></div><strong className="price">{item.price},–</strong></article>)}</div>
        <a className="outline-button" href="https://www.onlyfood.dk/Menu.asp?id_r=164">Se hele menukortet <span>↗</span></a>
      </section>
      <section className="feature-section" id="about"><div className="feature-image"><span>Spicy siden<br/><strong>2021</strong></span></div><div className="feature-copy"><span className="eyebrow light"><i /> Lavet med kærlighed</span><h2>En lokal favorit i hjertet af Horsens.</h2><p>Hos Spicy Pizza & Grill handler det om god mad uden unødige omveje. Vi bruger friske råvarer, laver vores egen dressing og giver dig mulighed for at sammensætte pizzaen præcis, som du vil have den.</p><div className="feature-points"><div><span>01</span><strong>Frisklavet hver dag</strong></div><div><span>02</span><strong>Afhentning & levering</strong></div></div></div></section>
      <section className="order-banner"><span className="eyebrow light"><i /> Sulten?</span><h2>Aftensmaden er kun<br/>få klik væk.</h2><div><a className="button button-light" href="https://wolt.com/en/dnk/horsens/restaurant/spicy-pizza-grill">Bestil med Wolt</a><a className="text-link light-link" href="tel:+4526432750">Eller ring til os <span>→</span></a></div></section>
      <footer id="contact"><div className="footer-brand"><div className="brand"><span className="brand-mark">S</span><span>SPICY <b>PIZZA & GRILL</b></span></div><p>Pizza, pasta og grill i Horsens.</p></div><div><span className="footer-label">Besøg os</span><p>Vestergade 45<br/>8700 Horsens</p><a href="https://maps.google.com/?q=Vestergade+45+8700+Horsens">Find vej ↗</a></div><div><span className="footer-label">Kontakt</span><p><a href="tel:+4526432750">26 43 27 50</a><br/><a href="mailto:spicypizzagrill@gmail.com">spicypizzagrill@gmail.com</a></p></div><div><span className="footer-label">Åbningstider</span><p>Mandag: Lukket<br/>Tirsdag—søndag: 16—23</p></div><div className="footer-bottom"><span>© 2026 Spicy Pizza & Grill</span><span>Frontend-demo · oplysninger skal bekræftes</span></div></footer>
    </main>
  );
}
