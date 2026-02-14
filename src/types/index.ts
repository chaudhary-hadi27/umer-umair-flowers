// =====================================================
// TYPES & INTERFACES FOR UMER & UMAIR FLOWERS
// =====================================================

// View State Management
export type ViewState = 'home' | 'booking' | 'checkout' | 'admin';

// =====================================================
// SERVICE TYPES
// =====================================================
export interface Service {
    id: string;
    title: string;
    description: string;
    priceStart: string;
    image: string;
    category?: string;
}

// =====================================================
// PRODUCT TYPES
// =====================================================
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'bouquet' | 'gift' | 'decoration';
    inStock?: boolean;
    featured?: boolean;
}

export interface OrderItem extends Product {
    quantity: number;
}

// =====================================================
// BOOKING TYPES
// =====================================================
export interface Booking {
    id: string;
    customerName: string;
    phoneNumber: string;
    email?: string;
    serviceType: string;
    date: string;
    location: string;
    specialInstructions?: string;
    estimatedPrice?: number;
    finalPrice?: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: number;
    updatedAt?: number;
    confirmedAt?: number;
    completedAt?: number;
    source?: string;
    notes?: string;
}

export interface BookingFormData {
    customerName: string;
    phoneNumber: string;
    email?: string;
    serviceType: string;
    date: string;
    location: string;
    specialInstructions?: string;
}

// =====================================================
// ORDER TYPES
// =====================================================
export interface Order {
    id: string;
    customerName: string;
    phoneNumber: string;
    email?: string;
    address: string;
    items: OrderItem[];
    subtotal?: number;
    deliveryFee?: number;
    total: number;
    paymentMethod?: 'cod' | 'easypaisa' | 'jazzcash' | 'bank';
    paymentStatus?: 'pending' | 'paid' | 'refunded';
    paymentReference?: string;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    trackingNumber?: string;
    createdAt: number;
    updatedAt?: number;
    confirmedAt?: number;
    shippedAt?: number;
    deliveredAt?: number;
    source?: string;
    notes?: string;
    customerIp?: string;
}

export interface CheckoutFormData {
    customerName: string;
    phoneNumber: string;
    email?: string;
    address: string;
}

// =====================================================
// CAROUSEL TYPES
// =====================================================
export interface CarouselImage {
    url: string;
    caption: string;
    alt?: string;
}

// =====================================================
// TESTIMONIAL TYPES
// =====================================================
export interface Testimonial {
    id: string;
    name: string;
    text: string;
    rating: number;
    serviceType: string;
    image?: string;
    date?: string;
}

// =====================================================
// ANALYTICS TYPES
// =====================================================
export interface AnalyticsEvent {
    id?: string;
    eventType: 'page_view' | 'product_view' | 'add_to_cart' | 'remove_from_cart' |
        'checkout_start' | 'order_complete' | 'booking_request' | 'wishlist_add';
    eventData?: Record<string, any>;
    userId?: string;
    userAgent?: string;
    ipAddress?: string;
    createdAt?: number;
}

// =====================================================
// CUSTOMER TYPES (CRM)
// =====================================================
export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    totalBookings: number;
    totalOrders: number;
    totalSpent: number;
    preferredContact: 'whatsapp' | 'phone' | 'email';
    notes?: string;
    tags?: string[];
    createdAt: number;
    updatedAt?: number;
    lastOrderAt?: number;
}

