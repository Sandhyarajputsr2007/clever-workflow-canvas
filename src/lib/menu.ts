export type Size = { label: string; price: number };
export type Item = { id: string; name: string; desc?: string; sizes: Size[] };
export type Category = { id: string; title: string; emoji: string; items: Item[] };

const s = (small: number, big: number, sl = "Small packet", bl = "Large packet"): Size[] => [
  { label: sl, price: small },
  { label: bl, price: big },
];

export const MENU: Category[] = [
  {
    id: "garam",
    title: "Hot Snacks",
    emoji: "🥟",
    items: [
      { id: "samosa", name: "Samosa", desc: "Potato masala stuffed, served with green chutney", sizes: s(15, 50, "1 piece", "4 piece") },
      { id: "kachori", name: "Onion Kachori", desc: "Crispy and tangy", sizes: s(20, 70, "1 piece", "4 piece") },
      { id: "pakodi", name: "Onion Pakodi", desc: "Hot gram-flour onion pakodi", sizes: s(30, 100, "100 g", "250 g") },
      { id: "aloo-pakoda", name: "Potato Pakoda", sizes: s(30, 100, "100 g", "250 g") },
      { id: "paneer-pakoda", name: "Paneer Pakoda", sizes: s(50, 180, "100 g", "250 g") },
      { id: "bread-pakoda", name: "Bread Pakoda", desc: "Bread pakoda stuffed with potato", sizes: s(20, 70, "1 piece", "4 piece") },
      { id: "bread-butter", name: "Bread Butter", sizes: s(25, 45, "2 slice", "4 slice") },
      { id: "bread-omelette", name: "Bread Omelette", sizes: s(40, 70, "Single", "Double") },
      { id: "bread-packet", name: "Bread Packet (Britannia / Harvest)", sizes: s(30, 50, "Small 200 g", "Large 400 g") },
    ],
  },
  {
    id: "chai",
    title: "Chai & Coffee",
    emoji: "☕",
    items: [
      { id: "cutting", name: "Cutting Chai", sizes: s(10, 20, "Small glass", "Large cup") },
      { id: "adrak", name: "Ginger Chai", sizes: s(15, 25, "Small glass", "Large cup") },
      { id: "elaichi", name: "Cardamom Chai", sizes: s(15, 25, "Small glass", "Large cup") },
      { id: "masala-chai", name: "Masala Chai", sizes: s(20, 30, "Small glass", "Large cup") },
      { id: "kulhad", name: "Kulhad Chai", sizes: s(25, 40, "Small kulhad", "Large kulhad") },
      { id: "hot-coffee", name: "Hot Coffee", sizes: s(25, 40, "Small cup", "Large cup") },
      { id: "filter-coffee", name: "Filter Coffee", sizes: s(30, 50, "Small cup", "Large cup") },
      { id: "cold-coffee", name: "Cold Coffee", sizes: s(50, 80, "Regular", "Large") },
      { id: "nescafe", name: "Nescafé Classic Packet", sizes: s(5, 160, "Sachet", "Jar 50 g") },
      { id: "bru", name: "Bru Instant Coffee", sizes: s(5, 150, "Sachet", "Jar 50 g") },
      { id: "tata-tea", name: "Tata Tea Premium Packet", sizes: s(65, 270, "250 g", "1 kg") },
      { id: "redlabel", name: "Red Label Tea Leaves", sizes: s(70, 280, "250 g", "1 kg") },
    ],
  },
  {
    id: "biscuit",
    title: "Biscuit Packets",
    emoji: "🍪",
    items: [
      { id: "parle-g", name: "Parle-G", sizes: s(5, 50) },
      { id: "marie-gold", name: "Britannia Marie Gold", sizes: s(10, 40) },
      { id: "good-day", name: "Britannia Good Day", sizes: s(10, 35) },
      { id: "bourbon", name: "Britannia Bourbon", sizes: s(10, 35) },
      { id: "50-50", name: "Britannia 50-50", sizes: s(10, 30) },
      { id: "nutrichoice", name: "Britannia NutriChoice", sizes: s(10, 40) },
      { id: "milk-bikis", name: "Britannia Milk Bikis", sizes: s(10, 30) },
      { id: "tiger", name: "Britannia Tiger", sizes: s(5, 20) },
      { id: "monaco", name: "Parle Monaco", sizes: s(10, 35) },
      { id: "krackjack", name: "Parle Krackjack", sizes: s(10, 30) },
      { id: "hide-seek", name: "Parle Hide & Seek", sizes: s(10, 35) },
      { id: "20-20", name: "Parle 20-20 Cookies", sizes: s(10, 30) },
      { id: "happy-happy", name: "Parle Happy Happy", sizes: s(10, 30) },
      { id: "oreo", name: "Cadbury Oreo", sizes: s(10, 35) },
      { id: "dark-fantasy", name: "Sunfeast Dark Fantasy", sizes: s(10, 40) },
      { id: "mom-magic", name: "Sunfeast Mom's Magic", sizes: s(10, 30) },
      { id: "jim-jam", name: "Britannia Jim Jam", sizes: s(10, 35) },
      { id: "treat", name: "Britannia Treat", sizes: s(10, 30) },
      { id: "unibic", name: "Unibic Cookies", sizes: s(10, 30) },
      { id: "rusk", name: "Britannia Toastea Rusk", sizes: s(10, 55) },
    ],
  },
  {
    id: "namkeen",
    title: "Namkeen Packets",
    emoji: "🥜",
    items: [
      { id: "moong-dal", name: "Moong Dal", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "aloo-bhujia", name: "Potato Bhujia (Aloo Bhujia)", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "bikaneri-bhujia", name: "Bikaneri Bhujia", sizes: s(10, 60, "Small 40 g", "Large 200 g") },
      { id: "navratan", name: "Navratan Mixture", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "khatta-meetha", name: "Sweet & Tangy Mixture (Khatta Meetha)", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "all-in-one", name: "All in One Mix", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "chana-dal", name: "Chana Dal", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "masala-peanut", name: "Masala Peanuts", sizes: s(10, 50, "Small 40 g", "Large 200 g") },
      { id: "plain-sev", name: "Plain Sev", sizes: s(10, 50, "Small 40 g", "Large 200 g") },
      { id: "ratlami-sev", name: "Ratlami Sev", sizes: s(10, 60, "Small 40 g", "Large 200 g") },
      { id: "cornflakes-mix", name: "Cornflakes Mixture", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "dal-biji", name: "Dal Biji", sizes: s(10, 55, "Small 40 g", "Large 200 g") },
      { id: "soya-sticks", name: "Soya Sticks", sizes: s(10, 50, "Small 40 g", "Large 200 g") },
      { id: "kurkure", name: "Kurkure Masala Munch", sizes: s(10, 20) },
      { id: "lays", name: "Lay's Chips", sizes: s(10, 20) },
      { id: "bingo", name: "Bingo Mad Angles", sizes: s(10, 20) },
      { id: "haldiram-mix", name: "Haldiram's Navrattan", sizes: s(10, 99, "Small 40 g", "Large 400 g") },
    ],
  },
];

export const DELIVERY_FEE = 20;
export const FREE_DELIVERY_ABOVE = 199;
