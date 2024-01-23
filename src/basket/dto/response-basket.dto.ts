export class ResponseBasketAddition {
    // {
    //     "id": "1",
    //     "price": "1199.07",
    //     "user_ID": "10",
    //     "foods": [
    //       {
    //         "name": "Кола",
    //         "price": "40.11",
    //         "quantity": "23",
    //         "totalPrice": "922.53"
    //       },
    //       {
    //         "name": "Пицца",
    //         "price": "21.11",
    //         "quantity": "24",
    //         "totalPrice": "506.64"
    //       }
    //     ]
    //   }
    id: number;
    price: number;
    user_ID: number;
    foods: [ResponseFoodArray];
}

export class ResponseFoodArray {
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
}
