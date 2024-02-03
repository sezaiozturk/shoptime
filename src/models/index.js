export class Product extends Realm.Object {
    static schema = {
        name: 'Product',
        primaryKey: 'id',
        properties: {
            id: 'int',
            image: 'string',
            title: 'string',
            price: 'float',
        },
    };
}
