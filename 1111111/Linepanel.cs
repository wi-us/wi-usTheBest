using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static _1111111.Form1;

namespace _1111111
{
    public partial class Linepanel : Form
    {
        public Linepanel()
        {
            InitializeComponent();
        }


        private void Linepanel_Load(object sender, EventArgs e)
        {
            {
                List<Order> parsed = GetApiData("https://291e-109-198-122-38.ngrok-free.app/order");
                richTextBox1.AppendText(parsed[0].id);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Close();
            Form1 fr1 = new Form1();
            fr1.Show();
        }
    }
}
