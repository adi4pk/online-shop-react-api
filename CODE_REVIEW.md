# Code Review — Epic 4: Authentication

> **Runda 2** (după commit `abab341 "fix: bug 1-5"`) e mai jos, prima.
> **Runda 1** e păstrată ca istoric, sub separator — bug-urile B1–B4 de acolo sunt **rezolvate**.
> Aceleași constatări sunt și inline pe PR #1.

---

# 🔵 Runda 2 — post `fix: bug 1-5`

Bravo pentru fix-urile din runda 1: `atob` pe base64url e reparat, `await registerrr` e la locul lui,
regex-urile acceptă acum diacritice/spații/virgule, decodarea e împachetată în try/catch, iar în
`20f0318` ai aplicat și C3 — `createContext<AuthContextType | null>(null)`, deci guard-ul din
`useAuthContext` chiar prinde acum folosirea în afara Provider-ului. Gate-ul `authReady` + fluxul prin
context rămân partea solidă a epicului. *(Ancorele de linie de mai jos sunt pe `20f0318`.)*

Runda asta am prins **un bug real de sesiune** (B1), câteva decizii de design (permisiuni, model de
eroare, routing) și curățenie rămasă. Ordinea de lucru: B1 → M1–M4 → C1–C5, fiecare cu commit separat.

## 🔴 Critic

### B1. Restore de sesiune fără verificare `exp` — `AuthContext.tsx:54-62` + `tokenStorage.ts:34`

`useEffect`-ul de la pornire decodează token-ul și te loghează necondiționat — **nu verifică dacă a
expirat**. `JwtPayload` are deja câmpul `exp` (`tokenStorage.ts:30`), dar nu-l folosești nicăieri.

Lanțul de efecte când access token-ul e expirat dar mai există în localStorage:

1. La refresh, `decodeJwt` reușește (token-ul e valid ca *formă*, doar expirat) → `setUser(...)` → app-ul te crede logat.
2. Primul call protejat dă `401` → `client.ts` cheamă `tryRefresh()`.
3. Dacă și refresh token-ul e expirat → `clearTokens()` șterge tokenii, **dar `user` rămâne setat**.
4. Rezultat: aplicația arată logat, dar orice cerere pică tăcut. Utilizatorul e blocat într-o stare fantomă.

`catch`-ul de acum prinde doar token-ul **corupt** (JSON invalid), nu și pe cel **expirat** — sunt două lucruri diferite.

| Acum (`AuthContext.tsx:54-66`) | Corect |
|---|---|
| <pre>if (token){<br>  try {<br>    const payload = decodeJwt(token);<br>    setUser({<br>      email: payload.sub,<br>      hasPermissions: true,<br>    })<br>  } catch {<br>    clearTokens();<br>  }<br>}</pre> | <pre>if (token) {<br>  try {<br>    const payload = decodeJwt(token);<br>    if (payload.exp * 1000 < Date.now()) {<br>      clearTokens();<br>    } else {<br>      setUser({ email: payload.sub, hasPermissions: hasRole(payload) });<br>    }<br>  } catch {<br>    clearTokens();<br>  }<br>}</pre> |

**De ce contează mecanismul:** `exp` din JWT e în **secunde** (unix), iar `Date.now()` e în **milisecunde** — de aici `* 1000`. Verificarea pe frontend nu e „securitate" (backend-ul oricum respinge token-ul), ci **corectitudinea stării UI**: nu afișezi logat pe cine nu mai e.

## 🟡 Important

### M1. `hasPermissions: true` hardcodat — `AuthContext.tsx:61, 84, 105`

Îl pui `true` în toate cele 3 locuri (restore, register, login), iar `payload.authorities` din JWT nu e
citit niciodată. În plus, `hasPermission?` e declarat în interfața contextului (`:27`) dar nu ajunge
niciodată în `value` (`:117`). Momentan **orice** user „are permisiuni" — pentru rutele de admin (ai deja
`admin.css` + `AccountSidebar`) e gating fals.

Fix: derivă rolul din token — `const isAdmin = payload.authorities?.includes("ROLE_ADMIN")` — și expune-l
real prin context, ca `ProtectedRoute` să-l poată folosi pentru un `requireAdmin`.

