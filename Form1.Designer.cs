namespace DeliveryApp
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            menuStrip1 = new MenuStrip();
            ToolStripMenuItem_FoodType = new ToolStripMenuItem();
            ToolStripMenuItem_Food = new ToolStripMenuItem();
            ToolStripMenuItem_Basket = new ToolStripMenuItem();
            ToolStripMenuItem_User = new ToolStripMenuItem();
            ToolStripMenuItem_Order = new ToolStripMenuItem();
            ToolStripMenuItem_OrderStatus = new ToolStripMenuItem();
            ToolStripMenuItem_Worker = new ToolStripMenuItem();
            ToolStripMenuItem_Role = new ToolStripMenuItem();
            Button_AddData = new Button();
            Button_EditData = new Button();
            Button_DeleteData = new Button();
            flowLayoutPanel1 = new FlowLayoutPanel();
            dataGridView1 = new DataGridView();
            flowLayoutPanel_grids = new FlowLayoutPanel();
            timer1 = new System.Windows.Forms.Timer(components);
            menuStrip1.SuspendLayout();
            flowLayoutPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            flowLayoutPanel_grids.SuspendLayout();
            SuspendLayout();
            // 
            // menuStrip1
            // 
            menuStrip1.Items.AddRange(new ToolStripItem[] { ToolStripMenuItem_FoodType, ToolStripMenuItem_Food, ToolStripMenuItem_Basket, ToolStripMenuItem_User, ToolStripMenuItem_Order, ToolStripMenuItem_OrderStatus, ToolStripMenuItem_Worker, ToolStripMenuItem_Role });
            menuStrip1.Location = new Point(0, 0);
            menuStrip1.Name = "menuStrip1";
            menuStrip1.Size = new Size(725, 24);
            menuStrip1.TabIndex = 0;
            menuStrip1.Text = "menuStrip1";
            // 
            // ToolStripMenuItem_FoodType
            // 
            ToolStripMenuItem_FoodType.Name = "ToolStripMenuItem_FoodType";
            ToolStripMenuItem_FoodType.Size = new Size(72, 20);
            ToolStripMenuItem_FoodType.Tag = "Food_Type";
            ToolStripMenuItem_FoodType.Text = "Типы еды";
            ToolStripMenuItem_FoodType.Click += ToolStripMenuItem_FoodType_Click;
            // 
            // ToolStripMenuItem_Food
            // 
            ToolStripMenuItem_Food.Name = "ToolStripMenuItem_Food";
            ToolStripMenuItem_Food.Size = new Size(55, 20);
            ToolStripMenuItem_Food.Tag = "Food";
            ToolStripMenuItem_Food.Text = "Блюда";
            ToolStripMenuItem_Food.Click += ToolStripMenuItem_Food_Click;
            // 
            // ToolStripMenuItem_Basket
            // 
            ToolStripMenuItem_Basket.Name = "ToolStripMenuItem_Basket";
            ToolStripMenuItem_Basket.Size = new Size(65, 20);
            ToolStripMenuItem_Basket.Tag = "Basket";
            ToolStripMenuItem_Basket.Text = "Корзина";
            ToolStripMenuItem_Basket.Visible = false;
            ToolStripMenuItem_Basket.Click += ToolStripMenuItem_Basket_Click;
            // 
            // ToolStripMenuItem_User
            // 
            ToolStripMenuItem_User.Name = "ToolStripMenuItem_User";
            ToolStripMenuItem_User.Size = new Size(67, 20);
            ToolStripMenuItem_User.Tag = "User";
            ToolStripMenuItem_User.Text = "Клиенты";
            ToolStripMenuItem_User.Click += ToolStripMenuItem_User_Click;
            // 
            // ToolStripMenuItem_Order
            // 
            ToolStripMenuItem_Order.Name = "ToolStripMenuItem_Order";
            ToolStripMenuItem_Order.Size = new Size(58, 20);
            ToolStripMenuItem_Order.Tag = "Order";
            ToolStripMenuItem_Order.Text = "Заказы";
            ToolStripMenuItem_Order.Click += ToolStripMenuItem_Order_Click;
            // 
            // ToolStripMenuItem_OrderStatus
            // 
            ToolStripMenuItem_OrderStatus.Name = "ToolStripMenuItem_OrderStatus";
            ToolStripMenuItem_OrderStatus.Size = new Size(108, 20);
            ToolStripMenuItem_OrderStatus.Tag = "Order_Status";
            ToolStripMenuItem_OrderStatus.Text = "Статусы заказов";
            ToolStripMenuItem_OrderStatus.Click += ToolStripMenuItem_OrderStatus_Click;
            // 
            // ToolStripMenuItem_Worker
            // 
            ToolStripMenuItem_Worker.Name = "ToolStripMenuItem_Worker";
            ToolStripMenuItem_Worker.Size = new Size(85, 20);
            ToolStripMenuItem_Worker.Tag = "Worker";
            ToolStripMenuItem_Worker.Text = "Сотрудники";
            ToolStripMenuItem_Worker.Click += ToolStripMenuItem_Worker_Click;
            // 
            // ToolStripMenuItem_Role
            // 
            ToolStripMenuItem_Role.Name = "ToolStripMenuItem_Role";
            ToolStripMenuItem_Role.Size = new Size(47, 20);
            ToolStripMenuItem_Role.Tag = "Role";
            ToolStripMenuItem_Role.Text = "Роли";
            ToolStripMenuItem_Role.Click += ToolStripMenuItem_Role_Click;
            // 
            // Button_AddData
            // 
            Button_AddData.Location = new Point(3, 3);
            Button_AddData.Name = "Button_AddData";
            Button_AddData.Size = new Size(123, 23);
            Button_AddData.TabIndex = 2;
            Button_AddData.Text = "Добавить запись";
            Button_AddData.UseVisualStyleBackColor = true;
            Button_AddData.Click += Button_AddData_Click;
            // 
            // Button_EditData
            // 
            Button_EditData.Location = new Point(132, 3);
            Button_EditData.Name = "Button_EditData";
            Button_EditData.Size = new Size(143, 23);
            Button_EditData.TabIndex = 3;
            Button_EditData.Text = "Редактировать запись";
            Button_EditData.UseVisualStyleBackColor = true;
            Button_EditData.Click += Button_EditData_Click;
            // 
            // Button_DeleteData
            // 
            Button_DeleteData.Location = new Point(281, 3);
            Button_DeleteData.Name = "Button_DeleteData";
            Button_DeleteData.Size = new Size(143, 23);
            Button_DeleteData.TabIndex = 4;
            Button_DeleteData.Text = "Удалить запись";
            Button_DeleteData.UseVisualStyleBackColor = true;
            Button_DeleteData.Click += Button_DeleteData_Click;
            // 
            // flowLayoutPanel1
            // 
            flowLayoutPanel1.Controls.Add(Button_AddData);
            flowLayoutPanel1.Controls.Add(Button_EditData);
            flowLayoutPanel1.Controls.Add(Button_DeleteData);
            flowLayoutPanel1.Dock = DockStyle.Bottom;
            flowLayoutPanel1.Location = new Point(0, 422);
            flowLayoutPanel1.Name = "flowLayoutPanel1";
            flowLayoutPanel1.Size = new Size(725, 32);
            flowLayoutPanel1.TabIndex = 7;
            // 
            // dataGridView1
            // 
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(3, 3);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.RowTemplate.Height = 25;
            dataGridView1.Size = new Size(719, 395);
            dataGridView1.TabIndex = 8;
            // 
            // flowLayoutPanel_grids
            // 
            flowLayoutPanel_grids.Controls.Add(dataGridView1);
            flowLayoutPanel_grids.Dock = DockStyle.Fill;
            flowLayoutPanel_grids.Location = new Point(0, 24);
            flowLayoutPanel_grids.Name = "flowLayoutPanel_grids";
            flowLayoutPanel_grids.Size = new Size(725, 398);
            flowLayoutPanel_grids.TabIndex = 9;
            // 
            // timer1
            // 
            timer1.Interval = 2400;
            timer1.Tick += timer1_Tick;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(725, 454);
            Controls.Add(flowLayoutPanel_grids);
            Controls.Add(flowLayoutPanel1);
            Controls.Add(menuStrip1);
            Icon = (Icon)resources.GetObject("$this.Icon");
            MainMenuStrip = menuStrip1;
            MinimumSize = new Size(741, 493);
            Name = "Form1";
            Text = "DeliveryApp Adminitrating Tool";
            FormClosed += Form1_FormClosed;
            Load += Form1_Load;
            SizeChanged += Form1_SizeChanged;
            menuStrip1.ResumeLayout(false);
            menuStrip1.PerformLayout();
            flowLayoutPanel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            flowLayoutPanel_grids.ResumeLayout(false);
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        public MenuStrip menuStrip1;
        public ToolStripMenuItem ToolStripMenuItem_FoodType;
        public ToolStripMenuItem ToolStripMenuItem_Food;
        public ToolStripMenuItem ToolStripMenuItem_Basket;
        public ToolStripMenuItem ToolStripMenuItem_User;
        public ToolStripMenuItem ToolStripMenuItem_Order;
        public ToolStripMenuItem ToolStripMenuItem_OrderStatus;
        public ToolStripMenuItem ToolStripMenuItem_Worker;
        public ToolStripMenuItem ToolStripMenuItem_Role;
        public Button Button_AddData;
        public Button Button_EditData;
        public Button Button_DeleteData;
        public FlowLayoutPanel flowLayoutPanel1;
        public DataGridView dataGridView1;
        public FlowLayoutPanel flowLayoutPanel_grids;
        private System.Windows.Forms.Timer timer1;
    }
}