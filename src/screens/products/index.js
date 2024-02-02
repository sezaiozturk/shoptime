import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import axios from 'axios';
import {
    IconButton,
    Button,
    Card,
    Avatar,
    FAB,
    useTheme,
    Portal,
    Modal,
} from 'react-native-paper';
import {InvoiceModal, ProductCard} from '../../components';

const Products = () => {
    const [productList, setProductList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(res => setProductList(res.data));
    }, []);

    const renderItem = ({item}) => <ProductCard product={item} />;

    return (
        <SafeAreaView style={styles.container}>
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
