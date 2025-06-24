import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './Products.module.css'; // Usando um CSS dedicado para produtos

const Product = () => {
  // --- Estados para cada campo do formulário ---
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');

  // --- Estados de controle ---
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]); // Novo estado para armazenar a lista de marcas
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const productCollection = collection(db, 'products');
  const brandCollection = collection(db, 'brands'); // Referência para a coleção de marcas

  // --- Efeito para buscar os PRODUTOS ---
  useEffect(() => {
    const q = query(productCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });
    return () => unsubscribe();
  }, []);

  // --- Efeito para buscar as MARCAS (para o <select>) ---
  useEffect(() => {
    const q = query(brandCollection, orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBrands(list);
    });
    return () => unsubscribe();
  }, []);

  // Efeito para limpar a mensagem após 3 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const clearForm = () => {
    setName('');
    setBrand('');
    setPrice('');
    setUnit('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || brand.trim() === '' || price.trim() === '') {
      setMessage('Por favor, preencha nome, marca e preço.');
      return;
    }

    setLoading(true);

    const productData = {
      name,
      brand,
      price: Number(price), // Salvar preço como número
      unit,
    };

    try {
      if (editId) {
        const productRef = doc(db, 'products', editId);
        await updateDoc(productRef, productData);
        setMessage('Produto atualizado com sucesso!');
        setEditId(null);
      } else {
        await addDoc(productCollection, {
          ...productData,
          createdAt: Timestamp.now(),
        });
        setMessage('Produto cadastrado com sucesso!');
      }
      clearForm();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setMessage('Erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setBrand(product.brand);
    setPrice(product.price);
    setUnit(product.unit || ''); // Garante que não seja undefined
    setMessage('');
    window.scrollTo(0, 0); // Rola a página para o topo para ver o formulário
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmDelete) return;

    try {
      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);
      setMessage('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage('Erro ao excluir o produto.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.formWrapper}>
      <h2><center>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</center></h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome do Produto:
          <input
            type="text"
            placeholder="Ex: Leite Integral"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        
        <label>
          Marca:
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">-- Selecione uma marca --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </label>

        <label>
          Preço (R$):
          <input
            type="number"
            placeholder="Ex: 4.99"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Unidade:
          <input
            type="text"
            placeholder="Ex: 1L, 500g, Unidade"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </label>

        <button type="submit" className={styles.btn} disabled={loading}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar produtos pelo nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {message && <p className={styles.message}>{message}</p>}

      <h3>Produtos Cadastrados:</h3>
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <div className={styles.productInfo}>
              <strong>{product.name}</strong>
              <span>Marca: {product.brand}</span>
              <span>Preço: R$ {Number(product.price).toFixed(2)} / {product.unit}</span>
            </div>
            <div className={styles.productActions}>
              <button onClick={() => handleEdit(product)} className={styles.btnEdit}>Editar</button>
              <button onClick={() => handleDelete(product.id)} className={styles.btnDelete}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;