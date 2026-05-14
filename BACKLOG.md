# Online Shop React — Backlog

Backlog-ul de implementare, structurat ca în Jira: **Epic → Story → Task**.

Fiecare story are criterii de acceptare (Definition of Done). Bifează `[x]` pe măsură ce
termini, ca să-ți urmărești progresul.

> 💡 Toate story-urile sunt scrise din perspectiva utilizatorului final
> (customer / admin / dev) cu formatul: **„Ca _rol_, vreau _funcționalitate_,
> ca să _beneficiu_."**

---

## 📊 Sumar

| Epic | Story-uri | Status |
|------|-----------|--------|
| 1. Project Setup & Foundations | 2 | ✅ |
| 2. Layout & Navigation | 1 | ⚠️ parțial |
| 3. API & Type Layer | 3 | ✅ |
| 4. Authentication | 4 | ☐ |
| 5. Product Catalog | 3 | ☐ |
| 6. Shopping Cart | 4 | ☐ |
| 7. Checkout & Orders | 3 | ☐ |
| 8. Account Self-Service | 4 | ☐ |
| 9. Polish & UX | 5 | ☐ |
| **Total** | **29 story-uri** | |

---

## 🎯 EPIC 1 — Project Setup & Foundations

> Configurare proiect și schelet inițial. Zero cod de business.

---

### US-101 — Mediul de dezvoltare funcționează ✅

**Ca dev, vreau un mediu de dezvoltare configurat, ca să pot începe să codez fără friction.**

**Acceptance criteria:**
- [x] Dependențele sunt instalate fără erori (`npm install`)
- [x] `.env.local` există și conține `VITE_API_BASE_URL`
- [x] `npm run dev` pornește serverul Vite la `http://localhost:3000`
- [x] Pagina placeholder din `App.tsx` se vede în browser
- [x] Mockup-ul e accesibil la `/mockup/pages/index.html`
- [x] Backend-ul Spring rulează la `http://localhost:8082` și răspunde la `/swagger-ui.html`

**Tasks:**
- [x] T-101.1: Rulează `npm install`
- [x] T-101.2: Copiază `.env.example` în `.env.local`
- [x] T-101.3: Pornește `npm run dev` și verifică pagina
- [x] T-101.4: Pornește backend-ul Spring (Maven sau Docker)
- [x] T-101.5: Citește mockup-ul end-to-end ca să înțelegi flow-urile

---

### US-102 — Routing minimal funcțional ✅

**Ca dev, vreau toate rutele aplicației definite, ca să pot naviga între pagini chiar dacă sunt goale.**

**Acceptance criteria:**
- [x] `App.tsx` conține `<BrowserRouter>` și `<Routes>`
- [x] Există câte un placeholder pentru fiecare rută din mockup
- [x] Navigarea în URL bar duce la pagina corectă (ex: `/login`, `/products/123`)
- [x] Ruta `*` afișează un component pentru 404
- [x] Folosesc `<Link>` în loc de `<a href>` pentru navigare internă (`<NavLink>` rămâne ca enhancement)

**Tasks:**
- [x] T-102.1: Creează `src/routes/AppRoutes.tsx` cu toate rutele
- [x] T-102.2: Creează placeholder-uri în `src/pages/` (Login, Register, Products, ProductDetail, Cart, Checkout, Confirmation, AccountOrders, AccountProfile, AccountAddresses, NotFound)
- [x] T-102.3: Mută `<BrowserRouter>` + `<AppRoutes>` în `App.tsx`
- [x] T-102.4: Wrap App-ul cu `<ToastProvider>` și `<ConfirmProvider>` din `src/lib/`
- [x] T-102.5: Verifică că toate rutele se schimbă corect

---

## 🎨 EPIC 2 — Layout & Navigation

> Componente de layout reutilizabile. Doar UI, fără logică.

---

### US-201 — Layout consistent pe toate paginile ⚠️ parțial

**Ca utilizator, vreau să văd un navbar și un footer pe fiecare pagină, ca să mă pot orienta.**