### M2. Arunci un obiect simplu, nu un `Error` — `client.ts:69-73`

`throw { message, status }` merge cu type-guard-urile tale (`"message" in err`), dar:
- pierzi `stack`-ul și nu poți face `err instanceof Error`;
- `LoginErrorResponse`/`RegisterErrorResponse` declară `timestamp`, `error`, `path` — câmpuri care **nu
  există niciodată** pe obiectul aruncat. Modelul declarat minte despre ce primești de fapt.

Fix: o clasă `ApiError extends Error` cu `status`, aruncată din `apiFetch`; guard-ul devine
`err instanceof ApiError`. (Și typo: „Eroare la cerer" → „cerere".)

### M3. Import circular `AppRoutes` — `RegisterPage.tsx:2`

`RegisterPage` importă `AppRoutes`, dar `AppRoutes` îl randează pe `RegisterPage` → ciclu de import. E și
complet nefolosit. Șterge linia.

### M4. `location.pathname` = global, nu router — `ProtectedRoutes.tsx:13, 41`

`location` se rezolvă la `window.location` (variabilă globală) — merge în browser din întâmplare, dar
ocolești react-router. Corect: `const { pathname } = useLocation()`. Bonus: log-ul din `PublicRoute` (`:41`)
scrie greșit `"ProtectedRoute"`. Oricum, `console.log`-urile se scot înainte de merge.

## 🟢 Cleanups

- **C1 — naming** (`AuthContext.tsx:23-25`): `loginnn`/`logouttt`/`registerrr` sunt API-ul public al
  contextului. Redenumește `login`/`logout`/`register`; coliziunea cu `@/api/auth` o rezolvi cu alias la
  import (`import { login as apiLogin }`), nu cu `n`-uri. *(carry-over din C2 runda 1)*
- **C2 — `console.log` pe hot path** (`validation.ts:44, 71`): `validateField` rulează la fiecare
  keystroke. Șterge log-urile (plus cele din `ProtectedRoutes` și `Login`).
- **C3 — `useState<Boolean>`** (`Login.tsx:27`): `Boolean` cu `B` mare e tipul wrapper-obiect. Folosește
  `useState<boolean>` sau lasă inferența `useState(false)`.
- **C4 — importuri moarte**: `Login.tsx` — `login` (`:2`), `saveTokens` (`:10`), `AuthContext` (`:14`);
  `RegisterPage.tsx` — `register`, `saveTokens`, `AuthResponse`, `FieldType`, `ValidationRules`.
- **C5 — `id="login-password"` copiat în register** (`RegisterPage.tsx:231`): id-ul e deja folosit în
  Login → nu mai e unic pe pagină, iar `<label htmlFor="reg-pass">` de deasupra nu mai pointează la nimic.
  Pune `id="reg-pass"`.

## Q&A — răspunde pe PR

1. La refresh cu un access token **expirat** dar refresh token **valid** — descrie pas cu pas ce se
   întâmplă acum, și exact unde se rupe dacă și refresh-ul e expirat.
2. De ce `if (response)` din `loginnn`/`registerrr` e **mereu** adevărat dacă execuția a ajuns la linia
   aia? Ce ai vrut de fapt să verifici acolo?
3. Dacă backend-ul trimite `authorities: ["ROLE_USER"]`, cum blochezi o rută `/admin` pentru el **fără**
   să modifici `ProtectedRoute`?

---

<br>

# ⚪ Runda 1 — istoric (B1–B4 REZOLVATE)

*Numerotarea de mai jos e din runda 1 și nu se suprapune cu cea de sus. Păstrată pentru context.*

---

## ✅ Ce e bine gândit

### 1. `authReady` — ai rezolvat corect un race condition real

Cel mai valoros lucru din tot epicul e gate-ul din `AuthProvider` + `ProtectedRoute`:

```tsx
if (!authReady) {
    return null;
}
```

La refresh, `user` e `null` pentru o clipă până se decodează token-ul din localStorage. Fără
gate, `ProtectedRoute` ar lua decizia **înainte** ca sesiunea să fie restaurată și te-ar arunca
greșit la `/login`. Comentariul tău din `AuthContext.tsx:48-49` arată că ai înțeles exact asta.

