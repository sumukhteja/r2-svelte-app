import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

export interface Env {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const client = new DynamoDBClient({
      region: env.AWS_REGION, // pulled from env
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
      }
    });

    const command = new GetItemCommand({
      TableName: "your-dynamodb-table-name", // ← change this
      Key: {
        id: { S: "example-id" } // ← match your table's key name
      }
    });

    try {
      const data = await client.send(command);

      if (!data.Item) {
        return new Response("❌ Item not found", { status: 404 });
      }

      return new Response(JSON.stringify(data.Item), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });

    } catch (err: any) {
      return new Response("❌ Error: " + err.message, {
        status: 500
      });
    }
  }
};
