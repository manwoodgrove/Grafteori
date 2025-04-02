document.addEventListener('DOMContentLoaded', () => {
    // --- Data Structure ---
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
        ] // End modelingExamples
    }; // End graphData

    // --- Vis Network Options ---
    const defaultVisOptions = {
        nodes: { shape: 'dot', size: 20, font: { size: 14, color: '#333' }, borderWidth: 2, color: { border: '#2c3e50', background: '#ffffff', highlight: { border: '#2c3e50', background: '#d1e9ff' }, hover: { border: '#2c3e50', background: '#eaf5ff' } } },
        edges: { width: 2, color: { color: '#3498db', highlight: '#2ecc71', hover: '#5fa8d3' }, arrows: { to: { enabled: false, scaleFactor: 1, type: 'arrow' } }, smooth: { enabled: true, type: "dynamic", roundness: 0.5 } },
        physics: { enabled: true, solver: 'barnesHut', barnesHut: { gravitationalConstant: -8000, centralGravity: 0.3, springLength: 95, springConstant: 0.04, damping: 0.09, avoidOverlap: 0.1 }, stabilization: { iterations: 150 } },
        interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, dragNodes: false }, // dragNodes: false is important!
        layout: { randomSeed: undefined, improvedLayout:true }
    };

    // --- Core Visualization Function ---
    function createVisualization(container, nodes, edges, options = defaultVisOptions) {
        if (typeof vis === 'undefined') {
            console.error("Vis.js library not loaded!");
            container.innerHTML = '<p style="color: red;">Error: Visualiseringsbibliotek kunde inte laddas.</p>';
            return null;
        }
        try {
            const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
            container.innerHTML = ''; // Clear container
            const network = new vis.Network(container, data, options);
            // Add a unique ID to the container for later reference
            const uniqueId = `vis-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
            container.id = uniqueId;
            console.log(`Created visualization with container ID: ${uniqueId}`); // Log container ID
            return network;
        } catch (error) {
            console.error("Error creating Vis network:", error);
            container.innerHTML = '<p style="color: red;">Error: Kunde inte skapa visualisering.</p>';
            return null;
        }
    }

    // --- Interaction Setup Functions ---

    function setupDegreeInteraction(visContainer, network, networkData, isDirected) {
        const explanation = document.createElement('p');
        explanation.style.cssText = 'font-size: 0.9em; margin-top: 10px; text-align: center;';
        explanation.innerHTML = `Klicka på en nod för att se dess ${isDirected ? 'in/utgrad' : 'grad'}.`;
        visContainer.appendChild(explanation);

        const degreeDisplay = document.createElement('div');
        const displayId = `degree-display-${visContainer.id}`;
        degreeDisplay.id = displayId;
        degreeDisplay.style.cssText = 'margin-top: 5px; text-align: center; font-weight: bold; min-height: 1.2em; color: #e74c3c !important;'; // Added explicit color for debugging
        degreeDisplay.innerHTML = '&nbsp;';
        visContainer.appendChild(degreeDisplay);

        console.log(`[Degree Interaction] Setup for container ${visContainer.id}, display ID ${displayId}`);

        network.on("click", function (params) {
            console.log(`[Degree Interaction] Click event fired on ${visContainer.id}. Params:`, params);
            const targetDisplay = document.getElementById(displayId);
            if (!targetDisplay) {
                console.error(`[Degree Interaction] Could not find display element with ID ${displayId}`);
                return;
            }
            targetDisplay.innerHTML = '&nbsp;';

            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                console.log(`[Degree Interaction] Node clicked: ${nodeId}`);
                network.storePositions();

                const connectedEdges = network.getConnectedEdges(nodeId);
                let degree = 0, inDegree = 0, outDegree = 0;

                for (const edgeId of connectedEdges) {
                    const edge = networkData.edges.get(edgeId);
                    if (!edge) continue;
                    if (edge.from === edge.to && edge.from === nodeId) { degree += 2; if (isDirected) { inDegree++; outDegree++; } }
                    else if (edge.from === nodeId) { if (!isDirected) degree++; outDegree++; }
                    else if (edge.to === nodeId) { if (!isDirected) degree++; inDegree++; }
                }
                const nodeLabel = networkData.nodes.get(nodeId)?.label || nodeId;
                const resultText = isDirected
                    ? `Nod ${nodeLabel}: Ingrad = ${inDegree}, Utgrad = ${outDegree}`
                    : `Nod ${nodeLabel}: Grad = ${degree}`;

                console.log(`[Degree Interaction] Calculated: ${resultText}`);
                targetDisplay.innerHTML = resultText; // Update the specific display element
                targetDisplay.style.color = 'var(--text-color)'; // Restore original color after update (or set explicitly)
            } else {
                 console.log("[Degree Interaction] Click was not on a node.");
            }
        });
    }

    function setupWalkInteraction(visContainer, network, networkData) {
        let currentWalkNodes = [];
        let currentWalkEdges = [];
        let lastNodeId = null;

        const explanation = document.createElement('p');
        explanation.style.cssText = 'font-size: 0.9em; margin-top: 10px; text-align: center;';
        explanation.innerHTML = 'Klicka på noder i följd för att bygga en vandring. Högerklicka för att nollställa.';
        visContainer.appendChild(explanation);

        const statusDisplay = document.createElement('div');
        const displayId = `walk-status-${visContainer.id}`;
        statusDisplay.id = displayId;
        statusDisplay.style.cssText = 'margin-top: 5px; text-align: center; min-height: 4em; color: #2980b9 !important;'; // Added explicit color for debugging
        visContainer.appendChild(statusDisplay);

        console.log(`[Walk Interaction] Setup for container ${visContainer.id}, display ID ${displayId}`);

        function updateWalkStatus() {
            const targetDisplay = document.getElementById(displayId);
            if (!targetDisplay) {
                console.error(`[Walk Interaction] Could not find display element with ID ${displayId} in updateWalkStatus`);
                return;
            }

            targetDisplay.innerHTML = '';
            if (currentWalkNodes.length === 0) return;

            let statusText = `<b>Vandring:</b> ${currentWalkNodes.map(id => networkData.nodes.get(id)?.label || id).join(' → ')}<br>`;
            let isPath = true, isSimplePath = true, isCircuit = false, isCycle = false;
            const visitedEdges = new Set();
            const visitedNodes = new Set();

            for (const edgeId of currentWalkEdges) { if (visitedEdges.has(edgeId)) { isPath = false; break; } visitedEdges.add(edgeId); }
            for (let i = 0; i < currentWalkNodes.length; i++) { const nodeId = currentWalkNodes[i]; if (visitedNodes.has(nodeId)) { if (i !== currentWalkNodes.length - 1 || nodeId !== currentWalkNodes[0]) { isSimplePath = false; } } visitedNodes.add(nodeId); }
            const isClosed = currentWalkNodes.length > 1 && currentWalkNodes[0] === currentWalkNodes[currentWalkNodes.length - 1];
            if (isClosed) {
                if (isPath) isCircuit = true;
                const intermediateNodes = currentWalkNodes.slice(1, -1); const intermediateSet = new Set(intermediateNodes);
                if (isPath && intermediateNodes.length === intermediateSet.size && !intermediateSet.has(currentWalkNodes[0])) { isCycle = true; isSimplePath = false; } else { isCycle = false; }
                 if (!isCycle) isSimplePath = false;
            } else { const pathNodesSet = new Set(currentWalkNodes); if(currentWalkNodes.length !== pathNodesSet.size) { isSimplePath = false; } }

            if (isCycle) statusText += '<span style="color: var(--secondary-color);">✓ Cykel</span><br>';
            else if (isCircuit) statusText += '<span style="color: var(--secondary-color);">✓ Krets</span><br>';
            if (isSimplePath && !isCycle) statusText += '<span style="color: var(--secondary-color);">✓ Stig (Simple Path)</span><br>';
            else if (isPath && !isCircuit) statusText += '<span style="color: var(--secondary-color);">✓ Väg (Path)</span><br>';
            else if (!isPath) statusText += '<span style="color: red;">✗ Inte en Väg (kant repeterad)</span><br>';
            if (!isSimplePath && !isCycle) statusText += '<span style="color: red;">✗ Inte en Stig (nod repeterad)</span><br>';

            console.log(`[Walk Interaction] Updating status on ${displayId}: ${statusText.replace(/<br>/g, ' ')}`);
            targetDisplay.innerHTML = statusText;
            targetDisplay.style.color = 'var(--text-color)'; // Restore original color after update
        }


        network.on("click", function (params) {
            console.log(`[Walk Interaction] Click event fired on ${visContainer.id}. Params:`, params);
            const targetDisplay = document.getElementById(displayId);
            if (!targetDisplay) { console.error(`[Walk Interaction] Could not find display element with ID ${displayId}`); return; }

            if (params.nodes.length > 0) {
                const clickedNodeId = params.nodes[0];
                console.log(`[Walk Interaction] Node clicked: ${clickedNodeId}`);
                network.storePositions();

                if (lastNodeId === null) {
                    currentWalkNodes = [clickedNodeId]; currentWalkEdges = []; lastNodeId = clickedNodeId;
                    console.log(`[Walk Interaction] Started walk at node ${clickedNodeId}`);
                } else {
                    const connectingEdgeIds = network.getConnectedEdges(lastNodeId); let edgeFoundId = null;
                    for (const edgeId of connectingEdgeIds) { const edge = networkData.edges.get(edgeId); if (!edge) continue; if ((edge.from === lastNodeId && edge.to === clickedNodeId) || (edge.to === lastNodeId && edge.from === clickedNodeId)) { edgeFoundId = edgeId; break; } }
                    if (edgeFoundId) {
                        currentWalkNodes.push(clickedNodeId); currentWalkEdges.push(edgeFoundId); lastNodeId = clickedNodeId;
                        console.log(`[Walk Interaction] Added node ${clickedNodeId}, edge ${edgeFoundId}. Current walk nodes: ${currentWalkNodes.join(',')}`);
                    } else {
                        console.log(`[Walk Interaction] No direct edge found from ${lastNodeId} to ${clickedNodeId}.`);
                        targetDisplay.innerHTML = `<span style="color: orange;">Kan inte gå direkt från ${networkData.nodes.get(lastNodeId)?.label || lastNodeId} till ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId}.</span>`;
                        return;
                    }
                }
                network.unselectAll(); network.selectNodes(currentWalkNodes); network.selectEdges(currentWalkEdges);
                updateWalkStatus();
            } else { console.log("[Walk Interaction] Click was not on a node."); }
        });

        visContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault(); console.log(`[Walk Interaction] Context menu (reset) on ${visContainer.id}`);
            currentWalkNodes = []; currentWalkEdges = []; lastNodeId = null; network.unselectAll();
            const targetDisplay = document.getElementById(displayId);
            if (targetDisplay) targetDisplay.innerHTML = 'Vandring nollställd.';
        });
    }

    // --- Euler Interaction (No changes needed based on feedback, keeping concise) ---
    function setupEulerInteraction(visContainer, network, networkData, totalEdges) {
        let visitedEdges = new Set(); let currentPathNodes = []; let lastNode = null;
        const explanation = document.createElement('p'); explanation.style.cssText = 'font-size: 0.9em; margin-top: 10px; text-align: center;'; explanation.innerHTML = 'Klicka på kanter i följd för att försöka hitta en Eulerväg/Eulerkrets. Högerklicka för att nollställa.'; visContainer.appendChild(explanation);
        const statusDisplay = document.createElement('div'); const displayId = `euler-status-${visContainer.id}`; statusDisplay.id = displayId; statusDisplay.style.cssText = 'margin-top: 5px; text-align: center; min-height: 3em;'; visContainer.appendChild(statusDisplay);
        function updateEulerStatus() { const targetDisplay = document.getElementById(displayId); if (!targetDisplay) return; const visitedCount = visitedEdges.size; let message = `Besökta kanter: ${visitedCount} / ${totalEdges}. `; if (visitedCount === totalEdges && currentPathNodes.length > 0) { message += '<br><span style="color: var(--secondary-color);">Alla kanter besökta!</span> '; if (currentPathNodes[0] === currentPathNodes[currentPathNodes.length - 1]) { message += '<span style="color: var(--secondary-color);">✓ Eulerkrets hittad!</span>'; } else { message += '<span style="color: var(--secondary-color);">✓ Eulerväg hittad!</span>'; } } targetDisplay.innerHTML = message; }
        network.on("click", function (params) { const targetDisplay = document.getElementById(displayId); if (!targetDisplay) return; if (params.edges.length > 0) { const clickedEdgeId = params.edges[0]; const edge = networkData.edges.get(clickedEdgeId); if (!edge || visitedEdges.has(clickedEdgeId)) { targetDisplay.innerHTML = `<span style="color: red;">${edge ? 'Kant redan besökt!' : 'Ogiltig kant!'}</span>`; return; } let nextNode = null; if (lastNode === null) { lastNode = edge.from; nextNode = edge.to; currentPathNodes = [lastNode, nextNode]; } else { if (edge.from === lastNode) nextNode = edge.to; else if (edge.to === lastNode) nextNode = edge.from; else { targetDisplay.innerHTML = `<span style="color: orange;">Kanten ansluter inte till föregående nod (${networkData.nodes.get(lastNode)?.label || lastNode}).</span>`; return; } currentPathNodes.push(nextNode); lastNode = nextNode; } visitedEdges.add(clickedEdgeId); networkData.edges.update({ id: clickedEdgeId, color: { color: '#2ecc71', highlight: '#27ae60' }, width: 3 }); updateEulerStatus(); } else if (params.nodes.length > 0 && lastNode === null) { lastNode = params.nodes[0]; currentPathNodes = [lastNode]; targetDisplay.innerHTML = `Startar vid nod ${networkData.nodes.get(lastNode)?.label || lastNode}. Välj en anslutande kant.`; } });
        visContainer.addEventListener('contextmenu', (e) => { e.preventDefault(); visitedEdges.clear(); currentPathNodes = []; lastNode = null; networkData.edges.update(networkData.edges.getIds().map(id => ({ id: id, color: { color: '#3498db', highlight: '#2ecc71' }, width: 2 }))); const targetDisplay = document.getElementById(displayId); if (targetDisplay) targetDisplay.innerHTML = 'Försök nollställt.'; });
    }

    // --- Hamilton Interaction (No changes needed based on feedback, keeping concise) ---
    function setupHamiltonInteraction(visContainer, network, networkData, totalNodes) {
        let currentHamiltonPathNodes = []; let currentHamiltonPathEdges = []; let visitedNodesSet = new Set();
        const explanation = document.createElement('p'); explanation.style.cssText = 'font-size: 0.9em; margin-top: 10px; text-align: center;'; explanation.innerHTML = 'Klicka på noder i följd för att försöka hitta en Hamiltonstig/-cykel. Högerklicka för att nollställa.'; visContainer.appendChild(explanation);
        const statusDisplay = document.createElement('div'); const displayId = `hamilton-status-${visContainer.id}`; statusDisplay.id = displayId; statusDisplay.style.cssText = 'margin-top: 5px; text-align: center; min-height: 3em;'; visContainer.appendChild(statusDisplay);
        function updateHamiltonStatus() { const targetDisplay = document.getElementById(displayId); if (!targetDisplay) return; targetDisplay.innerHTML = ''; if (currentHamiltonPathNodes.length === 0) return; const pathString = currentHamiltonPathNodes.map(id => networkData.nodes.get(id)?.label || id).join(' → '); let message = `<b>Aktuell stig:</b> ${pathString}<br>`; if (visitedNodesSet.size === totalNodes) { if (currentHamiltonPathNodes.length === totalNodes + 1 && currentHamiltonPathNodes[0] === currentHamiltonPathNodes[totalNodes]) { message += '<span style="color: var(--secondary-color);">✓ Hamiltoncykel hittad!</span>'; } else if (currentHamiltonPathNodes.length === totalNodes) { message += '<span style="color: var(--secondary-color);">✓ Hamiltonstig hittad!</span>'; } } targetDisplay.innerHTML = message; }
        network.on("click", function (params) { const targetDisplay = document.getElementById(displayId); if (!targetDisplay) return; if (params.nodes.length > 0) { const clickedNodeId = params.nodes[0]; network.storePositions(); const lastNodeId = currentHamiltonPathNodes.length > 0 ? currentHamiltonPathNodes[currentHamiltonPathNodes.length - 1] : null; if (lastNodeId === null) { currentHamiltonPathNodes = [clickedNodeId]; visitedNodesSet.add(clickedNodeId); } else { if (visitedNodesSet.has(clickedNodeId)) { if (!(clickedNodeId === currentHamiltonPathNodes[0] && visitedNodesSet.size === totalNodes && currentHamiltonPathNodes.length === totalNodes)) { targetDisplay.innerHTML = `<span style="color: red;">Nod ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId} redan besökt!</span>`; return; } } const connectingEdges = networkData.edges.get({ filter: item => (item.from === lastNodeId && item.to === clickedNodeId) || (item.to === lastNodeId && item.from === clickedNodeId) }); if (connectingEdges.length === 0) { targetDisplay.innerHTML = `<span style="color: orange;">Ingen kant mellan ${networkData.nodes.get(lastNodeId)?.label || lastNodeId} och ${networkData.nodes.get(clickedNodeId)?.label || clickedNodeId}.</span>`; return; } currentHamiltonPathNodes.push(clickedNodeId); visitedNodesSet.add(clickedNodeId); currentHamiltonPathEdges.push(connectingEdges[0].id); } network.unselectAll(); network.selectNodes(currentHamiltonPathNodes); network.selectEdges(currentHamiltonPathEdges); updateHamiltonStatus(); } });
        visContainer.addEventListener('contextmenu', (e) => { e.preventDefault(); currentHamiltonPathNodes = []; currentHamiltonPathEdges = []; visitedNodesSet.clear(); network.unselectAll(); const targetDisplay = document.getElementById(displayId); if (targetDisplay) targetDisplay.innerHTML = 'Försök nollställt.'; });
    }

    // --- Permutation/Combination Interaction Setup (No changes needed based on feedback) ---
    function setupPermCombInteraction(visContainer, term) {
        const isPermutation = term.name.startsWith("Permutation"); const termId = isPermutation ? 'perm' : 'comb';
        visContainer.style.display = 'block'; visContainer.style.height = 'auto'; visContainer.classList.remove('graph-visualization'); visContainer.classList.add('perm-comb-container');
        visContainer.innerHTML = `
           <div class="pc-controls"> <label for="elements-${termId}">Element (kommaseparerade):</label> <input type="text" id="elements-${termId}" value="A,B,C"> <label for="k-input-${termId}">k (antal att välja):</label> <input type="number" id="k-input-${termId}" value="2" min="0" step="1"> <button id="calc-btn-${termId}">Visualisera ${isPermutation ? 'Permutationer' : 'Kombinationer'}</button> </div>
           <div class="pc-explanation"> <p><strong>Formel:</strong> ${isPermutation ? 'P(n, k) = n! / (n-k)!' : 'C(n, k) = n! / (k! * (n-k)!)'}</p> <p>${isPermutation ? 'Permutationer handlar om <strong>ordnade</strong> arrangemang.' : 'Kombinationer handlar om <strong>oordnade</strong> urval (grupper).'}</p> </div>
           <div id="result-output-${termId}" class="pc-output"></div> <div id="visualizer-${termId}" class="pc-visualizer"></div>`;
        const elementsInput = visContainer.querySelector(`#elements-${termId}`); const kInput = visContainer.querySelector(`#k-input-${termId}`); const calcBtn = visContainer.querySelector(`#calc-btn-${termId}`); const resultOutput = visContainer.querySelector(`#result-output-${termId}`); const visualizer = visContainer.querySelector(`#visualizer-${termId}`);
        function factorial(num) { if (num < 0) return NaN; if (num === 0) return 1; let r = 1; for (let i = 2; i <= num; i++) r *= i; return r; }
        function permutations(n, k) { if (k < 0 || k > n) return 0; if (k === 0) return 1; const fN = factorial(n), fNK = factorial(n - k); if (isNaN(fN) || isNaN(fNK) || fNK === 0) return Infinity; return fN / fNK; }
        function combinations(n, k) { if (k < 0 || k > n) return 0; if (k === 0 || k === n) return 1; if (k > n / 2) k = n - k; let r = 1; for(let i = 0; i < k; i++) { r = r * (n - i) / (i + 1); } return r; }
        function generateCombinations(els, k) { if (k < 0 || k > els.length) return []; if (k === 0) return [[]]; if (els.length === 0) return []; const f = els[0], r = els.slice(1); const woF = generateCombinations(r, k); const wF = generateCombinations(r, k - 1).map(c => [f, ...c]); return [...wF, ...woF]; }
        function generatePermutations(els, k) { if (k < 0 || k > els.length) return []; if (k === 0) return [[]]; if (els.length === 0) return []; let p = []; for (let i = 0; i < els.length; i++) { const c = els[i]; const r = [...els.slice(0, i), ...els.slice(i + 1)]; generatePermutations(r, k - 1).forEach(sP => p.push([c, ...sP])); } return p; }
        function updateVisualization() {
            const elsStr = elementsInput.value.trim(); const els = elsStr ? elsStr.split(',').map(el => el.trim()).filter(el => el) : []; const k = parseInt(kInput.value, 10); const n = els.length;
            resultOutput.innerHTML = ''; visualizer.innerHTML = ''; if (n === 0) { resultOutput.innerHTML = '<span style="color: orange;">Ange minst ett element.</span>'; return; } if (isNaN(k) || k < 0) { resultOutput.innerHTML = '<span style="color: red;">Ange ett giltigt positivt heltal för k.</span>'; return; } if (k > n) { resultOutput.innerHTML = '<span style="color: red;">k kan inte vara större än n.</span>'; return; }
            let rVal, res = [], hTxt, iClass, fItem; const MAX_ITEMS = 50;
            if (isPermutation) { rVal = permutations(n, k); hTxt = 'Exempel på Permutationer (ordnade sekvenser):'; iClass = 'perm-item'; fItem = (p) => { const d = document.createElement('div'); d.className = iClass; p.forEach(el => { const s = document.createElement('span'); s.textContent = el; d.appendChild(s); }); return d; }; if (rVal > 0 && rVal <= MAX_ITEMS) res = generatePermutations(els, k); resultOutput.innerHTML = `Antal permutationer P(${n}, ${k}) = <strong>${rVal}</strong>`; }
            else { rVal = combinations(n, k); hTxt = 'Exempel på Kombinationer (oordnade grupper):'; iClass = 'comb-group'; fItem = (c) => { const d = document.createElement('div'); d.className = iClass; d.textContent = `{ ${c.sort().join(', ')} }`; return d; }; if (rVal > 0 && rVal <= MAX_ITEMS) { const raw = generateCombinations(els, k); res = [...new Set(raw.map(c => c.sort().join(',')))].map(s => s.split(',')); } resultOutput.innerHTML = `Antal kombinationer C(${n}, ${k}) = <strong>${rVal}</strong>`; }
            if (res.length > 0) { visualizer.innerHTML = `<h4>${hTxt}</h4>`; const list = document.createElement('div'); list.className = 'pc-results-list'; res.forEach(item => list.appendChild(fItem(item))); visualizer.appendChild(list); } else if (rVal > MAX_ITEMS) { visualizer.innerHTML = `<p>(För ${rVal} ${isPermutation ? 'permutationer' : 'kombinationer'} att visualisera här)</p>`; } else if (rVal === 0) { visualizer.innerHTML = `<p>Inga ${isPermutation ? 'permutationer' : 'kombinationer'} att visa.</p>`; }
        }
        calcBtn.addEventListener('click', updateVisualization); updateVisualization();
    }


    // --- Function to Create Term Cards (Refactored) ---
    function createTermCard(term) {
        const card = document.createElement('div'); card.className = 'term-card';
        const title = document.createElement('h4'); title.className = 'term-title'; title.innerHTML = term.name;
        const definition = document.createElement('div'); definition.className = 'term-definition'; definition.innerHTML = term.definition;
        card.appendChild(title); card.appendChild(definition);

        const visContainer = document.createElement('div'); visContainer.className = 'graph-visualization';
        visContainer.style.height = '250px'; visContainer.style.display = 'none';
        card.appendChild(visContainer);

        let visualizationCreated = false; let network = null;
        let nodes = [], edges = [], options = JSON.parse(JSON.stringify(defaultVisOptions));

        try {
            if (term.name.startsWith("Graf (Graph)")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}]; edges = [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}];
                network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Kant (Edge) / Båge (Arc)")) {
                nodes = [{id: 1, label: 'Nod 1'}, {id: 2, label: 'Nod 2'}]; edges = [ {id: 'e1', from: 1, to: 2, label: 'Kant (Edge)'}, {id: 'a1', from: 2, to: 1, label: 'Båge (Arc)', arrows: 'to'} ];
                options.edges.font = { align: 'top' }; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Grad (Degree)") || term.name.startsWith("Ingrad (In-degree)") || term.name.startsWith("Utgrad (Out-degree)")) {
                const isDirected = term.name.includes("Ingrad") || term.name.includes("Utgrad");
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}]; edges = [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}, {from: 3, to: 4}];
                if (isDirected) { edges.push({from: 4, to: 1, arrows: 'to'}); edges.forEach(e => e.arrows = e.arrows || 'to'); } else { edges.push({from: 1, to: 1}); }
                options.edges.arrows = { to: { enabled: isDirected } }; network = createVisualization(visContainer, nodes, edges, options);
                if (network) setupDegreeInteraction(visContainer, network, network.body.data, isDirected);
            } else if (["Vandring (Walk)", "Väg (Path)", "Stig (Simple Path)", "Krets (Circuit)", "Cykel (Cycle)"].includes(term.name.split(" / ")[0])) {
                nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ]; edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 3}, {id: 'e3', from: 2, to: 3}, {id: 'e4', from: 3, to: 4}, {id: 'e5', from: 4, to: 5}, {id: 'e6', from: 5, to: 3} ];
                network = createVisualization(visContainer, nodes, edges, options);
                if (network) setupWalkInteraction(visContainer, network, network.body.data);
            } else if (term.name.startsWith("Komplett Graf")) {
                const n = 5; nodes = Array.from({ length: n }, (_, i) => ({ id: i + 1, label: `v${i + 1}` })); edges = []; for (let i = 1; i <= n; i++) for (let j = i + 1; j <= n; j++) edges.push({ from: i, to: j });
                options.physics.stabilization = { iterations: 200 }; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Komplementgraf")) {
                nodes = [ {id: 1, label: '1'}, {id: 2, label: '2'}, {id: 3, label: '3'}, {id: 4, label: '4'} ]; const oE = [ {from: 1, to: 2}, {from: 2, to: 3}, {from: 3, to: 4} ];
                const cE = []; const ex = new Set(oE.map(e => `${Math.min(e.from, e.to)}-${Math.max(e.from, e.to)}`));
                for (let i = 1; i <= nodes.length; i++) for (let j = i + 1; j <= nodes.length; j++) if (!ex.has(`${i}-${j}`)) cE.push({ from: i, to: j, color: { color: '#e74c3c', highlight: '#c0392b' }, dashes: true });
                edges = [ ...oE.map(e => ({ ...e, color: { color: '#bdc3c7', highlight: '#95a5a6' }, width: 1 })), ...cE ];
                network = createVisualization(visContainer, nodes, edges, options);
                 if (network) { visContainer.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Original (grå). Komplement (röd/streckad) = saknade kanter för K<sub>4</sub>.</p>'); }
            } else if (term.name.startsWith("Delgraf")) {
                 nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ]; edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 3}, {id: 'e3', from: 2, to: 3}, {id: 'e4', from: 3, to: 4}, {id: 'e5', from: 4, to: 5}, {id: 'e6', from: 5, to: 3} ];
                 const sN = nodes.map(n => [1,2,3,4].includes(n.id) ? {...n, color: { background: '#d1e9ff', border: '#2c3e50'}} : n);
                 const sE = edges.map(e => ['e1','e2','e3','e4'].includes(e.id) ? {...e, color: defaultVisOptions.edges.color.highlight, width: 3} : e);
                 network = createVisualization(visContainer, sN, sE, options);
                 if (network) { visContainer.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Markerad delgraf (A,B,C,D och deras kanter).</p>'); }
            } else if (term.name.startsWith("Bipartit Graf") && !term.name.startsWith("Komplett Bipartit Graf")) {
                 const m = 3, n = 2; nodes = []; for (let i = 1; i <= m; i++) nodes.push({ id: `U${i}`, label: `U${i}`, group: 0, level: 0 }); for (let i = 1; i <= n; i++) nodes.push({ id: `W${i}`, label: `W${i}`, group: 1, level: 1 });
                 edges = [ { from: 'U1', to: 'W1' }, { from: 'U2', to: 'W1' }, { from: 'U2', to: 'W2' }, { from: 'U3', to: 'W2' } ];
                 options = { ...options, nodes: { ...options.nodes, shape: 'box', color: undefined }, edges: { ...options.edges, arrows: { to: { enabled: false } } }, physics: false, groups: { 0: { color: { background: '#f1c40f', border: '#e67e22' } }, 1: { color: { background: '#3498db', border: '#2980b9', font:{color:'#fff'} } } }, layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'hubsize', levelSeparation: 200, nodeSpacing: 100 } } };
                 network = createVisualization(visContainer, nodes, edges, options);
                 if (network) { visContainer.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Bipartit: Kanter endast mellan U (gul) och W (blå).</p>'); }
            } else if (term.name.startsWith("Komplett Bipartit Graf")) {
                 const m = 3, n = 2; nodes = []; for (let i = 1; i <= m; i++) nodes.push({ id: `U${i}`, label: `U${i}`, group: 0, level: 0 }); for (let i = 1; i <= n; i++) nodes.push({ id: `W${i}`, label: `W${i}`, group: 1, level: 1 });
                 edges = []; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) edges.push({ from: `U${i}`, to: `W${j}` });
                 options = { ...options, nodes: { ...options.nodes, shape: 'box', color: undefined }, edges: { ...options.edges, arrows: { to: { enabled: false } } }, physics: false, groups: { 0: { color: { background: '#f1c40f', border: '#e67e22' } }, 1: { color: { background: '#3498db', border: '#2980b9', font:{color:'#fff'} } } }, layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'hubsize', levelSeparation: 200, nodeSpacing: 100 } } };
                 network = createVisualization(visContainer, nodes, edges, options);
                 if (network) { visContainer.insertAdjacentHTML('beforeend', `<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Komplett Bipartit K<sub>${m},${n}</sub>: Alla U kopplade till alla W.</p>`); }
            } else if (term.name.startsWith("Multipla Kanter")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}]; edges = [{from: 1, to: 2}, {from: 1, to: 2}, {from: 1, to: 2}]; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Ögla (Loop)")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}]; edges = [{from: 1, to: 1}, {from: 1, to: 2}]; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Multigraf")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}]; edges = [ {from: 1, to: 1}, {from: 1, to: 2}, {from: 1, to: 2}, {from: 2, to: 3} ]; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Enkel Graf")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}]; edges = [{from: 1, to: 2}, {from: 2, to: 3}]; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Riktad Graf")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}]; edges = [ {from: 1, to: 2, arrows: 'to'}, {from: 1, to: 3, arrows: 'to'}, {from: 3, to: 2, arrows: 'to'} ];
                options.edges.arrows = { to: { enabled: true } }; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Oriktad Graf")) {
                nodes = [{id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}]; edges = [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 3}]; network = createVisualization(visContainer, nodes, edges, options);
            } else if (term.name.startsWith("Eulerväg") || term.name.startsWith("Eulerkrets")) {
                nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ]; edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 1, to: 2}, {id: 'e3', from: 1, to: 3}, {id: 'e4', from: 1, to: 3}, {id: 'e5', from: 1, to: 4}, {id: 'e6', from: 2, to: 3}, {id: 'e7', from: 2, to: 3}, {id: 'e8', from: 3, to: 4} ];
                network = createVisualization(visContainer, nodes, edges, options);
                if (network) setupEulerInteraction(visContainer, network, network.body.data, edges.length);
            } else if (term.name.startsWith("Hamiltonstig") || term.name.startsWith("Hamiltoncykel")) {
                nodes = [ {id: 1, label: 'A'}, {id: 2, label: 'B'}, {id: 3, label: 'C'}, {id: 4, label: 'D'}, {id: 5, label: 'E'} ]; edges = [ {id: 'e1', from: 1, to: 2}, {id: 'e2', from: 2, to: 3}, {id: 'e3', from: 3, to: 4}, {id: 'e4', from: 4, to: 5}, {id: 'e5', from: 5, to: 1}, {id: 'e6', from: 1, to: 3}, {id: 'e7', from: 2, to: 4}, {id: 'e8', from: 3, to: 5}, {id: 'e9', from: 4, to: 1}, {id: 'e10', from: 5, to: 2} ];
                network = createVisualization(visContainer, nodes, edges, options);
                if (network) setupHamiltonInteraction(visContainer, network, network.body.data, nodes.length);
            } else if (term.name.startsWith("Permutation") || term.name.startsWith("Kombination")) {
                setupPermCombInteraction(visContainer, term); visualizationCreated = true;
            }

            if (network) { visualizationCreated = true; }

        } catch (error) {
             console.error(`Error setting up visualization for term "${term.name}":`, error);
             visContainer.innerHTML = '<p style="color: red;">Error: Kunde inte skapa visualisering.</p>';
             visualizationCreated = true;
        }

        if (visualizationCreated) { visContainer.style.display = 'block'; }
        return card;
    }

    // --- Function to Create Modeling Example Cards ---
    function createModelingCard(example) {
        const card = document.createElement('div'); card.className = 'term-card';
        const title = document.createElement('h3'); title.textContent = example.title;
        const descriptionDiv = document.createElement('div'); descriptionDiv.innerHTML = example.description;
        card.appendChild(title); card.appendChild(descriptionDiv);
        const visPlaceholder = descriptionDiv.querySelector('.graph-visualization');
        if (visPlaceholder) {
            visPlaceholder.id = `vis-${example.title.replace(/\s+/g, '-')}`; visPlaceholder.textContent = '';
            visPlaceholder.style.height = '250px'; visPlaceholder.style.backgroundColor = 'var(--card-bg)';
            setTimeout(() => {
                try {
                    let options = JSON.parse(JSON.stringify(defaultVisOptions));
                    if (example.title.startsWith("Tidsplanering")) {
                        options.edges.arrows = { to: { enabled: true } }; options.edges.font = { align: 'top' };
                        createVisualization(visPlaceholder, [{id: 1, label: 'Start'}, {id: 2, label: 'Grund Klar'}, {id: 3, label: 'Väggar Resta'}, {id: 4, label: 'Tak Lagt'}, {id: 5, label: 'Slut'}], [{from: 1, to: 2, label: 'Gjuta Grund (5d)', arrows: 'to'}, {from: 2, to: 3, label: 'Resa Väggar (7d)', arrows: 'to'}, {from: 3, to: 4, label: 'Lägga Tak (4d)', arrows: 'to'}, {from: 4, to: 5, label: 'Interna Jobb (6d)', arrows: 'to'}, {from: 2, to: 4, label: 'Rördragning (8d)', arrows: 'to'}], options);
                    } else if (example.title.startsWith("Radbrytning")) {
                        const nodes = [{id: 0, label: 'Start'}, {id: 1, label: 'Efter "ord1"'}, {id: 2, label: 'Efter "ord2"'}, {id: 3, label: 'Efter "ord3"'}, {id: 4, label: 'Efter "ord4"'}, {id: 5, label: 'Slut'}]; const edges = [{from: 0, to: 2, label: '"ord1 ord2"', arrows: 'to'}, {from: 0, to: 3, label: '"ord1 ord2 ord3"', arrows: 'to', color: {opacity:0.3}, dashes:true}, {from: 2, to: 4, label: '"ord3 ord4"', arrows: 'to'}, {from: 4, to: 5, label: '""', arrows: 'to'}, {from: 0, to: 1, label: '"ord1"', arrows: 'to'}, {from: 1, to: 3, label: '"ord2 ord3"', arrows: 'to'}, {from: 3, to: 5, label: '"ord4"', arrows: 'to'}];
                        options.edges.arrows = { to: { enabled: true } }; options.edges.font = { align: 'middle', size: 10 }; options.layout = { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed' } }; options.physics = false;
                        createVisualization(visPlaceholder, nodes, edges, options); visPlaceholder.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Förenklad visualisering: Noder är brytpunkter, kanter är möjliga rader.</p>');
                    } else if (example.title.startsWith("Lösning av Instant Insanity")) {
                        const colors = ['R', 'G', 'B', 'Y']; const nodes = colors.map((c, i) => ({id: c, label: c, x: Math.cos(i*2*Math.PI/4)*100, y: Math.sin(i*2*Math.PI/4)*100}));
                        const edges = [{from: 'R', to: 'G', label: 'K1', color: '#e74c3c'}, {from: 'B', to: 'Y', label: 'K2', color: '#3498db'}, {from: 'R', to: 'B', label: 'K3', color: '#2ecc71'}, {from: 'G', to: 'Y', label: 'K4', color: '#f1c40f'}];
                        options.physics = { enabled: false }; options.edges.font = { align: 'top', size: 12, strokeWidth: 3, strokeColor: 'white' };
                        createVisualization(visPlaceholder, nodes, edges, options); visPlaceholder.insertAdjacentHTML('beforeend', '<p style="font-size:0.9em; text-align:center; margin-top: 5px;">Exempelgraf (Fram/Bak-sidor). Noder=färger, Kanter=motsatta sidor.</p>');
                    }
                } catch (error) { console.error(`Error creating visualization for example "${example.title}":`, error); visPlaceholder.innerHTML = '<p style="color: red;">Error: Kunde inte skapa visualisering.</p>'; }
            }, 100);
        }
        return card;
    }

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle'); const body = document.body; const currentTheme = localStorage.getItem('theme');
    function applyTheme(theme) { if (theme === 'dark') { body.classList.add('dark-mode'); if (themeToggleButton) themeToggleButton.textContent = '☀️'; } else { body.classList.remove('dark-mode'); if (themeToggleButton) themeToggleButton.textContent = '🌙'; } }
    applyTheme(currentTheme);
    if (themeToggleButton) { themeToggleButton.addEventListener('click', () => { const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark'; applyTheme(newTheme); localStorage.setItem('theme', newTheme); }); }

    // --- Content Population Logic (Corrected + Logging) ---
    console.log("Starting content population..."); // LOG: Start
    const mainContentSection = document.querySelector('main > section[id]');

    if (mainContentSection) {
        const sectionId = mainContentSection.id;
        console.log("Found content section with ID:", sectionId); // LOG: Found section

        let categoryNameToLoad = null; let isModelingPage = false;

        switch (sectionId) {
            case 'generella-termer-content': categoryNameToLoad = "Generella Termer"; break;
            case 'nods-grad-content': categoryNameToLoad = "En Nods Grad (Degree of a Node)"; break;
            case 'forflytta-graf-content': categoryNameToLoad = "Att Förflytta Sig i en Graf"; break;
            case 'kompletta-bipartita-content': categoryNameToLoad = "Kompletta Grafer, Bipartita Grafer och Relaterade Begrepp"; break;
            case 'kanttyper-variationer-content': categoryNameToLoad = "Kanttyper och Grafvariationer"; break;
            case 'euler-hamilton-content': categoryNameToLoad = "Euler och Hamilton"; break;
            case 'permutationer-kombinationer-content': categoryNameToLoad = "Permutationer och Kombinationer"; break;
            case 'modeling-examples': isModelingPage = true; break;
            case 'overview': console.log("On overview page, no dynamic content needed."); break;
            default: console.warn("No content loading logic defined for section ID:", sectionId); mainContentSection.innerHTML += '<p style="color: orange;">Innehåll kunde inte laddas för denna sektion (okänd ID).</p>';
        }

        console.log(`Determined category: ${categoryNameToLoad}, Is modeling page: ${isModelingPage}`); // LOG: Determined type

        if (categoryNameToLoad) {
            console.log("Attempting to find category data for:", categoryNameToLoad); // LOG: Finding category data
            const categoryData = graphData.definitions.find(cat => cat.category === categoryNameToLoad);
            if (categoryData) {
                console.log("Found category data. Populating terms..."); // LOG: Found category data
                categoryData.terms.forEach((term, index) => {
                    console.log(`Creating card for term ${index + 1}: ${term.name}`); // LOG: Creating term card
                    try { const termCard = createTermCard(term); mainContentSection.appendChild(termCard); console.log(`Appended card for term: ${term.name}`); } // LOG: Appended term card
                    catch (e) { console.error(`Error creating card for term "${term.name}" in category "${categoryNameToLoad}":`, e); mainContentSection.innerHTML += `<p style="color: red;">Fel vid skapande av kort för "${term.name}".</p>`; }
                });
            } else { console.error(`Category data NOT FOUND in graphData for: ${categoryNameToLoad}`); mainContentSection.innerHTML += `<p style="color: red;">Error: Kunde inte hitta data för kategori "${categoryNameToLoad}".</p>`; } // LOG: Category data not found
        } else if (isModelingPage) {
            console.log("Populating modeling examples..."); // LOG: Populating examples
            graphData.modelingExamples.forEach((example, index) => {
                 console.log(`Creating card for example ${index + 1}: ${example.title}`); // LOG: Creating example card
                 try { const exampleCard = createModelingCard(example); mainContentSection.appendChild(exampleCard); console.log(`Appended card for example: ${example.title}`); } // LOG: Appended example card
                 catch (e) { console.error(`Error creating card for example "${example.title}":`, e); mainContentSection.innerHTML += `<p style="color: red;">Fel vid skapande av kort för exempel "${example.title}".</p>`; }
            });
        }

    } else { console.error("Could not find main content section with selector 'main > section[id]'."); document.body.insertAdjacentHTML('beforeend', '<p style="color: red; text-align: center; padding: 20px;">Error: Kunde inte hitta huvudsektionen för att ladda innehåll.</p>'); } // LOG: Section not found
    console.log("Content population finished."); // LOG: End

}); // End DOMContentLoaded