### 2. Redirect-ul prin context, nu prin `navigate()` manual

Fluxul tău de după login e elegant: `setUser(...)` → `PublicRoute` vede că `user` există → te
scoate din `/login` spre `/` → `ProtectedRoute` te lasă să treci → `Home` te duce la `/products`.
Nu ai nevoie de `navigate("/products")` — și chiar l-ai comentat în Login. Corect.

### 3. `useField` extins pentru checkbox

`value: string | boolean` + detecția `target.type === "checkbox"` în `onChange` e soluția
corectă pentru câmpul de termeni. (Ai lărgit însă și tipul lui `error` — vezi punctul C4.)

### 4. Type predicates

`function isLoginError(err: unknown): err is LoginErrorResponse` folosit în `catch` e exact
pattern-ul idiomatic TypeScript pentru erori `unknown`. Bine învățat.

---

## 🐛 Bug-uri — de rezolvat în ordinea asta

### B1. Build-ul pică: `<Link>` fără `to` — `AccountSidebar.tsx:20`

```
error TS2741: Property 'to' is missing in type '{ children: string; onClick: () => void; }'
              but required in type 'LinkProps'.
```

Când ai mutat logout-ul pe modal, ai comentat `to={"/login"}` dar ai lăsat elementul `<Link>`.
`npm run build` eșuează acum.

**De ce e și o problemă de semantică, nu doar de compilare:** elementul ăla nu mai *navighează*
nicăieri — doar deschide un modal. Deci nu e link, e buton:

```tsx
<button type="button" onClick={() => setIsModal(true)}>
  &#10140; Deconectare
</button>
```

Regula generală: `<Link>`/`<a>` = „mă duce în alt loc", `<button>` = „face ceva aici".

### B2. `registerrr(body)` fără `await` — `RegisterPage.tsx:102`

```tsx
try {
  registerrr(body);      // ← lipsește await
  goToProducts();
} catch (err) { ... }
```

Un singur cuvânt lipsă, trei consecințe în lanț:

1. `try/catch`-ul **nu prinde nimic** — `registerrr` e `async`, deci eroarea vine mai târziu,
   într-o promisiune pe care n-o aștepți. Ea „scapă" din funcție (unhandled rejection).
2. Toast-ul de „Registration error" **nu apare niciodată**.
3. `goToProducts()` rulează **imediat**, inclusiv când înregistrarea a eșuat.

Comentariul tău „TRY/CATCH WORKS" e adevărat doar pentru Login — acolo ai scris
`await loginnn(loginBody)` (`Login.tsx:59`). Compară cele două funcții și vezi diferența.

**Fix:** `await registerrr(body);`

**Test rapid:** înregistrează-te de două ori cu același email. Fără fix, a doua oară ajungi tot
pe `/products` fără niciun mesaj de eroare. Cu fix, rămâi pe pagină și vezi toast-ul.

### B3. Regex-urile noi resping input valid — `validation.ts:29,31`

```ts
const NAME_RE = /^[A-Za-z]+$/;
const ADDRESS_RE = /^(?=.*\d)[A-Za-z0-9 ]+$/;
```

Testează-le pe **propriile tale placeholder-e**:

| Câmp | Placeholder-ul tău | Trece de regex? |
|------|--------------------|-----------------|
| Nume | `ex: Ion Popescu` | ❌ — `NAME_RE` nu acceptă **spații** |
| Adresă | `Strada, numar, oras, cod postal` | ❌ — `ADDRESS_RE` nu acceptă **virgule și puncte** |

Practic nimeni nu se poate înregistra cu date realiste: „Ion Popescu" → „Numele trebuie sa
contina numai litere", „Str. Victoriei 45, Bucuresti" → „Adresa invalida". Nici diacriticele
(ă, î, ș, ț) nu trec la nume.

**Lecția:** un regex de validare se testează întâi pe exemplele pe care chiar vrei să le accepți
— iar placeholder-ele tale sunt fix lista aia. Variante corecte:

