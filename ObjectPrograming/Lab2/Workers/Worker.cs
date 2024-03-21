namespace Workers;

public abstract class Worker : Person
{
    public string Job;
    public int HoursPerWeek;
    public int MoneyPerHour;

    public string getWorkerInfo()
    {
        return base.getPersonInfo() + $"Is working as {Job} for {HoursPerWeek} hours per week ";
    }

    public abstract string getJobInfo();

    public float getMoneyInSingleYear()
    {
        return 48.0f * HoursPerWeek * MoneyPerHour;
    }
}