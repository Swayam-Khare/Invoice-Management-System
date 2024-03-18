

exports.uniqueInvoice = () => {
    const timestamp = Date.now();
    const invoice_id =
        "#" + timestamp.toString(16).toUpperCase();
    return invoice_id;
}