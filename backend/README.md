# GoRide - API de Taxi

GoRide é um sistema de API para gerenciamento de viagens de taxi, permitindo que usuários solicitem e confirmem viagens, além de calcular estimativas de valor com base na distância e motorista selecionado. A API oferece endpoints para cadastro de motoristas, estimativas de viagem, confirmação de viagens e consulta ao histórico de viagens de um usuário.

## Tecnologias Utilizadas

- **Node.js** com **Express** para o servidor.
- **TypeScript** para tipagem estática.
- **TypeORM** com **SQLite** como banco de dados.
- **Google Maps API** para cálculo de distâncias e estimativas de viagens.

## Pré-requisitos

- **Node.js** versão 16 ou superior.
- **SQLite** para banco de dados (configurado no projeto).
- **Google Maps API Key** (necessária para calcular estimativas de viagens).

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/go-ride.git
cd go-ride

2. Instale as dependências
bash
npm install

3. Configuração do ambiente
Crie um arquivo .env na raiz do projeto e adicione sua chave de API do Google Maps:

.env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

4. Execute a API
bash
npm run dev

A API estará disponível em http://localhost:8080.