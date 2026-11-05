import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import hero from "@/assets/hero-snacks.jpg";
import { MENU, DELIVERY_FEE, FREE_DELIVERY_ABOVE, type Item } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chai Nashta Corner – Order Samosa, Chai, Biscuits & Namkeen Online" },
      { name: "description", content: "Order samosa, pakodi, bread, chai, coffee, biscuits and namkeen packets online. Small and large packets with clear prices." },
      { property: "og:title", content: "Chai Nashta Corner – Order Online" },
      { property: "og:description", content: "Hot snacks, chai-coffee, biscuits and namkeen delivered to your home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type CartLine = { key: string; name: string; size: string; price: number; qty: number };
const rs = (n: number) => `₹${n}`;

function Index() {
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", pay: "upi" });
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState("");

  const lines = Object.values(cart);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const change = (key: string, d: number, line?: Omit<CartLine, "qty" | "key">) =>
    setCart((c) => {
      const cur = c[key] ?? (line ? { ...line, key, qty: 0 } : undefined);
      if (!cur) return c;
      const qty = cur.qty + d;
      const next = { ...c };
      if (qty <= 0) delete next[key];
      else next[key] = { ...cur, qty };
      return next;
    });

  const cats = useMemo(
    () =>
      MENU.filter((c) => cat === "all" || c.id === cat)
        .map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())) }))
        .filter((c) => c.items.length),
    [cat, q],
  );

  const upiId = "chainashta@upi";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent("Chai Nashta Corner")}&am=${total}&cu=INR&tn=${encodeURIComponent("Snacks Order")}`;
  useEffect(() => {
    if (form.pay !== "upi") return;
    let alive = true;
    import("qrcode")
      .then((m) => m.default.toDataURL(upiLink, { width: 180, margin: 1 }))
      .then((d) => { if (alive) setQr(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, [form.pay, upiLink]);
  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
    } catch {
      /* clipboard blocked - user can still read the ID */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderId("CN" + Math.floor(100000 + Math.random() * 900000));
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="font-display text-2xl text-primary">☕ Chai Nashta Corner</a>
          <button
            onClick={() => { setOpen(true); setStep("cart"); }}
            className="rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground shadow-warm"
          >
            🛒 Cart ({count}) · {rs(total)}
          </button>
        </div>
      </header>

      <section className="relative">
        <img src={hero} alt="Chai, samosa, pakoda, biscuits and namkeen" width={1600} height={912} className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-4 text-background">
          <p className="font-semibold uppercase tracking-widest text-accent">Hot · Fresh · Affordable</p>
          <h1 className="mt-2 max-w-xl font-display text-5xl leading-tight md:text-6xl">Chai and snacks, now online!</h1>
          <p className="mt-3 max-w-lg text-lg opacity-90">Samosa, pakodi, bread, chai, coffee, biscuits and namkeen — choose a small or large packet and place your order.</p>
          <a href="#menu" className="mt-6 w-fit rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground">View Menu →</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-4">
        {[
          ["1", "Pick an item", "Choose a small or large packet"],
          ["2", "Add to cart", "Increase quantity with + / −"],
          ["3", "Enter your details", "Name, mobile and address"],
          ["4", "Make payment", "UPI, Card or Cash on Delivery"],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-2xl border bg-card p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{n}</div>
            <h3 className="mt-3 font-display text-xl">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <main id="menu" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-4xl">Our Menu</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍 Search: Parle-G, Moong Dal..."
            className="w-full rounded-full border bg-card px-4 py-2 md:w-80"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[{ id: "all", title: "All", emoji: "⭐" }, ...MENU].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${cat === c.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"}`}
            >
              {c.emoji} {c.title}
            </button>
          ))}
        </div>

        {cats.map((c) => (
          <section key={c.id} className="mt-10">
            <h3 className="mb-4 font-display text-3xl text-primary">{c.emoji} {c.title}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.items.map((i) => <ItemCard key={i.id} item={i} cart={cart} change={change} />)}
            </div>
          </section>
        ))}
        {cats.length === 0 && <p className="mt-10 text-muted-foreground">No items found.</p>}
      </main>

      <footer className="border-t bg-secondary py-8 text-center text-sm text-muted-foreground">
        Free delivery on orders above ₹{FREE_DELIVERY_ABOVE} · Open: 7 AM to 10 PM
        <br />© 2026 Chai Nashta Corner
      </footer>

      {open && (
        <div className="fixed inset-0 z-40 flex justify-end bg-foreground/50" onClick={() => setOpen(false)}>
          <div className="flex h-full w-full max-w-md flex-col bg-background" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-display text-2xl">
                {step === "cart" ? "Your Cart" : step === "checkout" ? "Order Details" : "Order Placed!"}
              </h3>
              <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
            </div>

            {step === "cart" && (
              <>
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                  {lines.length === 0 && <p className="text-muted-foreground">Your cart is empty. Pick something tasty!</p>}
                  {lines.map((l) => (
                    <div key={l.key} className="flex items-center justify-between rounded-xl border bg-card p-3">
                      <div>
                        <p className="font-semibold">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.size} · {rs(l.price)}</p>
                      </div>
                      <Qty qty={l.qty} onMinus={() => change(l.key, -1)} onPlus={() => change(l.key, 1)} />
                    </div>
                  ))}
                </div>
                <Summary subtotal={subtotal} delivery={delivery} total={total}>
                  <button disabled={!count} onClick={() => setStep("checkout")} className="w-full rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-40">
                    Proceed →
                  </button>
                </Summary>
              </>
            )}

            {step === "checkout" && (
              <form onSubmit={placeOrder} className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                  <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border bg-card px-3 py-2" />
                  <input required pattern="[0-9]{10}" title="Enter a 10-digit mobile number" placeholder="Mobile number (10 digits)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border bg-card px-3 py-2" />
                  <textarea required placeholder="Full address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border bg-card px-3 py-2" rows={3} />
                  <p className="pt-2 font-semibold">How will you pay?</p>
                  {[
                    ["upi", "📱 UPI (GPay / PhonePe / Paytm)"],
                    ["card", "💳 Debit / Credit Card"],
                    ["cod", "💵 Cash on Delivery"],
                  ].map(([v = "", t]) => (
                    <label key={v} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${form.pay === v ? "border-primary bg-secondary" : "bg-card"}`}>
                      <input type="radio" name="pay" checked={form.pay === v} onChange={() => setForm({ ...form, pay: v })} /> {t}
                    </label>
                  ))}
                  {form.pay === "upi" && (
                    <div className="space-y-3 rounded-lg border border-primary bg-card p-3 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span>UPI ID: <b>{upiId}</b></span>
                        <button type="button" onClick={copyUpi} className="rounded-full border px-3 py-1 text-xs font-semibold">
                          {copied ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      {qr && (
                        <div className="flex flex-col items-center gap-1 rounded-lg bg-secondary p-3">
                          <img src={qr} alt={`UPI QR code – ${rs(total)}`} width={180} height={180} className="rounded-md bg-background" />
                          <p className="text-xs font-semibold text-primary">Total: {rs(total)}</p>
                          <p className="text-xs text-muted-foreground">Scan with your phone camera — it opens in GPay, PhonePe or Paytm</p>
                        </div>
                      )}
                      <a
                        href={upiLink}
                        className="flex items-center justify-center gap-2 rounded-full bg-primary py-2 font-bold text-primary-foreground"
                      >
                        📲 Pay via UPI app · {rs(total)}
                      </a>
                      <details className="rounded-lg border bg-secondary p-3">
                        <summary className="cursor-pointer font-semibold">Sending after copying? Follow these 4 steps</summary>
                        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs">
                          <li>Tap <b>Copy</b> above — the UPI ID will be copied to your phone.</li>
                          <li>Open the GPay / PhonePe / Paytm app and go to <b>Send / Pay</b>.</li>
                          <li>Paste it in the <b>UPI ID</b> option (<b>chainashta@upi</b>).</li>
                          <li>Enter <b>{rs(total)}</b> and your 4-digit PIN — done!</li>
                        </ol>
                      </details>
                      <p className="text-xs text-muted-foreground">
                        Tapping the button opens a list of payment apps on your phone — choose GPay, PhonePe or Paytm and enter your PIN.
                      </p>
                    </div>
                  )}
                  {form.pay === "card" && (
                    <div className="space-y-2">
                      <input required placeholder="Card number" inputMode="numeric" className="w-full rounded-lg border bg-card px-3 py-2" />
                      <div className="flex gap-2">
                        <input required placeholder="MM/YY" className="w-1/2 rounded-lg border bg-card px-3 py-2" />
                        <input required placeholder="CVV" className="w-1/2 rounded-lg border bg-card px-3 py-2" />
                      </div>
                    </div>
                  )}
                </div>
                <Summary subtotal={subtotal} delivery={delivery} total={total}>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStep("cart")} className="rounded-full border px-4 py-3">← Back</button>
                    <button className="flex-1 rounded-full bg-primary py-3 font-bold text-primary-foreground">
                      {form.pay === "cod" ? "Place Order" : `Pay ${rs(total)}`}
                    </button>
                  </div>
                </Summary>
              </form>
            )}

            {step === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="text-6xl">🎉</div>
                <h4 className="mt-4 font-display text-3xl">Thank you, {form.name}!</h4>
                <p className="mt-2 text-muted-foreground">Order ID: <b className="text-foreground">{orderId}</b></p>
                <p className="mt-1">Total: <b>{rs(total)}</b> · {form.pay === "cod" ? "Cash on Delivery" : "Payment successful"}</p>
                <p className="mt-1 text-sm text-muted-foreground">Your snacks will reach {form.address} within 30 minutes.</p>
                <button onClick={() => { setCart({}); setStep("cart"); setOpen(false); }} className="mt-6 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">
                  Start a new order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ItemCard({ item, cart, change }: { item: Item; cart: Record<string, CartLine>; change: (k: string, d: number, l?: Omit<CartLine, "qty" | "key">) => void }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <h4 className="text-lg font-bold">{item.name}</h4>
      {item.desc && <p className="text-sm text-muted-foreground">{item.desc}</p>}
      <div className="mt-3 space-y-2">
        {item.sizes.map((sz) => {
          const key = `${item.id}-${sz.label}`;
          const qty = cart[key]?.qty ?? 0;
          return (
            <div key={key} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
              <div>
                <p className="text-sm">{sz.label}</p>
                <p className="font-bold text-primary">{rs(sz.price)}</p>
              </div>
              {qty === 0 ? (
                <button onClick={() => change(key, 1, { name: item.name, size: sz.label, price: sz.price })} className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  + Add
                </button>
              ) : (
                <Qty qty={qty} onMinus={() => change(key, -1)} onPlus={() => change(key, 1)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Qty({ qty, onMinus, onPlus }: { qty: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onMinus} className="h-8 w-8 rounded-full border bg-background font-bold">−</button>
      <span className="w-5 text-center font-bold">{qty}</span>
      <button onClick={onPlus} className="h-8 w-8 rounded-full bg-primary font-bold text-primary-foreground">+</button>
    </div>
  );
}

function Summary({ subtotal, delivery, total, children }: { subtotal: number; delivery: number; total: number; children: React.ReactNode }) {
  return (
    <div className="space-y-1 border-t p-4 text-sm">
      <div className="flex justify-between"><span>Subtotal</span><span>{rs(subtotal)}</span></div>
      <div className="flex justify-between"><span>Delivery</span><span>{delivery ? rs(delivery) : "Free"}</span></div>
      <div className="flex justify-between pb-3 text-lg font-bold"><span>Total</span><span>{rs(total)}</span></div>
      {children}
    </div>
  );
}