```ts
const NAME_RE = /^[A-Za-zĂÂÎȘȚăâîșț' -]+$/;        // litere, diacritice, spațiu, cratimă
const ADDRESS_RE = /^(?=.*\d)[A-Za-z0-9ĂÂÎȘȚăâîșț .,-]+$/;  // + punct, virgulă
```

### B4. `decodeJwt` folosește `atob` pe base64url — `tokenStorage.ts:32-35`

```ts
export function decodeJwt(token: string): JwtPayload {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}
```

Payload-ul unui JWT e codat **base64url**, nu base64 clasic: folosește `-` și `_` în loc de `+`
și `/`. `atob()` știe doar base64 clasic — când token-ul conține acele caractere, aruncă
`InvalidCharacterError`.

Partea gravă e **unde** crapă: `decodeJwt` rulează în `useEffect`-ul din `AuthProvider`, fără
try/catch — adică la **fiecare pornire a aplicației**. Un token „ghinionist" sau corupt în
localStorage îți omoară tot app-ul, iar singura scăpare e ștergerea manuală a localStorage din
DevTools. Utilizatorul real n-are cum să facă asta.

**Fix (două părți):**

```ts
export function decodeJwt(token: string): JwtPayload {
  const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(payload));
}
```

și în `AuthProvider`, decodarea se împachetează în try/catch — dacă token-ul e corupt, faci
`clearTokens()` și mergi mai departe delogat, nu crăpat:

```tsx
if (token) {
  try {
    const payload = decodeJwt(token);
    setUser({ email: payload.sub, hasPermissions: true });
  } catch {
    clearTokens();
  }
}
```

---

## 🧹 Curățenie și convenții

### C1. `src/models/` duplică `ApiError`

`LoginErrorResponse` și `RegisterErrorResponse` sunt **identice între ele** și identice cu
`ApiError` care există deja în `types/api.ts` exact pentru scopul ăsta (forma erorii din
`GlobalExceptionHandler`). Trei tipuri, un singur concept.

- șterge folderul `src/models/` (tipul `User` mută-l în `types/api.ts` sau lângă AuthContext)
- un singur guard `isApiError(err): err is ApiError`, exportat dintr-un singur loc, refolosit
  în Login și Register
- convenția fork-ului: tipurile stau în `types/api.ts` și sunt `type`, nu `interface`

### C2. `loginnn` / `logouttt` / `registerrr`

Știu de ce le-ai triplat: se ciocneau cu importurile `login`/`register` din `@/api/auth`.
Soluția idiomatic e aliasul la import, nu stâlcirea numelui public:

```ts
import { login as apiLogin, register as apiRegister } from "@/api/auth";
```

iar contextul expune `login`, `logout`, `register` — exact cum cere US-403 din BACKLOG. Numele
publice ale unui API sunt „interfața" lui — alea trebuie să fie curate; importurile interne
sunt detaliu de implementare.

### C3. Default value-ul din `createContext` face guard-ul inutil — `AuthContext.tsx:29-37`

Ai dat lui `createContext` un obiect dummy cu funcții goale. Consecința: `useContext` **nu
returnează niciodată** ceva falsy, deci guard-ul tău din `useAuthContext` (`if (!context)`)
nu se declanșează nici dacă uiți `<AuthProvider>` cu totul — primești doar funcțiile goale
care nu fac nimic, silențios. Pattern-ul corect:

```ts
export const AuthContext = createContext<AuthContextType | null>(null);
```

Acum guard-ul chiar prinde folosirea în afara Provider-ului, cu un mesaj clar, la prima rulare.

### C4. `validation.ts`: `error: string | null | boolean` — lărgire nejustificată

`validateField` nu returnează niciodată `boolean` — uită-te pe toate `return`-urile din corp:
sunt doar mesaje (`string`) sau `null`. Doar `value` avea nevoie de `| boolean` (pentru
checkbox). Lasă `error` și `validate()` pe `string | null`; tipurile trebuie să spună adevărul,
nu „tot ce s-ar putea întâmpla vreodată".

Tot aici: `"termeni"` ca `FieldType` e un tip de validare numit după un câmp specific. Pentru
cazuri unice există deja mecanismul `custom` — sau, dacă vrei regulă reutilizabilă, numește-o
generic (`"mustBeTrue"` / `"checkbox"`).

