export default interface typeObject {
    vnp_Version: string,
    vnp_TmnCode: string,
    vnp_Amount: number,
    vnp_Command: string,
    vnp_CreateDate: string | Date,
    vnp_CurrCode: string,
    vnp_IpAddr: string,
    vnp_Locale: string,
    vnp_OrderInfo: string,
    vnp_OrderType: string,
    vnp_ReturnUrl: string,
    vnp_TxnRef: string,
    vnp_BankCode: string,
    vnp_SecureHash: string,
}

export function sortObject(obj: typeObject) {
    let sorted: { [key: string]: string } = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+") as string;
    }
    return sorted;
}