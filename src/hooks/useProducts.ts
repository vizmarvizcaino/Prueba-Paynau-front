import { useState, useEffect, useCallback } from 'react';
import { Product, CreateProductDTO, UpdateProductDTO } from '../types';
import * as productService from '../services/productService';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch products';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: CreateProductDTO) => {
    setLoading(true);
    try {
      const newProduct = await productService.createProduct(data);
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product created successfully');
      return newProduct;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to create product';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: number, data: UpdateProductDTO) => {
    setLoading(true);
    try {
      const updatedProduct = await productService.updateProduct(id, data);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      toast.success('Product updated successfully');
      return updatedProduct;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to update product';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to delete product';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};