export const formatAddress = (address: string) => {
    if (address.length != 42) { return address }
    
    let shortened: string = address.slice(5);
    shortened += "...";
    shortened += address.slice(-5);
    return shortened;
}
