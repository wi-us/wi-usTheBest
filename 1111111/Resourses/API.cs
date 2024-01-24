namespace DeliveryApp.Resourses
{
    public static class API
    {
        //URL сервера
        public static string url = "https://8265-109-198-122-38.ngrok-free.app";
        //Токен входа
        public static string token { get; set; }
        //
        public enum  Roots
        {
            Users, Basket, Food, FoodType, Roles, Worker, Order1, Login, Register, Status, Finish, Order
        }
        //словарь значений
        private static Dictionary<Roots, string> filePaths = new Dictionary<Roots, string>() 
        {
            {Roots.Users, "/users" },
            {Roots.Basket, "/basket" },
            {Roots.Food, "/food" },
            {Roots.FoodType, "/foodType" },
            {Roots.Roles, "/roles" },
            {Roots.Finish,"/worker/finishorder" },
            {Roots.Worker, "/worker/takeorder" },
            {Roots.Status, "/orderstatus" },
            {Roots.Order1,"/order" },
            {Roots.Order, "/activeorder" },
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
    }
}
