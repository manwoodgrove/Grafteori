# Diskret Matematik: Grafer

Detta dokument ger en översikt över grundläggande begrepp inom grafteori, en gren av diskret matematik.

## Definitioner och Förklaringar

### Generella Termer

* **Nod (Node) / Hörn (Vertex):** Grundläggande enheter i en graf, ofta representerade som punkter eller cirklar. Termerna "nod" och "hörn" används ofta synonymt.
* **Kant (Edge) / Båge (Arc):** Förbindelser mellan noder.
    * **Kant (Edge):** Används oftast i *oriktade* grafer, där förbindelsen inte har en specifik riktning.
    * **Båge (Arc):** Används oftast i *riktade* grafer, där förbindelsen har en specifik riktning (visas ofta med en pil).
* **Graf (Graph):** En matematisk struktur bestående av en mängd noder (hörn) och en mängd kanter (eller bågar) som förbinder par av noder. Formellt betecknas en graf ofta som G = (V, E), där V är mängden noder (Vertices) och E är mängden kanter (Edges).
* **Grannar (Neighbors):** Två noder sägs vara grannar om det finns en kant som förbinder dem direkt. I en riktad graf är nod *v* en granne till nod *u* om det finns en båge från *u* till *v*.

### En Nods Grad (Degree of a Node)

* **Grad (Degree):** För en nod i en *oriktad* graf är graden antalet kanter som är anslutna till noden. En ögla (se nedan) räknas oftast som två anslutningar.
* **Ingrad (In-degree):** För en nod i en *riktad* graf är ingraden antalet bågar som *pekar mot* noden.
* **Utgrad (Out-degree):** För en nod i en *riktad* graf är utgraden antalet bågar som *pekar från* noden.

### Att Förflytta Sig i en Graf

* **Vandring (Walk):** En sekvens av noder och kanter (eller bågar) där varje kant förbinder noden före och efter den i sekvensen. Noder och kanter kan repeteras. Exempel: `v1 -> e1 -> v2 -> e2 -> v3 -> e1 -> v2`.
* **Väg (Path):** En vandring där inga *kanter* repeteras. Noder kan repeteras.
* **Stig (Simple Path):** En vandring där inga *noder* repeteras (och därmed inga kanter heller, förutom möjligen start- och slutnod om det är en cykel).
* **Krets (Circuit):** En sluten väg, dvs en väg som börjar och slutar i samma nod och där inga kanter repeteras.
* **Cykel (Cycle):** En sluten stig, dvs en stig som börjar och slutar i samma nod (och innehåller minst en kant), där inga andra noder repeteras.
* **Sammanhängande Graf (Connected Graph):** En *oriktad* graf där det finns en stig mellan varje par av noder. I en *riktad* graf talar man om starkt sammanhängande (det finns en riktad väg från *u* till *v* och från *v* till *u* för alla nodpar *u, v*) och svagt sammanhängande (den underliggande oriktade grafen är sammanhängande).
* **Sammanhängande Komponenter (Connected Components):** Maximala sammanhängande delgrafer av en graf. Om en graf inte är sammanhängande, kan den delas upp i flera disjunkta sammanhängande komponenter.

### Kompletta Grafer, Bipartita Grafer och Relaterade Begrepp

* **Komplett Graf (Complete Graph):** En *oriktad*, *enkel* graf (se nedan) där varje par av distinkta noder är förbundna med en kant. En komplett graf med *n* noder betecknas K<sub>n</sub>.
* **Komplementgraf (Complement Graph):** Givet en enkel graf G=(V, E), är dess komplementgraf G'=(V, E') en graf med samma nodmängd V, men där en kant existerar mellan två noder i E' om och endast om den *inte* existerar i E.
* **Delgraf (Subgraph):** En graf H=(V', E') är en delgraf till G=(V, E) om V' är en delmängd av V och E' är en delmängd av E, där kanterna i E' endast förbinder noder som finns i V'.
* **Bipartit Graf (Bipartite Graph):** En graf vars nodmängd V kan delas in i två disjunkta (icke-överlappande) mängder, U och W, så att varje kant förbinder en nod i U med en nod i W. Det finns inga kanter mellan två noder inom U, och inga kanter mellan två noder inom W.
* **Komplett Bipartit Graf (Complete Bipartite Graph):** En bipartit graf där varje nod i mängden U är förbunden med *varje* nod i mängden W. En komplett bipartit graf med |U|=m och |W|=n noder betecknas K<sub>m,n</sub>.

### Kanttyper och Grafvariationer

* **Multipla Kanter (Multiple Edges):** Fler än en kant som förbinder samma par av noder i en oriktad graf (eller samma start- och slutnod i samma riktning i en riktad graf).
* **Ögla (Loop):** En kant som förbinder en nod med sig själv.
* **Multigraf (Multigraph):** En graf som tillåter multipla kanter och/eller öglor.
* **Enkel Graf (Simple Graph):** En graf som *inte* har några multipla kanter eller öglor. Ofta underförstått om inget annat sägs.
* **Riktad Graf (Directed Graph / Digraph):** En graf där kanterna (kallade bågar) har en riktning, indikerad med pilar. Förbindelsen från *u* till *v* är distinkt från förbindelsen från *v* till *u*.
* **Oriktad Graf (Undirected Graph):** En graf där kanterna inte har någon riktning. Förbindelsen mellan *u* och *v* är densamma oavsett "riktning".

### Euler och Hamilton

Dessa begrepp handlar om att besöka noder eller kanter i en graf på specifika sätt.

