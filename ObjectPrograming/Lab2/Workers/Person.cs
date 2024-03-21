namespace Workers;

public abstract class Person
{
    public string Name;
    public string Lastname;
    public int Age;

    public string getPersonInfo()
    {
        return $"Worker {Name} {Lastname} age {Age} years old. ";
    }
}