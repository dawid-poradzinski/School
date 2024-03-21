using System.Collections;
using lab1;

namespace FractionTests;

[TestClass]
public class UnitTest1
{
    [TestMethod]
    [ExpectedException(typeof(DivideByZeroException))]
    public void DivineyByZeroTest()
    {
        Fraction a = new Fraction(10,0);
    }

    [TestMethod]
    [ExpectedException(typeof(DivideByZeroException))]
    public void DivineyByFractionWithZeroNominatorTest()
    {
        Fraction a = new Fraction(10,5);
        Fraction b = new Fraction(0,20);

        a = a/b;
    }

    [TestMethod]
    public void EqualityTests()
    {
        Fraction a = new Fraction(10,20);
        Fraction b = new Fraction(20,40);
        Assert.IsTrue(a==b);
        Assert.AreEqual(a,b);
        Assert.IsFalse(a < b);
        Assert.IsTrue(a >= b);
        Assert.IsFalse(a > b);
        Console.WriteLine(a < null);

        a = new Fraction(12,5);
        Assert.IsTrue(a!=b);
        Assert.AreNotEqual(a,b);
        Assert.IsTrue(a > b);
        Assert.IsFalse(a <= b);
        Assert.IsFalse(a < b);

    }

    [TestMethod]
    public void MathTests()
    {
        Fraction a = new Fraction(2,5);
        Fraction b = new Fraction(4,8);

        Assert.AreEqual(new Fraction(9,10), a+b);
        Assert.AreEqual(new Fraction(-1,10), a-b);

        Assert.AreEqual(new Fraction(2,10), a*b);
        Assert.AreEqual(new Fraction(8,10), a/b);

        //a+b/c-a
        Fraction c = new Fraction(5,6);
        Assert.AreEqual(new Fraction(34,50), (a+b)/c-a);
    }

    [TestMethod]
    public void IComparableTests()
    {
        //sorted array
        ArrayList SortedArray = new ArrayList() {new Fraction(1,6), new Fraction(2,6), new Fraction(5,12), new Fraction(8,10), new Fraction(1,1), new Fraction(148,6)};

        //not sorted array

        ArrayList NotSortedArray = new ArrayList() {new Fraction(148,6), new Fraction(8,10), new Fraction(5,12),new Fraction(2,6) , new Fraction(1,1), new Fraction(1,6)};

        NotSortedArray.Sort();

        CollectionAssert.AreEqual(SortedArray, NotSortedArray);
    }

    [TestMethod]
    [ExpectedException(typeof(ArgumentException))]
    public void IcomparableExceptionTest()
    {
        Fraction a = new Fraction(20,4);
        ArrayList b = new ArrayList();

        a.CompareTo(b);
    }
    [TestMethod]
    public void IEquatableTest()
    {
        Fraction a = new Fraction(10,223);
        Fraction b = new Fraction(100, 2230);

        Assert.IsTrue(a.Equals(b));

        b = new Fraction(50, 2230);
        Assert.IsFalse(a.Equals(b));
        Assert.IsFalse(a.Equals(null));
    }
}