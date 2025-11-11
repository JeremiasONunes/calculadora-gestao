// Navegação entre abas
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Atualizar botões ativos
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Mostrar conteúdo da aba
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');
    });
});

// Ponto de Equilíbrio
document.getElementById('peForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const gastoFixo = parseCurrency(document.getElementById('gastoFixo').value);
    const precoVenda = parseCurrency(document.getElementById('precoVenda').value);
    const gastoVariavel = parseCurrency(document.getElementById('gastoVariavel').value);
    
    if (precoVenda <= gastoVariavel) {
        alert('O preço de venda deve ser maior que o gasto variável!');
        return;
    }
    
    const margemContribuicao = precoVenda - gastoVariavel;
    const pontoEquilibrio = gastoFixo / margemContribuicao;
    
    document.getElementById('peValue').textContent = `${Math.ceil(pontoEquilibrio)} unidades`;
    document.getElementById('margemValue').textContent = formatCurrency(margemContribuicao);
    
    document.getElementById('peResultado').classList.remove('hidden');
});

// Lucratividade
document.getElementById('lucratividadeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const lucro = parseCurrency(document.getElementById('lucro').value);
    const receita = parseCurrency(document.getElementById('receita').value);
    
    if (receita <= 0) {
        alert('A receita deve ser maior que zero!');
        return;
    }
    
    const lucratividade = (lucro / receita) * 100;
    
    document.getElementById('lucratividadeValue').textContent = `${lucratividade.toFixed(2)}%`;
    document.getElementById('lucratividadeResultado').classList.remove('hidden');
});

// Rentabilidade
document.getElementById('rentabilidadeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const lucro = parseCurrency(document.getElementById('lucroRent').value);
    const capital = parseCurrency(document.getElementById('capital').value);
    
    if (capital <= 0) {
        alert('O capital investido deve ser maior que zero!');
        return;
    }
    
    const rentabilidade = (lucro / capital) * 100;
    
    document.getElementById('rentabilidadeValue').textContent = `${rentabilidade.toFixed(2)}%`;
    document.getElementById('rentabilidadeResultado').classList.remove('hidden');
});

// Máscara de valores monetários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function parseCurrency(value) {
    return parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
}

// Aplicar máscara nos inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
        
        // Aplicar máscara de moeda
        let value = parseCurrency(this.value);
        if (value > 0) {
            this.value = value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    });
    
    input.addEventListener('blur', function() {
        let value = parseCurrency(this.value);
        if (value > 0) {
            this.value = value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    });
});