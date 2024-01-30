# Pokédex

## Must-Have

- **Lauffähiges System**
- **Dynamisches Laden von Inhalten als JSON**
- **Svelte-Komponenten**
- **Einbindung einer REST-API** (sh. [PokeAPI](https://pokeapi.co/))
- **Elemente**
  - Eingabefelder
  - Radio-Buttons
  - Checkboxen
  - Buttons (Toggle-Button für die Sidebar)
- **Interaktionsarten**
  - Suchen beim Eingeben
  - Togglen
  - Ein- und Ausblenden bzw. Ein- und Ausklappen
  - Aus- und Abwählen
  - "Flippen" der Karten
  - Keyboard-Events (_Spacebar_ für das Flippen der Karten, nachdem das Bild fokussiert worden ist)

## Should Have

- **Responsive Design**
- **Routen**
  - `/`
  - `/generation/`
  - `/generation/\[id\]/`

## Could Have

- **Stores**
  - `page` und `navigator` (vgl. SvelteKit)
  - `$store.sidebar-\*.ts` (vgl. `$lib/ts/`)
- **(Statistische) Berechnungen**
  - Anzahl der Pokemon für jede / jedes / jeden
    - Typen (_Types_)
    - Farbe (_Colors_)
    - Wachstumrate (_Growth rates_)
    - Stadium (_Stage_)
- **Code-Auslagerung**
  - nach Dateiendung (`components`, `img`, `scss`, ...)
  - nach Art und Zweck (`constants.ts`, `enum.ts`, `functions.ts`, `types.ts`)
- **Farbthemenwechsel** (nicht manuell, sondern automatisch nach präferiertem Farbthema vom System)
- **Animationen**
  - Eingangs- und Ausgangsanimationen (`transition:`, `in:` und `out:`)
  - Seitenübergänge

## Weitere Features

- Flippende Karten bei `on:click` und `on:keyup`
- Suche nach Name oder ID der Pokémon mit Markierungen
- Query in der URL (`/generation/[id]/?search=<name>`)
- Ausklappbare Sidebar mit Triggerbutton
- Vollständige Aktualisierung der Filteroptionen (Anzahl als auch Auswahl mittels Textformatierung) basierend auf dem Suchbegriff in dem Inputfeld

## Credits

Alle Bilder von den Pokémon-Karten stammen von der API. Das Hintergrundbild von den ersten Startseiten (`/` und `/generation/`) stammt aus Midjourney.

Alle zusätzlich genutzten Bilder und Logos, vor allem die SVGs, sind nicht selbst entworfen worden sondern stammen auch einzeln aus dem Internet.

### UI-Component-Libraries

Für die Accordions in der Sidebar wurde [shadcn-svelte](https://www.shadcn-svelte.com/) als Komponentenlibrary genutzt. Die wurden dann dem Seitenstil manuell angepasst über Tailwind CSS bzw. über manuelle Resets.

### Urheberwerke

- Pokémon-Typ Icons
  - Autor: [Michaell Alavedra auf Figma](https://www.figma.com/@figchaell)
- Page Transitions
  - Autor: [Matija](https://joyofcode.xyz/sveltekit-page-transitions)
- Loader
  - Autor: [Omri Luz](https://uiverse.io/barisdogansutcu/light-rat-32)

Alle sonstigen Angaben sind dann über Kommentare angegeben worden im Projekt z.B. mit Verlinkung auf StackOverflow