**Acceptance criteria:**
- [x] Navbar afișează brand-ul, link-uri (Produse, Coș, Comenzile mele) și user menu
- [x] Cart badge afișează numărul de produse din coș (placeholder pentru moment)
- [x] Footer simplu cu link-uri legale
- [x] Sidebar pentru pagini de cont (`/account/*`) cu navigație între Comenzi/Profil/Adrese
- [x] Layout central cu `<Outlet />` pentru rutele cu chrome
- [ ] MockupBar (bara galbenă de dev) prezentă pe toate paginile cu link spre mockup
- [ ] Pagini de auth (`/login`, `/register`) au un Navbar simplificat (fără cart)
- [ ] `<NavLink>` pe linkurile din Navbar pentru a marca pagina activă

**Tasks:**
- [x] T-201.1: Creează `components/layout/Navbar.tsx`
- [x] T-201.2: Creează `components/layout/Footer.tsx`
- [x] T-201.3: Creează `components/layout/AccountSidebar.tsx`
- [x] T-201.4: Creează `components/layout/Layout.tsx` cu `<Outlet />`
- [ ] T-201.5: Creează `components/layout/MockupBar.tsx`
- [ ] T-201.6: Creează `components/layout/AuthNavbar.tsx` + `AuthLayout.tsx` pentru `/login` și `/register`
- [ ] T-201.7: Schimbă `<Link>` cu `<NavLink>` în Navbar și folosește `isActive`
- [ ] T-201.8: Verifică responsive (mobile menu — hamburger)

---

## 🔌 EPIC 3 — API & Type Layer ✅

> Schema datelor + stratul HTTP. Pregătirea pentru auth.
>
> **Decizie de stil:** funcții nominale exportate (`listProducts`, `getProduct`),
> nu obiecte cu metode. Un fișier per resursă în `src/api/`.

---

### US-301 — DTO-urile sunt definite în TypeScript ✅

**Ca dev, vreau toate DTO-urile backend-ului oglindite în TypeScript, ca să am type safety pe toată aplicația.**

**Acceptance criteria:**
- [x] Fișierul `src/types/api.ts` există
- [x] Toate request DTOs sunt definite: `LoginRequest`, `RegisterRequest`, `RefreshRequest`, `ProductsDto`, `CustomerDto`, `OrdersDto`, `OrderDetailsDto`, `CreateAdminRequest`, `UpdateAdminRequest`, `CreatePermissionRequest`, `AssignPermissionRequest`
- [x] Toate response DTOs sunt definite: `AuthResponse`, `ProductsResponse`, `ProductsListResponse`, `CustomerResponse`, `CustomerListResponse`, `OrdersResponse`, `OrdersListResponse`, `OrderDetailsResponse`, `AdminResponse`, `UserResponse`, `PermissionResponse`
- [x] Tipul `ApiError` reflectă forma erorii din `GlobalExceptionHandler`
- [x] UUID-urile sunt tipate ca `string`, datele ISO ca `string`

**Tasks:**
- [x] T-301.1: Citește DTO-urile din `src/main/java/mycode/onlineshopspring/**/dto/*.java`
- [x] T-301.2: Definește interfețele de auth (`LoginRequest`, `RegisterRequest`, `AuthResponse`)
- [x] T-301.3: Definește interfețele pentru produse
- [x] T-301.4: Definește interfețele pentru clienți
- [x] T-301.5: Definește interfețele pentru comenzi + order details
- [x] T-301.6: Definește interfețele pentru admin/users/permissions
- [x] T-301.7: Definește `ApiError` și constanta `PERMISSIONS` (string union)

---

### US-302 — Wrapper HTTP cu autentificare automată ✅

**Ca dev, vreau un singur loc care gestionează fetch-ul și token-ul JWT, ca să nu repet cod.**

**Acceptance criteria:**
- [x] `src/api/tokenStorage.ts` expune `getAccessToken`, `getRefreshToken`, `saveTokens`, `clearTokens`
- [x] `src/api/client.ts` exportă o funcție generică `apiFetch<T>(path, options)`
- [x] Cererile au automat header-ul `Authorization: Bearer <token>` când există token
- [x] Pe `401`, dacă nu e cerere către `/api/auth/*`, încearcă `POST /api/auth/refresh`
- [x] La refresh reușit, salvează noile token-uri și retry-uiește cererea
- [x] La refresh eșuat, șterge token-urile (utilizatorul va fi delogat la următoarea cerere)
- [x] Erorile non-2xx aruncă `Error` cu mesajul din response body

