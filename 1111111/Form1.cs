using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Leaf.xNet; // dll
using HttpStatusCode = Leaf.xNet.HttpStatusCode; // debug request
using System.Net; // cookie
using System.Net.Http;
//using Microsoft.AspNet.WebApi.Client;
using System.Xml.Linq;

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
        public static List<Data> GetApiData(string apiUrl)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(apiUrl).Result;

                if (response.IsSuccessStatusCode)
                {
                    string json = response.Content.ReadAsStringAsync().Result;
                    List<Data> data = JsonConvert.DeserializeObject<List<Data>>(json);
                    return data;
                }
                else
                {
                    throw new Exception($"Failed to fetch data. Status code: {response.StatusCode}");
                }
            }
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
            this.Hide();

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
        List<Data> parsed = GetApiData("https://c0bf-109-198-122-38.ngrok-free.app/users");
            richTextBox1.AppendText(parsed[0].telegram_ID);
        }
        private void label3_Click(object sender, EventArgs e)
        {

        }
    }
}