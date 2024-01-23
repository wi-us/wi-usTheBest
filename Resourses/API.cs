namespace DeliveryApp.Resourses
{
    public static class API
    {
        #region Информация о пользователе
        //URL сервера
        public static string url = "https://e05b-109-198-122-38.ngrok-free.app";
        //Токен входа
        public static string token { get; set; }
        //Роль
        public static string role { get; } = "ADMIN";
        #endregion
        #region Навигация по API
        //Пути к таблицам
        public enum  Roots
        {
            Users, Basket, Food, FoodType, Roles, Worker, Order, Login, Register, Status
        }
        //словарь значений
        private static Dictionary<Roots, string> filePaths = new Dictionary<Roots, string>() 
        {
            {Roots.Users, "/users" },
            {Roots.Basket, "/basket" },
            {Roots.Food, "/food" },
            {Roots.FoodType, "/foodType" },
            {Roots.Roles, "/roles" },
            {Roots.Worker, "/worker" },
            {Roots.Status, "/orderstatus" },
            {Roots.Order, "/order" },
            {Roots.Login, "/auth/login" },
            {Roots.Register, "/auth/register" }
        };

        //поиск нужного значения
        public static string API_GetPathTo(Roots root) 
        {
            string result;
            filePaths.TryGetValue(root, out result);
            return url + result;
        }
        #endregion
    }
}
