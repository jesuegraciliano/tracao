// script.js

// Converte graus para radianos
function grausParaRadianos(graus) {
  return graus * Math.PI / 180;
}

// Função principal de cálculo
function calcularTracao(event) {
  event.preventDefault();  // impede o envio tradicional do form

  // Obtém valores do formulário
  const peso = parseFloat(document.getElementById('peso').value);
  const alfaDeg = parseFloat(document.getElementById('alfa').value);
  const betaDeg = parseFloat(document.getElementById('beta').value);

  // Converte para radianos
  const alfa = grausParaRadianos(alfaDeg);
  const beta = grausParaRadianos(betaDeg);

  // Calcula seno e cosseno
  const cosA = Math.cos(alfa);
  const sinA = Math.sin(alfa);
  const cosB = Math.cos(beta);
  const sinB = Math.sin(beta);

  // Relação T1 = k * T2
  const k = cosB / cosA;
  const denominador = k * sinA + sinB;

  let resultadoHTML;
  if (Math.abs(denominador) < 1e-6) {
    resultadoHTML = '<p style="color:red">Configuração inválida: verifique os ângulos informados.</p>';
  } else {
    const T2 = peso / denominador;
    const T1 = k * T2;
    resultadoHTML = `
      <p>Tensão na corda 1 (T₁): ${T1.toFixed(2)} N</p>
      <p>Tensão na corda 2 (T₂): ${T2.toFixed(2)} N</p>
    `;
  }

  // Exibe no elemento de saída
  document.getElementById('saida').innerHTML = resultadoHTML;
}

// Associa a função de cálculo ao envio do formulário
document.getElementById('formTracao').addEventListener('submit', calcularTracao);
