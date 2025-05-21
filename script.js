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

// Renderiza produtos na página
function renderizarProdutos() {
  produtosGrid.innerHTML = ''; // limpa a grid

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

  // Adiciona evento de clique em todos os botões "Adicionar"
  const botoes = produtosGrid.querySelectorAll('button');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const idx = parseInt(botao.getAttribute('data-index'));
      adicionarAoCarrinho(produtos[idx]);
    });
  });
}

// Adiciona item ao carrinho
function adicionarAoCarrinho(produto) {
  // Verifica se o produto já está no carrinho
  const itemExistente = carrinho.find(item => item.nome === produto.nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarCarrinho();
}

// Remove item do carrinho
function removerDoCarrinho(nomeProduto) {
  carrinho = carrinho.filter(item => item.nome !== nomeProduto);
  atualizarCarrinho();
}

// Atualiza o carrinho na UI
function atualizarCarrinho() {
  // Atualiza contador
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  cartCount.textContent = totalItens;

  // Atualiza lista de itens
  itensCarrinho.innerHTML = '';
  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = '<li>Carrinho vazio.</li>';
  } else {
    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nome} (${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}
        <button class="remover-btn" aria-label="Remover ${item.nome}">x</button>
      `;
      // Botão remover
      li.querySelector('button').addEventListener('click', () => {
        removerDoCarrinho(item.nome);
      });

      itensCarrinho.appendChild(li);
    });
  }

  // Atualiza total
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  totalElement.textContent = total.toFixed(2);
}

// Função para alternar visibilidade do carrinho
function toggleCarrinho() {
  const carrinhoSection = document.getElementById('carrinho');
  if (carrinhoSection.style.display === 'block') {
    carrinhoSection.style.display = 'none';
  } else {
    carrinhoSection.style.display = 'block';
  }
}

// Valida cadastro simples
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

// Finaliza pedido e abre WhatsApp com mensagem formatada
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

  // URL encode da mensagem para usar no WhatsApp
  const urlWhats = `https://wa.me/5543998306254?text=${encodeURIComponent(mensagem)}`;

  // Abre nova aba no WhatsApp com mensagem pronta
  window.open(urlWhats, '_blank');

  // Limpa carrinho e inputs
  carrinho = [];
  atualizarCarrinho();
  nomeClienteInput.value = '';
  telefoneClienteInput.value = '';
}

// Inicialização
function init() {
  renderizarProdutos();
  atualizarCarrinho();

  // Esconder carrinho inicialmente
  document.getElementById('carrinho').style.display = 'none';

  // Botão do carrinho
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.addEventListener('click', toggleCarrinho);
}

// Inicia o app após carregar a página
window.addEventListener('DOMContentLoaded', init);
