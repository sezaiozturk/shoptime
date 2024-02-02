import {FlatList, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import {useTheme, Text, Divider} from 'react-native-paper';
import {useInvoice} from '../../context/invoiceContext';

const InvoiceModal = () => {
    const {invoiceList} = useInvoice();
    const [total, setTotal] = useState(0);

    const renderItem = ({item}) => (
        <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 2}}>{item.title.slice(0, 10)}...</Text>
            <Text style={{flex: 1.4}}>{item.quantity}</Text>
            <Text style={{flex: 0.6}}>{item.price}</Text>
        </View>
    );

    const calculateTotal = () => {
        let sum = 0;
        invoiceList.map(item => (sum += item.price * item.quantity));
        setTotal(sum.toFixed(2));
    };

    useEffect(() => {
        calculateTotal();
    }, []);

    return (
        <View style={styles.container}>
            {invoiceList.length > 0 ? (
                <View>
                    <View style={styles.innerContainer}>
                        <Text variant="labelLarge" style={{flex: 2}}>
                            Product Name :
                        </Text>
                        <Text variant="labelLarge" style={{flex: 1.4}}>
                            Quantity :
                        </Text>
                        <Text variant="labelLarge" style={{flex: 0.6}}>
                            Price :
                        </Text>
                    </View>
                    <Divider bold={true} style={styles.divider} />
                    <FlatList data={invoiceList} renderItem={renderItem} />
                    <Divider bold={true} style={styles.divider} />
                    <View style={styles.innerContainer}>
                        <Text variant="labelLarge" style={{flex: 3}}>
                            Total :
                        </Text>
                        <Text variant="labelLarge" style={{flex: 1}}>
                            {`$ ${total}`}
                        </Text>
                    </View>
                </View>
            ) : (
                <Text style={{textAlign: 'center'}} variant="headlineSmall">
                    Your invoice is empty !
                </Text>
            )}
        </View>
    );
};

export default InvoiceModal;
