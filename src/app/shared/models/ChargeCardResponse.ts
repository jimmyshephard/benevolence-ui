export interface ChargeCardResponse {
  responseCode: string;
  authCode: string;
  avsResultCode: string;
  cvvResultCode: string;
  cavvResultCode: number;
  transId: string;
  refTransID: string;
  transHash: string;
  testRequest: number;
  accountNumber: string;
  accountType: string;
  customerProfileId?: string;
  message?: string;
  messages: {
    message: [
      {
        code: number;
        description: string;
      }
    ]
  },
  transHashSha2: string;
  networkTransId: string;
}
