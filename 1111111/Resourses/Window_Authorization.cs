using _1111111;
using Newtonsoft.Json;
using System.Resources;
using static _1111111.Form1;


namespace DeliveryApp.Resourses
{

    public partial class Window_Authorization : Form
    {
        class Authorization
        {
            public string email { get; set; }
            public string password { get; set; }
        }
        bool isPasswordHidden = true;
        public Window_Authorization()
        {
            InitializeComponent();

            //если нет соединения с сервером, то закрывает приложение
            if (!Connection.CheckWebsiteAvaliable(API.url))
            {
                if ((MessageBox.Show("Нет соединения с сервером", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error) == DialogResult.OK))
                {
                    Application.Exit();
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
            Authorization auth = new Authorization() { email = TextBox_Login.Text, password = TextBox_Password.Text };
            API.token = JsonConvert.DeserializeObject(Connection.DoPOST(API.API_GetPathTo(API.Roots.Login), JsonConvert.SerializeObject(auth))).token;
            if (API.token != null)
            {
                FindForm().Visible = false;
                FindForm().Enabled = false;
                Form1 form1 = new Form1();
                form1.Form1_Load(sender, e);
            }
            else
            {
                MessageBox.Show("Неверная пара логин/пароль", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        private void Window_Authorization_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit();
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
