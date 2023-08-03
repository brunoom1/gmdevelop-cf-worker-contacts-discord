import axios from "axios";

enum DiscordWebhookTypes {
	INCOMING,
	CHANNEL_FOLLOWER,
	APPLICATION
};

export interface Env {
	webhookDiscordId: string;
	webhookDiscordType: DiscordWebhookTypes;
	webhookDiscordToken: string;
	webhookDiscordURL: string;
}

export interface RequestData {
	name: string;
	email: string;
	cellphone: string;
	message: string;	
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		if (request.method === 'POST') {
			const webhookId = env.webhookDiscordId;
			const webhookToken = env.webhookDiscordToken;
			const webhookURL = env.webhookDiscordURL;

			const data = await request.json<RequestData>();

			try {

				const webhookFullUrl = `${webhookURL}/webhooks/${webhookId}/${webhookToken}`;

				const content = `## Mensagem do site` + 
				`Nome: ${data.name}` + 
				`Email: ${data.email}` + 
				`Telefone: ${data.cellphone}` + 
				`Mensagem: ${data.message}`;

				console.log({
					"url": webhookFullUrl,
					"teste": "teste",
					...data,
					webhookId,
					webhookToken,
					webhookURL,
					content
				});

				const result = await axios.post(webhookFullUrl, {
					content
				});

				return new Response(result.statusText, {
					status: result.status
				});

			} catch (err) {
				console.log(err);
			}

			return new Response('post -- response!');

		}

		return new Response('Hello World!');
	},
};
