let carrinho = [];


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
    li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
    itensCarrinho.appendChild(li);
    total += item.preco;
  });

  cartCount.textContent = carrinho.length;
  totalSpan.textContent = total.toFixed(2);
}


function finalizarPedido() {
  if(carrinho.length === 0){
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Pedido finalizado! Total: R$ ' + document.getElementById('total').textContent);
  carrinho = [];
  atualizarCarrinho();
}


function toggleCarrinho() {
  const carrinhoEl = document.getElementById('carrinho');
  carrinhoEl.classList.toggle('carrinho-fechado');
}


document.getElementById('checkout-button').addEventListener('click', () => {
  if(carrinho.length === 0){
    alert('Seu carrinho está vazio!');
    return;
  }
  const nomeCliente = document.getElementById('nomeCliente').value.trim() || 'Cliente';
  const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
  let mensagem = `Olá, meu nome é *${nomeCliente}* e gostaria de fazer o seguinte pedido:\n\n`;

  carrinho.forEach((item, i) => {
    mensagem += `${i + 1}. ${item.nome} - R$${item.preco.toFixed(2)}\n`;
  });

  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
  mensagem += `\n*Total: R$${total.toFixed(2)}*`;

  if(telefoneCliente) {
    mensagem += `\n\nPor favor, entre em contato comigo pelo WhatsApp: +${telefoneCliente}`;
  }

  const urlWhatsApp = `https://wa.me/5543998306254?text=${encodeURIComponent(mensagem)}`;
  window.open(urlWhatsApp, '_blank');
});


document.getElementById('gerar-qr-button').addEventListener('click', () => {
  const qrcodeCanvas = document.getElementById('qrcode');
  qrcodeCanvas.innerHTML = ''; 

  
  const pixCode = '00020126360014BR.GOV.BCB.PIX0114+554399830625452040000530398654047BR5909Sra. Lourdes6009Curitiba62070503***63041D3D';

  QRCode.toCanvas(qrcodeCanvas, pixCode, { width: 200 }, function (error) {
    if (error) {
      alert('Erro ao gerar QR Code PIX: ' + error);
      return;
    }
    alert('QR Code PIX gerado!');
  });
});
