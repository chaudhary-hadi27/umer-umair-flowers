import { Booking, Order } from '../../types.ts';
import { supabase } from './supabase.ts';

export const storageService = {
  // Bookings
  saveBooking: async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking | null> => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        { 
          customer_name: booking.customerName,
          phone_number: booking.phoneNumber,
          service_type: booking.serviceType,
          event_date: booking.date,
          location: booking.location,
          special_instructions: booking.specialInstructions,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving booking:', error);
      return null;
    }

    return {
      id: data.id,
      customerName: data.customer_name,
      phoneNumber: data.phone_number,
      serviceType: data.service_type,
      date: data.event_date,
      location: data.location,
      specialInstructions: data.special_instructions,
      status: data.status,
      createdAt: new Date(data.created_at).getTime()
    };
  },

  getAllBookings: async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }

    return data.map(b => ({
      id: b.id,
      customerName: b.customer_name,
      phoneNumber: b.phone_number,
      serviceType: b.service_type,
      date: b.event_date,
      location: b.location,
      specialInstructions: b.special_instructions,
      status: b.status,
      createdAt: new Date(b.created_at).getTime()
    }));
  },

  updateBookingStatus: async (id: string, status: Booking['status']): Promise<boolean> => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    return !error;
  },

  deleteBooking: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    return !error;
  },

  // Orders
  saveOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order | null> => {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: order.customerName,
          phone_number: order.phoneNumber,
          address: order.address,
          items: order.items,
          total: order.total,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving order:', error);
      return null;
    }

    return {
      id: data.id,
      customerName: data.customer_name,
      phoneNumber: data.phone_number,
      address: data.address,
      items: data.items,
      total: data.total,
      status: data.status,
      createdAt: new Date(data.created_at).getTime()
    };
  },

  getAllOrders: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data.map(o => ({
      id: o.id,
      customerName: o.customer_name,
      phoneNumber: o.phone_number,
      address: o.address,
      items: o.items,
      total: o.total,
      status: o.status,
      createdAt: new Date(o.created_at).getTime()
    }));
  },

  updateOrderStatus: async (id: string, status: Order['status']): Promise<boolean> => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    return !error;
  },

  deleteOrder: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    return !error;
  }
};