namespace Workers;

class Program
{
    static void Main(string[] args)
    {
        
        CallCenter callCenter1 = new CallCenter
        {
            Name = "Karolina",
            Lastname = "Bogudzińska",
            Age = 20,
            Job = "CallCenter",
            HoursPerWeek = 12,
            MoneyPerHour = 40,
            WorkPhoneNumber = "+48506453201"
        };

        Producer producer1 = new Producer
        {
            Name = "Bogdan",
            Lastname = "Nowak",
            Age = 32,
            Job = "Producer",
            HoursPerWeek = 40,
            MoneyPerHour = 120,
            TeamNumber = 42
        };

        Seller seller1 = new Seller
        {
            Name = "Franek",
            Lastname = "Urszyński",
            Age = 24,
            Job = "Seller",
            MoneyPerHour = 50,
            HoursPerWeek = 26,
            StoreAddress = "ul. Koszyńska 3/24 Kraków"
        };

        Console.WriteLine(producer1.getJobInfo());
        Console.WriteLine(producer1.getMoneyInSingleYear());
    }
}
