// import { NextResponse } from "next/server";

// // Simulate a delay to mimic API latency
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function handler(req, res) {
//   // const { message } = req.body; // Obtén el mensaje del cuerpo de la solicitud
//   console.log(req);
//   // const response = `Response to: This is a simulated response from the server.`;
//   // return NextResponse.json({ reply: `Mensaje recibido: ${message}` });
// }
// // +

import { NextResponse } from "next/server";

export async function POST({ body }) {
  return NextResponse.json({ message: "Hello, World!" });
}
