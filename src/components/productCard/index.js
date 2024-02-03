import {View} from 'react-native';
import React from 'react';
import styles from './stylesheet';
import {IconButton, Card, useTheme} from 'react-native-paper';
import {useInvoice} from '../../context/invoiceContext';

const ProductCard = ({product}) => {
    const {invoiceList, setInvoiceList} = useInvoice();
    const {id, title, price, image} = product;
    const theme = useTheme();

    const LeftContent = ({image}) => (
        <Card.Cover source={{uri: image}} style={styles.cover} />
    );

    const RightContent = ({id}) => (
        <Card.Actions>
            <IconButton
                icon="plus"
                mode={id % 2 == 0 ? 'contained' : 'outlined'}
                iconColor={theme.colors.primary}
                size={20}
                onPress={addProductToInvoice}
            />
        </Card.Actions>
    );

    const addProductToInvoice = () => {
        const existingProductIndex = invoiceList.findIndex(
            item => item.id === id,
        );

        if (existingProductIndex !== -1) {
            invoiceList[existingProductIndex].quantity += 1;
            setInvoiceList(invoiceList);
        } else {
            setInvoiceList(prevItems => [
                ...prevItems,
                {id, title, price, quantity: 1},
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={{backgroundColor: 'white', marginHorizontal: 10}}>
                <Card.Title
                    style={styles.title}
                    title={title}
                    subtitle={`$ ${price.toFixed(2)}`}
                    left={() => <LeftContent image={image} />}
                    right={() => <RightContent id={id} />}
                />
            </Card>
        </View>
    );
};

export default ProductCard;
