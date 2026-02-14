-- =====================================================
-- UMER & UMAIR FLOWERS - FUTURE-PROOF DATABASE SCHEMA
-- =====================================================
-- Version: 2.0.0
-- Features: Versioning, Analytics, Audit Trails, Performance Indexes
-- =====================================================

-- =====================================================
-- SCHEMA VERSION TRACKING
-- =====================================================
CREATE TABLE IF NOT EXISTS schema_version (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert current version
INSERT INTO schema_version (version, description) 
VALUES ('2.0.0', 'Enhanced schema with analytics and audit trails');

-- =====================================================
-- BOOKINGS TABLE (Enhanced)
-- =====================================================
DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT, -- Optional email for future notifications
  
  -- Booking Details
  service_type TEXT NOT NULL,
  event_date TEXT NOT NULL,
  location TEXT NOT NULL,
  special_instructions TEXT,
  
  -- Pricing (added for future)
  estimated_price NUMERIC,
  final_price NUMERIC,
  
  -- Status Management
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  source TEXT DEFAULT 'website', -- track where booking came from
  notes TEXT, -- Internal admin notes
  
  -- Soft delete support
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Performance Indexes
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_bookings_status ON bookings(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_bookings_event_date ON bookings(event_date) WHERE deleted_at IS NULL;
CREATE INDEX idx_bookings_phone ON bookings(phone_number) WHERE deleted_at IS NULL;
CREATE INDEX idx_bookings_customer ON bookings(customer_name) WHERE deleted_at IS NULL;

-- Full text search support
CREATE INDEX idx_bookings_search ON bookings USING gin(to_tsvector('english', 
  coalesce(customer_name, '') || ' ' || 
  coalesce(phone_number, '') || ' ' || 
  coalesce(location, '')
)) WHERE deleted_at IS NULL;

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  
  -- Auto-set confirmed_at
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    NEW.confirmed_at = TIMEZONE('utc', NOW());
  END IF;
  
  -- Auto-set completed_at
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = TIMEZONE('utc', NOW());
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at_trigger
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_bookings_updated_at();

-- =====================================================
-- ORDERS TABLE (Enhanced)
-- =====================================================
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  
  -- Order Details
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC DEFAULT 250,
  total NUMERIC NOT NULL,
  
  -- Payment
  payment_method TEXT DEFAULT 'cod' CHECK (payment_method IN ('cod', 'easypaisa', 'jazzcash', 'bank')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_reference TEXT, -- Transaction ID for digital payments
  
  -- Delivery
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  tracking_number TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  source TEXT DEFAULT 'website',
  notes TEXT,
  customer_ip TEXT, -- For fraud prevention
  
  -- Soft delete
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Performance Indexes
CREATE INDEX idx_orders_created_at ON orders(created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_orders_status ON orders(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_orders_payment_status ON orders(payment_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_orders_phone ON orders(phone_number) WHERE deleted_at IS NULL;
CREATE INDEX idx_orders_customer ON orders(customer_name) WHERE deleted_at IS NULL;

-- Full text search
CREATE INDEX idx_orders_search ON orders USING gin(to_tsvector('english',
  coalesce(customer_name, '') || ' ' ||
  coalesce(phone_number, '') || ' ' ||
  coalesce(address, '')
)) WHERE deleted_at IS NULL;

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    NEW.confirmed_at = TIMEZONE('utc', NOW());
  END IF;
  
  IF NEW.status = 'shipped' AND OLD.status != 'shipped' THEN
    NEW.shipped_at = TIMEZONE('utc', NOW());
  END IF;
  
  IF NEW.status = 'delivered' AND OLD.status != 'delivered' THEN
    NEW.delivered_at = TIMEZONE('utc', NOW());
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

-- =====================================================
-- ANALYTICS TABLE (New)
-- =====================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'page_view', 'product_view', 'add_to_cart', 'checkout_start', etc.
  event_data JSONB,
  user_id TEXT, -- Could be session ID or customer ID
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);

-- =====================================================
-- AUDIT TRAIL TABLE (New)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  changed_by TEXT, -- Admin user or 'system'
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_audit_log_created_at ON audit_log(changed_at DESC);
CREATE INDEX idx_audit_log_table ON audit_log(table_name);
CREATE INDEX idx_audit_log_record ON audit_log(record_id);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data)
    VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD));
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, new_data)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW));
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_log (table_name, record_id, action, new_data)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW));
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers
CREATE TRIGGER bookings_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