### C5. Delay-ul artificial de 1200ms la login — `AuthContext.tsx:94-96`

```ts
const [response] = await Promise.all([login(body),
  new Promise((resolve) => setTimeout(resolve, 1200))
]);
```

Înțeleg scopul — altfel spinner-ul nici nu se vede pe localhost. Dar în forma asta **fiecare
login real plătește 1.2 secunde**, pentru totdeauna. Trucul e ok temporar în dev; înainte de
commit, se scoate. (Destructurarea `const [response] = await Promise.all([...])` în sine e
corectă și bine comentată.)

### C6. `@mui/material` instalat degeaba

Singura referință e un import **comentat** în Login (`CircularProgress`). E o dependență mare
pentru zero utilizare:

```
npm uninstall @mui/material
```

`react-spinners` (ClipLoader) e folosit real — ăla rămâne.

### C7. `Dialog.tsx:29-33` — buton în interiorul unui Link

```tsx
<Link to={"/login"} id="logout-link">
  <button className="btn confirm" onClick={logouttt}>Logout</button>
</Link>
```

Element interactiv în element interactiv = HTML invalid. Și e **redundant**: după `logouttt()`,
`user` devine `null`, iar `ProtectedRoute` te redirectează singur la `/login` — e fix fluxul
pe care l-ai construit tu la login, în oglindă. Butonul singur e suficient:

```tsx
<button className="btn confirm" onClick={logouttt}>Logout</button>
```

### C8. Debris de dezvoltare

De șters înainte de commit — fiecare în parte e minor, împreună fac codul greu de citit:

- `console.log` în: `ProtectedRoutes.tsx` (×4), `Home.tsx`, `CartPage.tsx`, `validation.ts`
- importuri nefolosite: `BrowserRouter`/`Route`/`Routes` în ProtectedRoutes; `AppRoutes`,
  `register`, `saveTokens`, `AuthResponse` în RegisterPage; `navigate` în Login; `ClipLoader`
  în AuthContext; `Dialog` în Navbar
- state mort în RegisterPage: `checkedField`, `regError`
- blocurile mari de cod comentat din RegisterPage și Login (variantele vechi de input) —
  git-ul ține minte istoria, nu trebuie s-o care fișierul cu el
- `useState<Boolean>` în Login — tipul primitiv e `boolean` (cu literă mică); `Boolean` e
  obiectul wrapper, aproape niciodată ce vrei

### C9. Mărunte

- Select-ul de țară din Register trimite acum `"RO"` / `"GER"` / `"FR"` la backend, dar
  profilul și checkout-ul folosesc nume întregi (`"Romania"`). Alege o singură convenție.
- În `registerrr`, toast-ul de succes apare **înainte** de `saveTokens`/`setUser`, iar
  `if (response)` după `await` e mereu truthy (dacă cererea eșua, arunca — nu returna).
  Ordinea logică: salvezi token-urile → setezi user-ul → abia apoi anunți succesul.
- Typo în `client.ts:68`: „Eroare la cerer" → „Eroare la cerere".
- Mesajele de commit au regresat la „- 14th commit" după ce începuseși frumos cu
  `fix(products):` și `refactor:`. Prefixul conventional commits + o propoziție despre *ce*
  s-a schimbat — de ex. `feat(auth): login si register conectate la API prin AuthContext`.

---

## Concluzie

| | |
|---|---|
| **Blochează build-ul** | B1 |
| **Sparg funcțional Register-ul** | B2 + B3 |
| **Bombă cu ceas la pornire** | B4 |
| **Curățenie & convenții** | C1–C9 |

Happy path-ul pe Login funcționează și structura e sănătoasă — `authReady`, rutele protejate
și fluxul prin context sunt exact ce trebuia. Ordinea de lucru: B1 → B2 → B3 → B4 (fiecare cu
commit separat), apoi curățenia C1–C9 grupată logic. După asta, următorul pas din BACKLOG e
restul din US-403 (emailul în Navbar l-ai pus deja) și US-404 — return URL-ul la login
(`state.from`), care încă lipsește din `ProtectedRoute`.
