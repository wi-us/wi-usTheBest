using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;

namespace DeliveryApp.Resourses
{
    public class DataBase
    {
        #region Списки таблиц
        public List<Food_Type> foodTypes;
        public List<Food> food;
        public List<Basket> basket;
        public List<User> user;
        public List<Order> order;
        public List<Order_Status> orderStatus;
        public List<Worker> worker;
        public List<Role> role;
        public Dictionary<Tables, int> dictionary = new Dictionary<Tables, int>()
        {
            {Tables.Food_Type, 0 },
            {Tables.Food, 1 },
            {Tables.Basket, 2},
            {Tables.User, 3},
            {Tables.Order, 4},
            {Tables.Order_Status, 5},
            {Tables.Worker, 6},
            {Tables.Role, 7}
        };
        public enum Tables
        {
            Food_Type = 0, Food, Basket, User, Order, Order_Status, Worker, Role, All
        }
        #endregion
        #region Функции над списками таблиц
        public void CollectData(Tables table)
        {
            //проверка доступности сервера
            if (Connection.CheckWebsiteAvaliable())
            {
                try
                {
                    //запрос данных с сервера
                    CollectDataFromServer(table);
                }
                //обработка ошибок
                catch (Exception ex)
                {
                    if (ex.Message.Contains("403"))
                    {
                        MessageBox.Show("(403) Нет доступа");
                    }
                    else if (ex.Message.Contains("404"))
                    {
                        MessageBox.Show("(404) Страница не найдена или сервер недоступен");
                    }
                    else if (ex.Message.Contains("500"))
                    {
                        MessageBox.Show("(500) Ошибка на сервере");
                    }
                    else
                    {
                        MessageBox.Show("Ошибка в коде:\n" + ex.Message.ToString());
                    }
                }
            }
            void CollectDataFromServer(Tables table)
            {
                switch (table)
                {
                    case Tables.Food_Type:
                        {
                            foodTypes = JsonConvert.DeserializeObject<List<Food_Type>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.FoodType)}", false));
                            break;
                        }
                    case Tables.Food:
                        {
                            food = JsonConvert.DeserializeObject<List<Food>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Food)}", false));
                            break;
                        }
                    case Tables.Basket:
                        {
                            basket = JsonConvert.DeserializeObject<List<Basket>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Basket)}", false));
                            break;
                        }
                    case Tables.User:
                        {
                            user = JsonConvert.DeserializeObject<List<User>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Users)}", false));
                            break;
                        }
                    case Tables.Order:
                        {
                            order = JsonConvert.DeserializeObject<List<Order>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Order)}", false));
                            break;
                        }
                    case Tables.Order_Status:
                        {
                            orderStatus = JsonConvert.DeserializeObject<List<Order_Status>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Status)}", false));
                            break;
                        }
                    case Tables.Worker:
                        {
                            worker = JsonConvert.DeserializeObject<List<Worker>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Worker)}", false));
                            break;
                        }
                    case Tables.Role:
                        {
                            role = JsonConvert.DeserializeObject<List<Role>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Roles)}", false));
                            break;
                        }
                    case Tables.All:
                        {
                            foodTypes = JsonConvert.DeserializeObject<List<Food_Type>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.FoodType)}", false));
                            food = JsonConvert.DeserializeObject<List<Food>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Food)}", false));
                            //basket = JsonConvert.DeserializeObject<List<Basket>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Basket)}", false));
                            user = JsonConvert.DeserializeObject<List<User>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Users)}", false));
                            order = JsonConvert.DeserializeObject<List<Order>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Order)}", false));
                            orderStatus = JsonConvert.DeserializeObject<List<Order_Status>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Status)}", false));
                            worker = JsonConvert.DeserializeObject<List<Worker>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Worker)}", false));
                            role = JsonConvert.DeserializeObject<List<Role>>(Connection.DoGet($"{API.API_GetPathTo(API.Roots.Roles)}", false));

                            break;
                        }
                }
            }
        }
        #endregion
    }
    #region Классы, определяющие значения и функционал таблиц
    public abstract class BaseEntity<T>
    {
        [IgnoreDataMember]
        //Массив, содержащий названия столбцов
        public string[] columnNames { get; set; }
        [IgnoreDataMember]
        //Таблица
        public DataBase.Tables table { get; }
        [IgnoreDataMember]
        //Тпы данных по порядку
        public Type[] types { get; }
        //Метод, преобразующий строку входных данных в необходимые для БД
        public abstract T CastToThisClass(List<object> dataRow);
        //Метод, возвращающий заголовки
        public abstract string[] GetHeaders();
        //Метод, возвращающий типы данных столбцов
        public abstract Type[] GetTypes();
        //Метод, тип таблицы
        public abstract DataBase.Tables GetTable();
        //Метод, возвращающий данные таблицы в виде сериализированной строки
        public abstract string FormJSONtoPOST();
    }
    public class Food_Type : BaseEntity<Food_Type>
    {
        //столбцы из БД
        [DataMember]
        public uint id { get; set; }
        [DataMember]
        public string type { get; set; }
        //данные о таблице
        [IgnoreDataMember]
        public uint columnCount { get; } = 2;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Food_Type;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "type" };
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(string) };
        //реализация метода CastToThisClass()
        public override Food_Type CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                Food_Type food_Type = new Food_Type();
                if (!(dataRow[0] is uint))
                {
                    food_Type.id = Convert.ToUInt32(dataRow[0]);
                }
                food_Type.type = dataRow[1].ToString();

                return food_Type;
            }
            else
            {
                return null;
            }
        }
        //реализация метода GetHeaders()
        public override string[] GetHeaders()
       {
            return columnNames;
       }
        //реализация метода GetTypes()
        public override Type[] GetTypes()
       {
            return types;
       }
        //реализация метода GetTable()
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        //реализация метода FormJSONtoPOST()
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                type = this.type
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }

    }
    public class Food : BaseEntity<Food>
    {
        [DataMember]
        public uint id { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public uint? type_id { get; set; }
        [DataMember]
        public string picture { get; set; }
        [DataMember]
        public decimal price { get; set; }
        [DataMember]
        public Food_Type foodType { get; set; }
        [IgnoreDataMember]
        public uint columnCount { get; } = 5;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Food;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "name" , "type_id", "picture", "price" };
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(string), typeof(uint), typeof(string), typeof(decimal) };
        public override Food CastToThisClass(List<object> dataRow)
        {
            if(dataRow.Count <= 5)
            {
                Food food = new Food();
                if (!(dataRow[0] is uint))
                {
                    food.id = Convert.ToUInt32(dataRow[0]);
                }
                food.name = dataRow[1].ToString();

                try
                {
                    if (!(dataRow[2] is uint))
                    {

                        uint id = Convert.ToUInt32(dataRow[2]);
                        food.type_id = id;
                        //food.foodType.id = id;
                        dynamic t = (Connection.DoGet(API.API_GetPathTo(API.Roots.FoodType) + $"/{id}"));
                        food.foodType = new Food_Type() { id = t.id, type = t.type };
                    }
                }
                catch 
                {
                    try
                    {
                        string str = dataRow[2].ToString();
                        dynamic types = Connection.DoGet(API.API_GetPathTo(API.Roots.FoodType));
                        foreach (dynamic _type in types)
                        {
                            if(_type.type == str)
                            {
                                food.foodType = new Food_Type() { id = _type.id, type = _type.type };
                            }
                        }
                    }
                    catch
                    {
                        food.type_id = null;
                    }
                }
                
                food.picture = dataRow[3].ToString();
                if (!(dataRow[4] is decimal))
                {
                    food.price = Convert.ToDecimal(dataRow[4]);
                }
                return food;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                name = this.name,
                type = this.foodType.type,
                picture = this.picture,
                price = this.price
            };
            var jsonString = JObject.FromObject(jsonObject);
            string json = JsonConvert.SerializeObject(jsonString);
            //var jsonString = JObject.FromObject(jsonObject).ToString();
            return json;
        }
        public Food_Type FindTypeID(List<Food_Type> foodTypes, int id)
        {
            foreach (Food_Type foodType in foodTypes)
            { 
                if (foodType.id == id)
                {
                    return foodType;
                }
            }
            return null;
        }
    }
    public class Basket : BaseEntity<Basket>
    {
        [DataMember]
        public uint id { get; set; }
        [DataMember]
        public decimal Price { get; set; }
        [DataMember]
        public uint User_ID { get; set; }
        [DataMember]
        public uint Food_ID { get; set; }
        [IgnoreDataMember]
        public uint columnCount { get; } = 4;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Basket;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "Price", "User_ID", "Food_ID" };
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(decimal), typeof(uint), typeof(uint) };
        public override Basket CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                Basket basket = new Basket();
                if (!(dataRow[0] is uint))
                {
                    basket.id = Convert.ToUInt32(dataRow[0]);
                }
                if (!(dataRow[1] is decimal))
                {
                    basket.Price = Convert.ToDecimal(dataRow[1]);
                }
                if (!(dataRow[2] is uint))
                {
                    basket.User_ID = Convert.ToUInt32(dataRow[2]);
                }
                if (!(dataRow[3] is uint))
                {
                    basket.Food_ID = Convert.ToUInt32(dataRow[3]);
                }
                
                return basket;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                price = this.Price,
                User_ID = this.User_ID,
                Food_ID = this.Food_ID
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }
        public string FindTypeID(List<object> objects)
        {
            if (objects is User)
            {
                foreach (User user in objects)
                {
                    if (user.id == this.User_ID)
                    {
                        return user.telegram_ID;
                    }
                }
            }
            else if (objects is Food)
            {
                foreach (Food food in objects)
                {
                    if (food.id == this.Food_ID)
                    {
                        return food.name;
                    }
                }
            }
            return null;
        }
    }
    public class User : BaseEntity<User>
    {
        [DataMember]
        public uint id { get; set; }
        [DataMember]
        public string telegram_ID { get; set; }
        [DataMember]
        public int? x { get; set; }
        [DataMember]
        public int? y { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mail { get; set; }
        [DataMember]
        public double? balance { get; set; }
        [DataMember]
        public string Adress { get; set; }
        [IgnoreDataMember]
        public uint columnCount { get; } = 7;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.User;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "telegram_ID", "phone", "mail", "balance" };
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(string), typeof(string), typeof(string), typeof(double?) };
        public override User CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                User user = new User();
                if (!(dataRow[0] is uint?))
                {
                    user.id = Convert.ToUInt32(dataRow[0]);
                }
                user.telegram_ID = dataRow[1].ToString();
                user.phone = dataRow[2].ToString();
                user.mail = dataRow[3].ToString();
                if (!(dataRow[4] is double?))
                {
                    user.balance = Convert.ToDouble(dataRow[4]);
                }
                //user.Adress = dataRow[2].ToString();

                return user;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                telegram_ID = this.telegram_ID
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }
    }
    public class Order : BaseEntity<Order>
    {
        [DataMember]
        public uint? id { get; set; }
        [DataMember]
        public string? date { get; set; }
        [DataMember]
        public uint? status { get; set; }
        [DataMember]
        public decimal? price { get; set; }
        [DataMember]
        public uint? user_id { get; set; }
        [DataMember]
        public uint? worker_ID { get; set; }

        [IgnoreDataMember]
        public uint columnCount { get; } = 6;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Order;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "date", "status", "user_id", "worker_ID", "price" };
        public static Type[] types { get; } = { typeof(uint), typeof(string), typeof(uint), typeof(uint), typeof(uint), typeof(decimal) };
        public override Order CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                Order order = new Order();
                if (!(dataRow[0] is uint))
                {
                    order.id = Convert.ToUInt32(dataRow[0]);
                }
                order.date = dataRow[1].ToString();
                if (!(dataRow[2] is uint))
                {
                    order.status = Convert.ToUInt32(dataRow[2]);
                }
                if (!(dataRow[3] is uint))
                {
                    order.worker_ID = Convert.ToUInt32(dataRow[3]);
                }
                if (!(dataRow[4] is uint))
                {
                    order.user_id = Convert.ToUInt32(dataRow[4]);
                }
                if (!(dataRow[5] is decimal))
                {
                    order.price = Convert.ToDecimal(dataRow[5]);
                }

                return order;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                date = this.date,
                status = this.status,
                price = this.price,
                user_id = this.user_id,
                worker_ID = this.worker_ID
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }
        public Order_Status FindStatusByID(List<Order_Status> statuses, uint id)
        {
            foreach(Order_Status status in statuses)
            {
                if (status.id == id)
                {
                    return status;
                }
            }
            return null;
        }
    }
    public class Order_Status : BaseEntity<Order_Status>
    {
        [DataMember]
        public uint? id { get; set; }
        [DataMember]
        public string type { get; set; }
        [IgnoreDataMember]
        public uint columnCount { get; } = 2;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Order_Status;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "type"};
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(string) };
        public override Order_Status CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                Order_Status order = new Order_Status();
                if (!(dataRow[0] is uint?))
                {
                    order.id = Convert.ToUInt32(dataRow[0]);
                }
                order.type = dataRow[1].ToString();

                return order;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                type = this.type
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }
    }
    public class Worker : BaseEntity<Worker>
    {
        [DataMember]
        public uint id { get; set; }
        [DataMember]
        public uint role_ID { get; set; }
        [DataMember]
        public uint? status_ID { get; set; }
        [DataMember]
        public string password { get; set; }
        [DataMember]
        public string email { get; set; }
        [DataMember]
        public string phone { get; set; }
        [IgnoreDataMember]
        public uint columnCount { get; } = 6;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Worker;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "status_ID", "role_ID", "phone", "email", "password" };
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(uint), typeof(uint), typeof(string), typeof(string), typeof(string) };
        public Dictionary<uint?, string> StatusCode = new Dictionary<uint?, string>()
        {
            { 1, "Online" },
            { 2, "Offline" }
        };
        public override Worker CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                Worker worker = new Worker();
                if (!(dataRow[0] is uint))
                {
                    worker.id = Convert.ToUInt32(dataRow[0]);
                }
                if (!(dataRow[1] is uint))
                {
                    worker.role_ID = Convert.ToUInt32(dataRow[1]);
                }
                if (!(dataRow[2] is uint))
                {
                    worker.status_ID = Convert.ToUInt32(dataRow[2]);
                }
                worker.password = dataRow[3].ToString();
                worker.email = dataRow[4].ToString();
                worker.phone = dataRow[5].ToString();
                
                return worker;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                role_ID = this.role_ID,
                status_ID = this.status_ID,
                password = this.password,
                email = this.email,
                phone = this.phone
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }
        public string FindTypeID(List<Role> objects)
        {
                foreach (Role role in objects)
                {
                    if (role.id == this.role_ID)
                    {
                        return role.description;
                    }
                }
            return null;
        }
    }
    public class Role : BaseEntity<Role>
    {
        [DataMember]
        public uint id { get; set; }
        [DataMember]
        public string description { get; set; }
        [DataMember]
        public string value { get; set; }
        [IgnoreDataMember]
        public uint columnCount { get; } = 3;
        [IgnoreDataMember]
        public DataBase.Tables table { get; } = DataBase.Tables.Role;
        [IgnoreDataMember]
        public static string[] columnNames { get; } = { "id", "description", "value" };
        [IgnoreDataMember]
        public static Type[] types { get; } = { typeof(uint), typeof(string), typeof(string) };
        public override Role CastToThisClass(List<object> dataRow)
        {
            if (dataRow.Count <= columnCount)
            {
                Role role = new Role();
                if (!(dataRow[0] is uint))
                {
                    role.id = Convert.ToUInt32(dataRow[0]);
                }
                role.description = dataRow[1].ToString();
                role.value = dataRow[2].ToString();

                return role;
            }
            else
            {
                return null;
            }
        }
        public override string[] GetHeaders()
        {
            return columnNames;
        }
        public override Type[] GetTypes()
        {
            return types;
        }
        public override DataBase.Tables GetTable()
        {
            return table;
        }
        public override string FormJSONtoPOST()
        {
            var jsonObject = new
            {
                description = this.description,
                value = this.value
            };
            var jsonString = JObject.FromObject(jsonObject).ToString();
            return jsonString;
        }
    }
    #endregion
}