CREATE TRIGGER orders_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- =====================================================
-- CUSTOMER TABLE (New - for future CRM)
-- =====================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  address TEXT,
  
  -- Stats
  total_bookings INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  
  -- Preferences
  preferred_contact TEXT DEFAULT 'whatsapp' CHECK (preferred_contact IN ('whatsapp', 'phone', 'email')),
  notes TEXT,
  tags TEXT[], -- ['vip', 'corporate', 'wedding', etc.]
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  last_order_at TIMESTAMP WITH TIME ZONE,
  
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_customers_phone ON customers(phone_number) WHERE deleted_at IS NULL;
CREATE INDEX idx_customers_email ON customers(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_customers_created ON customers(created_at DESC) WHERE deleted_at IS NULL;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Bookings Policies
DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT TO anon
  WITH CHECK (deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow authenticated reads" ON bookings;
CREATE POLICY "Allow authenticated reads" ON bookings
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow authenticated updates" ON bookings;
CREATE POLICY "Allow authenticated updates" ON bookings
  FOR UPDATE TO authenticated
  USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow authenticated deletes" ON bookings;
CREATE POLICY "Allow authenticated soft deletes" ON bookings
  FOR UPDATE TO authenticated
  USING (true);

-- Orders Policies
DROP POLICY IF EXISTS "Allow public inserts" ON orders;
CREATE POLICY "Allow public inserts" ON orders
  FOR INSERT TO anon
  WITH CHECK (deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow authenticated reads" ON orders;
CREATE POLICY "Allow authenticated reads" ON orders
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow authenticated updates" ON orders;
CREATE POLICY "Allow authenticated updates" ON orders
  FOR UPDATE TO authenticated
  USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow authenticated deletes" ON orders;
CREATE POLICY "Allow authenticated soft deletes" ON orders
  FOR UPDATE TO authenticated
  USING (true);

-- Analytics Policies
DROP POLICY IF EXISTS "Allow public analytics inserts" ON analytics_events;
CREATE POLICY "Allow public analytics inserts" ON analytics_events
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated analytics reads" ON analytics_events;
CREATE POLICY "Allow authenticated analytics reads" ON analytics_events
  FOR SELECT TO authenticated
  USING (true);

-- Audit Log Policies (Read-only for admins)
DROP POLICY IF EXISTS "Allow authenticated audit reads" ON audit_log;
CREATE POLICY "Allow authenticated audit reads" ON audit_log
  FOR SELECT TO authenticated
  USING (true);

-- Customers Policies
DROP POLICY IF EXISTS "Allow authenticated customer access" ON customers;
CREATE POLICY "Allow authenticated customer access" ON customers
  FOR ALL TO authenticated
  USING (deleted_at IS NULL);

-- =====================================================
-- USEFUL VIEWS
-- =====================================================

-- Revenue summary view
CREATE OR REPLACE VIEW revenue_summary AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_orders,
  SUM(total) as daily_revenue,
  AVG(total) as average_order_value
FROM orders
WHERE status = 'delivered' 
  AND deleted_at IS NULL
  AND payment_status = 'paid'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Popular products view
CREATE OR REPLACE VIEW popular_products AS
SELECT 
  item->>'name' as product_name,
  COUNT(*) as times_ordered,
  SUM((item->>'quantity')::integer) as total_quantity,
  SUM((item->>'price')::numeric * (item->>'quantity')::integer) as total_revenue
FROM orders,
  jsonb_array_elements(items) as item
WHERE deleted_at IS NULL
GROUP BY item->>'name'
ORDER BY times_ordered DESC;

-- Customer lifetime value
CREATE OR REPLACE VIEW customer_lifetime_value AS
SELECT 
  customer_name,
  phone_number,
  COUNT(*) as total_orders,
  SUM(total) as lifetime_value,
  AVG(total) as average_order_value,
  MAX(created_at) as last_order_date
FROM orders
WHERE deleted_at IS NULL
GROUP BY customer_name, phone_number
ORDER BY lifetime_value DESC;

-- =====================================================
-- CLEANUP FUNCTIONS
-- =====================================================

-- Function to permanently delete soft-deleted records older than X days
CREATE OR REPLACE FUNCTION cleanup_deleted_records(days_old INTEGER DEFAULT 90)
RETURNS TABLE (
  table_name TEXT,
  deleted_count BIGINT
) AS $$
DECLARE
  cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
  cutoff_date := NOW() - (days_old || ' days')::INTERVAL;
  
  -- Delete from bookings
  DELETE FROM bookings 
  WHERE deleted_at IS NOT NULL 
    AND deleted_at < cutoff_date;
  table_name := 'bookings';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN NEXT;
  
  -- Delete from orders
  DELETE FROM orders 
  WHERE deleted_at IS NOT NULL 
    AND deleted_at < cutoff_date;
  table_name := 'orders';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN NEXT;
  
  -- Delete old analytics (keep 1 year)
  DELETE FROM analytics_events 
  WHERE created_at < (NOW() - '1 year'::INTERVAL);
  table_name := 'analytics_events';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMPLETED
-- =====================================================
-- Schema is now future-proof with:
-- ✅ Versioning
-- ✅ Soft deletes
-- ✅ Audit trails
-- ✅ Analytics tracking
-- ✅ Full-text search
-- ✅ Performance indexes
-- ✅ Automatic timestamps
-- ✅ Customer relationship management
-- ✅ Revenue analytics
-- =====================================================