// =====================================================
// DATABASE RESPONSE TYPES
// =====================================================
export interface DatabaseResponse<T> {
    data: T | null;
    error: Error | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// =====================================================
// STATS & ANALYTICS DASHBOARD TYPES
// =====================================================
export interface DashboardStats {
    totalBookings: number;
    totalOrders: number;
    pendingBookings: number;
    pendingOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    topProducts: ProductStats[];
    recentActivity: ActivityItem[];
}

export interface ProductStats {
    productId: string;
    productName: string;
    timesOrdered: number;
    totalQuantity: number;
    totalRevenue: number;
}

export interface ActivityItem {
    id: string;
    type: 'booking' | 'order';
    customerName: string;
    description: string;
    timestamp: number;
    status: string;
}

// =====================================================
// FILTER & SEARCH TYPES
// =====================================================
export interface FilterOptions {
    status?: string[];
    dateFrom?: string;
    dateTo?: string;
    minAmount?: number;
    maxAmount?: number;
    category?: string[];
    searchQuery?: string;
}

export interface SortOptions {
    field: string;
    direction: 'asc' | 'desc';
}

// =====================================================
// NOTIFICATION TYPES
// =====================================================
export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    description?: string;
    duration?: number;
    timestamp: number;
}

// =====================================================
// FORM VALIDATION TYPES
// =====================================================
export interface ValidationError {
    field: string;
    message: string;
}

export interface FormState<T> {
    data: T;
    errors: ValidationError[];
    isSubmitting: boolean;
    isValid: boolean;
}

// =====================================================
// API RESPONSE TYPES
// =====================================================
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: any;
}

// =====================================================
// MEDIA TYPES
// =====================================================
export interface MediaFile {
    id: string;
    url: string;
    name: string;
    type: 'image' | 'video' | 'document';
    size: number;
    mimeType: string;
    uploadedAt: number;
}

// =====================================================
// USER PREFERENCE TYPES
// =====================================================
export interface UserPreferences {
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'ur';
    notifications: boolean;
    emailUpdates: boolean;
    currency: 'PKR';
}

// =====================================================
// DELIVERY & SHIPPING TYPES
// =====================================================
export interface DeliveryZone {
    id: string;
    name: string;
    areas: string[];
    deliveryFee: number;
    estimatedDays: number;
    active: boolean;
}

export interface ShippingAddress {
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    area: string;
    landmark?: string;
    postalCode?: string;
}

// =====================================================
// DISCOUNT & PROMOTION TYPES
// =====================================================
export interface Discount {
    id: string;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minOrderValue?: number;
    maxDiscount?: number;
    validFrom: number;
    validUntil: number;
    usageLimit?: number;
    usageCount: number;
    active: boolean;
}

// =====================================================
// INVENTORY TYPES
// =====================================================
export interface InventoryItem {
    productId: string;
    stockQuantity: number;
    lowStockThreshold: number;
    restockDate?: number;
    supplier?: string;
    lastUpdated: number;
}

// =====================================================
// EXPORT ALL TYPES
// =====================================================
export type {
    // Re-export commonly used types for convenience
    ViewState as AppView,
    Product as FlowerProduct,
    OrderItem as CartItem,
    Booking as ServiceBooking,
    Order as CustomerOrder,
};

// =====================================================
// UTILITY TYPES
// =====================================================
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type Timestamp = number;
export type Currency = number;

// =====================================================
// TYPE GUARDS
// =====================================================
export const isProduct = (item: any): item is Product => {
    return (
        typeof item === 'object' &&
        'id' in item &&
        'name' in item &&
        'price' in item &&
        'category' in item
    );
};

export const isOrderItem = (item: any): item is OrderItem => {
    return isProduct(item) && 'quantity' in item;
};

export const isBooking = (item: any): item is Booking => {
    return (
        typeof item === 'object' &&
        'id' in item &&
        'customerName' in item &&
        'serviceType' in item &&
        'status' in item
    );
};

export const isOrder = (item: any): item is Order => {
    return (
        typeof item === 'object' &&
        'id' in item &&
        'customerName' in item &&
        'items' in item &&
        Array.isArray(item.items) &&
        'total' in item
    );
};

// =====================================================
// CONSTANTS AS TYPES
// =====================================================
export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
export const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
export const PAYMENT_METHODS = ['cod', 'easypaisa', 'jazzcash', 'bank'] as const;
export const PAYMENT_STATUSES = ['pending', 'paid', 'refunded'] as const;
export const PRODUCT_CATEGORIES = ['bouquet', 'gift', 'decoration'] as const;

// =====================================================
// END OF TYPES
// =====================================================