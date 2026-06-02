import { universeSkills } from './banco.js';

const modal = document.getElementById('systemModal');
const modalWindow = document.getElementById('modalWindow');
const mTitle = document.getElementById('modalTitle');
const mDesc = document.getElementById('modalDescription');
const mExtra = document.getElementById('modalExtraContent');
const mCloseBtn = document.getElementById('modalCloseBtn');

// ==========================================
// FUNÇÃO DE CONFIGURAÇÃO DE CORES POR RANK (100% CORRIGIDA)
// ==========================================
function getRankColor(rank) {
    if (!rank) return '#cbd5e1';
    const r = rank.toUpperCase().trim().replace('RANK', '').trim();
    
    const exactColors = {
        // Classes Divinas
        '???': '#f0f8ff',
        '??': '#f0f8ff',
        '?': '#f0f8ff',

        // Classes Superiores
        'EX': '#ffff00',   // 🌟 Ouro Elétrico / Amarelo Neon (A cor que mais ativa os receptores do olho humano no escuro)
        'SSS': '#ff0044',  // 👑 Rubi Imperial / Carmesim Elétrico (Substitui o vinho escuro por um tom magnético de altíssima atenção)
        'SS': '#ff0000',   // 🔴 Vermelho Vivo Puro
        'S+': '#ff5500',   // 🟠 Laranja Avermelhado Neon
        'S': '#ff7700',    // 🟠 Laranja Intenso

        // Classes Altas
        'A+': '#ffaa00',   // 🟡 Âmbar / Amarelo Ouro
        'A': '#ffd200',    // 🟡 Amarelo Forte
        'A-': '#ffeb60',   // 🍋 Amarelo Claro Suave

        // Classes Médias e Baixas
        'B': '#4ade80',    // 🟢 Verde Claro Limpo
        'C': '#22c55e',    // 🍏 Verde Padrão
        'D': '#38bdf8',    // 🔵 Azul Claro / Ciano Suave

        // Classes de Falha / Inúteis
        'E': '#564279',    // 🟣 Roxo Muted
        'F': '#8d8d8d',    // 💜 Roxo Ultra Escuro
        'FF': '#7b7b7b',   // 🖤 Cinza Escuro Slate
        'FFF': '#6e6e6e'   // 💀 Grafite Fantasma 
    };
    
    if (exactColors[r]) {
        return exactColors[r];
    }
    
    // 2. Fallback por inclusão parcial (A ordem do maior para o menor importa!)
    if (r.includes('FFF')) return '#141414';
    if (r.includes('FF'))  return '#374151';
    if (r.includes('EX'))  return '#ffd700';
    if (r.includes('SSS')) return '#800020';
    if (r.includes('SS'))  return '#ff0000';
    if (r.includes('S+'))  return '#ff4500';
    if (r.includes('S'))   return '#ff6600';
    if (r.includes('A+'))  return '#ffcc00';
    if (r.includes('A-'))  return '#fef08a';
    if (r.includes('A'))   return '#facc15'; 
    if (r.includes('B'))   return '#a3e635';
    if (r.includes('C'))   return '#4ade80';
    if (r.includes('D'))   return '#38bdf8';
    if (r.includes('E'))   return '#a855f7';
    if (r.includes('F'))   return '#581c87';
    
    if (r.includes('???')) return '#ffffff';
    if (r.includes('??'))  return '#ffffff';
    if (r.includes('?'))   return '#ffffff';
    
    return '#cbd5e1'; // Retorno seguro
}

// INICIALIZAÇÃO: COLORIR OS RANKS DO HTML ESTÁTICO
function colorStaticRanks() {
    document.querySelectorAll('.tag-rank').forEach(tag => {
        const rankText = tag.textContent.replace('Rank', '').trim();
        const color = getRankColor(rankText);
        tag.style.color = color;
        tag.style.borderColor = color;
        tag.style.background = `${color}15`; // Adiciona 8% de opacidade no fundo para efeito neon
        tag.style.textShadow = `0 0 6px ${color}80`;
    });
}