**Tasks:**
- [x] T-302.1: Creează `src/api/tokenStorage.ts` cu funcții (nu obiect cu metode)
- [x] T-302.2: Creează `src/api/client.ts` cu `apiFetch<T>(path, options)`
- [x] T-302.3: Atașează automat header-ul Authorization
- [x] T-302.4: Logica de refresh pe 401 (cu protecție anti-loop pe `/api/auth/*`)
- [x] T-302.5: Parsare structurată a erorilor

---

### US-303 — Funcții tipate per resursă ✅

**Ca dev, vreau o funcție per endpoint în loc să apelez fetch ad-hoc, ca să am autocomplete și type safety.**

**Acceptance criteria:**
- [x] Există un fișier per resursă în `src/api/`
- [x] `auth.ts` — `login`, `register`
- [x] `products.ts` — `listProducts`, `getProduct`, `createProduct`, `updateProduct`, `deleteProduct`
- [x] `customers.ts` — `listCustomers`, `getMyCustomer`, `updateMyCustomer`, `getCustomer`, `updateCustomer`, `deleteCustomer`
- [x] `orders.ts` — `listAllOrders`, `listMyOrders`, `getOrder`, `createMyOrder`, `updateOrderStatus`, `deleteOrder`
- [x] `admins.ts` — `listAdmins`, `getMyAdmin`, `updateMyAdmin`, `getAdmin`, `createAdmin`, `updateAdmin`, `deleteAdmin`
- [x] `users.ts` — `listUsers`, `getUser`, `listUserPermissions`, `assignPermissionToUser`, `revokePermissionFromUser`
- [x] `permissions.ts` — `listPermissions`, `createPermission`, `deletePermission`
- [x] Fiecare funcție are return type explicit (`: Promise<X>`)

**Tasks:**
- [x] T-303.1: `auth.ts` (cel mai mic, începi cu el)
- [x] T-303.2: `products.ts`
- [x] T-303.3: `customers.ts`
- [x] T-303.4: `orders.ts`
- [x] T-303.5: `admins.ts`, `users.ts`, `permissions.ts`

---

## 🔐 EPIC 4 — Authentication

> Login, register, persistență, rute protejate.

---

### US-401 — Customer poate să-și creeze cont

**Ca vizitator, vreau să-mi creez un cont, ca să pot plasa comenzi.**

**Acceptance criteria:**
- [ ] Pagina `/register` afișează un formular cu toate câmpurile din `RegisterRequest`
- [ ] Validarea pe blur folosind `useField` din `lib/validation`
- [ ] `PasswordInput` cu toggle 👁 și `PasswordMeter` sub câmpul parolă
- [ ] Verificare „parolele coincid" înainte de submit
- [ ] Checkbox-ul de termeni e obligatoriu
- [ ] La submit reușit, salvează token-urile cu `saveTokens()` și navighează la `/products`
- [ ] La eroare (de ex. email duplicat 409), afișează toast cu mesajul
- [ ] Buton-ul are state de loading în timpul cererii

**Tasks:**
- [ ] T-401.1: Construiește `RegisterPage.tsx` cu layout-ul mockup-ului
- [ ] T-401.2: Definește field-urile cu `useField`
- [ ] T-401.3: Folosește `PasswordInput` + `PasswordMeter`
- [ ] T-401.4: Conectează submit la `register()` din `@/api/auth`
- [ ] T-401.5: Tratează erorile cu `useToast`
- [ ] T-401.6: Salvează token-urile cu `saveTokens()` din `@/api/tokenStorage` și redirect

---

### US-402 — Customer/Admin poate să se autentifice

**Ca utilizator, vreau să mă autentific, ca să accesez funcționalitățile contului.**

**Acceptance criteria:**
- [ ] Pagina `/login` afișează formular cu email + parolă
- [ ] Validare pe blur (email format, parolă obligatorie)
- [ ] `PasswordInput` cu toggle
- [ ] La submit reușit, salvează token-urile cu `saveTokens()` și navighează la `/products`
- [ ] La credențiale invalide (401), afișează toast cu „Email sau parolă invalide"
- [ ] Loading state pe buton în timpul cererii
- [ ] Link „Creează cont" duce la `/register`

