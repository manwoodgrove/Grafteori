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

    // --- DOM Elements (Check for existence) ---
    const overviewSection = document.getElementById('overview'); // For index.html
    const generellaTermerSection = document.getElementById('generella-termer-content');
    const nodsGradSection = document.getElementById('nods-grad-content');
    const forflyttaGrafSection = document.getElementById('forflytta-graf-content');
    const komplettaBipartitaSection = document.getElementById('kompletta-bipartita-content');
    const kanttyperVariationerSection = document.getElementById('kanttyper-variationer-content');
    const eulerHamiltonSection = document.getElementById('euler-hamilton-content');
    const permutationerKombinationerSection = document.getElementById('permutationer-kombinationer-content');
    const modelingSection = document.getElementById('modeling-examples'); // For examples.html

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
            keyboard: true,
            dragNodes: false // Ensure node dragging is disabled
        },
        layout: {
            randomSeed: undefined,
            improvedLayout:true,
        }
    };

    // --- Function to Create Vis Network Visualization ---
    function createVisualization(container, nodes, edges, options = defaultVisOptions) {
        // Check if vis library is loaded
        if (typeof vis === 'undefined') {
            console.error("Vis.js library not loaded!");
            container.innerHTML = '<p style="color: red;">Error: Visualiseringsbibliotek kunde inte laddas.</p>';
            return null;
        }
        try {
            const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
            // Ensure container is empty before creating new network
            container.innerHTML = '';
            const network = new vis.Network(container, data, options);
            return network; // Return the network object if needed later
        } catch (error) {
            console.error("Error creating Vis network:", error);
            container.innerHTML = '<p style="color: red;">Error: Kunde inte skapa visualisering.</p>';
            return null;
        }
    }


    // --- Function to Create Term Cards (Corrected Version) ---
    function createTermCard(term) {
        const card = document.createElement('div');
        card.className = 'term-card';

        const title = document.createElement('h4'); // Use a heading for better structure
        title.className = 'term-title';
        title.innerHTML = term.name; // Use innerHTML to render potential formatting like <sub>
        // title.style.cursor = 'pointer'; // REMOVED - No longer clickable for toggle

        const definition = document.createElement('div');
        definition.className = 'term-definition'; // Class is now used only for styling, not visibility toggle
        definition.innerHTML = term.definition; // Use innerHTML for lists, etc.
        // Definition is now visible by default due to CSS changes later

        card.appendChild(title);
        card.appendChild(definition);

        // Add visualization placeholder
        const visContainer = document.createElement('div');
        visContainer.className = 'graph-visualization'; // Use existing style for now
        visContainer.style.height = '250px'; // INCREASED height for term cards
        visContainer.style.display = 'none'; // Hide initially, show only if visualization is created
        card.appendChild(visContainer);

        // --- Create Visualization Immediately ---
        // No click listener needed anymore
        let visualizationCreated = false; // Flag to track if vis was made
        try { // Add try...catch around visualization creation
            if (term.name.startsWith("Graf (Graph)")) {
                createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}]
                );
                visualizationCreated = true;
            } else if (term.name.startsWith("Kant (Edge) / Båge (Arc)")) {
                 createVisualization(visContainer,
                    [{id: 1, label: 'Nod 1'}, {id: 2, label: 'Nod 2'}],
                    [
                        {id: 'e1', from: 1, to: 2, label: 'Kant (Edge)'}, // Undirected (default)
                        {id: 'a1', from: 2, to: 1, label: 'Båge (Arc)', arrows: 'to'} // Directed
                    ],
                    { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, font: { align: 'top' } } } // Add edge labels
                );
                 visualizationCreated = true;
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

                if (network) { // Check if network was created successfully
                    // Get the actual data object used by this specific network instance
                    const networkData = network.body.data;

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
                    degreeDisplay.innerHTML = '&nbsp;'; // Initialize with space to prevent layout shifts
                    visContainer.appendChild(degreeDisplay);

                    network.on("click", function (params) {
                        degreeDisplay.innerHTML = '&nbsp;'; // Clear previous, keep space
                        if (params.nodes.length > 0) {
                            const nodeId = params.nodes[0];
                            // Fix the node position to prevent dragging/stickiness
                            network.storePositions();

                            const connectedEdges = network.getConnectedEdges(nodeId);
                            let degree = 0;
                            let inDegree = 0;
                            let outDegree = 0;

                            // Use for...of loop to allow 'continue' safely
                            for (const edgeId of connectedEdges) {
                                const edge = networkData.edges.get(edgeId); // Use networkData here
                                if (!edge) {
                                    console.warn(`Edge data not found for ID: ${edgeId}`);
                                    continue; // Skip if edge somehow doesn't exist
                                }

                                if (edge.from === edge.to && edge.from === nodeId) { // Loop
                                    degree += 2; // Loop counts as 2 for undirected degree
                                    // For directed graphs, a loop could be considered 1 in-degree and 1 out-degree
                                    if (isDirected) {
                                        inDegree++;
                                        outDegree++;
                                    }
                                } else if (edge.from === nodeId) { // Edge originates from node (outgoing)
                                    if (!isDirected) degree++; // Only count once for undirected
                                    outDegree++;
                                } else if (edge.to === nodeId) { // Edge points to node (incoming)
                                    if (!isDirected) degree++; // Count for undirected degree (also counts incoming)
                                    inDegree++;
                                }
                            } // End for...of loop

                            const nodeData = networkData.nodes.get(nodeId); // Get node data safely
                            const nodeLabel = nodeData?.label || nodeId; // Get label safely

                            if (isDirected) {
                                degreeDisplay.innerHTML = `Nod ${nodeLabel}: Ingrad = ${inDegree}, Utgrad = ${outDegree}`;
                            } else {
                                degreeDisplay.innerHTML = `Nod ${nodeLabel}: Grad = ${degree}`;
                            }
                        }
                    });
                    visualizationCreated = true;
                } // End if(network)
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

                if (network) { // Check if network was created successfully
                    const networkData = network.body.data; // Get data for this instance
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

                        let statusText = `<b>Vandring:</b> ${currentWalkNodes.map(id => networkData.nodes.get(id)?.label || id).join(' → ')}<br>`; // Use networkData
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
                            // Fix the node position to prevent dragging/stickiness
                            network.storePositions();

                            if (lastNodeId === null) { // Starting a new walk
                                currentWalkNodes = [clickedNodeId];
                                currentWalkEdges = [];
                                lastNodeId = clickedNodeId;
                            } else {
                                // Find edge connecting lastNodeId and clickedNodeId
                                const connectingEdgeIds = network.getConnectedEdges(lastNodeId);
                                let edgeFoundId = null;
                                for(const edgeId of connectingEdgeIds) {
                                    const edge = networkData.edges.get(edgeId); // Use networkData
                                    if (!edge) continue;
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
                                    statusDisplay.innerHTML = `<span style="color: orange;">Kan inte gå direkt från ${networkData.nodes.get(lastNodeId)?.label || lastNodeId} till ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId}.</span>`; // Use networkData
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

                    visualizationCreated = true;
                } // End if(network)
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
                 visualizationCreated = true;
             } else if (term.name.startsWith("Komplementgraf")) {
                // Original Graph (e.g., a path graph P4)
                const originalNodes = [ {id: 1, label: '1'}, {id: 2, label: '2'}, {id: 3, label: '3'}, {id: 4, label: '4'} ];
                const originalEdges = [ {from: 1, to: 2}, {from: 2, to: 3}, {from: 3, to: 4} ];

                // Complement Graph Edges (all pairs *not* in originalEdges)
                const complementEdges = [];
                const existingEdgesSet = new Set(originalEdges.map(e => `${Math.min(e.from, e.to)}-${Math.max(e.from, e.to)}`));
                for (let i = 1; i <= originalNodes.length; i++) {
                    for (let j = i + 1; j <= originalNodes.length; j++) {
                        if (!existingEdgesSet.has(`${i}-${j}`)) {
                            complementEdges.push({ from: i, to: j, color: { color: '#e74c3c', highlight: '#c0392b' }, dashes: true }); // Red dashed edges for complement
                        }
                    }
                }

                // Combine original edges (styled differently) and complement edges
                const combinedEdges = [
                    ...originalEdges.map(e => ({ ...e, color: { color: '#bdc3c7', highlight: '#95a5a6' }, width: 1 })), // Grey thin edges for original
                    ...complementEdges
                ];

                const network = createVisualization(visContainer, originalNodes, combinedEdges);
                 if (network) {
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Originalgrafens kanter (grå). Komplementgrafens kanter (röda, streckade) är de som *saknas* i originalet för att göra den komplett.';
                    visContainer.appendChild(explanation);
                 }
                visualizationCreated = true;
             } else if (term.name.startsWith("Delgraf")) {
                 // Original Graph G
                 const originalNodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ];
                 const originalEdges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 3}, {id: 'e3', from: 2, to: 3}, {id: 'e4', from: 3, to: 4}, {id: 'e5', from: 4, to: 5}, {id: 'e6', from: 5, to: 3} ];

                 // Subgraph H (Nodes V' = {1, 2, 3, 4}, Edges E' = {e1, e2, e3, e4})
                 const subNodes = [
                     {id: 1, label: 'A', color: { background: '#d1e9ff', border: '#2c3e50'}}, // Highlight subgraph nodes
                     {id: 2, label: 'B', color: { background: '#d1e9ff', border: '#2c3e50'}},
                     {id: 3, label: 'C', color: { background: '#d1e9ff', border: '#2c3e50'}},
                     {id: 4, label: 'D', color: { background: '#d1e9ff', border: '#2c3e50'}},
                     {id: 5, label: 'E'} // Node not in subgraph
                 ];
                 const subEdges = [
                     {id: 'e1', from: 1, to: 2, color: defaultVisOptions.edges.color.highlight, width: 3}, // Highlight subgraph edges
                     {id: 'e2', from: 1, to: 3, color: defaultVisOptions.edges.color.highlight, width: 3},
                     {id: 'e3', from: 2, to: 3, color: defaultVisOptions.edges.color.highlight, width: 3},
                     {id: 'e4', from: 3, to: 4, color: defaultVisOptions.edges.color.highlight, width: 3},
                     {id: 'e5', from: 4, to: 5}, // Edge not in subgraph (connects to node outside V')
                     {id: 'e6', from: 5, to: 3}  // Edge not in subgraph (connects to node outside V')
                 ];

                 const network = createVisualization(visContainer, subNodes, subEdges);
                  if (network) {
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Den markerade delen (noder A, B, C, D och deras inbördes kanter) är en delgraf till hela grafen.';
                    visContainer.appendChild(explanation);
                 }
                 visualizationCreated = true;
             } else if (term.name.startsWith("Bipartit Graf") && !term.name.startsWith("Komplett Bipartit Graf")) { // Ensure it doesn't match Komplett Bipartit
                 const m = 3; // Size of set U
                 const n = 2; // Size of set W
                 const nodes = [];
                 // Nodes in set U (Group 0) - Assign level 0 for hierarchy
                 for (let i = 1; i <= m; i++) {
                     nodes.push({ id: `U${i}`, label: `U${i}`, group: 0, level: 0 });
                 }
                 // Nodes in set W (Group 1) - Assign level 1 for hierarchy
                 for (let i = 1; i <= n; i++) {
                     nodes.push({ id: `W${i}`, label: `W${i}`, group: 1, level: 1 });
                 }
                 const edges = [ // Example edges (not necessarily complete bipartite)
                    { from: 'U1', to: 'W1' },
                    { from: 'U2', to: 'W1' }, { from: 'U2', to: 'W2' },
                    { from: 'U3', to: 'W2' }
                 ];
                 // Add specific options for bipartite layout using hierarchical layout
                 const bipartiteOptions = {
                     ...defaultVisOptions,
                     nodes: {
                         ...defaultVisOptions.nodes,
                         shape: 'box',
                         color: undefined, // Let groups define color
                     },
                     edges: {
                         ...defaultVisOptions.edges,
                         arrows: { to: { enabled: false } } // Ensure no arrows for bipartite
                     },
                     physics: false, // Disable physics for hierarchical layout
                     groups: {
                         0: { color: { background: '#f1c40f', border: '#e67e22' }, font: { color: '#333'} }, // Yellow for U
                         1: { color: { background: '#3498db', border: '#2980b9' }, font: { color: '#fff'} }  // Blue for W
                     },
                     layout: {
                         hierarchical: {
                            enabled: true,
                            direction: 'LR', // Left to Right layout
                            sortMethod: 'hubsize', // Arrange nodes within levels
                            levelSeparation: 200, // Increase separation between U and W
                            nodeSpacing: 100 // Spacing between nodes in the same level
                         }
                     }
                 };
                 const network = createVisualization(visContainer, nodes, edges, bipartiteOptions);
                 if (network) {
                    const explanation = document.createElement('p'); // Explanation specific to non-complete bipartite
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Bipartit graf: Noderna är indelade i två grupper (U: Gula, W: Blå). Kanter går endast <i>mellan</i> grupperna.';
                    visContainer.appendChild(explanation);
                 }
                 visualizationCreated = true;
             } else if (term.name.startsWith("Komplett Bipartit Graf")) { // K_m,n
                 const m = 3; // Size of set U
                 const n = 2; // Size of set W
                 const nodes = [];
                 // Nodes in set U (Group 0) - Assign level 0
                 for (let i = 1; i <= m; i++) {
                     nodes.push({ id: `U${i}`, label: `U${i}`, group: 0, level: 0 });
                 }
                 // Nodes in set W (Group 1) - Assign level 1
                 for (let i = 1; i <= n; i++) {
                     nodes.push({ id: `W${i}`, label: `W${i}`, group: 1, level: 1 });
                 }
                 // Edges: Connect *every* node in U to *every* node in W
                 const edges = [];
                 for (let i = 1; i <= m; i++) {
                     for (let j = 1; j <= n; j++) {
                         edges.push({ from: `U${i}`, to: `W${j}` });
                     }
                 }
                 // Use the same bipartite options as before
                 const completeBipartiteOptions = {
                     ...defaultVisOptions,
                     nodes: { ...defaultVisOptions.nodes, shape: 'box', color: undefined },
                     edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: false } } },
                     physics: false,
                     groups: {
                         0: { color: { background: '#f1c40f', border: '#e67e22' }, font: { color: '#333'} },
                         1: { color: { background: '#3498db', border: '#2980b9' }, font: { color: '#fff'} }
                     },
                     layout: {
                         hierarchical: { enabled: true, direction: 'LR', sortMethod: 'hubsize', levelSeparation: 200, nodeSpacing: 100 }
                     }
                 };
                 const network = createVisualization(visContainer, nodes, edges, completeBipartiteOptions);
                 if (network) {
                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = `Komplett Bipartit Graf (K<sub>${m},${n}</sub>): Varje nod i U (gul) är kopplad till varje nod i W (blå).`;
                    visContainer.appendChild(explanation);
                 }
                 visualizationCreated = true;
             } else if (term.name.startsWith("Multipla Kanter")) { /* ... (Multipla Kanter logic) ... */
                createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}],
                    [{from: 1, to: 2}, {from: 1, to: 2}, {from: 1, to: 2}] // Multiple edges
                );
                visualizationCreated = true;
             } else if (term.name.startsWith("Ögla (Loop)")) { /* ... (Ögla logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}],
                    [{from: 1, to: 1}, {from: 1, to: 2}] // Loop on A
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Multigraf")) { /* ... (Multigraf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [
                        {from: 1, to: 1}, // Loop
                        {from: 1, to: 2}, {from: 1, to: 2}, // Multiple edges
                        {from: 2, to: 3}
                    ]
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Enkel Graf")) { /* ... (Enkel Graf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [{from: 1, to: 2}, {from: 2, to: 3}] // No loops or multiple edges
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Riktad Graf")) { /* ... (Riktad Graf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [
                        {from: 1, to: 2, arrows: 'to'},
                        {from: 1, to: 3, arrows: 'to'},
                        {from: 3, to: 2, arrows: 'to'}
                    ],
                     { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: true } } } }
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Oriktad Graf")) { /* ... (Oriktad Graf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}] // Default is undirected
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Eulerväg") || term.name.startsWith("Eulerkrets")) { /* ... (Euler logic) ... */
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

                if (network) { // Check if network was created successfully
                    const networkData = network.body.data; // Get data for this instance
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
                            const edge = networkData.edges.get(clickedEdgeId); // Use networkData
                            if (!edge) return; // Edge might not exist

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
                                    statusDisplay.innerHTML = `<span style="color: orange;">Kanten ansluter inte till föregående nod (${networkData.nodes.get(lastNode)?.label || lastNode}).</span>`; // Use networkData
                                    return;
                                }
                                currentPathNodes.push(nextNode);
                                lastNode = nextNode;
                            }

                            visitedEdges.add(clickedEdgeId);

                            // Highlight visited edges differently
                            let updatedEdges = networkData.edges.get({ // Use networkData
                                filter: function (item) {
                                    return visitedEdges.has(item.id);
                                }
                            });
                            updatedEdges.forEach(e => {
                                e.color = { color: '#2ecc71', highlight: '#27ae60' }; // Green for visited
                                e.width = 3;
                            });
                            networkData.edges.update(updatedEdges); // Use networkData

                            updateEulerStatus();

                        } else if (params.nodes.length > 0 && lastNode === null) {
                             // Allow starting by clicking a node first
                             lastNode = params.nodes[0];
                             currentPathNodes = [lastNode];
                             statusDisplay.innerHTML = `Startar vid nod ${networkData.nodes.get(lastNode)?.label || lastNode}. Välj en anslutande kant.`; // Use networkData
                        }
                    });

                     // Reset on right-click
                    visContainer.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        visitedEdges.clear();
                        currentPathNodes = [];
                        lastNode = null;
                        // Reset edge colors/widths
                        let allEdges = networkData.edges.get(); // Use networkData
                         allEdges.forEach(e => {
                            e.color = { color: '#3498db', highlight: '#2ecc71' }; // Reset to default blue
                            e.width = 2;
                        });
                        networkData.edges.update(allEdges); // Use networkData
                        statusDisplay.innerHTML = 'Försök nollställt.';
                    });

                    visualizationCreated = true;
                } // End if(network)
             } else if (term.name.startsWith("Hamiltonstig") || term.name.startsWith("Hamiltoncykel")) { /* ... (Hamilton logic) ... */
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

                if (network) { // Check if network was created successfully
                    const networkData = network.body.data; // Get data for this instance
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

                        const pathString = currentHamiltonPathNodes.map(id => networkData.nodes.get(id)?.label || id).join(' → '); // Use networkData
                        let message = `<b>Aktuell stig:</b> ${pathString}<br>`;
                        let isHamiltonPath = false;
                        let isHamiltonCycle = false;

                        // Check if all nodes are visited exactly once (except possibly start/end for cycle)
                        if (visitedNodesSet.size === totalNodes) {
                             // Check if it forms a cycle
                             if (currentHamiltonPathNodes.length === totalNodes + 1 && currentHamiltonPathNodes[0] === currentHamiltonPathNodes[totalNodes]) {
                                 // Need to verify the last edge exists
                                 const lastEdgeExists = networkData.edges.get({ // Use networkData
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
                            // Fix the node position to prevent dragging/stickiness
                            network.storePositions();

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
                                    statusDisplay.innerHTML = `<span style="color: red;">Nod ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId} redan besökt!</span>`; // Use networkData
                                    return;
                                }
                            }

                            // Check if there is an edge between last node and clicked node
                            const connectingEdges = networkData.edges.get({ // Use networkData
                                filter: item => (item.from === lastNodeId && item.to === clickedNodeId) || (item.to === lastNodeId && item.from === clickedNodeId)
                            });

                            if (connectingEdges.length === 0) {
                                statusDisplay.innerHTML = `<span style="color: orange;">Ingen kant mellan ${networkData.nodes.get(lastNodeId)?.label || lastNodeId} och ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId}.</span>`; // Use networkData
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

                    visualizationCreated = true;
                } // End if(network)
             } else if (term.name.startsWith("Permutation")) {
                 // Non-graphical example
                 visContainer.style.display = 'block'; // Show the container
                 visContainer.style.textAlign = 'left';
                 visContainer.style.padding = '10px';
                 visContainer.innerHTML = `
                    <p>Exempel: Permutationer av {A, B, C}</p>
                    <ul>
                        <li>ABC</li>
                        <li>ACB</li>
                        <li>BAC</li>
                        <li>BCA</li>
                        <li>CAB</li>
                        <li>CBA</li>
                    </ul>
                    <p>Antal = 3! = 6</p>
                    <p>Exempel: P(4, 2) - Permutationer av 2 element från {A, B, C, D}</p>
                    <ul>
                        <li>AB, AC, AD</li>
                        <li>BA, BC, BD</li>
                        <li>CA, CB, CD</li>
                        <li>DA, DB, DC</li>
                    </ul>
                     <p>Antal = 4! / (4-2)! = 24 / 2 = 12</p>
                 `;
                 visualizationCreated = true;
             } else if (term.name.startsWith("Permutation") || term.name.startsWith("Kombination")) {
                 const isPermutation = term.name.startsWith("Permutation");
                 const termId = isPermutation ? 'perm' : 'comb'; // Unique ID prefix

                 visContainer.style.display = 'block';
                 visContainer.style.height = 'auto'; // Auto height
                 visContainer.classList.remove('graph-visualization'); // Remove graph styles
                 visContainer.classList.add('perm-comb-container'); // Add specific container class

                 // --- HTML Structure ---
                 visContainer.innerHTML = `
                    <div class="pc-controls">
                        <label for="elements-${termId}">Element (kommaseparerade):</label>
                        <input type="text" id="elements-${termId}" value="A,B,C,D">
                        <label for="k-input-${termId}">k (antal att välja):</label>
                        <input type="number" id="k-input-${termId}" value="2" min="0" step="1">
                        <button id="calc-btn-${termId}">Visualisera ${isPermutation ? 'Permutationer' : 'Kombinationer'}</button>
                    </div>
                    <div class="pc-explanation">
                        <p><strong>Formel:</strong> ${isPermutation ? 'P(n, k) = n! / (n-k)!' : 'C(n, k) = n! / (k! * (n-k)!)'}</p>
                        <p>${isPermutation ? 'Permutationer handlar om <strong>ordnade</strong> arrangemang.' : 'Kombinationer handlar om <strong>oordnade</strong> urval (grupper).'}</p>
                    </div>
                    <div id="result-output-${termId}" class="pc-output">
                        <p>Ange element och k, klicka sedan på knappen.</p>
                    </div>
                    <div id="visualizer-${termId}" class="pc-visualizer">
                        <!-- Visualization will be generated here -->
                    </div>
                 `;

                 // --- Get Elements ---
                 const elementsInput = visContainer.querySelector(`#elements-${termId}`);
                 const kInput = visContainer.querySelector(`#k-input-${termId}`);
                 const calcBtn = visContainer.querySelector(`#calc-btn-${termId}`);
                 const resultOutput = visContainer.querySelector(`#result-output-${termId}`);
                 const visualizer = visContainer.querySelector(`#visualizer-${termId}`);

                 // --- Helper Functions ---
                 function factorial(num) {
                    if (num < 0) return NaN;
                    if (num === 0) return 1;
                    let result = 1;
                    for (let i = 2; i <= num; i++) result *= i;
                    return result;
                 }

                 function permutations(n, k) {
                    if (k < 0 || k > n) return 0;
                    if (k === 0) return 1;
                    const factN = factorial(n);
                    const factNK = factorial(n - k);
                    if (isNaN(factN) || isNaN(factNK) || factNK === 0) return Infinity; // Handle large numbers / division by zero
                    return factN / factNK;
                 }

                 function combinations(n, k) {
                    if (k < 0 || k > n) return 0;
                    if (k === 0 || k === n) return 1;
                    if (k > n / 2) k = n - k; // Optimization
                    const factN = factorial(n);
                    const factK = factorial(k);
                    const factNK = factorial(n - k);
                    if (isNaN(factN) || isNaN(factK) || isNaN(factNK) || factK === 0 || factNK === 0) return Infinity;
                    // Calculate C(n,k) as P(n,k) / k! to avoid large intermediate numbers where possible
                    let res = 1;
                     for(let i = 0; i < k; i++) {
                         res = res * (n - i) / (i + 1);
                     }
                     return res;
                    // return permutations(n, k) / factorial(k); // Original less stable way
                 }

                 function generateCombinations(elements, k) {
                    if (k < 0 || k > elements.length) return [];
                    if (k === 0) return [[]];
                    if (elements.length === 0) return [];

                    const firstElement = elements[0];
                    const rest = elements.slice(1);

                    const combsWithoutFirst = generateCombinations(rest, k);
                    const combsWithFirst = generateCombinations(rest, k - 1).map(comb => [firstElement, ...comb].sort()); // Keep sorted for consistency

                    return [...combsWithFirst, ...combsWithoutFirst];
                 }

                 function generatePermutations(elements, k) {
                    if (k < 0 || k > elements.length) return [];
                    if (k === 0) return [[]];
                    if (elements.length === 0) return [];

                    let perms = [];
                    for (let i = 0; i < elements.length; i++) {
                        const currentElement = elements[i];
                        const remainingElements = [...elements.slice(0, i), ...elements.slice(i + 1)];
                        const subPermutations = generatePermutations(remainingElements, k - 1);
                        subPermutations.forEach(subPerm => {
                            perms.push([currentElement, ...subPerm]);
                        });
                    }
                    return perms;
                 }

                 // --- Update Function ---
                 function updateVisualization() {
                     const elementsStr = elementsInput.value.trim();
                     const elements = elementsStr ? elementsStr.split(',').map(el => el.trim()).filter(el => el) : [];
                     const k = parseInt(kInput.value, 10);
                     const n = elements.length;

                     resultOutput.innerHTML = ''; // Clear previous results
                     visualizer.innerHTML = ''; // Clear previous visualization

                     if (elements.length === 0) {
                         resultOutput.innerHTML = '<span style="color: orange;">Ange minst ett element.</span>';
                         return;
                     }
                     if (isNaN(k) || k < 0) {
                         resultOutput.innerHTML = '<span style="color: red;">Ange ett giltigt positivt heltal för k.</span>';
                         return;
                     }
                     if (k > n) {
                         resultOutput.innerHTML = '<span style="color: red;">k kan inte vara större än n (antal element).</span>';
                         return;
                     }

                     let resultValue;
                     let results = [];
                     const MAX_DISPLAY_ITEMS = 30; // Limit number of items to display

                     if (isPermutation) {
                         resultValue = permutations(n, k);
                         resultOutput.innerHTML = `Antal permutationer P(${n}, ${k}) = <strong>${resultValue}</strong>`;
                         visualizer.innerHTML = '<h4>Exempel på Permutationer (ordnade sekvenser):</h4>'; // Set header first

                         // Generate and display only if the count is manageable and positive
                         if (resultValue > 0 && resultValue <= MAX_DISPLAY_ITEMS) {
                             results = generatePermutations(elements, k);
                             const list = document.createElement('div');
                             list.className = 'pc-results-list';
                             // Ensure results is an array before iterating
                             if (Array.isArray(results) && results.length > 0) {
                                 results.forEach(p => {
                                     const itemDiv = document.createElement('div');
                                     itemDiv.className = 'perm-item'; // Use specific class for permutations
                                     // Ensure p is an array before iterating
                                     if(Array.isArray(p)) {
                                         p.forEach(el => {
                                             const span = document.createElement('span'); // Style each element
                                             span.textContent = el;
                                             itemDiv.appendChild(span);
                                         });
                                     }
                                     list.appendChild(itemDiv);
                                 });
                                 visualizer.appendChild(list); // Append list only if results exist and were processed
                             } else {
                                 visualizer.innerHTML += `<p>Kunde inte generera exempel (resultat var tomt eller ogiltigt).</p>`;
                             }
                         } else if (resultValue > MAX_DISPLAY_ITEMS) {
                             visualizer.innerHTML += `<p>(För ${resultValue} permutationer att visualisera här)</p>`;
                         } else { // resultValue is 0, NaN, or Infinity
                             visualizer.innerHTML += `<p>Inga permutationer att visa för dessa indata (n=${n}, k=${k}).</p>`;
                         }
                     } else { // Combination
                         resultValue = combinations(n, k);
                         resultOutput.innerHTML = `Antal kombinationer C(${n}, ${k}) = <strong>${resultValue}</strong>`;
                          if (resultValue > 0 && resultValue <= MAX_DISPLAY_ITEMS) {
                             // Generate unique combinations by sorting and using a Set
                             const rawCombs = generateCombinations(elements, k);
                             const uniqueCombs = [...new Set(rawCombs.map(comb => comb.sort().join(',')))].map(s => s.split(','));
                             results = uniqueCombs;

                             visualizer.innerHTML = '<h4>Exempel på Kombinationer (oordnade grupper):</h4>';
                             const list = document.createElement('div');
                             list.className = 'pc-results-list';
                             results.forEach(c => {
                                 const itemDiv = document.createElement('div');
                                 itemDiv.className = 'comb-group';
                                 itemDiv.textContent = `{ ${c.join(', ')} }`;
                                 list.appendChild(itemDiv);
                             });
                              visualizer.appendChild(list);
                         } else if (resultValue > MAX_DISPLAY_ITEMS) {
                             visualizer.innerHTML = `<p>(För ${resultValue} kombinationer att visualisera här)</p>`;
                         } else {
                              visualizer.innerHTML = `<p>Inga kombinationer att visa.</p>`;
                         }
                     }
                 }

                 // --- Event Listener ---
                 calcBtn.addEventListener('click', updateVisualization);

                 // --- Initial Calculation ---
                 updateVisualization(); // Run once on load

                 visualizationCreated = true; // Mark as done
             }
        } catch (error) {
             console.error(`Error creating visualization or interactive example for term "${term.name}":`, error);
             visContainer.innerHTML = '<p style="color: red;">Error: Kunde inte skapa visualisering för detta begrepp.</p>';
             visualizationCreated = true; // Mark as created to show the error message
        }

        // Show the container only if a visualization was actually created (or an error occurred)
        if (visualizationCreated) {
            visContainer.style.display = 'block';
        }

        // --- Visualization Logic (Restored and Fixed) ---
        try { // Add try...catch around visualization creation
            if (term.name.startsWith("Graf (Graph)")) {
                createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}]
                );
                visualizationCreated = true;
            } else if (term.name.startsWith("Kant (Edge) / Båge (Arc)")) {
                 createVisualization(visContainer,
                    [{id: 1, label: 'Nod 1'}, {id: 2, label: 'Nod 2'}],
                    [
                        {id: 'e1', from: 1, to: 2, label: 'Kant (Edge)'}, // Undirected (default)
                        {id: 'a1', from: 2, to: 1, label: 'Båge (Arc)', arrows: 'to'} // Directed
                    ],
                    { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, font: { align: 'top' } } } // Add edge labels
                );
                 visualizationCreated = true;
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

                if (network) { // Check if network was created successfully
                    const networkData = network.body.data; // Get data for this instance

                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em';
                    explanation.style.marginTop = '10px';
                    explanation.style.textAlign = 'center';
                    explanation.innerHTML = `Klicka på en nod för att se dess ${isDirected ? 'in/utgrad' : 'grad'}.`;
                    visContainer.appendChild(explanation);

                    const degreeDisplay = document.createElement('div');
                    degreeDisplay.style.marginTop = '5px';
                    degreeDisplay.style.textAlign = 'center';
                    degreeDisplay.style.fontWeight = 'bold';
                    degreeDisplay.innerHTML = '&nbsp;'; // Initialize with space
                    visContainer.appendChild(degreeDisplay);

                    network.on("click", function (params) {
                        degreeDisplay.innerHTML = '&nbsp;'; // Clear previous, keep space
                        if (params.nodes.length > 0) {
                            const nodeId = params.nodes[0];
                            network.storePositions(); // <-- FIX: Prevent sticky node

                            const connectedEdges = network.getConnectedEdges(nodeId);
                            let degree = 0;
                            let inDegree = 0;
                            let outDegree = 0;

                            for (const edgeId of connectedEdges) {
                                const edge = networkData.edges.get(edgeId);
                                if (!edge) continue;

                                if (edge.from === edge.to && edge.from === nodeId) { // Loop
                                    degree += 2;
                                    if (isDirected) { inDegree++; outDegree++; }
                                } else if (edge.from === nodeId) { // Outgoing
                                    if (!isDirected) degree++;
                                    outDegree++;
                                } else if (edge.to === nodeId) { // Incoming
                                    if (!isDirected) degree++; // Count incoming for undirected too
                                    inDegree++;
                                }
                            }

                            const nodeData = networkData.nodes.get(nodeId);
                            const nodeLabel = nodeData?.label || nodeId;

                            if (isDirected) {
                                degreeDisplay.innerHTML = `Nod ${nodeLabel}: Ingrad = ${inDegree}, Utgrad = ${outDegree}`;
                            } else {
                                degreeDisplay.innerHTML = `Nod ${nodeLabel}: Grad = ${degree}`;
                            }
                        }
                    });
                    visualizationCreated = true;
                }
             } else if (["Vandring (Walk)", "Väg (Path)", "Stig (Simple Path)", "Krets (Circuit)", "Cykel (Cycle)"].includes(term.name.split(" / ")[0])) {
                const nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ];
                const edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 3}, {id: 'e3', from: 2, to: 3}, {id: 'e4', from: 3, to: 4}, {id: 'e5', from: 4, to: 5}, {id: 'e6', from: 5, to: 3} ];
                const network = createVisualization(visContainer, nodes, edges);

                if (network) {
                    const networkData = network.body.data;
                    let currentWalkNodes = [];
                    let currentWalkEdges = [];
                    let lastNodeId = null;

                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Klicka på noder i följd för att bygga en vandring. Högerklicka för att nollställa.';
                    visContainer.appendChild(explanation);

                    const statusDisplay = document.createElement('div');
                    statusDisplay.style.marginTop = '5px'; statusDisplay.style.textAlign = 'center'; statusDisplay.style.minHeight = '4em';
                    visContainer.appendChild(statusDisplay);

                    function updateWalkStatus() { /* ... (rest of updateWalkStatus logic remains the same) ... */
                        statusDisplay.innerHTML = ''; // Clear previous
                        if (currentWalkNodes.length === 0) return;

                        let statusText = `<b>Vandring:</b> ${currentWalkNodes.map(id => networkData.nodes.get(id)?.label || id).join(' → ')}<br>`; // Use networkData
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
                            network.storePositions(); // <-- FIX: Prevent sticky node

                            if (lastNodeId === null) {
                                currentWalkNodes = [clickedNodeId]; currentWalkEdges = []; lastNodeId = clickedNodeId;
                            } else {
                                const connectingEdgeIds = network.getConnectedEdges(lastNodeId);
                                let edgeFoundId = null;
                                for(const edgeId of connectingEdgeIds) {
                                    const edge = networkData.edges.get(edgeId);
                                    if (!edge) continue;
                                    if ((edge.from === lastNodeId && edge.to === clickedNodeId) || (edge.to === lastNodeId && edge.from === clickedNodeId)) {
                                        edgeFoundId = edgeId; break;
                                    }
                                }
                                if (edgeFoundId) {
                                    currentWalkNodes.push(clickedNodeId); currentWalkEdges.push(edgeFoundId); lastNodeId = clickedNodeId;
                                } else {
                                    statusDisplay.innerHTML = `<span style="color: orange;">Kan inte gå direkt från ${networkData.nodes.get(lastNodeId)?.label || lastNodeId} till ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId}.</span>`;
                                    return;
                                }
                            }
                            network.unselectAll(); network.selectNodes(currentWalkNodes); network.selectEdges(currentWalkEdges);
                            updateWalkStatus();
                        }
                    });

                    visContainer.addEventListener('contextmenu', (e) => { /* ... (reset logic remains the same) ... */
                        e.preventDefault();
                        currentWalkNodes = [];
                        currentWalkEdges = [];
                        lastNodeId = null;
                        network.unselectAll();
                        statusDisplay.innerHTML = 'Vandring nollställd.';
                    });
                    visualizationCreated = true;
                }
             } else if (term.name.startsWith("Komplett Graf")) { /* ... (Komplett Graf logic) ... */
                const n = 5; // Example K5
                const nodes = Array.from({ length: n }, (_, i) => ({ id: i + 1, label: `v${i + 1}` }));
                const edges = [];
                for (let i = 1; i <= n; i++) {
                    for (let j = i + 1; j <= n; j++) {
                        edges.push({ from: i, to: j });
                    }
                }
                createVisualization(visContainer, nodes, edges, { ...defaultVisOptions, physics: { stabilization: { iterations: 200 } } }); // More iterations for complex layout
                visualizationCreated = true;
             } else if (term.name.startsWith("Bipartit Graf")) { /* ... (Bipartit Graf logic) ... */
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
                 visualizationCreated = true;
             } else if (term.name.startsWith("Multipla Kanter")) { /* ... (Multipla Kanter logic) ... */
                createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}],
                    [{from: 1, to: 2}, {from: 1, to: 2}, {from: 1, to: 2}] // Multiple edges
                );
                visualizationCreated = true;
             } else if (term.name.startsWith("Ögla (Loop)")) { /* ... (Ögla logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}],
                    [{from: 1, to: 1}, {from: 1, to: 2}] // Loop on A
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Multigraf")) { /* ... (Multigraf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [
                        {from: 1, to: 1}, // Loop
                        {from: 1, to: 2}, {from: 1, to: 2}, // Multiple edges
                        {from: 2, to: 3}
                    ]
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Enkel Graf")) { /* ... (Enkel Graf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [{from: 1, to: 2}, {from: 2, to: 3}] // No loops or multiple edges
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Riktad Graf")) { /* ... (Riktad Graf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [
                        {from: 1, to: 2, arrows: 'to'},
                        {from: 1, to: 3, arrows: 'to'},
                        {from: 3, to: 2, arrows: 'to'}
                    ],
                     { ...defaultVisOptions, edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: true } } } }
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Oriktad Graf")) { /* ... (Oriktad Graf logic) ... */
                 createVisualization(visContainer,
                    [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}],
                    [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}] // Default is undirected
                );
                 visualizationCreated = true;
             } else if (term.name.startsWith("Eulerväg") || term.name.startsWith("Eulerkrets")) { /* ... (Euler logic, no sticky node issue here as it tracks edges) ... */
                // Euler Path/Circuit Visualization
                const nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ];
                const edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 2}, {id: 'e3', from: 1, to: 3}, {id: 'e4', from: 1, to: 3}, {id: 'e5', from: 1, to: 4}, {id: 'e6', from: 2, to: 3}, {id: 'e7', from: 2, to: 3}, {id: 'e8', from: 3, to: 4} ];
                const totalEdges = edges.length;
                const network = createVisualization(visContainer, nodes, edges);

                if (network) {
                    const networkData = network.body.data;
                    let visitedEdges = new Set();
                    let currentPathNodes = [];
                    let lastNode = null;

                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Klicka på kanter i följd för att försöka hitta en Eulerväg/Eulerkrets. Högerklicka för att nollställa.';
                    visContainer.appendChild(explanation);

                    const statusDisplay = document.createElement('div');
                    statusDisplay.style.marginTop = '5px'; statusDisplay.style.textAlign = 'center'; statusDisplay.style.minHeight = '3em';
                    visContainer.appendChild(statusDisplay);

                    function updateEulerStatus() { /* ... (updateEulerStatus logic) ... */
                        statusDisplay.innerHTML = '';
                        const visitedCount = visitedEdges.size;
                        let message = `Besökta kanter: ${visitedCount} / ${totalEdges}. `;
                        let isEulerPath = false;
                        let isEulerCircuit = false;

                        if (visitedCount === totalEdges) {
                            if (currentPathNodes.length > 0) {
                                message += '<br><span style="color: var(--secondary-color);">Alla kanter besökta!</span> ';
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

                    network.on("click", function (params) { /* ... (Euler click logic) ... */
                        if (params.edges.length > 0) {
                            const clickedEdgeId = params.edges[0];
                            const edge = networkData.edges.get(clickedEdgeId);
                            if (!edge) return;

                            if (visitedEdges.has(clickedEdgeId)) {
                                statusDisplay.innerHTML = '<span style="color: red;">Kant redan besökt!</span>'; return;
                            }

                            let nextNode = null;
                            if (lastNode === null) {
                                lastNode = edge.from; nextNode = edge.to; currentPathNodes = [lastNode, nextNode];
                            } else {
                                if (edge.from === lastNode) { nextNode = edge.to; }
                                else if (edge.to === lastNode) { nextNode = edge.from; }
                                else { statusDisplay.innerHTML = `<span style="color: orange;">Kanten ansluter inte till föregående nod (${networkData.nodes.get(lastNode)?.label || lastNode}).</span>`; return; }
                                currentPathNodes.push(nextNode); lastNode = nextNode;
                            }
                            visitedEdges.add(clickedEdgeId);
                            let updatedEdges = networkData.edges.get({ filter: item => visitedEdges.has(item.id) });
                            updatedEdges.forEach(e => { e.color = { color: '#2ecc71', highlight: '#27ae60' }; e.width = 3; });
                            networkData.edges.update(updatedEdges);
                            updateEulerStatus();
                        } else if (params.nodes.length > 0 && lastNode === null) {
                             lastNode = params.nodes[0]; currentPathNodes = [lastNode];
                             statusDisplay.innerHTML = `Startar vid nod ${networkData.nodes.get(lastNode)?.label || lastNode}. Välj en anslutande kant.`;
                        }
                    });

                    visContainer.addEventListener('contextmenu', (e) => { /* ... (Euler reset logic) ... */
                        e.preventDefault();
                        visitedEdges.clear(); currentPathNodes = []; lastNode = null;
                        let allEdges = networkData.edges.get();
                        allEdges.forEach(e => { e.color = { color: '#3498db', highlight: '#2ecc71' }; e.width = 2; });
                        networkData.edges.update(allEdges);
                        statusDisplay.innerHTML = 'Försök nollställt.';
                    });
                    visualizationCreated = true;
                }
             } else if (term.name.startsWith("Hamiltonstig") || term.name.startsWith("Hamiltoncykel")) {
                const nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ];
                const edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 2, to: 3}, {id: 'e3', from: 3, to: 4}, {id: 'e4', from: 4, to: 5}, {id: 'e5', from: 5, to: 1}, {id: 'e6', from: 1, to: 3}, {id: 'e7', from: 2, to: 4}, {id: 'e8', from: 3, to: 5}, {id: 'e9', from: 4, to: 1}, {id: 'e10', from: 5, to: 2} ];
                const totalNodes = nodes.length;
                const network = createVisualization(visContainer, nodes, edges);

                if (network) {
                    const networkData = network.body.data;
                    let currentHamiltonPathNodes = [];
                    let currentHamiltonPathEdges = [];
                    let visitedNodesSet = new Set();

                    const explanation = document.createElement('p');
                    explanation.style.fontSize = '0.9em'; explanation.style.marginTop = '10px'; explanation.style.textAlign = 'center';
                    explanation.innerHTML = 'Klicka på noder i följd för att försöka hitta en Hamiltonstig/-cykel. Högerklicka för att nollställa.';
                    visContainer.appendChild(explanation);

                    const statusDisplay = document.createElement('div');
                    statusDisplay.style.marginTop = '5px'; statusDisplay.style.textAlign = 'center'; statusDisplay.style.minHeight = '3em';
                    visContainer.appendChild(statusDisplay);

                    function updateHamiltonStatus() { /* ... (updateHamiltonStatus logic) ... */
                        statusDisplay.innerHTML = '';
                        if (currentHamiltonPathNodes.length === 0) return;
                        const pathString = currentHamiltonPathNodes.map(id => networkData.nodes.get(id)?.label || id).join(' → ');
                        let message = `<b>Aktuell stig:</b> ${pathString}<br>`;
                        let isHamiltonPath = false;
                        let isHamiltonCycle = false;

                        if (visitedNodesSet.size === totalNodes) {
                             if (currentHamiltonPathNodes.length === totalNodes + 1 && currentHamiltonPathNodes[0] === currentHamiltonPathNodes[totalNodes]) {
                                 const lastEdgeExists = networkData.edges.get({ filter: item => (item.from === currentHamiltonPathNodes[totalNodes-1] && item.to === currentHamiltonPathNodes[totalNodes]) || (item.to === currentHamiltonPathNodes[totalNodes-1] && item.from === currentHamiltonPathNodes[totalNodes]) }).length > 0;
                                 if(lastEdgeExists) { isHamiltonCycle = true; message += '<span style="color: var(--secondary-color);">✓ Hamiltoncykel hittad!</span>'; }
                                 else { message += '<span style="color: red;">✗ Sista kanten saknas för cykel!</span>'; }
                             } else if (currentHamiltonPathNodes.length === totalNodes) {
                                 isHamiltonPath = true; message += '<span style="color: var(--secondary-color);">✓ Hamiltonstig hittad!</span>';
                             }
                        }
                        statusDisplay.innerHTML = message;
                        return { isHamiltonPath, isHamiltonCycle };
                    }

                    network.on("click", function (params) {
                        if (params.nodes.length > 0) {
                            const clickedNodeId = params.nodes[0];
                            network.storePositions(); // <-- FIX: Prevent sticky node

                            const lastNodeId = currentHamiltonPathNodes.length > 0 ? currentHamiltonPathNodes[currentHamiltonPathNodes.length - 1] : null;

                            if (lastNodeId === null) {
                                currentHamiltonPathNodes = [clickedNodeId]; visitedNodesSet.add(clickedNodeId); network.selectNodes([clickedNodeId]); updateHamiltonStatus(); return;
                            }

                            if (visitedNodesSet.has(clickedNodeId)) {
                                if (clickedNodeId === currentHamiltonPathNodes[0] && visitedNodesSet.size === totalNodes && currentHamiltonPathNodes.length === totalNodes) { /* Allow completing cycle */ }
                                else { statusDisplay.innerHTML = `<span style="color: red;">Nod ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId} redan besökt!</span>`; return; }
                            }

                            const connectingEdges = networkData.edges.get({ filter: item => (item.from === lastNodeId && item.to === clickedNodeId) || (item.to === lastNodeId && item.from === clickedNodeId) });
                            if (connectingEdges.length === 0) {
                                statusDisplay.innerHTML = `<span style="color: orange;">Ingen kant mellan ${networkData.nodes.get(lastNodeId)?.label || lastNodeId} och ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId}.</span>`; return;
                            }

                            currentHamiltonPathNodes.push(clickedNodeId); visitedNodesSet.add(clickedNodeId); currentHamiltonPathEdges.push(connectingEdges[0].id);
                            network.selectNodes(currentHamiltonPathNodes, false); network.selectEdges(currentHamiltonPathEdges);
                            updateHamiltonStatus();
                        }
                    });

                    visContainer.addEventListener('contextmenu', (e) => { /* ... (Hamilton reset logic) ... */
                        e.preventDefault();
                        currentHamiltonPathNodes = []; currentHamiltonPathEdges = []; visitedNodesSet.clear();
                        network.unselectAll(); statusDisplay.innerHTML = 'Försök nollställt.';
                    });
                    visualizationCreated = true;
                }
             }
        } catch (error) {
             console.error(`Error creating visualization for term "${term.name}":`, error);
             visContainer.innerHTML = '<p style="color: red;">Error: Kunde inte skapa visualisering för detta begrepp.</p>';
             visualizationCreated = true; // Mark as created to show the error message
        }

        // Show the container only if a visualization was actually created (or an error occurred)
        if (visualizationCreated) {
            visContainer.style.display = 'block';
        }

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
            } else if (example.title.startsWith("Radbrytning")) {
                 setTimeout(() => {
                    // Simplified visualization: Nodes are potential break points, edges are valid lines
                    const nodes = [
                        {id: 0, label: 'Start'}, {id: 1, label: 'Efter "ord1"'}, {id: 2, label: 'Efter "ord2"'},
                        {id: 3, label: 'Efter "ord3"'}, {id: 4, label: 'Efter "ord4"'}, {id: 5, label: 'Slut'}
                    ];
                    // Edges represent lines that fit within margins (example)
                    const edges = [
                        {from: 0, to: 2, label: '"ord1 ord2"', arrows: 'to'}, // Line 1 fits
                        {from: 0, to: 3, label: '"ord1 ord2 ord3"', arrows: 'to', color: {opacity:0.3}, dashes:true}, // Line too long (example)
                        {from: 2, to: 4, label: '"ord3 ord4"', arrows: 'to'}, // Line 2 fits
                        {from: 4, to: 5, label: '""', arrows: 'to'}, // End
                        // Alternative break
                         {from: 0, to: 1, label: '"ord1"', arrows: 'to'},
                         {from: 1, to: 3, label: '"ord2 ord3"', arrows: 'to'},
                         {from: 3, to: 5, label: '"ord4"', arrows: 'to'}
                    ];
                     const options = {
                        ...defaultVisOptions,
                        edges: { ...defaultVisOptions.edges, arrows: { to: { enabled: true } }, font: { align: 'middle', size: 10 } },
                        layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed' } },
                        physics: false
                    };
                    createVisualization(visPlaceholder, nodes, edges, options);
                    visPlaceholder.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Förenklad visualisering: Noder är brytpunkter, kanter är möjliga rader. Målet är kortaste vägen från Start till Slut.</p>');
                 }, 100);
            } else if (example.title.startsWith("Lösning av Instant Insanity")) {
                 setTimeout(() => {
                    // Nodes are colors
                    const colors = ['R', 'G', 'B', 'Y']; // Red, Green, Blue, Yellow
                    const nodes = colors.map((c, i) => ({id: c, label: c, x: Math.cos(i*2*Math.PI/4)*100, y: Math.sin(i*2*Math.PI/4)*100})); // Position in a circle

                    // Example edges for 4 cubes (Front/Back pairs only for simplicity)
                    // Cube 1: R-G, Cube 2: B-Y, Cube 3: R-B, Cube 4: G-Y
                    const edges = [
                        {from: 'R', to: 'G', label: 'K1', color: '#e74c3c'}, // Cube 1 - Red
                        {from: 'B', to: 'Y', label: 'K2', color: '#3498db'}, // Cube 2 - Blue
                        {from: 'R', to: 'B', label: 'K3', color: '#2ecc71'}, // Cube 3 - Green
                        {from: 'G', to: 'Y', label: 'K4', color: '#f1c40f'}  // Cube 4 - Yellow
                    ];
                     const options = {
                        ...defaultVisOptions,
                        physics: { enabled: false }, // Static layout
                        edges: { ...defaultVisOptions.edges, font: { align: 'top', size: 12, strokeWidth: 3, strokeColor: 'white' } }
                    };
                    createVisualization(visPlaceholder, nodes, edges, options);
                    visPlaceholder.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Visualisering av en graf (t.ex. Fram/Bak-sidor). Noder är färger, kanter representerar motsatta sidor på en kub.</p>');
                 }, 100);
            }
        }


        card.appendChild(title);
        card.appendChild(descriptionDiv);


        return card;
    }


    // --- Theme Toggle Functionality ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggleButton) themeToggleButton.textContent = '☀️'; // Sun icon for dark mode
    } else {
        body.classList.remove('dark-mode');
        if (themeToggleButton) themeToggleButton.textContent = '🌙'; // Moon icon for light mode
    }

    // Add event listener only if the button exists
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggleButton.textContent = '☀️';
            } else {
                 themeToggleButton.textContent = '🌙';
            }
            localStorage.setItem('theme', theme);
        });
    }


    // --- Content Population Logic ---

    // Find the main content section of the current page
    const mainContentSection = document.querySelector('main > section[id]'); // Find the first section with an ID within main

    if (mainContentSection) {
        const sectionId = mainContentSection.id;
        console.log("Found content section:", sectionId); // Debugging line

        // Determine which content to load based on the section ID
        switch (sectionId) {
            case 'overview':
                // Static content, nothing to load via JS
                break;
            case 'generella-termer-content':
                populateDefinitionCategory(mainContentSection, "Generella Termer");
                break;
            case 'nods-grad-content':
                populateDefinitionCategory(mainContentSection, "En Nods Grad (Degree of a Node)");
                break;
            case 'forflytta-graf-content':
                populateDefinitionCategory(mainContentSection, "Att Förflytta Sig i en Graf");
                break;
            case 'kompletta-bipartita-content':
                populateDefinitionCategory(mainContentSection, "Kompletta Grafer, Bipartita Grafer och Relaterade Begrepp");
                break;
            case 'kanttyper-variationer-content':
                populateDefinitionCategory(mainContentSection, "Kanttyper och Grafvariationer");
                break;
            case 'euler-hamilton-content':
                populateDefinitionCategory(mainContentSection, "Euler och Hamilton");
                break;
            case 'permutationer-kombinationer-content':
                populateDefinitionCategory(mainContentSection, "Permutationer och Kombinationer");
                break;
            case 'modeling-examples':
                // Populate Modeling Examples
                graphData.modelingExamples.forEach(example => {
                    const exampleCard = createModelingCard(example);
                    mainContentSection.appendChild(exampleCard);
                });
                break;
            default:
                console.warn("No specific content loading logic for section ID:", sectionId);
        }
    } else {
         console.error("Could not find main content section with an ID.");
    }

    // --- Helper function to populate a definition category ---
    function populateDefinitionCategory(sectionElement, categoryName) {
        const categoryData = graphData.definitions.find(cat => cat.category === categoryName);
        if (!categoryData) {
            console.error(`Category data not found for: ${categoryName}`);
            sectionElement.innerHTML += '<p style="color: red;">Error: Kunde inte ladda innehåll.</p>'; // User feedback
            return;
        }
        console.log("Populating category:", categoryName); // Debugging line

        // Clear potential placeholder comments/text *after* the H2 if needed
        // Example: Remove comment nodes or specific placeholder elements if they exist

        categoryData.terms.forEach(term => {
            const termCard = createTermCard(term);
            sectionElement.appendChild(termCard);
        });
    }


}); // End DOMContentLoaded
