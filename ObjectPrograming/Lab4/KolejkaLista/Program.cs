using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
using System.Xml.Serialization;
 
using System.Collections;
using System.IO;
 
namespace KolejkaLista
{
    public class MojaKolekcjaLiczb : IEnumerable<int>
    {
        private List<int> liczby = new List<int>();
 
        public void Dodaj(int liczba)
        {
            liczby.Add(liczba);
        }
 
        public bool Usun(int liczba)
        {
            return liczby.Remove(liczba);
        }
 
        public IEnumerator<int> GetEnumerator()
        {
            foreach (int liczba in liczby)
            {
                yield return liczba;
            }
        }
 
        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
 
 
    internal class Program
    {
        static void Main(string[] args)
        {
            MojaKolekcjaLiczb kolekcja = new MojaKolekcjaLiczb();
            kolekcja.Dodaj(9);
            kolekcja.Dodaj(2);
            kolekcja.Dodaj(3);
 
 
            foreach (int liczba in kolekcja)
            {
                Console.WriteLine(liczba);
            }
        }
 
    }
}