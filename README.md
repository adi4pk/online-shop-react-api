# Online Shop — React Starter

Schelet React + TypeScript pentru un client care va consuma API-ul Spring Boot din
[`online-shop-cloud-spring-api`](../../java/spring-security-jwt/online-shop-cloud-spring-api).

> **Scopul tău:** construiești singur pagini, componente, servicii API, state global.
> **Mockup-ul vizual + helpers React** sunt deja gata — le folosești ca punct de plecare.

---

## 🚀 Pornire

```bash
npm install
cp .env.example .env.local
npm run dev
```

| URL | Ce e |
|---|---|
| `http://localhost:3000/` | Aplicația ta React |
| `http://localhost:3000/mockup/pages/index.html` | Mockup-ul HTML — referința vizuală |

Backend-ul Spring trebuie pornit separat (vezi **[Backend](#-backend)** la final).

> 📋 **Plan de implementare detaliat:** [BACKLOG.md](./BACKLOG.md) — 29 user stories
> grupate pe 9 epics, fiecare cu acceptance criteria și tasks bifabile (stil Jira).

---

## 🏛 Arhitectura — viziune de ansamblu

Aplicația e împărțită pe **straturi cu responsabilități clare**. Fluxul de date merge mereu
de jos în sus pentru request și de sus în jos pentru render.

```
┌──────────────────────────────────────────────────────────────────┐
│  PAGES         (rutele aplicației — ce vede utilizatorul)        │
│  • compun componente; orchestrează acțiunile                     │
│  • nu conțin reguli de business sau detalii HTTP                 │
└──────────────────────────────────────────────────────────────────┘
        │ folosesc
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  COMPONENTS    (UI building blocks reutilizabile)                │
│  • ProductCard, CartItem, OrderTimeline, EmptyState, Pagination  │
│  • primesc date prin props, emit acțiuni prin callbacks          │
└──────────────────────────────────────────────────────────────────┘
        │ folosesc
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  STATE GLOBAL  (Context Providers — date cross-cutting)          │
│  • AuthContext   → user + permisiuni + login/logout              │
│  • CartContext   → coșul (persistat în localStorage)             │
│  • Toast/Confirm → notificări + dialog (din lib/)                │
└──────────────────────────────────────────────────────────────────┘
        │ apelează
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  SERVICES      (strat HTTP tipat, per resursă)                   │
│  • authService, productsService, ordersService, ...              │
│  • o funcție = un endpoint; primește/returnează tipuri DTO       │
└──────────────────────────────────────────────────────────────────┘
        │ folosește
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  API CLIENT    (wrapper peste fetch)                             │
│  • atașează automat Authorization: Bearer <token>                │
│  • pe 401 → POST /api/auth/refresh + retry                       │
│  • parsează erorile JSON din GlobalExceptionHandler              │
└──────────────────────────────────────────────────────────────────┘
        │ apel HTTP
        ▼
   Backend Spring Boot — http://localhost:8082
```

**Reguli de aur:**
- Pagini și componente NU apelează niciodată `fetch` direct — întotdeauna prin `services/`.
- Servicii NU știu nimic despre React (sunt funcții pure async).
- Context-urile sunt singurele care stochează state cross-pagină.
- Tipurile DTO sunt sursa adevărului între frontend și backend (oglinda `@DTO` din Spring).

---

## 📁 Structura FINALĂ a proiectului

`✅ = există deja` · `⚙️ = construiești tu`

```
online-shop-react/
├── public/
│   └── mockup/  ✅                            REFERINȚĂ vizuală (HTML/CSS/JS static)
│       ├── index.html                          admin dashboard
│       ├── pages/                              login, products, cart, checkout, ...
│       ├── shared.css                          design system complet
│       ├── shared.js                           toast/confirm/validation (vanilla DOM)
│       └── styles.css                          stiluri pentru admin
│
├── src/
│   ├── main.tsx  ✅                           entry point + import shared.css
│   ├── App.tsx  ⚙️                            rădăcina: <Providers> + <Router> + <Routes>
│   ├── vite-env.d.ts  ✅
│   │
│   ├── styles/  ✅                            CSS importat global
│   │   ├── shared.css                          design system (clase: btn, form-input, ...)
│   │   └── admin.css                           opțional, pentru pagini de admin
│   │
│   ├── lib/  ✅                               UI primitives gata de folosit
│   │   ├── toast.tsx                           ToastProvider + useToast
│   │   ├── confirm.tsx                         ConfirmProvider + useConfirm
│   │   ├── PasswordInput.tsx                   input cu toggle 👁
│   │   ├── PasswordMeter.tsx                   indicator putere parolă
│   │   └── validation.ts                       validateField + useField + validateAll
│   │
│   ├── types/  ⚙️                             SCHEMA: DTOs oglindite pe Spring
│   │   └── api.ts                              toate request/response interfaces
│   │
│   ├── api/  ⚙️                               STRATUL HTTP
│   │   ├── client.ts                           fetch wrapper + JWT injector + 401 handler
│   │   ├── tokenStorage.ts                     access/refresh token în localStorage
│   │   └── services/                           o funcție per endpoint, tipată
│   │       ├── authService.ts                  /api/auth/*
│   │       ├── productsService.ts              /api/products/*
│   │       ├── customersService.ts             /api/customers/*  + /me
│   │       ├── ordersService.ts                /api/orders/*  + /me
│   │       ├── adminsService.ts                /api/admins/*  + /me
│   │       ├── usersService.ts                 /api/users/* + per-user permissions
│   │       └── permissionsService.ts           /api/permissions/*
│   │
│   ├── auth/  ⚙️                              IDENTITATE
│   │   ├── AuthContext.tsx                     Provider: user, login, logout, register
│   │   ├── useAuth.ts                          hook pentru access ergonomic
│   │   └── ProtectedRoute.tsx                  guard de rută; redirect la /login
│   │
│   ├── cart/  ⚙️                              DOMAIN STATE: coșul
│   │   ├── CartContext.tsx                     Provider, persistat în localStorage
│   │   └── useCart.ts                          add/remove/updateQty/clear/total
│   │
│   ├── components/  ⚙️                        UI BUILDING BLOCKS reutilizabile
│   │   ├── layout/                             schelet vizual cross-pagină
│   │   │   ├── Navbar.tsx                      branding + linkuri + cart badge + user
│   │   │   ├── Footer.tsx
│   │   │   ├── MockupBar.tsx                   bara galbenă de dev (link spre mockup)
│   │   │   └── AccountSidebar.tsx              navigația din /account/*
│   │   ├── product/                            domeniul „produs"
│   │   │   ├── ProductCard.tsx                 card pentru grid
│   │   │   ├── ProductGrid.tsx                 wrapper grid + paginare
│   │   │   ├── StockBadge.tsx                  badge color-coded după stoc
│   │   │   └── QuantitySelector.tsx            controlul – / input / +
│   │   ├── cart/                               domeniul „coș"
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx                 subtotal, TVA, total + CTA
│   │   │   ├── ShippingBar.tsx                 mesaj livrare gratuită
│   │   │   └── CartBadge.tsx                   bula cu numărul (citește useCart)
│   │   ├── order/                              domeniul „comandă"
│   │   │   ├── OrderRow.tsx
│   │   │   ├── OrderTimeline.tsx               4 stări (Plasată → Livrată)
│   │   │   └── StatusBadge.tsx
│   │   ├── checkout/
│   │   │   └── Stepper.tsx                     1 → 2 → 3
│   │   └── ui/                                 generice
│   │       ├── EmptyState.tsx
│   │       ├── Pagination.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorMessage.tsx
│   │
│   ├── pages/  ⚙️                             ROUTES — un fișier per rută
│   │   ├── HomePage.tsx                        redirect la /products
│   │   ├── LoginPage.tsx                       /login
│   │   ├── RegisterPage.tsx                    /register
│   │   ├── ProductsPage.tsx                    /products
│   │   ├── ProductDetailPage.tsx               /products/:id
│   │   ├── CartPage.tsx                        /cart
│   │   ├── CheckoutPage.tsx                    /checkout
│   │   ├── ConfirmationPage.tsx                /confirmation/:orderId
│   │   ├── account/
│   │   │   ├── AccountOrdersPage.tsx           /account/orders
│   │   │   ├── AccountProfilePage.tsx          /account/profile
│   │   │   └── AccountAddressesPage.tsx        /account/addresses
│   │   └── NotFoundPage.tsx                    /*
│   │
│   └── routes/  ⚙️
│       └── AppRoutes.tsx                       toate rutele + ProtectedRoute pentru /account/*
│
├── index.html  ✅                             entry HTML pentru Vite
├── package.json  ✅
├── tsconfig.json  ✅
├── vite.config.ts  ✅                          alias @/* → src/*
├── .env.example  ✅                            VITE_API_BASE_URL
├── .gitignore  ✅
└── README.md  ✅
```

---

## 🧩 Responsabilitățile fiecărui modul

### `types/api.ts` — Schema
**Singura sursă de adevăr** pentru forma datelor între frontend și backend. Fiecare DTO din
Spring (`*.dto.*`) are aici interfața TypeScript echivalentă. Schimbi DTO-ul în backend?
Schimbi tipul aici. Restul codului tipat se va ajusta automat (sau va arăta erori de
compilare — exact ce vrei).

### `api/client.ts` — Wrapper HTTP
Singurul loc care apelează `fetch`. Responsabilități:
- Compune URL-ul absolut (`baseURL` din env)
- Atașează `Authorization: Bearer <token>` automat când există
- Pe `401` (cu excepția apelurilor către `/api/auth/*`) încearcă refresh, apoi retry
- Aruncă eroare structurată cu mesajul din `GlobalExceptionHandler`

### `api/services/*.ts` — Servicii per resursă
Câte un fișier per controller din backend. Fiecare exportă un obiect cu funcții, una per
endpoint. **Tipate complet** (input + output). Nu știu nimic despre React — pot fi testate
izolat sau folosite din orice parte a aplicației.

### `auth/AuthContext.tsx` — Identitate
Stochează:
- `user` (email, permisiuni) — `null` când nu e autentificat
- Token-urile (în `localStorage` via `tokenStorage`)
- Acțiunile: `login`, `logout`, `register`, `hasPermission(name)`

E expus prin `useAuth()`. Citit de Navbar (afișează numele), de ProtectedRoute (decide
redirect-ul) și de orice pagină care are nevoie de userul curent.

### `cart/CartContext.tsx` — Domain state pentru coș
Listă de itemi (`{ productId, name, price, quantity }`), persistată în `localStorage` ca
să supraviețuiască refresh-ului. Expus prin `useCart()`. Citit de CartBadge (numărul),
CartPage (lista), CheckoutPage (la plasarea comenzii).

### `lib/*` — UI primitives
Componente/hook-uri reutilizabile **fără logică de business**. Toast, Confirm, PasswordInput,
PasswordMeter, validation. Folosesc clasele CSS din `shared.css` — au exact același look ca
mockup-ul. Pot fi mutate în orice alt proiect ca atare.

### `components/*` — UI building blocks
Componente specifice acestui domeniu (produse, coș, comenzi). Primesc datele prin props,
emit acțiuni prin callbacks. **Nu apelează API direct** — primesc tot ce le trebuie de sus.

### `pages/*` — Route screens
Un component per rută. Aici se face „treaba reală":
- Fetch (prin services) la mount cu `useEffect`
- Compun componente
- Conectează acțiunile UI la `useAuth`, `useCart`, `useToast`, `useConfirm`
- Nu conțin layout-uri complexe — folosesc components/

### `routes/AppRoutes.tsx` — Tabela de rute
Configurarea `<Routes>`. Declară maparea path → page și aplică `ProtectedRoute` pe rutele
care necesită autentificare (`/account/*`, `/checkout`, `/confirmation/*`).

---

## 🔁 Flow-uri principale

### Autentificare (login → JWT → fetch protejat)

```
LoginPage                AuthContext             authService              Backend
   │                          │                       │                       │
   │ submit(email, pass)      │                       │                       │
   ├─────────────────────────►│                       │                       │
   │                          │ login(email, pass)    │                       │
   │                          ├──────────────────────►│                       │
   │                          │                       │ POST /api/auth/login  │
   │                          │                       ├──────────────────────►│
   │                          │                       │ AuthResponse          │
   │                          │                       │◄──────────────────────┤
   │                          │ { tokens, user }      │                       │
   │                          │◄──────────────────────┤                       │
   │                          │                                               │
   │   tokenStorage.set(...)  │                                               │
   │   setUser(...)           │                                               │
   │                          │                                               │
   │     navigate("/products")│                                               │
   │◄─────────────────────────┤                                               │
```

Apelurile ulterioare către endpoint-uri protejate iau token-ul din `tokenStorage` prin
interceptor-ul din `apiClient` — paginile nu trebuie să-și facă griji cu asta.

### Refresh automat la token expirat

```
fetch /api/products      apiClient.ts                tokenStorage          Backend
   │                          │                            │                  │
   ├─────────────────────────►│                            │                  │
   │                          │ get accessToken            │                  │
   │                          ├───────────────────────────►│                  │
   │                          │ ◄──────────────────────────┤                  │
   │                          │ fetch /api/products        │                  │
   │                          ├──────────────────────────────────────────────►│
   │                          │ 401 Unauthorized                              │
   │                          │◄──────────────────────────────────────────────┤
   │                          │                                               │
   │                          │ POST /api/auth/refresh                        │
   │                          ├──────────────────────────────────────────────►│
   │                          │ AuthResponse                                  │
   │                          │◄──────────────────────────────────────────────┤
   │                          │ tokenStorage.set(new tokens)                  │
   │                          │                                               │
   │                          │ retry: fetch /api/products                    │
   │                          ├──────────────────────────────────────────────►│
   │                          │ 200 OK                                        │
   │ rezultat                 │◄──────────────────────────────────────────────┤
   │◄─────────────────────────┤
```

### Adaugă în coș (UI → state global → persist)

```
ProductDetailPage         CartContext             localStorage
   │                          │                       │
   │ addToCart(product, 2)    │                       │
   ├─────────────────────────►│                       │
   │                          │ items = [...]         │
   │                          │ setItems(items)       │
   │                          │                       │
   │                          ├──────────────────────►│  (useEffect persistă)
   │                          │                       │
   │ toast.show("Adăugat")    │                       │
```

`CartBadge` citește `useCart()` și se re-randează automat — nu trebuie să-l notifici.

### Plasează comandă

```
CheckoutPage          ordersService.createForMe     Backend     CartContext
     │                         │                       │              │
     │ submit(addr, plata)     │                       │              │
     ├────────────────────────►│                       │              │
     │                         │ POST /api/orders/me   │              │
     │                         ├──────────────────────►│              │
     │                         │ OrdersResponse        │              │
     │                         │◄──────────────────────┤              │
     │ navigate(`/confirmation/${id}`)                 │              │
     │ cart.clear()            │                       │              │
     ├──────────────────────────────────────────────────────────────►│
```

---

## 🎨 Pattern-uri arhitecturale folosite

### Context Provider pattern
Toast, Confirm, Auth, Cart — toate sunt Provider-uri stratificate la rădăcina aplicației.
Avantaj: orice component, oricât de adânc, are acces fără prop drilling.

### Service layer (Repository pattern)
HTTP-ul e izolat în `api/services/*`. Componentele nu știu cum arată request-urile, doar
că `productsService.list()` returnează `ProductsListResponse`. Simplifică testarea și
permite schimbarea protocolului (ex: GraphQL) fără să atingi UI-ul.

### Promise-style modal (`useConfirm()`)
Modalele de confirmare devin `await confirm(...)` — codul citește liniar, fără callbacks,
fără state local pentru "isModalOpen". Vezi `lib/confirm.tsx`.

### Custom hooks pentru logică reutilizabilă
`useAuth`, `useCart`, `useToast`, `useConfirm`, `useField`. Logica e în hook, UI-ul doar
o consumă. Hook-ul poate fi testat izolat.

### Container/Presentation
Paginile (containers) știu cum să obțină datele. Componentele (presentation) doar afișează
ce primesc. Asta menține componentele reutilizabile între pagini.

### Co-locarea după domeniu
`components/product/`, `components/cart/`, `components/order/` — fiecare folder grupează
componentele care lucrează pe același „domeniu" de date. E mai ușor să te orientezi când
proiectul crește.

---

## 📋 Plan de implementare

Totul e structurat în [BACKLOG.md](./BACKLOG.md) — 29 user stories grupate pe **9 epics**:

| Epic | Subiect | Story-uri |
|---|---|---|
| 1 | Project Setup & Foundations | 2 |
| 2 | Layout & Navigation | 1 |
| 3 | API & Type Layer | 3 |
| 4 | Authentication | 4 |
| 5 | Product Catalog | 3 |
| 6 | Shopping Cart | 4 |
| 7 | Checkout & Orders | 3 |
| 8 | Account Self-Service | 4 |
| 9 | Polish & UX | 5 |

Fiecare story are **acceptance criteria** (definition of done) + **tasks** bifabile —
exact ca un sprint în Jira.

**Regula:** termină un epic înainte să treci la următorul. Fiecare construiește pe cel
anterior.

---

## 🔑 Conturi de test (din DataSeeder-ul backend-ului)

| Tip | Email | Parolă | Permisiuni |
|---|---|---|---|
| Admin | `admin@shop.com` | `admin1234` | Toate (10) |
| Customer | `customer@shop.com` | `customer1234` | `PRODUCT_READ`, `ORDER_*` |

---

## 🌐 Endpoint-uri API (cele mai folosite)

| Method | Path | Auth | Ce face |
|---|---|---|---|
| POST | `/api/auth/register` | public | Creează cont customer |
| POST | `/api/auth/login` | public | Returnează `accessToken` + `refreshToken` |
| POST | `/api/auth/refresh` | public | Token nou din refresh |
| GET | `/api/products` | `PRODUCT_READ` | Listă produse paginate |
| GET | `/api/products/{id}` | `PRODUCT_READ` | Detaliu produs |
| GET | `/api/customers/me` | autentificat | Profil propriu |
| PUT | `/api/customers/me` | autentificat | Update profil propriu |
| GET | `/api/orders/me` | `ORDER_READ` | Comenzile mele |
| POST | `/api/orders/me` | `ORDER_WRITE` | Creează comandă pentru mine |
| GET | `/api/orders/{id}` | admin sau owner | Detaliu comandă |

Documentație completă: `http://localhost:8082/swagger-ui.html` (când rulează backend-ul).

---

## 🐳 Backend

**Local cu Maven:**
```bash
cd ../../java/spring-security-jwt/online-shop-cloud-spring-api
./mvnw spring-boot:run
# API la http://localhost:8082
```

**Sau cu Docker Compose:**
```bash
cd ../../docker-files
docker compose -f docker-compose-services.yml up -d online-shop-api mysql
# API la http://localhost:8083
```

Dacă schimbi portul backend-ului, actualizează `VITE_API_BASE_URL` în `.env.local`.

---

## 💡 Sugestii pentru librării (opționale)

- **State management:** `zustand` (mai simplu decât Context manual când state-ul crește)
- **Forms complexe:** `react-hook-form` + `zod` (înlocuiește `useField` la forms mari)
- **Data fetching:** `@tanstack/react-query` (cache + refetch + stale-while-revalidate)
- **UI:** mockup-ul folosește pure CSS — îl poți păstra sau înlocui cu Tailwind / MUI / etc.

Toate sunt opționale. Începe simplu cu Context + fetch direct și adaugă ce ai nevoie pe parcurs.

---

**Mult succes!** 🚀 Începe cu Etapa 1 și avansează strat cu strat.
