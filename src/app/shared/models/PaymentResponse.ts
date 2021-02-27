export interface Message {
  code: string;
  description: string;
}

export interface Messages {
  message: Message[];
}

export interface Profile {
  customerProfileId: string;
  customerPaymentProfileId: string;
}

export interface PaymentResponse {
  responseCode: string;
  authCode: string;
  avsResultCode: string;
  cvvResultCode: string;
  cavvResultCode: string;
  transId: string;
  refTransID: string;
  transHash: string;
  testRequest: string;
  accountNumber: string;
  accountType: string;
  messages: Messages;
  transHashSha2: string;
  profile: Profile;
  networkTransId: string;
}

