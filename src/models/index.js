export class Product extends Realm.Object {
    static schema = {
        name: 'Product',
        primaryKey: '_id',
        properties: {
            _id: 'int',
            image: 'string',
            name: 'string',
            price: 'int',
        },
    };
}
