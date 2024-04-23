using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Lab6
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        int brush = 0;
        SolidColorBrush brushColor = Brushes.Black;
        bool isEnabled = false;
        int stroke = 5;
        public MainWindow()
        {
            InitializeComponent();
        }

        private void ellipseButton_Click(object sender, RoutedEventArgs e)
        {
            brush = 0;
            ellipseButton.IsEnabled = false;
            SquareButton.IsEnabled = true;
            EraserButton.IsEnabled = true;
        }

        private void SquareButton_Click(object sender, RoutedEventArgs e)
        {
            brush = 1;
            ellipseButton.IsEnabled = true;
            SquareButton.IsEnabled = false;
            EraserButton.IsEnabled = true;
        }

        private void EraserButton_Click(object sender, RoutedEventArgs e)
        {
            brush = 2;
            ellipseButton.IsEnabled = true;
            SquareButton.IsEnabled = true;
            EraserButton.IsEnabled = false;
        }

        private void ComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            switch(comboColor.SelectedIndex)
            {
                case 0:
                    brushColor = Brushes.Black;
                    break;
                case 1:
                    brushColor = Brushes.Red;
                    break;
                case 2:
                    brushColor = Brushes.Green;
                    break;
                case 3:
                    brushColor= Brushes.Blue;
                    break;
            }
        }

        private void myCanvas_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            isEnabled = true;
        }

        private void myCanvas_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            isEnabled= false;
        }

        private void myCanvas_MouseMove(object sender, MouseEventArgs e)
        {
            if(isEnabled)
            {

                Shape filler = new Ellipse();

                switch(brush)
                {
                    case 0:
                        filler.Fill = brushColor;
                        break;
                    case 1:
                        filler = new Rectangle();
                        filler.Fill = brushColor;
                        break;
                    case 2:
                        filler.Fill = Brushes.White;
                        break;
                }

                filler.Width = stroke;
                filler.Height = stroke;

                Canvas.SetLeft(filler, e.GetPosition(myCanvas).X - stroke/2);
                Canvas.SetTop(filler, e.GetPosition(myCanvas).Y - stroke / 2);
                myCanvas.Children.Add(filler);


            }
        }

        private void Slider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            stroke = (int)mySlider.Value;
        }

        private void myCanvas_MouseLeave(object sender, MouseEventArgs e)
        {
            isEnabled = false;
        }
    }
}