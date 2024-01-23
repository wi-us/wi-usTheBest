using System.ComponentModel;
using System.ComponentModel.Design;
using System.Net;
using System.Text;

namespace DeliveryApp.Resourses
{
    internal static class Connection
    {
        #region API запросы на сервер
        public static bool CheckWebsiteAvaliable()
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(API.url + "/api/docs");
                request.Method = "HEAD";
                request.Headers.Add("Authorization", $"Bearer {API.token}");

                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    return response.StatusCode == HttpStatusCode.OK;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static dynamic DoGet(string strURL, bool doDeserialize = true)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(strURL) ;
            HttpWebResponse response;
            StreamReader reader;
            string jsonResponse;
            request.Method = "GET";
            request.Accept = "application/json";
            request.Headers.Add("Authorization", $"Bearer {API.token}");

            try
            {
                response = (HttpWebResponse)request.GetResponse();
                reader = new StreamReader(response.GetResponseStream());
                jsonResponse = reader.ReadToEnd();
                var g = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonResponse);
                if (doDeserialize)
                {
                    var t = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonResponse);
                    return t;
                }
                else
                {
                    return jsonResponse;
                }
            }
            catch (ArgumentException e)
            {
                return "Error: " + e.Message;
            }
        }
        public static dynamic DoPOST(string url,  string data, bool doDeserialize = true)
        {
            string jsonData = data;
            byte[] byteData = Encoding.UTF8.GetBytes(jsonData);
            
            var test = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentType = "application/json";
            //request.Headers.Add("Authorization", $"Bearer {API.token}");
            request.ContentLength = byteData.Length;
            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(byteData);
            }
            try
            {
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                    {
                        var t = reader.ReadToEnd();
                        return t;
                    }
                }
            }
            catch (Exception e)
            {
                return MessageBox.Show(e.Message);
            }
            
        }
        public static dynamic DoPUT(string url, string id, string data)
        {
            url += $"/{id}";
            string jsonData = data;
            byte[] byteData = Encoding.UTF8.GetBytes(jsonData);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "PUT";
            request.ContentType = "application/json";
            request.Headers.Add("Authorization", $"Bearer {API.token}");
            request.ContentLength = byteData.Length;
            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(byteData);
            }
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    var t = reader.ReadToEnd();
                    return reader.ReadToEnd();
                }
            }
        }
        public static dynamic DoDelete(string url, string ID)
        {
            url += $"/{ID}";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse response;

            request.Method = "DELETE";
            request.Accept = "application/json";
            request.Headers.Add("Authorization", $"Bearer {API.token}");

            try
            {
                response = (HttpWebResponse)request.GetResponse();
                return response;
            }
            catch (ArgumentException e)
            {
                return "Error: " + e.Message;
            }
        }
        #endregion
    }
}
