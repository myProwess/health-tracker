document.addEventListener('DOMContentLoaded', () => {
    const nutrientGrid = document.getElementById('nutrientGrid');
    const loading = document.getElementById('loading');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const paginationContainer = document.getElementById('paginationContainer');
    
    // Modal Elements
    const nutrientModal = document.getElementById('nutrientModal');
    const modalType = document.getElementById('modalType');
    const modalTitle = document.getElementById('modalTitle');
    const modalBenefits = document.getElementById('modalBenefits');
    const modalSources = document.getElementById('modalSources');
    const modalSymptoms = document.getElementById('modalSymptoms');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Language Toggle Elements
    const langToggle = document.getElementById('langToggle');
    const langStatus = document.getElementById('langStatus');

    // Dark Mode Elements
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

    let allNutrientsEn = [];
    let allNutrientsTa = [];
    let currentNutrients = [];
    let filteredNutrients = [];
    let currentFilter = 'All';
    let currentPage = 1;
    let isTamil = true;
    const itemsPerPage = 9;

    async function initApp() {
        try {
            loading.classList.remove('hidden');
            const [enRes, taRes] = await Promise.all([
                fetch('data/english.json'),
                fetch('data/tamil.json')
            ]);
            
            if (!enRes.ok || !taRes.ok) throw new Error('Data fetch failed');
            
            allNutrientsEn = await enRes.json();
            allNutrientsTa = await taRes.json();
            
            switchLanguage(true); // Start with Tamil
            loading.classList.add('hidden');
        } catch (error) {
            console.error('Error loading nutrients:', error);
            loading.innerHTML = `<div class="text-red-500 bg-red-50 p-4 rounded-lg border border-red-100 text-center"><p class="font-medium">Error connecting to data source.</p></div>`;
        }
    }

    function switchLanguage(tamil) {
        isTamil = tamil;
        currentNutrients = isTamil ? allNutrientsTa : allNutrientsEn;
        
        // Update Status Label
        langStatus.innerText = isTamil ? "ON" : "OFF";
        
        if (isTamil) langToggle.classList.add('active');
        else langToggle.classList.remove('active');
        
        searchInput.placeholder = isTamil ? "ஊட்டச்சத்துக்களைத் தேடுங்கள்..." : "Search nutrients...";
        
        // Refresh display
        filterAndSearch();
    }

    langToggle.addEventListener('click', () => {
        switchLanguage(!isTamil);
    });

    // Dark Mode Logic
    function toggleDarkMode(force) {
        const isDark = force !== undefined ? force : !document.body.classList.contains('dark');
        document.body.classList.toggle('dark', isDark);
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    darkModeToggle.addEventListener('click', () => toggleDarkMode());

    // Initialize Theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        toggleDarkMode(true);
    }

    function getNutrientName(n) {
        return n.Nutrient || n.Vitamins || "Unknown Nutrient";
    }

    function createNutrientCard(nutrient, index) {
        const typeStyles = nutrient.type === 'Vitamin' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700';
        const card = document.createElement('article');
        card.className = 'glass-card rounded-[2.5rem] p-7 flex flex-col h-full animate-fade-in shadow-sm group';
        card.setAttribute('aria-labelledby', `nutrient-name-${index}`);
        
        const actualIndex = (currentPage - 1) * itemsPerPage + index;

        const benefitsArr = (nutrient.whatitdoes || "").split('.').map(b => b.replace(/\s+/g, ' ').trim()).filter(b => b.length > 3);
        const benefitsPreview = benefitsArr.slice(0, 1).map((b, i) => `
            <div class="flex gap-2 text-slate-600 text-xs text-left">
                <span class="font-bold text-indigo-400">1.</span>
                <span class="line-clamp-2 leading-relaxed">${b}</span>
            </div>
        `).join('');

        const foodSourcesLabel = isTamil ? "உணவு ஆதாரங்கள்" : "Food Sources";
        const symptomsLabel = isTamil ? "அறிகுறிகள்" : "Symptoms";
        const primaryFunctionLabel = isTamil ? "முக்கிய செயல்பாடு" : "Primary Function";

        card.innerHTML = `
            <div class="flex justify-between items-start mb-5">
                <span class="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${typeStyles}">
                    ${isTamil && nutrient.type === 'Vitamin' ? 'வைட்டமின்' : (isTamil ? 'தாது' : nutrient.type)}
                </span>
            </div>
            <h3 id="nutrient-name-${index}" class="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-4 tracking-wide uppercase">${getNutrientName(nutrient)}</h3>
            
            <div class="flex-grow">
                <div class="mb-8">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-left">${primaryFunctionLabel}</p>
                    ${benefitsPreview}
                </div>
            </div>

            <div class="pt-6 border-t border-slate-100/50 flex flex-wrap gap-4 mt-auto">
                <button onclick="event.stopPropagation(); window.openModal(${actualIndex}, 'sources')" class="action-link text-[11px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 hover:text-indigo-800 transition-colors" aria-label="${foodSourcesLabel} for ${getNutrientName(nutrient)}">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.703 2.703 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-1.5-.454" /></svg>
                    ${foodSourcesLabel}
                </button>
                <button onclick="event.stopPropagation(); window.openModal(${actualIndex}, 'symptoms')" class="action-link text-[11px] font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5 hover:text-rose-800 transition-colors" aria-label="${symptomsLabel} for ${getNutrientName(nutrient)}">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    ${symptomsLabel}
                </button>
            </div>
        `;
        return card;
    }

    window.openModal = function(index, focusSection) {
        const nutrient = filteredNutrients[index];
        if (!nutrient) return;

        const modalBenefitsLabel = isTamil ? "முக்கிய நன்மைகள்" : "Key Benefits";
        const modalSourcesLabel = isTamil ? "ஊட்டச்சத்து நிறைந்த உணவுகள்" : "Rich Food Sources";
        const modalSymptomsLabel = isTamil ? "குறைபாடு அறிகுறிகள்" : "Deficiency Symptoms";

        document.querySelector('#sectionBenefits h4').innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0" />
            </svg>
            ${modalBenefitsLabel}
        `;
        document.querySelector('#sectionSources h4').innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.703 2.703 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-1.5-.454" />
            </svg>
            ${modalSourcesLabel}
        `;
        document.querySelector('#sectionSymptoms h4').innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            ${modalSymptomsLabel}
        `;

        modalType.innerText = isTamil && nutrient.type === 'Vitamin' ? 'வைட்டமின்' : (isTamil ? 'தாது' : nutrient.type);
        modalType.className = `px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-1 inline-block ${
            nutrient.type === 'Vitamin' ? 'bg-orange-500/20 text-orange-200' : 'bg-blue-500/20 text-blue-200'
        }`;
        modalTitle.innerText = getNutrientName(nutrient).toUpperCase();
        
        // Populate Benefits
        const benefitsArr = (nutrient.whatitdoes || "").split('.').map(b => b.replace(/\s+/g, ' ').trim()).filter(b => b.length > 3);
        modalBenefits.innerHTML = `
            <ul class="space-y-4 list-decimal pl-6">
                ${benefitsArr.map(benef => `
                    <li class="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 shadow-sm text-left">
                        <p class="text-slate-700 text-sm leading-relaxed font-medium">${benef}</p>
                    </li>
                `).join('')}
            </ul>
        `;

        // Populate Food Sources
        const rawSources = nutrient.foodsources || "";
        let sourcesArray = [];
        let start = 0, depth = 0;
        for (let i = 0; i < rawSources.length; i++) {
            if (rawSources[i] === '(') depth++;
            else if (rawSources[i] === ')') depth--;
            else if (rawSources[i] === ',' && depth === 0) {
                sourcesArray.push(rawSources.substring(start, i).trim());
                start = i + 1;
            }
        }
        sourcesArray.push(rawSources.substring(start).trim());
        sourcesArray = sourcesArray.map(s => {
            let cl = s.replace(/^[•ò\-\→\s]+/, '').replace(/e\.g\.,?\s*/gi, '');
            return cl.charAt(0).toUpperCase() + cl.slice(1);
        }).filter(s => s.length > 0);
        
        modalSources.innerHTML = `
            <ul class="space-y-3 pl-6">
                ${sourcesArray.map(source => `
                    <li class="text-slate-700 text-sm font-semibold animate-fade-in bg-white p-4 rounded-2xl border border-indigo-50 shadow-sm text-left">
                        ${source}
                    </li>
                `).join('')}
            </ul>
        `;

        // Populate Deficiency Symptoms
        const symptomsArr = (nutrient.deficiency_symptoms || "").split(',').map(s => s.trim()).filter(s => s.length > 0);
        modalSymptoms.innerHTML = `
            <ul class="space-y-3 pl-6">
                ${symptomsArr.map(symptom => `
                    <li class="text-slate-700 text-sm font-bold animate-fade-in bg-rose-50/30 p-4 rounded-2xl border border-rose-100 transition-colors text-left">
                        ${symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                    </li>
                `).join('') || `<p class="text-slate-400 italic text-sm text-left">${isTamil ? "குறிப்பிட்ட அறிகுறிகள் எதுவும் இல்லை." : "No specific symptoms recorded."}</p>`}
            </ul>
        `;

        // Visibility Logic
        const sectionBenefits = document.getElementById('sectionBenefits');
        const sectionSources = document.getElementById('sectionSources');
        const sectionSymptoms = document.getElementById('sectionSymptoms');
        const modalBodyGrid = document.getElementById('modalBodyGrid');

        // Reset visibility and layout
        sectionBenefits.classList.remove('hidden');
        sectionSources.classList.remove('hidden');
        sectionSymptoms.classList.remove('hidden');
        modalBodyGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12";

        if (focusSection === 'sources') {
            sectionBenefits.classList.add('hidden');
            sectionSymptoms.classList.add('hidden');
            modalBodyGrid.className = "grid grid-cols-1 max-w-2xl mx-auto";
        } else if (focusSection === 'symptoms') {
            sectionBenefits.classList.add('hidden');
            sectionSources.classList.add('hidden');
            modalBodyGrid.className = "grid grid-cols-1 max-w-2xl mx-auto";
        }

        // Show Modal
        nutrientModal.classList.remove('hidden');
        nutrientModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        document.querySelector('.overflow-y-auto').scrollTop = 0;
        
        // Focus management
        setTimeout(() => {
            const innerModal = nutrientModal.querySelector('.luminous-glass');
            innerModal.focus();
        }, 100);
    }

    function closeModalHandler() {
        nutrientModal.classList.add('hidden');
        nutrientModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    closeModal.onclick = closeModalHandler;
    closeModalBtn.onclick = closeModalHandler;
    nutrientModal.onclick = (e) => { if(e.target === nutrientModal) closeModalHandler(); };

    function displayNutrients() {
        nutrientGrid.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const pageItems = filteredNutrients.slice(startIndex, startIndex + itemsPerPage);

        if (pageItems.length === 0) {
            noResults.classList.remove('hidden');
            nutrientGrid.classList.add('hidden');
            paginationContainer.classList.add('hidden');
        } else {
            noResults.classList.add('hidden');
            nutrientGrid.classList.remove('hidden');
            paginationContainer.classList.remove('hidden');
            pageItems.forEach((n, i) => nutrientGrid.appendChild(createNutrientCard(n, i)));
            renderPagination();
        }
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredNutrients.length / itemsPerPage);
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        const createBtn = (text, active, disabled, onClick) => {
            const btn = document.createElement('button');
            btn.innerText = text;
            btn.disabled = disabled;
            btn.className = `pagination-btn px-4 py-2 rounded-xl border border-slate-200 bg-white font-bold transition-all ${active ? 'active' : 'text-slate-600 hover:bg-slate-50'}`;
            btn.onclick = onClick;
            return btn;
        };

        const prevLabel = isTamil ? "முந்தைய" : "Prev";
        const nextLabel = isTamil ? "அடுத்து" : "Next";

        paginationContainer.appendChild(createBtn(prevLabel, false, currentPage === 1, () => { currentPage--; displayNutrients(); window.scrollTo(0,0); }));
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createBtn(i, currentPage === i, false, () => { currentPage = i; displayNutrients(); window.scrollTo(0,0); }));
        }
        paginationContainer.appendChild(createBtn(nextLabel, false, currentPage === totalPages, () => { currentPage++; displayNutrients(); window.scrollTo(0,0); }));
    }

    function filterAndSearch() {
        const query = searchInput.value.toLowerCase();
        filteredNutrients = currentNutrients.filter(n => {
            const name = getNutrientName(n);
            const match = [name, n.whatitdoes, n.foodsources, n.deficiency_symptoms].some(f => (f||"").toLowerCase().includes(query));
            return match && (currentFilter === 'All' || n.type === currentFilter);
        });
        
        // Update Breadcrumb
        const filterTa = { 'All': 'அனைத்தும்', 'Vitamin': 'வைட்டமின்கள்', 'Mineral': 'தாதுக்கள்' };
        breadcrumbCurrent.innerText = isTamil ? filterTa[currentFilter] : currentFilter;

        currentPage = 1;
        displayNutrients();
    }

    searchInput.addEventListener('input', filterAndSearch);
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterAndSearch();
    }));

    initApp();
});
