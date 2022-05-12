import http from "http";
const processId = process.pid;

const server = http.createServer((request, response) => {
  for (let index = 0; index < 1e7; index++);
  response.end(`handled by pid: ${processId}`);
});

server.listen(3000).once("listeling", () => {
  console.log("Server started in process", processId);
});

// Aguardar as conexões serem encerradas para só então encerrar a aplicação
process.on("SIGTERM", () => {
  console.log("Server ending", new Date().toISOString());
  server.close(() => process.exit());
});

// Vamos simular que um erro aleatório aconteceu - Resiliência
setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4); // 10.000
