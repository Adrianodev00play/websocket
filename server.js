const http = require('http');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor WebSocket ativo na nuvem!\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado remotamente!');
    ws.send(JSON.stringify({ message: 'Conectado com sucesso ao Render!' }));

    ws.on('message', (message) => {
        const msgTexto = message.toString();
        console.log(`Recebido: ${msgTexto}`);

        // Repassa a mensagem para TODOS os outros clientes conectados
        wss.clients.forEach((cliente) => {
            if (cliente !== ws && cliente.readyState === WebSocket.OPEN) {
                cliente.send(JSON.stringify({ message: msgTexto }));
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

server.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});