* **Eulerväg / Eulervandring (Euler Path / Euler Trail):** En *väg* i en graf som besöker varje *kant* exakt en gång.
* **Eulerkrets (Euler Circuit / Euler Tour):** En *krets* som besöker varje *kant* exakt en gång (börjar och slutar i samma nod).
    * *Villkor (Oriktad Graf):* En sammanhängande graf har en Eulerkrets om och endast om varje nod har en jämn grad. Den har en Eulerväg om och endast om den har exakt noll eller två noder med udda grad.
* **Hamiltonstig (Hamiltonian Path):** En *stig* i en graf som besöker varje *nod* exakt en gång.
* **Hamiltoncykel (Hamiltonian Cycle):** En *cykel* som besöker varje *nod* exakt en gång (förutom start-/slutnoden som besöks två gånger).
    * *Villkor:* Det finns inga enkla, nödvändiga och tillräckliga villkor för existensen av Hamiltonstigar/-cykler som för Euler. Att avgöra om en graf har en Hamiltoncykel är ett NP-komplett problem.

### Permutationer och Kombinationer

Även om det inte är exklusivt för grafteori, är permutationer och kombinationer centrala inom diskret matematik och kombinatorik, som ofta används tillsammans med grafer.

* **Permutation:** Ett arrangemang av objekt i en specifik ordning. Antalet permutationer av *n* distinkta objekt är *n!* (n-fakultet). Antalet permutationer av *k* objekt valda från *n* distinkta objekt (där ordningen spelar roll) är P(n, k) = n! / (n-k)!.
* **Kombination:** Ett urval av objekt där ordningen *inte* spelar roll. Antalet sätt att välja *k* objekt från en mängd av *n* distinkta objekt är C(n, k) = "n över k" = n! / (k! * (n-k)!).

## Exempel på Modellering med Grafer

Grafer är kraftfulla verktyg för att modellera verkliga problem.

1.  **Tidsplanering (t.ex. Byggprojekt):**
    * **Modell:** Använd en riktad graf (ofta kallad PERT-diagram eller aktivitetsschema).
    * **Noder:** Representerar händelser (milstolpar, t.ex. "grunden klar", "taket lagt").
    * **Bågar:** Representerar aktiviteter (uppgifter som måste utföras, t.ex. "gjuta grund", "resa väggar"). Riktningen visar beroenden (en aktivitet kan inte starta förrän föregående händelse är nådd).
    * **Kantvikter (Valfritt):** Kan representera tiden det tar att utföra en aktivitet.
    * **Analys:** Genom att analysera grafen kan man hitta den *kritiska stigen* (den längsta vägen från start till mål), vilket bestämmer den minimala totala projekttiden. Förseningar längs den kritiska stigen försenar hela projektet.

2.  **Radbrytning i Ordbehandlingsprogram:**
    * **Modell:** Skapa en graf där varje möjlig brytpunkt i texten (mellanrum) är en nod.
    * **Noder:** Representerar positioner mellan ord där en radbrytning *kan* ske. Lägg till en startnod och en slutnod.
    * **Bågar:** En riktad båge dras från nod *i* till nod *j* om orden mellan position *i* och *j* får plats på en enda rad enligt givna marginaler.
    * **Kantvikter:** Vikten på en båge från *i* till *j* kan representera "kostnaden" eller "fulheten" för att sätta orden mellan *i* och *j* på en rad (t.ex. baserat på hur mycket extra blanksteg som behövs för marginaljustering).
    * **Analys:** Problemet blir att hitta den *kortaste vägen* (minst total kostnad/fulhet) från startnoden till slutnoden i grafen. Varje båge i den kortaste vägen motsvarar en rad i den optimalt brutna texten.

3.  **Lösning av Instant Insanity:**
    * **Problem:** Pusslet består av fyra kuber där varje sida har en av fyra färger. Målet är att stapla kuberna så att varje färg syns exakt en gång på varje sida av den resulterande stapeln (fram, bak, vänster, höger).
    * **Modell:** Skapa en multigraf för varje par av motsatta sidor (fram/bak, vänster/höger, topp/botten - även om topp/botten inte är ett krav i lösningen, hjälper det att representera kuberna). Skapa tre grafer: G1 (fram/bak), G2 (vänster/höger), G3 (topp/botten).
    * **Noder:** De fyra färgerna.
    * **Kanter:** För varje kub, dra en kant mellan färgerna på motsatta sidor. Märk kanten med kubens nummer (1-4). Eftersom det finns fyra kuber kommer det finnas fyra kanter för varje par av motsatta sidor (totalt 12 kanter över de tre graferna, men varje graf har 4 kanter).
    * **Analys:** En lösning existerar om och endast om man kan hitta två kant-disjunkta delgrafer i *huvudgrafen* (som representerar alla 12 par av motsatta sidor). Mer specifikt: Skapa en graf med färgerna som noder. För varje kub *k*, lägg till tre kanter som representerar de tre paren av motsatta sidor, och märk kanterna med *k*. Leta sedan efter två kantdisjunkta delgrafer, H1 och H2, så att:
        1.  Varje delgraf (H1, H2) innehåller exakt en kant från varje kub (dvs 4 kanter totalt per delgraf).
        2.  Varje nod i varje delgraf har grad 2. (Detta säkerställer att varje färg förekommer exakt två gånger totalt i de valda paren för den delgrafen, vilket motsvarar en sida av stapeln - t.ex. fram+bak eller vänster+höger).
        * H1 representerar då fram/bak-sidorna och H2 representerar vänster/höger-sidorna.