export interface BillTo {
  firstName: string;
  lastName: string;
  zip: string;
}

export interface CreditCard {
  cardNumber: string;
  expirationDate: string;
  cardType: string;
}

export interface Payment {
  creditCard: CreditCard;
}

export interface PaymentProfile {
  billTo: BillTo;
  customerPaymentProfileId: string;
  payment: Payment;
}

export interface CustomerProfile {
  description: string;
  customerProfileId: string;
  paymentProfiles: PaymentProfile[];
  profileType: string;
}

export interface FlatPaymentProfile {
  cardNumber: string;
  expirationDate: string;
  cardType: string;
  customerProfileId: string;
  customerPaymentProfileId: string;
}

