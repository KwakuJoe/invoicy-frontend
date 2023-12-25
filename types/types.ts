export interface Login {
    status:  string;
    message: string;
    token:   Token | null;
}

export interface Token {
    token:      string | null;
    token_type: string | null;
}

export interface User {
    id:                       number | null;
    organisation:             string | null;
    email:                    string | null;
    phone:                    string | null;
    bio:                      string | null;
    address:                  string | null;
    avatar:                   string | null;
    email_verified_at:        Date | null;
    email_verification_token: string | null;
    created_at:               Date | null;
    updated_at:               Date | null;
}


export interface LoginCredentials {
    email: string | null,
    password: string | null
}

export interface RegisterCredentials {
    organisation: string | null,
    phone: string | null,
    email: string | null,
    password: string | null
    password_confirmation: string | null,
}


// invoice type
export interface Invoices {
    status:   string;
    messages: string;
    data:     InvoiceData;
}

// one invoice
export interface InvoiceType {
    status:   string;
    messages: string;
    data:     Invoice;
}

export interface InvoiceData {
    current_page:   number;
    data:           Invoice[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Invoice {
    id:                     number;
    invoice_id:             string;
    user_id:                number;
    invoice_date:           Date;
    client_id:              string;
    client_address:         string;
    client_name:            string;
    client_email:           string;
    client_phone:           string;
    client_alternate_phone: string;
    total_amount:           string;
    delivery_amount:        string;
    additional_information: string;
    status:                 string;
    created_at:             Date;
    updated_at:             Date;
    user:                   User;
    invoice_items:          InvoiceItem[];
}

export interface InvoiceItem {
    id:         number;
    invoice_id: number;
    product_id: number;
    quantity:   number;
    total:      string;
    price:      string;
    created_at: Date;
    updated_at: Date;
    product:    Product;
}

export interface Product {
    id:          number;
    user_id:     number;
    name:        string;
    description: string;
    price:       string;
    image:       string;
    created_at:  Date;
    updated_at:  Date;
}


export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}


