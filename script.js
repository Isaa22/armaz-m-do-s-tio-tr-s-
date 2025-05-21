// Lista de produtos
const produtos = [
  { nome: "Pão de queijo", preco: 10, img: "ChatGPT Image 26 de abr. de 2025, 22_30_43.png" },
  { nome: "Queijo artesanal", preco: 25, img: "ChatGPT Image 26 de abr. de 2025, 22_32_40.png" },
  { nome: "Uva", preco: 20, img: "ChatGPT Image 26 de abr. de 2025, 22_36_29.png" },
  { nome: "Mel Orgânico", preco: 20, img: "ChatGPT Image 26 de abr. de 2025, 22_26_54.png" },
  { nome: "Pão caseiro", preco: 15, img: "WhatsApp Image 2025-04-27 at 23.22.19 (1).jpeg" },
  { nome: "Tomate artesanal", preco: 15, img: "WhatsApp Image 2025-04-26 at 22.39.06.jpeg" },
  { nome: "Alface", preco: 10, img: "WhatsApp Image 2025-04-26 at 22.42.44.jpeg" },
  { nome: "Goiabada", preco: 15, img: "WhatsApp Image 2025-04-27 at 09.43.38.jpeg" },
  { nome: "Melancia", preco: 10, img: "WhatsApp Image 2025-04-27 at 09.33.48.jpeg" },
  { nome: "Pitaya", preco: 10, img: "WhatsApp Image 2025-04-27 at 09.33.09.jpeg" },
  { nome: "Bolo simples", preco: 10, img: "WhatsApp Image 2025-04-27 at 09.33.09 (1).jpeg" },
  { nome: "Geleia Caseira", preco: 15, img: "WhatsApp Image 2025-04-27 at 23.22.19.jpeg" },
];

// Estado do carrinho
let carrinho = [];

// Elementos DOM
const produtosGrid = document.getElementById('produtosGrid');
const cartCount = document.getElementById('cartCount');
const itensCarrinho = document.getElementById('itensCarrinho');
const totalElement = document.getElementById('total');
const nomeClienteInput = document.getElementById('nomeCliente');
const telefoneClienteInput = document.getElementById('telefoneCliente');
const carrinhoSection = document.getElementById('carrinho');
const pixSection = document.getElementById('pixSection');
const pixQRCodeContainer = document.getElementById('pixQRCode');
const copiarPixBtn = document.getElementById('copiarPixBtn');

const chavePix = "00020126360014BR.GOV.BCB.PIX01145449999999952040000530398654045.005802BR5909Seu Negócio6009Cidade XYZ62070503***63041D3D"; // EXEMPLO (troque pela sua chave Pix real)

function renderizarProdutos() {
  produtosGrid.innerHTML = '';

  produtos.forEach((produto, index) => {
    const card = document.createElement('div');
    card.className = 'produto';

    card.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$${produto.preco.toFixed(2)}</p>
      <button data-index="${index}">Adicionar</button>
    `;

    produtosGrid.appendChild(card);
  });

  const botoes = produtosGrid.querySelectorAll('button');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const idx = parseInt(botao.getAttribute('data-index'));
      adicionarAoCarrinho(produtos[idx]);
    });
  });
}

function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.find(item => item.nome === produto.nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarCarrinho();
}

function removerDoCarrinho(nomeProduto) {
  carrinho = carrinho.filter(item => item.nome !== nomeProduto);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  // Atualiza contador
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  cartCount.textContent = totalItens;

  // Atualiza lista de itens
  itensCarrinho.innerHTML = '';
  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = '<li>Carrinho vazio.</li>';
    pixSection.style.display = 'none';
  } else {
    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nome} (${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}
        <button class="remover-btn" aria-label="Remover ${item.nome}">x</button>
      `;
      li.querySelector('button').addEventListener('click', () => {
        removerDoCarrinho(item.nome);
      });
      itensCarrinho.appendChild(li);
    });
    pixSection.style.display = 'block';
    gerarPixQRCode();
  }

  // Atualiza total
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  totalElement.textContent = total.toFixed(2);
}

function toggleCarrinho() {
  if (carrinhoSection.style.display === 'block') {
    carrinhoSection.style.display = 'none';
  } else {
    carrinhoSection.style.display = 'block';
  }
}

function validarCadastro() {
  const nome = nomeClienteInput.value.trim();
  const telefone = telefoneClienteInput.value.trim();

  if (nome.length < 2) {
    alert('Por favor, insira um nome válido.');
    return false;
  }

  if (!/^\d{11,}$/.test(telefone)) {
    alert('Por favor, insira um número de WhatsApp válido (apenas números, ex: 55499999999).');
    return false;
  }

  return true;
}

function finalizarPedido() {
  if (!validarCadastro()) return;

  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const nome = nomeClienteInput.value.trim();
  const telefone = telefoneClienteInput.value.trim();

  let mensagem = `Olá, meu nome é ${nome}.\nGostaria de fazer o pedido:\n`;

  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (x${item.quantidade}) - R$${(item.preco * item.quantidade).toFixed(2)}\n`;
  });

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  mensagem += `Total: R$${total.toFixed(2)}\n\nMeu WhatsApp: ${telefone}`;

  const urlWhats = `https://wa.me/5543998306254?text=${encodeURIComponent(mensagem)}`;
  window.open(urlWhats, '_blank');

  carrinho = [];
  atualizarCarrinho();
  nomeClienteInput.value = '';
  telefoneClienteInput.value = '';
}

function gerarPixQRCode() {
  // Gera QR code do PIX com valor atualizado
  pixQRCodeContainer.innerHTML = ''; // limpa

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  // Montar payload PIX com valor dinâmico
  // Aqui só um exemplo simples, em produção você pode usar libs que geram o padrão EMV completo

  const payloadPix = `${chavePix.replace('***', total.toFixed(2).replace('.', ','))}`; // substitui valor no payload

  new QRCode(pixQRCodeContainer, {
    text: payloadPix,
    width: 180,
    height: 180,
    colorDark: "#25d366",
    colorLight: "#e6f9f4",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function copiarPix() {
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const pixCode = chavePix.replace('***', total.toFixed(2).replace('.', ','));
  navigator.clipboard.writeText(pixCode).then(() => {
    alert('Código PIX copiado para a área de transferência!');
  });
}

function init() {
  renderizarProdutos();
  atualizarCarrinho();

  carrinhoSection.style.display = 'none';
  pixSection.style.display = 'none';

  document.querySelector('.cart-icon').addEventListener('click', toggleCarrinho);
  document.getElementById('finalizarPedidoBtn').addEventListener('click', finalizarPedido);
  copiarPixBtn.addEventListener('click', copiarPix);
}

window.addEventListener('DOMContentLoaded', init);