**Tasks:**
- [ ] T-402.1: Construiește `LoginPage.tsx`
- [ ] T-402.2: Validare cu `useField`
- [ ] T-402.3: Conectează submit la `login()` din `@/api/auth`
- [ ] T-402.4: Salvează token-urile cu `saveTokens()` + navigate
- [ ] T-402.5: Tratează erorile

---

### US-403 — Sesiunea persistă peste refresh

**Ca utilizator autentificat, vreau să rămân autentificat după refresh, ca să nu trebuiască să mă re-loghez de fiecare dată.**

**Acceptance criteria:**
- [ ] `AuthContext` expune `user`, `login`, `logout`, `register`, `hasPermission` (funcții, nu metode)
- [ ] La mount, `AuthContext` hidratează state-ul folosind `getAccessToken()` și decodează JWT-ul
- [ ] `useAuth()` poate fi folosit din orice component
- [ ] Navbar afișează emailul user-ului când e logat
- [ ] Logout șterge token-urile (`clearTokens()`) și redirectează la `/login`

**Tasks:**
- [ ] T-403.1: Creează `src/auth/AuthContext.tsx` cu Provider
- [ ] T-403.2: Creează `src/auth/useAuth.ts`
- [ ] T-403.3: Hidratare la mount din `getAccessToken()`
- [ ] T-403.4: Wrap App-ul cu `<AuthProvider>` în `main.tsx`
- [ ] T-403.5: Update Navbar să folosească `useAuth`
- [ ] T-403.6: Implementează logout cu confirm dialog

---

### US-404 — Rutele protejate redirectează la login

**Ca aplicație, vreau să blochez accesul la `/account/*`, `/checkout` și `/confirmation/*` pentru vizitatori, ca să protejez datele utilizatorilor.**

**Acceptance criteria:**
- [ ] `<ProtectedRoute>` wrappuiește un component-copil
- [ ] Dacă nu există user în `AuthContext`, redirectează la `/login`
- [ ] După login, utilizatorul e dus la pagina pe care încerca să o acceseze (return URL)
- [ ] Toate rutele `/account/*`, `/checkout`, `/confirmation/*` sunt protejate

**Tasks:**
- [ ] T-404.1: Creează `src/auth/ProtectedRoute.tsx`
- [ ] T-404.2: Folosește `<Navigate>` cu `state` pentru return URL
- [ ] T-404.3: În LoginPage, citește `state.from` și redirectează acolo după login
- [ ] T-404.4: Aplică `<ProtectedRoute>` pe rutele protejate în `AppRoutes`

---

## 🛍 EPIC 5 — Product Catalog

> Browse, search, detalii produs.

---

### US-501 — Customer poate să răsfoiască catalogul

**Ca customer, vreau să văd o listă de produse, ca să pot alege ce să cumpăr.**

**Acceptance criteria:**
- [ ] Pagina `/products` apelează `listProducts()` din `@/api/products` la mount
- [ ] Afișează un grid cu `ProductCard` pentru fiecare produs
- [ ] Loading state cât timp se încarcă
- [ ] Empty state dacă lista e goală
- [ ] Error state dacă fetch-ul eșuează
- [ ] Paginare la finalul listei (page și size)

**Tasks:**
- [ ] T-501.1: Construiește `ProductCard` (component reutilizabil)
- [ ] T-501.2: Construiește `StockBadge` (in/low/out)
- [ ] T-501.3: Construiește `ProductGrid` (wrapper cu paginare)
- [ ] T-501.4: Construiește `ProductsPage` cu fetch din `listProducts()`
- [ ] T-501.5: Adaugă loading + empty + error states
- [ ] T-501.6: Construiește `Pagination` reutilizabil

---

### US-502 — Customer poate să caute / filtreze produse

**Ca customer, vreau să caut un produs după nume sau să filtrez după categorie, ca să găsesc rapid ce vreau.**

**Acceptance criteria:**
- [ ] Search input filtrează lista pe măsură ce tipezi (debounced)
- [ ] Dropdown de categorie aplică filtru
- [ ] Dropdown de sortare schimbă ordinea
- [ ] Filtrele sunt sincronizate cu query params din URL (refresh păstrează filtrul)
- [ ] „Niciun produs găsit" se afișează când rezultatele sunt 0
- [ ] Buton „Șterge filtrele" resetează tot

