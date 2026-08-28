"use client";

import { useState } from "react";

type MenuItem = { category:string; number:string; name:string; description:string; price:number; badge?:string; hot?:boolean };
type CartItem = MenuItem & { id:string; quantity:number; size:string; extras:{name:string;quantity:number;price:number}[]; note:string; unitPrice:number };
type Topping = { name:string; price:number };

const categories = ["Populært", "Pizza", "Spicy", "Burger", "Pasta", "Tilbehør"];
const toppings:Topping[] = [
  ...["Kebab","Kylling","Pepperoni","Skinke","Pølse","Bacon","Tun","Oksefilet","Fyldt pepperoni","Oksekød","Ost","Salat","Caroline peber","Mozzarella","Cheddarost","Gorgonzola","Fetaost"].map((name)=>({name,price:10})),
  ...["Løg","Frisk tomat","Majs","Peberfrugt","Champignon","Asparges","Rød peber","Soltørrede tomater","Tomat-flødesauce","Broccoli","Artiskok","Ananas","Hvidløg","Chilipeber","Jalapeños","Dressing"].map((name)=>({name,price:5})),
];
const menuItems: MenuItem[] = [
  { category:"Populært", number:"24", name:"Din egen pizza", description:"Tomatsauce, ost og op til 5 valgfri ingredienser", price:85, badge:"Mest bestilt" },
  { category:"Populært", number:"5", name:"Pepperoni", description:"Tomatsauce, ost og fyldt pepperoni", price:75 },
  { category:"Populært", number:"11", name:"Kebab", description:"Tomatsauce, ost, kebab, løg, salat og dressing", price:80 },
  { category:"Pizza", number:"1", name:"Margherita", description:"Tomatsauce og ost", price:70 },
  { category:"Pizza", number:"4", name:"Hawaii", description:"Tomatsauce, ost, skinke og ananas", price:75 },
  { category:"Pizza", number:"16", name:"Italia", description:"Tomatsauce, ost, oksefilet, gorgonzola og løg", price:85 },
  { category:"Spicy", number:"25", name:"Spicy 1", description:"Oksefilet, løg, oliven og jalapeños", price:75, hot:true },
  { category:"Spicy", number:"26", name:"Spicy 2", description:"Kebab, pepperoni, frisk chili og pølse", price:75, hot:true },
  { category:"Spicy", number:"27", name:"Spicy 3", description:"Kylling, champignon, stærk peber og bacon", price:75, hot:true },
  { category:"Burger", number:"80", name:"Cheeseburger", description:"200 g bøf, ost, syltet agurk, løg og ketchup", price:55 },
  { category:"Burger", number:"82", name:"Smokey burger", description:"200 g bøf, ost, bacon, tomat og BBQ-sauce", price:65 },
  { category:"Pasta", number:"40", name:"Fettuccine con pollo", description:"Båndpasta med kylling, broccoli og karrysauce", price:80 },
  { category:"Tilbehør", number:"94", name:"Pommes frites", description:"Sprøde pommes frites med 2 slags dip", price:40 },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Populært");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [orderType, setOrderType] = useState<"pickup"|"delivery">("pickup");
  const [selectedItem, setSelectedItem] = useState<MenuItem|null>(null);
  const [selectedSize, setSelectedSize] = useState<"Alm."|"3 Pers.">("Alm.");
  const [selectedExtras, setSelectedExtras] = useState<Record<string,number>>({});
  const [itemNote, setItemNote] = useState("");
  const visibleItems = menuItems.filter((item) => item.category === activeCategory);
  const itemCount = cart.reduce((sum,item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum,item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderType === "delivery" ? 25 : 0;
  const isPizza = (item:MenuItem) => ["Populært","Pizza","Spicy"].includes(item.category);
  const itemBasePrice = selectedItem ? selectedSize === "3 Pers." && isPizza(selectedItem) ? selectedItem.price*2 : selectedItem.price : 0;
  const extrasPrice = toppings.reduce((sum,topping)=>sum+(selectedExtras[topping.name]||0)*topping.price,0);
  const openCustomizer = (item:MenuItem) => { setSelectedItem(item); setSelectedSize("Alm."); setSelectedExtras({}); setItemNote(""); };
  const updateExtra = (name:string,amount:number) => setSelectedExtras((current)=>({...current,[name]:Math.max(0,(current[name]||0)+amount)}));
  const confirmItem = () => { if(!selectedItem)return; const extras=toppings.filter((t)=>selectedExtras[t.name]>0).map((t)=>({...t,quantity:selectedExtras[t.name]})); const id=`${selectedItem.number}-${Date.now()}`; const details=[isPizza(selectedItem)?selectedSize:"",extras.map((extra)=>`${extra.quantity}× ${extra.name}`).join(", "),itemNote].filter(Boolean).join(" · "); setCart((current)=>[...current,{...selectedItem,name:`${selectedItem.name}${isPizza(selectedItem)?` · ${selectedSize}`:""}`,description:details,price:itemBasePrice+extrasPrice,id,quantity:1,size:isPizza(selectedItem)?selectedSize:"Standard",extras,note:itemNote,unitPrice:itemBasePrice+extrasPrice}]); setSelectedItem(null); setCartOpen(true); };
  const changeQuantity = (number:string, amount:number) => setCart((current)=>current.map((item)=>item.number===number?{...item,quantity:item.quantity+amount}:item).filter((item)=>item.quantity>0));
  const openCart = () => { setCheckout(false); setCartOpen(true); };

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Spicy Pizza og Grill, forsiden"><span className="brand-mark">S</span><span>SPICY <b>PIZZA & GRILL</b></span></a>
      <nav aria-label="Hovedmenu"><a href="#menu">Menukort</a><a href="#about">Om os</a><a href="#contact">Kontakt</a></nav>
      <button className="button button-small cart-trigger" onClick={openCart}>Kurv <span>{itemCount}</span></button>
    </header>
    <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow"><i /> Vestergade 45 · Horsens</span><h1>Smagen må gerne <em>bide lidt.</em></h1><p>Sprøde pizzaer, saftige burgere og vores egen stærke sauce. Tilberedt frisk, når du bestiller.</p><div className="hero-actions"><a className="button" href="#menu">Bestil direkte</a><a className="text-link" href="tel:+4526432750">Ring 26 43 27 50 <span>→</span></a></div><div className="hero-meta"><div><strong>4,7</strong><span>★★★★★<small>Google rating</small></span></div><div><strong>20</strong><span>min.<small>Ca. afhentning</small></span></div></div></div><div className="hero-visual" aria-label="Frisk pizza med krydrede ingredienser"><div className="hero-tag"><span>Åben i dag</span><strong>16:00—23:00</strong></div><div className="round-label"><span>HORSENS</span><b>SPICY</b></div></div></section>
    <section className="marquee" aria-label="Restaurantens kvaliteter"><span>Friske råvarer</span><b>✦</b><span>Bestil direkte</span><b>✦</b><span>Hurtig afhentning</span><b>✦</b><span>Levering i Horsens</span></section>
    <section className="delivery-preview" aria-label="Leveringsinformation"><div className="delivery-icon">4 <small>KM</small></div><div><span>Levering i nærområdet</span><strong>Levering fra 25 kr.</strong><p>Op til 4 km fra restauranten · foreløbige demooplysninger</p></div><button onClick={openCart}>Vælg levering <b>→</b></button></section>
    <section className="menu-section" id="menu"><div className="section-heading"><div><span className="eyebrow"><i /> Vælg din favorit</span><h2>Bestil fra menukortet</h2></div><p>Læg dine favoritter i kurven og vælg afhentning eller levering.</p></div><div className="category-tabs" role="tablist" aria-label="Menukategorier">{categories.map((category)=><button key={category} className={activeCategory===category?"active":""} onClick={()=>setActiveCategory(category)} role="tab" aria-selected={activeCategory===category}>{category}</button>)}</div><div className="menu-grid">{visibleItems.map((item)=><article className="menu-card order-card" key={`${item.category}-${item.number}`}><div className="menu-number">{item.number}</div><div className="menu-copy"><div className="menu-title"><h3>{item.name}</h3>{item.hot&&<span className="hot">STÆRK</span>}{item.badge&&<span className="badge">{item.badge}</span>}</div><p>{item.description}</p></div><div className="menu-buy"><strong className="price">{item.price},–</strong><button onClick={()=>openCustomizer(item)} aria-label={`Vælg størrelse og tilbehør til ${item.name}`}>+</button></div></article>)}</div><p className="demo-note">Demomenu — hele menuen og alle valgmuligheder tilføjes efter aftale med restauranten.</p></section>
    <section className="feature-section" id="about"><div className="feature-image"><span>Spicy siden<br/><strong>2021</strong></span></div><div className="feature-copy"><span className="eyebrow light"><i /> Lavet med kærlighed</span><h2>En lokal favorit i hjertet af Horsens.</h2><p>Hos Spicy Pizza & Grill handler det om god mad uden unødige omveje. Vi bruger friske råvarer, laver vores egen dressing og giver dig mulighed for at sammensætte pizzaen præcis, som du vil have den.</p><div className="feature-points"><div><span>01</span><strong>Frisklavet hver dag</strong></div><div><span>02</span><strong>Afhentning & levering</strong></div></div></div></section>
    <section className="order-banner"><span className="eyebrow light"><i /> Sulten?</span><h2>Aftensmaden er kun<br/>få klik væk.</h2><div><button className="button button-light" onClick={()=>document.querySelector("#menu")?.scrollIntoView()}>Start din bestilling</button><a className="text-link light-link" href="tel:+4526432750">Eller ring til os <span>→</span></a></div></section>
    <footer id="contact"><div className="footer-brand"><div className="brand"><span className="brand-mark">S</span><span>SPICY <b>PIZZA & GRILL</b></span></div><p>Pizza, pasta og grill i Horsens.</p></div><div><span className="footer-label">Besøg os</span><p>Vestergade 45<br/>8700 Horsens</p><a href="https://maps.google.com/?q=Vestergade+45+8700+Horsens">Find vej ↗</a></div><div><span className="footer-label">Kontakt</span><p><a href="tel:+4526432750">26 43 27 50</a><br/><a href="mailto:spicypizzagrill@gmail.com">spicypizzagrill@gmail.com</a></p></div><div><span className="footer-label">Åbningstider</span><p>Mandag: Lukket<br/>Tirsdag—søndag: 16—23</p></div><div className="footer-bottom"><span>© 2026 Spicy Pizza & Grill</span><span>Frontend-demo · oplysninger skal bekræftes</span></div></footer>

    {cartOpen && <><button className="cart-backdrop" onClick={()=>setCartOpen(false)} aria-label="Luk kurven"/><aside className="cart-panel" aria-label="Din bestilling" aria-live="polite"><div className="cart-head"><div><span>DIN BESTILLING</span><h2>{checkout?"Oplysninger":"Kurv"}</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Luk">×</button></div>{checkout?<div className="checkout-form"><button className="back-link" onClick={()=>setCheckout(false)}>← Tilbage til kurven</button><div className="order-toggle"><button className={orderType==="pickup"?"active":""} onClick={()=>setOrderType("pickup")}>Afhentning</button><button className={orderType==="delivery"?"active":""} onClick={()=>setOrderType("delivery")}>Levering</button></div><label>Navn<input type="text" placeholder="Dit fulde navn"/></label><label>Telefon<input type="tel" placeholder="Dit telefonnummer"/></label>{orderType==="delivery"&&<label>Leveringsadresse<input type="text" placeholder="Adresse i Horsens"/></label>}<label>Bemærkning<textarea placeholder="Fx ingen løg eller ekstra dressing"/></label><div className="checkout-summary"><span>Total</span><strong>{subtotal+deliveryFee},–</strong></div><button className="checkout-button" disabled>Betaling aktiveres efter aftale</button><p>Dette er et sikkert demoflow. Ingen oplysninger bliver sendt.</p></div>:<div className="cart-content">{cart.length===0?<div className="empty-cart"><span>0</span><h3>Kurven er tom</h3><p>Vælg noget lækkert fra menukortet.</p><button onClick={()=>setCartOpen(false)}>Se menukort</button></div>:<><div className="cart-items">{cart.map((item)=><div className="cart-item" key={item.number}><div><strong>{item.name}</strong><small>Nr. {item.number}</small></div><div className="quantity"><button onClick={()=>changeQuantity(item.number,-1)} aria-label={`Fjern en ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={()=>changeQuantity(item.number,1)} aria-label={`Tilføj en ${item.name}`}>+</button></div><b>{item.price*item.quantity},–</b></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{subtotal},–</strong></div><button className="checkout-button" onClick={()=>setCheckout(true)}>Gå til bestilling <span>→</span></button><p className="cart-caption">Betaling og ordremodtagelse aktiveres efter aftale med restauranten.</p></>}</div>}</aside></>}
    {selectedItem && <><button className="cart-backdrop" onClick={()=>setSelectedItem(null)} aria-label="Luk tilpasning"/><section className="customizer" role="dialog" aria-modal="true" aria-label={`Tilpas ${selectedItem.name}`}>
      <div className="customizer-head"><div><span>NR. {selectedItem.number}</span><h2>{selectedItem.name}</h2><p>{selectedItem.description}</p></div><button onClick={()=>setSelectedItem(null)} aria-label="Luk">×</button></div>
      <div className="customizer-body">
        {isPizza(selectedItem)&&<div className="customizer-section"><h3>Vælg størrelse</h3><div className="size-options"><button className={selectedSize==="Alm."?"active":""} onClick={()=>setSelectedSize("Alm.")}><span>Almindelig</span><strong>{selectedItem.price},–</strong></button><button className={selectedSize==="3 Pers."?"active":""} onClick={()=>setSelectedSize("3 Pers.")}><span>3 personer</span><strong>{selectedItem.price*2},–</strong></button></div></div>}
        <div className="customizer-section"><h3>Ekstra tilbehør <small>valgfrit</small></h3><div className="toppings-grid">{toppings.map((topping)=><div className="topping-row" key={topping.name}><div><strong>{topping.name}</strong><small>+{topping.price},–</small></div><div className="topping-quantity"><button onClick={()=>updateExtra(topping.name,-1)} aria-label={`Fjern ${topping.name}`}>−</button><span>{selectedExtras[topping.name]||0}</span><button onClick={()=>updateExtra(topping.name,1)} aria-label={`Tilføj ${topping.name}`}>+</button></div></div>)}</div></div>
        <div className="customizer-section"><label className="item-note">Bemærkning til køkkenet<textarea value={itemNote} onChange={(event)=>setItemNote(event.target.value)} placeholder="Fx uden løg, dressing ved siden af eller ekstra sprød" maxLength={250}/><small>{itemNote.length}/250</small></label></div>
      </div>
      <div className="customizer-footer"><div><span>Total for varen</span><strong>{itemBasePrice+extrasPrice},–</strong></div><button onClick={confirmItem}>Læg i kurven <span>→</span></button></div>
    </section></>}
  </main>;
}
