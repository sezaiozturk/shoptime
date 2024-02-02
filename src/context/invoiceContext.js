import {createContext, useContext, useState} from 'react';

const InvoiceContext = createContext();

const InvoiceProvider = ({children}) => {
    const [invoiceList, setInvoiceList] = useState([]);
    const values = {
        invoiceList,
        setInvoiceList,
    };

    return (
        <InvoiceContext.Provider value={values}>
            {children}
        </InvoiceContext.Provider>
    );
};

const useInvoice = () => useContext(InvoiceContext);

export {InvoiceProvider, useInvoice};
