/let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const itensCarrinho = document.getElementById('itensCarrinho');
  const cartCount = document.getElementById('cartCount');
  const totalSpan = document.getElementById('total');
  
  itensCarrinho.innerHTML = '';
  let total = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$${item.preco}`;
    itensCarrinho.appendChild(li);
    total += item.preco;
  });
  
  cartCount.textContent = carrinho.length;
  totalSpan.textContent = total;
}

function finalizarPedido() {
  alert('Pedido finalizado! Total: R$' + document.getElementById('total').textContent);
  carrinho = [];
  atualizarCarrinho();
}

function toggleCarrinho() {
  const carrinhoEl = document.getElementById('carrinho');
  carrinhoEl.classList.toggle('carrinho-fechado');
}

// Aqui você pode colocar o código para o QR Code e envio via WhatsApp que já tinha
