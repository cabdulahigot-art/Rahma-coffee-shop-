import { MenuItem, Testimonial } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'latte-art-special',
    name: 'Latte Art Special',
    price: 5.50,
    description: 'Our house-blend espresso smoothed with silky steamed milk and finished with beautiful artisanal rosetta art.',
    category: 'coffee',
    sweetness: 85,
    acidity: 45,
    body: 70,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmQlwl1JxJ-ZRe8CkgW3t5PWrS-xnKmAyT503itWx9CfENPI5WbNy1d1ZebhxxstmgyrXO599__bEv9kjsLqawMAFSOIEYUwBk1HkphhrN3Mg4EOvKBFMsxq4f7RyRWGsPWXAQ6kHO1F41P0hJT6yfk2DXvCQLD9hJJl0ZBIQWI6DhXmQJKUB2xUVVes8OuT9-g1rGurcCd-0Ngr4u8eMt0fdt2Ta_r6EoKqMiPNpTXl-15z7cLqmYvwTePKEr_RZtJoxYEMExT4kU',
    alt: 'Masterfully crafted latte with dynamic rosetta art in a white ceramic cup',
    customizable: true
  },
  {
    id: 'iced-caramel-macchiato',
    name: 'Iced Caramel Macchiato',
    price: 6.25,
    description: 'Chilled layers of velvety milk, house espresso, and our signature artisanal sweet caramel drizzle over ice.',
    category: 'coffee',
    sweetness: 95,
    acidity: 30,
    body: 60,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp8rcSOA7n2MSMBP6lzLlXF62F4btmuSQ7dnFeV17JQddr3VK2cBwq3hEk6q4tQQekPq5zXlVshn8fIcHYK9RzwcQfgUvVbsneF1MglRrW45_3HmnMakRiiAkm-HxUo7l_Hc_AvTHS0mV1V-Wj21y2ItQ1a3dH4jXVkZm-SM6QmJp9SP9x58Sah9w_suagvo2mDnaepD0hxP-sfSiIa7M4Bo1toq9Hw0qSI82-q-7M9MGk5u15lSa7G0syplkIuyo8vkuKyOij2CT4',
    alt: 'Layered iced caramel macchiato glass showing distinct milk, espresso, and golden syrup swirls',
    customizable: true
  },
  {
    id: 'signature-espresso',
    name: 'Signature Espresso',
    price: 3.75,
    description: 'A concentrated, full-bodied shot pulled at high pressure from our heritage premium single-origin beans.',
    category: 'coffee',
    sweetness: 50,
    acidity: 80,
    body: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBohiK35MGWe1HSd8-7zQJyVHgJqji79b4526TV1mEjBmYdcA7zVABLWYslGHAI6NPvhMdl1_6k4zddrirXgUKMOIg-hgg-fqufAlifLy0pWraa5D6fbs9XNc1LEM42XgIEA4qY2NR-HCZDqI6rkJbZNx2DsDaemjgsCW1EGI83x-ES9s2dd2BDspiTEhmtoHGFfzCDId8_hXnJr1oRWL9mqdMhvj75mADeHlD3u-zQ5WJFKRFR9E9hTzrYWjbud8n73C4AUYsXOzj1',
    alt: 'Dark rich espresso shot with thick golden-brown crema in a designer small ceramic cup',
    customizable: true
  },
  {
    id: 'nitro-cold-brew',
    name: 'Nitro Velvet Cold Brew',
    price: 5.50,
    description: 'Slow-steeped cold brew infused with nitrogen for a super-smooth, ultra-creamy, cascading draft pour.',
    category: 'cold-brew',
    sweetness: 40,
    acidity: 20,
    body: 85,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    alt: 'Pint of draft nitro cold brew with a creamy foamy head on a wooden table',
    customizable: true
  },
  {
    id: 'matcha-latte',
    name: 'Ceremonial Matcha Latte',
    price: 5.25,
    description: 'Vibrant organic Japanese ceremonial stone-ground matcha whisked into hot velvety milk of your choice.',
    category: 'tea',
    sweetness: 65,
    acidity: 15,
    body: 75,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    alt: 'Fresh high-grade green matcha latte in a modern ceramic bowl with dynamic lather',
    customizable: true
  },
  {
    id: 'fresh-butter-croissant',
    name: 'Fresh Butter Croissant',
    price: 4.50,
    description: 'Baked fresh every hour. Elegant, buttery layers of golden flaky wrapper that melt in your mouth, imported from France.',
    category: 'pastry',
    sweetness: 55,
    acidity: 10,
    body: 80,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5v2uGFG2Uj2v0Xzqc-mVzjl2LtrfGlZ_ywz-vInO8Fp9WrbRCFEaXOQumTmdsXYNh0sHwy4cEn6PyAhAzG9itsezrbqNK3nAMXzoFDCNUwps7n88pssE6S-eftsh-sdcj8urndgiekGgPdcbc14DPT5hg3mwKC1AZOwmvW4OiLJ34ITj-GcqSZzdW7kUOjvKWGkiKCDMIXJ0mz6LWoBENlyrt6W5uDS6oOWy8f4lxNq5rJzNR5Ew-jSdJS2wZGgYzO4PCZfC8EGz',
    alt: 'A golden flaky fresh butter croissant resting on a minimalist grey ceramic plate',
    customizable: false
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat Belgia',
    price: 4.75,
    description: 'Crisp hand-rolled puff pastry embracing two parallel premium dark Belgian chocolate bars. Warm and decadent.',
    category: 'pastry',
    sweetness: 80,
    acidity: 12,
    body: 85,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=600',
    alt: 'Pain au chocolat showing beautiful golden crust and soft melting chocolate inside',
    customizable: false
  },
  {
    id: 'avocado-sourdough',
    name: 'Avocado Sourdough Toast',
    price: 8.50,
    description: 'Toasted local wild yeast sourdough topped with creamy crushed Hass avocados, organic cherry tomatoes, and microgreens.',
    category: 'pastry',
    sweetness: 20,
    acidity: 45,
    body: 80,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600',
    alt: 'Avocado toast on freshly sliced artisanal dark crust sourdough bread with flakes of sea salt',
    customizable: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aisha Rahma',
    role: 'Founder & Head Barista',
    comment: 'Coffee is not just a drink to us—it is an art form, a community, and a ritual. We pour our souls into roasting single-origin beans and training our baristas to draw the perfect cup.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  }
];
