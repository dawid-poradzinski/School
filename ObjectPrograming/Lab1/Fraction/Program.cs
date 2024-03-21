using System.Collections;

namespace lab1;

class Program
{
    private static void Main(string[] args)
    {
        //sorted array
        ArrayList SortedArray = new ArrayList() {new Fraction(1,6), new Fraction(2,6), new Fraction(5,12), new Fraction(8,10), new Fraction(1,1), new Fraction(148,6)};

        //not sorted array

        ArrayList NotSortedArray = new ArrayList() {new Fraction(148,6), new Fraction(8,10), new Fraction(5,12),new Fraction(2,6) , new Fraction(1,1), new Fraction(1,6)};

        NotSortedArray.Sort();

        foreach (var item in NotSortedArray)
        {
            Console.WriteLine(item);
        }
    }
}
