﻿using DeliveryApp.Resourses;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
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
using static DeliveryApp.Resourses.API;

namespace _1111111
{
    public partial class Linepanel : Form
    {
        
        public Linepanel(int id)
        {
            InitializeComponent();
        }


        private void Linepanel_Load(object sender, EventArgs e)
        {
            {
                //List<Order> parsed = GetApiData("https://3424-109-198-122-38.ngrok-free.app/order");
                //richTextBox1.AppendText(parsed[0].id);
            }
        }

        public void button1_Click(object sender, EventArgs e)
        {
            //сюда доделать obj1.form1
            try {
                string id = Form1.listBox1.Text.Replace("order", "");
                var dataObject = new { orderId = id };
                Connection.DoPOST($"{API.API_GetPathTo(API.Roots.Finish)}", JsonConvert.SerializeObject(JObject.FromObject("")));

            } catch (Exception ex) { }
            
            this.Hide();
            Form1 fr1 = new Form1();
           // fr1.Show(); 


            
            
        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        public void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void Linepanel_Load_1(object sender, EventArgs e)
        {

        }

        private void Linepanel_FormClosing(object sender, FormClosingEventArgs e)
        {
            
        }
    }
}
