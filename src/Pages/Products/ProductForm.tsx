import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductDTO } from "../../types";
import { productSchema, ProductFormData } from "../../components/Products/schema/schema";
import FormField from "../../components/Products/FormField";
import ImagePreview from "../../components/Products/ImagePreview";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all";

interface Props {
  initialData?: Partial<CreateProductDTO>;
  onSubmit: (data: CreateProductDTO) => Promise<void>;
  onCancel: () => void;
}

const ProductForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      image_url: initialData?.image_url || "",
    },
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit({
        ...data,
        description: data.description || "",
        price: Number(data.price),
        stock: Number(data.stock),
        image_url: data.image_url || undefined,
      });
    } catch (err: any) {
      if (err.response?.data?.error?.includes("already exists")) {
        setError("name", {
          type: "manual",
          message: "A product with this name already exists",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <FormField label="Product Name" required error={errors.name?.message}>
        <input
          type="text"
          {...register("name")}
          className={inputClass}
          placeholder="Enter product name"
        />
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          {...register("description")}
          rows={3}
          className={inputClass}
          placeholder="Enter product description (optional)"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Price" required error={errors.price?.message}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
              $
            </span>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
        </FormField>

        <FormField label="Stock" required error={errors.stock?.message}>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className={inputClass}
            placeholder="0"
          />
        </FormField>
      </div>

      <FormField label="Image URL" error={errors.image_url?.message}>
        <input
          type="url"
          {...register("image_url")}
          className={inputClass}
          placeholder="https://example.com/image.jpg"
        />
        <ImagePreview url={watch("image_url") || ""} />
      </FormField>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </span>
          ) : (
            "Save Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
