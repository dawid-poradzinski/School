namespace Workers;

public class Seller : Worker
{
    public string StoreAddress;
    public override string getJobInfo()
    {
        return base.getWorkerInfo() + $"in store on {StoreAddress}";
    }
}