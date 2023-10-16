namespace _1111111
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            Linepanel linepanel = new Linepanel();
            linepanel.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //this.Close();
            History history = new History();
            history.Show();
        }
    }
}