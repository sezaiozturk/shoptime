import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import axios from 'axios';
import {FAB, Portal, Modal, Snackbar} from 'react-native-paper';
import {InvoiceModal, ProductCard} from '../../components';
import {useQuery, useRealm} from '@realm/react';
import {Product} from '../../models/index';

const Products = () => {
    const [latestDate, setLatestDate] = useState(new Date());
    const [snackVisible, setSnackVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const realm = useRealm();
    const realmProducts = useQuery(Product);

    const toggleSnack = () => setSnackVisible(!snackVisible);

    const saveDatabase = () => {
        if (realmProducts.length === 0) {
            productList.map(item => {
                realm.write(() => {
                    realm.create('Product', {
                        id: parseInt(item.id),
                        image: item.image,
                        title: item.title,
                        price: parseFloat(item.price),
                    });
                });
            });
        } else {
            //Fark varsa güncellenecek
        }
    };

    const getFromApi = () => {
        setRefresh(true);
        axios.get('https://fakestoreapi.com/products').then(res => {
            setRefresh(false);
            setProductList(res.data);
            toggleSnack();
            setMessage('From the API');
        });
    };

    const getFromDatabase = () => {
        if (realmProducts) {
            setProductList(realmProducts);
            toggleSnack();
            setMessage('From the Database');
        }
    };

    useEffect(() => {
        getFromApi();
    }, []);

    useEffect(() => {
        saveDatabase();
    }, [productList]);

    const refreshData = () => {
        const nowDate = new Date();
        if (nowDate - latestDate > 10000) {
            getFromApi();
        } else {
            getFromDatabase();
        }
        setLatestDate(nowDate);
    };

    const renderItem = ({item}) => <ProductCard product={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={productList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<View style={{height: 10}} />}
                refreshing={refresh}
                onRefresh={refreshData}
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
            <Snackbar
                visible={snackVisible}
                duration={1000}
                onDismiss={toggleSnack}>
                {message}
            </Snackbar>
        </SafeAreaView>
    );
};

export default Products;
