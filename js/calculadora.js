let configuracaoAmbiente = {};
        
// Função para configurar o ambiente
function configurarAmbiente() {
    const altura = parseFloat(document.getElementById('altura').value);
    const comprimento = parseFloat(document.getElementById('comprimento').value);
    const qtdPessoas = parseInt(document.getElementById('qtdPessoas').value);
    const qtdEletronicos = parseInt(document.getElementById('qtdEletronicos').value);
    const exposicaoSol = document.getElementById('exposicao').checked; // Verifica se o checkbox está marcado

    // Validação dos campos
    if (isNaN(altura) || isNaN(comprimento) || isNaN(qtdPessoas) || isNaN(qtdEletronicos)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cálculo da área
    const area = altura * comprimento;
    let btuIdeal = 0;

    // Definir BTU ideal com base na área
    if (area < 10) {
        btuIdeal = 5000;
    } else if (area < 15) {
        btuIdeal = 7000;
    } else if (area < 20) {
        btuIdeal = 9000;
    } else if (area < 25) {
        btuIdeal = 12000;
    } else if (area < 30) {
        btuIdeal = 14000;
    } else if (area < 35) {
        btuIdeal = 16000;
    } else if (area < 40) {
        btuIdeal = 18000;
    } else if (area < 45) {
        btuIdeal = 20000;
    } else {
        btuIdeal = 22000;
    }

    // Adicionar BTU adicional para pessoas e eletrônicos
    btuIdeal += (qtdPessoas * 600);
    btuIdeal += (qtdEletronicos * 200);

    // Caso tenha alta exposição ao sol, aumentar 15% no BTU
    if (exposicaoSol) {
        btuIdeal *= 1.15;
    }

    configuracaoAmbiente = { area, qtdPessoas, qtdEletronicos, exposicaoSol, btuIdeal };
    
    // Exibir as configurações
    document.getElementById('resultadoAmbiente').innerText = `
        Área do ambiente: ${area.toFixed(2)} m²
        Quantidade de pessoas: ${qtdPessoas}
        Quantidade de eletrônicos: ${qtdEletronicos}
        Exposição ao sol: ${exposicaoSol ? 'Alta' : 'Baixa'}
        BTU Ideal: ${btuIdeal.toFixed(2)}
    `;
}

// Função para calcular o consumo do ventilador e do ar-condicionado
function calcularConsumo() {
    if (!configuracaoAmbiente.btuIdeal) {
        alert("Primeiro, configure o ambiente!");
        return;
    }

    const btuIdeal = configuracaoAmbiente.btuIdeal;
    const potenciaVentilador = 50; // Potência fixa do ventilador (em Watts)
    const horasPorDia = 24; // Uso diário do ventilador
    const diasNoMes = 30; // Considerando um mês de 30 dias
    const precoKwh = 0.85; // Preço do kWh em reais

    // Consumo mensal do ventilador
    const consumoVentiladorKwh = (potenciaVentilador / 1000) * horasPorDia * diasNoMes; // kWh/mês
    const consumoMensalVentilador = consumoVentiladorKwh * precoKwh;

    // Consumo mensal do ar-condicionado (em kWh)
    const consumoKwhAr = (btuIdeal / 1000) * 0.1; // Consumo por hora em kWh
    const horasArCondicionado = 8; // Assumindo 8 horas de uso por dia
    const consumoMensalArCondicionado = consumoKwhAr * horasArCondicionado * diasNoMes * precoKwh;

    // Exibindo resultados
    document.getElementById('resultadoConsumo').innerText = `
        Consumo mensal do ventilador (Poço Canadense): R$ ${consumoMensalVentilador.toFixed(2)}
        Consumo mensal do ar-condicionado: R$ ${consumoMensalArCondicionado.toFixed(2)}
        Total de consumo com ambos os sistemas: R$ ${(consumoMensalVentilador + consumoMensalArCondicionado).toFixed(2)}
    `;
}