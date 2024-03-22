using System.Globalization;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace Resturacja;
class Program
{

    public static Dictionary<int, Zamowienie> zamowienia = new Dictionary<int, Zamowienie>();
    public List<int> gotoweStoliki = new List<int>();
    public static void Main(string[] args)
    {

        if(File.Exists(".\\zamowienie.xml"))
        {
            zamowienia = DeserializeObject(".\\zamowienie.xml");
        }



        while(true)
        {
            Console.WriteLine("Witaj w pomocy kucharskiej. Wybierz numer jako kto chcesz się zalogować:\n0. Kelner\n1. Kucharz\n-1 Opuść Program");

            int wybor = int.Parse(Console.ReadLine());
            Console.Clear();
            
            if(wybor == -1)
            {
                
                // Serializacja kolekcji do pliku
                SerializeObject(".\\zamowienie.xml", zamowienia);
                break;
            }
            else if(wybor == 0)
            {
                Kelner();
            }
            else if(wybor == 1)
            {
                Kucharz();
            }
            else
            {
                Console.WriteLine("Niepoprawny wybór");
                continue;
            }            
        }
    }

    public static void Kelner()
    {
        while(true)
        {
            Console.WriteLine("Witaj Kelnerze!\n Wybierz, co chcesz zrobić:\n-1. Wyjście\n0. Dodaj nowe zamowienie\n 1. Odbierz gotowe zamowienie");

            int wybor = int.Parse(Console.ReadLine());

            Console.Clear();

            if(wybor == -1)
            {
                break;
            }
            else if(wybor == 0)
            {
                dodajZamowienie();
            }
            else if(wybor == 1)
            {
                //TODO odbierz zamowienie
            }
            else
            {
                Console.WriteLine("Niepoprawny wybór");
                continue;
            }

            return;

        }
    }

    public static void dodajZamowienie()
    {
        Console.WriteLine("Wybierz nr stolika:");

        int stolik = int.Parse(Console.ReadLine());

        if(zamowienia.ContainsKey(stolik))
        {
            Console.WriteLine("Podany stolik już ma zamówienie");
            return;
        }
        else
        {
            Console.Clear();

            Zamowienie aktualneZamowienie = new Zamowienie();

            while(true)
            {

                if(aktualneZamowienie.zamowienie is not null)
                {
                    Console.WriteLine($"Stolik nr {stolik}. Aktualne zamowienie: ");

                    foreach(string jedzenie in aktualneZamowienie.zamowienie)
                    {
                        Console.Write(jedzenie + " | ");
                    }
                }


                Console.WriteLine();

                Console.WriteLine("Wybierz, co chcesz dodac z poniższej listy:");
                Console.WriteLine("-1. Zamknij zamowienie\n0. Zupa dnia, 20zl\n1. Danie dnia, 25zl\n2. Losos, 36.50zl\n3. Bulka, 4zl");

                int wybor = int.Parse(Console.ReadLine());

                Console.Clear();

                switch(wybor)
                {
                    case -1:
                    {
                        zamowienia.Add(stolik, aktualneZamowienie);

                        return;
                    }
                    case 0:
                    {
                        aktualneZamowienie.zamowienie.Add("Zupa dnia");
                        aktualneZamowienie.cenaZamowienia += 20m;
                        break;
                    }
                    case 1:
                    {
                        aktualneZamowienie.zamowienie.Add("Danie dnia");
                        aktualneZamowienie.cenaZamowienia += 25m;
                        break;
                    }
                    case 2:
                    {
                        aktualneZamowienie.zamowienie.Add("Losos");
                        aktualneZamowienie.cenaZamowienia += 36.5m;
                        break;
                    }
                    case 3:
                    {
                        aktualneZamowienie.zamowienie.Add("Bulka");
                        aktualneZamowienie.cenaZamowienia += 4m;
                        break;
                    }
                    default:
                    {
                        Console.WriteLine("Bledny wybor");
                        continue;
                    }
                }
            }
        }
    }

    public static void Kucharz()
    {
        while(true)
        {
            Console.WriteLine("Witaj Kucharzu! Wybierz, co chcesz zrobic.\n-1 Wyjscie\n0. Sprawdz zamowienia\n1. Zakoncz zamowienie");

            int wybor = int.Parse(Console.ReadLine());

            if(wybor == -1)
            {
                break;
            }
            else if(wybor == 0)
            {
                sprawdzZamowienia();
            }
            else if(wybor == 1)
            {
                //TODO zakonczZamowienie
            }
            else
            {
                Console.WriteLine("Niepoprawny wybor");
                continue;
            }
        }
        return;
    }

    public static void sprawdzZamowienia()
    {
        Console.WriteLine("Aktualne zamowienia:");
        
        foreach(KeyValuePair<int, Zamowienie> entry in zamowienia)
        {
            Console.WriteLine($"Stolik nr: {entry.Key}:");
            foreach(string zam in entry.Value.zamowienie)
            {
                Console.WriteLine(zam);
            }
            Console.WriteLine("Aktualna cena:" + entry.Value.cenaZamowienia);
        }
    }

            // Metoda do serializacji obiektu do pliku XML
        static void SerializeObject(string filename, Dictionary<int, Zamowienie> dict)
        {
            XElement el = new XElement("root",
            dict.Select(kv => new XElement("table", new XElement("key", kv.Key.ToString()),
             new XElement("zam", kv.Value.zamowienie.Select(zam => new XElement("string", zam)), new XElement("cena", kv.Value.cenaZamowienia)))));

            el.Save(filename);
        }
 
        // Metoda do deserializacji obiektu z pliku XML
        static Dictionary<int, Zamowienie> DeserializeObject(string filename)
        {

            TextReader root = new StreamReader(filename);

            XElement zam = XElement.Load(root);

            Dictionary<int, Zamowienie> dict = zam.Descendants("table").ToDictionary(
                kv => int.Parse(kv.Element("key").Value),
                kv => 
                new Zamowienie
                {
                    zamowienie = kv.Element("zam").Elements("stringz").Select(s => s.Value).ToList(),
                    cenaZamowienia = decimal.Parse(kv.Element("zam").Element("cena").Value, CultureInfo.InvariantCulture)
                }
                );

            return dict;
        }
}
