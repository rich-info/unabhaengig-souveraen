# Unabhängig & Souverän

**Deutschlands strategische Abhängigkeiten im Überblick**

Ein minimalistisches, faktenbasiertes Dashboard, das Deutschlands wirtschaftliche und strategische Abhängigkeiten visuell darstellt – in den Bereichen Energie, Rohstoffe, Industrie, Technologie und Lieferketten.

🔗 **Live-Demo:** *(kommt bald)*

---

## Ziel

Deutschland ist wirtschaftlich stark – aber abhängig. Dieses Dashboard macht sichtbar, **von wem**.

Das Projekt verfolgt einen **politisch neutralen, rein faktenbasierten** Ansatz. Es geht nicht um Panikmache, sondern um informierte Diskussion und Transparenz.

---

## Bereiche

| Bereich | Inhalt |
|---------|--------|
| **Energie** | Gas- und Ölimporte, LNG-Herkunft, Verschiebung nach Russland-Krise |
| **Rohstoffe** | Seltene Erden, kritische Mineralien, Risikobewertung |
| **Industrie** | Auto-Lieferketten, China-Abhängigkeit, Exportstruktur |
| **Technologie** | Cloud-Marktanteile, Software-Abhängigkeit, öffentlicher Sektor |
| **Lieferketten** | Abhängigkeits-Heatmap, kritische Produktgruppen |

---

## Technologie

Bewusst einfach gehalten – keine Build-Tools, keine Frameworks:

- **HTML** – semantische Struktur
- **Tailwind CSS** (CDN) – Styling
- **Chart.js** (CDN) – interaktive Charts
- **Vanilla JavaScript** – keine Abhängigkeiten
- **JSON-Dateien** – strukturierte Datenbasis

---

## Projektstruktur

```
unabhaengig-souveraen/
├── index.html              # Hauptseite
├── style.css               # Custom Styles
├── app.js                  # Hauptlogik, Daten laden, Scroll-Animationen
├── data/
│   ├── energy.json         # Energie-Daten
│   ├── raw_materials.json  # Rohstoff-Daten
│   ├── industry.json       # Industrie-Daten
│   ├── tech.json           # Technologie-Daten
│   └── supply_chains.json  # Lieferketten-Daten
├── charts/
│   ├── energy.js           # Energie-Charts
│   ├── raw_materials.js    # Rohstoff-Charts
│   ├── industry.js         # Industrie-Charts
│   ├── tech.js             # Technologie-Charts
│   └── supply_chains.js    # Lieferketten-Charts
└── README.md
```

---

## Lokal starten

Einfach einen lokalen Server starten (nötig für `fetch` der JSON-Dateien):

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# VS Code
# Live Server Extension nutzen
```

Dann im Browser: `http://localhost:8000`

---

## Mitmachen

Dieses Projekt lebt von der Community! Es gibt viele Möglichkeiten, beizutragen:

### Daten & Fakten
- **Datenquellen aktualisieren** – Die JSON-Dateien mit aktuellen, zitierbaren Zahlen ergänzen
- **Neue Datenpunkte hinzufügen** – z.B. Halbleiter-Abhängigkeiten, Pharma-Wirkstoffe
- **Quellenangaben** – Jede Zahl sollte eine nachprüfbare Quelle haben
- **Zeitreihen** – Historische Daten ergänzen, um Trends sichtbar zu machen

### Visualisierung & Design
- **Chart-Verbesserungen** – Bessere Tooltips, Animationen, Interaktivität
- **Neue Chart-Typen** – z.B. Zeitverlauf-Charts, Vergleiche
- **Mobile Optimierung** – Responsive Design testen und verbessern
- **Barrierefreiheit** – Screenreader-Unterstützung, Kontraste prüfen
- **Dark/Light Mode** – Optionaler heller Modus

### Neue Bereiche
- **Verteidigung** – Rüstungsabhängigkeiten
- **Ernährung** – Lebensmittelimporte, Saatgut-Abhängigkeit
- **Finanzen** – Währungsreserven, Investitionsabhängigkeiten
- **EU-Vergleich** – Deutschland im europäischen Kontext

### Technisch
- **Performance** – Lazy Loading der Charts
- **SEO / Open Graph** – Social Media Vorschau
- **Daten-API** – Automatisierte Datenaktualisierung
- **Tests** – Validierung der Datenstruktur
- **i18n** – Englische Übersetzung

---

## Datenquellen

Die aktuell verwendeten Daten basieren auf folgenden Quellen:

| Quelle | Bereich |
|--------|---------|
| [BMWK](https://www.bmwk.de) | Energieimporte, Wirtschaftsdaten |
| [BGR / DERA](https://www.deutsche-rohstoffagentur.de) | Rohstoffe, seltene Erden |
| [Eurostat](https://ec.europa.eu/eurostat) | Handelsstatistiken |
| [Destatis](https://www.destatis.de) | Im-/Exportdaten |
| [BDEW](https://www.bdew.de) | Energiewirtschaft |
| [VDA](https://www.vda.de) | Automobilindustrie |
| [Bitkom](https://www.bitkom.org) | Technologie, Digitalisierung |
| [Tagesschau](https://www.tagesschau.de) | Berichterstattung seltene Erden |
| [Reuters](https://www.reuters.com) | Lieferketten-Analysen |

> **Hinweis:** Die aktuellen Zahlen im Dashboard sind illustrativ und basieren auf öffentlich verfügbaren Berichten. Für eine vollständig zitierfähige Version bitten wir um Mithilfe bei der Quellenrecherche. Bitte eröffne ein Issue oder einen Pull Request mit konkreten Quellenangaben.

---

## Farbkodierung

| Farbe | Bedeutung | Schwellwert |
|-------|-----------|-------------|
| 🔴 Rot (`#F85149`) | Starke Abhängigkeit / hohes Risiko | ≥ 70% |
| 🟠 Orange (`#D29922`) | Moderate Abhängigkeit / mittleres Risiko | 30–69% |
| 🟢 Grün (`#2EA043`) | Geringe Abhängigkeit / diversifiziert | < 30% |

---

## Geplante Erweiterungen

- [ ] Zeitverlauf-Charts (historische Entwicklung)
- [ ] Abhängigkeitsindex (aggregierter Score)
- [ ] EU-Vergleich
- [ ] Daten-Download (CSV/JSON)
- [ ] Automatische Datenaktualisierung
- [ ] Englische Version
- [ ] GitHub Pages Deployment

---

## Lizenz

MIT – frei nutzbar, auch kommerziell.

---

## Kontakt

Fragen, Vorschläge oder Korrekturen? Eröffne ein [Issue](https://github.com/rich-info/unabhaengig-souveraen/issues) oder einen [Pull Request](https://github.com/rich-info/unabhaengig-souveraen/pulls).

**Gemeinsam für mehr Transparenz.**
