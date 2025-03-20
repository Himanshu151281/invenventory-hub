
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 hidden lg:block relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to InvenHub
            </h1>
            <p className="text-lg text-muted-foreground">
              The advanced inventory management system that simplifies stock tracking, billing, and sales analytics.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="text-primary font-medium mb-2">Stock Management</div>
                <p className="text-sm text-muted-foreground">
                  Track inventory with barcode scanning and automated stock updates.
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="text-primary font-medium mb-2">Sales & Billing</div>
                <p className="text-sm text-muted-foreground">
                  Generate bills and update stock in real-time after each sale.
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="text-primary font-medium mb-2">Secure Access</div>
                <p className="text-sm text-muted-foreground">
                  User registration with password hashing and OTP verification.
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="text-primary font-medium mb-2">Sales Analytics</div>
                <p className="text-sm text-muted-foreground">
                  Insights with sales predictions powered by machine learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
