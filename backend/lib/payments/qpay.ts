export interface QPayUrl {
  name?: string;
  description?: string;
  link?: string;
}

export interface QPayInvoiceResponse {
  invoice_id?: string;
  qr_text?: string;
  qr_image?: string;
  qPay_shortUrl?: string;
  qpay_short_url?: string;
  urls?: QPayUrl[];
  [key: string]: unknown;
}

export interface QPayPaymentRow {
  payment_id?: string;
  payment_status?: string;
  payment_date?: string;
  payment_fee?: string | number;
  payment_amount?: string | number;
  payment_currency?: string;
  payment_wallet?: string;
  transaction_type?: string;
  object_id?: string;
  object_type?: string;
  [key: string]: unknown;
}

export interface QPayPaymentCheckResponse {
  count?: number;
  paid_amount?: string | number;
  rows?: QPayPaymentRow[];
  [key: string]: unknown;
}

interface QPayConfig {
  apiBaseUrl: string;
  username: string;
  password: string;
  invoiceCode: string;
}

interface QPayTokenResponse {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
}

export class QPayConfigError extends Error {
  constructor(public missing: string[]) {
    super(`QPay is not configured: ${missing.join(', ')}`);
  }
}

function env(name: string): string {
  return (process.env[name] ?? '').trim();
}

function qpayApiBaseUrl(): string {
  const baseUrl = env('QPAY_BASE_URL') || 'https://merchant-sandbox.qpay.mn';
  const clean = baseUrl.replace(/\/+$/, '');
  return clean.endsWith('/v2') ? clean : `${clean}/v2`;
}

export function getQPayConfigState() {
  const missing: string[] = [];
  const username = env('QPAY_USERNAME') || env('QPAY_CLIENT_ID');
  const password = env('QPAY_PASSWORD') || env('QPAY_CLIENT_SECRET');
  const invoiceCode = env('QPAY_INVOICE_CODE');

  if (!username) missing.push('QPAY_USERNAME');
  if (!password) missing.push('QPAY_PASSWORD');
  if (!invoiceCode) missing.push('QPAY_INVOICE_CODE');

  return {
    configured: missing.length === 0,
    missing,
    apiBaseUrl: qpayApiBaseUrl(),
  };
}

function getQPayConfig(): QPayConfig {
  const state = getQPayConfigState();
  if (!state.configured) throw new QPayConfigError(state.missing);

  return {
    apiBaseUrl: state.apiBaseUrl,
    username: env('QPAY_USERNAME') || env('QPAY_CLIENT_ID'),
    password: env('QPAY_PASSWORD') || env('QPAY_CLIENT_SECRET'),
    invoiceCode: env('QPAY_INVOICE_CODE'),
  };
}

export function getPaymentPlan() {
  const amountRaw = env('QPAY_MONTHLY_AMOUNT_MNT') || env('SUBSCRIPTION_AMOUNT_MNT');
  const amountMnt = Number(amountRaw);

  return {
    plan: env('QPAY_PLAN_NAME') || 'Monthly',
    currency: 'MNT',
    interval: 'month',
    amountMnt: Number.isFinite(amountMnt) && amountMnt > 0 ? amountMnt : null,
  };
}

async function qpayRequest<T>(config: QPayConfig, path: string, init: RequestInit = {}, accessToken?: string): Promise<T> {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  let body: unknown = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { raw: text };
    }
  }

  if (!response.ok) {
    const detail = typeof body === 'object' && body !== null ? JSON.stringify(body) : text;
    throw new Error(`QPay request ${path} failed (${response.status}): ${detail}`);
  }

  return body as T;
}

async function getQPayAccessToken(config: QPayConfig): Promise<string> {
  const basic = Buffer.from(`${config.username}:${config.password}`).toString('base64');
  const token = await qpayRequest<QPayTokenResponse>(
    config,
    '/auth/token',
    {
      method: 'POST',
      headers: { Authorization: `Basic ${basic}` },
    },
  );

  if (!token.access_token) {
    throw new Error('QPay auth succeeded but did not return access_token.');
  }

  return token.access_token;
}

export async function createQPayInvoice(input: {
  senderInvoiceNo: string;
  receiverCode: string;
  receiverName?: string;
  receiverEmail?: string;
  description: string;
  amountMnt: number;
  callbackUrl: string;
}): Promise<QPayInvoiceResponse> {
  const config = getQPayConfig();
  const token = await getQPayAccessToken(config);

  return qpayRequest<QPayInvoiceResponse>(
    config,
    '/invoice',
    {
      method: 'POST',
      body: JSON.stringify({
        invoice_code: config.invoiceCode,
        sender_invoice_no: input.senderInvoiceNo,
        invoice_receiver_code: input.receiverCode.slice(0, 45),
        invoice_receiver_data: {
          name: input.receiverName,
          email: input.receiverEmail,
        },
        invoice_description: input.description.slice(0, 255),
        amount: input.amountMnt,
        callback_url: input.callbackUrl,
        calback_url: input.callbackUrl,
        allow_partial: false,
        allow_exceed: false,
        lines: [
          {
            line_description: input.description.slice(0, 255),
            line_quantity: '1.00',
            line_unit_price: input.amountMnt,
          },
        ],
      }),
    },
    token,
  );
}

export async function checkQPayInvoice(invoiceId: string): Promise<QPayPaymentCheckResponse> {
  const config = getQPayConfig();
  const token = await getQPayAccessToken(config);

  return qpayRequest<QPayPaymentCheckResponse>(
    config,
    '/payment/check',
    {
      method: 'POST',
      body: JSON.stringify({
        object_type: 'INVOICE',
        object_id: invoiceId,
        offset: {
          page_number: 1,
          page_limit: 100,
        },
      }),
    },
    token,
  );
}

export async function getQPayPayment(paymentId: string): Promise<QPayPaymentRow> {
  const config = getQPayConfig();
  const token = await getQPayAccessToken(config);

  return qpayRequest<QPayPaymentRow>(config, `/payment/${encodeURIComponent(paymentId)}`, { method: 'GET' }, token);
}

export function findPaidQPayPayment(check: QPayPaymentCheckResponse): QPayPaymentRow | null {
  return check.rows?.find((row) => String(row.payment_status ?? '').toUpperCase() === 'PAID') ?? null;
}
