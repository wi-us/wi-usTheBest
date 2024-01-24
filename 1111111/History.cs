﻿using DeliveryApp.Resourses;
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
    public partial class History : Form

    {
        List<Order> orders;
        public History()
        {
            InitializeComponent();
        }

        private void History_Load(object sender, EventArgs e)
        {
            {
                try
                {
                    orders = Connection.DoGet($"{API.API_GetPathTo(API.Roots.Order1)}");
                    foreach (Order order in orders)
                    {
                        listBox1.Items.Add($"order{order.id}");

                    }


                }
                catch
                {
                    listBox1.Items.Add("нет заказов");

                    listBox1.Enabled = false;
                }

            }
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        public void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            int a = listBox1.SelectedIndex;

            if (a >= 0)
            {
                Order selectedOrder = orders[a];
                dataGridView1.Columns.Clear();
                dataGridView1.Columns.Add("Name", "Food Name");
                dataGridView1.Columns.Add("Quantity", "Quantity");
                dataGridView1.Columns.Add("Price", "Price");

                // Populate rows
                dataGridView1.Rows.Clear();
                foreach (var food in selectedOrder.foods)
                {
                    dataGridView1.Rows.Add(food.name, food.OrderItem.quantity, food.price);
                }
                //dataGridView1.DataSource = selectedOrder.foods;
                //MessageBox.Show(orders.ToString());
               
                
            }

        }
    }
}