const staticSkills = {
    indice: {
        title: "Índice Multiversal [Nv. 1]",
        desc: "Permite ao usuário adquirir poderes, armas, itens, autoridades e etc... de outros mundos. Mas o usuário deve definir um tema à habilidade, podendo adquirir coisas somente dentro deste tema. Temas abrangentes são proibidos.",
        type: 'unlocked',
        extra: `
            <div class="sub-section-title">Penalidades & Condições</div>
            <ul class="penalty-list">
                <li>O usuário não pode adquirir ou usar habilidades sem ser por meio desta habilidade.</li>
                <li><span style="color: #ff3366; font-weight: bold;">[???] &lt;Oculto&gt;:</span> Ao escolher um universo, o usuário, ao completar a Torre, deverá viver como o protagonista da obra sem suas memórias e habilidades.</li>
            </ul>`
    },
    sobre_indice: {
        title: "Sobre a Habilidade: Índice Multiversal",
        desc: "Diretrizes e restrições sistêmicas para a progressão e evolução da Matriz de Almas.",
        type: 'about',
        extra: `
            <div class="sub-section-title">Regras de Sincronização</div>
            <ul class="penalty-list">
                <li><strong>1.</strong> Esta habilidade não pode ser clonada, copiada ou anulada sob nenhuma circunstância.</li>
                <li><strong>2.</strong> A cada 5 níveis do Índice Multiversal, um novo slot ou linha de tabela [3x3] é liberado.</li>
                <li><strong>3.</strong> O nível máximo alcançável do Índice é [15].</li>
            </ul>
            <div class="sub-section-title">Evolução de Ranks</div>
            <ul class="penalty-list">
                <li>Habilidades equipadas na Matriz possuem nível máximo [5]. Ao atingirem o topo, necessitam de uma [Pedra de Promoção] para subir seu Rank de classificação.</li>
                <li><strong>Escala Sábia:</strong> E &lt; D &lt; C &lt; B &lt; A &lt; S &lt; SS &lt; SSS &lt; EX</li>
            </ul>`
    },
    passos: {
        title: "Passos Fantasma [Rank A]",
        desc: "Habilidade passiva. Seus passos são leves como uma pluma e não emitem sons, mas pequenas vibrações podem ser detectadas.",
        type: 'locked',
        extra: `<div class="sub-section-title">&lt;Bloqueada&gt;</div>`
    },
    furtividade: {
        title: "Furtividade [Rank B]",
        desc: "Habilidade passiva. Permite ao usuário controlar o nível de sua presença.",
        type: 'locked',
        extra: `<div class="sub-section-title">&lt;Bloqueada&gt;</div>`
    },
    adaptabilidade: {
        title: "Adaptabilidade [Rank C]",
        desc: "Habilidade passiva. Permite a sua mente a se adaptar mais rápido às situações desconhecidas.",
        type: 'locked',
        extra: `<div class="sub-section-title">&lt;Bloqueada&gt;</div>`
    },
    criacao: {
        title: "Criação [Rank A]",
        desc: "Habilidade passiva. Permite que o usuário crie qualquer coisa física com maior facilidade que outros.",
        type: 'locked',
        extra: `<div class="sub-section-title">&lt;Bloqueada&gt;</div>`
    }
};

let activeRow = null;
let activeCol = null;
let equippedSkillsTracker = [];

function openModal(key) {
    modalWindow.classList.remove('locked-style', 'about-style');
    mCloseBtn.style.display = "block";
    
    modalWindow.innerHTML = `
        <div class="title" id="modalTitle"></div>
        <p class="skill-description" id="modalDescription"></p>
        <div id="modalExtraContent"></div>
        <button class="close-btn" id="modalCloseBtn" onclick="closeModal()">Fechar Registro</button>
    `;

    const data = staticSkills[key];
    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDescription').innerHTML = data.desc;
    document.getElementById('modalExtraContent').innerHTML = data.extra;

    if (data.type === 'locked') {
        modalWindow.classList.add('locked-style');
    } else if (data.type === 'about') {
        modalWindow.classList.add('about-style');
    }
    modal.classList.add('active');
}

