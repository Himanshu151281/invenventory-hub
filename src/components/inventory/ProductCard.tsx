
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const { name, price, stock, category, barcode, imageUrl } = product;
  
  const stockStatus = stock <= 5 ? 'low' : stock <= 20 ? 'medium' : 'high';
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="aspect-video relative overflow-hidden bg-muted">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base line-clamp-1">{name}</h3>
            <Badge 
              variant={
                stockStatus === 'low' ? 'destructive' : 
                stockStatus === 'medium' ? 'outline' : 'secondary'
              }
              className="ml-2 whitespace-nowrap"
            >
              {stock} in stock
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Category: {category}</p>
            <p>Barcode: {barcode}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-semibold">${price.toFixed(2)}</span>
            <div className="flex gap-2">
              {onEdit && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onEdit(product)}
                  aria-label={`Edit ${name}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(product)}
                  aria-label={`Delete ${name}`}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
