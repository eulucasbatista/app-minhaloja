import React, { useState, useEffect } from "react";

interface IProdutos {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
  categoria_id: number;
  categoria_nome: string;
}


interface IShoppingCartItem {
  product: IProdutos;
  quantity: number;
}

export const ShoppingCartPage = () => {
  const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>([]);
  const [produtos, setProdutos] = useState<IProdutos[]>([]);
  const [menssagem, setMenssagem] = useState()
  
  useEffect(() => {
    fetch('http://localhost:3001/produtos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart = (id: number) => {
    const produto = produtos.find((produto) => produto.id === id);
    const alreadyInShoppingCart = shoppingCart.find(
      (item) => item.product.id === id
    );
    // if produto is in the shopping cart
    if (alreadyInShoppingCart) {
      const newShoppingCart: IShoppingCartItem[] = shoppingCart.map((item) => {
        if (item.product.id === id)
          ({
            ...item,
            quantity: item.quantity++,
          });
        return item;
      });
      setShoppingCart(newShoppingCart);
      return;
    }
    // if produto is not already in the shopping cart
    const cartItem: IShoppingCartItem = {
      product: produto!,
      quantity: 1,
    };
    const newShoppingCart: IShoppingCartItem[] = [...shoppingCart, cartItem];
    setShoppingCart(newShoppingCart);
  };

  const handleRemoveFromCart = (id: number) => {
    const alreadyInShoppingCart = shoppingCart.find(
      (item) => item.product.id === id
    );

    if (alreadyInShoppingCart!.quantity > 1) {
      const newShoppingCart: IShoppingCartItem[] = shoppingCart.map((item) => {
        if (item.product.id === id)
          ({
            ...item,
            quantity: item.quantity--,
          });
        return item;
      });
      setShoppingCart(newShoppingCart);
      return;
    }

    // if there is only one item with the id in the cart
    const newShoppingCart: IShoppingCartItem[] = shoppingCart.filter(
      (item) => item.product.id !== id
    );
    setShoppingCart(newShoppingCart);
  };

  const handleCleanCart = () => {
    setShoppingCart([]);
  };

  const handleCheckoutCart = () => {
    setShoppingCart([]);
    setMenssagem("Parabéns Compra Finalizada!");

  }

  const totalCart = shoppingCart.reduce((total, current) => {
    return total + current.product.preco * current.quantity;
  }, 0);

  return (
    <div>
      <h2>Minha Loja</h2>
      <ul>
        {produtos.map((produto, categorias) => (
          <li key={produto.id}>
            <p>{produto.nome}</p>
            <p>{produto.descricao}</p>
            <p>{produto.preco}</p>
            <img src={produto.foto} alt="imagens dos produtos" />
            <p>Categoria - {produto.categoria_id} {categorias.nome}</p>
            <button onClick={() => handleAddToCart(produto.id)}>
              Adionar ao Carrinho
            </button>
          </li>
        ))}
      </ul>
      <h2>Valor Total (R$ {totalCart.toFixed(2)})</h2>
      <button onClick={handleCleanCart}>Limpar Carrinho</button>
      <ul>
        {shoppingCart.map((item) => (
          <li>
            <p>Produto: {item.product.nome}</p>
            <p>Preço: {item.product.preco}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>Total: R$:{(item.quantity * item.product.preco).toFixed(2)}</p>
            <button onClick={() => handleRemoveFromCart(item.product.id)}>
              Remover do Carrinho
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckoutCart}>Finalizar Compra!</button>
      <p>{menssagem}</p>
    </div>
  );
};
