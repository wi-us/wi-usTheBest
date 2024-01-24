using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Leaf.xNet; // dll
using HttpStatusCode = Leaf.xNet.HttpStatusCode; // debug request
using System.Net; // cookie
using System.Net.Http;
//using Microsoft.AspNet.WebApi.Client;
using System.Xml.Linq;
using static _1111111.Form1;
using System.Windows.Forms;
using DeliveryApp.Resourses;

namespace _1111111
{


    public partial class Form1 : Form
    {
        Order selectedOrder = orders[a];
        Linepanel form = new Linepanel();
        List<Order> orders;
        public Form1()
        {
            InitializeComponent();
            orders = new List<Order>();
        }
        public void Form1_Load(object sender, EventArgs e)
        {
            this.Visible = true;
        }
        public static List<Order> GetApiData(string apiUrl)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(apiUrl).Result;

                if (response.IsSuccessStatusCode)
                {
                    string json = response.Content.ReadAsStringAsync().Result;
                    List<Order> data = JsonConvert.DeserializeObject<List<Order>>(json);
                    return data;
                }
                else
                {
                    throw new Exception($"Failed to fetch data. Status code: {response.StatusCode}");
                }
            }
        }


        public class Food
        {
            public string id { get; set; }
            public string name { get; set; }
            public string picture { get; set; }
            public string type_id { get; set; }
            public string price { get; set; }
            public DateTime createdAt { get; set; }
            public DateTime updatedAt { get; set; }
            public OrderItem OrderItem { get; set; }
        }

        public class OrderItem
        {
            public string id { get; set; }
            public string order_ID { get; set; }
            public string food_ID { get; set; }
            public string quantity { get; set; }
            public string FormJSONtoPOST()
            {
                var jsonObject = new
                {
                    orderid = this.order_ID
                    
                };
                var jsonString = JObject.FromObject(jsonObject).ToString();
                return jsonString;
            }
        }

        public class Order
        {
            public string id { get; set; }
            public DateTime date { get; set; }
            public string status { get; set; }
            public string price { get; set; }
            public string user_id { get; set; }
            public string worker_ID { get; set; }
            public DateTime createdAt { get; set; }
            public DateTime updatedAt { get; set; }
            public object Status { get; set; }
            public List<Food>? foods { get; set; }
        }
        

        public class Data
        {
            public int id { get; set; }
            public string telegram_ID { get; set; }
            public double? x { get; set; }
            public double? y { get; set; }
            public int? phone { get; set; }
            public string? mail { get; set; }
            public DateTime createdAt { get; set; }
            public DateTime updatedAt { get; set; }

        }




        private void button1_Click(object sender, EventArgs e)
        {

            Linepanel linepanel = new Linepanel();
            linepanel.Show();
            //this.Hide();

        }

        private void button2_Click(object sender, EventArgs e)
        {
            //this.Close();
            History history = new History();
            history.Show();
        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button4_Click(object sender, EventArgs e)
        {
            timer1.Enabled = !timer1.Enabled;
            if (timer1.Enabled)  {
                button4.Text = "Выключить обновление заказов";
            }
            if (!timer1.Enabled)
            {
                button4.Text = "Включить обновление заказов";
            }


        }
        private void label3_Click(object sender, EventArgs e)
        {

        }

        public object obj1;


        public void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

            //form.Show();
            int a = listBox1.SelectedIndex;
            string id = listBox1.Text.Replace("order", "");
            obj1 = new { orderId = id } ;
            
            if (a >= 0)
            {
                Connection.DoPOST($"{API.API_GetPathTo(API.Roots.Worker)}", JsonConvert.SerializeObject(JObject.FromObject(obj1)));
                form.Show();
                Order selectedOrder = orders[a];
                form.dataGridView1.Columns.Clear();
                form.dataGridView1.Columns.Add("Name", "Food Name");
                form.dataGridView1.Columns.Add("Quantity", "Quantity");
                form.dataGridView1.Columns.Add("Price", "Price");

                // Populate rows
                form.dataGridView1.Rows.Clear();
                
                foreach (var food in selectedOrder.foods)
                {
                    form.dataGridView1.Rows.Add(food.name, food.OrderItem.quantity, food.price);
                }
                //dataGridView1.DataSource = selectedOrder.foods;
                //MessageBox.Show(orders.ToString());


            }

        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            listBox1.Items.Clear();

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
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {

        }
    }
}