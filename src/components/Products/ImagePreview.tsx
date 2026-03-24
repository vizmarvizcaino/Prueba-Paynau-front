import React from "react";

interface Props {
  url: string;
}

const ImagePreview: React.FC<Props> = ({ url }) => {
  if (!url) return null;

  return (
    <div className="mt-3">
      <p className="text-xs text-gray-500 mb-2">Preview:</p>
      <img
        src={url}
        alt="Preview"
        className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/96?text=Invalid+URL";
        }}
      />
    </div>
  );
};

export default ImagePreview;