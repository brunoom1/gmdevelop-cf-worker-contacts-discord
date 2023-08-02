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
				await axios.post(`${webhookURL}/webhooks/${webhookId}/${webhookToken}`, {
					content:	`## Mensagem do site` + 
								`Nome: ${data.name}` + 
								`Email: ${data.email}` + 
								`Telefone: ${data.cellphone}` + 
								`Mensagem: ${data.message}`					
				});
			} catch (err) {
				console.log(err);
			}
		}

		return new Response('Hello World!');
	},
};
