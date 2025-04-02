document.addEventListener('DOMContentLoaded', () => {
    // --- Data Structure (Simplified from Markdown) ---

    const graphData = {
        definitions: [
            {
                category: "Generella Termer",
                terms: [
                    { name: "Nod (Node) / Hörn (Vertex)", definition: "Grundläggande enheter i en graf, ofta representerade som punkter eller cirklar. Termerna \"nod\" och \"hörn\" används ofta synonymt." },
                    { name: "Kant (Edge) / Båge (Arc)", definition: "Förbindelser mellan noder. <ul><li><strong>Kant (Edge):</strong> Används oftast i <em>oriktade</em> grafer, där förbindelsen inte har en specifik riktning.</li><li><strong>Båge (Arc):</strong> Används oftast i <em>riktade</em> grafer, där förbindelsen har en specifik riktning (visas ofta med en pil).</li></ul>" },
                    { name: "Graf (Graph)", definition: "En matematisk struktur bestående av en mängd noder (hörn) och en mängd kanter (eller bågar) som förbinder par av noder. Formellt betecknas en graf ofta som G = (V, E), där V är mängden noder (Vertices) och E är mängden kanter (Edges)." },
                    { name: "Grannar (Neighbors)", definition: "Två noder sägs vara grannar om det finns en kant som förbinder dem direkt. I en riktad graf är nod <em>v</em> en granne till nod <em>u</em> om det finns en båge från <em>u</em> till <em>v</em>." }
                ]
            },
            {
                category: "En Nods Grad (Degree of a Node)",
                terms: [
                    { name: "Grad (Degree)", definition: "För en nod i en <em>oriktad</em> graf är graden antalet kanter som är anslutna till noden. En ögla (se nedan) räknas oftast som två anslutningar." },
                    { name: "Ingrad (In-degree)", definition: "För en nod i en <em>riktad</em> graf är ingraden antalet bågar som <em>pekar mot</em> noden." },
                    { name: "Utgrad (Out-degree)", definition: "För en nod i en <em>riktad</em> graf är utgraden antalet bågar som <em>pekar från</em> noden." }
                ]
            },
            {
                category: "Att Förflytta Sig i en Graf",
                terms: [
                    { name: "Vandring (Walk)", definition: "En sekvens av noder och kanter (eller bågar) där varje kant förbinder noden före och efter den i sekvensen. Noder och kanter kan repeteras. Exempel: <code>v1 -> e1 -> v2 -> e2 -> v3 -> e1 -> v2</code>." },
                    { name: "Väg (Path)", definition: "En vandring där inga <em>kanter</em> repeteras. Noder kan repeteras." },
                    { name: "Stig (Simple Path)", definition: "En vandring där inga <em>noder</em> repeteras (och därmed inga kanter heller, förutom möjligen start- och slutnod om det är en cykel)." },
                    { name: "Krets (Circuit)", definition: "En sluten väg, dvs en väg som börjar och slutar i samma nod och där inga kanter repeteras." },
                    { name: "Cykel (Cycle)", definition: "En sluten stig, dvs en stig som börjar och slutar i samma nod (och innehåller minst en kant), där inga andra noder repeteras." },
                    { name: "Sammanhängande Graf (Connected Graph)", definition: "En <em>oriktad</em> graf där det finns en stig mellan varje par av noder. I en <em>riktad</em> graf talar man om starkt sammanhängande (det finns en riktad väg från <em>u</em> till <em>v</em> och från <em>v</em> till <em>u</em> för alla nodpar <em>u, v</em>) och svagt sammanhängande (den underliggande oriktade grafen är sammanhängande)." },
                    { name: "Sammanhängande Komponenter (Connected Components)", definition: "Maximala sammanhängande delgrafer av en graf. Om en graf inte är sammanhängande, kan den delas upp i flera disjunkta sammanhängande komponenter." }
                ]
            },
            {
                category: "Kompletta Grafer, Bipartita Grafer och Relaterade Begrepp",
                terms: [
                    { name: "Komplett Graf (Complete Graph)", definition: "En <em>oriktad</em>, <em>enkel</em> graf (se nedan) där varje par av distinkta noder är förbundna med en kant. En komplett graf med <em>n</em> noder betecknas K<sub>n</sub>." },
                    { name: "Komplementgraf (Complement Graph)", definition: "Givet en enkel graf G=(V, E), är dess komplementgraf G'=(V, E') en graf med samma nodmängd V, men där en kant existerar mellan två noder i E' om och endast om den <em>inte</em> existerar i E." },
                    { name: "Delgraf (Subgraph)", definition: "En graf H=(V', E') är en delgraf till G=(V, E) om V' är en delmängd av V och E' är en delmängd av E, där kanterna i E' endast förbinder noder som finns i V'." },
                    { name: "Bipartit Graf (Bipartite Graph)", definition: "En graf vars nodmängd V kan delas in i två disjunkta (icke-överlappande) mängder, U och W, så att varje kant förbinder en nod i U med en nod i W. Det finns inga kanter mellan två noder inom U, och inga kanter mellan två noder inom W." },
                    { name: "Komplett Bipartit Graf (Complete Bipartite Graph)", definition: "En bipartit graf där varje nod i mängden U är förbunden med <em>varje</em> nod i mängden W. En komplett bipartit graf med |U|=m och |W|=n noder betecknas K<sub>m,n</sub>." }
                ]
            },
            {
                category: "Kanttyper och Grafvariationer",
                terms: [
                    { name: "Multipla Kanter (Multiple Edges)", definition: "Fler än en kant som förbinder samma par av noder i en oriktad graf (eller samma start- och slutnod i samma riktning i en riktad graf)." },
                    { name: "Ögla (Loop)", definition: "En kant som förbinder en nod med sig själv." },
                    { name: "Multigraf (Multigraph)", definition: "En graf som tillåter multipla kanter och/eller öglor." },
                    { name: "Enkel Graf (Simple Graph)", definition: "En graf som <em>inte</em> har några multipla kanter eller öglor. Ofta underförstått om inget annat sägs." },
                    { name: "Riktad Graf (Directed Graph / Digraph)", definition: "En graf där kanterna (kallade bågar) har en riktning, indikerad med pilar. Förbindelsen från <em>u</em> till <em>v</em> är distinkt från förbindelsen från <em>v</em> till <em>u</em>." },
                    { name: "Oriktad Graf (Undirected Graph)", definition: "En graf där kanterna inte har någon riktning. Förbindelsen mellan <em>u</em> och <em>v</em> är densamma oavsett \"riktning\"." }
                ]
            },
            {
                category: "Euler och Hamilton",
                terms: [
                    { name: "Eulerväg / Eulervandring (Euler Path / Euler Trail)", definition: "En <em>väg</em> i en graf som besöker varje <em>kant</em> exakt en gång." },
                    { name: "Eulerkrets (Euler Circuit / Euler Tour)", definition: "En <em>krets</em> som besöker varje <em>kant</em> exakt en gång (börjar och slutar i samma nod).<br><em>Villkor (Oriktad Graf):</em> En sammanhängande graf har en Eulerkrets om och endast om varje nod har en jämn grad. Den har en Eulerväg om och endast om den har exakt noll eller två noder med udda grad." },
                    { name: "Hamiltonstig (Hamiltonian Path)", definition: "En <em>stig</em> i en graf som besöker varje <em>nod</em> exakt en gång." },
                    { name: "Hamiltoncykel (Hamiltonian Cycle)", definition: "En <em>cykel</em> som besöker varje <em>nod</em> exakt en gång (förutom start-/slutnoden som besöks två gånger).<br><em>Villkor:</em> Det finns inga enkla, nödvändiga och tillräckliga villkor för existensen av Hamiltonstigar/-cykler som för Euler. Att avgöra om en graf har en Hamiltoncykel är ett NP-komplett problem." }
                ]
            },
             {
                category: "Permutationer och Kombinationer",
                terms: [
                    { name: "Permutation", definition: "Ett arrangemang av objekt i en specifik ordning. Antalet permutationer av <em>n</em> distinkta objekt är <em>n!</em> (n-fakultet). Antalet permutationer av <em>k</em> objekt valda från <em>n</em> distinkta objekt (där ordningen spelar roll) är P(n, k) = n! / (n-k)!." },
                    { name: "Kombination", definition: "Ett urval av objekt där ordningen <em>inte</em> spelar roll. Antalet sätt att välja <em>k</em> objekt från en mängd av <em>n</em> distinkta objekt är C(n, k) = \"n över k\" = n! / (k! * (n-k)!)." }
                ]
            }
        ],
        modelingExamples: [
            {
                title: "Tidsplanering (t.ex. Byggprojekt)",
                description: `
                    <p><strong>Modell:</strong> Använd en riktad graf (ofta kallad PERT-diagram eller aktivitetsschema).</p>
                    <ul>
                        <li><strong>Noder:</strong> Representerar händelser (milstolpar, t.ex. "grunden klar", "taket lagt").</li>
                        <li><strong>Bågar:</strong> Representerar aktiviteter (uppgifter som måste utföras, t.ex. "gjuta grund", "resa väggar"). Riktningen visar beroenden (en aktivitet kan inte starta förrän föregående händelse är nådd).</li>
                        <li><strong>Kantvikter (Valfritt):</strong> Kan representera tiden det tar att utföra en aktivitet.</li>
                    </ul>
                    <p><strong>Analys:</strong> Genom att analysera grafen kan man hitta den <em>kritiska stigen</em> (den längsta vägen från start till mål), vilket bestämmer den minimala totala projekttiden. Förseningar längs den kritiska stigen försenar hela projektet.</p>
                    <div class="graph-visualization">Visualisering av PERT-diagram kommer här...</div>
                `
            },
            {
                title: "Radbrytning i Ordbehandlingsprogram",
                description: `
                    <p><strong>Modell:</strong> Skapa en graf där varje möjlig brytpunkt i texten (mellanrum) är en nod.</p>
                    <ul>
                        <li><strong>Noder:</strong> Representerar positioner mellan ord där en radbrytning <em>kan</em> ske. Lägg till en startnod och en slutnod.</li>
                        <li><strong>Bågar:</strong> En riktad båge dras från nod <em>i</em> till nod <em>j</em> om orden mellan position <em>i</em> och <em>j</em> får plats på en enda rad enligt givna marginaler.</li>
                        <li><strong>Kantvikter:</strong> Vikten på en båge från <em>i</em> till <em>j</em> kan representera "kostnaden" eller "fulheten" för att sätta orden mellan <em>i</em> och <em>j</em> på en rad (t.ex. baserat på hur mycket extra blanksteg som behövs för marginaljustering).</li>
                    </ul>
                    <p><strong>Analys:</strong> Problemet blir att hitta den <em>kortaste vägen</em> (minst total kostnad/fulhet) från startnoden till slutnoden i grafen. Varje båge i den kortaste vägen motsvarar en rad i den optimalt brutna texten.</p>
                     <div class="graph-visualization">Visualisering av radbrytningsgraf kommer här...</div>
               `
            },
            {
                title: "Lösning av Instant Insanity",
                description: `
                    <p><strong>Problem:</strong> Pusslet består av fyra kuber där varje sida har en av fyra färger. Målet är att stapla kuberna så att varje färg syns exakt en gång på varje sida av den resulterande stapeln (fram, bak, vänster, höger).</p>
                    <p><strong>Modell:</strong> Skapa en multigraf för varje par av motsatta sidor (fram/bak, vänster/höger, topp/botten - även om topp/botten inte är ett krav i lösningen, hjälper det att representera kuberna). Skapa tre grafer: G1 (fram/bak), G2 (vänster/höger), G3 (topp/botten).</p>
                    <ul>
                        <li><strong>Noder:</strong> De fyra färgerna.</li>
                        <li><strong>Kanter:</strong> För varje kub, dra en kant mellan färgerna på motsatta sidor. Märk kanten med kubens nummer (1-4). Eftersom det finns fyra kuber kommer det finnas fyra kanter för varje par av motsatta sidor (totalt 12 kanter över de tre graferna, men varje graf har 4 kanter).</li>
                    </ul>
                    <p><strong>Analys:</strong> En lösning existerar om och endast om man kan hitta två kant-disjunkta delgrafer i <em>huvudgrafen</em> (som representerar alla 12 par av motsatta sidor). Mer specifikt: Skapa en graf med färgerna som noder. För varje kub <em>k</em>, lägg till tre kanter som representerar de tre paren av motsatta sidor, och märk kanterna med <em>k</em>. Leta sedan efter två kantdisjunkta delgrafer, H1 och H2, så att:
                        <ol>
                            <li>Varje delgraf (H1, H2) innehåller exakt en kant från varje kub (dvs 4 kanter totalt per delgraf).</li>
                            <li>Varje nod i varje delgraf har grad 2. (Detta säkerställer att varje färg förekommer exakt två gånger totalt i de valda paren för den delgrafen, vilket motsvarar en sida av stapeln - t.ex. fram+bak eller vänster+höger).</li>
                        </ol>
                        H1 representerar då fram/bak-sidorna och H2 representerar vänster/höger-sidorna.
                    </p>
                    <div class="graph-visualization">Visualisering av Instant Insanity-graf kommer här...</div>
                `
            }
        ]
    };

    // --- DOM Elements ---
    const definitionsSection = document.getElementById('definitions');
    const modelingSection = document.getElementById('modeling-examples');

    // --- Vis Network Options ---
    const defaultVisOptions = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 14,
                color: '#333'
            },
            borderWidth: 2,
            color: {
                border: '#2c3e50',
                background: '#ffffff',
                highlight: {
                    border: '#2c3e50',
                    background: '#d1e9ff'
                },
                hover: {
                    border: '#2c3e50',
                    background: '#eaf5ff'
                }
            }
        },
        edges: {
            width: 2,
            color: {
                color: '#3498db',
                highlight: '#2ecc71',
                hover: '#5fa8d3'
            },
            arrows: {
                to: { enabled: false, scaleFactor: 1, type: 'arrow' } // Default to undirected
            },
            smooth: {
                enabled: true,
                type: "dynamic",
                roundness: 0.5
            }
        },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: {
                gravitationalConstant: -8000,
                centralGravity: 0.3,
                springLength: 95,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0.1
            },
            stabilization: {
                iterations: 150
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            navigationButtons: true,
            keyboard: true
        },
        layout: {
            randomSeed: undefined,
            improvedLayout:true,
        }
    };

    // --- Function to Create Vis Network Visualization ---
    function createVisualization(container, nodes, edges, options = defaultVisOptions) {
        const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
        // Ensure container is empty before creating new network
        container.innerHTML = '';
        const network = new vis.Network(container, data, options);
        return network; // Return the network object if needed later
    }


    // --- Function to Create Term Cards ---
    function createTermCard(term) {
        const card = document.createElement('div');
        card.className = 'term-card';

        const title = document.createElement('div');
        title.className = 'term-title';
        title.innerHTML = term.name; // Use innerHTML to render potential formatting like <sub>

        const definition = document.createElement('div');
        definition.className = 'term-definition';
        definition.innerHTML = term.definition; // Use innerHTML for lists, etc.

        card.appendChild(title);
        card.appendChild(definition);

        // Add visualization placeholder
        const visContainer = document.createElement('div');
        visContainer.className = 'graph-visualization'; // Use existing style for now
        visContainer.style.height = '150px'; // Smaller height for term cards
        visContainer.style.display = 'none'; // Hidden initially
        card.appendChild(visContainer);

        // --- Interactivity: Toggle Definition & Visualization ---
        title.addEventListener('click', () => {
            const isVisible = definition.classList.toggle('visible');
            visContainer.style.display = isVisible && visContainer.hasChildNodes() ? 'block' : 'none'; // Show vis if definition is visible and vis exists
            // Optional: Add indicator like +/-
            title.classList.toggle('active'); // You might style .active in CSS

            // Create visualization only when first expanded (if applicable)
            if (isVisible && !visContainer.hasChildNodes()) {
                 if (term.name.startsWith("Graf (Graph)")) {
                    createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                        [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}]
                    );
                    visContainer.style.display = 'block'; // Ensure it's shown
                } else if (term.name.startsWith("Kant (Edge) / Båge (Arc)")) {
                     createVisualization(visContainer,
                        [{id: 1, label: 'Nod 1'}, {id: 2, label: 'Nod 2'}],
                        [
                            {id: 'e1', from: 1, to: 2, label: 'Kant (Edge)'}, // Undirected (default)
                            {id: 'a1', from: 2, to: 1, label: 'Båge (Arc)', arrows: 'to'} // Directed
                        ],
                        { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, font: { align: 'top' } } } // Add edge labels
                    );
                     visContainer.style.display = 'block'; // Ensure it's shown
                 } else if (term.name.startsWith("Grad (Degree)") || term.name.startsWith("Ingrad (In-degree)") || term.name.startsWith("Utgrad (Out-degree)")) {
                    const isDirected = term.name.includes("Ingrad") || term.name.includes("Utgrad");
                    const nodes = [
                        {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}
                    ];
                    const edges = [
                        {from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}, {from: 3, to: 4}
                    ];
                    if (isDirected) {
                        edges.push({from: 4, to: 1, arrows: 'to'}); // Add a directed edge back
                        edges.forEach(e => e.arrows = e.arrows || 'to'); // Make all edges directed for this example
                    } else {
                         edges.push({from: 1, to: 1}); // Add a loop for undirected degree example
                    }

                    const network = createVisualization(visContainer, nodes, edges,
                         { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: isDirected } } } }
                    );

                    // Add interaction explanation
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em';
                    explanation.style.marginTop = '10px';
                    explanation.style.textAlign = 'center';
                    explanation.innerHTML = `Klicka på en nod för att se dess ${isDirected ? 'in/utgrad' : 'grad'}.`;
                    visContainer.appendChild(explanation);

                    // Add degree display area
                    const degreeDisplay = document.createElement('div');
                    degreeDisplay.style.marginTop = '5px';
                    degreeDisplay.style.textAlign = 'center';
                    degreeDisplay.style.fontWeight = 'bold';
                    visContainer.appendChild(degreeDisplay);

                    network.on("click", function (params) {
                        degreeDisplay.innerHTML = ''; // Clear previous
                        if (params.nodes.length > 0) {
                            const nodeId = params.nodes[0];
                            const connectedEdges = network.getConnectedEdges(nodeId);
                            let degree = 0;
                            let inDegree = 0;
                            let outDegree = 0;

                            connectedEdges.forEach(edgeId => {
                                const edge = data.edges.get(edgeId);
                                if (edge.from === edge.to && edge.from === nodeId) { // Loop
                                    degree += 2; // Loop counts as 2 for undirected degree
                                    // Loops typically don't contribute to in/out degree in simple graphs, but definitions vary. Sticking to simple case here.
                                } else if (edge.from === nodeId) { // Edge originates from node
                                    degree++;
                                    outDegree++;
                                } else if (edge.to === nodeId) { // Edge points to node
                                    degree++;
                                    inDegree++;
                                }
                            });

                            if (isDirected) {
                                degreeDisplay.innerHTML = `Nod ${nodes.find(n=>n.id===nodeId).label}: Ingrad = ${inDegree}, Utgrad = ${outDegree}`;
                            } else {
                                degreeDisplay.innerHTML = `Nod ${nodes.find(n=>n.id===nodeId).label}: Grad = ${degree}`;
                            }
                        }
                    });
                     visContainer.style.display = 'block'; // Ensure it's shown
                 } else if (["Vandring (Walk)", "Väg (Path)", "Stig (Simple Path)", "Krets (Circuit)", "Cykel (Cycle)"].includes(term.name.split(" / ")[0])) {
                    // Visualization for Walk, Path, Simple Path, Cycle
                    const nodes = [
                        {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'},
                        {id: 4, label: 'D'}, {id: 5, label: 'E'}
                    ];
                    const edges = [
                        {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 3}, {id: 'e3', from: 2, to: 3},
                        {id: 'e4', from: 3, to: 4}, {id: 'e5', from: 4, to: 5}, {id: 'e6', from: 5, to: 3} // Creates a cycle 3-4-5-3
                    ];
                    const network = createVisualization(visContainer, nodes, edges);

                    let currentWalkNodes = [];
                    let currentWalkEdges = [];
                    let lastNodeId = null;

                    // Add interaction explanation
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em';
                    explanation.style.marginTop = '10px';
                    explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Klicka på noder i följd för att bygga en vandring. Högerklicka för att nollställa.';
                    visContainer.appendChild(explanation);

                    // Add status display area
                    const statusDisplay = document.createElement('div');
                    statusDisplay.style.marginTop = '5px';
                    statusDisplay.style.textAlign = 'center';
                    statusDisplay.style.minHeight = '4em'; // Reserve space for messages
                    visContainer.appendChild(statusDisplay);

                    function updateWalkStatus() {
                        statusDisplay.innerHTML = ''; // Clear previous
                        if (currentWalkNodes.length === 0) return;

                        let statusText = `<b>Vandring:</b> ${currentWalkNodes.map(id => nodes.find(n=>n.id===id).label).join(' → ')}<br>`;
                        let isPath = true;
                        let isSimplePath = true;
                        let isCircuit = false;
                        let isCycle = false;

                        const visitedEdges = new Set();
                        for (const edgeId of currentWalkEdges) {
                            if (visitedEdges.has(edgeId)) {
                                isPath = false;
                                break;
                            }
                            visitedEdges.add(edgeId);
                        }

                        const visitedNodes = new Set();
                        let firstNode = null;
                        let repeatedNode = false;
                        for (const nodeId of currentWalkNodes) {
                             if (firstNode === null) firstNode = nodeId;
                            if (visitedNodes.has(nodeId)) {
                                isSimplePath = false;
                                repeatedNode = true; // Mark that a node was repeated
                            }
                            visitedNodes.add(nodeId);
                        }

                        // Check for Circuit/Cycle only if path criteria met and closed
                        if (currentWalkNodes.length > 1 && currentWalkNodes[0] === currentWalkNodes[currentWalkNodes.length - 1]) {
                            if (isPath) { // A circuit is a closed path
                                isCircuit = true;
                                // A cycle is a closed simple path (no repeated nodes except start/end)
                                // Check if only the start/end node is repeated
                                const intermediateNodes = currentWalkNodes.slice(1, -1);
                                const intermediateSet = new Set(intermediateNodes);
                                if (intermediateNodes.length === intermediateSet.size && !intermediateSet.has(currentWalkNodes[0])) {
                                     isCycle = true;
                                     isSimplePath = false; // A cycle isn't technically a simple path by strict definition (repeats start/end)
                                }
                            }
                        } else {
                             // If not closed, it cannot be a circuit or cycle
                             isCircuit = false;
                             isCycle = false;
                             // If no nodes repeated *except possibly the last one matching the first*, it's a simple path
                             const pathNodesSet = new Set(currentWalkNodes);
                             if(currentWalkNodes.length === pathNodesSet.size) {
                                isSimplePath = true;
                             } else {
                                isSimplePath = false;
                             }
                        }


                        if (isCycle) statusText += '<span style="color: var(--secondary-color);">✓ Cykel</span><br>';
                        else if (isCircuit) statusText += '<span style="color: var(--secondary-color);">✓ Krets</span><br>';

                        if (isSimplePath && !isCycle) statusText += '<span style="color: var(--secondary-color);">✓ Stig (Simple Path)</span><br>';
                        else if (isPath && !isCircuit) statusText += '<span style="color: var(--secondary-color);">✓ Väg (Path)</span><br>';
                        else if (!isPath) statusText += '<span style="color: red;">✗ Inte en Väg (kant repeterad)</span><br>';

                        if (!isSimplePath && !isCycle) statusText += '<span style="color: red;">✗ Inte en Stig (nod repeterad)</span><br>';


                        statusDisplay.innerHTML = statusText;
                    }

                    network.on("click", function (params) {
                        if (params.nodes.length > 0) {
                            const clickedNodeId = params.nodes[0];

                            if (lastNodeId === null) { // Starting a new walk
                                currentWalkNodes = [clickedNodeId];
                                currentWalkEdges = [];
                                lastNodeId = clickedNodeId;
                            } else {
                                // Find edge connecting lastNodeId and clickedNodeId
                                const connectingEdgeIds = network.getConnectedEdges(lastNodeId);
                                let edgeFoundId = null;
                                for(const edgeId of connectingEdgeIds) {
                                    const edge = data.edges.get(edgeId);
                                    if ((edge.from === lastNodeId && edge.to === clickedNodeId) || (edge.to === lastNodeId && edge.from === clickedNodeId)) {
                                        edgeFoundId = edgeId;
                                        break;
                                    }
                                }

                                if (edgeFoundId) {
                                    currentWalkNodes.push(clickedNodeId);
                                    currentWalkEdges.push(edgeFoundId);
                                    lastNodeId = clickedNodeId;
                                } else {
                                    // Cannot walk directly to this node
                                    statusDisplay.innerHTML = `<span style="color: orange;">Kan inte gå direkt från ${nodes.find(n=>n.id===lastNodeId).label} till ${nodes.find(n=>n.id===clickedNodeId).label}.</span>`;
                                    return; // Don't update walk status
                                }
                            }

                            // Highlight walk
                            network.unselectAll();
                            network.selectNodes(currentWalkNodes);
                            network.selectEdges(currentWalkEdges);

                            updateWalkStatus();
                        }
                    });

                     // Reset on right-click
                    visContainer.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        currentWalkNodes = [];
                        currentWalkEdges = [];
                        lastNodeId = null;
                        network.unselectAll();
                        statusDisplay.innerHTML = 'Vandring nollställd.';
                    });


                    visContainer.style.display = 'block'; // Ensure it's shown
                 } else if (term.name.startsWith("Komplett Graf")) {
                    const n = 5; // Example K5
                    const nodes = Array.from({ length: n }, (_, i) => ({ id: i + 1, label: `v${i + 1}` }));
                    const edges = [];
                    for (let i = 1; i <= n; i++) {
                        for (let j = i + 1; j <= n; j++) {
                            edges.push({ from: i, to: j });
                        }
                    }
                    createVisualization(visContainer, nodes, edges, { ...defaultVisOptions, physics: { stabilization: { iterations: 200 } } }); // More iterations for complex layout
                    visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Bipartit Graf")) {
                     const m = 3; // Size of set U
                     const n = 4; // Size of set W
                     const nodes = [];
                     // Nodes in set U (Group 0)
                     for (let i = 1; i <= m; i++) {
                         nodes.push({ id: `U${i}`, label: `U${i}`, group: 0, x: -100, y: i*50 }); // Position U nodes on left
                     }
                     // Nodes in set W (Group 1)
                     for (let i = 1; i <= n; i++) {
                         nodes.push({ id: `W${i}`, label: `W${i}`, group: 1, x: 100, y: i*50 }); // Position W nodes on right
                     }
                     const edges = [ // Example edges (not necessarily complete bipartite)
                        { from: 'U1', to: 'W1' }, { from: 'U1', to: 'W3' },
                        { from: 'U2', to: 'W2' }, { from: 'U2', to: 'W4' },
                        { from: 'U3', to: 'W1' }, { from: 'U3', to: 'W4' }
                     ];
                     // Add specific options for bipartite layout
                     const bipartiteOptions = {
                         ...defaultVisOptions,
                         nodes: {
                             ...defaultVisOptions.nodes,
                             shape: 'box', // Use boxes for clarity
                             color: undefined, // Let groups define color
                         },
                         physics: false, // Disable physics to keep sets separate
                         groups: {
                             0: { color: { background: '#f1c40f', border: '#e67e22' }, font: { color: '#333'} }, // Yellow for U
                             1: { color: { background: '#3498db', border: '#2980b9' }, font: { color: '#fff'} }  // Blue for W
                         },
                         layout: {
                             hierarchical: { // Use hierarchical layout to force separation (though manual positioning is also used here)
                                enabled: true,
                                direction: 'LR', // Left to Right
                                sortMethod: 'directed'
                             }
                         }
                     };
                     createVisualization(visContainer, nodes, edges, bipartiteOptions);
                     visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Multipla Kanter")) {
                    createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}],
                        [{from: 1, to: 2}, {from: 1, to: 2}, {from: 1, to: 2}] // Multiple edges
                    );
                    visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Ögla (Loop)")) {
                     createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}],
                        [{from: 1, to: 1}, {from: 1, to: 2}] // Loop on A
                    );
                     visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Multigraf")) {
                     createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                        [
                            {from: 1, to: 1}, // Loop
                            {from: 1, to: 2}, {from: 1, to: 2}, // Multiple edges
                            {from: 2, to: 3}
                        ]
                    );
                     visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Enkel Graf")) {
                     createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                        [{from: 1, to: 2}, {from: 2, to: 3}] // No loops or multiple edges
                    );
                     visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Riktad Graf")) {
                     createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                        [
                            {from: 1, to: 2, arrows: 'to'},
                            {from: 1, to: 3, arrows: 'to'},
                            {from: 3, to: 2, arrows: 'to'}
                        ],
                         { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: true } } } }
                    );
                     visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Oriktad Graf")) {
                     createVisualization(visContainer,
                        [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                        [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}] // Default is undirected
                    );
                     visContainer.style.display = 'block';
                 } else if (term.name.startsWith("Eulerväg") || term.name.startsWith("Eulerkrets")) {
                    // Euler Path/Circuit Visualization
                    const nodes = [
                        {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'},
                        {id: 4, label: 'D'}, {id: 5, label: 'E'}
                    ];
                    // Graph based on Königsberg bridge problem variation (has Euler path, not circuit)
                    // A-B, A-B, A-C, A-C, A-D, B-C, B-C, C-D
                    // Nodes A, D have odd degree (3), B, C have even degree (4)
                    const edges = [
                        {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 2},
                        {id: 'e3', from: 1, to: 3}, {id: 'e4', from: 1, to: 3},
                        {id: 'e5', from: 1, to: 4},
                        {id: 'e6', from: 2, to: 3}, {id: 'e7', from: 2, to: 3},
                        {id: 'e8', from: 3, to: 4}
                    ];
                    const totalEdges = edges.length;
                    const network = createVisualization(visContainer, nodes, edges);

                    let visitedEdges = new Set();
                    let currentPathNodes = [];
                    let lastNode = null;

                    // Add interaction explanation
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em';
                    explanation.style.marginTop = '10px';
                    explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Klicka på kanter i följd för att försöka hitta en Eulerväg/Eulerkrets. Högerklicka för att nollställa.';
                    visContainer.appendChild(explanation);

                    // Add status display area
                    const statusDisplay = document.createElement('div');
                    statusDisplay.style.marginTop = '5px';
                    statusDisplay.style.textAlign = 'center';
                    statusDisplay.style.minHeight = '3em';
                    visContainer.appendChild(statusDisplay);

                    function updateEulerStatus() {
                        statusDisplay.innerHTML = '';
                        const visitedCount = visitedEdges.size;
                        let message = `Besökta kanter: ${visitedCount} / ${totalEdges}. `;
                        let isEulerPath = false;
                        let isEulerCircuit = false;

                        if (visitedCount === totalEdges) {
                            // Check if it's a valid path (connected sequence) - basic check
                            if (currentPathNodes.length > 0) {
                                message += '<br><span style="color: var(--secondary-color);">Alla kanter besökta!</span> ';
                                // Check if it's a circuit (start == end)
                                if (currentPathNodes[0] === currentPathNodes[currentPathNodes.length - 1]) {
                                    isEulerCircuit = true;
                                    message += '<span style="color: var(--secondary-color);">✓ Eulerkrets hittad!</span>';
                                } else {
                                    isEulerPath = true;
                                    message += '<span style="color: var(--secondary-color);">✓ Eulerväg hittad!</span>';
                                }
                            } else {
                                 message += '<br><span style="color: orange;">Alla kanter besökta, men ingen startnod?</span> ';
                            }
                        }

                        statusDisplay.innerHTML = message;
                        return { isEulerPath, isEulerCircuit };
                    }

                    network.on("click", function (params) {
                        if (params.edges.length > 0) {
                            const clickedEdgeId = params.edges[0];
                            const edge = data.edges.get(clickedEdgeId);

                            if (visitedEdges.has(clickedEdgeId)) {
                                statusDisplay.innerHTML = '<span style="color: red;">Kant redan besökt!</span>';
                                return;
                            }

                            let nextNode = null;
                            if (lastNode === null) { // Starting the path
                                // Can start anywhere, pick one end of the edge
                                lastNode = edge.from;
                                nextNode = edge.to;
                                currentPathNodes = [lastNode, nextNode];
                            } else {
                                // Must continue from the last node
                                if (edge.from === lastNode) {
                                    nextNode = edge.to;
                                } else if (edge.to === lastNode) {
                                    nextNode = edge.from;
                                } else {
                                    statusDisplay.innerHTML = `<span style="color: orange;">Kanten ansluter inte till föregående nod (${nodes.find(n=>n.id===lastNode).label}).</span>`;
                                    return;
                                }
                                currentPathNodes.push(nextNode);
                                lastNode = nextNode;
                            }

                            visitedEdges.add(clickedEdgeId);

                            // Highlight visited edges differently
                            let updatedEdges = data.edges.get({
                                filter: function (item) {
                                    return visitedEdges.has(item.id);
                                }
                            });
                            updatedEdges.forEach(e => {
                                e.color = { color: '#2ecc71', highlight: '#27ae60' }; // Green for visited
                                e.width = 3;
                            });
                            data.edges.update(updatedEdges);

                            updateEulerStatus();

                        } else if (params.nodes.length > 0 && lastNode === null) {
                             // Allow starting by clicking a node first
                             lastNode = params.nodes[0];
                             currentPathNodes = [lastNode];
                             statusDisplay.innerHTML = `Startar vid nod ${nodes.find(n=>n.id===lastNode).label}. Välj en anslutande kant.`;
                        }
                    });

                     // Reset on right-click
                    visContainer.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        visitedEdges.clear();
                        currentPathNodes = [];
                        lastNode = null;
                        // Reset edge colors/widths
                        let allEdges = data.edges.get();
                         allEdges.forEach(e => {
                            e.color = { color: '#3498db', highlight: '#2ecc71' }; // Reset to default blue
                            e.width = 2;
                        });
                        data.edges.update(allEdges);
                        statusDisplay.innerHTML = 'Försök nollställt.';
                    });

                    visContainer.style.display = 'block'; // Ensure it's shown
                 } else if (term.name.startsWith("Hamiltonstig") || term.name.startsWith("Hamiltoncykel")) {
                    // Hamiltonian Path/Cycle Visualization
                    const nodes = [
                        {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'},
                        {id: 4, label: 'D'}, {id: 5, label: 'E'}
                    ];
                    // A graph that has Hamiltonian cycles (e.g., 1-2-3-4-5-1)
                    const edges = [
                        {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 2, to: 3}, {id: 'e3', from: 3, to: 4},
                        {id: 'e4', from: 4, to: 5}, {id: 'e5', from: 5, to: 1}, // Outer cycle
                        {id: 'e6', from: 1, to: 3}, {id: 'e7', from: 2, to: 4}, {id: 'e8', from: 3, to: 5},
                        {id: 'e9', from: 4, to: 1}, {id: 'e10', from: 5, to: 2} // Some inner connections
                    ];
                    const totalNodes = nodes.length;
                    const network = createVisualization(visContainer, nodes, edges);

                    let currentHamiltonPathNodes = [];
                    let currentHamiltonPathEdges = [];
                    let visitedNodesSet = new Set();

                    // Add interaction explanation
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em';
                    explanation.style.marginTop = '10px';
                    explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Klicka på noder i följd för att försöka hitta en Hamiltonstig/-cykel. Högerklicka för att nollställa.';
                    visContainer.appendChild(explanation);

                    // Add status display area
                    const statusDisplay = document.createElement('div');
                    statusDisplay.style.marginTop = '5px';
                    statusDisplay.style.textAlign = 'center';
                    statusDisplay.style.minHeight = '3em';
                    visContainer.appendChild(statusDisplay);

                    function updateHamiltonStatus() {
                        statusDisplay.innerHTML = '';
                        if (currentHamiltonPathNodes.length === 0) return;

                        const pathString = currentHamiltonPathNodes.map(id => nodes.find(n=>n.id===id).label).join(' → ');
                        let message = `<b>Aktuell stig:</b> ${pathString}<br>`;
                        let isHamiltonPath = false;
                        let isHamiltonCycle = false;

                        // Check if all nodes are visited exactly once (except possibly start/end for cycle)
                        if (visitedNodesSet.size === totalNodes) {
                             // Check if it forms a cycle
                             if (currentHamiltonPathNodes.length === totalNodes + 1 && currentHamiltonPathNodes[0] === currentHamiltonPathNodes[totalNodes]) {
                                 // Need to verify the last edge exists
                                 const lastEdgeExists = data.edges.get({
                                     filter: item => (item.from === currentHamiltonPathNodes[totalNodes-1] && item.to === currentHamiltonPathNodes[totalNodes]) || (item.to === currentHamiltonPathNodes[totalNodes-1] && item.from === currentHamiltonPathNodes[totalNodes])
                                 }).length > 0;

                                 if(lastEdgeExists) {
                                     isHamiltonCycle = true;
                                     message += '<span style="color: var(--secondary-color);">✓ Hamiltoncykel hittad!</span>';
                                 } else {
                                      message += '<span style="color: red;">✗ Sista kanten saknas för cykel!</span>';
                                 }

                             } else if (currentHamiltonPathNodes.length === totalNodes) {
                                 isHamiltonPath = true;
                                 message += '<span style="color: var(--secondary-color);">✓ Hamiltonstig hittad!</span>';
                             }
                        }

                        statusDisplay.innerHTML = message;
                        return { isHamiltonPath, isHamiltonCycle };
                    }

                    network.on("click", function (params) {
                        if (params.nodes.length > 0) {
                            const clickedNodeId = params.nodes[0];
                            const lastNodeId = currentHamiltonPathNodes.length > 0 ? currentHamiltonPathNodes[currentHamiltonPathNodes.length - 1] : null;

                            // Check if starting node
                            if (lastNodeId === null) {
                                currentHamiltonPathNodes = [clickedNodeId];
                                visitedNodesSet.add(clickedNodeId);
                                network.selectNodes([clickedNodeId]);
                                updateHamiltonStatus();
                                return;
                            }

                            // Check if node already visited (allow revisiting start node only if completing a cycle)
                            if (visitedNodesSet.has(clickedNodeId)) {
                                // Allow clicking start node if all others visited and path length is correct
                                if (clickedNodeId === currentHamiltonPathNodes[0] && visitedNodesSet.size === totalNodes && currentHamiltonPathNodes.length === totalNodes) {
                                     // Potentially completing a cycle, proceed to check edge
                                } else {
                                    statusDisplay.innerHTML = `<span style="color: red;">Nod ${nodes.find(n=>n.id===clickedNodeId).label} redan besökt!</span>`;
                                    return;
                                }
                            }

                            // Check if there is an edge between last node and clicked node
                            const connectingEdges = data.edges.get({
                                filter: item => (item.from === lastNodeId && item.to === clickedNodeId) || (item.to === lastNodeId && item.from === clickedNodeId)
                            });

                            if (connectingEdges.length === 0) {
                                statusDisplay.innerHTML = `<span style="color: orange;">Ingen kant mellan ${nodes.find(n=>n.id===lastNodeId).label} och ${nodes.find(n=>n.id===clickedNodeId).label}.</span>`;
                                return;
                            }

                            // Add node and edge to path
                            currentHamiltonPathNodes.push(clickedNodeId);
                            visitedNodesSet.add(clickedNodeId); // Add even if it's the start node again
                            currentHamiltonPathEdges.push(connectingEdges[0].id); // Assume simple graph for this interaction

                            // Highlight path
                            network.selectNodes(currentHamiltonPathNodes, false); // `false` prevents appending to selection
                            network.selectEdges(currentHamiltonPathEdges);

                            updateHamiltonStatus();
                        }
                    });

                     // Reset on right-click
                    visContainer.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        currentHamiltonPathNodes = [];
                        currentHamiltonPathEdges = [];
                        visitedNodesSet.clear();
                        network.unselectAll();
                        statusDisplay.innerHTML = 'Försök nollställt.';
                    });

                    visContainer.style.display = 'block'; // Ensure it's shown
                 }
            }
        });

        return card;
    }

    // --- Function to Create Modeling Example Cards ---
     function createModelingCard(example) {
        const card = document.createElement('div');
        card.className = 'term-card'; // Reuse styling for consistency

        const title = document.createElement('h3');
        title.textContent = example.title;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = example.description; // Allows HTML content

        // Find the placeholder and replace it if it exists
        const visPlaceholder = descriptionDiv.querySelector('.graph-visualization');
        if (visPlaceholder) {
            visPlaceholder.id = `vis-${example.title.replace(/\s+/g, '-')}`; // Give it a unique ID
            visPlaceholder.textContent = ''; // Clear placeholder text
            visPlaceholder.style.height = '250px'; // Give it some height
            visPlaceholder.style.backgroundColor = 'var(--card-bg)'; // Match card background

             // Add specific visualizations for examples
            if (example.title.startsWith("Tidsplanering")) {
                 setTimeout(() => { // Delay rendering slightly to ensure DOM is ready
                    createVisualization(visPlaceholder,
                        [
                            {id: 1, label: 'Start'},
                            {id: 2, label: 'Grund Klar'},
                            {id: 3, label: 'Väggar Resta'},
                            {id: 4, label: 'Tak Lagt'},
                            {id: 5, label: 'Slut'}
                        ],
                        [
                            {from: 1, to: 2, label: 'Gjuta Grund (5d)', arrows: 'to'},
                            {from: 2, to: 3, label: 'Resa Väggar (7d)', arrows: 'to'},
                            {from: 3, to: 4, label: 'Lägga Tak (4d)', arrows: 'to'},
                            {from: 4, to: 5, label: 'Interna Jobb (6d)', arrows: 'to'},
                            // Example parallel path
                            {from: 2, to: 4, label: 'Rördragning (8d)', arrows: 'to'}
                        ],
                         { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: true } }, font: { align: 'top' } } } // Directed edges with labels
                    );
                 }, 100);
            }
            // Add other example visualizations here later (Radbrytning, Instant Insanity)

        }


        card.appendChild(title);
        card.appendChild(descriptionDiv);


        return card;
    }


    // --- Populate Definitions Section ---
    if (definitionsSection) {
        // Clear placeholder content if any
        definitionsSection.innerHTML = '<h2>Definitioner och Förklaringar</h2>';

        graphData.definitions.forEach(category => {
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.category;
            definitionsSection.appendChild(categoryTitle);

            category.terms.forEach(term => {
                const termCard = createTermCard(term);
                definitionsSection.appendChild(termCard);
            });
        });
    } else {
        console.error("Element with ID 'definitions' not found.");
    }

     // --- Populate Modeling Examples Section ---
    if (modelingSection) {
        // Clear placeholder content if any
        modelingSection.innerHTML = '<h2>Exempel på Modellering med Grafer</h2>';

        graphData.modelingExamples.forEach(example => {
            const exampleCard = createModelingCard(example);
            modelingSection.appendChild(exampleCard);
        });
    } else {
        console.error("Element with ID 'modeling-examples' not found.");
    }

}); // End DOMContentLoaded
