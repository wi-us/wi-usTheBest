using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Resources;

namespace DeliveryApp.Resourses
{
    public partial class Window_Authorization : Form
    {
        bool isPasswordHidden = true;
        public Window_Authorization()
        {
            InitializeComponent();
            string path = Directory.GetCurrentDirectory();
            string projectDirectory = Directory.GetParent(Directory.GetParent(Directory.GetParent(path).ToString()).ToString()).ToString();


            string[] txtFiles = Directory.GetFiles(projectDirectory, "serverURL.txt");
            API.url = File.ReadAllLines(txtFiles[0])[0];
            //если нет соединения с сервером, то закрывает приложение
            if (!Connection.CheckWebsiteAvaliable())
            {
                if ((MessageBox.Show("Нет соединения с сервером", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error) == DialogResult.OK))
                {
                    Form form = new Form() { Size = new Size(400, 140) };
                    Button save = new Button() { Text = "Сохранить", Size = new Size(180, 30), Location = new Point(110, 45) };
                    TextBox newUrl = new TextBox() { Size = new Size(170, 15), Location = new Point(200, 15) };
                    Label newUrlDescription = new Label() { Text = "Введите url", Size = new Size(180, 15), Location = new Point(15, 15) };

                    save.Click += buttonClick;

                    form.Controls.Add(save);
                    form.Controls.Add(newUrl);
                    form.Controls.Add(newUrlDescription);

                    form.Show();
                    void buttonClick(object sender, EventArgs e)
                    {
                        API.url = newUrl.Text;
                        form.Close();
                    }
                }
            }
            else
            {
                TextBox_Login.Text = "user@user.com";
                TextBox_Password.Text = "123123";
            }
        }
        private void Button_CheckAuthData_Click(object sender, EventArgs e)
        {
            object jsonObject = new { email = TextBox_Login.Text, password = TextBox_Password.Text };
            string jsonString = JObject.FromObject(jsonObject).ToString();
            string token = JsonConvert.DeserializeObject(Connection.DoPOST(API.API_GetPathTo(API.Roots.Login), jsonString)).token;
            if (token != null)
            {
                var stream = token;
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(stream);
                var tokenS = jsonToken as JwtSecurityToken;
                dynamic tkn = JsonConvert.DeserializeObject(tokenS.Claims.ElementAt(2).Value);

                if (tkn.value == API.role)
                {
                    API.token = token;
                    FindForm().Visible = false;
                    FindForm().Enabled = false;
                    Form1 form1 = new Form1();
                    form1.Form1_Load(sender, e);
                }
                else
                {
                    MessageBox.Show("Нет доступа!", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Неверная пара логин/пароль", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        private void Window_Authorization_FormClosed(object sender, FormClosedEventArgs e)
        {
            Environment.Exit(0);
        }
        private void ShowPassword_Button_Click(object sender, EventArgs e)
        {
            if (isPasswordHidden)
            {
                TextBox_Password.PasswordChar = '\0';
                isPasswordHidden = false;
                ShowPassword_Button.BackgroundImage = Image.FromFile("C:/Users/wiusm/source/repos/DeliveryApp/DeliveryApp/Resources/ShowPass.png");
            }
            else
            {
                TextBox_Password.PasswordChar = '*';
                isPasswordHidden = true;
                ShowPassword_Button.BackgroundImage = Image.FromFile("C:/Users/wiusm/source/repos/DeliveryApp/DeliveryApp/Resources/HidenPass1.png");
            }
        }
    }
}
