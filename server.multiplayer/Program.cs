using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(p =>
    p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
);

var activeSockets = new ConcurrentBag<WebSocket>();

app.UseWebSockets();

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws")
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            activeSockets.Add(webSocket);
            Console.WriteLine("Connection Created");

            try
            {
                await Echo(webSocket, activeSockets);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"WebSocket Error: {ex.Message}");
            }
            finally
            {
                activeSockets.TryTake(out var _);
                Console.WriteLine("Connection Closed");
            }
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
    else
    {
        await next(context);
    }
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();

static async Task Echo(WebSocket webSocket, ConcurrentBag<WebSocket> activeSockets)
{
    var buffer = new byte[1024 * 4];

    while (webSocket.State == WebSocketState.Open)
    {
        var receiveResult = await webSocket.ReceiveAsync(
            new ArraySegment<byte>(buffer), CancellationToken.None);

        if (receiveResult.CloseStatus.HasValue)
        {
            break;
        }

        string message = Encoding.ASCII.GetString(buffer, 0, receiveResult.Count);
        Console.WriteLine($"Received from frontend: `{message}`");

        var tasks = activeSockets.Where(s => s.State == WebSocketState.Open)
                            .Select(async socket =>
                            {
                                await socket.SendAsync(
                                    new ArraySegment<byte>(Encoding.ASCII.GetBytes(message)),
                                    WebSocketMessageType.Text,
                                    true,
                                    CancellationToken.None);
                            });

        await Task.WhenAll(tasks);
    }

    await webSocket.CloseAsync(
        WebSocketCloseStatus.NormalClosure,
        "Connection closed by client",
        CancellationToken.None);
}