class OrderItem {
    constructor (id, item, totalAmount , date){
        this.id = id;
        this.item = item;                   
        this.totalAmount = totalAmount;
        this.date = date;

    } 
    //check styling orders item lecture 17 
    get readableDate() {
        return this.date.toLocaleDateString('en-En' , {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minutes: '2-digit',
        });
    }
};

export default OrderItem