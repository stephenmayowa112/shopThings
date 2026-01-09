'use server';

import { createClient } from '@/lib/supabase/server';
import { CartItemWithProduct } from '@/types';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string; // Not used in address table but useful
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function createOrder(
  items: CartItemWithProduct[],
  shippingDetails: ShippingDetails,
  totalAmount: number,
  paymentMethod: string,
  paymentReference?: string
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Please sign in to complete your order.' };
  }

  try {
    // 1. Create Address Record
    const { data: addressData, error: addressError } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        full_name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
        phone: shippingDetails.phone,
        address_line_1: shippingDetails.address,
        city: shippingDetails.city,
        state: shippingDetails.state,
        postal_code: shippingDetails.postalCode,
        country: shippingDetails.country,
        label: 'Home', // Default label
        is_default: true, // Make default for now
      })
      .select()
      .single();

    if (addressError) throw new Error(`Address creation failed: ${addressError.message}`);

    // 2. Create Order Record
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shippingCost = subtotal > 50000 ? 0 : 2500;
    
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: 'pending',
        payment_status: paymentMethod === 'paystack' ? 'completed' : 'pending', // Assume completed if we got here with paystack
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: subtotal + shippingCost,
        currency: 'NGN',
        shipping_address_id: addressData.id,
        notes: `Payment Method: ${paymentMethod}, Ref: ${paymentReference || 'N/A'}`,
      })
      .select()
      .single();

    if (orderError) throw new Error(`Order creation failed: ${orderError.message}`);

    // 3. Create Order Items
    const orderItems = items.map(item => ({
      order_id: orderData.id,
      product_id: item.product.id,
      vendor_id: item.product.vendor.id, // Assuming product has vendor object with id
      quantity: item.quantity,
      unit_price: item.product.price,
      total_price: item.product.price * item.quantity,
      currency: 'NGN'
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw new Error(`Order items creation failed: ${itemsError.message}`);

    return { success: true, orderNumber: orderNumber };

  } catch (error: any) {
    console.error('Order processing error:', error);
    return { error: error.message };
  }
}