**Tasks:**
- [ ] T-502.1: Adaugă state pentru search/category/sort cu `useState`
- [ ] T-502.2: Sincronizează cu query params (`useSearchParams`)
- [ ] T-502.3: Debounce pe search (~300ms)
- [ ] T-502.4: No-results empty state
- [ ] T-502.5: Buton clear filters

---

### US-503 — Customer poate să vadă detaliile unui produs

**Ca customer, vreau să văd descriere completă, specs și imagine, ca să decid dacă cumpăr.**

**Acceptance criteria:**
- [ ] Pagina `/products/:id` apelează `getProduct(id)` din `@/api/products`
- [ ] Afișează nume, preț, SKU, descriere, specs, badge stoc
- [ ] `QuantitySelector` cu + / − / input numeric
- [ ] Validare cantitate ≤ stoc disponibil (toast warning dacă depășește)
- [ ] Buton „Adaugă în coș" funcționează (vezi US-601)
- [ ] Pe ID inexistent (404), afișează NotFoundPage

**Tasks:**
- [ ] T-503.1: Construiește `QuantitySelector`
- [ ] T-503.2: Construiește `ProductDetailPage` cu fetch din `getProduct(id)`
- [ ] T-503.3: Validare cantitate vs stoc
- [ ] T-503.4: Tratare 404

---

## 🛒 EPIC 6 — Shopping Cart

> Adăugare, cantități, ștergere, persistență.

---

### US-601 — Customer poate să adauge produse în coș

**Ca customer, vreau să adaug un produs în coș, ca să-l pot cumpăra mai târziu.**

**Acceptance criteria:**
- [ ] `CartContext` expune `items`, `addItem`, `total` (funcții, nu metode)
- [ ] Adăugarea unui produs deja în coș crește cantitatea (nu duplică)
- [ ] Toast „Adăugat în coș" cu numele produsului și cantitatea
- [ ] CartBadge din Navbar se actualizează automat
- [ ] Pe ProductDetailPage, butonul „Adaugă în coș" trimite cu cantitatea selectată

**Tasks:**
- [ ] T-601.1: Creează `src/cart/CartContext.tsx`
- [ ] T-601.2: Creează `src/cart/useCart.ts`
- [ ] T-601.3: Wrap App-ul cu `<CartProvider>` în `main.tsx`
- [ ] T-601.4: Actualizează `CartBadge` să folosească `useCart`
- [ ] T-601.5: Conectează butonul „Adaugă în coș" pe ProductDetailPage cu toast

---

### US-602 — Customer poate să modifice cantități / șterge produse

**Ca customer, vreau să schimb cantitățile sau să elimin produse din coș, ca să-mi controlez comanda.**

**Acceptance criteria:**
- [ ] `CartPage` afișează lista de produse cu nume, preț, cantitate, total
- [ ] Butoanele +/− modifică cantitatea (min 1)
- [ ] Buton ✕ pe fiecare item
- [ ] Click pe ✕ deschide `useConfirm()` cu „Șterge X din coș?"
- [ ] La confirm, item-ul dispare cu animație (opțional)
- [ ] Toast „Produs șters" după ștergere

**Tasks:**
- [ ] T-602.1: Construiește `CartItem` component
- [ ] T-602.2: Conectează +/− la `updateQuantity` din `useCart`
- [ ] T-602.3: Conectează ✕ la `removeItem` cu confirm dialog
- [ ] T-602.4: Construiește `CartPage` cu lista din `useCart`

---

### US-603 — Customer vede sumarul comenzii (subtotal, TVA, total)

**Ca customer, vreau să văd cât voi plăti, ca să decid dacă continui.**

**Acceptance criteria:**
- [ ] `CartSummary` calculează subtotal din `items`
- [ ] TVA 19% calculat și afișat separat
- [ ] Livrare gratuită afișată cu mesaj „Gratuită"
- [ ] Total = subtotal + TVA
- [ ] `ShippingBar` afișează „Mai ai X RON până la livrare gratuită" dacă subtotal < prag
- [ ] Buton „Finalizează comanda" duce la `/checkout`

**Tasks:**
- [ ] T-603.1: Construiește `CartSummary`
- [ ] T-603.2: Construiește `ShippingBar` cu logică de prag
- [ ] T-603.3: Adaugă în `CartPage`

