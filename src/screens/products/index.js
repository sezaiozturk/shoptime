import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import axios from 'axios';
import {
    FAB,
    useTheme,
    Portal,
    Modal,
    Button,
    Snackbar,
} from 'react-native-paper';
import {InvoiceModal, ProductCard} from '../../components';
import {useQuery, useRealm} from '@realm/react';
import {Product} from '../../models/index';

const Products = () => {
    const [productList, setProductList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [snackVisible, setSnackVisible] = useState(false);
    const [latestDate, setLatestDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [refresh, setRefresh] = useState(false);
    const realm = useRealm();
    const [realmProducts, setRealmProducts] = useQuery(Product);

    const toggleSnack = () => setSnackVisible(!snackVisible);

    const saveDatabase = () => {
        console.log(realmProducts);
        if (realmProducts.length === 0) {
            productList.map(item => {
                realm.write(() => {
                    realm.create('Product', {
                        _id: parseInt(item.id),
                        image: item.image,
                        name: item.title,
                        price: parseInt(item.price),
                    });
                });
            });
            setRealmProducts(useQuery(Product));
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
            saveDatabase();
        });
    };

    const getFromDatabase = () => {
        if (realmProducts) {
            setProductList(realmProducts);
        }
        toggleSnack();
        setMessage('From the Database');
    };

    useEffect(() => {
        getFromApi();
    }, []);

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
