using System;

namespace lab1
{
    public sealed class Fraction : IComparable, IEquatable<Fraction>
    {
        public int Nominator { set; get; }
        private int _denominator;
        public int Denominator
        {
            set
            {
                if (value == 0)
                    throw new DivideByZeroException();
                _denominator = value;
            }
            get
            {
                return _denominator;
            }
        }

        public Fraction(int nominator, int denominator)
        {
            Nominator = nominator;
            Denominator = denominator;
        }

        public override bool Equals(object? obj)
        {
            return Equals(obj as Fraction);
        }

        public bool Equals(Fraction? other)
        {
            if (other is null)
                return false;

            var now = Simplify(this);
            other = Simplify(other);

            return now.Nominator == other.Nominator && now.Denominator == other.Denominator;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Nominator, Denominator);
        }

        // IComparable
        public int CompareTo(object? obj)
        {
            if (obj is null) return 1;

            Fraction? otherFraction = obj as Fraction;

            if (otherFraction is not null)
            {
                if (this.Nominator == 0 || otherFraction.Nominator == 0)
                {
                    return this.Nominator.CompareTo(otherFraction.Nominator);
                }

                Fraction now = Simplify(this);
                otherFraction = Simplify(otherFraction);
                int divisor = LCM(now.Denominator, otherFraction.Denominator);
                int ADiv = divisor / now.Denominator;
                int BDiv = divisor / otherFraction.Denominator;

                return (ADiv * now.Nominator).CompareTo(BDiv * otherFraction.Nominator);
            }
            else
            {
                throw new ArgumentException("Object is not a Fraction");
            }


        }

        // Basic ToString() returning fraction as string n/d
        public override string ToString()
        {
            return $"{Nominator}/{Denominator}";
        }

        // Basic logical functions

        public static bool operator ==(Fraction? valueA, Fraction? valueB)
        {
            if (valueA is null || valueB is null)
                return false;

            valueA = Simplify(valueA);
            valueB = Simplify(valueB);

            return valueA.ToString() == valueB.ToString();
        }

        public static bool operator !=(Fraction? valueA, Fraction? valueB)
        {
            if (valueA is null || valueB is null)
                return true;
            valueA = Simplify(valueA);
            valueB = Simplify(valueB);

            return valueA.ToString() != valueB.ToString();
        }

        // Basic mathematical functions

        public static Fraction operator *(Fraction valueA, Fraction valueB)
        {

            Fraction result = new Fraction(valueA.Nominator * valueB.Nominator, valueA.Denominator * valueB.Denominator);

            result = Simplify(result);

            return result;

        }

        public static Fraction operator /(Fraction valueA, Fraction valueB)
        {
            if(valueA.Nominator == 0 || valueB.Nominator == 0)
                throw new DivideByZeroException();

            Fraction result = new Fraction(valueA.Nominator * valueB.Denominator, valueA.Denominator * valueB.Nominator);

            result = Simplify(result);

            return result;
        }

        public static Fraction operator +(Fraction valueA, Fraction valueB)
        {
            int divisor = LCM(valueA.Denominator, valueB.Denominator);

            int ADiv = divisor / valueA.Denominator;
            int BDiv = divisor / valueB.Denominator;

            Fraction result = new Fraction(valueA.Nominator * ADiv + valueB.Nominator * BDiv, divisor);

            result = Simplify(result);

            return result;
        }

        public static Fraction operator -(Fraction valueA, Fraction valueB)
        {
            int divisor = LCM(valueA.Denominator, valueB.Denominator);

            int ADiv = divisor / valueA.Denominator;
            int BDiv = divisor / valueB.Denominator;

            Fraction result = new Fraction(valueA.Nominator * ADiv - valueB.Nominator * BDiv, divisor);

            result = Simplify(result);

            return result;
        }

        public static bool operator <(Fraction valueA, Fraction valueB)
        {

            if (valueA.Nominator == 0 || valueB.Nominator == 0)
            {
                return valueA.Nominator < valueB.Nominator;
            }

            valueA = Simplify(valueA);
            valueB = Simplify(valueB);
            int divisor = LCM(valueA.Denominator, valueB.Denominator);

            int ADiv = divisor / valueA.Denominator;
            int BDiv = divisor / valueB.Denominator;

            return (valueA.Nominator * ADiv) < (valueB.Nominator * BDiv);
        }

        public static bool operator >(Fraction valueA, Fraction valueB)
        {
            if (valueA.Nominator == 0 || valueB.Nominator == 0)
            {
                return valueA.Nominator > valueB.Nominator;
            }

            valueA = Simplify(valueA);
            valueB = Simplify(valueB);
            int divisor = LCM(valueA.Denominator, valueB.Denominator);

            int ADiv = divisor / valueA.Denominator;
            int BDiv = divisor / valueB.Denominator;

            return (valueA.Nominator * ADiv) > (valueB.Nominator * BDiv);
        }

        public static bool operator <=(Fraction valueA, Fraction valueB)
        {
            if (valueA.Nominator == 0 || valueB.Nominator == 0)
            {
                return valueA.Nominator <= valueB.Nominator;
            }

            valueA = Simplify(valueA);
            valueB = Simplify(valueB);
            int divisor = LCM(valueA.Denominator, valueB.Denominator);

            int ADiv = divisor / valueA.Denominator;
            int BDiv = divisor / valueB.Denominator;

            return (valueA.Nominator * ADiv) <= (valueB.Nominator * BDiv);
        }

        public static bool operator >=(Fraction valueA, Fraction valueB)
        {
            if (valueA.Nominator == 0 || valueB.Nominator == 0)
            {
                return valueA.Nominator >= valueB.Nominator;
            }

            valueA = Simplify(valueA);
            valueB = Simplify(valueB);

            int divisor = LCM(valueA.Denominator, valueB.Denominator);

            int ADiv = divisor / valueA.Denominator;
            int BDiv = divisor / valueB.Denominator;

            return (valueA.Nominator * ADiv) >= (valueB.Nominator * BDiv);
        }

        // Additional functions for adding and subtracting
        // Greatest Common Divisor
        public static int GCD(int valueA, int valueB)
        {
            int ADenominator = Math.Abs(valueA);
            int BDenominator = Math.Abs(valueB);

            while (ADenominator != BDenominator)
            {
                if (ADenominator > BDenominator)
                {
                    ADenominator -= BDenominator;
                }
                else
                {
                    BDenominator -= ADenominator;
                }
            }

            return ADenominator;
        }

        // Least Common Multiple
        public static int LCM(int valueA, int valueB)
        {
            int ADenominator = valueA;
            int BDenominator = valueB;

            while (ADenominator != BDenominator)
            {
                if (ADenominator > BDenominator)
                {
                    BDenominator += valueB;
                }
                else
                {
                    ADenominator += valueA;
                }
            }

            return ADenominator;
        }

        public static Fraction Simplify(Fraction valueA)
        {
            if (valueA.Nominator == 0)
            {
                return new Fraction(0, 1);
            }

            int divisor = GCD(valueA.Nominator, valueA.Denominator);

            return new Fraction(valueA.Nominator / divisor, valueA.Denominator / divisor);

        }

    }
}