---

### US-604 — Coșul persistă între sesiuni

**Ca customer, vreau ca coșul meu să nu se piardă la refresh, ca să nu trebuiască să-l reconstruiesc.**

**Acceptance criteria:**
- [ ] `CartContext` salvează `items` în `localStorage` la fiecare modificare
- [ ] La mount, `items` se hidratează din `localStorage`
- [ ] Empty state pe `CartPage` când coșul e gol (cu CTA spre `/products`)

**Tasks:**
- [ ] T-604.1: Hidratare din localStorage în Provider
- [ ] T-604.2: `useEffect` care salvează la fiecare schimbare
- [ ] T-604.3: Empty state pe CartPage

---

## 💳 EPIC 7 — Checkout & Orders

> De la coș la comandă plasată.

---

### US-701 — Customer poate să completeze datele de checkout

**Ca customer, vreau să completez adresa și plata, ca să plasez comanda.**

**Acceptance criteria:**
- [ ] Pagina `/checkout` afișează formularul cu 3 secțiuni: Contact, Adresă, Plată
- [ ] Stepper la top: 1 ✓ Coș → 2 (active) Livrare & plată → 3 Confirmare
- [ ] Datele user-ului sunt pre-completate din `getMyCustomer()` din `@/api/customers`
- [ ] Validare pe blur (folosind `useField`)
- [ ] Card fields cu input mask (4-4-4-4 pentru număr, MM/YY pentru expirare)
- [ ] Câmpurile de card sunt vizibile doar când metoda de plată = card
- [ ] Buton „Plasează comanda" e dezactivat până ce toate câmpurile sunt valide

**Tasks:**
- [ ] T-701.1: Construiește `Stepper` component
- [ ] T-701.2: Construiește `CheckoutPage` cu cele 3 secțiuni
- [ ] T-701.3: Pre-completează din `getMyCustomer()`
- [ ] T-701.4: Implementează input masks pentru card
- [ ] T-701.5: Toggle câmpuri card vs alte metode

---

### US-702 — Customer plasează comanda

**Ca customer, vreau să trimit comanda către server, ca să fie procesată.**

**Acceptance criteria:**
- [ ] La submit, `createMyOrder()` din `@/api/orders` cu items din coș
- [ ] Loading state pe buton
- [ ] La succes, navigate la `/confirmation/:id` cu ID-ul comenzii returnat
- [ ] Coșul se golește (`cart.clear()` din `useCart`)
- [ ] La eroare, toast cu mesaj + buton-ul redevine activ
- [ ] Eroare 4xx → mesaj specific; 5xx → „Ceva nu a mers, încearcă din nou"

**Tasks:**
- [ ] T-702.1: Conectează submit la `createMyOrder()`
- [ ] T-702.2: Loading state + golire coș
- [ ] T-702.3: Navigate la confirmation cu id-ul real
- [ ] T-702.4: Tratează erorile

---

### US-703 — Customer vede confirmarea comenzii

**Ca customer, vreau să văd că comanda mea a fost plasată, cu un rezumat, ca să am liniștea că totul e în regulă.**

**Acceptance criteria:**
- [ ] Pagina `/confirmation/:orderId` apelează `getOrder(orderId)` din `@/api/orders`
- [ ] Afișează „Comandă plasată cu succes" + iconul ✓
- [ ] OrderTimeline cu starea curentă (Plasată / Pregătire / Expediată / Livrată)
- [ ] Sumar: data, status, adresă livrare, metodă plată, total
- [ ] Butoane: „Vezi comenzile mele" și „Continuă cumpărăturile"
- [ ] Toast de bun venit la prima vizită

**Tasks:**
- [ ] T-703.1: Construiește `OrderTimeline` component
- [ ] T-703.2: Construiește `ConfirmationPage` cu fetch din `getOrder()`
- [ ] T-703.3: Construiește `StatusBadge` reutilizabil

---

## 👤 EPIC 8 — Account Self-Service

> Customer-ul își gestionează contul.

---

### US-801 — Customer își vede istoricul de comenzi

**Ca customer, vreau să văd toate comenzile mele anterioare, ca să le pot consulta.**