function triggerSlotSelection(row, col) {
    activeRow = row;
    activeCol = col;

    modalWindow.classList.remove('locked-style', 'about-style');
    modalWindow.style.background = '';
    modalWindow.style.border = '';
    modalWindow.style.boxShadow = '';
    modalWindow.style.clipPath = '';
    modalWindow.style.padding = '';

    modalWindow.innerHTML = `
        <div class="title" id="modalTitle"></div>
        <p class="skill-description" id="modalDescription"></p>
        <div id="modalExtraContent"></div>
        <button class="close-btn" id="modalCloseBtn" onclick="closeModal()" style="display:none;">Fechar Registro</button>
    `;

    let serieName = col === 0 ? "Regressor" : col === 1 ? "Revival Hunter" : "Time Stop Ability";
    document.getElementById('modalTitle').innerText = `Sincronizar Universo: ${serieName}`;
    document.getElementById('modalDescription').innerText = `Selecione uma habilidade do registro deste mundo no slot [${row + 1}].`;

    let optionsHtml = '<div class="selection-menu-list">';
    universeSkills[col].forEach((skill, index) => {
        const isAlreadyEquipped = equippedSkillsTracker.includes(`${col}-${index}`);

        if (isAlreadyEquipped) {
            optionsHtml += `
                <div class="selection-option" style="opacity: 0.3; cursor: not-allowed; border-color: rgba(255,0,0,0.2);">
                    <span class="option-name" style="color: #666;">${skill.name} (Já Equipada)</span>
                    <span class="option-rank" style="color: #666;">[Rank ${skill.rank}]</span>
                </div>`;
        } else {
            // MUDANÇA: A cor do Rank muda dinamicamente no menu de opções
            const rankColor = getRankColor(skill.rank);
            optionsHtml += `
                <div class="selection-option" onclick="equipSkill(event, ${index})">
                    <span class="option-name">${skill.name}</span>
                    <span class="option-rank" style="color: ${rankColor}; text-shadow: 0 0 5px ${rankColor}aa;">[Rank ${skill.rank}]</span>
                </div>`;
        }
    });
    optionsHtml += '</div><p style="font-size:0.9rem; color:#88a0c0; text-align:center; margin-top:10px;">(Clique fora para cancelar a operação)</p>';
    
    document.getElementById('modalExtraContent').innerHTML = optionsHtml;
    modal.classList.add('active');
}

function equipSkill(e, skillIndex) {
    if (e) e.stopPropagation();

    const currentRow = activeRow;
    const currentCol = activeCol;
    
    const skill = universeSkills[currentCol][skillIndex];
    const slot = document.getElementById(`slot-${currentRow}-${currentCol}`);
    
    // MUDANÇA: Aplica a cor customizada diretamente na tag do slot quando equipado
    const rankColor = getRankColor(skill.rank);
    slot.classList.add('equipped');
    slot.innerHTML = `${skill.name} <span class="slot-rank" style="color: ${rankColor}; text-shadow: 0 0 5px ${rankColor}80;">${skill.rank}</span>`;
    
    slot.setAttribute('data-skill-index', skillIndex);
    equippedSkillsTracker.push(`${currentCol}-${skillIndex}`);
    
    slot.onclick = function(event) {
        event.stopPropagation();
        showEquippedSkill(skill.name, skill.rank, skill.desc, currentRow, currentCol);
    };

    closeModal();
}

