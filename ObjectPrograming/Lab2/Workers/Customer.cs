namespace Workers;

public abstract class Customer : Person
{
    public int FinishedOrders;
    public int AwaitingOrders;

    public string getCustomerInfo()
    {
        return base.getPersonInfo() + $"with {FinishedOrders} finished orders and {AwaitingOrders} awaiting orders";
    }
}