**Acceptance criteria:**
- [ ] Pagina `/account/orders` apelează `listMyOrders()` din `@/api/orders`
- [ ] Afișează tabel cu OrderRow pentru fiecare comandă
- [ ] Filtru de status (dropdown)
- [ ] Empty state „Nu ai comenzi încă" cu CTA spre `/products`
- [ ] No-match state când filtrul nu returnează nimic
- [ ] Click pe „Detalii" deschide pagina comenzii (sau toast pentru moment)

**Tasks:**
- [ ] T-801.1: Construiește `OrderRow` component
- [ ] T-801.2: Construiește `AccountOrdersPage` cu fetch din `listMyOrders()`
- [ ] T-801.3: Filtru de status (client-side sau cu query param)
- [ ] T-801.4: Empty + no-match states

---

### US-802 — Customer își editează profilul

**Ca customer, vreau să-mi schimb numele, telefonul și emailul, ca să mențin datele actualizate.**

**Acceptance criteria:**
- [ ] Pagina `/account/profile` afișează formular pre-completat din `getMyCustomer()`
- [ ] Salvează prin `updateMyCustomer()` din `@/api/customers`
- [ ] Toast „Profil salvat" la succes
- [ ] Detect dirty state — confirm dialog la logout dacă există modificări nesalvate

**Tasks:**
- [ ] T-802.1: Construiește `AccountProfilePage`
- [ ] T-802.2: Pre-completează din `getMyCustomer()`
- [ ] T-802.3: Save cu loading + toast
- [ ] T-802.4: Dirty detection
- [ ] T-802.5: Confirm la logout cu modificări nesalvate

---

### US-803 — Customer își gestionează adresele

**Ca customer, vreau să-mi configurez adresa de facturare și de livrare, ca să fie pre-completate la checkout.**

**Acceptance criteria:**
- [ ] Pagina `/account/addresses` afișează 2 câmpuri: facturare și livrare
- [ ] Checkbox „Folosește aceeași adresă pentru livrare" copiază valoarea
- [ ] Save cu toast (folosește `updateMyCustomer()`)
- [ ] Validare pe câmpuri obligatorii

**Tasks:**
- [ ] T-803.1: Construiește `AccountAddressesPage`
- [ ] T-803.2: Implementează „same as billing" checkbox
- [ ] T-803.3: Save + toast

---

### US-804 — Customer se poate deconecta

**Ca utilizator autentificat, vreau să mă deconectez, ca să-mi protejez contul când termin.**

**Acceptance criteria:**
- [ ] Link „Deconectare" în AccountSidebar
- [ ] Confirm dialog „Ești sigur?"
- [ ] Șterge token-urile (`clearTokens()`) + golește user-ul din AuthContext
- [ ] (Opțional) golește coșul
- [ ] Redirect la `/login`
- [ ] Toast „Te-ai deconectat"

**Tasks:**
- [ ] T-804.1: Adaugă link logout în AccountSidebar
- [ ] T-804.2: Confirm dialog cu `useConfirm`
- [ ] T-804.3: Implementează funcția `logout` în AuthContext

---

## ✨ EPIC 9 — Polish & UX

> Ridică experiența la nivelul mockup-ului.

---

### US-901 — Empty states peste tot

**Ca utilizator, vreau mesaje utile când nu sunt date, ca să știu ce să fac mai departe.**

**Acceptance criteria:**
- [ ] Component `EmptyState` reutilizabil cu icon + titlu + descriere + CTA
- [ ] Folosit pe: coș gol, fără comenzi, fără rezultate la search, profil de customer nou
- [ ] Ton prietenos, indică următorul pas

**Tasks:**
- [ ] T-901.1: Construiește `EmptyState` reutilizabil
- [ ] T-901.2: Aplică pe toate paginile relevante

---

### US-902 — Loading states pentru cereri async

**Ca utilizator, vreau să văd că aplicația lucrează la cererea mea, ca să nu cred că e blocată.**

**Acceptance criteria:**
- [ ] `LoadingSpinner` reutilizabil
- [ ] Butoanele submit primesc clasa `is-loading` în timpul cererilor
- [ ] Listele afișează skeleton sau spinner la mount
- [ ] Inputurile devin `disabled` în timpul cererilor

**Tasks:**
- [ ] T-902.1: Construiește `LoadingSpinner`
- [ ] T-902.2: Aplică `is-loading` pe toate butoanele submit
- [ ] T-902.3: Skeleton/spinner pe liste

