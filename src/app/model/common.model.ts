export interface CreditCardFraudReponse {
    results: CreditCardFraud[];
}

export interface CreditCardFraud {
    id: number;
    name: string;
    status: string;
}
