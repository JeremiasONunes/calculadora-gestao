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
    
    const gastoFixo = parseFloat(document.getElementById('gastoFixo').value) || 0;
    const precoVenda = parseFloat(document.getElementById('precoVenda').value) || 0;
    const gastoVariavel = parseFloat(document.getElementById('gastoVariavel').value) || 0;
    
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
    
    const lucro = parseFloat(document.getElementById('lucro').value) || 0;
    const receita = parseFloat(document.getElementById('receita').value) || 0;
    
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
    
    const lucro = parseFloat(document.getElementById('lucroRent').value) || 0;
    const capital = parseFloat(document.getElementById('capital').value) || 0;
    
    if (capital <= 0) {
        alert('O capital investido deve ser maior que zero!');
        return;
    }
    
    const rentabilidade = (lucro / capital) * 100;
    
    document.getElementById('rentabilidadeValue').textContent = `${rentabilidade.toFixed(2)}%`;
    document.getElementById('rentabilidadeResultado').classList.remove('hidden');
});

// Formatação de moeda para exibição
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Validação simples dos inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});