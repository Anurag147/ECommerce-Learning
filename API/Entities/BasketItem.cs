namespace API.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //Navigation properties for product relation
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId {get;set;}
        public Basket Basket { get; set; }
    }
}