function showEquippedSkill(name, rank, desc, row, col) {
    modalWindow.classList.remove('locked-style', 'about-style');
    modalWindow.style.background = '';
    modalWindow.style.border = '';
    modalWindow.style.boxShadow = '';
    modalWindow.style.clipPath = '';
    modalWindow.style.padding = '';

    const rankColor = getRankColor(rank);

    if (col === 1) {
        modalWindow.style.background = 'transparent';
        modalWindow.style.border = 'none';
        modalWindow.style.boxShadow = 'none';
        modalWindow.style.clipPath = 'none';
        modalWindow.style.padding = '0';

        let paragraphs = desc.split('\n');
        let textBlocksHtml = '';

        paragraphs.forEach(p => {
            let trimmed = p.trim();
            if (trimmed !== '') {
                let formattedText = trimmed
                    .replace(/(EFEITO:|RECOMPENSA DE MORTE:)/g, '<span class="label-highlight">$1</span>')
                    .replace(/(※ PORÉM,|※ POREM,|※ ENTRETANTO,)/g, '<span class="label-highlight">$1</span>');
                
                textBlocksHtml += `<div class="text-block">${formattedText}</div>`;
            }
        });

        // MUDANÇA: Aplica a cor correspondente no cabeçalho estilizado do Universo 2
        modalWindow.innerHTML = `
            <div class="ui-container" style="max-width: 100%;">
                <div class="top-bracket"></div>

                <div class="card-outer">
                    <div class="card-middle">
                        <div class="card-inner">
                            <div class="skill-title">[${name.toUpperCase()}]</div>
                            <div class="skill-rank" style="color: ${rankColor}; text-shadow: 0 0 8px ${rankColor}aa;">RANK: ${rank.toUpperCase()}</div>
                            
                            <div class="skill-description">
                                ${textBlocksHtml}
                                <div class="text-block" style="margin-top: 15px; font-weight: 700; color: #94a3b8;">SSS CLASS REVIVAL HUNTER</div>
                            </div>

                            <div style="margin-top: 25px; display: flex; gap: 10px; width: 100%;">
                                <button class="close-btn" style="flex: 1; margin: 0; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; font-family: 'Segoe UI', sans-serif; font-weight: 600;" onclick="closeModal()">Fechar</button>
                                <button class="close-btn" style="flex: 1; margin: 0; border-color: #ff3366; color: #ff3366; background: rgba(255,51,102,0.05); font-family: 'Segoe UI', sans-serif; font-weight: 600;" onclick="resetSlot(${row}, ${col})">Desvincular</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        modalWindow.innerHTML = `
            <div class="title" id="modalTitle"></div>
            <p class="skill-description" id="modalDescription"></p>
            <div id="modalExtraContent"></div>
            <button class="close-btn" id="modalCloseBtn" onclick="closeModal()">Fechar Registro</button>
        `;

        const currentTitle = document.getElementById('modalTitle');
        const currentDesc = document.getElementById('modalDescription');
        const currentExtra = document.getElementById('modalExtraContent');

        // MUDANÇA: Destaca a cor do Rank no título da janela flutuante padrão
        currentTitle.innerHTML = `${name} [<span style="color: ${rankColor}; text-shadow: 0 0 5px ${rankColor}aa;">Rank ${rank}</span>]`;
        currentTitle.style.color = '#ffcc00';
        currentDesc.innerText = desc;
        
        currentExtra.innerHTML = `
            <div class="sub-section-title" style="color:#00ffcc; margin-top:15px;">Status do Slot</div>
            <p>Vinculada na Linha ${row + 1} da coluna de Origem Multiversal.</p>
            <button class="close-btn" style="margin-top:15px; border-color:#ff3366; color:#ff3366; background:rgba(255,51,102,0.1);" onclick="resetSlot(${row}, ${col})">Desvincular Habilidade</button>
        `;
    }
    
    modal.classList.add('active');
}

function resetSlot(row, col) {
    const slot = document.getElementById(`slot-${row}-${col}`);
    const skillIndex = slot.getAttribute('data-skill-index');
    
    if (skillIndex !== null) {
        equippedSkillsTracker = equippedSkillsTracker.filter(item => item !== `${col}-${skillIndex}`);
    }

    slot.classList.remove('equipped');
    slot.removeAttribute('data-skill-index');
    slot.innerText = '[ Selecionar ]';
    
    slot.onclick = function() { 
        triggerSlotSelection(row, col); 
    };
    
    closeModal();
}

function closeModal() {
    modal.classList.remove('active');
}

modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
});

// Executa a colorização dos elementos fixos assim que o script carregar
colorStaticRanks();

window.openModal = openModal;
window.triggerSlotSelection = triggerSlotSelection;
window.equipSkill = equipSkill;
window.resetSlot = resetSlot;
window.closeModal = closeModal;