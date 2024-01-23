using DeliveryApp.Resourses;
using System.ComponentModel;
using static DeliveryApp.Resourses.DataBase;

namespace DeliveryApp
{
    public partial class Form1 : Form
    {
        DeliveryApp.Resourses.DataBase db = new DeliveryApp.Resourses.DataBase();
        public static List<DataGridView> grids = new List<DataGridView>();
        #region Форма приложения
        public Form1()
        {
            InitializeComponent();
        }
        public void Form1_Load(object sender, EventArgs e)
        {
            //отображение статуса сервера в названии окна
            this.Text = "Online | DeliveryApp Adminitrating Tool";
            this.Visible = true;
            //получение всех таблиц с сервера
            db.CollectData(DataBase.Tables.All);
            dataGridView1.Visible = false;
            //загрузка первой таблицы "FoodType"
            if (db.foodTypes != null)
            {
                ToolStripMenuItem_FoodType_Click(this.Controls["menuStrip1"], e);
            }
        }
        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit();
        }
        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            foreach (DataGridView grid in this.Controls["flowLayoutPanel_grids"].Controls)
            {
                grid.Size = flowLayoutPanel_grids.Size;
            }
        }
        private void timer1_Tick(object sender, EventArgs e)
        {
            if(!Connection.CheckWebsiteAvaliable())
            {
                this.Text = "Offline | DeliveryApp Adminitrating Tool";
                if (MessageBox.Show("Сервер недоступен", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error) == DialogResult.OK)
                {
                    Form form = new Form() { Size = new Size(100, 60) };
                    Button save = new Button() { Text = "Сохранить", Size = new Size(30,15), Location = new Point(40, 42) };
                    TextBox newUrl = new TextBox() { Size = new Size(40, 15), Location = new Point(60, 10)};
                    Label newUrlDescription = new Label() { Text = "Введите url", Size = new Size(40, 15), Location = new Point(10, 10) };

                    save.Click += buttonClick;

                    form.Controls.Add(save);
                    form.Controls.Add(newUrl);
                    form.Controls.Add(newUrlDescription);

                    //Environment.Exit(0);

                    void buttonClick(object sender, EventArgs e)
                    {
                        API.url = newUrl.Text;
                    }
                }
            }
        }
        #endregion
        #region Меню выбора таблиц
        private void HideAllTables()
        {
            foreach (var grid in grids)
            {
                grid.Visible = false;
            }
        }
        //Заблокировать или разблокировать кнопки управления таблицей
        private void EnableButtons(DataBase.Tables table)
        {
            switch (table)
            {
                case Tables.Food_Type:
                    {
                        Button_EditData.Enabled = true;
                        Button_EditData.BackColor = SystemColors.Control;
                        Button_DeleteData.Enabled = true;
                        Button_DeleteData.BackColor = SystemColors.Control;
                        Button_AddData.Enabled = true;
                        Button_AddData.BackColor = SystemColors.Control;
                        break;
                    }
                case Tables.Food:
                    {
                        Button_EditData.Enabled = true;
                        Button_EditData.BackColor = SystemColors.Control;
                        Button_DeleteData.Enabled = true;
                        Button_DeleteData.BackColor = SystemColors.Control;
                        Button_AddData.Enabled = true;
                        Button_AddData.BackColor = SystemColors.Control;

                        break;
                    }
                case Tables.Basket:
                    {
                        Button_EditData.Enabled = false;
                        Button_EditData.BackColor = SystemColors.ControlDark;
                        Button_DeleteData.Enabled = false;
                        Button_DeleteData.BackColor = SystemColors.ControlDark;
                        Button_AddData.Enabled = true;
                        Button_AddData.BackColor = SystemColors.Control;

                        break;
                    }
                case Tables.User:
                    {
                        Button_EditData.Enabled = false;
                        Button_EditData.BackColor = SystemColors.ControlDark;
                        Button_DeleteData.Enabled = false;
                        Button_DeleteData.BackColor = SystemColors.ControlDark;
                        Button_AddData.Enabled = false;
                        Button_AddData.BackColor = SystemColors.ControlDark;

                        break;
                    }
                case Tables.Order:
                    {
                        Button_EditData.Enabled = false;
                        Button_EditData.BackColor = SystemColors.ControlDark;
                        Button_DeleteData.Enabled = true;
                        Button_DeleteData.BackColor = SystemColors.Control;
                        Button_AddData.Enabled = false;
                        Button_AddData.BackColor = SystemColors.ControlDark;

                        break;
                    }
                case Tables.Order_Status:
                    {
                        Button_EditData.Enabled = true;
                        Button_EditData.BackColor = SystemColors.Control;
                        Button_DeleteData.Enabled = true;
                        Button_DeleteData.BackColor = SystemColors.Control;
                        Button_AddData.Enabled = true;
                        Button_AddData.BackColor = SystemColors.Control;

                        break;
                    }
                case Tables.Worker:
                    {
                        Button_EditData.Enabled = false;
                        Button_EditData.BackColor = SystemColors.ControlDark;
                        Button_DeleteData.Enabled = false;
                        Button_DeleteData.BackColor = SystemColors.ControlDark;
                        Button_AddData.Enabled = false;
                        Button_AddData.BackColor = SystemColors.ControlDark;

                        break;
                    }
                case Tables.Role:
                    {
                        Button_EditData.Enabled = true;
                        Button_EditData.BackColor = SystemColors.Control;
                        Button_DeleteData.Enabled = true;
                        Button_DeleteData.BackColor = SystemColors.Control;
                        Button_AddData.Enabled = true;
                        Button_AddData.BackColor = SystemColors.Control;

                        break;
                    }
                default:
                    {
                        MessageBox.Show("Error: такого нету", "Error");
                        break;
                    }
            }
        }
        private void CheckTheToolMenuItem(ToolStripMenuItem menuItem)
        {
            foreach (ToolStripMenuItem item in menuItem.Owner.Items)
            {
                item.Checked = false;
                item.BackColor = SystemColors.Control;
            }
            menuItem.Checked = true;
            menuItem.BackColor = SystemColors.ControlDark;
        }
        private void dataGridView1_VisibleChanged(object sender, EventArgs e)
        {
            dataGridView1.Width = this.Width;
        }
        private void ToolStripMenuItem_FoodType_Click(object sender, EventArgs e)
        {
            //включение кнопок управления для соответствующей таблицы
            EnableButtons(Tables.Food_Type);
            //получение таблицы с сервера
            db.CollectData(DataBase.Tables.Food_Type);
            //отображение таблицы
            ShowGrid(sender, db.foodTypes);
        }
        private void ToolStripMenuItem_Food_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.Food);
            db.CollectData(DataBase.Tables.Food);
            ShowGrid(sender, db.food);
        }
        private void ToolStripMenuItem_Basket_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.Basket);
            db.CollectData(DataBase.Tables.Basket);
            ShowGrid(sender, db.basket);
        }
        private void ToolStripMenuItem_User_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.User);
            db.CollectData(DataBase.Tables.User);
            ShowGrid(sender, db.user);
        }
        private void ToolStripMenuItem_Order_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.Order);
            db.CollectData(DataBase.Tables.Order);

            ShowGrid(sender, db.order);
        }
        private void ToolStripMenuItem_OrderStatus_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.Order_Status);
            db.CollectData(DataBase.Tables.Order_Status);
            ShowGrid(sender, db.orderStatus);
        }
        private void ToolStripMenuItem_Worker_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.Worker);
            db.CollectData(DataBase.Tables.Worker);
            ShowGrid(sender, db.worker);
        }
        private void ToolStripMenuItem_Role_Click(object sender, EventArgs e)
        {
            EnableButtons(Tables.Role);
            db.CollectData(DataBase.Tables.Role);
            ShowGrid(sender, db.role);
        }
        #region Формирование таблицы
            private void ShowGrid<T>(object sender, List<T> data) where T : BaseEntity<T>
            {
            //sender представляем как MenuStrip
            if (sender is MenuStrip)
                {
                    int i = 0;
                    db.dictionary.TryGetValue(data[0].GetTable(), out i);
                    sender = menuStrip1.Items[i];
                }
                var menuItem = (ToolStripMenuItem)sender;
                //скрыть открытую таблицу
                HideAllTables();
                //визуально отобразить в ToolStripMenu какая таблица запущена
                CheckTheToolMenuItem(menuItem);
            //проверка существует ли таблица
                if (!IsTableExist(menuItem))
                {
                    //формирование таблицы
                    FormTable(menuItem.Tag.ToString());
                }
                //отображение таблицы
                PrintTable(data, menuItem);
            }
            private void PrintTable<T>(List<T> data, ToolStripMenuItem menuItem)
            {
                if (data != null)
                {
                    switch (typeof(T).Name.ToString())
                    {
                        case "Food_Type":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Food_Type>)
                                {
                                    object[] obj = new object[] { item.id, item.type };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }
                        case "Food":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Food>)
                                {
                                    if (item.foodType == null)
                                    {
                                        item.type_id = 25;
                                        item.foodType = item.FindTypeID(db.foodTypes, 25);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Food), item.id.ToString(), item.FormJSONtoPOST());
                                    }

                                    object[] obj = new object[] { item.id, item.name, item.foodType.type, item.picture, item.price };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }
                        case "Basket":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Basket>)
                                {
                                    object[] obj = new object[] { item.id, item.Price, item.User_ID, item.Food_ID };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                break;
                            }
                        case "User":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Resourses.User>)
                                {
                                    object[] obj = new object[] { item.id, item.telegram_ID, item.phone, item.mail, item.balance };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }
                        case "Order":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Order>)
                                {
                                    object? status = item.status;
                                    if (item.status == null || item.status == 0)
                                    {
                                        item.status = item.FindStatusByID(db.orderStatus, 7).id;
                                        status = item.FindStatusByID(db.orderStatus, 7).type;
                                        //Connection.DoPUT(API.API_GetPathTo(API.Roots.Status), item.id.ToString(), item.FormJSONtoPOST());
                                    }
                                    object[] obj = new object[] { item.id, Convert.ToDateTime(item.date), status, item.user_id, item.worker_ID, item.price };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }
                        case "Order_Status":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Order_Status>)
                                {
                                    object[] obj = new object[] { item.id, item.type };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }
                        case "Worker":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Worker>)
                                {

                                    if (item.role_ID == null)
                                    {
                                        item.role_ID = 5;
                                    }

                                    string status;
                                    if (item.status_ID == null)
                                    {
                                        status = "null";
                                    }
                                    else
                                    {
                                        item.StatusCode.TryGetValue((item.status_ID), out status);
                                    }
                                    object[] obj = new object[] { item.id, status, item.role_ID, item.phone, item.email, item.password };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }
                        case "Role":
                            {
                                grids[grids.Count - 1].Rows.Clear();
                                foreach (var item in data as List<Role>)
                                {
                                    object[] obj = new object[] { item.id, item.description, item.value };
                                    grids[grids.Count - 1].Rows.Add(obj);
                                }
                                grids[grids.Count - 1].Sort(grids[grids.Count - 1].Columns[0], ListSortDirection.Ascending);
                                break;
                            }

                        default:
                            {
                                MessageBox.Show("Error: такого нету", "Error");
                                break;
                            }
                    }
                }
            }
            private bool IsTableExist(ToolStripMenuItem menuItem, bool ShowTable = true)
            {
                foreach (var grid in grids)
                {
                    if (menuItem.Tag == grid.Name)
                    {
                        if (ShowTable)
                        {
                            grid.Visible = true;
                        }
                        return true;
                    }
                }
                return false;
            }
            private int? FindIndexOfEnables()
            {
                foreach (var grid in grids)
                {
                    if (grid.Visible)
                    {
                        return grids.IndexOf(grid);
                    }
                }
                return null;
            }
            private void FormTable(string gridName)
            {
            //создание экземпляра класса DataGridView
                DataGridView dataGridView = new DataGridView();
                dataGridView.Location = dataGridView1.Location;
                dataGridView.Size = flowLayoutPanel_grids.Size;
                dataGridView.ReadOnly = true;
                dataGridView.AllowUserToAddRows = false;
                dataGridView.Dock = dataGridView1.Dock;
            //создание столбцов
                switch (gridName)
                {
                    case "Food_Type":
                        {
                            var table = new Food_Type();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "Food":
                        {
                            var table = new Food();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "Basket":
                        {
                            var table = new Basket();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "User":
                        {
                            var table = new Resourses.User();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "Order":
                        {
                            var table = new Order();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "Order_Status":
                        {
                            var table = new Order_Status();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "Worker":
                        {
                            var table = new Worker();
                            DoColumnHeaders(table);
                            break;
                        }
                    case "Role":
                        {
                            var table = new Role();
                            DoColumnHeaders(table);
                            break;
                        }
                    default:
                        {
                            MessageBox.Show("Error: такого нету", "Error");
                            break;
                        }
                }
                void DoColumnHeaders<T>(T entity) where T : BaseEntity<T>
                {
                    int i = 0;
                    foreach (var name in entity.GetHeaders())
                    {
                        DataGridViewColumn column = new DataGridViewColumn();
                        DataGridViewCell cell = new DataGridViewTextBoxCell();

                        column.Name = name;
                        column.HeaderText = name;
                        column.CellTemplate = cell;
                        column.Visible = true;
                        column.ValueType = entity.GetTypes()[i];
                        dataGridView.Columns.Add(column);
                        i++;
                    }
                }

                dataGridView.Name = gridName;
                //отображаем таблицу
                dataGridView.Visible = true;
                //добавляем таблицу в существующие

                dynamic form = FindForm();
                //добавление таблицы в форму
                form.Controls["flowLayoutPanel_grids"].Controls.Add(dataGridView);
                //добавление ссылки на таблицу в List<DataGridView> geids
                grids.Add(form.Controls["flowLayoutPanel_grids"].Controls[form.Controls["flowLayoutPanel_grids"].Controls.Count - 1]);
            }
        #endregion
        #endregion
        #region Кнопки управления таблицей
        private void Button_AddData_Click(object sender, EventArgs e)
        {
            dynamic form = this.FindForm();
            int i = 0;

            foreach (var item in form.Controls["menuStrip1"].Items)
            {
                //var d = nameof(Tables.User);

                if (item.Checked == true)
                {
                    Window_EditData windowEditData = new Window_EditData();
                    int windowSizeX = 10;
                    int windowSizeY = 25;

                    foreach (var grid in grids)
                    {
                        if (grid.Name == item.Tag)
                        {

                            int labelWidth = 100;
                            int labelHeight = 15;

                            int textBoxWidth = 100;
                            int textBoxHeight = 15;

                            int intervalWidth = 30;
                            int intervalHeight = 12;

                            int buttonWidth = 90;
                            int buttonHeight = 30;

                            Point labelPos = new Point(intervalWidth, intervalHeight);
                            Point textBoxPos = new Point(intervalWidth * 2 + labelWidth, intervalHeight);

                            int j = 0;
                            foreach (DataGridViewColumn column in grid.Columns)
                            {
                                System.Windows.Forms.Label label = new System.Windows.Forms.Label();
                                System.Windows.Forms.TextBox textBox = new System.Windows.Forms.TextBox();
                                textBox.Size = new Size(textBoxWidth, textBoxHeight);
                                label.Size = new Size(labelWidth, labelHeight);

                                label.Text = column.HeaderText;
                                label.Location = labelPos;
                                label.Visible = true;

                                textBox.Location = textBoxPos;
                                textBox.Visible = true;

                                windowEditData.Controls.Add(label);

                                //Для определённых таблиц реализован элемент ComboBox, позволяющий выбрать данные из списка
                                if (j == 0)
                                {
                                    textBox.Text = (Convert.ToInt32(grid.Rows[grid.Rows.Count - 1].Cells[0].Value) + 1).ToString();
                                    textBox.ReadOnly = true;
                                    windowEditData.Controls.Add(textBox);
                                }
                                else if (j == 2 && grid.Name == "Food")
                                {
                                    System.Windows.Forms.ComboBox comboBox = new System.Windows.Forms.ComboBox();
                                    comboBox.Size = new Size(labelWidth, labelHeight);
                                    comboBox.Location = textBoxPos;
                                    comboBox.Visible = true;
                                    comboBox.MaxDropDownItems = 10;
                                    comboBox.SelectedIndexChanged += comboBox_ItemSelected;
                                    comboBox.Name = "ComboBox";
                                    comboBox.Tag = "Food";
                                    foreach (var _item in db.foodTypes)
                                    {
                                        comboBox.Items.Add(_item.type);
                                    }
                                    windowEditData.Controls.Add(comboBox);
                                }

                                else if (j == 2 && grid.Name == "Order")
                                {
                                    System.Windows.Forms.ComboBox comboBox = new System.Windows.Forms.ComboBox();
                                    comboBox.Size = new Size(labelWidth, labelHeight);
                                    comboBox.Location = textBoxPos;
                                    comboBox.Visible = true;
                                    comboBox.MaxDropDownItems = 10;
                                    comboBox.SelectedIndexChanged += comboBox_ItemSelected;
                                    comboBox.Name = "ComboBox";
                                    comboBox.Tag = "Order";
                                    foreach (var _item in db.orderStatus)
                                    {
                                        comboBox.Items.Add(_item.type);
                                    }
                                    windowEditData.Controls.Add(comboBox);
                                }
                                else if (j == 1 && grid.Name == "Order")
                                {
                                    DateTime now = DateTime.Now;
                                    textBox.Text = now.ToString();
                                    textBox.Tag = "Date";
                                    textBox.ReadOnly = true;
                                    windowEditData.Controls.Add(textBox);
                                }
                                else
                                {
                                    windowEditData.Controls.Add(textBox);
                                }
                                labelPos.Y += (intervalHeight + labelHeight);
                                textBoxPos.Y += (intervalHeight + textBoxHeight);

                                j++;
                            }

                            windowSizeX = textBoxPos.X + textBoxWidth + intervalWidth;
                            windowSizeY = textBoxPos.Y + textBoxHeight + intervalHeight;

                            Point buttonPos = new Point(labelPos.X, textBoxPos.Y + intervalHeight);

                            System.Windows.Forms.Button button = new System.Windows.Forms.Button();
                            button.Location = buttonPos;
                            button.Size = new Size(buttonWidth, buttonHeight);
                            button.Visible = true;
                            button.FlatStyle = FlatStyle.System;
                            button.Text = "Сохранить";
                            button.Click += buttonClick_AddDataInTable;
                            button.Tag = item.Tag;

                            windowEditData.Controls.Add(button);

                            windowSizeY += buttonHeight + intervalHeight * 3;
                        }

                        void comboBox_ItemSelected(object sender, EventArgs e)
                        {
                            ComboBox comboBox = windowEditData.Controls["ComboBox"] as ComboBox;
                            comboBox.Text = comboBox.SelectedItem.ToString();

                            switch (comboBox.Tag)
                            {
                                case "Order":
                                    {
                                        foreach (var item in db.orderStatus)
                                        {
                                            if (item.type == comboBox.Text)
                                            {
                                                comboBox.Tag = item.id;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                case "Status":
                                    {
                                        foreach (var item in db.orderStatus)
                                        {
                                            if (item.type == comboBox.Text)
                                            {
                                                comboBox.Tag = item.id;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                case "Food":
                                    {
                                        break;
                                    }
                            }

                        }

                        void buttonClick_AddDataInTable(object sender, EventArgs e)
                        {
                            var tag = (string)((System.Windows.Forms.Button)sender).Tag;
                            List<object> list = new List<object>();

                            foreach (var obj in windowEditData.Controls)
                            {
                                if (obj is System.Windows.Forms.TextBox)
                                {
                                    TextBox textBox = (TextBox)obj;
                                    if (textBox.Tag != null && textBox.Tag.ToString() == "Date")
                                    {
                                        textBox.Text = String.Format("{0:s}", DateTime.Now) + ".000Z";
                                    }

                                    list.Add(textBox.Text);
                                }
                                else if (obj is System.Windows.Forms.ComboBox)
                                {
                                    ComboBox comboBox = (ComboBox)obj;
                                    if (comboBox.Tag != null && comboBox.Tag == "Food")
                                    {

                                    }
                                    else if (comboBox.Tag != null)
                                    {
                                        comboBox.Text = comboBox.Tag.ToString();
                                    }
                                    list.Add(comboBox.Text);
                                }
                            }


                            switch (tag)
                            {
                                case "Food":
                                    {
                                        Food food = new Food();
                                        food = food.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Food), food.FormJSONtoPOST());
                                        ToolStripMenuItem_Food_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Food_Type":
                                    {
                                        Food_Type food_type = new Food_Type();
                                        food_type = food_type.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.FoodType), food_type.FormJSONtoPOST());
                                        ToolStripMenuItem_FoodType_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Basket": //OFF
                                    {
                                        Basket basket = new Basket();
                                        basket = basket.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Basket), basket.FormJSONtoPOST());
                                        ToolStripMenuItem_Basket_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "User":
                                    {
                                        Resourses.User user = new Resourses.User();
                                        user = user.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Users), user.FormJSONtoPOST());
                                        ToolStripMenuItem_User_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Order": //OFF
                                    {
                                        Order order = new Order();
                                        order = order.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Order), order.FormJSONtoPOST());
                                        ToolStripMenuItem_Order_Click(this.Controls["menuStrip1"], e);
                                        //db.order.Add(order.CastToThisClass(list));

                                        break;
                                    }
                                case "Order_Status":
                                    {
                                        Order_Status order_status = new Order_Status();
                                        order_status = order_status.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Status), order_status.FormJSONtoPOST());
                                        ToolStripMenuItem_OrderStatus_Click(this.Controls["menuStrip1"], e);
                                        //db.orderStatus.Add(order_status);
                                        break;
                                    }
                                case "Worker": //OFF
                                    {
                                        Worker worker = new Worker();
                                        worker = worker.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Worker), worker.FormJSONtoPOST());
                                        ToolStripMenuItem_Worker_Click(this.Controls["menuStrip1"], e);
                                        //db.worker.Add(worker.CastToThisClass(list));
                                        break;
                                    }
                                case "Role":
                                    {
                                        Role role = new Role();
                                        role = role.CastToThisClass(list);
                                        Connection.DoPOST(API.API_GetPathTo(API.Roots.Roles), role.FormJSONtoPOST());
                                        ToolStripMenuItem_Role_Click(this.Controls["menuStrip1"], e);
                                        //db.role.Add(role.CastToThisClass(list));
                                        break;
                                    }
                            }
                            windowEditData.Close();
                        }
                    }

                    windowEditData.Size = new Size(windowSizeX, windowSizeY);
                    windowEditData.Show();

                    break;
                }
                i++;
            }
        }
        private void Button_EditData_Click(object sender, EventArgs e)
        {
            dynamic form = this.FindForm();
            int i = 0;
            int selectedIndex = 0;

            foreach (var item in form.Controls["menuStrip1"].Items)
            {
                if (item.Checked == true)
                {
                    Window_EditData windowEditData = new Window_EditData();
                    int windowSizeX = 10;
                    int windowSizeY = 25;
                    foreach (var grid in grids)
                    {
                        if (grid.Name == item.Tag)
                        {
                            if (grid.SelectedCells.Count != 0)
                            {
                                selectedIndex = grid.SelectedCells[0].RowIndex;
                                grid.Rows[selectedIndex].Selected = true;
                            }
                            else
                            {
                                break;
                            }
                            int labelWidth = 100;
                            int labelHeight = 15;

                            int textBoxWidth = 100;
                            int textBoxHeight = 15;

                            int intervalWidth = 30;
                            int intervalHeight = 12;

                            int buttonWidth = 90;
                            int buttonHeight = 30;

                            Point labelPos = new Point(intervalWidth, intervalHeight);
                            Point textBoxPos = new Point(intervalWidth * 2 + labelWidth, intervalHeight);

                            int j = 0;
                            foreach (DataGridViewColumn column in grid.Columns)
                            {
                                System.Windows.Forms.Label label = new System.Windows.Forms.Label();
                                System.Windows.Forms.TextBox textBox = new System.Windows.Forms.TextBox();

                                textBox.Name = column.Name;
                                label.Name = column.Name;

                                textBox.Size = new Size(textBoxWidth, textBoxHeight);
                                label.Size = new Size(labelWidth, labelHeight);

                                label.Text = column.HeaderText;
                                label.Location = labelPos;
                                label.Visible = true;

                                textBox.Location = textBoxPos;
                                textBox.Visible = true;

                                windowEditData.Controls.Add(label);

                                //Для определённых таблиц реализован элемент ComboBox, позволяющий выбрать данные из списка
                                if (grid.SelectedRows[0].Cells[j].Value != null)
                                {
                                    if (j == 0)
                                    {
                                        textBox.ReadOnly = true;
                                    }
                                    if (j == 2 && grid.Name == "Food")
                                    {
                                        System.Windows.Forms.ComboBox comboBox = new System.Windows.Forms.ComboBox();
                                        comboBox.Size = new Size(labelWidth, labelHeight);
                                        comboBox.Location = textBoxPos;
                                        comboBox.Visible = true;
                                        comboBox.MaxDropDownItems = 10;
                                        comboBox.SelectedIndexChanged += comboBox_ItemSelected;
                                        comboBox.Name = "ComboBox";
                                        comboBox.Text = grid.SelectedRows[0].Cells[j].Value.ToString();
                                        foreach (var _item in db.foodTypes)
                                        {
                                            comboBox.Items.Add(_item.type);
                                        }
                                        windowEditData.Controls.Add(comboBox);
                                    }
                                    else if (j == 1 && grid.Name == "Order_Status")
                                    {
                                        System.Windows.Forms.ComboBox comboBox = new System.Windows.Forms.ComboBox();
                                        comboBox.Size = new Size(labelWidth, labelHeight);
                                        comboBox.Location = textBoxPos;
                                        comboBox.Visible = true;
                                        comboBox.MaxDropDownItems = 10;
                                        comboBox.SelectedIndexChanged += comboBox_ItemSelected;
                                        comboBox.Name = "ComboBox";
                                        comboBox.Text = grid.SelectedRows[0].Cells[j].Value.ToString();
                                        foreach (var _item in db.orderStatus)
                                        {
                                            comboBox.Items.Add(_item.type);
                                        }
                                        windowEditData.Controls.Add(comboBox);
                                    }
                                    else
                                    {
                                        textBox.Text = grid.SelectedRows[0].Cells[j].Value.ToString();
                                        windowEditData.Controls.Add(textBox);
                                    }



                                }

                                labelPos.Y += (intervalHeight + labelHeight);
                                textBoxPos.Y += (intervalHeight + textBoxHeight);

                                j++;
                            }

                            windowSizeX = textBoxPos.X + textBoxWidth + intervalWidth;
                            windowSizeY = textBoxPos.Y + textBoxHeight + intervalHeight;

                            Point buttonPos = new Point(labelPos.X, textBoxPos.Y + intervalHeight);

                            System.Windows.Forms.Button button = new System.Windows.Forms.Button();
                            button.Location = buttonPos;
                            button.Size = new Size(buttonWidth, buttonHeight);
                            button.Visible = true;
                            button.FlatStyle = FlatStyle.System;
                            button.Text = "Сохранить";
                            button.Click += buttonClick_AddDataInTable;
                            button.Tag = grid.Name;

                            windowEditData.Controls.Add(button);
                            windowSizeY += buttonHeight + intervalHeight * 3;
                        }

                        void comboBox_ItemSelected(object sender, EventArgs e)
                        {
                            ComboBox comboBox = windowEditData.Controls["ComboBox"] as ComboBox;
                            comboBox.Text = comboBox.SelectedItem.ToString();
                        }

                        void buttonClick_AddDataInTable(object sender, EventArgs e)
                        {
                            var tag = (string)((System.Windows.Forms.Button)sender).Tag;
                            List<object> list = new List<object>();

                            int k = 0;

                            foreach (var obj in windowEditData.Controls)
                            {
                                if (obj is System.Windows.Forms.TextBox)
                                {
                                    TextBox textBox = (TextBox)obj;
                                    list.Add(textBox.Text);
                                    grid.Rows[selectedIndex].Cells[k].Value = textBox.Text;
                                    k++;
                                }
                                else if (obj is System.Windows.Forms.ComboBox)
                                {
                                    ComboBox comboBox = (ComboBox)obj;
                                    list.Add(comboBox.Text);
                                    grid.Rows[selectedIndex].Cells[k].Value = comboBox.Text;
                                    k++;
                                }
                            }
                            switch (tag)
                            {
                                case "Food":
                                    {
                                        Food food = new Food();
                                        food = food.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Food), food.id.ToString(), food.FormJSONtoPOST());
                                        ToolStripMenuItem_Food_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Food_Type":
                                    {
                                        Food_Type food_type = new Food_Type();
                                        food_type = food_type.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.FoodType), food_type.id.ToString(), food_type.FormJSONtoPOST());
                                        ToolStripMenuItem_FoodType_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Basket": //OFF
                                    {
                                        Basket basket = new Basket();
                                        basket = basket.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Basket), basket.id.ToString(), basket.FormJSONtoPOST());
                                        ToolStripMenuItem_Basket_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "User":
                                    {
                                        Resourses.User user = new Resourses.User();
                                        user = user.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Users), user.id.ToString(), user.FormJSONtoPOST());
                                        ToolStripMenuItem_User_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Order": //OFF
                                    {
                                        Order order = new Order();
                                        order = order.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Order), order.id.ToString(), order.FormJSONtoPOST());
                                        ToolStripMenuItem_Order_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Order_Status":
                                    {
                                        Order_Status order_status = new Order_Status();
                                        order_status = order_status.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Status), order_status.id.ToString(), order_status.FormJSONtoPOST());
                                        ToolStripMenuItem_OrderStatus_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Worker": //OFF
                                    {
                                        Worker worker = new Worker();
                                        worker = worker.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Worker), worker.id.ToString(), worker.FormJSONtoPOST());
                                        ToolStripMenuItem_Worker_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                                case "Role":
                                    {
                                        Role role = new Role();
                                        role = role.CastToThisClass(list);
                                        Connection.DoPUT(API.API_GetPathTo(API.Roots.Roles), role.id.ToString(), role.FormJSONtoPOST());
                                        ToolStripMenuItem_Role_Click(this.Controls["menuStrip1"], e);
                                        break;
                                    }
                            }
                            grid.Rows.RemoveAt(selectedIndex);
                            grid.Rows.Insert(selectedIndex, list.ToArray());
                            windowEditData.Close();
                        }
                    }
                    windowEditData.Size = new Size(windowSizeX, windowSizeY);
                    windowEditData.Show();

                    break;
                }
            }
        }
        private void Button_DeleteData_Click(object sender, EventArgs e)
        {

            dynamic tag = FindForm().Controls["menuStrip1"];
            ToolStripMenuItem menuItem = new ToolStripMenuItem();
            foreach (var item in tag.Items)
            {
                if (item.Checked)
                {
                    menuItem = item;
                }
            }

            if (FindIndexOfEnables() != null && MessageBox.Show("Вы уверены, что хотите удалить выбранные строки?", "Точно?", MessageBoxButtons.YesNo, MessageBoxIcon.Warning, MessageBoxDefaultButton.Button2) == DialogResult.Yes)
            {
                var i = Convert.ToInt32(FindIndexOfEnables());
                foreach (DataGridViewRow row in grids[i].SelectedRows)
                {
                    switch (menuItem.Tag)
                    {
                        case "Food":
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Food), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "Food_Type":
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.FoodType), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "Basket": //OFF
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Basket), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "User": //OFF
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Users), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "Order":
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Order), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "Order_Status":
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Status), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "Worker":
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Worker), (row.Cells[0].Value).ToString());
                                break;
                            }
                        case "Role":
                            {
                                Connection.DoDelete(API.API_GetPathTo(API.Roots.Roles), (row.Cells[0].Value).ToString());
                                break;
                            }
                    }
                    grids[i].Rows.Remove(row);
                }
            }
        }
        #endregion
    }
}