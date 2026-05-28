const { z } = require('zod');

// HTML tag stripping and trimming helper
const stripHTML = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/<[^>]*>/g, '').trim();
};

// Indian phone number regex helper: optional +91 or 91, followed by 10 digits starting with 6-9
const indianPhoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;

// Schema for client user logins
const loginSchema = z.object({
    email: z.string()
        .transform(stripHTML)
        .pipe(z.string().email("Invalid email address").toLowerCase()),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password cannot exceed 128 characters"),
    rememberMe: z.boolean().optional()
});

// Schema for client user registration (signup)
const signupSchema = z.object({
    email: z.string()
        .transform(stripHTML)
        .pipe(z.string().email("Invalid email address").toLowerCase()),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password cannot exceed 128 characters"),
    name: z.string()
        .transform(stripHTML)
        .pipe(z.string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters")
            .regex(/^[a-zA-Z0-9\s]+$/, "Name must be alphanumeric with spaces")
        ),
    phone: z.string()
        .transform(stripHTML)
        .pipe(z.string().regex(indianPhoneRegex, "Invalid Indian phone number format"))
});

// Schema for catalog items inside order
const itemSchema = z.object({
    id: z.string().transform(stripHTML).pipe(z.string().min(1, "Item ID is required")),
    name: z.string().transform(stripHTML).pipe(z.string().min(1, "Item name is required")),
    price: z.number().int().positive("Item price must be positive"),
    qty: z.number().int().positive("Item quantity must be at least 1")
});

// Schema for storefront order checkouts
const createOrderSchema = z.object({
    name: z.string()
        .transform(stripHTML)
        .pipe(z.string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters")
            .regex(/^[a-zA-Z0-9\s]+$/, "Name must be alphanumeric with spaces")
        ),
    email: z.string()
        .transform(stripHTML)
        .pipe(z.string().email("Invalid email address").toLowerCase()),
    phone: z.string()
        .transform(stripHTML)
        .pipe(z.string().regex(indianPhoneRegex, "Invalid Indian phone number format")),
    items: z.array(itemSchema).min(1, "Order must contain at least one item"),
    couponCode: z.preprocess((val) => (val === '' ? undefined : val), z.string()
        .transform(stripHTML)
        .pipe(z.string().regex(/^[a-zA-Z0-9]+$/, "Coupon code must be alphanumeric").max(20, "Coupon code cannot exceed 20 characters"))
        .optional()
    ),
    utr: z.preprocess((val) => (val === '' ? undefined : val), z.string()
        .transform(stripHTML)
        .pipe(z.string().regex(/^[a-zA-Z0-9]+$/, "UTR must be alphanumeric").min(12, "UTR must be at least 12 characters").max(20, "UTR cannot exceed 20 characters"))
        .optional()
    )
});

module.exports = {
    loginSchema,
    signupSchema,
    createOrderSchema
};
