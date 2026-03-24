import { useState } from "react";
import { useProducts } from "./useProducts";
import { Product, CreateProductDTO } from "../types";
import { filterProducts, calcProductStats } from "../utils/productListUtils";

export const useProductList = () => {
  const {
    products,
    loading,
    error,
    deleteProduct,
    updateProduct,
    createProduct,
  } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsCreating(false);
    setIsModalOpen(false);
  };

  const handleSave = async (data: CreateProductDTO) => {
    if (isCreating) {
      await createProduct(data);
    } else if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    }
    handleCloseModal();
  };

  return {
    loading,
    error,
    products,
    selectedProduct,
    isModalOpen,
    isCreating,
    searchTerm,
    filteredProducts: filterProducts(products, searchTerm),
    stats: calcProductStats(products),
    setSearchTerm,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
    handleCloseModal,
  };
};
