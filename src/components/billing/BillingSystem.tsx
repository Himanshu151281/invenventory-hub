
import React, { useState } from 'react';
import { QrCode, Plus, Search, Trash, CornerDownLeft, CreditCard, Banknote, Receipt } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProducts } from '@/lib/mockData';
import { BillItem, Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const BillingSystem: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'online'>('cash');
  
  // Calculate totals
  const subtotal = billItems.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  
  const handleAddToBill = () => {
    if (!selectedProduct) return;
    
    // Check if product is already in the bill
    const existingItemIndex = billItems.findIndex(item => item.product.id === selectedProduct.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedBillItems = [...billItems];
      const item = updatedBillItems[existingItemIndex];
      const newQuantity = item.quantity + quantity;
      
      // Check stock
      if (newQuantity > selectedProduct.stock) {
        toast({
          title: "Insufficient stock",
          description: `Only ${selectedProduct.stock} items available`,
          variant: "destructive"
        });
        return;
      }
      
      updatedBillItems[existingItemIndex] = {
        ...item,
        quantity: newQuantity,
        subtotal: selectedProduct.price * newQuantity
      };
      
      setBillItems(updatedBillItems);
    } else {
      // Add new item
      if (quantity > selectedProduct.stock) {
        toast({
          title: "Insufficient stock",
          description: `Only ${selectedProduct.stock} items available`,
          variant: "destructive"
        });
        return;
      }
      
      setBillItems([
        ...billItems,
        {
          product: selectedProduct,
          quantity,
          subtotal: selectedProduct.price * quantity
        }
      ]);
    }
    
    // Reset selection
    setSelectedProduct(null);
    setQuantity(1);
    setSearchQuery('');
  };
  
  const handleRemoveItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Auto-select product if barcode matches exactly
    const product = mockProducts.find(p => p.barcode === query);
    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
  };
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSearchQuery(product.name);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleCompleteSale = () => {
    // In a real app, process payment and update inventory
    toast({
      title: "Sale completed",
      description: `Payment of $${total.toFixed(2)} received via ${paymentMethod}`,
    });
    
    // Reset bill
    setBillItems([]);
  };
  
  // Filter products based on search
  const filteredProducts = searchQuery 
    ? mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode.includes(searchQuery)
      )
    : [];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Add Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search product or scan barcode..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
              
              {searchQuery && (
                <div className="border rounded-md overflow-hidden">
                  <AnimatePresence>
                    {filteredProducts.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto">
                        {filteredProducts.map(product => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="p-3 border-b last:border-0 hover:bg-muted cursor-pointer flex justify-between items-center"
                            onClick={() => handleProductSelect(product)}
                          >
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">Barcode: {product.barcode}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${product.price.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-3 text-center text-muted-foreground"
                      >
                        No products found
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
              
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border rounded-md p-4 space-y-3"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="font-semibold">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-20">
                      <Input
                        type="number"
                        min="1"
                        max={selectedProduct.stock}
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                    </div>
                    <Button onClick={handleAddToBill} className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Bill
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Current Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billItems.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Item</span>
                    <div className="flex">
                      <span className="w-20 text-right">Price</span>
                      <span className="w-20 text-right">Qty</span>
                      <span className="w-24 text-right">Total</span>
                      <span className="w-8"></span>
                    </div>
                  </div>
                  <Separator />
                  <AnimatePresence>
                    {billItems.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${index}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-between items-center py-2"
                      >
                        <span className="flex-1 font-medium">{item.product.name}</span>
                        <div className="flex items-center">
                          <span className="w-20 text-right">${item.product.price.toFixed(2)}</span>
                          <span className="w-20 text-right">{item.quantity}</span>
                          <span className="w-24 text-right font-medium">${item.subtotal.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <Receipt className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No items added to bill yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded-md p-3 text-center cursor-pointer transition-all ${
                    paymentMethod === 'cash' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <Banknote className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Cash</span>
                </div>
                <div
                  className={`border rounded-md p-3 text-center cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Card</span>
                </div>
                <div
                  className={`border rounded-md p-3 text-center cursor-pointer transition-all ${
                    paymentMethod === 'online' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <QrCode className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button
            className="w-full h-12 text-lg"
            disabled={billItems.length === 0}
            onClick={handleCompleteSale}
          >
            <CornerDownLeft className="h-5 w-5 mr-2" />
            Complete Sale
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingSystem;
