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
        // Se a mensagem vier como Buffer, converte para texto
        const msgTexto = message.toString();
        console.log(`Recebido: ${msgTexto}`);
        ws.send(`Eco do Servidor: ${msgTexto}`);
    });
});

server.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});