---

### US-903 — Pagina 404 pentru rute invalide

**Ca utilizator, vreau să primesc o pagină utilă când greșesc URL-ul, ca să mă pot întoarce.**

**Acceptance criteria:**
- [ ] Ruta `*` afișează `NotFoundPage`
- [ ] Folosește `EmptyState` cu codul 404
- [ ] CTA „Înapoi la produse"

**Tasks:**
- [ ] T-903.1: Construiește `NotFoundPage` cu `EmptyState`
- [ ] T-903.2: Verifică că ruta `*` o afișează în `AppRoutes`

---

### US-904 — Mesaje de eroare clare

**Ca utilizator, vreau să înțeleg ce a mers prost, ca să știu ce să fac.**

**Acceptance criteria:**
- [ ] Toast pentru erori temporare (login, save, etc.)
- [ ] `ErrorMessage` pentru erori la nivel de pagină (fetch eșuat)
- [ ] Mesajul `Error.message` (vine de la backend prin `apiFetch`) e afișat când există
- [ ] Fallback generic pentru erori necunoscute
- [ ] 403 — afișează permisiunea lipsă

**Tasks:**
- [ ] T-904.1: Construiește `ErrorMessage` component
- [ ] T-904.2: Aplică în toate paginile cu fetch (`try/catch` + `toast.error(err.message)`)

---

### US-905 — Confirmation dialogs pentru acțiuni distructive

**Ca utilizator, vreau să fiu întrebat înainte să se șteargă ceva, ca să nu pierd date din greșeală.**

**Acceptance criteria:**
- [ ] Ștergere produs din coș — confirm
- [ ] Logout — confirm dacă există modificări nesalvate
- [ ] Anulare comandă (dacă implementezi) — confirm
- [ ] Ștergeri admin (produs, customer, etc.) — confirm cu styling de pericol

**Tasks:**
- [ ] T-905.1: Aplică `useConfirm` pe toate locurile destructive
- [ ] T-905.2: Folosește `danger: true` pentru ștergeri

---

## 📝 Convenții de stil aplicate în acest fork

Reguli adoptate în review-ul cu instructorul. Le păstrezi pe parcursul tuturor epic-urilor de mai jos:

1. **Funcții nominale, nu obiecte cu metode.**
   - ✅ `import { listProducts, getProduct } from "@/api/products"`
   - ❌ `productsService.list()`, `productsService.get()`
2. **Fișiere flat în `src/api/`** (un fișier per resursă), fără sufix `Service`.
3. **TypeScript la nivel Level 1.5:**
   - DA: `<T>` generic pe `apiFetch`, return types explicite (`: Promise<X>`), type alias-uri pentru opțiuni, `import type { X }`, `unknown` pentru body.
   - NU: `any`, clase custom (`extends Error`), utility types (`Record`, `Partial`).
4. **Încapsulare prin module:** constantele și helperii privați NU se exportă (`BASE_URL`, `tryRefresh`, key-urile de localStorage).
5. **Niciun OOP:** zero clase, zero `this`, zero inheritance. Toate funcțiile sunt funcții — chiar și `AuthContext` expune funcții (`login`, `logout`, `hasPermission`), nu metode pe un obiect.

---

## 🎓 Bonus (opțional, după ce termini cele 29 story-uri)

### US-B01 — Admin Dashboard
Construiește pagini admin pentru gestiunea produselor, customer-ilor, comenzilor (folosind funcțiile din `@/api/products`, `@/api/customers`, `@/api/orders`).

### US-B02 — Permission management UI
Pagini pentru ca admin să creeze permisiuni noi și să le atribuie/revoce de la useri (folosind `@/api/permissions` și `@/api/users`).

### US-B03 — Toast Provider testing
Adaugă teste cu Vitest + React Testing Library pe componentele din `lib/`.

### US-B04 — Internationalization
Adaugă suport pentru multiple limbi (RO/EN) cu `react-i18next`.

### US-B05 — Theme switcher (dark mode)
Convertește variabilele CSS din `shared.css` în două teme și adaugă toggle în Navbar.

---

**Total: 29 user stories, ~150 tasks.** Bifează pe măsură ce avansezi. 🚀
