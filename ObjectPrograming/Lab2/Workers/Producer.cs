namespace Workers;

public class Producer : Worker
{
    public int TeamNumber;
    public override string getJobInfo()
    {
                return base.getWorkerInfo() + $"in team nr: {TeamNumber}";
    }
}