namespace Workers;

public class CallCenter : Worker
{
    public string WorkPhoneNumber;

    public override string getJobInfo()
    {
        return base.getWorkerInfo() + $"having {WorkPhoneNumber} as work phone";
    }
}