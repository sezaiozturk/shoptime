import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import axios from 'axios';
import {FAB, useTheme, Portal, Modal, Button} from 'react-native-paper';
import {InvoiceModal, ProductCard} from '../../components';
import {useQuery, useRealm} from '@realm/react';
import {Product} from '../../models/index';

const Products = () => {
    const [productList, setProductList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const realm = useRealm();
    const theme = useTheme();
    const realmProducts = useQuery(Product);

    const saveProduct = (id, image, name, price) => {
        realm.write(() => {
            realm.create('Product', {
                _id: id,
                image,
                name,
                price,
            });
        });
    };

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(res => setProductList(res.data));
        console.log(realmProducts);
    }, []);

    useEffect(() => {
        if (realmProducts.length == 0) {
            productList.map(item =>
                saveProduct(
                    parseInt(item.id),
                    item.image,
                    item.title,
                    parseInt(item.price),
                ),
            );
        }
    }, [productList]);

    const renderItem = ({item}) => <ProductCard product={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <Button onPress={saveProduct}>Deneme</Button>
            <FlatList
                data={productList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<View style={{height: 10}} />}
                refreshing={refresh}
                onRefresh={() => console.log('refresh')}
            />
            <FAB
                icon="calculator"
                style={styles.fab}
                onPress={() => setVisible(true)}
            />
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={styles.modal}>
                    <InvoiceModal />
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

export default Products;
