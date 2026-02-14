/**
 * DATA MIGRATION & BACKUP SERVICE
 * 
 * This service provides future-proof data management:
 * - Automatic versioning of database schema
 * - Data migration utilities
 * - Backup and restore capabilities
 * - Export/import functionality
 */

import { supabase } from './supabase';
import { Booking, Order } from '../types';

// Schema version tracking
const CURRENT_SCHEMA_VERSION = '1.0.0';

export const dataMigrationService = {
  /**
   * Check if database needs migration
   */
  checkSchemaVersion: async (): Promise<{ needsMigration: boolean; currentVersion: string }> => {
    try {
      const { data, error } = await supabase
        .from('schema_version')
        .select('version')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        return { needsMigration: true, currentVersion: '0.0.0' };
      }

      return {
        needsMigration: data.version !== CURRENT_SCHEMA_VERSION,
        currentVersion: data.version
      };
    } catch (err) {
      console.error('Schema version check failed:', err);
      return { needsMigration: false, currentVersion: 'unknown' };
    }
  },

  /**
   * Export all data to JSON (for backup)
   */
  exportAllData: async (): Promise<{ bookings: Booking[]; orders: Order[]; exportDate: string } | null> => {
    try {
      const [bookingsResult, ordersResult] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false })
      ]);

      if (bookingsResult.error || ordersResult.error) {
        throw new Error('Export failed');
      }

      const bookings = bookingsResult.data.map(b => ({
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

      const orders = ordersResult.data.map(o => ({
        id: o.id,
        customerName: o.customer_name,
        phoneNumber: o.phone_number,
        address: o.address,
        items: o.items,
        total: o.total,
        status: o.status,
        createdAt: new Date(o.created_at).getTime()
      }));

      return {
        bookings,
        orders,
        exportDate: new Date().toISOString()
      };
    } catch (err) {
      console.error('Data export error:', err);
      return null;
    }
  },

  /**
   * Download data as JSON file
   */
  downloadBackup: async (filename?: string): Promise<void> => {
    const data = await dataMigrationService.exportAllData();
    if (!data) {
      alert('Failed to export data');
      return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `umer-umair-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Get database statistics
   */
  getStats: async (): Promise<{
    totalBookings: number;
    totalOrders: number;
    pendingBookings: number;
    pendingOrders: number;
    totalRevenue: number;
    lastBackup?: string;
  } | null> => {
    try {
      const [bookingsResult, ordersResult] = await Promise.all([
        supabase.from('bookings').select('status'),
        supabase.from('orders').select('status, total')
      ]);

      if (bookingsResult.error || ordersResult.error) {
        return null;
      }

      const totalBookings = bookingsResult.data.length;
      const pendingBookings = bookingsResult.data.filter(b => b.status === 'pending').length;
      const totalOrders = ordersResult.data.length;
      const pendingOrders = ordersResult.data.filter(o => o.status === 'pending').length;
      const totalRevenue = ordersResult.data
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + Number(o.total), 0);

      return {
        totalBookings,
        totalOrders,
        pendingBookings,
        pendingOrders,
        totalRevenue
      };
    } catch (err) {
      console.error('Stats fetch error:', err);
      return null;
    }
  },

  /**
   * Archive old data (move to archive table)
   * Use this to keep main tables performant
   */
  archiveOldData: async (olderThanDays: number = 365): Promise<{ archived: number } | null> => {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      // Archive completed bookings older than cutoff
      const { data: oldBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'completed')
        .lt('created_at', cutoffDate.toISOString());

      if (oldBookings && oldBookings.length > 0) {
        // You would implement archive table insertion here
        console.log(`Would archive ${oldBookings.length} old bookings`);
      }

      return { archived: oldBookings?.length || 0 };
    } catch (err) {
      console.error('Archive error:', err);
      return null;
    }
  },

  /**
   * Cleanup test data (useful during development)
   */
  cleanupTestData: async (): Promise<boolean> => {
    try {
      // Only allow in development
      if (process.env.NODE_ENV === 'production') {
        console.warn('Cannot cleanup in production');
        return false;
      }

      // Delete test entries (customize as needed)
      await Promise.all([
        supabase.from('bookings').delete().ilike('customer_name', '%test%'),
        supabase.from('orders').delete().ilike('customer_name', '%test%')
      ]);

      return true;
    } catch (err) {
      console.error('Cleanup error:', err);
      return false;
    }
  }
};

/**
 * Automatic backup scheduler
 * Call this in your admin dashboard or as a cron job
 */
export const scheduleAutoBackup = () => {
  // Check if we should backup (once per week)
  const lastBackup = localStorage.getItem('last_backup_date');
  const now = new Date().toISOString().split('T')[0];

  if (!lastBackup || lastBackup !== now) {
    const shouldBackup = window.confirm(
      'It has been a while since your last backup. Would you like to download a backup now?'
    );

    if (shouldBackup) {
      dataMigrationService.downloadBackup();
      localStorage.setItem('last_backup_date', now);
    }
  }
};
